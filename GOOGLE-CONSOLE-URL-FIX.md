# Google Search Console 網址無效問題解決方案

## 🚨 問題：「無法新增資源：無效的網站網址」

### 常見原因分析
1. **網址格式問題** - Google 對網址格式有嚴格要求
2. **重定向問題** - 網站重定向可能影響驗證
3. **選擇錯誤的驗證方法** - 需要選擇正確的屬性類型

## ✅ 解決方案

### 方法 1：使用「網域」驗證（推薦）

1. **前往 Google Search Console**
   - 網址：https://search.google.com/search-console/

2. **新增屬性 - 選擇「網域」**
   - 點擊「新增屬性」
   - 選擇左側的「**網域**」選項
   - 輸入：`ownbabytw.com`（不要加 https:// 或 www）

3. **DNS 驗證**
   - Google 會提供一個 TXT 記錄
   - 需要在 GoDaddy 的 DNS 設定中添加這個記錄

### 方法 2：使用「網址前置字元」驗證

如果您想繼續使用檔案驗證，請嘗試以下網址格式：

#### 選項 A：使用 www 版本
```
https://www.ownbabytw.com/
```
**注意：結尾必須有斜線 /**

#### 選項 B：使用無 www 版本
```
https://ownbabytw.com/
```
**注意：結尾必須有斜線 /**

### 方法 3：檢查網址可訪問性

先確認以下網址都能正常訪問：

1. **主網站**
   ```bash
   curl -I "https://www.ownbabytw.com/"
   curl -I "https://ownbabytw.com/"
   ```

2. **驗證檔案**
   ```bash
   curl -I "https://www.ownbabytw.com/googlef79f5a93b79fba75.html"
   ```

## 🎯 推薦步驟（優先順序）

### 步驟 1：嘗試網域驗證
1. 在 Google Search Console 選擇「**網域**」
2. 輸入：`ownbabytw.com`
3. 按照指示在 GoDaddy DNS 中添加 TXT 記錄

### 步驟 2：如果網域驗證不方便，使用網址前置字元
1. 選擇「**網址前置字元**」
2. 輸入：`https://www.ownbabytw.com/`（注意結尾斜線）
3. 使用現有的驗證檔案完成驗證

### 步驟 3：DNS 記錄設定（如選擇網域驗證）

如果選擇網域驗證，需要在 GoDaddy 中設定：
- **記錄類型**：TXT
- **主機**：@ 或留空
- **值**：Google 提供的驗證字串
- **TTL**：1 小時或預設值

## 🔍 故障排除

### 如果仍然顯示「無效網址」：

1. **檢查網址格式**
   - 確保包含 `https://`
   - 確保結尾有 `/`
   - 不要包含額外的路徑或參數

2. **清除瀏覽器快取**
   - 重新整理 Google Search Console 頁面

3. **等待 DNS 傳播**
   - 如果最近修改過 DNS，等待 2-24 小時

4. **嘗試無痕模式**
   - 使用無痕瀏覽器窗口重試

## 📞 當前網站狀態確認

您的網站目前狀態：
- ✅ `https://www.ownbabytw.com` - HTTP 200 正常
- ✅ `https://ownbabytw.com` - HTTP 307 重定向到 www 版本
- ✅ 驗證檔案正常：`googlef79f5a93b79fba75.html`

建議使用 `https://www.ownbabytw.com/` 作為屬性網址。