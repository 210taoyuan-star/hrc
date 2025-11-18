<?php
// 祈孕顧問 - 超簡潔表單系統

// 註冊 REST API 端點
add_action('rest_api_init', function() {
    register_rest_route('contact/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'qiyun_form_handler',
        'permission_callback' => '__return_true',
    ));
});

// 處理表單提交
function qiyun_form_handler($request) {
    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_params();
    }
    
    // 垃圾郵件檢查
    if (!empty($params['hp'])) {
        return new WP_REST_Response(array('success' => true), 200);
    }
    
    // 驗證必填欄位
    $name = sanitize_text_field($params['name'] ?? '');
    $email = sanitize_email($params['email'] ?? '');
    $phone = sanitize_text_field($params['phone'] ?? '');
    $message = sanitize_textarea_field($params['message'] ?? '');
    $line_id = sanitize_text_field($params['lineId'] ?? '');
    
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        return new WP_REST_Response(array('error' => 'Missing required fields'), 400);
    }
    
    if (!is_email($email)) {
        return new WP_REST_Response(array('error' => 'Invalid email'), 400);
    }
    
    // 儲存到資料庫
    $post_id = wp_insert_post(array(
        'post_title' => 'Form - ' . $name . ' (' . date('Y-m-d H:i') . ')',
        'post_content' => $message,
        'post_status' => 'private',
        'post_type' => 'qiyun_form',
    ));
    
    if ($post_id > 0) {
        update_post_meta($post_id, 'qiyun_name', $name);
        update_post_meta($post_id, 'qiyun_email', $email);
        update_post_meta($post_id, 'qiyun_phone', $phone);
        update_post_meta($post_id, 'qiyun_line', $line_id);
        update_post_meta($post_id, 'qiyun_date', current_time('mysql'));
        
        // 發送郵件
        wp_mail(
            'qiyunsolution@gmail.com',
            '[祈孕顧問] 新的網站聯絡 - ' . $name,
            "姓名: $name\nEmail: $email\nPhone: $phone\nLINE: $line_id\n\n訊息:\n$message",
            array('Content-Type: text/plain; charset=UTF-8')
        );
        
        return new WP_REST_Response(array('success' => true, 'id' => $post_id), 200);
    }
    
    return new WP_REST_Response(array('error' => 'Failed to save'), 500);
}

// 註冊自訂文章類型
add_action('init', function() {
    register_post_type('qiyun_form', array(
        'labels' => array('name' => 'Contact Forms', 'singular_name' => 'Contact Form'),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array('title', 'editor'),
    ));
});