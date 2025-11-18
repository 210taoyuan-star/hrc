# WordPress 後台設定完整指南

## 🎯 設定目標
將網站表單整合到您的 GoDaddy WordPress 後台，實現統一的客戶資料管理。

## 📋 設定前準備

### 步驟 1: 確認您的 WordPress 網站網址

根據您的 GoDaddy 管理連結，請檢查以下可能的網址：

1. **登入 GoDaddy WordPress 管理後台**：
   ```
   https://host.godaddy.com/mwp/site/405bc6ab-aa79-4b5c-9b92-51573f5ae0f1/settings
   ```

2. **查看網站設定**，確認您的 WordPress 網址，可能是：
   - `https://blog.ownbabytw.com`
   - `https://wp.ownbabytw.com`
   - `https://admin.ownbabytw.com`
   - `https://ownbabytw.com/blog`
   - `https://ownbabytw.com/wp`
   - GoDaddy 臨時網址

## 🔧 WordPress 後台設定

### 步驟 2: 安裝必要外掛

#### 2.1 安裝 Contact Form 7
1. 登入您的 WordPress 管理後台
2. 前往 `外掛` → `新增外掛`
3. 搜尋 "Contact Form 7"
4. 點擊 `安裝` → `啟用`

#### 2.2 安裝 WP Mail SMTP
1. 在外掛頁面搜尋 "WP Mail SMTP"
2. 安裝並啟用此外掛

### 步驟 3: 添加表單處理代碼

在 WordPress 後台：

1. 前往 `外觀` → `佈景主題編輯器`
2. 選擇 `functions.php` 檔案
3. 在檔案**最末端**加入以下代碼：

```php
<?php
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
?>
```

### 步驟 4: 設定 Gmail SMTP

1. 前往 `設定` → `WP Mail SMTP`
2. 選擇 `Google / Gmail`
3. 設定以下資訊：
   - **寄件人 Email**: `jctommyliu@gmail.com`
   - **寄件人名稱**: `祈孕顧問`
   - **回覆 Email**: `jctommyliu@gmail.com`

4. **OAuth 設定**（建議）：
   - 建立 Google API 專案
   - 設定 OAuth 2.0 憑證
   - 或使用應用程式密碼（較簡單）

## 🌐 前端整合設定

### 步驟 5: 更新前端表單 URL

一旦您提供 WordPress 網址，我會更新前端代碼：

```javascript
// 將這個 URL 改為您的 WordPress 網站
const WORDPRESS_FORM_ENDPOINT = "https://您的WordPress網址/wp-json/contact/v1/submit";
```

## 📊 WordPress 後台功能

設定完成後，您將在 WordPress 後台看到：

### 1. 聯絡表單選單
- 左側選單會出現 "聯絡表單" 選項
- 點擊可查看所有表單提交

### 2. 詳細客戶資訊
每個表單提交包含：
- 客戶姓名
- Email 地址
- 聯絡電話
- LINE ID（如果提供）
- 詳細訊息
- 提交時間
- IP 位址

### 3. 郵件通知
- 每次有新表單提交會自動發送郵件到 `jctommyliu@gmail.com`
- 包含完整的客戶資訊

## 🔒 安全性設定

### 速率限制
代碼已包含基本的垃圾郵件防護：
- Honeypot 欄位檢查
- 必填欄位驗證
- 資料清理（sanitization）

### 建議加強安全性
1. 安裝 Wordfence 或 Sucuri 安全外掛
2. 設定 reCAPTCHA（可選）
3. 定期備份資料庫

## 🧪 測試流程

1. **WordPress 設定確認**：
   - 檢查外掛是否正確安裝
   - 確認 functions.php 代碼已加入
   - 測試 SMTP 郵件設定

2. **API 端點測試**：
   - 訪問 `您的WordPress網址/wp-json/contact/v1`
   - 應該看到 API 端點資訊

3. **表單測試**：
   - 從前端網站提交測試表單
   - 檢查 WordPress 後台是否收到資料
   - 確認郵件通知是否正常

## 🚀 優勢總結

✅ **統一管理**: 所有客戶資料在 WordPress 後台統一查看  
✅ **資料掌控**: 資料儲存在您自己的資料庫中  
✅ **無月費**: 不依賴付費的第三方服務  
✅ **備份容易**: 隨 WordPress 一起備份  
✅ **可擴展**: 可加入更多自訂功能  

## 📞 下一步

**請提供您的 WordPress 網站實際網址**，我會立即：

1. ✅ 更新前端表單提交 URL
2. ✅ 協助完成設定測試
3. ✅ 確保整個流程正常運作

您可以從 GoDaddy WordPress 管理後台的「網站設定」中找到網址，或者告訴我您偏好的網址格式（子域名或子目錄）。