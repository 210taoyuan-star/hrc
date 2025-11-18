# ✅ WordPress functions.php - 簡化可用版本

## 📝 完整可用代碼

**請將以下代碼複製到 WordPress functions.php 的末端：**

```php
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
```

## 🎯 使用步驟

### 1️⃣ 登入 WordPress
```
https://63w.c36.myftpupload.com/wp-admin/
```

### 2️⃣ 前往 functions.php
- 左側選單 → `外觀` → `佈景主題編輯器`
- 右側找到並點擊 `functions.php`

### 3️⃣ 檢查文件末尾
- 滾動到文件最末端
- 看看最後是什麼

### 4️⃣ 重要！清理末尾
- 如果最後有 `?>` **刪除它**
- 如果最後有多個空行，**清理掉**
- 只保留實際代碼

### 5️⃣ 貼入代碼
- 複製上方的代碼（從 `// ===== 祈孕顧問表單系統 =====` 到 `// ===== 結束 =====`）
- 貼到 functions.php 末端
- **不要加** `<?php` 或 `?>`

### 6️⃣ 儲存
- 點擊「**更新檔案**」
- 等待頁面刷新

## ✅ 驗證成功

如果設定成功，您會看到：
- ✅ WordPress 後台沒有錯誤
- ✅ 左側選單出現「Contact Forms」選項
- ✅ 可以看到表單提交記錄

## ⚠️ 如果還是有錯誤

**請告訴我：**
1. 具體的錯誤訊息
2. 錯誤出現在第幾行
3. WordPress 後台 functions.php 最後一行是什麼

我會幫您快速修復！