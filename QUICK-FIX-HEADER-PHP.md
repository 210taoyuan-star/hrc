# 🔧 Go 主題 header.php 快速修復 - 逐步指南

## 📋 快速修復步驟（5 分鐘）

### 步驟 1️⃣: 進入 WordPress 管理後台
```
網址: https://63w.c36.myftpupload.com/wp-admin/
登入您的 WordPress 帳號
```

### 步驟 2️⃣: 打開主題編輯器
```
左側菜單 → 外觀 (Appearance) 
     → 主題編輯器 (Theme File Editor)
```

### 步驟 3️⃣: 打開 header.php
```
在右側文件列表中找到：
"Theme Header (header.php)"

點擊打開
```

### 步驟 4️⃣: 進入第 12 行
在編輯器中：
```
按 Ctrl+G（Windows）或 Cmd+G（Mac）
輸入數字 12
按 Enter 進入第 12 行
```

### 步驟 5️⃣: 找到錯誤的代碼
在第 12 行附近，您應該看到類似這樣的代碼：

```php
$header_variation = Go\Core\get_default_header_variation();
```

或者可能看起來像：

```php
$args = apply_filters( 'go_header_args', Go\Core\get_default_header_variation() );
```

### 步驟 6️⃣: 修復方式 A（推薦 - 註解掉該行）

**找到那一行，在前面加上 // 進行註解：**

改之前：
```php
$header_variation = Go\Core\get_default_header_variation();
```

改之後：
```php
// $header_variation = Go\Core\get_default_header_variation();
$header_variation = array( 'type' => 'default' );
```

### 步驟 7️⃣: 修復方式 B（刪除並替換）

**如果不想保留註解，直接刪除整行並替換為：**

```php
$header_variation = array( 'type' => 'default' );
```

### 步驟 8️⃣: 保存修改
```
點擊藍色的 "Update File" 按鈕
等待 3-5 秒
```

### 步驟 9️⃣: 驗證修復
```
訪問: https://63w.c36.myftpupload.com/
應該看到正常的 WordPress 首頁（不再報錯）
```

---

## 🎯 修復後的驗證清單

- [ ] WordPress 首頁正常顯示（沒有錯誤訊息）
- [ ] 可以登入 WordPress wp-admin
- [ ] 左側菜單正常顯示
- [ ] 左側菜單出現 **Contact Forms** 選項（表示表單系統已成功安裝）

---

## 🧪 最終驗證步驟

修復完成後，執行以下測試：

### 測試 1: 檢查 API 端點
```
訪問: https://63w.c36.myftpupload.com/wp-json/contact/v1/submit
應該看到某種錯誤回應（表示端點已成功註冊）
```

### 測試 2: 提交表單
```
1. 訪問: https://www.ownbabytw.com
2. 填寫表單
3. 點擊送出
4. 應該看到 "訊息已送出！" 成功提示
```

### 測試 3: 檢查 Contact Forms 菜單
```
1. 登入 WordPress
2. 左側菜單點擊 "Contact Forms"
3. 應該看到新的表單提交記錄
```

---

## ⚠️ 常見問題

**Q: 我找不到第 12 行的那個代碼怎麼辦？**

A: 可能在其他行，請搜尋關鍵字：
- 在編輯器中按 Ctrl+F（搜尋）
- 輸入 `get_default_header_variation`
- 會自動定位到該行

**Q: 修改後還是報錯怎麼辦？**

A: 
1. 清除瀏覽器快取 (Cmd+Shift+Delete)
2. 等待 60 秒後重新整理
3. 用無痕模式訪問試試

**Q: 我不小心刪除了太多代碼怎麼辦？**

A: 
1. 點擊 WordPress 編輯器的 "View Previous Version"（如果有的話）
2. 或者重新進入 Go 主題的默認 header.php 版本

---

## 📞 需要幫助嗎？

修復完成後，告訴我：
1. ✅ 或 ❌ WordPress 首頁是否正常顯示
2. ✅ 或 ❌ 是否看到 Contact Forms 菜單
3. 任何錯誤信息或截圖

我會根據結果幫您進行下一步！
