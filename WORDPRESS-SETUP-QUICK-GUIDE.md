# WordPress 表單設定

## 🔧 快速設定步驟

### 1. 設定您的 WordPress 網站 URL

在 `LandingTemplateFixed.jsx` 檔案中，找到這一行：

```javascript
const WORDPRESS_FORM_ENDPOINT = "https://your-wordpress-site.com/wp-json/contact/v1/submit";
```

將 `your-wordpress-site.com` 替換為您的實際 GoDaddy WordPress 網站網址。

例如：
- 如果您的網站是 `https://ownbabytw.com`
- 則改為：`https://ownbabytw.com/wp-json/contact/v1/submit`

### 2. 在 WordPress 後台設定表單處理

請按照 `WORDPRESS-FORM-INTEGRATION.md` 文件中的詳細步驟：

1. **安裝必要外掛**：Contact Form 7 或 WPForms
2. **添加 PHP 代碼**：在 `functions.php` 中加入表單處理邏輯
3. **設定郵件通知**：確保表單提交會發送到 `jctommyliu@gmail.com`

### 3. 表單欄位對應

前端表單會發送以下欄位到 WordPress：

```json
{
  "name": "用戶姓名",
  "email": "用戶信箱",
  "phone": "用戶電話",
  "lineId": "用戶 LINE ID (可選)",
  "message": "用戶訊息",
  "hp": "" // 垃圾郵件防護欄位
}
```

### 4. 備用方案

如果 WordPress 端點暫時無法使用，表單會自動回退到 Formspree 服務，確保不會遺失任何客戶聯絡。

## 🚀 部署檢查清單

- [ ] 替換 WordPress 網站 URL
- [ ] 在 WordPress 安裝 Contact Form 7
- [ ] 複製 PHP 代碼到 functions.php
- [ ] 測試表單提交功能
- [ ] 確認郵件通知正常運作
- [ ] 檢查 WordPress 後台是否顯示表單資料

## 📞 需要協助？

如果您需要：
1. 協助修改 WordPress 網站 URL
2. 安裝和設定 WordPress 外掛
3. 測試表單功能

請提供您的 GoDaddy WordPress 網站網址，我可以幫您更新設定！