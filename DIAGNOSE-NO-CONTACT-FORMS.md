# 診斷：Contact Forms 菜單未出現

## 🔍 可能的原因

1. **PHP 代碼沒有成功保存**
2. **functions.php 還有語法錯誤**
3. **WordPress 快取沒有清除**
4. **代碼已保存但需要重新載入**

---

## ✅ 診斷步驟

### 第 1 步：驗證代碼是否已保存

1. **進入主題編輯器**
   - WordPress 後台 → 外觀 (Appearance) → 主題檔案編輯器 (Theme File Editor)

2. **打開 functions.php**

3. **檢查內容**
   - 代碼是否還在？
   - 代碼開頭是 `<?php` 嗎？
   - 代碼結尾是 `});` 嗎？

**結果：**
- ✅ 如果代碼還在且格式正確 → 進行第 2 步
- ❌ 如果代碼不見了 → 需要重新部署（見底部）

---

### 第 2 步：檢查是否有紅色錯誤

1. **在主題編輯器中查看**

2. **頁面頂部是否有紅色警告訊息？**
   ```
   ❌ 例如：Parse error, syntax error 等
   ```

3. **如果有紅色錯誤**
   - 這表示代碼有問題
   - 需要修復後重新保存

4. **如果沒有紅色錯誤**
   - 代碼應該是正確的
   - 進行第 3 步

---

### 第 3 步：清除 WordPress 快取

1. **重新整理 WordPress 後台**
   - **Mac**: Cmd + Shift + R （強制重新整理）
   - **Windows**: Ctrl + Shift + R （強制重新整理）

2. **登出 WordPress**
   - 右上角用戶名 → 登出

3. **關閉瀏覽器**
   - 完全關閉（不是最小化）

4. **重新打開瀏覽器**

5. **重新登入 WordPress**
   ```
   https://63w.c36.myftpupload.com/wp-admin/
   ```

6. **查看左側菜單**
   - 向下滾動
   - 看看 Contact Forms 出現了沒

---

### 第 4 步：檢查 WordPress 是否識別代碼

**在 WordPress 後台任何頁面按 F12 打開開發者工具：**

1. **進入 Console 標籤**

2. **輸入以下命令檢查：**
   ```javascript
   // 複製貼上到 console 中執行
   fetch('/wp-json/contact/v1/submit', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({name: 'test', email: 'test@test.com', phone: '123', message: 'test', hp: ''})
   }).then(r => r.json()).then(d => console.log(d))
   ```

3. **如果看到響應 = API 端點工作正常**

---

## 🚨 如果 Contact Forms 還是沒出現

### 可能性 1：代碼沒有成功保存

**症狀**：
- functions.php 是空的
- 或者只有舊代碼

**解決方案**：
- 回到 `DEPLOY-PHP-CODE-NOW.md`
- 重新部署代碼

---

### 可能性 2：有語法錯誤

**症狀**：
- 主題編輯器顯示紅色錯誤
- 無法保存代碼

**解決方案**：
1. 完全清空 functions.php
2. 從 `functions-final-fixed.php` 重新複製
3. 確保沒有多餘的 `?>` 標籤
4. 確保末尾是 `});`

---

### 可能性 3：WordPress 需要重新啟用自訂文章類型

**症狀**：
- 代碼已保存
- 沒有紅色錯誤
- 但菜單還是沒出現

**解決方案**：

**方案 A：重新整理 WordPress 數據庫**

1. 進入主題編輯器，打開 functions.php

2. 在末尾添加臨時代碼：
   ```php
   // 臨時強制刷新自訂文章類型
   if (!defined('WP_INSTALLING')) {
       flush_rewrite_rules();
   }
   ```

3. 保存

4. 進入 WordPress 後台任何頁面

5. 刪除剛才添加的臨時代碼

6. 再保存一次

7. 檢查菜單

---

**方案 B：用 FTP 檢查文件權限**

1. 用 FTP 連接到 GoDaddy

2. 進入 `/wp-content/themes/go/`

3. 右鍵 `functions.php` → 檢查權限

4. 確保權限是 644 或 755

5. 如果不對，修改為 644

---

## 📋 快速檢查清單

- [ ] 進入主題編輯器，打開 functions.php
- [ ] 代碼確實存在（不是空的）
- [ ] 代碼以 `<?php` 開頭
- [ ] 代碼以 `});` 結尾
- [ ] 沒有紅色錯誤訊息
- [ ] 強制重新整理後台 (Cmd+Shift+R)
- [ ] 登出並重新登入
- [ ] 向下滾動左側菜單
- [ ] 檢查是否出現 Contact Forms

---

## 🎯 立即行動

**按照以上 4 個診斷步驟逐一檢查，然後告訴我：**

1. ✅ functions.php 中的代碼還在嗎？
2. ✅ 有紅色錯誤嗎？
3. ✅ 強制重新整理後出現了嗎？
4. ✅ 現在看到 Contact Forms 菜單了嗎？

---

## 💬 具體結果

根據你的答案，我會進一步協助！

**如果都試過還是沒有，請告訴我：**
- functions.php 最後幾行的代碼是什麼？
- 有沒有看到任何紅色訊息？
- 截圖或描述一下你看到的內容
