# Google Search Console URL Inspection 使用指南

## 🔍 URL Inspection 工具使用步驟

### 1. 前往 URL Inspection
- 在 Google Search Console 左側選單
- 點擊 "URL Inspection" 或直接在頂部搜尋框

### 2. 檢查主頁面
**輸入以下 URL**：
```
https://www.ownbabytw.com
```

### 3. 分析結果

#### 如果顯示 "URL is on Google"：
✅ **頁面已被索引**
- 檢查最後檢索時間
- 查看檢索狀態詳細資訊
- 確認沒有錯誤或警告

#### 如果顯示 "URL is not on Google"：
🔄 **需要請求索引**
- 點擊 "REQUEST INDEXING" 按鈕
- 等待 Google 驗證頁面（可能需要 1-2 分鐘）
- 確認請求已提交

### 4. 檢查其他重要頁面

依序檢查以下 URL（建議）：

```
https://www.ownbabytw.com/#about
https://www.ownbabytw.com/#services  
https://www.ownbabytw.com/#knowledge
https://www.ownbabytw.com/#faq
https://www.ownbabytw.com/#contact
```

**注意**：由於這些是錨點連結（#），Google 主要會索引主頁面，但檢查確保沒有存取問題。

### 5. 檢查重要資源文件

```
https://www.ownbabytw.com/robots.txt
https://www.ownbabytw.com/sitemap.xml
```

## 📊 URL Inspection 結果解讀

### ✅ 良好狀態指標：
- **Coverage**: "Indexable"
- **Last crawl**: 最近日期
- **Crawl allowed**: "Yes"
- **Indexing allowed**: "Yes"
- **Page fetch**: "Successful"

### ⚠️ 需要注意的狀態：
- **Coverage**: "Excluded" - 檢查原因
- **Crawl allowed**: "No" - 檢查 robots.txt
- **Page fetch**: "Failed" - 檢查網站可訪問性

### ❌ 問題狀態：
- **Coverage**: "Error" - 需要修復
- **Page fetch**: "Error" - 伺服器問題

## 🚀 加速索引的技巧

### 1. 批量請求索引
如果多個頁面未被索引：
- 優先處理主頁面
- 然後處理重要內容頁面
- 每天有請求限制，合理分配

### 2. 檢查 Live Test
- 在 URL Inspection 中點擊 "TEST LIVE URL"
- 確認 Google 能實時抓取您的頁面
- 檢查渲染結果是否正確

### 3. 監控索引狀態
- 定期檢查 "Coverage" 報告
- 關注 "Valid" 頁面數量變化
- 注意任何 "Error" 或 "Excluded" 狀態

## 📈 預期結果時程

| 動作 | 預期時間 |
|------|----------|
| 提交索引請求 | 立即 |
| Google 開始檢索 | 1-24 小時 |
| 出現在索引中 | 24-72 小時 |
| 搜尋結果中可見 | 3-7 天 |

## 🔧 常見問題排除

### 問題：REQUEST INDEXING 按鈕是灰色的
**解決方案**：
- 確認您有該屬性的完整權限
- 檢查是否已經在處理佇列中
- 等待之前的請求完成

### 問題：Live Test 失敗
**檢查項目**：
- 網站是否可正常訪問
- robots.txt 是否阻擋 Googlebot
- 頁面載入速度是否過慢
- 是否有 JavaScript 錯誤

### 問題：頁面被 Excluded
**常見原因**：
- 重複內容
- 被 robots.txt 阻擋
- noindex 標籤
- 404 錯誤

## ✅ 完成檢查清單

執行 URL Inspection 後，確認：

- [ ] 主頁面狀態檢查完成
- [ ] 如需要，已提交索引請求
- [ ] Live Test 通過
- [ ] 沒有重大錯誤或警告
- [ ] 檢查了重要資源文件
- [ ] 設定定期監控計劃

## 📞 下一步建議

完成 URL Inspection 後：
1. 設定 Google Search Console 通知
2. 定期檢查 Coverage 報告
3. 監控搜尋表現數據
4. 考慮設定 Google Analytics