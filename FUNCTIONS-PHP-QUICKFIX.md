# 🚀 WordPress functions.php - 快速修復清單

## 🎯 立即行動（5 分鐘）

### ✅ 檢查清單

在 WordPress 後台操作前，請確認：

- [ ] 已登入：https://63w.c36.myftpupload.com/wp-admin/
- [ ] 前往：`外觀` → `佈景主題編輯器`
- [ ] 找到：`functions.php` 檔案
- [ ] 已滾動到文件末端

### 🔍 診斷當前問題

**問題**：`syntax error, unexpected token "<", expecting end of file`

**可能原因**：
1. ❌ 文件末尾有 `?>` 符號
2. ❌ 有多個空白行或特殊字符
3. ❌ 代碼衝突或重複

### 🛠️ 修復步驟

#### 步驟 1: 清理文件末端
```
當前狀態              應該變成
================    ================
...代碼...          ...代碼...
?>                  (沒有這行)
(空行)              (直接結束)
```

**操作**：
1. 滾動到文件最末端
2. 找到 `?>` 符號
3. **選擇並刪除** `?>` 以及後面的所有空白
4. 確保文件直接以代碼結束

#### 步驟 2: 貼入新代碼

**複製以下代碼**（完整複製）：

```
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

**操作**：
1. 在 WordPress 中滾動到末端
2. 把光標放在文件最後
3. 按 Enter 創建新行
4. 貼入上方代碼
5. 點擊「更新檔案」

#### 步驟 3: 驗證成功

頁面應該顯示：
- ✅ 檔案已更新
- ✅ 沒有紅色錯誤訊息

#### 步驟 4: 檢查功能

在 WordPress 左側選單應該出現：
- ✅ 新的「Contact Forms」菜單
- ✅ 可以訪問 API：https://63w.c36.myftpupload.com/wp-json/contact/v1

## 🚨 如果還是失敗

**請做以下檢查**：

1. **檢查原有代碼**
   - 問：functions.php 原本最後一行是什麼？
   - 答：

2. **檢查錯誤訊息**
   - 問：完整的錯誤訊息是什麼？
   - 答：

3. **檢查行號**
   - 問：錯誤指向第幾行？
   - 答：

## 💡 備選方案

如果上方方案還是不行，我們可以嘗試：
1. 完全重置 functions.php（可能損失其他自訂代碼）
2. 使用 FTP 直接編輯文件
3. 使用 WP-CLI 命令行工具

## 📞 準備好了嗎？

**準備開始修復？**

告訴我：
1. ✅ 您現在看到的 functions.php 最後一行是什麼？
2. ✅ 您準備好按照步驟操作嗎？
3. ✅ 有任何問題需要澄清嗎？

我會一步步協助您！