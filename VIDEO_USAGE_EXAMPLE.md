# 如何在代孕知識與案例中加入MP4影片 / How to Add MP4 Videos to Knowledge & Cases

## 功能說明 / Feature Description

已為「代孕知識與案例」區塊添加影片支援。現在可以在 `HRC_KNOWLEDGE_ARTICLES` 和 `HRC_SUCCESS_CASES` 陣列中為每篇文章或案例添加 MP4 影片。

Video support has been added to the "Knowledge & Cases" section. You can now add MP4 videos to each article in `HRC_KNOWLEDGE_ARTICLES` and `HRC_SUCCESS_CASES` arrays.

---

## 使用方式 / Usage

### 步驟 1：準備 MP4 檔案 / Step 1: Prepare MP4 Files

將 MP4 影片檔案放置到 `public/images/` 目錄下的適當位置，例如：

Place your MP4 video files in the appropriate location under `public/images/`, for example:

```
public/
  images/
    knowledge/
      ivf-success-rates.mp4
    cases/
      case-001.mp4
      case-002.mp4
```

### 步驟 2：更新資料陣列 / Step 2: Update Data Arrays

在 `LandingTemplateFixed.jsx` 中，找到 `HRC_KNOWLEDGE_ARTICLES` 或 `HRC_SUCCESS_CASES` 陣列，並將 `video` 欄位從 `null` 改為影片路徑。

In `LandingTemplateFixed.jsx`, locate the `HRC_KNOWLEDGE_ARTICLES` or `HRC_SUCCESS_CASES` array and change the `video` field from `null` to your video path.

#### 知識文章範例 / Knowledge Article Example:

```javascript
const HRC_KNOWLEDGE_ARTICLES = [
  {
    id: "ivf-success-rates",
    title: "IVF 成功率：年齡與胚胎品質的關鍵影響",
    titleEn: "IVF Success Rates: Key Impact of Age and Embryo Quality",
    category: "醫療知識",
    categoryEn: "Medical Knowledge",
    author: "Dr. Marisa Gigg",
    date: "2024-09-15",
    summary: "深入分析年齡對IVF成功率的影響...",
    summaryEn: "In-depth analysis of age's impact on IVF success rates...",
    content: "隨著女性年齡增長...",
    contentEn: "As women age...",
    tags: ["IVF", "成功率", "年齡", "胚胎篩檢"],
    video: "/images/knowledge/ivf-success-rates.mp4"  // 👈 將 null 改為影片路徑
  },
  // 其他文章...
];
```

#### 成功案例範例 / Success Case Example:

```javascript
const HRC_SUCCESS_CASES = [
  {
    id: "case-001",
    title: "跨國夫妻的加州代孕圓夢之旅",
    titleEn: "International Couple's California Surrogacy Dream Journey",
    clientProfile: "台灣夫妻，女方42歲，男方45歲",
    clientProfileEn: "Taiwanese couple, female 42, male 45",
    challenge: "多次IVF失敗，子宮內膜異位症",
    challengeEn: "Multiple IVF failures, endometriosis",
    solution: "HRC Pasadena代孕程序，PGT-A篩檢",
    solutionEn: "HRC Pasadena surrogacy program with PGT-A screening",
    duration: "14個月",
    durationEn: "14 months",
    outcome: "成功誕生健康男嬰",
    outcomeEn: "Successfully delivered healthy baby boy",
    testimonial: "感謝HRC團隊的專業支援...",
    testimonialEn: "Thanks to HRC team's professional support...",
    tags: ["國際客戶", "PGT-A", "內膜異位症", "HRC Pasadena"],
    video: "/images/cases/case-001.mp4"  // 👈 將 null 改為影片路徑
  },
  // 其他案例...
];
```

---

## 影片顯示效果 / Video Display

### 知識文章 / Knowledge Articles

當 `video` 欄位有值時，影片播放器會顯示在：
- 文章類別標籤下方
- 文章標題上方

When the `video` field has a value, the video player appears:
- Below the category tag
- Above the article title

### 成功案例 / Success Cases

當 `video` 欄位有值時，影片播放器會顯示在：
- 案例標題下方
- 客戶資訊上方

When the `video` field has a value, the video player appears:
- Below the case title
- Above the client information

---

## 影片規格建議 / Video Specifications Recommendation

為確保最佳使用者體驗，建議：

For optimal user experience, we recommend:

