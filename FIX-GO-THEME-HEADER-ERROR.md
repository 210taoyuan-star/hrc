# 🔧 Go 主題 header.php 錯誤修復指南

## 🔴 問題診斷

**錯誤信息：**
```
Uncaught Error: Call to undefined function Go\Core\get_default_header_variation() 
in wp-content/themes/go/header.php:12
```

**原因：** Go 主題的 header.php 文件調用了一個不存在或損壞的函數

**影響：** WordPress 無法正常載入任何頁面

---

## ✅ 解決方案（選擇一個）

### 方案 A: 使用 WordPress 文件編輯器修復 header.php（推薦）

#### 步驟 1: 進入主題編輯器
1. 登入 WordPress: https://63w.c36.myftpupload.com/wp-admin/
2. 左側菜單 → **外觀 (Appearance)** → **主題編輯器 (Theme File Editor)**

#### 步驟 2: 打開 header.php
- 右側文件列表找到 **Theme Header (header.php)**
- 點擊打開

#### 步驟 3: 找到錯誤的代碼
在第 12 行附近找到以下類似的代碼：
```php
$header_variation = Go\Core\get_default_header_variation();
```

或者：
```php
$args = apply_filters( 'go_header_args', Go\Core\get_default_header_variation() );
```

#### 步驟 4: 修復代碼
將那一行改為：
```php
$header_variation = array( 'type' => 'default' );
```

或者整行註解掉：
```php
// $header_variation = Go\Core\get_default_header_variation();
$header_variation = array( 'type' => 'default' );
```

#### 步驟 5: 保存
點擊 **Update File** 按鈕

---

### 方案 B: 禁用 Go 主題，使用備用主題

#### 步驟 1: 安裝備用主題
1. 左側菜單 → **外觀 (Appearance)** → **佈景主題 (Themes)**
2. 點擊 **+ 新增主題 (Add New Theme)**
3. 搜尋 **Twenty Twenty-Four** 或 **Storefront**
4. 點擊 **安裝 (Install)** 然後 **啟用 (Activate)**

#### 步驟 2: 回到 Go 主題修復
一旦切換到另一個主題後，您可以：
1. 回到 **外觀 → 主題編輯器**
2. 從下拉菜單選擇 **Go** 主題
3. 按照方案 A 的步驟 3-5 修復 header.php
4. 修復後再切回 Go 主題

---

### 方案 C: 完全重新安裝 Go 主題（最徹底）

#### 步驟 1: 切換主題
- 先按方案 B 切換到備用主題

#### 步驟 2: 刪除 Go 主題
1. 左側菜單 → **外觀 (Appearance)** → **佈景主題 (Themes)**
2. 找到 **Go**，點擊下方的 **更多 (...)** 按鈕
3. 選擇 **刪除 (Delete)**

#### 步驟 3: 重新安裝 Go 主題
1. 點擊 **+ 新增主題 (Add New Theme)**
2. 搜尋 **Go**
3. 安裝最新版本
4. 啟用 (Activate)

---

## 🎯 立即進行的操作

### 快速修復（推薦）

1. **進入主題編輯器**
   - 訪問: https://63w.c36.myftpupload.com/wp-admin/
   - 左側 → **外觀 → 主題編輯器**

2. **打開 header.php**
   - 右側找到 **Theme Header (header.php)** 點擊

3. **尋找錯誤代碼**
   - 按 **Ctrl+G** 進入第 12 行
   - 或手動尋找包含 `get_default_header_variation` 的行

4. **修復代碼**
   ```php
   // 舊代碼（刪除或註解掉）
   // $header_variation = Go\Core\get_default_header_variation();
   
   // 新代碼（添加）
   $header_variation = array( 'type' => 'default' );
   ```

5. **保存**
   - 點擊 **Update File** 按鈕

6. **測試**
   - 訪問 https://63w.c36.myftpupload.com/
   - 應該看到正常的 WordPress 首頁

---

## 🆘 如果上述方案不行

如果無法通過編輯器修復，請嘗試：

### 使用 FTP 直接編輯

1. 連線到 FTP: `63w.c36.myftpupload.com`
2. 進入: `/wp-content/themes/go/`
3. 下載 `header.php`
4. 用文本編輯器打開
5. 在第 12 行附近找到 `get_default_header_variation`
6. 修改或註解掉那一行
7. 保存並上傳回去

### 聯繫 GoDaddy 支持

如果 FTP 方法也無法使用：
1. 聯繫 GoDaddy 支持
2. 告訴他們 Go 主題的 header.php 第 12 行有缺失函數錯誤
3. 要求他們升級 Go 主題或修復文件

---

## 📋 修復檢查清單

- [ ] 進入 WordPress wp-admin
- [ ] 打開主題編輯器
- [ ] 打開 header.php
- [ ] 找到第 12 行的錯誤代碼
- [ ] 修復或註解掉該行
- [ ] 點擊 Update File 保存
- [ ] 重新整理 WordPress 首頁
- [ ] 確認頁面正常顯示（沒有錯誤）

---

## ⏱️ 預計時間
- 修復: 5 分鐘
- 測試: 1 分鐘

**總計: 約 6 分鐘**

---

## 📞 修復後接下來

修復 Go 主題的 header.php 後：

1. ✅ WordPress 首頁應正常顯示
2. ✅ 返回主題編輯器
3. ✅ 打開 **functions.php**
4. ✅ 驗證我們的表單代碼是否已保存
5. ✅ 如果未保存，重新貼入新代碼

---

## 💡 重要提醒

⚠️ **不要編輯其他文件**
- 只修改 header.php 第 12 行附近的 `get_default_header_variation` 部分

⚠️ **保存前檢查語法**
- 確保修改後的 PHP 代碼語法正確（括號、分號等）

⚠️ **修復後立即測試**
- 保存後立即訪問 https://63w.c36.myftpupload.com/ 測試

---

需要協助嗎？完成這些步驟後告訴我結果！
