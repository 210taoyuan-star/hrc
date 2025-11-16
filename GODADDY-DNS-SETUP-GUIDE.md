# GoDaddy DNS 設定指南 - Google Search Console 驗證

## 📋 DNS TXT 記錄設定步驟

### 1. **登入 GoDaddy 控制台**
1. 前往：https://sso.godaddy.com/
2. 使用您的 GoDaddy 帳戶登入

### 2. **進入 DNS 管理**
1. 在帳戶首頁找到 `ownbabytw.com` 網域
2. 點擊網域名稱旁的「**管理**」按鈕
3. 在左側選單或頁面中找到「**DNS**」或「**管理 DNS**」
4. 點擊進入 DNS 管理頁面

### 3. **添加 TXT 記錄**
在 DNS 記錄頁面中：

1. **找到「新增記錄」或「Add Record」按鈕**
2. **選擇記錄類型**：`TXT`
3. **填寫記錄資訊**：
   - **主機/名稱 (Host/Name)**：`@` 或留空
   - **值/內容 (Value/Content)**：`[將 Google 提供的 TXT 記錄貼在這裡]`
   - **TTL**：使用預設值（通常是 600 或 3600）

### 4. **儲存設定**
1. 點擊「**儲存**」或「**Add Record**」
2. 等待 DNS 更新（通常需要 5-30 分鐘）

## 🔍 記錄格式確認

您的 TXT 記錄應該類似這樣：
```
名稱/主機: @
類型: TXT  
值: google-site-verification=abc123def456...
TTL: 600
```

## ⏰ DNS 更新時間

- **GoDaddy 內部更新**：5-15 分鐘
- **全球 DNS 傳播**：最多 48 小時（通常 1-2 小時）
- **Google 驗證檢查**：建議等待 15-30 分鐘後再回到 Search Console 驗證

## 🔧 驗證 DNS 設定

設定完成後，您可以用以下方式檢查：

### 在終端機中檢查 (Mac/Linux)：
```bash
# 檢查 TXT 記錄
dig TXT ownbabytw.com

# 或使用 nslookup
nslookup -type=TXT ownbabytw.com
```

### 線上 DNS 檢查工具：
- https://toolbox.googleapps.com/apps/dig/
- https://www.whatsmydns.net/
- https://dnschecker.org/

## 📝 設定完成後的步驟

1. **等待 15-30 分鐘**讓 DNS 更新
2. **回到 Google Search Console**
3. **點擊「驗證」按鈕**
4. **驗證成功後立即提交 Sitemap**：`sitemap.xml`

## 🚨 常見問題解決

### 如果驗證失敗：
- 檢查 TXT 記錄值是否完整複製
- 確認主機名稱是 `@` 或留空
- 等待更長時間讓 DNS 傳播
- 嘗試清除瀏覽器快取

### 如果找不到 DNS 設定：
- 在 GoDaddy 搜尋「DNS Zone File」或「Advanced DNS」
- 聯繫 GoDaddy 客服協助

## 💡 網域驗證的優勢

使用網域驗證的好處：
- ✅ 一次驗證涵蓋所有子網域
- ✅ 包含 `www.ownbabytw.com` 和 `ownbabytw.com`
- ✅ 未來添加子網域無需重新驗證
- ✅ 更穩定，不依賴網站檔案

---

**下一步**：設定完 DNS 記錄後，請告訴我，我會幫您檢查設定是否正確！