- **檔案格式 / Format**: MP4 (H.264 編碼 / H.264 codec)
- **解析度 / Resolution**: 1280x720 (720p) 或更高 / or higher
- **檔案大小 / File size**: < 50MB（建議壓縮以加快載入速度 / compress for faster loading）
- **長度 / Duration**: 1-5 分鐘（簡短精要 / short and concise）

---

## 測試 / Testing

儲存變更後：

After saving your changes:

1. 執行 `npm run dev` 啟動開發伺服器
   Run `npm run dev` to start the development server

2. 前往網站的「代孕知識與案例」區塊
   Navigate to the "Knowledge & Cases" section

3. 確認影片播放器是否正確顯示並可播放
   Verify that the video player displays and plays correctly

---

## 移除影片 / Removing Videos

如果要移除某篇文章或案例的影片，只需將 `video` 欄位改回 `null`：

To remove a video from an article or case, simply change the `video` field back to `null`:

```javascript
video: null  // 不顯示影片 / No video displayed
```

---

## 技術細節 / Technical Details

- 影片播放器使用 HTML5 `<video>` 元素
  Video player uses HTML5 `<video>` element

- 支援原生瀏覽器控制項（播放、暫停、音量、全螢幕）
  Supports native browser controls (play, pause, volume, fullscreen)

- 使用 `preload="metadata"` 優化載入效能
  Uses `preload="metadata"` to optimize loading performance

- 響應式設計，自動適應容器寬度
  Responsive design, automatically adapts to container width

- 支援雙語錯誤訊息（中英文）
  Supports bilingual error messages (Chinese/English)

---

## 範例實作 / Example Implementation

假設您有一部關於「跨國夫妻成功案例」的影片：

Suppose you have a video about "International Couple Success Story":

1. **上傳影片** / Upload video:
   ```
   public/images/cases/international-couple-success.mp4
   ```

2. **編輯陣列** / Edit array in `LandingTemplateFixed.jsx`:
   ```javascript
   {
     id: "case-001",
     title: "跨國夫妻的加州代孕圓夢之旅",
     // ... 其他欄位 / other fields
     video: "/images/cases/international-couple-success.mp4"
   }
   ```

3. **儲存並重新整理** / Save and refresh:
   影片播放器會自動出現在該案例卡片中
   The video player will automatically appear in that case card

---

## 注意事項 / Important Notes

⚠️ **路徑格式 / Path Format**: 使用絕對路徑，以 `/` 開頭（例如 `/images/...`）
   Use absolute paths starting with `/` (e.g., `/images/...`)

⚠️ **檔案位置 / File Location**: 必須放在 `public/` 目錄下，Vite 會自動處理
   Must be placed under `public/` directory, Vite will handle it automatically

⚠️ **檔案命名 / File Naming**: 避免使用中文或特殊字元，建議使用英文小寫加連字號
   Avoid Chinese or special characters, use lowercase English with hyphens

⚠️ **瀏覽器支援 / Browser Support**: MP4/H.264 格式在所有現代瀏覽器均支援
   MP4/H.264 format is supported in all modern browsers

---

## 問題排查 / Troubleshooting

### 影片無法播放 / Video Won't Play

1. 檢查檔案路徑是否正確（大小寫需一致）
   Check if file path is correct (case-sensitive)

2. 確認檔案已放在 `public/images/` 目錄下
   Confirm file is placed under `public/images/`

3. 檢查影片格式是否為 MP4/H.264
   Check if video format is MP4/H.264

4. 在瀏覽器開發者工具的 Network 頁籤中確認影片是否成功載入
   In browser DevTools Network tab, confirm video loads successfully

### 影片載入緩慢 / Video Loads Slowly

1. 壓縮影片檔案（建議 < 50MB）
   Compress video file (recommended < 50MB)

2. 考慮使用 CDN 服務加速載入
   Consider using CDN service for faster loading

3. 確保伺服器網路連線穩定
   Ensure stable server network connection

---

## 進階功能 / Advanced Features

未來可考慮添加：

Future enhancements to consider:

- 🎬 多語言字幕支援 / Multi-language subtitle support
- 📊 影片播放統計 / Video playback analytics
- 🎨 自訂播放器樣式 / Custom player styling
- 🔄 影片串流播放 / Video streaming playback
- 📱 行動裝置優化 / Mobile device optimization

---

如有問題，請聯繫開發團隊 / For questions, please contact the development team. 🚀
