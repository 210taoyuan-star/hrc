# ⚠️ 重要提示：CoBlocks 仍然處於活動狀態

## 🔴 問題確認

錯誤訊息顯示 CoBlocks 插件仍在運行：
```
Uncaught Error: Call to undefined function Go\Core\get_design_style() 
in wp-content/plugins/coblocks/includes/class-coblocks-site-design.php:298
```

這表示：
- ❌ CoBlocks 插件**仍然未被停用**
- ❌ WordPress 仍在嘗試執行 CoBlocks 代碼
- ❌ 你無法進入主題編輯器

---

## 🚨 解決方案

你有 **兩個選擇**：

### 選項 A：停用 CoBlocks（推薦）

**步驟**：

1. **登入 WordPress 後台**
   ```
   https://63w.c36.myftpupload.com/wp-admin/
   ```

2. **左側菜單 → 「外掛」(Plugins)**

3. **找到 CoBlocks**

4. **點擊「停用」按鈕**

5. **重新整理頁面** (Cmd+R / Ctrl+R)

**預期結果**：
- ✅ 錯誤消失
- ✅ 能進入主題編輯器
- ✅ 能看到 Contact Forms 菜單

---

### 選項 B：用 FTP 直接停用 CoBlocks（如果後台打不開）

**如果你無法進入 WordPress 後台**（因為 CoBlocks 錯誤），可以用 FTP 強制停用它：

#### 第 1 步：用 FTP 連接

**軟體**：FileZilla、Transmit 或 Cyberduck

**連接設定**：
```
主機: 63w.c36.myftpupload.com
帳號: [你的 FTP 帳號]
密碼: [你的 FTP 密碼]
埠號: 21
```

#### 第 2 步：刪除或重命名 CoBlocks 文件夾

**導航到**：
```
/wp-content/plugins/
```

**找到 `coblocks` 文件夾**

**選項 B-1：刪除插件**
- 右鍵 `coblocks` 文件夾 → 刪除

**選項 B-2：重命名插件（備份方案）**
- 右鍵 `coblocks` 文件夾 → 重命名
- 改為 `coblocks-disabled`
- WordPress 會自動停用它

#### 第 3 步：驗證

1. **重新進入 WordPress 後台**
   ```
   https://63w.c36.myftpupload.com/wp-admin/
   ```

2. **應該沒有錯誤了**

3. **進入主題編輯器**
   - 外觀 → 主題檔案編輯器
   - 打開 functions.php

4. **驗證我們的代碼還在**

---

## 📋 哪個選項適合你？

### ✅ 如果你能進入 WordPress 後台
- 使用**選項 A**（最簡單）
- 1 分鐘完成

### ✅ 如果你進不了 WordPress 後台（一直看到 CoBlocks 錯誤）
- 使用**選項 B**（FTP 方法）
- 需要 FTP 軟體和帳號

---

## 🎯 立即行動

### 試試看能不能進入 WordPress 後台

1. 訪問：https://63w.c36.myftpupload.com/wp-admin/

2. 如果能登入 → **使用選項 A**（停用 CoBlocks）

3. 如果進不了或一直看到錯誤 → **使用選項 B**（FTP 方法）

---

## ❓ 我不知道我的 FTP 帳號

**如果使用選項 B，需要 FTP 帳號：**

通常可以在以下地方找到：
1. GoDaddy 帳戶設定
2. 託管帳戶面板
3. 或告訴我，我可以提供其他方法

---

## 💬 下一步

**完成以上任一選項後：**

1. ✅ 進入 WordPress 後台
2. ✅ 進入主題編輯器
3. ✅ 驗證 functions.php 有我們的代碼
4. ✅ 驗證 WordPress 左側出現「Contact Forms」菜單

**然後告訴我結果！** 🚀

---

## 🔍 故障排除

### 如果還是看到 CoBlocks 錯誤

**原因可能**：
- 選項 A：沒有真的點擊「停用」
- 選項 B：重命名時出錯

**解決方案**：
1. 再次確認插件已停用
2. 清除瀏覽器快取 (Cmd+Shift+Delete / Ctrl+Shift+Delete)
3. 用無痕模式打開瀏覽器再試
4. 告訴我具體錯誤

---

**準備好了嗎？現在就去停用 CoBlocks！** 💪
