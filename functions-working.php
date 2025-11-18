<?php
// ===== 祈孕顧問表單系統 =====
add_action('rest_api_init', function() {
    register_rest_route('contact/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'qiyun_handle_form',
        'permission_callback' => '__return_true',
    ));
});

function qiyun_handle_form($request) {
    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_params();
    }
    
    if (!empty($params['hp'])) {
        return new WP_REST_Response(array('success' => true), 200);
    }
    
    $name = isset($params['name']) ? sanitize_text_field($params['name']) : '';
    $email = isset($params['email']) ? sanitize_email($params['email']) : '';
    $phone = isset($params['phone']) ? sanitize_text_field($params['phone']) : '';
    $message = isset($params['message']) ? sanitize_textarea_field($params['message']) : '';
    $line_id = isset($params['lineId']) ? sanitize_text_field($params['lineId']) : '';
    
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        return new WP_REST_Response(array('error' => 'Missing fields'), 400);
    }
    
    if (!is_email($email)) {
        return new WP_REST_Response(array('error' => 'Invalid email'), 400);
    }
    
    $post = array(
        'post_title' => 'Form - ' . $name,
        'post_content' => $message,
        'post_status' => 'private',
        'post_type' => 'qiyun_form',
    );
    
    $post_id = wp_insert_post($post);
    
    if ($post_id > 0) {
        update_post_meta($post_id, 'qiyun_name', $name);
        update_post_meta($post_id, 'qiyun_email', $email);
        update_post_meta($post_id, 'qiyun_phone', $phone);
        update_post_meta($post_id, 'qiyun_line', $line_id);
        
        $to = 'qiyunsolution@gmail.com';
        $subject = 'Contact Form - ' . $name;
        $body = "Name: $name\nEmail: $email\nPhone: $phone\nLINE: $line_id\n\nMessage:\n$message";
        $headers = array('Content-Type: text/plain; charset=UTF-8');
        
        wp_mail($to, $subject, $body, $headers);
        
        return new WP_REST_Response(array('success' => true, 'id' => $post_id), 200);
    }
    
    return new WP_REST_Response(array('error' => 'Failed'), 500);
}

add_action('init', function() {
    register_post_type('qiyun_form', array(
        'labels' => array('name' => 'Contact Forms'),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array('title', 'editor'),
    ));
});
// ===== 結束 =====
