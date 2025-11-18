# 🔍 表單無法送出 - 診斷指南

## 📋 快速診斷步驟

### 步驟 1: 本地測試

```bash
npm run build
npm run dev
```

訪問 http://localhost:3000

### 步驟 2: 打開瀏覽器開發者工具

按 **F12** 或 **右鍵 → 檢查 → Console**

### 步驟 3: 填寫表單並提交

在本地網站上：
1. 填寫所有必填欄位（姓名、郵箱、電話、訊息）
2. 點擊 **送出** 按鈕
3. **立即查看 Console 標籤**（自動會有新輸出）

### 步驟 4: 分析 Console 輸出

根據 Console 中出現的信息判斷：

#### 情況 A: 看到以下成功信息 ✅
```
Form data keys: ['hp', 'name', 'email', 'phone', 'lineId', 'message']
Submitting to Formspree: {name: "...", email: "...", phone: "..."}
Formspree response status: 200
Formspree response: {ok: true, ...}
✓ Form submitted successfully via Formspree
```

**結果**: 表單提交成功，檢查郵箱是否收到

---

#### 情況 B: 看到錯誤信息 ❌
```
Missing required fields: {name: null, email: null, ...}
Please fill in all required fields
```

**解決**: 確保所有必填欄位已填寫（可能有隱藏的驗證問題）

---

#### 情況 C: 看到 Formspree 返回錯誤 ❌
```
Formspree response status: 400 或 500
Formspree response: {errors: [...]}
```

**原因**: 
- Formspree 表單 ID 不正確
- 郵件地址配置有誤
- Formspree 帳號問題

**解決**: 檢查 Formspree 帳號設定

---

#### 情況 D: 看到網絡錯誤 ❌
```
✗ Form submission error: TypeError: Failed to fetch
```

**原因**: CORS 跨域問題或網絡問題

**解決**: 檢查 Formspree URL 和網絡連接

---

## 🧪 進階診斷

### 檢查 Network 標籤

1. 打開 DevTools → **Network** 標籤
2. 提交表單
3. 查看是否有發送到 `formspree.io` 的請求
4. 點擊該請求，查看回應信息

### 檢查 Formspree 設定

1. 訪問 https://formspree.io/
2. 登入您的帳號
3. 查看表單 `mjkvgqyb` 是否正常運作
4. 檢查 **Email notifications** 是否設定為 `qiyunsolution@gmail.com`

---

## 🛠️ 常見問題解決

### 問題 1: 表單填不了
**原因**: 表單欄位隱藏或禁用  
**解決**: 檢查 CSS 或 JavaScript 是否有衝突

### 問題 2: 點擊送出沒反應
**原因**: 
- JavaScript 錯誤
- 按鈕被禁用
- 必填欄位未填

**解決**: 檢查 Console 是否有 JavaScript 錯誤

### 問題 3: 提交後沒看到成功提示
**原因**: 
- Formspree 提交失敗
- 前端代碼未更新

**解決**: 
- 清除瀏覽器快取 (Cmd+Shift+Delete)
- 重新載入頁面
- 再次提交

### 問題 4: 收不到郵件
**原因**:
- Formspree 設定錯誤
- 郵件進入垃圾箱
- Formspree 帳號未驗證

**解決**:
- 檢查 Formspree 帳號設定
- 檢查垃圾郵件文件夾
- 在 Formspree 儀表板確認提交

---

## 📊 診斷流程圖

```
提交表單
   ↓
Console 顯示 "Form data keys"?
   ├─ 否 → 表單沒被觸發（JavaScript 錯誤）
   ├─ 是 → 繼續
   ↓
看到 "Missing required fields"?
   ├─ 是 → 必填欄位未填
   ├─ 否 → 繼續
   ↓
看到 "Submitting to Formspree"?
   ├─ 否 → 表單驗證失敗
   ├─ 是 → 繼續
   ↓
看到 "Formspree response status: 200"?
   ├─ 否 → Formspree 錯誤或網絡問題
   ├─ 是 → 表單已成功提交
   ↓
看到 "✓ Form submitted successfully"?
   ├─ 是 → 檢查郵箱
   └─ 否 → 提交失敗
```

---

## 📝 收集診斷信息

如果仍有問題，請提供以下信息：

1. **Console 中的完整錯誤信息**（複製貼上）
2. **Network 標籤中的 formspree.io 請求回應**
3. **Formspree 儀表板中是否看到提交記錄**
4. **網站 URL 是否已部署**（本地 http://localhost:3000 或 線上 https://www.ownbabytw.com）

---

## ✅ 部署檢查清單

- [ ] 已運行 `npm run build`
- [ ] 已運行 `npm run dev` 本地測試
- [ ] 本地表單可以成功提交
- [ ] Console 中看到成功日誌
- [ ] 已收到測試郵件
- [ ] 已運行 `npm run deploy` 部署到線上
- [ ] 線上 https://www.ownbabytw.com 表單可以提交
- [ ] 郵件正常發送

---

現在執行診斷步驟 1-4，然後告訴我 Console 中看到的信息！
