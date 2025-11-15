# 🎬 影片優化與部署指南

## 🚨 當前問題
影片檔案太大導致 Vercel 部署和載入問題：
- Case.mp4: 19MB
- Case2.mp4: 17MB  
- Case3.mp4: 21MB
- HRC.mp4: 5.3MB ✅ (這個檔案大小還可以)
- HRCDR.mp4: 40MB ❌ (太大)
- HRCDR2.mp4: 25MB ❌ (太大)

**總計: 127MB - 太大了！**

## 💡 解決方案

### 方案 1: 影片壓縮 (推薦)
使用線上工具壓縮影片：

1. **FreeConvert.com** 
   - 網址: https://www.freeconvert.com/video-compressor
   - 建議設定: 壓縮至原大小的 30-50%

2. **CloudConvert**
   - 網址: https://cloudconvert.com/mp4-converter
   - 建議設定: 解析度降至 720p，位元率 1-2 Mbps

3. **目標檔案大小**:
   - HRCDR.mp4: 40MB → 8-12MB
   - HRCDR2.mp4: 25MB → 5-8MB
   - Case.mp4: 19MB → 4-6MB
   - Case2.mp4: 17MB → 4-5MB
   - Case3.mp4: 21MB → 5-7MB

### 方案 2: 外部影片託管 (最佳)
將影片上傳到專門的影片服務：

1. **YouTube (免費)**
   - 上傳影片設為「不公開」
   - 取得嵌入代碼
   - 修改程式碼使用 iframe

2. **Vimeo (推薦)**
   - 更專業的外觀
   - 可移除 Vimeo 品牌 (付費版)
   - 更好的載入效能

### 方案 3: 漸進式載入
保持現有影片，但加入載入優化：

1. **Lazy Loading**
2. **影片縮圖預覽**
3. **用戶點擊才載入**

## 🔧 實作步驟

### 如果選擇壓縮 (方案 1):
1. 使用上述線上工具壓縮所有影片
2. 覆蓋 `public/videos/` 中的檔案
3. 重新部署

### 如果選擇 YouTube (方案 2):
我可以幫您修改代碼將影片改為 YouTube 嵌入。

## ⚡ 快速修復
暫時移除最大的影片檔案，保留較小的：
- 保留: HRC.mp4 (5.3MB)
- 暫時移除: HRCDR.mp4, HRCDR2.mp4
- 壓縮: Case.mp4, Case2.mp4, Case3.mp4