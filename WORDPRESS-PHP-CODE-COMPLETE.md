# PHP 表單處理代碼 - 完整版本

## 📋 重要提醒
請將以下代碼**完整複製**並貼到您的 WordPress `functions.php` 檔案的**最末端**。

## 🔧 完整 PHP 代碼

```php
<?php
// 祈孕顧問 - 自訂表單處理系統
// 添加自訂 REST API 端點接收表單
add_action('rest_api_init', function () {
    register_rest_route('contact/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form_submission',
        'permission_callback' => '__return_true',
    ));
});

function handle_contact_form_submission($request) {
    // 獲取 JSON 格式的參數
    $params = $request->get_json_params();
    
    // 如果沒有 JSON 參數，嘗試獲取 POST 參數
    if (empty($params)) {
        $params = $request->get_params();
    }
    
    // 垃圾郵件檢查 (honeypot)
    if (!empty($params['hp'])) {
        return new WP_REST_Response(['success' => true], 200);
    }
    
    // 驗證必填欄位
    if (empty($params['name']) || empty($params['email']) || empty($params['phone']) || empty($params['message'])) {
        return new WP_REST_Response([
            'error' => 'Missing required fields',
            'required' => ['name', 'email', 'phone', 'message']
        ], 400);
    }
    
    // Email 格式驗證
    if (!is_email($params['email'])) {
        return new WP_REST_Response(['error' => 'Invalid email format'], 400);
    }
    
    // 儲存到資料庫
    $submission_data = array(
        'post_title' => '聯絡表單 - ' . sanitize_text_field($params['name']) . ' (' . date('Y-m-d H:i') . ')',
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
            'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? '',
        ),
    );
    
    $post_id = wp_insert_post($submission_data);
    
    if ($post_id && !is_wp_error($post_id)) {
        // 發送郵件通知到 qiyunsolution@gmail.com
        $to = 'qiyunsolution@gmail.com';
        $subject = '[祈孕顧問] 新的網站聯絡表單 - ' . $params['name'];
        
        // HTML 格式的郵件內容
        $message = "
        <html>
        <head>
            <meta charset='UTF-8'>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .header { background: #0f766e; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #0f766e; }
                .value { margin-left: 10px; }
                .footer { background: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #666; }
            </style>
        </head>
        <body>
            <div class='header'>
                <h2>🤱 祈孕顧問 - 新客戶聯絡</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>👤 客戶姓名:</span>
                    <span class='value'>" . esc_html($params['name']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>📧 Email:</span>
                    <span class='value'>" . esc_html($params['email']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>📱 聯絡電話:</span>
                    <span class='value'>" . esc_html($params['phone']) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>💬 LINE ID:</span>
                    <span class='value'>" . (empty($params['lineId']) ? '(未提供)' : esc_html($params['lineId'])) . "</span>
                </div>
                <div class='field'>
                    <span class='label'>📝 諮詢內容:</span>
                    <div style='background: #f9f9f9; padding: 15px; border-left: 4px solid #0f766e; margin-top: 10px;'>
                        " . nl2br(esc_html($params['message'])) . "
                    </div>
                </div>
            </div>
            <div class='footer'>
                <p>提交時間: " . current_time('Y-m-d H:i:s') . " | IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'Unknown') . "</p>
                <p>此郵件由祈孕顧問網站自動發送 | <a href='https://www.ownbabytw.com'>www.ownbabytw.com</a></p>
            </div>
        </body>
        </html>
        ";
        
        // 設定郵件標頭為 HTML 格式
        $headers = array(
            'Content-Type: text/html; charset=UTF-8',
            'From: 祈孕顧問 <qiyunsolution@gmail.com>',
            'Reply-To: ' . $params['email']
        );
        
        // 發送郵件
        $mail_sent = wp_mail($to, $subject, $message, $headers);
        
        // 記錄郵件發送狀態
        update_post_meta($post_id, 'email_sent', $mail_sent ? 'yes' : 'no');
        update_post_meta($post_id, 'email_sent_time', current_time('mysql'));
        
        return new WP_REST_Response([
            'success' => true,
            'message' => 'Form submitted successfully',
            'id' => $post_id,
            'email_sent' => $mail_sent
        ], 200);
    } else {
        return new WP_REST_Response([
            'error' => 'Failed to save submission',
            'wp_error' => is_wp_error($post_id) ? $post_id->get_error_message() : 'Unknown error'
        ], 500);
    }
}

// 註冊自訂文章類型來儲存表單提交
add_action('init', function() {
    register_post_type('contact_submission', array(
        'labels' => array(
            'name' => '📋 聯絡表單',
            'singular_name' => '聯絡表單',
            'menu_name' => '聯絡表單',
            'add_new' => '新增表單',
            'add_new_item' => '新增聯絡表單',
            'edit_item' => '編輯聯絡表單',
            'new_item' => '新聯絡表單',
            'view_item' => '查看聯絡表單',
            'search_items' => '搜尋聯絡表單',
            'not_found' => '找不到聯絡表單',
            'not_found_in_trash' => '垃圾桶中沒有聯絡表單'
        ),
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_position' => 25,
        'capability_type' => 'post',
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-email-alt',
        'has_archive' => false,
        'hierarchical' => false,
    ));
});

// 自訂聯絡表單的管理頁面欄位
add_filter('manage_contact_submission_posts_columns', function($columns) {
    $new_columns = array();
    $new_columns['cb'] = $columns['cb'];
    $new_columns['title'] = '客戶姓名';
    $new_columns['contact_email'] = '📧 Email';
    $new_columns['contact_phone'] = '📱 電話';
    $new_columns['contact_line_id'] = '💬 LINE ID';
    $new_columns['submission_date'] = '📅 提交時間';
    $new_columns['email_sent'] = '📧 郵件狀態';
    return $new_columns;
});

// 顯示自訂欄位內容
add_action('manage_contact_submission_posts_custom_column', function($column, $post_id) {
    switch ($column) {
        case 'contact_email':
            $email = get_post_meta($post_id, 'contact_email', true);
            echo $email ? '<a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a>' : '-';
            break;
        case 'contact_phone':
            $phone = get_post_meta($post_id, 'contact_phone', true);
            echo $phone ? '<a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a>' : '-';
            break;
        case 'contact_line_id':
            $line_id = get_post_meta($post_id, 'contact_line_id', true);
            echo $line_id ? esc_html($line_id) : '-';
            break;
        case 'submission_date':
            $date = get_post_meta($post_id, 'submission_date', true);
            echo $date ? esc_html($date) : '-';
            break;
        case 'email_sent':
            $sent = get_post_meta($post_id, 'email_sent', true);
            if ($sent === 'yes') {
                echo '<span style="color: green;">✅ 已發送</span>';
            } elseif ($sent === 'no') {
                echo '<span style="color: red;">❌ 發送失敗</span>';
            } else {
                echo '<span style="color: gray;">⏳ 處理中</span>';
            }
            break;
    }
}, 10, 2);

// 讓自訂欄位可以排序
add_filter('manage_edit-contact_submission_sortable_columns', function($columns) {
    $columns['contact_email'] = 'contact_email';
    $columns['contact_phone'] = 'contact_phone';
    $columns['submission_date'] = 'submission_date';
    return $columns;
});

// 在編輯頁面顯示詳細的客戶資訊
add_action('add_meta_boxes', function() {
    add_meta_box(
        'contact_details',
        '👤 客戶詳細資訊',
        'contact_details_callback',
        'contact_submission',
        'normal',
        'high'
    );
});

function contact_details_callback($post) {
    $name = get_post_meta($post->ID, 'contact_name', true);
    $email = get_post_meta($post->ID, 'contact_email', true);
    $phone = get_post_meta($post->ID, 'contact_phone', true);
    $line_id = get_post_meta($post->ID, 'contact_line_id', true);
    $date = get_post_meta($post->ID, 'submission_date', true);
    $ip = get_post_meta($post->ID, 'user_ip', true);
    $user_agent = get_post_meta($post->ID, 'user_agent', true);
    $email_sent = get_post_meta($post->ID, 'email_sent', true);
    $email_sent_time = get_post_meta($post->ID, 'email_sent_time', true);
    
    echo '<table class="form-table">';
    echo '<tr><th>👤 客戶姓名</th><td>' . esc_html($name) . '</td></tr>';
    echo '<tr><th>📧 Email</th><td><a href="mailto:' . esc_attr($email) . '">' . esc_html($email) . '</a></td></tr>';
    echo '<tr><th>📱 聯絡電話</th><td><a href="tel:' . esc_attr($phone) . '">' . esc_html($phone) . '</a></td></tr>';
    echo '<tr><th>💬 LINE ID</th><td>' . ($line_id ? esc_html($line_id) : '未提供') . '</td></tr>';
    echo '<tr><th>📅 提交時間</th><td>' . esc_html($date) . '</td></tr>';
    echo '<tr><th>🌐 IP 位址</th><td>' . esc_html($ip) . '</td></tr>';
    echo '<tr><th>🖥️ 瀏覽器</th><td>' . esc_html($user_agent) . '</td></tr>';
    echo '<tr><th>📧 郵件狀態</th><td>';
    if ($email_sent === 'yes') {
        echo '<span style="color: green;">✅ 已發送</span> (' . esc_html($email_sent_time) . ')';
    } elseif ($email_sent === 'no') {
        echo '<span style="color: red;">❌ 發送失敗</span>';
    } else {
        echo '<span style="color: gray;">⏳ 處理中</span>';
    }
    echo '</td></tr>';
    echo '</table>';
}

// 添加儀表板小工具顯示最新表單
add_action('wp_dashboard_setup', function() {
    wp_add_dashboard_widget(
        'latest_contact_forms',
        '📋 最新聯絡表單',
        'dashboard_contact_forms_widget'
    );
});

function dashboard_contact_forms_widget() {
    $recent_forms = get_posts(array(
        'post_type' => 'contact_submission',
        'numberposts' => 5,
        'post_status' => 'private'
    ));
    
    if ($recent_forms) {
        echo '<ul>';
        foreach ($recent_forms as $form) {
            $name = get_post_meta($form->ID, 'contact_name', true);
            $email = get_post_meta($form->ID, 'contact_email', true);
            $date = get_post_meta($form->ID, 'submission_date', true);
            
            echo '<li>';
            echo '<strong>' . esc_html($name) . '</strong> ';
            echo '<small>(' . esc_html($email) . ')</small><br>';
            echo '<small style="color: #666;">' . esc_html($date) . '</small>';
            echo '</li>';
        }
        echo '</ul>';
        echo '<p><a href="' . admin_url('edit.php?post_type=contact_submission') . '">查看所有表單 →</a></p>';
    } else {
        echo '<p>目前沒有聯絡表單。</p>';
    }
}
?>
```

