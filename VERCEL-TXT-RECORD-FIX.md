# Vercel TXT 記錄設定錯誤解決方案

## 🚨 錯誤診斷
**錯誤訊息**: `Invalid request: 'value' should match format "ipv4"`

**問題原因**: 
Vercel 的 DNS 介面可能將您的輸入誤判為 A 記錄（需要 IPv4）而不是 TXT 記錄。

## ✅ 解決方案

### 方法 1: 確認記錄類型選擇正確

1. **重新檢查記錄類型**
   - 確保選擇的是 **"TXT"** 而不是 "A" 或其他類型
   - 記錄類型下拉選單中明確選擇 "TXT"

2. **正確的 TXT 記錄格式**
   ```
   Type: TXT
   Name: @ (或留空)
   Value: google-site-verification=您的驗證碼
   ```

### 方法 2: 檢查 Value 欄位格式

**錯誤格式 ❌:**
```
Value: https://www.google.com/...
Value: 192.168.1.1
Value: ownbabytw.com
```

**正確格式 ✅:**
```
Value: google-site-verification=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### 方法 3: 分步驟設定

1. **清空所有欄位**
2. **按順序填入**:
   - Record Type: **TXT**
   - Name: **@**
   - Value: **google-site-verification=您的完整驗證碼**
3. **儲存前再次確認類型為 TXT**

### 方法 4: 使用替代 Vercel DNS 介面

如果主介面有問題，嘗試：

1. **直接域名管理頁面**
   - 前往 https://vercel.com/dashboard
   - 點擊右上角頭像 → Account Settings
   - 選擇 "Domains" 標籤
   - 找到 `ownbabytw.com` → "Manage"

2. **專案層級域名設定**
   - 選擇您的專案
   - Settings → Domains
   - 點擊 `ownbabytw.com` → "Edit"

## 🔍 常見陷阱檢查

### 檢查點 1: 記錄類型
- [ ] 確認選擇 "TXT" 而非 "A"、"CNAME" 或其他
- [ ] 下拉選單中明確顯示 "TXT"

### 檢查點 2: Name 欄位
- [ ] 使用 `@` 或完全留空
- [ ] 不要輸入 `ownbabytw.com` 或其他域名

### 檢查點 3: Value 欄位
- [ ] 完整的 Google 驗證字串
- [ ] 以 `google-site-verification=` 開頭
- [ ] 沒有額外的引號或空格

### 檢查點 4: 瀏覽器問題
- [ ] 嘗試清除瀏覽器快取
- [ ] 使用無痕模式
- [ ] 嘗試不同瀏覽器

## 🛠️ 緊急替代方案

如果 Vercel DNS 介面持續出現問題：

### 選項 1: 改用 HTML 標籤驗證
1. 編輯您的 `index.html`
2. 在 `<head>` 部分添加:
   ```html
   <meta name="google-site-verification" content="您的驗證碼" />
   ```
3. 重新部署網站

### 選項 2: 聯絡 Vercel 支援
- 前往 https://vercel.com/help
- 回報 DNS 介面的 IPv4 格式錯誤

### 選項 3: 使用 Vercel CLI
```bash
# 安裝 Vercel CLI (如果尚未安裝)
npm i -g vercel

# 登入
vercel login

# 添加 DNS 記錄
vercel dns add ownbabytw.com @ TXT "google-site-verification=您的驗證碼"
```

## 📞 需要立即協助

請告訴我：
1. 您在 Vercel 介面中看到的確切步驟和選項
2. 您輸入的完整 Google 驗證字串
3. 您偏好使用哪種替代方案

我可以立即幫您：
- 修改 `index.html` 添加 meta 標籤（推薦快速解決方案）
- 提供 Vercel CLI 指令
- 繼續協助排除 DNS 介面問題