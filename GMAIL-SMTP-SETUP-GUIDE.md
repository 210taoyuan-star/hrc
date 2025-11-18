# Gmail SMTP 設定完整指南

## 📧 設定資訊
- **寄件人 Email**: `qiyunsolution@gmail.com`
- **寄件人名稱**: `祈孕顧問`
- **回覆 Email**: `qiyunsolution@gmail.com`

## 🔧 詳細設定步驟

### 步驟 1: 登入 WordPress 後台
```
網址：https://63w.c36.myftpupload.com/wp-admin/
```

### 步驟 2: 安裝 WP Mail SMTP 外掛

1. **前往外掛頁面**
   - 左側選單點擊 `外掛` → `新增外掛`

2. **搜尋外掛**
   - 在搜尋框輸入：`WP Mail SMTP`
   - 找到 "WP Mail SMTP by WPForms" 外掛

3. **安裝並啟用**
   - 點擊 `立即安裝`
   - 安裝完成後點擊 `啟用`

### 步驟 3: 設定 Gmail SMTP

1. **前往設定頁面**
   - 左側選單點擊 `設定` → `WP Mail SMTP`

2. **選擇郵件服務**
   - 選擇 `Google / Gmail`

3. **填寫寄件人資訊**
   ```
   寄件人 Email: qiyunsolution@gmail.com
   強制寄件人名稱: 祈孕顧問
   強制回覆 Email: qiyunsolution@gmail.com
   ```

4. **SMTP 設定**
   ```
   SMTP 主機: smtp.gmail.com
   加密: SSL
   連接埠: 465
   自動 TLS: 開啟
   認證: 開啟
   使用者名稱: qiyunsolution@gmail.com
   密碼: [需要設定應用程式密碼]
   ```

### 步驟 4: 設定 Gmail 應用程式密碼

#### 4.1 登入 Google 帳戶
1. 前往：https://myaccount.google.com/
2. 使用 `qiyunsolution@gmail.com` 登入

#### 4.2 啟用兩步驟驗證
1. 點擊左側 `安全性`
2. 找到 `兩步驟驗證` 並點擊
3. 按照指示設定（手機驗證）

#### 4.3 產生應用程式密碼
1. 在安全性頁面找到 `應用程式密碼`
2. 點擊 `應用程式密碼`
3. 選擇應用程式：`郵件`
4. 選擇裝置：`其他（自訂名稱）`
5. 輸入名稱：`祈孕顧問網站`
6. 點擊 `產生`
7. **複製 16 位元密碼**（格式：xxxx xxxx xxxx xxxx）

#### 4.4 填入 WordPress
1. 回到 WordPress WP Mail SMTP 設定頁面
2. 在 `密碼` 欄位貼上剛才複製的 16 位元密碼
3. 點擊 `儲存設定`

### 步驟 5: 測試郵件發送

1. **發送測試郵件**
   - 在 WP Mail SMTP 設定頁面找到 `測試` 標籤
   - 填入測試收件人：`qiyunsolution@gmail.com`
   - 點擊 `發送測試郵件`

2. **檢查結果**
   - 應該看到 `測試郵件發送成功!` 訊息
   - 檢查 `qiyunsolution@gmail.com` 信箱是否收到測試郵件

## 🎯 設定完成檢查清單

### WordPress 後台檢查
- [ ] WP Mail SMTP 外掛已安裝並啟用
- [ ] Gmail SMTP 設定完成
- [ ] 應用程式密碼已填入
- [ ] 測試郵件發送成功

### Gmail 帳戶檢查  
- [ ] 兩步驟驗證已啟用
- [ ] 應用程式密碼已產生
- [ ] 收到 WordPress 測試郵件

## 🔍 故障排除

### 如果測試郵件失敗

1. **檢查應用程式密碼**
   - 確認密碼沒有包含空格
   - 重新產生新的應用程式密碼

2. **檢查 Gmail 設定**
   - 確認兩步驟驗證已啟用
   - 檢查是否有登入嘗試被阻擋

3. **檢查 WordPress 設定**
   - 確認所有欄位都正確填寫
   - 嘗試使用 TLS + 連接埠587

### 常見錯誤解決

**錯誤：SMTP connect() failed**
- 檢查主機是否支援外部 SMTP
- 嘗試使用不同的連接埠（587）

**錯誤：Authentication failed**
- 重新產生應用程式密碼
- 確認使用者名稱是完整的 Email 地址

## ✅ 成功指標

設定成功後，您將看到：

1. **WordPress 後台**
   - WP Mail SMTP 狀態顯示 `✅ 連線成功`
   - 測試郵件發送成功

2. **Gmail 信箱**
   - 收到來自 "祈孕顧問" 的測試郵件
   - 寄件人顯示：祈孕顧問 <qiyunsolution@gmail.com>

3. **表單郵件通知**
   - 客戶提交表單後會收到美化的 HTML 郵件
   - 包含完整的客戶資訊和諮詢內容

## 📞 需要協助？

如果遇到問題，請告訴我：
1. 在哪個步驟遇到困難
2. 看到的具體錯誤訊息
3. WordPress 或 Gmail 的設定截圖

我會立即協助您解決！