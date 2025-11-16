# WordPress 表單後台設定指南

## 🎯 概述
將網站聯絡表單整合到 GoDaddy WordPress 後台，讓您可以在 WordPress 管理介面直接查看和管理所有表單提交。

## 🔧 WordPress 端設定

### 步驟 1: 安裝聯絡表單外掛

推薦使用以下任一外掛：

#### 選項 A: Contact Form 7 (推薦)
1. 登入您的 WordPress 管理後台
2. 前往 `外掛` → `新增外掛`
3. 搜尋 "Contact Form 7"
4. 安裝並啟用

#### 選項 B: WPForms
1. 搜尋 "WPForms"
2. 安裝並啟用 (有免費版本)

### 步驟 2: 建立接收表單的端點

#### 使用 Contact Form 7:
1. 前往 `聯絡表單` → `新增`
2. 表單代碼範例：
```
[text* your-name placeholder "您的姓名"]
[email* your-email placeholder "Email"]
[tel* your-phone placeholder "聯絡電話"]
[text your-line-id placeholder "您的 LINE ID (選填)"]
[textarea* your-message placeholder "想了解的重點"]
[submit "送出表單"]
```

3. 設定郵件內容：
   - 收件人：`jctommyliu@gmail.com`
   - 主旨：`[祈孕顧問] 網站聯絡表單`

### 步驟 3: 建立 REST API 端點

在您的 WordPress 主題的 `functions.php` 檔案中加入：

```php
// 添加自訂 REST API 端點接收表單
add_action('rest_api_init', function () {
    register_rest_route('contact/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'handle_contact_form_submission',
        'permission_callback' => '__return_true',
    ));
});

function handle_contact_form_submission($request) {
    $params = $request->get_params();
    
    // 垃圾郵件檢查 (honeypot)
    if (!empty($params['hp'])) {
        return new WP_REST_Response(['success' => true], 200);
    }
    
    // 驗證必填欄位
    if (empty($params['name']) || empty($params['email']) || empty($params['phone']) || empty($params['message'])) {
        return new WP_REST_Response(['error' => 'Missing required fields'], 400);
    }
    
    // 儲存到資料庫
    $submission_data = array(
        'post_title' => '聯絡表單 - ' . sanitize_text_field($params['name']),
        'post_content' => sanitize_textarea_field($params['message']),
        'post_status' => 'private',
        'post_type' => 'contact_submission',
        'meta_input' => array(
            'contact_name' => sanitize_text_field($params['name']),
            'contact_email' => sanitize_email($params['email']),
            'contact_phone' => sanitize_text_field($params['phone']),
            'contact_line_id' => sanitize_text_field($params['lineId']),
            'submission_date' => current_time('mysql'),
            'user_ip' => $_SERVER['REMOTE_ADDR'],
        ),
    );
    
    $post_id = wp_insert_post($submission_data);
    
    if ($post_id) {
        // 發送郵件通知
        $to = 'jctommyliu@gmail.com';
        $subject = '[祈孕顧問] 新的網站聯絡表單';
        $message = "
        新的聯絡表單提交：
        
        姓名: " . $params['name'] . "
        Email: " . $params['email'] . "
        電話: " . $params['phone'] . "
        LINE ID: " . ($params['lineId'] ?: '(未提供)') . "
        
        訊息內容:
        " . $params['message'] . "
        
        ---
        提交時間: " . current_time('Y-m-d H:i:s') . "
        IP 位址: " . $_SERVER['REMOTE_ADDR'] . "
        ";
        
        wp_mail($to, $subject, $message);
        
        return new WP_REST_Response(['success' => true], 200);
    } else {
        return new WP_REST_Response(['error' => 'Failed to save submission'], 500);
    }
}

// 註冊自訂文章類型來儲存表單提交
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
        'menu_icon' => 'dashicons-email-alt',
    ));
});
```

## 🌐 前端整合

### 步驟 4: 更新 React 表單提交邏輯

將表單提交 URL 更改為您的 WordPress REST API：

```javascript
// 將這個 URL 改為您的 WordPress 網站
const WORDPRESS_FORM_ENDPOINT = "https://your-wordpress-site.com/wp-json/contact/v1/submit";
```

## 📋 WordPress 後台管理

### 查看表單提交：
1. 登入 WordPress 管理後台
2. 左側選單會出現 "聯絡表單" 選項
3. 點擊查看所有提交的表單

### 表單資料包含：
- 提交者姓名
- Email 地址
- 聯絡電話
- LINE ID (如果提供)
- 詳細訊息
- 提交時間
- IP 位址

## 🔒 安全性設定

### 1. 啟用 reCAPTCHA (建議)
```php
// 在 functions.php 中加入 Google reCAPTCHA 驗證
function verify_recaptcha($token) {
    $secret = 'YOUR_RECAPTCHA_SECRET_KEY';
    $response = wp_remote_post('https://www.google.com/recaptcha/api/siteverify', array(
        'body' => array(
            'secret' => $secret,
            'response' => $token,
        ),
    ));
    
    $body = wp_remote_retrieve_body($response);
    $result = json_decode($body, true);
    
    return $result['success'];
}
```

### 2. 速率限制
```php
// 限制同一 IP 的提交頻率
function check_submission_rate_limit($ip) {
    $recent_submissions = get_posts(array(
        'post_type' => 'contact_submission',
        'posts_per_page' => 1,
        'meta_query' => array(
            array(
                'key' => 'user_ip',
                'value' => $ip,
            ),
        ),
        'date_query' => array(
            array(
                'after' => '5 minutes ago',
            ),
        ),
    ));
    
    return empty($recent_submissions);
}
```

## 📧 郵件設定

### SMTP 設定 (建議)：
1. 安裝 "WP Mail SMTP" 外掛
2. 設定使用 Gmail SMTP：
   - SMTP 主機：smtp.gmail.com
   - 加密：SSL
   - 連接埠：465
   - 使用您的 Gmail 憑證

## 🚀 部署步驟

1. 在 WordPress 後台完成上述設定
2. 取得您的 WordPress REST API URL
3. 更新前端代碼中的提交端點
4. 測試表單提交功能

---

## 💡 優勢

### WordPress 整合的好處：
- **統一管理**：所有表單在 WordPress 後台統一查看
- **資料保存**：表單資料儲存在您自己的資料庫
- **自訂功能**：可以加入更多自訂欄位和邏輯
- **備份容易**：隨 WordPress 網站一起備份
- **無第三方依賴**：不依賴 Formspree 等外部服務

### 與現有功能整合：
- 可以與 WordPress 的客戶管理系統整合
- 支援自動回覆郵件
- 可以設定表單提交後的自訂動作
- 支援多種通知方式

需要我協助您實作這個整合嗎？