# 🚀 部署指南 / Deployment Guide

## 網站已準備好部署！/ Website Ready for Deployment!

---

## 📦 部署選項 / Deployment Options

您有 **3 種部署方式** 可選擇:

### 1. ⚡ Vercel (推薦 / Recommended)
### 2. 🌐 GitHub Pages
### 3. 🔥 Netlify

---

## ⚡ 方案 1: Vercel 部署 (最簡單 / Easiest)

### 為什麼選擇 Vercel?
- ✅ 最快速的部署方式
- ✅ 自動 HTTPS
- ✅ 全球 CDN
- ✅ 即時預覽
- ✅ 零配置需求

### 部署步驟:

#### A. 使用 Vercel CLI (命令行)

1. **安裝 Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **登入 Vercel**:
   ```bash
   vercel login
   ```

3. **部署**:
   ```bash
   cd "/Volumes/ESD-USB/new design/代理孕母"
   vercel
   ```

4. **回答問題**:
   - Set up and deploy? `Y`
   - Which scope? 選擇您的帳號
   - Link to existing project? `N`
   - What's your project's name? `surrogacy-landing-page`
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

5. **完成！**
   - 您會獲得一個網址如: `https://surrogacy-landing-page.vercel.app`

#### B. 使用 Vercel 網站 (圖形界面)

1. 前往 **https://vercel.com**
2. 點擊 **"New Project"**
3. 選擇 **"Import Git Repository"** 或 **"Import from folder"**
4. 如果您的專案在 GitHub:
   - 連接您的 GitHub 帳號
   - 選擇 repository
   - Vercel 會自動偵測設定
5. 點擊 **"Deploy"**
6. 等待 2-3 分鐘
7. ✅ 完成！獲得您的網址

---

## 🌐 方案 2: GitHub Pages 部署

### 前提條件:
- 需要 GitHub 帳號
- 專案需要在 GitHub repository

### 部署步驟:

#### 1. 創建 GitHub Repository (如果還沒有)

```bash
cd "/Volumes/ESD-USB/new design/代理孕母"

# 初始化 Git (如果還沒有)
git init

# 添加所有檔案
git add .

# 提交
git commit -m "Initial commit - Surrogacy Landing Page"

# 在 GitHub 創建新 repository，然後:
git remote add origin https://github.com/你的用戶名/surrogacy-landing-page.git
git branch -M main
git push -u origin main
```

#### 2. 部署到 GitHub Pages

```bash
# 使用內建的部署指令
npm run deploy
```

這會:
- 自動建構網站
- 推送到 `gh-pages` 分支
- 您的網站會在: `https://你的用戶名.github.io/surrogacy-landing-page/`

#### 3. 啟用 GitHub Pages (如果需要)

1. 前往 GitHub repository
2. Settings → Pages
3. Source: 選擇 `gh-pages` 分支
4. 點擊 Save
5. 等待 1-2 分鐘

---

## 🔥 方案 3: Netlify 部署

### 使用 Netlify CLI:

1. **安裝 Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **登入**:
   ```bash
   netlify login
   ```

3. **部署**:
   ```bash
   cd "/Volumes/ESD-USB/new design/代理孕母"
   netlify deploy --prod
   ```

4. **選擇設定**:
   - Create & configure a new site? `Y`
   - Team: 選擇您的 team
   - Site name: `surrogacy-landing-page`
   - Build command: `npm run build`
   - Publish directory: `dist`

5. **完成！**
   - 獲得網址: `https://surrogacy-landing-page.netlify.app`

---

## 📋 部署前檢查清單 / Pre-Deployment Checklist

執行以下命令確保一切正常:

```bash
cd "/Volumes/ESD-USB/new design/代理孕母"

# 1. 安裝依賴
npm install

# 2. 測試建構
npm run build

# 3. 預覽生產版本
npm run preview
```

如果這些都成功，您就可以部署了！

---

## 🎯 推薦部署流程 / Recommended Deployment Flow

### 最快速方式 (5 分鐘):

