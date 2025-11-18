# WordPress 後台設定完整指南

## 🎯 您的 WordPress 網站資訊

**WordPress 管理後台**：https://63w.c36.myftpupload.com/wp-admin/  
**WordPress 網站網址**：https://63w.c36.myftpupload.com  
**表單 API 端點**：https://63w.c36.myftpupload.com/wp-json/contact/v1/submit  

## ✅ 已完成設定

### 前端表單整合
- ✅ 前端表單已更新為 WordPress 優先
- ✅ Formspree 保留作為備用系統
- ✅ 支援 LINE ID 欄位
- ✅ 包含防垃圾郵件機制

## 📋 WordPress 後台設定步驟

### 步驟 1: 安裝必要外掛

請登入您的 WordPress 管理後台：**https://63w.c36.myftpupload.com/wp-admin/**

#### 1.1 安裝 Contact Form 7
1. 前往 `外掛` → `新增外掛`
2. 搜尋 "Contact Form 7"
3. 點擊 `安裝` → `啟用`

#### 1.2 安裝 WP Mail SMTP
1. 在外掛頁面搜尋 "WP Mail SMTP"
2. 安裝並啟用此外掛

### 步驟 2: 添加表單處理代碼

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
    $params = $request->get_json_params();
    
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

### 步驟 3: 設定 Gmail SMTP

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

## 🔍 測試步驟

### 1. 檢查 API 端點
訪問：`https://63w.c36.myftpupload.com/wp-json/contact/v1`
應該看到 API 端點資訊

### 2. 測試表單提交
1. 前往您的網站：`https://www.ownbabytw.com`
2. 填寫並提交聯絡表單
3. 檢查 WordPress 後台是否收到資料

### 3. 檢查郵件通知
確認是否收到郵件通知到 `jctommyliu@gmail.com`

## 📊 WordPress 後台功能

設定完成後，您將在 WordPress 後台看到：

### 聯絡表單選單
- 左側選單會出現 "聯絡表單" 選項
- 可查看所有表單提交記錄

### 詳細客戶資訊
每個表單提交包含：
- ✅ 客戶姓名
- ✅ Email 地址  
- ✅ 聯絡電話
- ✅ LINE ID（如果提供）
- ✅ 詳細訊息
- ✅ 提交時間
- ✅ IP 位址

### 自動郵件通知
每次新表單提交會自動發送郵件到 `jctommyliu@gmail.com`

## 🚀 系統優勢

✅ **WordPress 主要** - 客戶資料直接進入您的後台  
✅ **Formspree 備份** - 確保不遺失任何表單  
✅ **統一管理** - 所有客戶資料在一個地方  
✅ **自動通知** - 立即收到新客戶聯絡  
✅ **LINE 整合** - 包含客戶 LINE ID 資訊  

## 📞 需要協助？

如果在設定過程中遇到任何問題，請告訴我：

1. 哪個步驟遇到困難
2. 看到的錯誤訊息
3. 需要更詳細的說明

設定完成後，您的客戶表單系統就會完全整合到 WordPress 後台了！