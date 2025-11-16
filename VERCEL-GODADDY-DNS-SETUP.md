# Vercel + GoDaddy DNS 設定指南（Google Search Console）

## 🎯 重要提醒：Vercel 託管的特殊考量

由於您的網站託管在 Vercel，DNS 設定需要特別注意，避免影響現有的網站運作。

## 📋 當前 DNS 配置確認

您的網站目前應該有以下 DNS 記錄在 GoDaddy：
- `A` 記錄或 `CNAME` 記錄指向 Vercel
- 可能已經設定 `www` 子網域

## ✅ 安全添加 Google 驗證 TXT 記錄

### 步驟 1：登入 GoDaddy DNS 管理
1. 前往：https://sso.godaddy.com/
2. 登入您的帳戶
3. 找到 `ownbabytw.com` 網域
4. 點擊「管理」→「DNS」

### 步驟 2：檢查現有記錄
在添加新記錄前，請確認現有記錄：
- 不要修改任何 `A` 或 `CNAME` 記錄（這些讓 Vercel 正常運作）
- 只需要**添加**新的 `TXT` 記錄

### 步驟 3：添加 Google 驗證 TXT 記錄
1. **點擊「新增記錄」**
2. **記錄類型**：選擇 `TXT`
3. **主機名稱**：`@`（表示根網域 ownbabytw.com）
4. **值**：貼上 Google 提供的完整驗證碼
   ```
   google-site-verification=您的驗證碼
   ```
5. **TTL**：保持預設值（通常是 1 小時）
6. **儲存記錄**

## ⚠️ 重要注意事項

### 不要修改以下記錄：
- ❌ 不要修改指向 Vercel 的 A 記錄
- ❌ 不要修改 CNAME 記錄
- ❌ 不要修改 NS（名稱伺服器）記錄

### 只添加：
- ✅ 新的 TXT 記錄用於 Google 驗證
- ✅ 主機名稱使用 `@`
- ✅ 值為 Google 提供的驗證碼

## 🔍 驗證設定

### 使用指令檢查 DNS 記錄：
```bash
# 檢查 TXT 記錄是否已生效
dig TXT ownbabytw.com

# 或使用 nslookup
nslookup -type=TXT ownbabytw.com
```

### 預期結果：
應該看到類似以下輸出：
```
ownbabytw.com.  IN  TXT  "google-site-verification=您的驗證碼"
```

## ⏰ 時程安排

1. **設定 DNS**：立即完成
2. **DNS 傳播**：5-30 分鐘
3. **建議等待**：30 分鐘後再在 Google Search Console 中點擊驗證
4. **驗證完成**：通常立即成功

## 🚨 故障排除

### 如果 DNS 記錄未顯示：
1. 清除本地 DNS 快取：
   ```bash
   sudo dscacheutil -flushcache
   ```
2. 等待更長時間（最多 2 小時）
3. 檢查 GoDaddy DNS 管理頁面確認記錄已儲存

### 如果驗證失敗：
1. 確認 TXT 記錄值完全正確（包括引號內容）
2. 確認主機名稱設定為 `@`
3. 嘗試使用線上 DNS 檢查工具：
   - https://mxtoolbox.com/TXTLookup.aspx
   - 輸入：`ownbabytw.com`

## 🎯 Vercel 特殊考量

### 網域配置確認：
在 Vercel 控制台中：
1. 專案設定 → Domains
2. 確認 `ownbabytw.com` 和 `www.ownbabytw.com` 都已正確配置
3. 確認 SSL 憑證狀態正常

### DNS 記錄不衝突：
- TXT 記錄用於驗證，不會影響網站運作
- 可以與現有的 A/CNAME 記錄並存
- 不會中斷 Vercel 託管服務

## 📱 完成後的步驟

DNS 設定完成並生效後：
1. 回到 Google Search Console
2. 點擊「驗證」
3. 驗證成功後立即提交 `sitemap.xml`
4. 開始監控索引狀態

## 🔗 有用連結

- [GoDaddy DNS 管理](https://dcc.godaddy.com/manage/dns)
- [Vercel 網域設定](https://vercel.com/dashboard)
- [Google Search Console](https://search.google.com/search-console/)
- [DNS 檢查工具](https://mxtoolbox.com/TXTLookup.aspx)