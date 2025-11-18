<?php
// 祈孕顧問 - 表單處理系統

// === 修復 Go 主題缺失函數 ===
// 此處移除 namespace 定義以避免語法錯誤
// Go 主題的缺失函數問題通常需要升級主題或禁用衝突插件

// === 表單處理系統 ===

// 註冊自訂文章類型
add_action('init', function() {
    register_post_type('qiyun_form', array(
        'labels' => array(
            'name' => 'Contact Forms',
            'singular_name' => 'Contact Form',
            'menu_name' => 'Contact Forms'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-email',
    ));
});

// 註冊 REST API 端點
add_action('rest_api_init', function() {
    register_rest_route('contact/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'qiyun_handle_form_submit',
        'permission_callback' => '__return_true',
    ));
});

// 處理表單提交
function qiyun_handle_form_submit($request) {
    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_params();
    }
    
    // 垃圾郵件檢查
    if (!empty($params['hp'])) {
        return new WP_REST_Response(array('success' => true), 200);
    }
    
    // 獲取表單資料
    $name = isset($params['name']) ? sanitize_text_field($params['name']) : '';
    $email = isset($params['email']) ? sanitize_email($params['email']) : '';
    $phone = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';
    $message = isset($params['message']) ? sanitize_textarea_field($params['message']) : '';
    $line_id = isset($params['lineId']) ? sanitize_text_field($params['lineId']) : '';
    
    // 驗證必填欄位
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        return new WP_REST_Response(array('error' => 'Missing required fields'), 400);
    }
    
    // 驗證 Email
    if (!is_email($email)) {
        return new WP_REST_Response(array('error' => 'Invalid email'), 400);
    }
    
    // 插入文章
    $post_id = wp_insert_post(array(
        'post_title' => 'Form - ' . $name . ' (' . date('Y-m-d H:i') . ')',
        'post_content' => $message,
        'post_status' => 'private',
        'post_type' => 'qiyun_form',
    ));
    
    if ($post_id > 0) {
        // 保存元數據
        update_post_meta($post_id, 'form_name', $name);
        update_post_meta($post_id, 'form_email', $email);
        update_post_meta($post_id, 'form_phone', $phone);
        update_post_meta($post_id, 'form_line_id', $line_id);
        update_post_meta($post_id, 'form_date', current_time('mysql'));
        
        // 發送郵件通知
        $email_body = "姓名: $name\n";
        $email_body .= "Email: $email\n";
        $email_body .= "電話: $phone\n";
        $email_body .= "LINE ID: $line_id\n\n";
        $email_body .= "訊息:\n$message";
        
        wp_mail(
            'qiyunsolution@gmail.com',
            '[祈孕顧問] 新的網站聯絡 - ' . $name,
            $email_body,
            array('Content-Type: text/plain; charset=UTF-8')
        );
        
        return new WP_REST_Response(array('success' => true, 'id' => $post_id), 200);
    }
    
    return new WP_REST_Response(array('error' => 'Failed to save form'), 500);
}
