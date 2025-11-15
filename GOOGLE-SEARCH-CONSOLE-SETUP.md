# Google Search Console 設置指南

## 步驟 1：訪問 Google Search Console

1. 前往：https://search.google.com/search-console/
2. 使用您的 Google 帳戶登入

## 步驟 2：添加網站屬性

1. 點擊「新增屬性」
2. 選擇「網址前置字元」
3. 輸入：`https://www.ownbabytw.com`
4. 點擊「繼續」

## 步驟 3：驗證網站擁有權

Google 會提供幾種驗證方法，建議使用以下方法：

### 方法 1：HTML 檔案上傳（推薦）

⚠️ **重要警告**：必須使用 Google 提供的實際驗證檔案！

常見錯誤原因：
- ❌ 使用了模板或自製的驗證檔案
- ❌ 修改了 Google 提供的驗證檔案內容
- ❌ 檔案名稱不正確

正確步驟：
1. 在 Google Search Console 中選擇「HTML 檔案」驗證方法
2. **直接下載 Google 提供的驗證檔案**（檔名類似：`google123abc456def.html`）
3. **不要修改檔案內容**，將原始檔案直接放入 `public/` 資料夾
4. 部署網站：
   ```bash
   npm run build
   git add .
   git commit -m "Add Google verification file"
   git push origin main
   ```
5. 確認可以訪問：`https://www.ownbabytw.com/google檔案名稱.html`
6. 返回 Google Search Console 點擊「驗證」

### 方法 2：HTML 標籤
如果您選擇 HTML 標籤方法，Google 會提供類似以下的標籤：
```html
<meta name="google-site-verification" content="你的驗證碼" />
```

需要將此標籤添加到 `index.html` 的 `<head>` 部分。

### 方法 3：DNS 記錄
在您的域名 DNS 設置中添加 TXT 記錄。

## 步驟 4：提交 Sitemap

驗證成功後：
1. 在左側選單中選擇「Sitemap」
2. 點擊「新增 Sitemap」
3. 輸入：`sitemap.xml`
4. 點擊「提交」

完整的 Sitemap URL：`https://www.ownbabytw.com/sitemap.xml`

## 步驟 5：檢查索引狀態

- 前往「涵蓋範圍」查看已索引的頁面
- 前往「網址檢查」測試特定頁面
- 前往「成效」查看搜尋流量數據

## 步驟 6：請求索引

如果需要加速索引：
1. 使用「網址檢查」工具
2. 輸入：`https://www.ownbabytw.com`
3. 如果尚未索引，點擊「要求建立索引」

## 重要提醒

- 驗證檔案需要保持在網站上，不要刪除
- 第一次索引可能需要 24-72 小時
- 定期檢查 Search Console 的健康狀態報告