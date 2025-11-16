# Vercel DNS 設定指南 - Google Search Console 驗證

## 🎯 重要發現
您的域名 `ownbabytw.com` 的 nameservers 指向 Vercel：
- ns1.vercel-dns.com
- ns2.vercel-dns.com

這意味著您需要在 **Vercel 控制台**中新增 TXT 記錄，而不是在 GoDaddy。

## 📋 在 Vercel 新增 TXT 記錄步驟

### 1. 登入 Vercel 控制台
- 前往：https://vercel.com/dashboard
- 登入您的帳戶

### 2. 找到您的專案和域名設定
- 選擇您的專案（hrc 專案）
- 點擊 "Settings" 標籤
- 點擊左側的 "Domains"

### 3. 管理 DNS 記錄
- 找到 `ownbabytw.com` 域名
- 點擊域名旁邊的三個點 "..." 
- 選擇 "Edit DNS Records" 或 "Manage DNS"

### 4. 新增 TXT 記錄
```
Record Type: TXT
Name/Host: @ (或留空)
Value: [Google 提供的完整 TXT 記錄]
TTL: 預設值 (通常是 Auto 或 3600)
```

**Google TXT 記錄格式範例：**
```
google-site-verification=abc123def456ghi789jkl012mno345pqr678stu901vwx234yz
```

### 5. 儲存設定
- 點擊 "Save" 或 "Add Record"
- 確認記錄已成功新增

## ⏰ DNS 傳播時間

**預期時間：**
- **最快**：5-15 分鐘
- **一般**：15-60 分鐘  
- **最慢**：2-24 小時

**原因：**
- DNS 記錄需要在全球 DNS 伺服器間傳播
- 不同地區的 DNS 快取更新時間不同
- ISP 和 DNS 提供者的快取策略影響

## 🔍 檢查 DNS 傳播狀態

您可以使用以下工具檢查：

### 線上工具：
- https://www.whatsmydns.net/
- https://dnschecker.org/
- 輸入：`ownbabytw.com`，選擇 TXT 記錄類型

### 終端指令：
```bash
# 檢查 TXT 記錄
dig TXT ownbabytw.com +short

# 檢查特定 DNS 伺服器
dig @8.8.8.8 TXT ownbabytw.com +short
dig @1.1.1.1 TXT ownbabytw.com +short
```

## 💡 加速技巧

1. **清除本地 DNS 快取**
   ```bash
   # macOS
   sudo dscacheutil -flushcache
   
   # Windows
   ipconfig /flushdns
   ```

2. **使用不同 DNS 伺服器測試**
   - Google DNS: 8.8.8.8
   - Cloudflare DNS: 1.1.1.1
   - 您的 ISP DNS

3. **降低 TTL 值（下次修改時）**
   - 設定較短的 TTL (如 300 秒) 以加速未來變更

## 📞 故障排除

### 如果 TXT 記錄不顯示：
1. **確認記錄格式**
   - Name/Host 是否為 `@` 或空白
   - Value 是否包含完整的 Google 驗證字串

2. **檢查 Vercel 設定**
   - 確認域名狀態為 "Active"
   - 檢查是否有 DNS 設定衝突

3. **重新檢查 nameservers**
   ```bash
   dig NS ownbabytw.com +short
   ```
   確認仍指向 Vercel

### 聯絡支援：
- Vercel 支援：https://vercel.com/help
- 檢查 Vercel 狀態頁：https://www.vercel-status.com/

## ✅ 驗證成功後

1. **回到 Google Search Console**
   - 點擊 "Verify" 按鈕
   - 確認驗證成功

2. **立即提交 Sitemap**
   - 新增 Sitemap：`sitemap.xml`
   - 完整 URL：`https://www.ownbabytw.com/sitemap.xml`

3. **監控索引狀態**
   - 檢查 "Coverage" 報告
   - 使用 "URL Inspection" 工具

## 🎉 預期結果

成功設定後，您應該會看到：
- `dig TXT ownbabytw.com +short` 返回 Google 驗證字串
- Google Search Console 驗證成功
- 網站開始出現在搜尋結果中（3-7 天）