## 📧 Gmail SMTP 設定指南

### 1. 安裝 WP Mail SMTP 外掛
1. 登入 WordPress 後台：`https://63w.c36.myftpupload.com/wp-admin/`
2. 前往 `外掛` → `新增外掛`
3. 搜尋 "WP Mail SMTP"
4. 安裝並啟用

### 2. 設定 Gmail SMTP
1. 前往 `設定` → `WP Mail SMTP`
2. 選擇 `Google / Gmail`
3. 填入以下資訊：
   - **寄件人 Email**: `qiyunsolution@gmail.com`
   - **寄件人名稱**: `祈孕顧問`
   - **回覆 Email**: `qiyunsolution@gmail.com`

### 3. Gmail 應用程式密碼設定
1. 前往 [Google 帳戶管理](https://myaccount.google.com/)
2. 點選 `安全性`
3. 啟用 `兩步驟驗證`
4. 產生 `應用程式密碼`
5. 將密碼貼到 WP Mail SMTP 設定中

## ✅ 設定完成後的功能

- 🎯 **統一後台管理** - 所有表單在 WordPress 左側選單的「聯絡表單」
- 📧 **自動郵件通知** - 新表單自動發送到 `qiyunsolution@gmail.com`
- 📊 **詳細客戶資訊** - 包含姓名、Email、電話、LINE ID、IP 等
- 🎨 **美化界面** - 表情符號和顏色標示，易於管理
- 📱 **可點擊聯絡** - Email 和電話可直接點擊聯絡
- 📈 **儀表板摘要** - 首頁顯示最新 5 筆表單

需要我協助您測試或解答任何問題嗎？