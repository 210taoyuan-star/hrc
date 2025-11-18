# 立即部署 - 簡潔工作版本

## 🎯 問題診斷

```
"code":"rest_no_route"
"message":"找不到與網址及請求方法相符的路由"
```

**原因**：API 端點沒有被正確註冊

**解決**：使用超簡潔版本重新部署

---

## ✅ 立即行動（5 分鐘）

### 第 1 步：完全清空 functions.php

1. **進入 WordPress 後台**
   ```
   https://63w.c36.myftpupload.com/wp-admin/
   ```

2. **外觀 → 主題編輯器**

3. **打開 functions.php**

4. **全選** (Cmd+A) **→ 刪除所有**

5. 編輯器現在應該是**完全空白**

---

### 第 2 步：複製新代碼

**在 VS Code 中打開** `functions-ultra-simple.php`

**全選** (Cmd+A) **→ 複製** (Cmd+C)

---

### 第 3 步：貼上代碼

**回到 WordPress 主題編輯器：**

1. **點擊** functions.php 編輯區域

2. **貼上** (Cmd+V / Ctrl+V)

3. 確認代碼開頭是 `<?php`

4. 確認代碼末尾是 `}`（沒有 `?>`）

---

### 第 4 步：儲存

**點擊「更新檔案」按鈕**

應該看到：
```
✅ File updated successfully
```

---

## 🔍 驗證成功

### 檢查 1：API 端點是否工作

**在瀏覽器中訪問：**
```
https://63w.c36.myftpupload.com/wp-json/contact/v1/submit
```

**應該看到：**
```json
{"code":"rest_method_not_allowed","message":"Method Not Allowed"}
```

**或者：**
```json
{"error":"Missing required fields"}
```

✅ **如果看到上面任何一個 = API 工作正常！**

---

### 檢查 2：菜單是否出現

**回到 WordPress 後台**

1. **強制重新整理** (Cmd+Shift+R 或 Ctrl+Shift+R)

2. **向下滾動左側菜單**

3. **查看是否出現「Contact Forms」**

✅ **如果看到菜單 = 部署成功！**

---

## 🚀 測試表單

### 1. 提交測試表單

訪問：https://www.ownbabytw.com

填寫並提交表單

---

### 2. 檢查 WordPress

**進入 Contact Forms 菜單**

應該看到你的測試提交

---

### 3. 檢查郵件

**打開 qiyunsolution@gmail.com**

應該收到通知郵件

---

## 📋 完整檢查清單

- [ ] 清空 functions.php
- [ ] 複製 functions-ultra-simple.php 的全部代碼
- [ ] 貼上到 functions.php
- [ ] 代碼開頭是 `<?php`
- [ ] 代碼末尾是 `}` (沒有 `?>`)
- [ ] 點擊「更新檔案」
- [ ] 沒有紅色錯誤
- [ ] 訪問 API 端點看到正常回應
- [ ] WordPress 左側出現「Contact Forms」菜單

---

## 💬 完成後告訴我

1. ✅ API 端點現在正常嗎？
2. ✅ Contact Forms 菜單出現了嗎？
3. ✅ 表單能提交嗎？
4. ✅ 郵件收到了嗎？

---

**現在就開始部署吧！** 🚀
