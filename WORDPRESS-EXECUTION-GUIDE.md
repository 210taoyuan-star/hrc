# 🚀 WordPress 表單整合 - 完整執行指南

## 📋 執行清單

### ✅ 已完成項目
- [x] 確認 WordPress 網站網址：`https://63w.c36.myftpupload.com`
- [x] 更新前端表單 URL 為 WordPress API 端點
- [x] 準備完整 PHP 表單處理代碼
- [x] 郵件通知設定為 `qiyunsolution@gmail.com`

### 🔄 需要執行的步驟

#### 步驟 1: WordPress 後台設定
**您需要親自操作的部分**

1. **登入 WordPress 管理後台**
   ```
   網址：https://63w.c36.myftpupload.com/wp-admin/
   ```

2. **添加 PHP 表單處理代碼**
   - 前往：`外觀` → `佈景主題編輯器`
   - 選擇：`functions.php` 檔案
   - 滾動到檔案**最末端**
   - 複製貼上：`WORDPRESS-PHP-CODE-COMPLETE.md` 中的完整 PHP 代碼
   - 點擊：「更新檔案」

3. **安裝 Contact Form 7 外掛**（可選，但建議安裝）
   - 前往：`外掛` → `新增外掛`
   - 搜尋：`Contact Form 7`
   - 點擊：`安裝` → `啟用`

4. **安裝 WP Mail SMTP 外掛**
   - 前往：`外掛` → `新增外掛`
   - 搜尋：`WP Mail SMTP`
   - 點擊：`安裝` → `啟用`

5. **設定 Gmail SMTP**
   - 前往：`設定` → `WP Mail SMTP`
   - 選擇：`Google / Gmail`
   - 填入：
     - 寄件人 Email: `qiyunsolution@gmail.com`
     - 寄件人名稱: `祈孕顧問`
     - 回覆 Email: `qiyunsolution@gmail.com`

#### 步驟 2: 測試 API 端點
**檢查 WordPress API 是否正常運作**

1. **測試 API 端點**
   ```
   在瀏覽器訪問：https://63w.c36.myftpupload.com/wp-json/contact/v1
   ```
   
   **預期結果**：應該看到 API 端點資訊或錯誤訊息

2. **檢查 WordPress 後台**
   - 左側選單應該出現「📋 聯絡表單」選項
   - 儀表板應該顯示「📋 最新聯絡表單」小工具

#### 步驟 3: 前端測試
**測試網站表單功能**

1. **訪問您的網站**
   ```
   網址：https://www.ownbabytw.com
   ```

2. **測試表單提交**
   - 填寫聯絡表單
   - 包含：姓名、Email、電話、LINE ID、訊息
   - 點擊「發送諮詢」

3. **檢查結果**
   - 表單應該顯示「感謝您的聯絡」成功訊息
   - WordPress 後台應該收到新的聯絡表單記錄
   - `qiyunsolution@gmail.com` 應該收到郵件通知

## 🔧 故障排除

### 如果 API 端點無法訪問
1. 檢查 PHP 代碼是否正確加入到 `functions.php`
2. 確認沒有 PHP 語法錯誤
3. 檢查 WordPress 後台是否有錯誤訊息

### 如果郵件無法發送
1. 確認 WP Mail SMTP 外掛已安裝並啟用
2. 檢查 Gmail SMTP 設定是否正確
3. 可能需要設定 Gmail 應用程式密碼

### 如果表單無法提交
1. 檢查瀏覽器開發者工具的 Console 和 Network 標籤
2. 確認 API 端點回應是否正常
3. 檢查是否有 CORS 錯誤

## 📊 成功指標

### WordPress 後台應該看到：
- ✅ 左側選單出現「📋 聯絡表單」
- ✅ 儀表板顯示「📋 最新聯絡表單」小工具
- ✅ 可以查看客戶詳細資訊（姓名、Email、電話、LINE ID）

### 郵件通知應該包含：
- ✅ 客戶姓名、Email、電話、LINE ID
- ✅ 完整諮詢內容
- ✅ 提交時間和 IP 位址
- ✅ HTML 格式美化顯示

### 前端網站應該：
- ✅ 表單提交成功顯示感謝訊息
- ✅ 表單欄位清空
- ✅ 如果 WordPress 失敗，自動使用 Formspree 備份

## 📞 需要協助？

如果遇到任何問題，請告訴我：

1. **具體在哪個步驟遇到困難**
2. **看到的錯誤訊息**
3. **是否成功訪問 WordPress 後台**
4. **API 端點測試結果**

我會立即協助解決！

## 🎉 完成後的效果

一旦設定完成，您將擁有：

- 🎯 **專業表單管理系統** - 所有客戶聯絡統一管理
- 📧 **即時郵件通知** - 新客戶立即通知您
- 📱 **LINE 整合** - 客戶 LINE ID 資訊完整保存
- 🔒 **資料安全** - 客戶資料儲存在您自己的資料庫
- 🎨 **美化界面** - 易於使用的管理後台
- 📊 **詳細統計** - 客戶資訊一目了然

準備好開始了嗎？從步驟 1 開始執行吧！