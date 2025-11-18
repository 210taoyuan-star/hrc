# 表單無法送出 - 診斷檢查清單

## 🔍 診斷步驟

### 1️⃣ 開啟瀏覽器開發者工具 (Browser DevTools)
1. 進入 https://www.ownbabytw.com
2. 按 **F12** 或 **右鍵 → 檢查**
3. 點選 **Console** 標籤
4. 清空 console 的所有信息

### 2️⃣ 嘗試送出表單
1. 填寫表單所有必填欄位
2. 點擊 **送出** 按鈕
3. 在 Console 中查看是否有任何錯誤信息

### 3️⃣ 檢查 Network 標籤（最重要！）
1. 點選 **Network** 標籤
2. 再次清空表單並填寫
3. 點擊送出
4. 查看 network 請求：
   - 應該會看到發送到 `wp-json/contact/v1/submit` 的 **POST** 請求
   - 檢查**回應狀態碼**：
     - ✅ **200** = 成功
     - ⚠️ **404** = 端點不存在（PHP 代碼未部署）
     - ⚠️ **rest_no_route** = 同上
     - ❌ **500** = PHP 代碼有錯誤
     - ❌ **CORS 錯誤** = 跨域問題

### 4️⃣ 檢查 Console 錯誤訊息
查看 console 是否有以下類型的錯誤：
```
- "rest_no_route" → PHP 代碼未正確部署到 functions.php
- "Failed to load resource" → 網路問題或 WordPress URL 錯誤
- "CORS error" → 跨域請求被阻止
- "JSON parse error" → 回應格式有問題
```

---

## 🛠️ 常見問題排除

### 問題 1: 看到 "rest_no_route" 錯誤
**原因**: PHP 代碼未部署到 WordPress

**解決方案**:
1. 登入 WordPress: https://63w.c36.myftpupload.com/wp-admin/
2. 進入 **外觀 (Appearance) → 主題編輯器 (Theme File Editor)**
3. 確認 **functions.php** 中有以下代碼：
```php
add_action('rest_api_init', function() {
    register_rest_route('contact/v1', '/submit', array(
        'methods' => 'POST',
        'callback' => 'qiyun_handle_form_submit',
        'permission_callback' => '__return_true',
    ));
});
```

### 問題 2: 看到 "500" 錯誤
**原因**: PHP 代碼有語法錯誤或函數調用問題

**解決方案**:
1. 登入 WordPress wp-admin
2. 檢查是否有 **PHP Fatal Error** 信息
3. 檢查 functions.php 最後一行是否有 `?>`（應該要刪除）

### 問題 3: CORS 跨域錯誤
**原因**: WordPress 的 CORS 政策阻止了請求

**解決方案**:
需要在 functions.php 中添加以下代碼（在 functions-ultra-simple.php 後面）：
```php
// Allow CORS for contact form
add_action('rest_api_init', function() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}, 15);
```

### 問題 4: 沒有任何網路請求被發送
**原因**: 表單 JavaScript 代碼有問題

**解決方案**:
1. 檢查 Console 是否有 JavaScript 錯誤
2. 檢查按鈕是否被正確點擊（檢查按鈕狀態）
3. 驗證表單各欄位是否有 `name` 屬性

---

## 📋 需要提供給我的信息

請告訴我：
1. **Console 中看到什麼錯誤？** (截圖或複製錯誤信息)
2. **Network 標籤中的狀態碼是？** (200, 404, 500 等)
3. **到底有沒有 POST 請求被發送？**
4. **表單可以被提交嗎？還是按鈕沒反應？**

---

## ✅ 預期流程（成功情況）

1. ✅ 填寫表單
2. ✅ 點擊送出
3. ✅ 看到 "送出中..." 加載狀態
4. ✅ Network 中看到 POST 請求回應 **200**
5. ✅ 看到 "訊息已送出！" 成功提示
6. ✅ WordPress Contact Forms 菜單中會出現新記錄
7. ✅ qiyunsolution@gmail.com 收到郵件通知

---

## 🚀 快速測試 WordPress API 端點

在瀏覽器中直接訪問：
```
https://63w.c36.myftpupload.com/wp-json/contact/v1/submit
```

**預期結果**:
- ❌ 如果看到 `"code": "rest_no_route"` → 端點未註冊，PHP 代碼未部署
- ✅ 如果看到其他錯誤（如 method not allowed）→ 端點已成功註冊

---

## 📞 提供診斷結果

請依照上述步驟檢查，然後提供以下信息：
1. Console 錯誤截圖
2. Network 回應狀態碼
3. 是否看到 POST 請求
4. 任何其他奇怪的行為
