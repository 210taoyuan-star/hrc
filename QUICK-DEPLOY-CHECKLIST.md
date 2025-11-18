# ⚡ 快速部署檢查表

## 🎯 您現在需要做的事（一步一步）

### 步驟 1️⃣: 複製新代碼
- [ ] 在 VS Code 中開啟 `functions-ultra-simple.php`
- [ ] **Cmd+A** 全選所有代碼
- [ ] **Cmd+C** 複製

### 步驟 2️⃣: 進入 WordPress
- [ ] 訪問: https://63w.c36.myftpupload.com/wp-admin/
- [ ] 用您的 WordPress 帳密登入

### 步驟 3️⃣: 編輯 functions.php
- [ ] 左側菜單 → **外觀 (Appearance)** → **主題編輯器 (Theme File Editor)**
- [ ] 右側文件列表中找到 `functions.php`，點擊
- [ ] **Cmd+A** 全選現有代碼
- [ ] **Delete** 刪除
- [ ] **Cmd+V** 貼上新代碼
- [ ] 點擊 **Update File** 按鈕

### 步驟 4️⃣: 等待並重新整理
- [ ] 等待 30 秒
- [ ] 訪問 https://63w.c36.myftpupload.com/
- [ ] 檢查是否看到正常的 WordPress 首頁（不再報錯）

### 步驟 5️⃣: 驗證部署
- [ ] 登入 WordPress，檢查左側菜單中是否出現 **Contact Forms**
- [ ] 訪問 https://63w.c36.myftpupload.com/wp-json/contact/v1/submit
  - 應該看到某種錯誤回應（代表端點存在）
  - 不應該看到 "rest_no_route" 錯誤

### 步驟 6️⃣: 測試表單
- [ ] 訪問 https://www.ownbabytw.com
- [ ] 填寫表單所有必填欄位
- [ ] 點擊 **送出** 按鈕
- [ ] 應該看到 "訊息已送出！" 成功提示

### 步驟 7️⃣: 最終驗證
- [ ] 登入 WordPress，點擊 **Contact Forms** 菜單查看新記錄
- [ ] 檢查 qiyunsolution@gmail.com 是否收到郵件通知

---

## 📊 進度跟蹤

| 步驟 | 任務 | 完成 |
|------|------|------|
| 1 | 複製代碼 | ⏳ |
| 2 | 進入 WordPress | ⏳ |
| 3 | 編輯 functions.php | ⏳ |
| 4 | 重新整理頁面 | ⏳ |
| 5 | 驗證部署 | ⏳ |
| 6 | 測試表單 | ⏳ |
| 7 | 最終驗證 | ⏳ |

---

## 🚨 重要提醒

- ⚠️ 修改 functions.php 時，**務必全部刪除再貼新的**，不要混合舊代碼
- ⚠️ 點擊 **Update File** 後，WordPress 需要 30-60 秒重新載入
- ⚠️ 如果出現白屏或仍然報錯，**不要驚慌** - 等待 60 秒後重新整理瀏覽器
- ⚠️ 新代碼已包含 Go 主題缺失函數的修復，應該能解決目前的錯誤

---

## ✨ 這一次的修復內容

新的 `functions-ultra-simple.php` 包含：

1. **Go 主題修復**
   - 定義缺失的 `Go\Core\get_default_header_variation()` 函數
   - 防止 "Call to undefined function" 錯誤

2. **表單處理系統**
   - 自訂文章類型 "qiyun_form" 登錄
   - REST API 端點 `/wp-json/contact/v1/submit`
   - 表單提交處理函數
   - 郵件通知發送到 qiyunsolution@gmail.com

3. **數據驗證和安全**
   - 必填欄位檢查
   - Email 格式驗證
   - 垃圾郵件檢查（honeypot）
   - 輸入淨化和安全過濾

---

## ⏱️ 預計時間

- 部署: 5 分鐘
- 驗證: 2 分鐘
- 測試: 3 分鐘

**總計: 約 10 分鐘**

---

## 🆘 如果需要幫助

部署完成後，如果有任何問題，請告訴我：
1. WordPress 現在是否正常顯示（還是仍然報錯）
2. 是否看到 Contact Forms 菜單
3. API 端點測試結果
4. 任何錯誤信息或截圖
