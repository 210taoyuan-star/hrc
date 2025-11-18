# 🚀 WordPress 表單系統部署指南（含 Go 主題修復）

## 🔴 當前問題

Go 主題缺失 `get_default_header_variation()` 函數導致 WordPress 無法正常運作。

**錯誤提示：**
```
Uncaught Error: Call to undefined function Go\Core\get_default_header_variation() 
in wp-content/themes/go/header.php:12
```

---

## ✅ 解決方案

已更新 `functions-ultra-simple.php` 包含修復代碼，自動定義缺失的函數。

---

## 📋 部署步驟

### 步驟 1: 準備新代碼
已在 `functions-ultra-simple.php` 中加入修復。該文件現在包含：
- ✅ Go 主題缺失函數的定義
- ✅ 表單處理系統
- ✅ REST API 端點註冊

### 步驟 2: 登入 WordPress
進入: https://63w.c36.myftpupload.com/wp-admin/

**預期結果**: 應該看到登入頁面（如果仍然報錯，請等待 30 秒後重新整理）

### 步驟 3: 進入主題編輯器
1. 左側菜單 → **外觀 (Appearance)**
2. → **主題編輯器 (Theme File Editor)**

### 步驟 4: 編輯 functions.php
1. 右側找到 **functions.php** 點擊
2. 複製 `functions-ultra-simple.php` 所有代碼
   - 在 VS Code 中：**Cmd+A** 全選 → **Cmd+C** 複製
3. 在 WordPress 編輯器中：
   - **Cmd+A** 全選現有代碼
   - **Delete** 刪除
   - **Cmd+V** 貼上新代碼
4. 點擊 **Update File** 保存

### 步驟 5: 驗證修復
重新整理 WordPress 首頁: https://63w.c36.myftpupload.com/

**預期結果**: 
- ✅ WordPress 首頁正常顯示（不再報錯）
- ✅ WordPress Admin 可正常訪問
- ✅ 左側菜單出現 **Contact Forms** 選項

---

## 🧪 測試表單系統

### 測試 1: API 端點
訪問: https://63w.c36.myftpupload.com/wp-json/contact/v1/submit

**預期結果**: 
- 看到 `method_not_allowed` 錯誤（代表端點已成功註冊）✅
- 不應該看到 `rest_no_route` 錯誤 ❌

### 測試 2: 提交表單
1. 進入: https://www.ownbabytw.com
2. 填寫表單所有必填欄位
3. 點擊 **送出** 按鈕
4. 應該看到 "訊息已送出！" 成功提示

### 測試 3: 驗證數據存儲
1. 登入 WordPress: https://63w.c36.myftpupload.com/wp-admin/
2. 左側菜單應出現 **Contact Forms** 
3. 點擊查看是否有新的表單提交記錄

### 測試 4: 驗證郵件
檢查 **qiyunsolution@gmail.com** 是否收到表單通知郵件

---

## 🆘 如果仍有問題

### 問題 A: WordPress 仍然報錯
1. 等待 60 秒後重新整理瀏覽器
2. 清除瀏覽器快取 (Cmd+Shift+Delete)
3. 在 WordPress wp-admin 右上角點擊 **Site Health** 檢查錯誤

### 問題 B: Contact Forms 菜單未出現
1. 檢查 functions.php 是否包含以下代碼：
```php
add_action('init', function() {
    register_post_type('qiyun_form', array(
        'labels' => array(
            'name' => 'Contact Forms',
            ...
```
2. 如果缺失，重新貼上完整代碼

### 問題 C: API 端點仍然返回 rest_no_route
1. 登出再登入 WordPress
2. 導航到 **設定 (Settings)** → **永久連結 (Permalinks)**
3. 點擊 **Save Changes** 重新整理 URL 結構
4. 再次測試 API 端點

### 問題 D: 表單提交時出現 CORS 錯誤
在瀏覽器 DevTools 的 Console 中查看，如果看到 CORS 錯誤，需要在 functions.php 中加入 CORS 頭部支持（聯繫我添加）

---

## 📝 部署清單

- [ ] 複製 functions-ultra-simple.php 代碼
- [ ] 貼到 WordPress functions.php
- [ ] 點擊 Update File
- [ ] 重新整理 WordPress 首頁 (檢查是否正常)
- [ ] 測試 API 端點 (應返回 method_not_allowed)
- [ ] 檢查 Contact Forms 菜單 (應出現在左側)
- [ ] 測試表單提交 (應看到成功提示)
- [ ] 驗證 WordPress 中有新記錄
- [ ] 檢查 qiyunsolution@gmail.com 郵件

---

## 🎯 預期最終結果

✅ WordPress 正常運作  
✅ Contact Forms 菜單可見  
✅ 表單可成功提交  
✅ 數據存儲到 WordPress  
✅ 郵件通知發送到 qiyunsolution@gmail.com  
✅ 網站上的表單可正常使用  

---

## 📞 需要幫助？

如果部署後仍有問題，請提供：
1. WordPress Admin 的 Site Health 報告
2. 瀏覽器 DevTools Console 中的錯誤信息
3. 是否能看到 Contact Forms 菜單
4. 表單提交時的具體錯誤信息
