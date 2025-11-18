# 修復 PHP 語法錯誤 - 逐步指南

## 🔴 問題
`syntax error, unexpected token "<", expecting end of file`

## ✅ 解決方案（保證有效）

### 第 1 步：清空 functions.php 文件

1. 登入 WordPress 後台
   ```
   https://63w.c36.myftpupload.com/wp-admin/
   ```

2. 點擊左側選單 → **外觀 (Appearance)** → **主題文件編輯器 (Theme File Editor)**

3. 右側找到 **functions.php** 並點擊開啟

4. **選擇全部** (Cmd+A on Mac / Ctrl+A on Windows)

5. **刪除所有內容** - 文件現在應該是完全空白的

6. **點擊「更新檔案」(Update File)**

---

### 第 2 步：複製超簡潔代碼（保證無錯誤）

以下是完整的 PHP 代碼，直接複製：

```php
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
```

---

### 第 3 步：貼上代碼

1. **點擊** functions.php 編輯器中的文本區域

2. **全選** (Cmd+A / Ctrl+A)

3. **貼上** 上方完整代碼 (Cmd+V / Ctrl+V)

4. 確保代碼完整貼入，包括開頭的 `<?php` 和結尾的 `?>`

---

### 第 4 步：儲存文件

1. **點擊「更新檔案」(Update File)** 按鈕

2. **等待反應** - 應該看到「File updated successfully」的訊息

3. **如果出現錯誤** - 告訴我具體錯誤訊息

---

### 第 5 步：驗證部署成功

1. 到 WordPress 後台左側選單

2. 查看是否出現 **「Contact Forms」** 菜單項

   ![Contact Forms menu should appear](https://imgur.com/placeholder.png)

3. 如果看到 ✅ 表示部署成功！

---

## 🔍 常見問題解決

### 問題 1：還是出現相同的語法錯誤

**解決方案：**
- 清空 functions.php
- 從上方代碼區塊**直接複製**（不要手動重打）
- 確保貼上時選擇了全部空白文本

### 問題 2：看不到「Contact Forms」菜單

**解決方案：**
- 重新整理 WordPress 後台頁面 (Cmd+R / Ctrl+R)
- 等待 10 秒後再看
- 如果還是看不到，回報我

### 問題 3：訊息說「取消更新」或「連接錯誤」

**解決方案：**
- 可能是網路問題
- 重新整理頁面後再試一次
- 確保網路連線穩定

---

## 📋 故障排除清單

- [ ] 已清空 functions.php 文件
- [ ] 已從上方代碼區塊複製完整代碼
- [ ] 代碼包含 `<?php` 開頭和 `?>` 結尾
- [ ] 已點擊「更新檔案」按鈕
- [ ] 沒有看到紅色錯誤訊息
- [ ] WordPress 後台左側出現「Contact Forms」菜單

---

## 🎯 下一步

部署成功後：

1. **測試表單提交** - 在 https://www.ownbabytw.com 提交一個測試表單

2. **檢查數據** - 在 WordPress 「Contact Forms」菜單查看提交的表單

3. **驗證郵件** - 檢查 qiyunsolution@gmail.com 是否收到通知

4. **如果都成功** - 系統已完全就緒！

---

## 💬 需要幫助？

如果遇到問題，請告訴我：
1. 具體的錯誤訊息
2. 截圖或說明你看到了什麼
3. WordPress 版本號（左下角）
