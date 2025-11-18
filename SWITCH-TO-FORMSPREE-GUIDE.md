# ✅ 切換至 Formspree - 部署指南

## 🎯 更新摘要

已將表單提交系統從 **WordPress REST API** 改為 **Formspree 直連**

### 優點
- ✅ 不依賴 WordPress REST API
- ✅ 更穩定可靠
- ✅ 無需修復 WordPress 問題
- ✅ 郵件直接發送到 qiyunsolution@gmail.com

---

## 📋 部署步驟

### 步驟 1: 構建並部署網站

在您的終端機中運行：

```bash
npm run build
npm run deploy
```

或

```bash
npm run build
```

然後通過 Vercel 或 GitHub Pages 部署 `dist/` 文件夾

### 步驟 2: 驗證部署

```bash
npm run dev
```

訪問 http://localhost:3000 測試表單（本地環境）

### 步驟 3: 線上測試

訪問 https://www.ownbabytw.com

1. 填寫聯絡表單
2. 點擊 **送出** 按鈕
3. 應該看到 **"訊息已送出！"** 成功提示

---

## 🧪 驗證表單工作

### 測試 1: 本地測試
```bash
npm run dev
```

在 http://localhost:3000 上：
- 填寫表單
- 提交
- 檢查瀏覽器 Console (F12) 是否有錯誤

### 測試 2: 線上測試
訪問 https://www.ownbabytw.com

提交表單後：
- ✅ 應看到 "訊息已送出！" 提示
- ✅ qiyunsolution@gmail.com 應收到郵件
- ✅ 郵件包含：姓名、郵箱、電話、LINE ID、訊息內容

### 測試 3: Formspree 儀表板驗證

訪問 https://formspree.io/ 並登入您的帳號：
1. 進入表單 `mjkvgqyb` 的設定
2. 應該看到最新的提交記錄
3. 檢查已發送的郵件

---

## 📊 表單數據流

```
用戶填寫表單
    ↓
點擊 "送出" 按鈕
    ↓
數據發送到 Formspree (https://formspree.io/f/mjkvgqyb)
    ↓
Formspree 發送郵件到 qiyunsolution@gmail.com
    ↓
用戶看到 "訊息已送出！" 成功提示
```

---

## 🛠️ 代碼更改

### 修改位置: `LandingTemplateFixed.jsx` (第 2315-2348 行)

**舊代碼**: 先嘗試 WordPress，失敗後使用 Formspree（雙系統）

**新代碼**: 直接使用 Formspree（簡化流程）

### 簡化的表單提交函數
```javascript
async function handleSubmit(e) {
  e.preventDefault();
  if (loading) return;
  try {
    setLoading(true);
    const fd = new FormData(formRef.current);
    const hp = (fd.get("hp") || ""); // honeypot 垃圾郵件檢查
    if (hp.trim().length > 0) {
      setSent(true);
      formRef.current?.reset();
      return;
    }

    // 直接使用 Formspree
    const res = await fetch("https://formspree.io/f/mjkvgqyb", { 
      method: "POST", 
      headers: { "Accept": "application/json" }, 
      body: fd 
    });

    if (res.ok) { 
      setSent(true); 
      formRef.current?.reset(); 
      console.log("Form submitted successfully via Formspree");
    }
  } catch (error) {
    console.error("Form submission error:", error);
  } finally {
    setLoading(false);
  }
}
```

---

## ✅ 部署檢查清單

- [ ] 已修改 LandingTemplateFixed.jsx 表單提交代碼
- [ ] 運行 `npm run build` 構建
- [ ] 運行 `npm run deploy` 部署（或通過 Vercel 自動部署）
- [ ] 訪問 https://www.ownbabytw.com 測試
- [ ] 填寫測試表單
- [ ] 看到 "訊息已送出！" 提示
- [ ] qiyunsolution@gmail.com 收到郵件
- [ ] 檢查 Formspree 儀表板確認提交

---

## 🎯 預期結果

### 成功表現 ✅
1. 表單可以填寫
2. 點擊送出後出現 "訊息已送出！" 提示
3. 郵件發送到 qiyunsolution@gmail.com
4. 郵件包含完整的表單信息
5. 不出現任何錯誤

### 常見問題 ❌

**問題**: 提交後沒有看到成功提示
- 檢查瀏覽器 Console (F12) 是否有錯誤
- 確認所有必填字段已填寫
- 檢查 Formspree 帳號是否有效

**問題**: 沒有收到郵件
- 檢查 qiyunsolution@gmail.com 的垃圾郵件文件夾
- 確認 Formspree 帳號中的郵箱設定正確
- 訪問 https://formspree.io/ 查看提交記錄

---

## 📞 需要幫助？

部署完成後，告訴我：
1. ✅ 或 ❌ 表單能否成功提交
2. ✅ 或 ❌ 是否看到成功提示
3. ✅ 或 ❌ 是否收到郵件
4. 任何錯誤信息

---

## 🚀 立即開始

1. **構建**: `npm run build`
2. **部署**: `npm run deploy` 或在 Vercel 上自動部署
3. **測試**: 訪問 https://www.ownbabytw.com 填寫表單
4. **驗證**: 檢查 qiyunsolution@gmail.com 是否收到郵件

完成後告訴我結果！