```bash
# 1. 安裝 Vercel CLI
npm install -g vercel

# 2. 切換到專案目錄
cd "/Volumes/ESD-USB/new design/代理孕母"

# 3. 部署！
vercel --prod
```

就這麼簡單！✨

---

## 🌍 部署後的網址 / Your Deployed URLs

部署完成後，您會獲得:

### Vercel:
```
https://surrogacy-landing-page.vercel.app
或
https://your-custom-domain.com (可綁定自訂網域)
```

### GitHub Pages:
```
https://你的GitHub用戶名.github.io/surrogacy-landing-page/
```

### Netlify:
```
https://surrogacy-landing-page.netlify.app
或
https://your-custom-domain.com
```

---

## 🔄 自動部署 / Automatic Deployments

### Vercel / Netlify 自動部署:

1. 連接 GitHub repository
2. 每次 push 到 `main` 分支時自動部署
3. Pull Request 也會獲得預覽網址

設定方式:
- Vercel: Dashboard → Import Git Repository
- Netlify: Sites → New site from Git

---

## 📊 建構資訊 / Build Information

### 建構設定:
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install"
}
```

### 環境變數 (如果需要):
無需設定 - 這是純靜態網站

---

## 🎨 部署後優化 / Post-Deployment Optimization

### 1. 自訂網域 Custom Domain

#### Vercel:
1. Dashboard → Settings → Domains
2. 添加您的網域
3. 更新 DNS 記錄

#### Netlify:
1. Site settings → Domain management
2. Add custom domain
3. 配置 DNS

### 2. HTTPS
所有平台都自動提供免費 HTTPS ✅

### 3. 效能監控
- Vercel: 內建 Analytics
- Netlify: 內建 Analytics
- 或使用 Google Analytics

---

## 🐛 常見問題 / Troubleshooting

### 問題 1: 建構失敗 Build Failed

**解決方案**:
```bash
# 清除快取
rm -rf node_modules dist
npm install
npm run build
```

### 問題 2: 路由不工作 404 Error

**解決方案**:
確保有 `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### 問題 3: 圖片/影片載入失敗

**檢查**:
- 所有資源路徑使用絕對路徑 `/images/...`
- `public` 資料夾內容正確
- 檔案名稱大小寫正確

---

## 📱 測試部署 / Testing Deployment

部署後測試:

- [ ] 網站載入
- [ ] 所有圖片顯示
- [ ] 影片播放
- [ ] 表單提交 (Formspree)
- [ ] 響應式設計 (手機/平板)
- [ ] 導航連結
- [ ] 回到頂部按鈕
- [ ] 中英文切換

---

## 🚀 立即部署指令 / Quick Deploy Commands

### 選項 1: Vercel (最推薦)
```bash
npx vercel --prod
```

### 選項 2: GitHub Pages
```bash
npm run deploy
```

### 選項 3: Netlify
```bash
npx netlify deploy --prod
```

---

## 📞 需要幫助? / Need Help?

如果遇到問題:

1. **檢查建構日誌** - 查看錯誤訊息
2. **檢查 package.json** - 確保所有依賴已安裝
3. **本地測試** - `npm run build && npm run preview`
4. **查看文檔**:
   - Vercel: https://vercel.com/docs
   - Netlify: https://docs.netlify.com
   - GitHub Pages: https://pages.github.com

---

## ✨ 恭喜! / Congratulations!

您的網站已準備好發布到全世界! 🌍

選擇一個部署方式，按照步驟操作，幾分鐘內您的網站就會上線! 🎉

**推薦**: 使用 Vercel 以獲得最佳體驗和最快速度! ⚡

---

## 📝 快速開始 / Quick Start

**最快 3 步部署**:

```bash
# 1. 安裝 Vercel
npm install -g vercel

# 2. 切換目錄
cd "/Volumes/ESD-USB/new design/代理孕母"

# 3. 部署！
vercel --prod
```

**完成！您的網站已上線！** 🚀🎉
