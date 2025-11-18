<?php
// 祈孕顧問 - 自訂表單處理系統
add_action('rest_api_init', function () {
    register_rest_route('contact/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form_submission',
        'permission_callback' => '__return_true',
    ));
});

function handle_contact_form_submission($request) {
    $params = $request->get_json_params();
    if (empty($params)) {
        $params = $request->get_params();
    }
    
    if (!empty($params['hp'])) {
        return new WP_REST_Response(['success' => true], 200);
    }
    
    if (empty($params['name']) || empty($params['email']) || empty($params['phone']) || empty($params['message'])) {
        return new WP_REST_Response(['error' => 'Missing required fields'], 400);
    }
    
    if (!is_email($params['email'])) {
        return new WP_REST_Response(['error' => 'Invalid email format'], 400);
    }
    
    $submission_data = array(
        'post_title' => '聯絡表單 - ' . sanitize_text_field($params['name']),
        'post_content' => sanitize_textarea_field($params['message']),
        'post_status' => 'private',
        'post_type' => 'contact_submission',
        'meta_input' => array(
            'contact_name' => sanitize_text_field($params['name']),
            'contact_email' => sanitize_email($params['email']),
            'contact_phone' => sanitize_text_field($params['phone']),
            'contact_line_id' => sanitize_text_field($params['lineId'] ?? ''),
            'submission_date' => current_time('mysql'),
            'user_ip' => $_SERVER['REMOTE_ADDR'] ?? '',
        ),
    );
    
    $post_id = wp_insert_post($submission_data);
    
    if ($post_id && !is_wp_error($post_id)) {
        $to = 'qiyunsolution@gmail.com';
        $subject = '[祈孕顧問] 新的網站聯絡表單 - ' . $params['name'];
        $message = 'Customer: ' . $params['name'] . "\n";
        $message .= 'Email: ' . $params['email'] . "\n";
        $message .= 'Phone: ' . $params['phone'] . "\n";
        $message .= 'LINE: ' . ($params['lineId'] ?? 'N/A') . "\n\n";
        $message .= 'Message: ' . $params['message'];
        
        $headers = array(
            'Content-Type: text/plain; charset=UTF-8',
            'From: qiyunsolution@gmail.com',
        );
        
        $mail_sent = wp_mail($to, $subject, $message, $headers);
        update_post_meta($post_id, 'email_sent', $mail_sent ? 'yes' : 'no');
        
        return new WP_REST_Response(['success' => true], 200);
    } else {
        return new WP_REST_Response(['error' => 'Failed to save'], 500);
    }
}

add_action('init', function() {
    register_post_type('contact_submission', array(
        'labels' => array(
            'name' => '聯絡表單',
            'singular_name' => '聯絡表單',
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'capability_type' => 'post',
        'supports' => array('title', 'editor'),
    ));
});
