# 品牌一致性 Hero Section 設計

## 🎨 符合現有設計系統的 Hero Section

以下是符合您網站現有青綠色品牌系統的 Hero section 設計：

### ✅ 推薦版本 1：現代簡潔風格

```jsx
<section className="relative py-24 bg-gradient-to-br from-[var(--brand-50)] to-white text-center">
  <div className="max-w-4xl mx-auto px-6">
    {/* 裝飾性背景元素 */}
    <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--brand-100)] rounded-full opacity-30 animate-pulse"></div>
    <div className="absolute bottom-10 right-10 w-16 h-16 bg-[var(--brand)] rounded-full opacity-20 animate-bounce"></div>
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl md:text-5xl font-bold text-[var(--brand-800)] leading-tight mb-6">
        {lang === "zh" ? "祈孕顧問專業服務" : "Professional Fertility Consulting"}
      </h1>
      
      <p className="mt-4 text-lg md:text-xl text-[var(--brand-700)] max-w-2xl mx-auto">
        {lang === "zh" 
          ? "以專業與信賴，圓您擁有孩子的夢想。提供美國試管與代孕一對一專屬諮詢服務。" 
          : "Professional support for your family journey with personalized IVF and surrogacy consulting."
        }
      </p>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="https://page.line.me/293mminh"
          className="px-8 py-4 bg-[var(--brand)] text-white rounded-full font-bold shadow-lg hover:bg-[var(--brand-800)] transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-center gap-2">
            <span>💬</span>
            {lang === "zh" ? "加入 LINE 諮詢" : "LINE Consultation"}
          </div>
        </a>
        
        <a
          href="mailto:qiyunsolution@gmail.com"
          className="px-8 py-4 border-2 border-[var(--brand)] text-[var(--brand)] rounded-full hover:bg-[var(--brand)] hover:text-white transition-all duration-300 font-semibold"
        >
          <div className="flex items-center justify-center gap-2">
            <Mail className="h-5 w-5" />
            {lang === "zh" ? "Email 聯繫" : "Email Contact"}
          </div>
        </a>
      </div>
    </motion.div>
  </div>
</section>
```

### ✅ 推薦版本 2：玻璃擬態風格

```jsx
<section className="relative py-24 bg-gradient-to-br from-[var(--brand-50)] via-white to-[var(--brand-100)] text-center overflow-hidden">
  <div className="max-w-4xl mx-auto px-6 relative z-10">
    {/* 背景裝飾圓圈 */}
    <div className="absolute -top-20 -left-20 w-40 h-40 bg-[var(--brand)] rounded-full opacity-10 blur-3xl"></div>
    <div className="absolute -bottom-20 -right-20 w-32 h-32 bg-[var(--accent)] rounded-full opacity-15 blur-2xl"></div>
    
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg border border-white/50"
    >
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] rounded-full flex items-center justify-center">
          <Baby className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand)] bg-clip-text text-transparent leading-tight mb-6">
        {lang === "zh" ? "祈孕顧問" : "Fertility Guidance"}
      </h1>
      
      <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
        {lang === "zh" 
          ? "溫柔陪伴您的備孕旅程，提供專業的美國試管與代孕諮詢服務" 
          : "Gentle support for your fertility journey with professional IVF and surrogacy consulting"
        }
      </p>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <a
          href="https://page.line.me/293mminh"
          className="px-8 py-4 bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          {lang === "zh" ? "🍀 免費諮詢" : "🍀 Free Consultation"}
        </a>
        
        <a
          href="mailto:qiyunsolution@gmail.com"
          className="px-8 py-4 bg-white/90 text-[var(--brand)] rounded-full hover:bg-white border border-[var(--brand-200)] transition-all duration-300 font-semibold shadow-md"
        >
          {lang === "zh" ? "📧 聯繫我們" : "📧 Contact Us"}
        </a>
      </div>
    </motion.div>
  </div>
</section>
```

### ✅ 推薦版本 3：極簡專業風格

```jsx
<section className="relative py-20 bg-white text-center">
  <div className="max-w-5xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--brand-50)] text-[var(--brand-800)] rounded-full text-sm font-medium">
          <Sparkles className="h-4 w-4" />
          {lang === "zh" ? "專業可信賴" : "Professional & Trusted"}
        </span>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-bold text-[var(--text-primary)] leading-tight mb-6">
        <span className="text-[var(--brand)]">{lang === "zh" ? "祈孕" : "Fertility"}</span>
        <span className="text-[var(--text-primary)]">{lang === "zh" ? "顧問" : " Guidance"}</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-10 leading-relaxed">
        {lang === "zh" 
          ? "以專業與信賴，圓您擁有孩子的夢想" 
          : "Professional, compassionate support for your family journey"
        }
      </p>
      
      <div className="flex flex-col lg:flex-row justify-center items-center gap-6">
        <a
          href="https://page.line.me/293mminh"
          className="group px-10 py-5 bg-[var(--brand)] text-white rounded-2xl font-bold shadow-lg hover:bg-[var(--brand-800)] transition-all duration-300 hover:shadow-xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
              <ArrowRight className="h-4 w-4" />
            </div>
            {lang === "zh" ? "開始諮詢" : "Start Consultation"}
          </div>
        </a>
        
        <div className="flex items-center gap-4 text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-[var(--brand)]" />
            <span className="font-medium">+886-2-1234-8888</span>
          </div>
          <div className="w-1 h-1 bg-[var(--text-muted)] rounded-full"></div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-[var(--brand)]" />
            <span className="font-medium">qiyunsolution@gmail.com</span>
          </div>
        </div>
      </div>
    </motion.div>
  </div>
</section>
```

## 🎯 這些版本的優勢

### ✅ 品牌一致性
- 使用現有的 `--brand` 色彩變量
- 保持青綠色品牌識別
- 與現有設計系統完美融合

### ✅ 響應式設計
- 完整的移動端適配
- 彈性的按鈕布局
- 適當的間距和字體大小

### ✅ 互動體驗
- Framer Motion 動畫效果
- 懸停狀態轉換
- 視覺層次清晰

### ✅ 多語言支持
- 與現有 `lang` 狀態整合
- 一致的語言切換邏輯

## 💡 實施建議

選擇您喜歡的版本，我可以：
1. 直接整合到 `LandingTemplateFixed.jsx` 中
2. 調整現有 Hero section
3. 創建為可切換的組件

您偏好哪個版本？或需要我進一步調整設計？