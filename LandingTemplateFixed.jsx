import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as React from "react";
import { Phone, Mail, MapPin, Baby, ShieldCheck, Users2, Globe2, HeartHandshake, Languages, Sparkles, User, Heart, ArrowRight, Building2, Clock, Calendar, Stethoscope } from "lucide-react";

// ---- Utility functions ----
const cx = (...classes) => classes.filter(Boolean).join(" ");

// ---- Global Styles as a component (safer for bundlers) ----
function GlobalStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+TC:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
      <style>{`
        :root { 
          --brand:#0F766E; 
          --brand-800:#0D5B54; 
          --brand-50:#F0FDFA; 
          --brand-100:#CCFBF1;
          --brand-600:#0F766E;
          --brand-700:#115E59;
          --accent:#14B8A6;
          --accent-light:#5EEAD4;
          --surface:#FFFFFF; 
          --surface-muted:#F8FFFE; 
          --text-primary:#0F172A;
          --text-secondary:#475569;
          --text-muted:#64748B;
          --gradient-primary: linear-gradient(135deg, #0F766E 0%, #14B8A6 100%);
          --gradient-secondary: linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%);
          --gradient-accent: linear-gradient(135deg, #14B8A6 0%, #5EEAD4 100%);
          --shadow-soft: 0 4px 20px rgba(15, 118, 110, 0.08);
          --shadow-medium: 0 8px 30px rgba(15, 118, 110, 0.12);
          --shadow-strong: 0 12px 40px rgba(15, 118, 110, 0.16);
        }
        html {
          font-size:16px;
          scroll-behavior:smooth;
          scroll-padding-top:6rem;
        }
        @media (max-width: 374px) {
          html { font-size:14px; }
        }
        @media (min-width:375px) and (max-width:639px) {
          html { font-size:15px; }
        }
        @media (min-width:640px) and (max-width:767px) {
          html { font-size:16px; }
        }
        @media (min-width:768px) and (max-width:1023px) {
          html { font-size:17px; }
        }
        @media (min-width:1024px) {
          html { font-size:18px; }
        }
        body {
          font-size:1rem;
          letter-spacing:0.01em;
          line-height:1.7;
          background: var(--gradient-secondary);
          font-family: 'Inter', 'Noto Sans TC', system-ui, sans-serif;
          color: var(--text-primary);
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        .section-shell {
          max-width:1200px;
          margin:0 auto;
          padding: 1.5rem 1rem;
        }
        @media (min-width:375px) {
          .section-shell {
            padding: 1.75rem 1rem;
          }
        }
        @media (min-width:640px) {
          .section-shell {
            padding: 2.5rem 1.5rem;
          }
        }
        @media (min-width:768px) {
          .section-shell {
            padding: 3rem 2rem;
          }
        }
        @media (min-width:1024px) {
          .section-shell {
            padding: 4rem 2rem;
          }
        }
        
        /* 現代動畫效果 */
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-8px);
          box-shadow: var(--shadow-strong);
        }
        
        /* 現代字體樣式 */
        h1, h2, h3, h4, h5, h6 {
          color: var(--text-primary);
          font-weight: 700;
          letter-spacing: -0.02em;
        }
        
        p {
          color: var(--text-secondary);
        }
        
        .text-muted {
          color: var(--text-muted);
        }
        
        /* 漸層按鈕 */
        .btn-gradient {
          background: var(--gradient-primary);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
          background: var(--gradient-accent);
        }
        
        /* 現代文字顏色覆蓋 Tailwind */
        .text-slate-600 {
          color: var(--text-secondary) !important;
        }
        .text-slate-700 {
          color: var(--text-primary) !important;
        }
        .text-slate-500 {
          color: var(--text-muted) !important;
        }
        
        /* 玻璃材質效果 */
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* 現代卡片設計 */
        .modern-card {
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(15, 118, 110, 0.08);
          border-radius: 20px;
          box-shadow: var(--shadow-soft);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .modern-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(1, 152, 117, 0.2);
        }
        
        /* 響應式文字 - 優化手機平板尺寸 */
        .responsive-text-xs { font-size: 0.75rem; line-height: 1.5; }
        .responsive-text-sm { font-size: 0.875rem; line-height: 1.6; }
        .responsive-text-base { font-size: 0.9375rem; line-height: 1.7; }
        .responsive-text-lg { font-size: 1.0625rem; line-height: 1.6; }
        .responsive-text-xl { font-size: 1.1875rem; line-height: 1.5; }
        
        /* 手機優化 (375px - 639px) */
        @media (min-width: 375px) and (max-width: 639px) {
          .responsive-text-xs { font-size: 0.8125rem; }
          .responsive-text-sm { font-size: 0.9375rem; }
          .responsive-text-base { font-size: 1rem; }
          .responsive-text-lg { font-size: 1.125rem; }
          .responsive-text-xl { font-size: 1.25rem; }
        }
        
        /* 小平板優化 (640px - 767px) */
        @media (min-width: 640px) and (max-width: 767px) {
          .responsive-text-xs { font-size: 0.8125rem; }
          .responsive-text-sm { font-size: 0.9375rem; }
          .responsive-text-base { font-size: 1.0625rem; }
          .responsive-text-lg { font-size: 1.1875rem; }
          .responsive-text-xl { font-size: 1.3125rem; }
        }
        
        /* 平板優化 (768px - 1023px) */
        @media (min-width: 768px) and (max-width: 1023px) {
          .responsive-text-xs { font-size: 0.875rem; }
          .responsive-text-sm { font-size: 1rem; }
          .responsive-text-base { font-size: 1.125rem; }
          .responsive-text-lg { font-size: 1.25rem; }
          .responsive-text-xl { font-size: 1.375rem; }
        }
        
        /* 桌面優化 (1024px+) */
        @media (min-width: 1024px) {
          .responsive-text-xs { font-size: 0.875rem; }
          .responsive-text-sm { font-size: 1rem; }
          .responsive-text-base { font-size: 1.125rem; }
          .responsive-text-lg { font-size: 1.3125rem; }
          .responsive-text-xl { font-size: 1.5rem; }
        }
        
        /* 手機和平板優化 - 更精細的尺寸控制 */
        @media (max-width: 767px) {
          /* 標題尺寸優化 - 適合閱讀 */
          h1 { font-size: 1.625rem !important; line-height: 1.3; margin-bottom: 0.625rem; }
          h2 { font-size: 1.375rem !important; line-height: 1.35; margin-bottom: 0.5rem; }
          h3 { font-size: 1.1875rem !important; line-height: 1.4; margin-bottom: 0.5rem; }
          h4 { font-size: 1.0625rem !important; line-height: 1.45; margin-bottom: 0.5rem; }
          
          /* 按鈕尺寸優化 - 確保觸控友善 */
          button, .btn, a[class*="btn"] {
            min-height: 48px;
            padding: 0.875rem 1.5rem;
            font-size: 0.9375rem;
            font-weight: 600;
          }
          
          /* 卡片間距優化 - 減少頂端空白 */
          .modern-card {
            padding: 1.125rem;
            margin-bottom: 0.875rem;
            border-radius: 16px;
          }
          
          /* 視頻容器優化 */
          video {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
            margin-bottom: 0.875rem;
          }
          
          /* 圖片優化 */
          img {
            max-width: 100%;
            height: auto;
            border-radius: 12px;
          }
          
          /* 輸入框優化 */
          input, textarea, select {
            font-size: 1rem !important; /* 防止 iOS Safari 自動縮放 */
            padding: 0.875rem 1rem;
            min-height: 48px;
          }
          
          /* 段落間距 - 減少頂端空白 */
          p {
            margin-bottom: 0.75rem;
            font-size: 0.9375rem;
          }
          
          /* 導航欄優化 */
          nav {
            padding: 0.625rem 1rem;
          }
          
          /* Section 區塊頂端間距優化 */
          section {
            padding-top: 2.5rem !important;
            padding-bottom: 2.5rem !important;
          }
        }
        
        /* 平板優化 (768px - 1023px) - 更平衡的尺寸 */
        @media (min-width: 768px) and (max-width: 1023px) {
          h1 { font-size: 2.125rem; line-height: 1.25; margin-bottom: 0.875rem; }
          h2 { font-size: 1.75rem; line-height: 1.3; margin-bottom: 0.75rem; }
          h3 { font-size: 1.4375rem; line-height: 1.35; margin-bottom: 0.625rem; }
          h4 { font-size: 1.1875rem; line-height: 1.4; margin-bottom: 0.625rem; }
          
          button, .btn, a[class*="btn"] {
            min-height: 48px;
            padding: 0.875rem 1.75rem;
            font-size: 1rem;
          }
          
          .modern-card {
            padding: 1.5rem;
            border-radius: 18px;
          }
          
          video {
            border-radius: 16px;
          }
          
          input, textarea, select {
            padding: 0.875rem 1.125rem;
            font-size: 1rem;
          }
          
          p {
            font-size: 1rem;
            margin-bottom: 0.875rem;
          }
          
          /* Section 區塊頂端間距優化 */
          section {
            padding-top: 3.5rem !important;
            padding-bottom: 3.5rem !important;
          }
        }
        
        /* 小螢幕手機優化 (<375px) - 更緊湊但仍可讀 */
        @media (max-width: 374px) {
          h1 { font-size: 1.4375rem !important; line-height: 1.3; }
          h2 { font-size: 1.1875rem !important; line-height: 1.35; }
          h3 { font-size: 1.0625rem !important; line-height: 1.4; }
          h4 { font-size: 0.9375rem !important; line-height: 1.45; }
          
          button, .btn, a[class*="btn"] {
            font-size: 0.875rem;
            padding: 0.75rem 1.25rem;
            min-height: 44px;
          }
          
          .modern-card {
            padding: 0.875rem;
          }
          
          .section-shell {
            padding: 1.25rem 0.875rem;
          }
          
          input, textarea, select {
            font-size: 1rem !important;
            padding: 0.75rem 0.875rem;
          }
          
          p {
            font-size: 0.875rem;
            margin-bottom: 0.625rem;
          }
          
          /* Section 區塊頂端間距優化 */
          section {
            padding-top: 2rem !important;
            padding-bottom: 2rem !important;
          }
        }
        
        /* 觸控優化 - 確保所有互動元素都易於點擊 */
        @media (hover: none) and (pointer: coarse) {
          /* 增加觸控目標尺寸 */
          a, button, input, select, textarea, [role="button"], [tabindex="0"] {
            min-height: 48px;
            min-width: 48px;
          }
          
          /* 連結加大點擊區域 */
          a:not([class*="btn"]) {
            padding: 0.25rem 0;
            display: inline-block;
          }
          
          /* 移除 hover 效果在觸控設備上 */
          .hover-lift:hover {
            transform: none;
          }
          
          .modern-card:hover {
            transform: none;
          }
          
          /* 觸控反饋 */
          button:active, a[class*="btn"]:active {
            transform: scale(0.98);
            opacity: 0.9;
          }
        }
        
        /* === 進階排版優化 === */
        
        /* 段落間距 */
        p {
          margin-bottom: 1rem;
        }
        p:last-child {
          margin-bottom: 0;
        }
        
        /* 列表樣式 */
        ul, ol {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        ul li, ol li {
          margin-bottom: 0.5rem;
          line-height: 1.7;
        }
        
        /* 標題間距系統 */
        h1, h2, h3, h4, h5, h6 {
          margin-top: 1.5em;
          margin-bottom: 0.75em;
        }
        h1:first-child, h2:first-child, h3:first-child {
          margin-top: 0;
        }
        
        /* 內容區塊間距 */
        section + section {
          margin-top: 0;
        }
        
        /* 卡片內容間距 */
        .modern-card > *:last-child {
          margin-bottom: 0;
        }
        
        /* 文字對齊 */
        .text-balance {
          text-wrap: balance;
        }
        
        /* 避免孤行 */
        p {
          orphans: 2;
          widows: 2;
        }
        
        /* 引用文字樣式 */
        blockquote {
          border-left: 4px solid var(--brand);
          padding-left: 1.5rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--text-secondary);
        }
        
        /* 分隔線 */
        hr {
          border: none;
          border-top: 1px solid rgba(15, 118, 110, 0.1);
          margin: 2rem 0;
        }
        
        /* 強調文字 */
        strong, b {
          font-weight: 700;
          color: var(--text-primary);
        }
        
        /* 連結樣式 */
        a {
          color: var(--brand);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        a:hover {
          color: var(--brand-700);
          text-decoration: underline;
        }
        
        /* Grid 對齊 */
        .grid {
          align-items: start;
        }
        
        /* Flex 間距一致性 */
        .flex.gap-4 > * {
          flex-shrink: 0;
        }
        
        /* 圖片圓角統一 */
        img {
          border-radius: 12px;
        }
        
        /* 表格樣式 */
        table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        th, td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid rgba(15, 118, 110, 0.1);
        }
        th {
          font-weight: 600;
          color: var(--text-primary);
          background: var(--brand-50);
        }
        
        /* 按鈕組間距 */
        .button-group {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        /* 內容最大寬度 */
        .content-width {
          max-width: 65ch;
          margin-left: auto;
          margin-right: auto;
        }
        
        /* 垂直節奏 */
        .vertical-rhythm > * + * {
          margin-top: 1.5rem;
        }
        
        /* 焦點樣式 */
        *:focus-visible {
          outline: 2px solid var(--brand);
          outline-offset: 2px;
          border-radius: 4px;
        }
        
        /* 選取文字顏色 */
        ::selection {
          background-color: var(--accent-light);
          color: var(--text-primary);
        }
        
        /* 滾動條樣式 */
        ::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        ::-webkit-scrollbar-track {
          background: var(--brand-50);
        }
        ::-webkit-scrollbar-thumb {
          background: var(--brand);
          border-radius: 5px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: var(--brand-700);
        }
      `}</style>
    </>
  );
}

// === Config ===
const BRAND = {
  name: "祈孕顧問",
  tagline: "用專業與溫度，陪你迎接新生命",
  phone: "+886-2-1234-8888",
  email: "service@qiyun.com.tw",
  address: "台北市松山區復興北路58號10樓",
};

// HRC Fertility 生育中心資訊
const HRC_FERTILITY = {
  name: {
    zh: "HRC Fertility 生育中心",
    en: "HRC Fertility Center"
  },
  description: {
    zh: "美國領先的生殖醫學中心，我們的合作夥伴",
    en: "Leading reproductive medicine center in the US, our trusted partner"
  },
  website: "https://www.hrcfertility.com",
  locations: [
    {
      name: { zh: "洛杉磯中心", en: "Los Angeles Center" },
      address: "Beverly Hills, CA"
    },
    {
      name: { zh: "橙縣中心", en: "Orange County Center" },
      address: "Newport Beach, CA"
    }
  ]
};

// Background hero images (provided)
const HERO_IMAGES = [
  "/images/hero/hero-1.webp",
  "/images/hero/hero-2.webp", 
  "/images/hero/hero-3-1600.webp",
];

// Gallery images for team section (provided)
const GALLERY_IMAGES = [
  "/images/gallery/gallery-1.webp",
  "/images/gallery/gallery-2.webp",
  "/images/gallery/gallery-3.webp",
];

// Section illustrations sourced from hero/gallery assets
const ILLUSTRATIONS = {
  hero: {
    src: "/images/gallery/ivf.webp",
    zhAlt: "體外受精概念插圖",
    enAlt: "IVF concept illustration",
  },
  knowledge: {
    src: "/images/gallery/iui.webp",
    srcSet: "/images/gallery/iui-480.webp 480w, /images/gallery/iui-960.webp 960w, /images/gallery/iui-1600.webp 1600w",
    sizes: "(min-width: 1024px) 340px, 80vw",
    zhAlt: "IUI 人工授精代孕知識插圖",
    enAlt: "IUI artificial insemination surrogacy knowledge illustration",
  },
  process: {
    src: "/images/gallery/ivf.webp",
    srcSet: "/images/gallery/ivf-480.webp 480w, /images/gallery/ivf-960.webp 960w, /images/gallery/ivf-1600.webp 1600w",
    sizes: "(min-width: 1024px) 340px, 80vw",
    zhAlt: "IVF 體外受精代孕流程插圖",
    enAlt: "IVF surrogacy process illustration",
  },
  faq: {
    src: "/images/gallery/gallery-3.webp",
    srcSet: "/images/gallery/gallery-3-480.webp 480w, /images/gallery/gallery-3-960.webp 960w, /images/gallery/gallery-3-1600.webp 1600w",
    sizes: "(min-width: 1024px) 320px, 80vw",
    zhAlt: "常見問題解答插圖",
    enAlt: "FAQ illustration",
  },
  contact: {
    src: "/images/gallery/gift-voucher-7-2025-desktop (2).webp",
    srcSet: "/images/gallery/gift-voucher-7-2025-desktop (2)-480.webp 480w, /images/gallery/gift-voucher-7-2025-desktop (2)-960.webp 960w, /images/gallery/gift-voucher-7-2025-desktop (2)-1600.webp 1600w",
    sizes: "(min-width: 1024px) 100vw, 100vw",
    zhAlt: "聯絡我們專業服務背景",
    enAlt: "Contact us professional service background",
  },
};

// NAV routes with anchor links for smooth scrolling
const NAV = [
  { id: "home", path: "#hero", zh: "首頁", en: "Home" },
  { 
    id: "services", 
    path: "#services", 
    zh: "美國代孕服務", 
    en: "US Surrogacy Services",
    subItems: [
      { id: "couple-surrogacy", path: "#couple-surrogacy", zh: "夫妻代孕", en: "Couple Surrogacy" },
      { id: "lgbtq-surrogacy", path: "#lgbtq-surrogacy", zh: "同志代孕", en: "LGBTQ+ Surrogacy" },
      { id: "single-surrogacy", path: "#single-surrogacy", zh: "單身代孕", en: "Single Parent Surrogacy" }
    ]
  },
  { id: "hrc-fertility", path: "#hrc-fertility", zh: "HRC Fertility 生育中心", en: "HRC Fertility Center" },
  { id: "process", path: "#process", zh: "詳細流程", en: "Process" },
  { id: "legal", path: "#legal", zh: "法律資訊", en: "Legal Info" },
  { id: "knowledge", path: "#knowledge", zh: "代孕知識與案例", en: "Knowledge & Cases" },
  { id: "team", path: "#team", zh: "團隊", en: "Team" },
  { id: "faq", path: "#faq", zh: "FAQ", en: "FAQ" },
  { id: "contact", path: "#contact", zh: "聯絡", en: "Contact" },
];

const FEATURES = [
  { id: "couple-surrogacy", icon: HeartHandshake, zh: "夫妻代孕", en: "Couple Surrogacy", descZh: "為已婚夫妻提供專業美國代孕服務，圓滿家庭夢想。", descEn: "Professional US surrogacy services for married couples to fulfill their family dreams.", image: "/images/gallery/parent.webp", hasDetail: true },
  { id: "lgbtq-surrogacy", icon: Users2, zh: "同志代孕", en: "LGBTQ+ Surrogacy", descZh: "支援同志伴侶代孕需求，提供包容性專業服務。", descEn: "Supporting LGBTQ+ couples with inclusive and professional surrogacy services.", image: "/images/gallery/girls.webp", hasDetail: true },
  { id: "single-surrogacy", icon: User, zh: "單身代孕", en: "Single Parent Surrogacy", descZh: "協助單身人士實現為人父母的夢想，提供全方位支援與陪伴。", descEn: "Helping single individuals achieve their dreams of becoming parents with comprehensive support and guidance.", image: "/images/gallery/son.webp", hasDetail: true },
  { id: "legal-protection", icon: ShieldCheck, zh: "法律保障", en: "Legal Protection", descZh: "提供完整的法律文件與程序保障，確保權益。", descEn: "Comprehensive legal documentation and procedural protection to ensure rights." },
  { id: "cross-border", icon: Globe2, zh: "跨境醫療聯盟", en: "Cross-Border Clinics", descZh: "串接美國生殖中心與法務，透明流程與費用。", descEn: "Trusted US clinics & attorneys with transparent steps and fees." },
];

// 夫妻代孕詳細內容
const COUPLE_SURROGACY_DETAIL = {
  zh: {
    title: "夫妻代孕（自精自卵＋代孕）",
    subtitle: "從評估到分娩，一站式陪伴",
    overview: {
      title: "流程總覽",
      phases: [
        {
          phase: "前期準備階段",
          items: [
            "醫療評估：確認夫妻雙方皆可提供健康的精子與卵子，並完成必要檢查。",
            "合規與文件：了解美台兩地法規、準備授權與同意文件、保險與費用預估。",
            "代孕媒合：與美國合作機構進行配對，安排代理孕母（GC）線上面試並完成背景審核。"
          ]
        },
        {
          phase: "IVF 醫療階段",
          items: [
            "取精、取卵 → 體外受精與胚胎培養。",
            "胚胎基因篩檢：進行胚胎染色體篩檢（PGS／PGT-A）。",
            "冷凍保存與運輸（視方案而定）：精子／卵子／胚胎之國際運輸。"
          ]
        },
        {
          phase: "代孕階段",
          items: [
            "代理孕母內膜準備與胚胎植入。",
            "孕期追蹤、產檢與生產安排。",
            "新生兒文件處理與返台流程。"
          ]
        }
      ]
    },
    plans: {
      title: "三種跨境執行方案",
      subtitle: "醫療×法務×運輸×媒合",
      options: [
        {
          name: "方案一｜夫妻親自赴美",
          description: "夫妻雙方親赴美國生殖醫學中心完成取精、取卵與 IVF；胚胎完成 PGS／PGT-A 後，植入代理孕母子宮。代理孕母以線上面試方式完成媒合。",
          highlights: [
            "IVF 與植入皆在美國",
            "減少跨境運輸變因",
            "適合：希望全程在美國醫療體系的家庭"
          ]
        },
        {
          name: "方案二｜胚胎國際運輸至美國",
          description: "夫妻在台灣完成取精、取卵與 IVF，於台灣培養胚胎；再將胚胎以國際運輸送至美國生殖醫學中心，在美國完成代理孕母植入。代理孕母以線上面試方式完成媒合。",
          highlights: [
            "台灣完成取卵取精與IVF，胚胎運至美國植入",
            "適合：希望多數醫療在台、結合法務友善的美國代孕"
          ]
        },
        {
          name: "方案三｜精卵國際運輸至美國",
          description: "夫妻在台灣取精、取卵，將精子與卵子分別運送到美國生殖醫學中心；在美國完成 IVF 與胚胎 PGS／PGT-A，之後植入代理孕母子宮。代理孕母以線上面試方式完成媒合。",
          highlights: [
            "台灣採集精卵→美國完成IVF與PGS／PGT-A→植入",
            "適合：希望在美國端掌握胚胎培養與篩檢品質"
          ]
        }
      ]
    },
    guarantees: {
      title: "三大保證",
      items: [
        {
          title: "跨域整合",
          description: "IVF 醫療、代孕媒合、跨境運輸與法務同步管理。"
        },
        {
          title: "透明里程碑",
          description: "明確時程、費用拆項與關鍵節點提醒。"
        },
        {
          title: "風險控管",
          description: "冷鏈標準、文件審核、孕期追蹤與分娩安排。"
        }
      ]
    },
    timeline: {
      title: "流程與時間軸",
      phases: [
        {
          duration: "1–3月",
          title: "前期準備",
          items: ["評估", "合規文件", "代孕媒合與面試"]
        },
        {
          duration: "1–2月",
          title: "IVF",
          items: ["促排與取卵／取精", "受精培養", "PGS／PGT-A", "凍存"]
        },
        {
          duration: "9–10月",
          title: "植入與孕期",
          items: ["代孕內膜準備", "植入", "產檢", "分娩與返台文件"]
        }
      ]
    }
  },
  en: {
    title: "Couple Surrogacy (Own Sperm + Egg + Surrogate)",
    subtitle: "Comprehensive support from assessment to delivery",
    overview: {
      title: "Process Overview",
      phases: [
        {
          phase: "Preparation Phase",
          items: [
            "Medical Assessment: Confirm both partners can provide healthy sperm and eggs, complete necessary tests.",
            "Compliance & Documentation: Understand Taiwan-US regulations, prepare authorization and consent documents, insurance and cost estimation.",
            "Surrogate Matching: Coordinate with US partner agencies, arrange online interviews with gestational carrier (GC) and complete background checks."
          ]
        },
        {
          phase: "IVF Medical Phase",
          items: [
            "Sperm & egg retrieval → In vitro fertilization and embryo culture.",
            "Genetic Screening: Preimplantation genetic screening (PGS/PGT-A).",
            "Cryopreservation & Transport (varies by plan): International transport of sperm/eggs/embryos."
          ]
        },
        {
          phase: "Surrogacy Phase",
          items: [
            "Endometrial preparation and embryo transfer.",
            "Pregnancy monitoring, prenatal care, and delivery arrangements.",
            "Newborn documentation and return to Taiwan procedures."
          ]
        }
      ]
    },
    plans: {
      title: "Three Cross-Border Execution Plans",
      subtitle: "Medical × Legal × Transport × Matching",
      options: [
        {
          name: "Plan 1 | Couple Travels to US",
          description: "Couple travels to US reproductive medical center for sperm/egg retrieval and IVF; after embryo PGS/PGT-A, transfer to surrogate. Surrogate matching via online interview.",
          highlights: [
            "IVF and transfer both in US",
            "Minimizes cross-border transport variables",
            "Suitable for: Families preferring full US medical system"
          ]
        },
        {
          name: "Plan 2 | Embryo International Transport to US",
          description: "Couple completes sperm/egg retrieval and IVF in Taiwan, embryos cultured in Taiwan; embryos transported internationally to US reproductive center for surrogate transfer. Surrogate matching via online interview.",
          highlights: [
            "Taiwan egg/sperm retrieval and IVF, embryo transport to US for transfer",
            "Suitable for: Majority medical procedures in Taiwan, combined with US surrogacy-friendly legal environment"
          ]
        },
        {
          name: "Plan 3 | Sperm & Egg International Transport to US",
          description: "Couple retrieves sperm/eggs in Taiwan, transported separately to US reproductive center; IVF and embryo PGS/PGT-A completed in US, then transferred to surrogate. Surrogate matching via online interview.",
          highlights: [
            "Taiwan collection → US IVF and PGS/PGT-A → Transfer",
            "Suitable for: Control of embryo culture and screening quality in US"
          ]
        }
      ]
    },
    guarantees: {
      title: "Three Guarantees",
      items: [
        {
          title: "Cross-Domain Integration",
          description: "IVF medical, surrogate matching, cross-border transport, and legal services managed synchronously."
        },
        {
          title: "Transparent Milestones",
          description: "Clear timeline, itemized costs, and key milestone reminders."
        },
        {
          title: "Risk Management",
          description: "Cold chain standards, document review, pregnancy tracking, and delivery arrangements."
        }
      ]
    },
    timeline: {
      title: "Process Timeline",
      phases: [
        {
          duration: "1–3 months",
          title: "Preparation",
          items: ["Assessment", "Compliance Documents", "Surrogate Matching & Interview"]
        },
        {
          duration: "1–2 months",
          title: "IVF",
          items: ["Ovarian Stimulation & Retrieval", "Fertilization & Culture", "PGS/PGT-A", "Cryopreservation"]
        },
        {
          duration: "9–10 months",
          title: "Transfer & Pregnancy",
          items: ["Endometrial Preparation", "Transfer", "Prenatal Care", "Delivery & Return Documentation"]
        }
      ]
    }
  }
};

// 同志代孕詳細內容
const PARTNER_SURROGACY_DETAIL = {
  zh: {
    title: "同志伴侶生育方案（美國）",
    subtitle: "多元家庭的美國生育解決方案",
    process: [
      "前期準備：初談與評估 → 體檢與傳染病篩檢 → 法務諮詢與路線確認 → 挑選捐精/捐卵來源與（必要時）代理孕母機構。",
      "IVF 醫療階段：取精/取卵（於美國進行，或在台灣完成後依法規冷凍國際運輸）。受精、胚胎培養與 PGT A（俗稱 PGS）染色體篩檢與胚胎評分。",
      "植入與懷孕：代孕方案：與代理孕母完成法務與醫審後安排移植與產檢。自懷方案：本人完成內膜準備與移植、產檢與待產。",
      "跨境運輸提醒：依美國 FDA 與進出口規範，精/卵/胚之運輸流程與文件審核常見約需 ≈4 個月，時程請預留彈性。"
    ],
    plans: [
      {
        category: "男同志伴侶｜自精＋捐卵＋代孕",
        method: "男同志伴侶可使用一方或雙方精子，於美國生殖醫學中心進行 IVF；卵源來自美國卵子庫或捐贈者。完成 PGT A 篩檢後，將胚胎植入代理孕母子宮。",
        options: [
          "親自赴美：赴美取精並完成建胚與後續流程。",
          "台灣取精＋國際運輸：於台灣取精冷凍後，符合法規辦理運輸至美國 IVF 中心。"
        ],
        timeline: [
          { type: "親自赴美", duration: "12–14個月", description: "取精停留約 3–7 天；整體約 12–14 個月 完成。" },
          { type: "國際運輸", duration: "16–18個月", description: "含 FDA 規範檢查與進出口文件約 ≈4 個月；整體約 16–18 個月。" }
        ],
        faqs: [
          { q: "一定要親自赴美取精嗎？", a: "不一定，可在台灣取精後依法規冷凍運輸至美國。" },
          { q: "台灣需做哪些檢測？", a: "常見含傳染病篩檢（如 HIV、HBV、HCV、梅毒等）與精液分析；實際以醫療院所規範為準。" },
          { q: "如何挑選卵子？", a: "透過卵子庫檢視年齡、健康與遺傳篩檢報告、外貌與背景資料等；可選匿名/半匿名/開放身分（依卵子庫政策）。" },
          { q: "代理孕母要見面嗎？", a: "多以線上面談為主；是否實體會面視雙方意願與機構安排。" },
          { q: "寶寶國籍？", a: "若在美國出生，通常依當地法律取得美國公民身分；返台與認領程序需依相關法令並諮詢律師。" }
        ]
      },
      {
        category: "女同志伴侶｜捐精＋自卵＋代孕",
        method: "女同志伴侶於美國 IVF 取卵建胚（或在台灣取卵後依規定運輸），捐精來源多由美國精子庫選擇；胚胎經 PGT A 篩檢後植入代理孕母。",
        options: [
          "親自赴美：取卵停留約 2–3 週；其餘流程視醫囑安排。",
          "台灣取卵＋國際運輸：依法規完成冷凍與文件後運送至美國。"
        ],
        timeline: [
          { type: "親自赴美", duration: "12–14個月", description: "整體約 12–14 個月。" },
          { type: "國際運輸", duration: "16–18個月", description: "因文件與法規流程，整體約 16–18 個月。" }
        ],
        faqs: [
          { q: "要去美國幾趟？", a: "視方案而定；一般至少一次取卵，若非代孕自懷者還需赴美完成植入。" },
          { q: "親取 vs. 國運差異？", a: "親取流程掌控度高、時程可壓縮；國運可減少停留，但增加文件與等待時間與成本。" },
          { q: "代理孕母費用為何有差異？", a: "受州別法規、保險方案、孕母經驗與醫療史、是否多胎/剖腹可能性等影響。" },
          { q: "寶寶國籍？", a: "在美國出生多依當地法取得美國公民；返台與認領請依法辦理並尋求法律意見。" }
        ]
      },
      {
        category: "女同志伴侶｜捐精＋自卵＋自懷",
        method: "於美國 IVF 以捐精與自卵建胚，完成 PGT A 後植入本人子宮，由伴侶共同迎接孕期與生產。",
        options: [
          "親自赴美：取卵與（之後）植入一般各需停留 2–3 週（可分次進行）。",
          "台灣取卵＋國際運輸：完成運輸與建胚後，再赴美完成植入。"
        ],
        timeline: [
          { type: "親自赴美", duration: "12–14個月", description: "整體約 12–14 個月。" },
          { type: "國際運輸", duration: "16–18個月", description: "含文件與法規流程，整體約 16–18 個月。" }
        ]
      }
    ],
    faqs: [
      { q: "必須見面才可與代理孕母配對嗎？", a: "多數機構以視訊面談為主；是否實體會面視雙方意願與安排。" },
      { q: "代孕契約包含哪些關鍵條款？", a: "醫療決策權、產檢頻率、雙胞胎／減胎條款、產假與補助、保險、突發醫療費分擔、分娩地點、法律親權確立流程等。" },
      { q: "為何同一州費用也可能不同？", a: "孕母經驗、保險方案、醫療史、是否需要多次植入、律師費用差異等都會影響。" },
      { q: "親權如何確立？", a: "依州法透過預先或產後法院命令（pre-/post-birth order）等程序，由律師辦理。" }
    ]
  },
  en: {
    title: "LGBTQ+ Partner Fertility Plans (US)",
    subtitle: "US fertility solutions for diverse families",
    process: [
      "Preparation: Initial consultation & assessment → medical exam & infectious disease screening → legal consultation & route planning → select sperm/egg donor and (if needed) surrogacy agency.",
      "IVF Medical Phase: Sperm/egg retrieval (in US or in Taiwan with compliant freezing & international transport). Fertilization, embryo culture, and PGT A (chromosome screening & grading).",
      "Transfer & Pregnancy: Surrogacy plan: arrange transfer & prenatal care after legal and medical review. Self-carry plan: complete endometrial prep, transfer, prenatal care, and delivery.",
      "Transport Reminder: US FDA & import/export rules mean sperm/egg/embryo transport and documentation typically require ≈4 months; allow flexible timeline."
    ],
    plans: [
      {
        category: "Male Couple | Own Sperm + Egg Donor + Surrogate",
        method: "Male couples can use one or both partners' sperm for IVF at US fertility center; eggs from US egg bank or donor. After PGT A, embryo is transferred to surrogate.",
        options: [
          "Travel to US: sperm collection & embryo creation, complete process in US.",
          "Taiwan sperm collection + international transport: collect & freeze sperm in Taiwan, transport to US IVF center per regulations."
        ],
        timeline: [
          { type: "Travel to US", duration: "12–14 months", description: "Sperm collection stay approx. 3–7 days; total process 12–14 months." },
          { type: "International Transport", duration: "16–18 months", description: "Includes FDA compliance & import/export docs ≈4 months; total process 16–18 months." }
        ],
        faqs: [
          { q: "Is US sperm collection required?", a: "Not required; can collect in Taiwan and freeze/transport to US per regulations." },
          { q: "What tests are needed in Taiwan?", a: "Common: infectious disease screening (HIV, HBV, HCV, syphilis, etc.) and semen analysis; actual requirements per medical center." },
          { q: "How to select egg donor?", a: "Review age, health, genetic screening, appearance, background; choose anonymous/semi/open ID per egg bank policy." },
          { q: "Do we need to meet the surrogate?", a: "Mostly online interviews; in-person meetings depend on both parties and agency." },
          { q: "Baby's citizenship?", a: "Born in US usually gets US citizenship per local law; returning to Taiwan and recognition require legal consultation." }
        ]
      },
      {
        category: "Female Couple | Sperm Donor + Own Egg + Surrogate",
        method: "Female couples retrieve eggs & create embryos via IVF in US (or retrieve in Taiwan and transport per regulations); sperm donor usually selected from US sperm bank; after PGT A, embryo transferred to surrogate.",
        options: [
          "Travel to US: egg retrieval stay approx. 2–3 weeks; other steps per medical advice.",
          "Taiwan egg retrieval + international transport: freeze & document per regulations, then transport to US."
        ],
        timeline: [
          { type: "Travel to US", duration: "12–14 months", description: "Total process 12–14 months." },
          { type: "International Transport", duration: "16–18 months", description: "Due to documentation & regulations, total process 16–18 months." }
        ],
        faqs: [
          { q: "How many US trips?", a: "Depends on plan; usually at least one for egg retrieval, more if not surrogacy/self-carry." },
          { q: "Travel vs. transport difference?", a: "Travel offers more control, faster timeline; transport reduces stay but adds documentation, wait time, and cost." },
          { q: "Why do surrogate costs vary?", a: "Affected by state law, insurance, surrogate experience/medical history, twins/C-section possibility, etc." },
          { q: "Baby's citizenship?", a: "Born in US usually gets US citizenship; returning to Taiwan and recognition require legal advice." }
        ]
      },
      {
        category: "Female Couple | Sperm Donor + Own Egg + Self-Carry",
        method: "IVF in US with sperm donor & own egg, after PGT A transfer to own uterus; couple shares pregnancy & birth experience.",
        options: [
          "Travel to US: egg retrieval & (later) transfer each require 2–3 week stay (can be separate trips).",
          "Taiwan egg retrieval + international transport: after transport & embryo creation, travel to US for transfer."
        ],
        timeline: [
          { type: "Travel to US", duration: "12–14 months", description: "Total process 12–14 months." },
          { type: "International Transport", duration: "16–18 months", description: "Includes documentation & regulations, total process 16–18 months." }
        ]
      }
    ],
    faqs: [
      { q: "Is in-person meeting required for surrogate matching?", a: "Most agencies use video interviews; in-person depends on both parties and arrangements." },
      { q: "What key terms are in surrogacy contracts?", a: "Medical decision rights, prenatal check frequency, twins/reduction clauses, leave/support, insurance, emergency medical cost sharing, delivery location, legal parentage process, etc." },
      { q: "Why do costs vary within the same state?", a: "Surrogate experience, insurance, medical history, multiple transfers, lawyer fees, etc. all affect cost." },
      { q: "How is parentage established?", a: "Per state law via pre-/post-birth court order, handled by lawyer." }
    ]
  }
};

// 單身代孕詳細內容
const SINGLE_SURROGACY_DETAIL = {
  zh: {
    title: "單身生育方案（美國IVF／代孕）",
    subtitle: "為單身人士提供完整的生育解決方案",
    plans: [
      {
        category: "單身男性｜自精與捐卵＋代孕",
        method: {
          title: "方法",
          description: "單身男士可選擇「自精與捐卵＋代孕」生子服務。可選擇親自赴美取精，或在台灣取精後以國際運輸送至美國生殖醫學中心；於美國挑選卵子來源，由生殖中心完成IVF流程，並於線上面試代理孕母。胚胎經過 PGS 檢測篩選胚胎等級後，植入代理孕母子宮生子。"
        },
        phases: [
          {
            phase: "前期準備階段",
            items: [
              "初診評估：病史、感染性疾病檢驗、精液分析。",
              "方案規劃：選定生殖中心、卵子庫、代孕機構與法律顧問。",
              "法務合規：意向諮詢、合約草擬、保險與託管帳戶（escrow）設置。",
              "捐卵媒合：確認捐贈者條件（表型、教育、基因攜帶者報告等）。",
              "若採國際運輸：同步啟動FDA檢驗與進出口文件。"
            ]
          },
          {
            phase: "IVF醫療階段",
            items: [
              "取精：親赴美（約3～7天）或於台取精後冷鏈運輸。",
              "捐卵者刺激與取卵：受精培養至囊胚，第5～6天冷凍保存。",
              "PGS檢測：送檢並出具報告（約2～3週）。",
              "代理孕母醫學篩檢與模擬週期（mock cycle）。"
            ]
          },
          {
            phase: "代孕階段",
            items: [
              "胚胎移植（FET）：完成法務、保險與escrow後安排移植。",
              "懷孕追蹤：β hCG、6～7週胎心、常規產檢。",
              "產前法務：出生前命令（PBO）／親權文件（依州別）。",
              "生產接寶寶：出生證件辦理、返台旅行安排。"
            ]
          }
        ],
        timeline: [
          { type: "親自赴美", duration: "12～14個月", description: "取精停留時間約 3～7天；可先選好卵子來源，完成胚胎與PGS後植入代理孕母。" },
          { type: "國際運輸", duration: "16～18個月", description: "在台取精後以國際運輸送至美國；精子運送約需 4個月 完成FDA規範檢查與進出口文件申請。" }
        ]
      },
      {
        category: "單身女性｜捐精與自卵＋代孕",
        method: {
          title: "方法",
          description: "單身女士可選擇「捐精與自卵＋代孕」。可親自赴美取卵，或在台灣取卵後以國際運輸送至美國；先於美國精子庫選擇捐精來源，由生殖醫學中心完成IVF與PGS，線上面試代理孕母後安排移植。"
        },
        phases: [
          {
            phase: "前期準備階段",
            items: [
              "初診與卵巢儲備評估（AMH、AFC）。",
              "方案規劃：生殖中心、精子庫、代孕機構與法律顧問。",
              "法務合規與保險、託管帳戶設置。",
              "若採國際運輸：同步啟動FDA檢驗與進出口文件。"
            ]
          },
          {
            phase: "IVF醫療階段",
            items: [
              "取卵：親赴美停留約 2～3週 完成刺激與取卵；或在台取卵後運輸。",
              "受精培養：ICSI受精→囊胚冷凍。",
              "PGS檢測：報告約 2～3週 出具。",
              "代理孕母醫學篩檢與模擬週期。"
            ]
          },
          {
            phase: "代孕階段",
            items: [
              "冷凍胚胎移植→懷孕追蹤→產前法務→赴美接寶寶。"
            ]
          }
        ],
        timeline: [
          { type: "親自赴美", duration: "12～14個月", description: "親自赴美取卵停留約 2～3週；同時於精子庫選擇捐精；生殖中心完成胚胎流程並經PGS後植入代理孕母。" },
          { type: "國際運輸", duration: "16～18個月", description: "在台取卵後以國際運輸送至美國；卵子運送約需 4個月 完成FDA規範檢查與進出口文件申請。" }
        ]
      },
      {
        category: "單身女性｜捐精與自卵＋自懷",
        method: {
          title: "方法",
          description: "單身女士可選擇「捐精與自卵＋自懷」。可親自赴美取卵，或在台取卵後以國際運輸送至美國；於精子庫選擇捐精，在美國生殖醫學中心完成IVF。胚胎經 PGS 檢測篩選後，植入自己的子宮生子。"
        },
        phases: [
          {
            phase: "前期準備階段",
            items: [
              "初診與卵巢儲備評估（AMH、AFC），規劃取卵與FET時程。",
              "精子庫挑選與下單、醫療文件與行程安排。",
              "若採國際運輸：同步啟動FDA檢驗與進出口文件。"
            ]
          },
          {
            phase: "IVF醫療階段",
            items: [
              "取卵：親赴美停留約 2～3週 完成刺激與取卵；或在台取卵後運輸。",
              "受精培養與PGS檢測：報告約 2～3週 出具。",
              "胚胎植入（FET）：可採一次長期停留（4～6週）連同取卵＋FET完成，或分兩趟（取卵→回台待PGS→再赴美2～3週完成FET）。",
              "植入後：10～12天驗孕、6～7週胎心確認。"
            ]
          }
        ],
        timeline: [
          { type: "親自赴美", duration: "12～14個月", description: "親自赴美取卵停留約 2～3週；同時於精子庫選擇捐精；生殖中心完成胚胎流程並經PGS後植入自己的子宮。進行胚胎流程期間可先回台，待通知再赴美進行植入（FET約 2～3週）。" },
          { type: "國際運輸", duration: "16～18個月", description: "在台取卵後以國際運輸送至美國；卵子運送約需 4個月 完成FDA規範檢查與進出口文件；胚胎完成後需赴美植入子宮。" }
        ]
      }
    ],
    faqs: [
      {
        question: "單身女性選擇「捐精自卵＋自懷」，需要赴美幾次？親赴與國際運輸差異是什麼？",
        answer: [
          "親赴：通常 2趟（取卵2～3週；FET 2～3週），或一次長期停留（約4～6週）完成兩步。",
          "國際運輸：先在台取卵並啟動約 4個月 的合規運輸流程；胚胎完成後再赴美 1趟 完成FET。",
          "差異：時程（國際運輸較久）、費用（增加運輸與檢驗成本）、便利性（親赴需較長停留）。"
        ]
      },
      {
        question: "一共需要去美國幾趟？",
        answer: [
          "單身男性代孕：親赴取精 1趟 ＋接寶寶 1趟；若走國際運輸，多數只需接寶寶 1趟。",
          "單身女性代孕：親赴取卵 1趟 ＋接寶寶 1趟；若走國際運輸，多數只需接寶寶 1趟。",
          "單身女性自懷：親赴多為 2趟（取卵與FET），國際運輸多為 1趟（FET）。"
        ]
      },
      {
        question: "為什麼不選擇在台灣完成試管或代孕？",
        answer: [
          "單身與第三方生殖（捐精／捐卵／代孕）在不同地區有法規限制與流程差異；赴美可獲得較完整的醫療、法務與保險配套。實務請依當地現行法規並與專業律師、醫療團隊確認。"
        ]
      }
    ]
  },
  en: {
    title: "Single Parent Fertility Plans (US IVF/Surrogacy)",
    subtitle: "Complete fertility solutions for single individuals",
    plans: [
      {
        category: "Single Male | Own Sperm + Egg Donor + Surrogate",
        method: {
          title: "Method",
          description: "Single men can choose 'Own Sperm + Egg Donor + Surrogate' services. Options include traveling to the US for sperm collection or collecting in Taiwan with international transport to US fertility center; select egg donor in US, complete IVF process, and conduct online surrogate interviews. After PGS screening, embryo is transferred to surrogate."
        },
        phases: [
          {
            phase: "Preparation Phase",
            items: [
              "Initial assessment: medical history, infectious disease screening, semen analysis.",
              "Plan design: select fertility center, egg bank, surrogacy agency, and legal counsel.",
              "Legal compliance: consultation, contract drafting, insurance and escrow account setup.",
              "Egg donor matching: confirm donor criteria (phenotype, education, genetic carrier reports, etc.).",
              "If international transport: initiate FDA testing and import/export documentation."
            ]
          },
          {
            phase: "IVF Medical Phase",
            items: [
              "Sperm collection: travel to US (3-7 days) or collect in Taiwan with cold chain transport.",
              "Egg donor stimulation & retrieval: fertilization to blastocyst, cryopreservation days 5-6.",
              "PGS testing: submit and receive report (approx. 2-3 weeks).",
              "Surrogate medical screening and mock cycle."
            ]
          },
          {
            phase: "Surrogacy Phase",
            items: [
              "Embryo transfer (FET): arrange transfer after legal, insurance, and escrow completion.",
              "Pregnancy monitoring: β hCG, 6-7 week heartbeat, routine prenatal care.",
              "Pre-birth legal: Pre-Birth Order (PBO) / parental rights documents (state-dependent).",
              "Birth & baby pickup: birth certificate processing, return travel arrangements."
            ]
          }
        ],
        timeline: [
          { type: "Travel to US", duration: "12-14 months", description: "Sperm collection stay approx. 3-7 days; pre-select egg donor, complete embryo & PGS then transfer to surrogate." },
          { type: "International Transport", duration: "16-18 months", description: "Collect sperm in Taiwan with international transport to US; sperm transport requires approx. 4 months for FDA compliance and import/export documentation." }
        ]
      },
      {
        category: "Single Female | Sperm Donor + Own Egg + Surrogate",
        method: {
          title: "Method",
          description: "Single women can choose 'Sperm Donor + Own Egg + Surrogate'. Options include traveling to US for egg retrieval or retrieving in Taiwan with international transport; select sperm donor from US sperm bank, complete IVF & PGS at fertility center, conduct online surrogate interview then arrange transfer."
        },
        phases: [
          {
            phase: "Preparation Phase",
            items: [
              "Initial consultation & ovarian reserve assessment (AMH, AFC).",
              "Plan design: fertility center, sperm bank, surrogacy agency, and legal counsel.",
              "Legal compliance, insurance, and escrow account setup.",
              "If international transport: initiate FDA testing and import/export documentation."
            ]
          },
          {
            phase: "IVF Medical Phase",
            items: [
              "Egg retrieval: travel to US for approx. 2-3 weeks for stimulation & retrieval; or retrieve in Taiwan then transport.",
              "Fertilization & culture: ICSI fertilization → blastocyst cryopreservation.",
              "PGS testing: report issued in approx. 2-3 weeks.",
              "Surrogate medical screening and mock cycle."
            ]
          },
          {
            phase: "Surrogacy Phase",
            items: [
              "Frozen embryo transfer → pregnancy monitoring → pre-birth legal → travel to US for baby pickup."
            ]
          }
        ],
        timeline: [
          { type: "Travel to US", duration: "12-14 months", description: "Travel to US for egg retrieval approx. 2-3 weeks; select sperm donor simultaneously; fertility center completes embryo process & PGS then transfers to surrogate." },
          { type: "International Transport", duration: "16-18 months", description: "Retrieve eggs in Taiwan with international transport to US; egg transport requires approx. 4 months for FDA compliance and import/export documentation." }
        ]
      },
      {
        category: "Single Female | Sperm Donor + Own Egg + Self-Carry",
        method: {
          title: "Method",
          description: "Single women can choose 'Sperm Donor + Own Egg + Self-Carry'. Options include traveling to US for egg retrieval or retrieving in Taiwan with international transport; select sperm donor from sperm bank, complete IVF at US fertility center. After PGS screening, embryo is transferred to own uterus."
        },
        phases: [
          {
            phase: "Preparation Phase",
            items: [
              "Initial consultation & ovarian reserve assessment (AMH, AFC), plan egg retrieval & FET timeline.",
              "Sperm bank selection & order, medical documentation & travel arrangements.",
              "If international transport: initiate FDA testing and import/export documentation."
            ]
          },
          {
            phase: "IVF Medical Phase",
            items: [
              "Egg retrieval: travel to US for approx. 2-3 weeks for stimulation & retrieval; or retrieve in Taiwan then transport.",
              "Fertilization, culture & PGS testing: report issued in approx. 2-3 weeks.",
              "Embryo transfer (FET): option for one extended stay (4-6 weeks) for retrieval + FET, or two trips (retrieval → return to Taiwan for PGS → return to US for 2-3 weeks for FET).",
              "Post-transfer: pregnancy test 10-12 days, heartbeat confirmation 6-7 weeks."
            ]
          }
        ],
        timeline: [
          { type: "Travel to US", duration: "12-14 months", description: "Travel to US for egg retrieval approx. 2-3 weeks; select sperm donor simultaneously; fertility center completes embryo process & PGS then transfers to own uterus. Can return to Taiwan during embryo process, then return to US for transfer (FET approx. 2-3 weeks)." },
          { type: "International Transport", duration: "16-18 months", description: "Retrieve eggs in Taiwan with international transport to US; egg transport requires approx. 4 months for FDA compliance and documentation; must travel to US for embryo transfer after completion." }
        ]
      }
    ],
    faqs: [
      {
        question: "For single women choosing 'Sperm Donor + Own Egg + Self-Carry', how many US trips are needed? What's the difference between traveling vs. international transport?",
        answer: [
          "Travel to US: Usually 2 trips (egg retrieval 2-3 weeks; FET 2-3 weeks), or one extended stay (approx. 4-6 weeks) for both steps.",
          "International transport: Retrieve eggs in Taiwan and initiate approx. 4-month compliance transport process; travel to US 1 trip for FET after embryo completion.",
          "Differences: Timeline (international transport takes longer), cost (additional transport & testing costs), convenience (travel requires longer stays)."
        ]
      },
      {
        question: "How many US trips are required in total?",
        answer: [
          "Single male surrogacy: Travel for sperm collection 1 trip + baby pickup 1 trip; with international transport, mostly only baby pickup 1 trip needed.",
          "Single female surrogacy: Travel for egg retrieval 1 trip + baby pickup 1 trip; with international transport, mostly only baby pickup 1 trip needed.",
          "Single female self-carry: Travel mostly 2 trips (egg retrieval & FET), international transport mostly 1 trip (FET)."
        ]
      },
      {
        question: "Why not complete IVF or surrogacy in Taiwan?",
        answer: [
          "Single individuals and third-party reproduction (sperm/egg donation/surrogacy) have regulatory restrictions and process variations in different regions; going to the US provides more comprehensive medical, legal, and insurance support. Please verify current local regulations with professional attorneys and medical teams."
        ]
      }
    ]
  }
};

// Detailed Surrogacy Process Timeline
const DETAILED_PROCESS = [
  {
    phase: "準備階段",
    phaseEn: "Preparation Phase",
    duration: "1-2個月",
    durationEn: "1-2 months",
    steps: [
      {
        title: "初步評估",
        titleEn: "Initial Assessment",
        description: "醫療史審查、生育能力評估、心理準備度評估",
        descriptionEn: "Medical history review, fertility assessment, psychological readiness evaluation",
        timeline: "第1-2週",
        timelineEn: "Week 1-2"
      },
      {
        title: "州別選擇",
        titleEn: "State Selection",
        description: "分析各州代孕法律、費用差異、流程複雜度",
        descriptionEn: "Analyze state surrogacy laws, cost differences, process complexity",
        timeline: "第2-3週",
        timelineEn: "Week 2-3"
      },
      {
        title: "資料準備",
        titleEn: "Documentation Prep",
        description: "準備醫療記錄、財務證明、身份文件",
        descriptionEn: "Prepare medical records, financial proof, identity documents",
        timeline: "第3-4週",
        timelineEn: "Week 3-4"
      }
    ]
  },
  {
    phase: "配對階段",
    phaseEn: "Matching Phase",
    duration: "2-4個月",
    durationEn: "2-4 months",
    steps: [
      {
        title: "代孕母篩選",
        titleEn: "Surrogate Screening",
        description: "健康檢查、心理評估、背景調查、生活習慣評估",
        descriptionEn: "Health screening, psychological evaluation, background check, lifestyle assessment",
        timeline: "第1-6週",
        timelineEn: "Week 1-6"
      },
      {
        title: "配對會面",
        titleEn: "Match Meeting",
        description: "視訊或實體會面、雙方期望討論、建立信任關係",
        descriptionEn: "Video or in-person meeting, expectation discussion, trust building",
        timeline: "第6-8週",
        timelineEn: "Week 6-8"
      },
      {
        title: "確認配對",
        titleEn: "Match Confirmation",
        description: "雙方同意配對、簽署初步意向書",
        descriptionEn: "Mutual agreement, preliminary intent letter signing",
        timeline: "第8-10週",
        timelineEn: "Week 8-10"
      }
    ]
  },
  {
    phase: "法律程序階段",
    phaseEn: "Legal Process Phase",
    duration: "1-2個月",
    durationEn: "1-2 months",
    steps: [
      {
        title: "合約起草",
        titleEn: "Contract Drafting",
        description: "代孕合約、補償協議、醫療決策權、緊急情況處理",
        descriptionEn: "Surrogacy contract, compensation agreement, medical decision rights, emergency protocols",
        timeline: "第1-3週",
        timelineEn: "Week 1-3"
      },
      {
        title: "法律審查",
        titleEn: "Legal Review",
        description: "雙方律師審查、條款協商、修訂確認",
        descriptionEn: "Attorney review by both parties, term negotiation, revision confirmation",
        timeline: "第3-5週",
        timelineEn: "Week 3-5"
      },
      {
        title: "正式簽約",
        titleEn: "Contract Execution",
        description: "最終合約簽署、公證、保險安排",
        descriptionEn: "Final contract signing, notarization, insurance arrangements",
        timeline: "第5-6週",
        timelineEn: "Week 5-6"
      }
    ]
  },
  {
    phase: "醫療程序階段",
    phaseEn: "Medical Process Phase", 
    duration: "9-10個月",
    durationEn: "9-10 months",
    steps: [
      {
        title: "胚胎移植準備",
        titleEn: "Embryo Transfer Prep",
        description: "代孕母身體調理、激素治療、子宮內膜準備",
        descriptionEn: "Surrogate body preparation, hormone therapy, endometrial preparation",
        timeline: "第1-4週",
        timelineEn: "Week 1-4"
      },
      {
        title: "胚胎移植",
        titleEn: "Embryo Transfer",
        description: "IVF診所進行胚胎移植手術、確認著床",
        descriptionEn: "IVF clinic embryo transfer procedure, implantation confirmation",
        timeline: "第4-6週",
        timelineEn: "Week 4-6"
      },
      {
        title: "懷孕監護",
        titleEn: "Pregnancy Monitoring",
        description: "定期產檢、健康監測、與委託父母溝通",
        descriptionEn: "Regular prenatal care, health monitoring, communication with intended parents",
        timeline: "第6-36週",
        timelineEn: "Week 6-36"
      },
      {
        title: "分娩準備",
        titleEn: "Delivery Preparation",
        description: "分娩計劃、醫院安排、法律文件準備",
        descriptionEn: "Birth plan, hospital arrangements, legal document preparation",
        timeline: "第36-40週",
        timelineEn: "Week 36-40"
      }
    ]
  },
  {
    phase: "完成階段",
    phaseEn: "Completion Phase",
    duration: "1-2個月",
    durationEn: "1-2 months",
    steps: [
      {
        title: "新生兒出生",
        titleEn: "Baby Birth",
        description: "分娩過程支援、醫療照護、初步健康檢查",
        descriptionEn: "Birth process support, medical care, initial health screening",
        timeline: "第1週",
        timelineEn: "Week 1"
      },
      {
        title: "法律移交",
        titleEn: "Legal Transfer",
        description: "父母權確立、出生證明申請、法院程序",
        descriptionEn: "Parental rights establishment, birth certificate application, court procedures",
        timeline: "第1-4週",
        timelineEn: "Week 1-4"
      },
      {
        title: "後續支援",
        titleEn: "Post-Birth Support",
        description: "代孕母產後照護、關係維護、經驗分享",
        descriptionEn: "Surrogate postpartum care, relationship maintenance, experience sharing",
        timeline: "第4-8週",
        timelineEn: "Week 4-8"
      }
    ]
  }
];

// Legal Information by State
const LEGAL_INFO = {
  friendly: {
    title: "代孕友善州",
    titleEn: "Surrogacy-Friendly States",
    states: ["加州", "伊利諾州", "康州", "德拉瓦州", "緬因州", "新罕布夏州", "羅德島州", "華盛頓州"],
    statesEn: ["California", "Illinois", "Connecticut", "Delaware", "Maine", "New Hampshire", "Rhode Island", "Washington"],
    characteristics: [
      "法律明確支持代孕",
      "程序相對簡單",
      "委託父母權利保障完善",
      "無需額外法院程序"
    ],
    characteristicsEn: [
      "Clear legal support for surrogacy",
      "Relatively simple procedures", 
      "Strong protection for intended parents' rights",
      "No additional court procedures required"
    ]
  }
};

// California Specific Legal Information
const CALIFORNIA_LEGAL_DETAILS = {
  overview: {
    title: "加州代孕法律概覽",
    titleEn: "California Surrogacy Legal Overview",
    description: "加州是全美最友善的代孕州，擁有最完善的法律框架和保護機制",
    descriptionEn: "California is the most surrogacy-friendly state in the US with the most comprehensive legal framework and protection mechanisms"
  },
  keyLaws: [
    {
      law: "California Family Code Section 7960-7962",
      title: "代孕協議法",
      titleEn: "Surrogacy Agreement Act",
      description: "明確規定代孕協議的有效性和執行標準",
      descriptionEn: "Clearly defines the validity and enforcement standards of surrogacy agreements"
    },
    {
      law: "Assembly Bill 2273 (2012)",
      title: "代孕父母權法",
      titleEn: "Surrogacy Parental Rights Act", 
      description: "簡化委託父母的親權確立程序",
      descriptionEn: "Streamlines parental rights establishment procedures for intended parents"
    },
    {
      law: "California Civil Code Section 56.10",
      title: "醫療資訊保護法",
      titleEn: "Medical Information Protection Act",
      description: "保護代孕過程中的醫療隱私",
      descriptionEn: "Protects medical privacy during the surrogacy process"
    }
  ],
  advantages: [
    {
      title: "Pre-Birth Orders (PBO)",
      titleEn: "Pre-Birth Orders",
      description: "可在嬰兒出生前即確立法律親權，避免出生後的法律複雜性",
      descriptionEn: "Legal parental rights can be established before birth, avoiding post-birth legal complexities"
    },
    {
      title: "無居住要求",
      titleEn: "No Residency Requirements", 
      description: "委託父母無需是加州居民即可進行代孕",
      descriptionEn: "Intended parents do not need to be California residents to pursue surrogacy"
    },
    {
      title: "同性伴侶友善",
      titleEn: "LGBTQ+ Friendly",
      description: "完全支持同性伴侶和單身人士的代孕需求",
      descriptionEn: "Fully supports surrogacy needs of same-sex couples and single individuals"
    },
    {
      title: "商業代孕合法",
      titleEn: "Commercial Surrogacy Legal",
      description: "明確允許有償代孕，合約受法律保護",
      descriptionEn: "Clearly permits compensated surrogacy with legal contract protection"
    }
  ],
  procedures: [
    {
      step: "合約起草階段",
      stepEn: "Contract Drafting Phase",
      details: [
        "雙方律師獨立代表",
        "詳細補償條款規劃",
        "醫療決策權明確分配",
        "緊急情況處理預案"
      ],
      detailsEn: [
        "Independent legal representation for both parties",
        "Detailed compensation clause planning", 
        "Clear allocation of medical decision rights",
        "Emergency situation handling protocols"
      ]
    },
    {
      step: "法院程序階段",
      stepEn: "Court Procedures Phase", 
      details: [
        "Pre-Birth Order 申請",
        "親權確立聽證會",
        "法院令核准程序",
        "出生證明預備文件"
      ],
      detailsEn: [
        "Pre-Birth Order application",
        "Parental rights establishment hearing",
        "Court order approval process",
        "Birth certificate preparation documents"
      ]
    },
    {
      step: "醫院分娩階段",
      stepEn: "Hospital Delivery Phase",
      details: [
        "醫院法律文件提交",
        "委託父母姓名登記",
        "即時親權移交",
        "出生證明直接簽發"
      ],
      detailsEn: [
        "Hospital legal document submission",
        "Intended parents name registration",
        "Immediate parental rights transfer",
        "Direct birth certificate issuance"
      ]
    }
  ]
};

// HRC Fertility Detailed Information
const HRC_FERTILITY_INFO = {
  overview: {
    title: "HRC Fertility 生育中心",
    titleEn: "HRC Fertility Center",
    established: "1988",
    description: "南加州最權威的生殖醫學中心，30多年專業經驗",
    descriptionEn: "Southern California's most authoritative reproductive medicine center with over 30 years of professional experience"
  },
  locations: [
    {
      name: "HRC Pasadena 帕薩迪納中心",
      nameEn: "HRC Pasadena Center",
      address: "55 S. Lake Ave, 9th Floor, Pasadena, CA 91101",
      phone: "+1 (626) 440-9161",
      features: [
        "最新IVF實驗室設備",
        "24/7醫療支援",
        "多語言服務團隊",
        "代孕專業協調"
      ],
      featuresEn: [
        "State-of-the-art IVF laboratory equipment",
        "24/7 medical support",
        "Multilingual service team", 
        "Professional surrogacy coordination"
      ]
    },
    {
      name: "HRC West LA 西洛杉磯中心",
      nameEn: "HRC West LA Center", 
      address: "1430 2nd Street, Suite 102, Santa Monica, CA 90401",
      phone: "+1 (310) 566-1470",
      features: [
        "胚胎學專業實驗室",
        "遺傳學諮詢服務",
        "心理支援團隊",
        "國際患者服務"
      ],
      featuresEn: [
        "Professional embryology laboratory",
        "Genetic counseling services",
        "Psychological support team",
        "International patient services"
      ]
    }
  ],
  specialties: [
    {
      area: "第三方生殖醫學",
      areaEn: "Third-Party Reproductive Medicine",
      services: [
        "代孕醫療協調",
        "胚胎移植程序",
        "代孕母健康監測",
        "多胎妊娠管理"
      ],
      servicesEn: [
        "Surrogacy medical coordination",
        "Embryo transfer procedures", 
        "Surrogate health monitoring",
        "Multiple pregnancy management"
      ]
    },
    {
      area: "生殖內分泌學",
      areaEn: "Reproductive Endocrinology",
      services: [
        "激素週期調節",
        "卵巢刺激方案",
        "子宮內膜準備",
        "黃體期支持"
      ],
      servicesEn: [
        "Hormonal cycle regulation",
        "Ovarian stimulation protocols",
        "Endometrial preparation",
        "Luteal phase support"
      ]
    },
    {
      area: "胚胎學與遺傳學",
      areaEn: "Embryology & Genetics",
      services: [
        "胚胎培養技術",
        "胚胎基因篩檢",
        "胚胎冷凍保存",
        "植入前診斷"
      ],
      servicesEn: [
        "Embryo culture techniques",
        "Embryo genetic screening",
        "Embryo cryopreservation",
        "Preimplantation diagnosis"
      ]
    }
  ],
  statistics: {
    title: "HRC 成功率統計",
    titleEn: "HRC Success Rate Statistics",
    data: [
      {
        metric: "代孕成功率",
        metricEn: "Surrogacy Success Rate",
        value: "85%+",
        description: "單次胚胎移植成功率",
        descriptionEn: "Single embryo transfer success rate"
      },
      {
        metric: "客戶滿意度",
        metricEn: "Patient Satisfaction",
        value: "96%+",
        description: "整體服務滿意度評分",
        descriptionEn: "Overall service satisfaction rating"
      }
    ]
  },
  partnerships: {
    title: "合作機構",
    titleEn: "Partner Organizations", 
    institutions: [
      "南加州大學凱克醫學院",
      "加州大學洛杉磯分校醫學中心",
      "Cedars-Sinai醫學中心",
      "洛杉磯兒童醫院"
    ],
    institutionsEn: [
      "USC Keck School of Medicine",
      "UCLA Medical Center",
      "Cedars-Sinai Medical Center",
      "Children's Hospital Los Angeles"
    ]
  }
};

// Key Legal Considerations
const LEGAL_CONSIDERATIONS = [
  {
    category: "風險管理",
    categoryEn: "Risk Management",
    items: [
      {
        title: "法律風險",
        titleEn: "Legal Risks",
        description: "州法變化、合約爭議、親權挑戰",
        descriptionEn: "State law changes, contract disputes, parental rights challenges"
      },
      {
        title: "醫療風險",
        titleEn: "Medical Risks",
        description: "懷孕併發症、保險覆蓋、醫療費用",
        descriptionEn: "Pregnancy complications, insurance coverage, medical expenses"
      },
      {
        title: "關係風險",
        titleEn: "Relationship Risks",
        description: "溝通問題、期望差異、情感糾紛",
        descriptionEn: "Communication issues, expectation differences, emotional disputes"
      }
    ]
  }
];

// HRC Knowledge Articles
const HRC_KNOWLEDGE_ARTICLES = [
  {
    id: "ivf-success-rates",
    title: "IVF 成功率：年齡與胚胎品質的關鍵影響",
    titleEn: "IVF Success Rates: Key Impact of Age and Embryo Quality",
    category: "醫療知識",
    categoryEn: "Medical Knowledge",
    author: "Dr. Marisa Gigg",
    date: "2024-09-15",

    summary: "深入分析年齡對IVF成功率的影響，以及如何透過胚胎基因篩檢提高懷孕機率。",
    summaryEn: "In-depth analysis of age's impact on IVF success rates and how to improve pregnancy chances through embryo genetic screening.",
    content: "隨著女性年齡增長，卵子品質下降是影響IVF成功率的主要因素。透過PGT-A基因篩檢，我們能夠選擇最健康的胚胎進行移植，顯著提高成功率。HRC提供專業的年齡相關生育諮詢服務...",
    contentEn: "As women age, declining egg quality is the main factor affecting IVF success rates. Through PGT-A genetic screening, we can select the healthiest embryos for transfer, significantly improving success rates. HRC provides professional age-related fertility counseling services...",
    tags: ["IVF", "成功率", "年齡", "胚胎篩檢"]
    , video: null
  },
  {
    id: "surrogacy-legal-guide",
    title: "代孕法律指南：加州法律優勢全解析",
    titleEn: "Surrogacy Legal Guide: Complete Analysis of California Law Advantages",
    category: "法律資訊",
    categoryEn: "Legal Information",
    author: "HRC Legal Team",
    date: "2024-08-22",

    summary: "詳細解說加州代孕法律的優勢，包括Pre-Birth Order程序和國際客戶的權益保障。",
    summaryEn: "Detailed explanation of California surrogacy law advantages, including Pre-Birth Order procedures and rights protection for international clients.",
    content: "加州作為全美最友善的代孕州，提供了完整的法律保護框架。Pre-Birth Order制度讓委託父母在嬰兒出生前就確立法律親權，避免了其他州可能面臨的法律風險...",
    contentEn: "California, as the most surrogacy-friendly state in the US, provides a comprehensive legal protection framework. The Pre-Birth Order system allows intended parents to establish legal parentage before birth, avoiding legal risks that may be faced in other states...",
    tags: ["代孕法律", "加州", "Pre-Birth Order", "國際客戶"]
    , video: null
  },
  {
    id: "frozen-embryo-transfer",
    title: "冷凍胚胎移植：提高代孕成功率的關鍵技術",
    titleEn: "Frozen Embryo Transfer: Key Technology for Improving Surrogacy Success",
    category: "醫療技術",
    categoryEn: "Medical Technology",
    author: "Dr. Chelsey Harris",
    date: "2024-07-10",

    summary: "探討冷凍胚胎移植在代孕中的應用，以及如何優化移植時機和成功率。",
    summaryEn: "Exploring the application of frozen embryo transfer in surrogacy and how to optimize transfer timing and success rates.",
    content: "冷凍胚胎移植(FET)已成為現代代孕的標準程序。相比新鮮胚胎移植，FET允許更好的週期同步和子宮內膜準備。HRC的FET成功率達到85%以上...",
    contentEn: "Frozen embryo transfer (FET) has become the standard procedure in modern surrogacy. Compared to fresh embryo transfer, FET allows better cycle synchronization and endometrial preparation. HRC's FET success rate exceeds 85%...",
    tags: ["冷凍胚胎", "胚胎移植", "代孕技術", "成功率"]
    , video: null
  },
  {
    id: "psychological-support",
    title: "代孕心理支援：建立健康的三方關係",
    titleEn: "Surrogacy Psychological Support: Building Healthy Triadic Relationships",
    category: "心理健康",
    categoryEn: "Mental Health",
    author: "HRC Psychology Team",
    date: "2024-06-18",

    summary: "分析代孕過程中的心理挑戰，提供委託父母和代孕母親的心理支援策略。",
    summaryEn: "Analyzing psychological challenges in the surrogacy process and providing psychological support strategies for intended parents and surrogates.",
    content: "代孕不僅是醫療程序，更涉及複雜的情感和心理層面。建立委託父母、代孕母親和醫療團隊之間的信任關係至關重要。我們的心理支援包括...",
    contentEn: "Surrogacy is not just a medical procedure but involves complex emotional and psychological aspects. Building trust among intended parents, surrogates, and medical teams is crucial. Our psychological support includes...",
    tags: ["心理支援", "三方關係", "情感管理", "信任建立"]
    , video: null
  }
];

// HRC Surrogacy Success Cases
const HRC_SUCCESS_CASES = [
  {
    id: "case-001",
    title: "跨國夫妻的加州代孕圓夢之旅",
    titleEn: "International Couple's California Surrogacy Dream Journey",
    clientProfile: "台灣夫妻，女方42歲，男方45歲",
    clientProfileEn: "Taiwanese couple, female 42, male 45",
    challenge: "多次IVF失敗，子宮內膜異位症",
    challengeEn: "Multiple IVF failures, endometriosis",
    solution: "HRC Pasadena代孕程序，PGT-A篩檢",
    solutionEn: "HRC Pasadena surrogacy program with PGT-A screening",
    duration: "14個月",
    durationEn: "14 months",
    outcome: "成功誕生健康男嬰",
    outcomeEn: "Successfully delivered healthy baby boy",
    testimonial: "感謝HRC團隊的專業支援，讓我們在美國順利迎接寶寶。代孕母親Sarah非常友善，整個過程都很順利。",
    testimonialEn: "Thanks to HRC team's professional support, we successfully welcomed our baby in the US. Surrogate Sarah was very friendly, and the entire process went smoothly.",
    tags: ["國際客戶", "PGT-A", "內膜異位症", "HRC Pasadena"]
    , video: null
  },
  {
    id: "case-002",
    title: "侏儒夫妻獲得健康寶寶",
    titleEn: "Dwarf Couple Welcomes Healthy Baby",
    clientProfile: "侏儒夫妻",
    clientProfileEn: "Dwarf couple",
    challenge: "遺傳風險高，孕期管理困難",
    challengeEn: "High genetic risk, difficult pregnancy management",
    solution: "HRC專業團隊全程監控，基因篩檢，個案管理",
    solutionEn: "HRC expert team, genetic screening, case management",
    duration: "13個月",
    durationEn: "13 months",
    outcome: "健康寶寶誕生",
    outcomeEn: "Healthy baby born",
    testimonial: "感謝HRC讓我們安心迎接新生命。",
    testimonialEn: "Thanks to HRC for helping us welcome new life with peace of mind.",
    tags: ["侏儒夫妻", "基因篩檢", "健康寶寶"],
    video: "/videos/Case.mp4"
  },
  {
    id: "case-ivf-record",
    title: "取卵20顆 受精12顆 過篩4顆 試管全記錄",
    titleEn: "IVF Full Record: 20 Eggs, 12 Fertilized, 4 Passed Screening",
    clientProfile: "台灣女性，IVF全程記錄",
    clientProfileEn: "Taiwanese woman, full IVF record",
    challenge: "卵子品質不均，胚胎篩檢嚴格",
    challengeEn: "Variable egg quality, strict embryo screening",
    solution: "精準醫療，PGT-A基因篩檢，個案追蹤",
    solutionEn: "Precision medicine, PGT-A screening, case tracking",
    duration: "10個月",
    durationEn: "10 months",
    outcome: "成功植入健康胚胎",
    outcomeEn: "Healthy embryo successfully implanted",
    testimonial: "HRC團隊讓我安心完成試管療程。",
    testimonialEn: "HRC team made my IVF journey worry-free.",
    tags: ["IVF", "PGT-A", "全程記錄"],
    video: "/videos/Case2.mp4"
  },
  {
    id: "case-hrc-success",
    title: "HRC成功受孕",
    titleEn: "HRC Successful Pregnancy",
    clientProfile: "美國夫妻，HRC受孕成功",
    clientProfileEn: "US couple, HRC successful pregnancy",
    challenge: "多次失敗後成功受孕",
    challengeEn: "Successful pregnancy after multiple failures",
    solution: "HRC專業醫療團隊，個人化療程設計",
    solutionEn: "HRC expert medical team, personalized treatment plan",
    duration: "12個月",
    durationEn: "12 months",
    outcome: "健康懷孕，順利分娩",
    outcomeEn: "Healthy pregnancy, smooth delivery",
    testimonial: "感謝HRC醫師的耐心與專業。",
    testimonialEn: "Grateful for HRC doctors' patience and expertise.",
    tags: ["HRC", "成功受孕", "美國夫妻"],
    video: "/videos/Case3.mp4"
  },
  {
    id: "case-003",
    title: "癌症倖存者的生育希望",
    titleEn: "Cancer Survivor's Fertility Hope",
    clientProfile: "香港女性，35歲癌症康復者",
    clientProfileEn: "Hong Kong female, 35-year-old cancer survivor",
    challenge: "化療後無法懷孕，冷凍胚胎保存",
    challengeEn: "Unable to conceive after chemotherapy, frozen embryo preservation",
    solution: "冷凍胚胎移植代孕程序",
    solutionEn: "Frozen embryo transfer surrogacy procedure",
    duration: "10個月",
    durationEn: "10 months",
    outcome: "女嬰順利出生，母女平安",
    outcomeEn: "Baby girl born successfully, mother and baby healthy",
    testimonial: "癌症治療奪走了我自然懷孕的能力，但HRC給了我做母親的機會。非常感激整個團隊。",
    testimonialEn: "Cancer treatment took away my ability to conceive naturally, but HRC gave me the chance to become a mother. Very grateful to the entire team.",
    tags: ["癌症康復者", "冷凍胚胎", "生育保存", "希望重生"]
    , video: null
  },
  {
    id: "case-004",
    title: "高齡夫妻的最後希望",
    titleEn: "Older Couple's Last Hope",
    clientProfile: "新加坡夫妻，女方46歲，男方50歲",
    clientProfileEn: "Singaporean couple, female 46, male 50",
    challenge: "高齡，多次流產史，時間緊迫",
    challengeEn: "Advanced age, multiple miscarriage history, time pressure",
    solution: "快速配對，密集醫療監護",
    solutionEn: "Rapid matching, intensive medical monitoring",
    duration: "12個月",
    durationEn: "12 months",
    outcome: "健康男嬰，家庭圓滿",
    outcomeEn: "Healthy baby boy, complete family",
    testimonial: "我們以為已經太晚了，但HRC證明年齡不是絕對障礙。專業的醫療團隊讓一切成為可能。",
    testimonialEn: "We thought it was too late, but HRC proved age isn't an absolute barrier. The professional medical team made everything possible.",
    tags: ["高齡夫妻", "流產史", "快速配對", "醫療監護"]
    , video: null
  },
  {
    id: "case-005",
    title: "單身女性的母親夢",
    titleEn: "Single Woman's Motherhood Dream",
    clientProfile: "美國單身女性，38歲企業高管",
    clientProfileEn: "US single female, 38-year-old corporate executive",
    challenge: "單身狀態，工作繁忙，卵子品質擔憂",
    challengeEn: "Single status, busy career, egg quality concerns",
    solution: "自體卵子+代孕，彈性時程安排",
    solutionEn: "Own eggs + surrogacy, flexible schedule arrangement",
    duration: "15個月",
    durationEn: "15 months",
    outcome: "可愛女嬰誕生，事業家庭兼顧",
    outcomeEn: "Adorable baby girl born, balancing career and family",
    testimonial: "作為職業女性，代孕讓我能夠在不影響事業的情況下成為母親。HRC的安排非常貼心。",
    testimonialEn: "As a career woman, surrogacy allowed me to become a mother without affecting my career. HRC's arrangements were very thoughtful.",
    tags: ["單身女性", "職業女性", "工作平衡", "自體卵子"]
    , video: null
  },
  {
    id: "case-006",
    title: "遺傳疾病家族的健康寶寶",
    titleEn: "Healthy Baby for Family with Genetic Disease",
    clientProfile: "加拿大夫妻，有遺傳疾病家族史",
    clientProfileEn: "Canadian couple with family history of genetic disease",
    challenge: "地中海貧血基因攜帶者，需要基因檢測",
    challengeEn: "Thalassemia gene carriers, genetic testing required",
    solution: "PGT-M基因診斷+代孕",
    solutionEn: "PGT-M genetic diagnosis + surrogacy",
    duration: "18個月",
    durationEn: "18 months",
    outcome: "基因健康男嬰，斷絕遺傳鏈",
    outcomeEn: "Genetically healthy baby boy, breaking hereditary chain",
    testimonial: "PGT-M技術讓我們能夠確保寶寶不會遺傳疾病基因。科技改變了我們的人生。",
    testimonialEn: "PGT-M technology ensured our baby wouldn't inherit disease genes. Technology changed our lives.",
    tags: ["遺傳疾病", "PGT-M", "基因檢測", "健康寶寶"]
    , video: null
  },
  {
    id: "case-007",
    title: "二胎家庭的完美結局",
    titleEn: "Perfect Ending for Second Child Family",
    clientProfile: "澳洲夫妻，已有一子，求女心切",
    clientProfileEn: "Australian couple with one son, eager for daughter",
    challenge: "二胎困難，希望生女兒",
    challengeEn: "Second child difficulties, hoping for daughter",
    solution: "性別選擇+美國代孕服務",
    solutionEn: "Gender selection + surrogacy services",
    duration: "13個月",
    durationEn: "13 months",
    outcome: "如願以償迎來女兒，家庭完整",
    outcomeEn: "Welcomed daughter as wished, complete family",
    testimonial: "能夠選擇寶寶性別讓我們如願組成完美家庭。感謝HRC讓我們夢想成真。",
    testimonialEn: "Being able to choose baby's gender allowed us to create our perfect family. Thanks to HRC for making our dreams come true.",
    tags: ["二胎家庭", "性別選擇", "家庭完整", "夢想成真"]
    , video: null
  },
  {
    id: "case-008",
    title: "多次失敗後的奇蹟",
    titleEn: "Miracle After Multiple Failures",
    clientProfile: "日本夫妻，經歷5次IVF失敗",
    clientProfileEn: "Japanese couple after 5 IVF failures",
    challenge: "多次失敗，情感創傷，信心缺失",
    challengeEn: "Multiple failures, emotional trauma, loss of confidence",
    solution: "心理輔導+全新治療方案",
    solutionEn: "Psychological counseling + new treatment protocol",
    duration: "20個月",
    durationEn: "20 months",
    outcome: "雙胞胎男嬰健康出生",
    outcomeEn: "Twin baby boys born healthy",
    testimonial: "經歷那麼多失敗，我們幾乎放棄了。HRC的團隊重新燃起了我們的希望。",
    testimonialEn: "After so many failures, we almost gave up. HRC's team rekindled our hope.",
    tags: ["多次失敗", "心理輔導", "重燃希望", "雙胞胎"]
    , video: null
  },
  {
    id: "case-009",
    title: "醫護人員的特殊安排",
    titleEn: "Special Arrangement for Healthcare Workers",
    clientProfile: "美國醫師夫妻，工作繁忙",
    clientProfileEn: "US physician couple, busy with work",
    challenge: "醫療工作時間不規律，難以配合治療",
    challengeEn: "Irregular medical work hours, difficult to coordinate treatment",
    solution: "靈活時程，專屬協調員",
    solutionEn: "Flexible schedule, dedicated coordinator",
    duration: "11個月",
    durationEn: "11 months",
    outcome: "女嬰順利出生，工作未受影響",
    outcomeEn: "Baby girl born successfully, work unaffected",
    testimonial: "身為醫師，我們了解醫療的複雜性。HRC的專業讓我們完全放心。",
    testimonialEn: "As physicians, we understand medical complexity. HRC's professionalism gave us complete peace of mind.",
    tags: ["醫護人員", "靈活安排", "專業對專業", "工作平衡"]
    , video: null
  },
  {
    id: "case-010",
    title: "跨文化家庭的融合",
    titleEn: "Cross-Cultural Family Integration",
    clientProfile: "中美混血夫妻，文化背景複雜",
    clientProfileEn: "Chinese-American mixed couple, complex cultural background",
    challenge: "文化差異，家庭期望，溝通障礙",
    challengeEn: "Cultural differences, family expectations, communication barriers",
    solution: "多語言支援，文化敏感服務",
    solutionEn: "Multilingual support, culturally sensitive services",
    duration: "16個月",
    durationEn: "16 months",
    outcome: "混血寶寶誕生，兩家族都滿意",
    outcomeEn: "Mixed-race baby born, both families satisfied",
    testimonial: "HRC理解不同文化的需求，讓我們的家庭融合更加順利。",
    testimonialEn: "HRC understands different cultural needs, making our family integration smoother.",
    tags: ["跨文化", "多語言支援", "家庭融合", "文化敏感"]
    , video: null
  }
];

const FAQS = [
  { qZh: "首次諮詢要費用嗎？", aZh: "線上初談免費，將為您評估適合的州別與流程。", qEn: "Is the first consultation free?", aEn: "Yes—it's free. We'll assess best-fit states and pathways." },
  { qZh: "整體時間需要多久？", aZh: "平均 12–18 個月，視配對速度與州法文件而定。", qEn: "How long does it take?", aEn: "Typically 12–18 months depending on matching and legal timeline." },
  { qZh: "費用大概多少？", aZh: "總費用約 $120K–$180K USD，詳細會依州別與需求而異。", qEn: "What are the costs?", aEn: "Total costs range $120K–$180K USD, varying by state and specific needs." },
  
  // Legal FAQs
  { qZh: "哪些州最適合進行代孕？", aZh: "加州、伊利諾州、康州等為代孕友善州，法律明確且程序相對簡單。我們會根據您的具體情況推薦最適合的州別。", qEn: "Which states are best for surrogacy?", aEn: "California, Illinois, Connecticut are surrogacy-friendly states with clear laws and simpler procedures. We'll recommend the best state based on your specific situation." },
  
  { qZh: "代孕合約包含哪些重要條款？", aZh: "包括補償條款、醫療決策權、責任分擔、親權確立等。我們的法律團隊會詳細解釋每個條款，確保您的權益受到保障。", qEn: "What important clauses are in surrogacy contracts?", aEn: "Includes compensation terms, medical decision rights, liability distribution, parental rights establishment. Our legal team will explain each clause in detail to protect your interests." },
  
  { qZh: "如何確保親權歸屬？", aZh: "透過產前親權確認程序，在嬰兒出生前就法律上確立委託父母的親權，避免後續爭議。", qEn: "How are parental rights secured?", aEn: "Through pre-birth parental rights confirmation procedures, legally establishing intended parents' rights before birth to avoid future disputes." },
  
  { qZh: "代孕過程中的醫療費用誰負責？", aZh: "所有與懷孕相關的醫療費用均由委託父母承擔，包括產前檢查、分娩費用、併發症治療等。會在合約中明確規定。", qEn: "Who pays for medical expenses during surrogacy?", aEn: "All pregnancy-related medical expenses are covered by intended parents, including prenatal care, delivery costs, complication treatments. This is clearly specified in the contract." },
  
  { qZh: "如果代孕母親改變主意怎麼辦？", aZh: "在代孕友善州，法律明確規定代孕母親無法保留嬰兒的親權。合約簽署後，委託父母的權利受到法律保護。", qEn: "What if the surrogate changes her mind?", aEn: "In surrogacy-friendly states, laws clearly state surrogates cannot retain parental rights. After contract signing, intended parents' rights are legally protected." },
  
  { qZh: "需要多長時間找到合適的代孕母親？", aZh: "通常需要2-4個月找到合適的配對。我們有嚴格的篩選程序，包括健康檢查、心理評估和背景調查。", qEn: "How long to find a suitable surrogate?", aEn: "Typically takes 2-4 months to find a suitable match. We have strict screening procedures including health checks, psychological evaluations, and background investigations." },
  
  { qZh: "可以選擇代孕母親嗎？", aZh: "是的，您可以查看代孕母親的基本資料（去識別化），並參與配對過程。雙方都需要同意才能進行合作。", qEn: "Can we choose our surrogate?", aEn: "Yes, you can review surrogates' basic profiles (de-identified) and participate in the matching process. Both parties must agree to proceed with cooperation." },
  
  { qZh: "懷孕期間如何與代孕母親溝通？", aZh: "我們提供溝通指導和協調服務，幫助建立良好的溝通關係。頻率和方式會在合約中明確約定。", qEn: "How to communicate with surrogate during pregnancy?", aEn: "We provide communication guidance and coordination services to help establish good communication relationships. Frequency and methods are clearly agreed upon in the contract." },
  
  // Process FAQs
  { qZh: "第一次配對不成功怎麼辦？", aZh: "我們會重新評估需求，調整配對標準，並安排新的配對。大部分客戶在2-3次配對內都能找到合適的代孕母親。", qEn: "What if the first match doesn't work?", aEn: "We'll reassess needs, adjust matching criteria, and arrange new matches. Most clients find suitable surrogates within 2-3 matching attempts." },
  
  { qZh: "需要親自到美國嗎？", aZh: "建議至少3次赴美：合約簽署、胚胎移植、嬰兒出生。我們可協助安排行程，減少不必要的往返。", qEn: "Do we need to travel to the US?", aEn: "Recommend at least 3 US trips: contract signing, embryo transfer, baby birth. We can help arrange itineraries to minimize unnecessary travel." },
  
  { qZh: "如果出現醫療併發症怎麼辦？", aZh: "合約會詳細規定各種醫療情況的處理方式。我們與頂級醫療機構合作，確保得到最好的醫療照護。", qEn: "What if medical complications arise?", aEn: "Contracts detail handling procedures for various medical situations. We partner with top medical institutions to ensure the best healthcare." },
  
  { qZh: "新生兒的國籍和證件如何辦理？", aZh: "嬰兒出生後，我們協助辦理美國出生證明和相關國籍手續。具體程序視父母國籍而定。", qEn: "How to handle newborn's nationality and documents?", aEn: "After birth, we assist with US birth certificates and related nationality procedures. Specific processes depend on parents' nationality." },
  
  // California & HRC Specific FAQs
  { qZh: "為什麼選擇加州進行代孕？", aZh: "加州擁有全美最完善的代孕法律體系，支持Pre-Birth Orders，無居住要求，對國際客戶友善，且醫療資源豐富。我們的HRC合作夥伴更是業界頂尖。", qEn: "Why choose California for surrogacy?", aEn: "California has the most comprehensive surrogacy legal system in the US, supports Pre-Birth Orders, has no residency requirements, is international client-friendly, and has abundant medical resources. Our HRC partners are industry leaders." },
  
  { qZh: "什麼是Pre-Birth Order？", aZh: "Pre-Birth Order是加州法院在嬰兒出生前就確立委託父母親權的法律程序。這意味著您的姓名會直接出現在出生證明上，無需額外收養程序。", qEn: "What is a Pre-Birth Order?", aEn: "A Pre-Birth Order is a legal procedure where California courts establish intended parents' parental rights before the baby is born. This means your names appear directly on the birth certificate without additional adoption procedures." },
  
  { qZh: "HRC Fertility有什麼優勢？", aZh: "HRC成立於1988年，擁有30多年經驗，代孕成功率達85%以上。提供24/7醫療支援、多語言服務，與USC醫學院合作，是南加州最權威的生殖中心。", qEn: "What are HRC Fertility's advantages?", aEn: "HRC was established in 1988 with over 30 years of experience and surrogacy success rates above 85%. They provide 24/7 medical support, multilingual services, partner with USC Medical School, and are Southern California's most authoritative reproductive center." },
  
  { qZh: "加州代孕的法律程序複雜嗎？", aZh: "相對其他州，加州的程序最為簡化。有了Pre-Birth Order，嬰兒出生時您就是法定父母，無需經過複雜的收養程序或法院聽證會。", qEn: "Are California surrogacy legal procedures complex?", aEn: "Compared to other states, California's procedures are the most streamlined. With Pre-Birth Orders, you are the legal parents when the baby is born, without complex adoption procedures or court hearings." },
  
  { qZh: "HRC的醫師團隊如何？", aZh: "我們合作的HRC醫師都是USC醫學院的REI（生殖內分泌與不孕症）專家，包括Dr. Marisa Gigg、Dr. Chelsey Harris等，專精第三方生殖和代孕醫療管理。", qEn: "How is HRC's medical team?", aEn: "Our HRC partner physicians are all REI (Reproductive Endocrinology & Infertility) specialists from USC Medical School, including Dr. Marisa Gigg, Dr. Chelsey Harris, etc., specializing in third-party reproduction and surrogacy medical management." },
  
  { qZh: "在加州進行代孕需要居住在當地嗎？", aZh: "不需要。加州法律不要求委託父母是當地居民。您只需要在關鍵時刻（如合約簽署、胚胎移植、分娩）赴美即可。", qEn: "Do we need to live in California for surrogacy?", aEn: "No. California law does not require intended parents to be local residents. You only need to travel to the US for key moments (contract signing, embryo transfer, delivery)." },
  
  { qZh: "HRC的胚胎移植成功率如何？", aZh: "HRC的單次胚胎移植成功率超過85%，遠超全國平均水準。實驗室設備先進，胚胎學團隊經驗豐富，提供最優質的醫療服務。", qEn: "What is HRC's embryo transfer success rate?", aEn: "HRC's single embryo transfer success rate exceeds 85%, far above national averages. They have advanced laboratory equipment and experienced embryology teams, providing the highest quality medical services." },
  
  { qZh: "加州的代孕合約有什麼特殊保障？", aZh: "加州法律明確保護委託父母權益，合約條款受法院認可。包括補償保障、醫療決策權、親權確立等都有法律依據，是最安全的代孕司法管轄區。", qEn: "What special protections do California surrogacy contracts have?", aEn: "California law clearly protects intended parents' rights, with contract terms recognized by courts. Compensation guarantees, medical decision rights, parental rights establishment all have legal basis, making it the safest surrogacy jurisdiction." }
];

// Data
const PHYSICIAN_DATA = [
  {
    id: "marisa-gigg",
    name: "Marisa Gigg",
    credentials: "MD",
    title: "生殖內分泌與不孕症 研究醫師（Fellow）",
    locations: ["南加州（Pasadena）"],
    interests: ["試管嬰兒（IVF）", "第三方生殖", "生育力保存"],
    imageUrl: "/images/gallery/dr-marisa-gigg-360X480.webp",
    bio: "USC Keck 醫學院之生殖內分泌與不孕症（REI）研究醫師，於 HRC Fertility Pasadena 執業；成長於 Pasadena。臨床與研究興趣包含肥胖與不孕、營養與不孕、癌症治療前/後的生育力保存（oncofertility）以及生殖醫療可近性。",
    education: [
      "約翰霍普金斯大學 — 學士",
      "杜蘭大學醫學院 — 醫學博士（MD）",
      "UCLA David Geffen 醫學院 — 婦產科住院醫師（曾獲 Larry Evertson Award『年度最佳實習住院醫師』、SREI Resident Award）"
    ],
    affiliations: [
      "美國生殖醫學會（ASRM）",
      "生殖內分泌與不孕症學會（SREI）",
      "美國婦科內視鏡醫學會（AAGL）",
      "美國婦產科醫學會（ACOG）",
      "Alpha Omega Alpha 醫學榮譽學會（AOA）"
    ],
  },
  {
    id: "chelsey-harris",
    name: "Chelsey A. Harris",
    credentials: "MD",
    title: "生殖內分泌與不孕症 研究醫師（Fellow）",
    locations: ["南加州（Pasadena）"],
    interests: ["胚胎學", "多囊卵巢症（PCOS）", "人工受孕（IUI）／試管嬰兒（IVF）", "更年期管理", "第三方生殖"],
    imageUrl: "/images/gallery/Dr-Harris-Headshot-360X480.webp",
    bio: "USC Keck 醫學院之 REI 研究醫師，於 HRC Fertility Pasadena 執業；成長於洛杉磯郡。研究興趣包含生殖醫療可近性、更年期照護與第三方生殖。",
    education: [
      "加州大學爾灣分校（UCI）— 學士",
      "莫爾豪斯醫學院 — 醫學博士（MD；Magna Cum Laude；Alpha Omega Alpha）",
      "南加州大學（USC）— 婦產科住院醫師／行政總住院醫師（Chief）；獲 SREI Resident Award（2023）"
    ],
    affiliations: [
      "美國生殖醫學會（ASRM）",
      "生殖內分泌與不孕症學會（SREI）",
      "美國婦產科醫學會（ACOG）"
    ],
  },
  {
    id: "andrew-rezk",
    name: "Andrew Rezk",
    credentials: "MD",
    title: "生殖內分泌與不孕症 研究醫師（Fellow）",
    locations: ["南加州（Pasadena）"],
    imageUrl: "/images/gallery/dr-andrew-rezk-360X480.webp",
    languages: ["英語", "西班牙語", "阿拉伯語"],
    bio: "帕薩迪納 HRC Fertility 的 Andrew Rezk 醫師。Rezk 醫師是南加州大學凱克醫學院生殖內分泌和不孕症科的研究員，在南加州大學凱克醫學院附屬機構 HRC Pasadena 執業。他出生並成長於洛杉磯地區，很高興能回到家鄉，為家鄉的患者提供幫助。Rezk 醫師相信需要花時間傾聽每位患者的獨特故事，並共同制定基於循證護理的個人化方案。",
    education: [
      "加州大學爾灣分校（UCI）— 本科",
      "邁阿密大學 — 醫學博士（MD）",
      "蒙蒂菲奧裡醫療中心（Montefiore Medical Center）— 婦產科住院醫師（OBGYN）"
    ],
    awards: [
      "David Off 教學獎",
      "SREI REI 傑出住院醫師獎"
    ],
    interests: [
      "整體健康與生育能力",
      "治療前健康優化以改善 IVF 結果",
      "肥胖與生育",
      "代謝健康",
      "減重手術對生育能力的影響"
    ],
    locationAddress: `HRC 生育中心 – 帕薩迪納
55 S. Lake Ave, 9th Fl.
Pasadena, CA 91101`,
    officeHours: "週一至週五 7:30–16:00",
    phoneExisting: "626-440-9161",
    phoneNew: "866-472-4483",
  },
  {
    id: "adriana-wong",
    name: "Adriana Wong",
    credentials: "MD, MPH",
    title: "生殖內分泌與不孕症 研究醫師（Fellow）",
    locations: ["南加州（Pasadena）"],
    interests: ["多囊性卵巢症候群（PCOS）", "新型 IVF 方案", "提供實證生育資訊"],
    imageUrl: "/images/gallery/dr-adriana-wong-360X480.webp",
    languages: ["英語", "西班牙語"],
    staffLanguages: ["英文", "西班牙文", "中文"],
    bio: "帕薩迪納 HRC Fertility 醫學博士 Adriana Wong 醫師。Adriana Wong 醫師是南加州大學凱克醫學院生殖內分泌和不孕症科的研究員，執業於南加州大學凱克醫學院附屬機構 HRC Pasadena 中心。她在加州洛杉磯出生長大。黃醫師希望繼續為洛杉磯社區的患者提供高品質、個人化的醫療服務。",
    education: [
      "康乃爾大學 — 本科",
      "邁阿密大學 — 醫學博士（MD）與公共衛生碩士（MPH）雙學位；金人文主義榮譽學會會員",
      "加州大學戴維斯醫學中心 — 婦產科住院醫師；行政總住院醫師（Chief Resident）"
    ],
    affiliations: [],
    awards: ["SREI 國家住院醫師獎（2022）"],
    locationAddress: `HRC 生育中心 – 帕薩迪納
55 S. Lake Ave, 9th Fl.
Pasadena, CA 91101`,
    officeHours: "週一至週五 7:30–16:00",
    phoneExisting: "626-440-9161",
    insuranceNote: "致電核實",
    certifications: ["生殖內分泌與不孕症 研究員"],
    categories: ["婦產科", "生殖內分泌及不孕症研究員"],
  },
];

// UI Components for Physician Directory
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700 bg-white/70 border-gray-200">
    {children}
  </span>
);

const PhysicianCard = ({ physician, onOpen, lang, cta = "了解更多" }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md focus-within:shadow-md">
      <button
        type="button"
        className="block w-full text-left"
        onClick={() => onOpen?.(physician.id)}
      >
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
          <img
            src={physician.imageUrl}
            alt={lang === "zh" ? "醫師頭像" : "Doctor Portrait"}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-3 p-4">
          <header>
            <h3 className="text-lg font-semibold text-gray-900">
              {physician.name} <span className="font-medium text-gray-600">{physician.credentials}</span>
            </h3>
            <p className="mt-0.5 text-sm text-gray-600">{physician.title}</p>
          </header>
          {physician.interests?.length ? (
            <div className="flex flex-wrap gap-1.5">
              {physician.interests.slice(0, 3).map((interest) => (
                <Pill key={interest}>{interest}</Pill>
              ))}
              {physician.interests.length > 3 && (
                <Pill>+{physician.interests.length - 3}</Pill>
              )}
            </div>
          ) : null}
          <div className="mt-1 flex items-center gap-2">
            {physician.locations?.map((location) => (
              <span key={location} className="text-xs text-gray-500">📍 {location}</span>
            ))}
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center justify-center rounded-xl border border-[var(--brand)] px-3 py-2 text-sm font-medium text-[var(--brand)] hover:bg-[var(--brand)] hover:text-white transition-colors">
              {lang === "zh" ? "了解更多" : "Learn More"}
            </span>
          </div>
        </div>
      </button>
    </article>
  );
};

const PhysicianDetail = ({ physician, onBack, lang }) => {
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: physician.name,
    jobTitle: physician.title,
    image: physician.imageUrl,
  }), [physician]);

  return (
    <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 transition-colors"
      >
        ← {lang === "zh" ? "返回醫師列表" : "Back to Physician List"}
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[320px,1fr]">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <img 
            src={physician.imageUrl} 
            alt={lang === "zh" ? "醫師頭像" : "Doctor Portrait"} 
            className="aspect-[3/4] w-full object-cover" 
          />
        </div>
        <div className="flex flex-col gap-6">
          <header>
            <h1 className="text-2xl font-bold text-[var(--brand-800)]">
              {physician.name} <span className="text-gray-600 font-medium">{physician.credentials}</span>
            </h1>
            <p className="mt-1 text-gray-700">{physician.title}</p>
            {physician.locations?.length ? (
              <p className="mt-1 text-sm text-gray-500">{physician.locations.map((l) => `📍 ${l}`).join("  ")}</p>
            ) : null}
            {physician.languages?.length ? (
              <p className="mt-1 text-sm text-[var(--brand)]">
                {lang === "zh" ? "語言：" : "Languages: "}{physician.languages.join(", ")}
              </p>
            ) : null}
          </header>

          {physician.bio ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {lang === "zh" ? "履歷" : "Biography"}
              </h2>
              <p className="text-gray-700 leading-relaxed">{physician.bio}</p>
            </section>
          ) : null}

          {physician.interests?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {lang === "zh" ? "專業領域" : "Areas of Interest"}
              </h2>
              <div className="flex flex-wrap gap-1.5">
                {physician.interests.map((interest) => (
                  <Pill key={interest}>{interest}</Pill>
                ))}
              </div>
            </section>
          ) : null}

          {physician.education?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {lang === "zh" ? "教育背景" : "Education"}
              </h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {physician.education.map((edu, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--brand)] rounded-full mt-2 flex-shrink-0"></span>
                    {edu}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {physician.affiliations?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {lang === "zh" ? "專業組織" : "Professional Affiliations"}
              </h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {physician.affiliations.map((affiliation, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 bg-[var(--brand)] rounded-full mt-2 flex-shrink-0"></span>
                    {affiliation}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {physician.awards?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {lang === "zh" ? "獲獎記錄" : "Awards & Recognition"}
              </h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {physician.awards.map((award, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-yellow-500">🏆</span>
                    {award}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {physician.locationAddress && (
            <section className="p-4 bg-[var(--brand-50)] rounded-xl">
              <h2 className="mb-2 text-sm font-semibold text-[var(--brand-800)] uppercase tracking-wide">
                {lang === "zh" ? "聯絡資訊" : "Contact Information"}
              </h2>
              <div className="space-y-2 text-sm">
                <p className="whitespace-pre-line text-gray-700">{physician.locationAddress}</p>
                {physician.officeHours && (
                  <p className="text-gray-600">
                    {lang === "zh" ? "診療時間：" : "Office Hours: "}{physician.officeHours}
                  </p>
                )}
                {physician.phoneExisting && (
                  <p className="text-[var(--brand-800)] font-medium">
                    {lang === "zh" ? "預約電話：" : "Phone: "}{physician.phoneExisting}
                  </p>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

const PhysicianDirectory = ({ lang }) => {
  const [selectedId, setSelectedId] = useState(null);
  const selected = useMemo(
    () => PHYSICIAN_DATA.find((d) => d.id === selectedId) || null,
    [selectedId]
  );

  const listJsonLd = useMemo(
    () =>
      PHYSICIAN_DATA.map((physician) => ({
        "@context": "https://schema.org",
        "@type": "Person",
        name: physician.name,
        jobTitle: physician.title,
        image: physician.imageUrl,
      })),
    []
  );

  if (selected) {
    return <PhysicianDetail physician={selected} onBack={() => setSelectedId(null)} lang={lang} />;
  }

  return (
    <div>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-4">
          {lang === "zh" ? "美國合作醫師團隊" : "US Partner Medical Team"}
        </h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          {lang === "zh" 
            ? "我們與美國頂尖的生殖醫學專家合作，為您提供世界級的醫療服務。"
            : "We partner with top reproductive medicine specialists in the US to provide world-class medical services."}
        </p>
      </div>

      {PHYSICIAN_DATA.length === 0 ? (
        <p className="text-center text-slate-500">
          {lang === "zh" ? "目前尚無醫師資料。" : "No physician data available."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PHYSICIAN_DATA.map((physician) => (
            <motion.div
              key={physician.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <PhysicianCard 
                physician={physician} 
                onOpen={setSelectedId} 
                lang={lang}
                cta={lang === "zh" ? "了解更多" : "Learn More"} 
              />
            </motion.div>
          ))}
        </div>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
    </div>
  );
};

// ---- Tiny hash router (Fix for missing useHashRoute) ----
function useHashRoute() {
  const getPath = () => (typeof window !== 'undefined' ? window.location.hash || "#/" : "#/");
  const [path, setPath] = useState(typeof window !== 'undefined' ? getPath() : "#/");
  useEffect(() => {
    const onHash = () => setPath(getPath());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  const navigate = (p) => { window.location.hash = p.startsWith('#') ? p : `#${p}`; };
  return [path, navigate];
}

// ---- Minimal sanity tests ----
function runSanityTests() {
  try {
    console.assert(typeof BRAND.name === "string" && BRAND.name.length > 0, "BRAND.name should be non-empty");
    console.assert(Array.isArray(NAV) && NAV.length >= 3, "NAV should have items");
    console.assert(typeof useHashRoute === "function", "useHashRoute should be a function");
  } catch {}
}
runSanityTests();

export default function LandingTemplate() {
  const [lang, setLang] = useState("zh");
  const [path] = useHashRoute();
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [showCoupleDetail, setShowCoupleDetail] = useState(false);
  const [showSingleDetail, setShowSingleDetail] = useState(false);
  const [showPartnerDetail, setShowPartnerDetail] = useState(false);

  const t = useMemo(() => ({
    heroTitle: {
      zh: "以專業與溫度，完成你的家庭藍圖",
      en: "Professional, compassionate support for your family journey",
    },
    heroCTA: { zh: "免費諮詢", en: "Free Consultation" },
    heroSub: {
      zh: BRAND.tagline || "高信任、可落地的跨國生育顧問服務",
      en: BRAND.tagline || "Trusted, end‑to‑end cross‑border fertility consulting",
    },
    servicesTitle: { zh: "祈孕顧問．美國代孕服務", en: "Qiyun Consulting · Services" },
    knowledgeTitle: { zh: "祈孕顧問．代孕知識與案例", en: "Qiyun Consulting · Knowledge & Cases" },
    processTitle: { zh: "流程", en: "Process" },
    teamTitle: { zh: "團隊", en: "Team" },
    faqTitle: { zh: "常見問題", en: "Frequently Asked Questions" },
    contactTitle: { zh: "聯絡我們", en: "Get In Touch" },
    formName: { zh: "您的姓名", en: "Your Name" },
    formEmail: { zh: "Email", en: "Email" },
    formPhone: { zh: "聯絡電話", en: "Phone Number" },
    formMsg: { zh: "想了解的重點", en: "What would you like to know?" },
    formSubmit: { zh: "送出表單", en: "Send" },
  }), [lang]);

  // Google Maps link for address
  const mapUrl = React.useMemo(() => `https://www.google.com/maps?q=${encodeURIComponent(BRAND.address)}`, []);

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Effects: active state, SEO/meta, scroll-top, shadow
  useEffect(() => {
    // Set active to home since we're showing all sections
    setActive("home");

    // Dynamic title & meta for single page
    const pageTitle = lang === 'zh' ? `${BRAND.name}｜美國代孕服務專家` : `${BRAND.name} | US Surrogacy Services`;
    document.title = pageTitle;

    const pageDesc = lang === 'zh' ? t.heroSub.zh : t.heroSub.en;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', pageDesc);

    // Top bar shadow on scroll
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lang, t.heroSub]);

  // Mobile menu state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact form (Formspree) minimal handler
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = React.useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const fd = new FormData(formRef.current);
      const hp = (fd.get("hp") || ""); // honeypot
      if (hp.trim().length > 0) {
        setSent(true);
        formRef.current?.reset();
        return;
      }
      const res = await fetch("https://formspree.io/f/mjkvgqyb", { method: "POST", headers: { "Accept": "application/json" }, body: fd });
      if (res.ok) { setSent(true); formRef.current?.reset(); }
    } finally {
      setLoading(false);
    }
  }

  // Structured data for homepage SEO
  const organizationJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": BRAND.name,
    "description": lang === 'zh' 
      ? "祈孕顧問提供專業美國代孕服務，包含夫妻代孕、同志代孕等，擁有合法醫療聯盟與一對一專屬顧問服務。"
      : "Qi Yun Consulting provides professional US surrogacy services, including couple and LGBTQ+ surrogacy, with legal medical alliance and one-on-one dedicated consulting services.",
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://qiyun.com.tw',
    "logo": typeof window !== 'undefined' ? `${window.location.origin}/images/logos/logo.png` : 'https://qiyun.com.tw/images/logos/logo.png',
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": BRAND.phone,
      "contactType": "customer service",
      "email": BRAND.email,
      "availableLanguage": ["zh-TW", "en-US"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BRAND.address,
      "addressLocality": "台北市",
      "addressRegion": "台灣",
      "addressCountry": "TW"
    },
    "sameAs": [
      "https://www.facebook.com/qiyunconsulting",
      "https://www.instagram.com/qiyunconsulting"
    ],
    "serviceArea": {
      "@type": "Country",
      "name": ["Taiwan", "United States"]
    }
  }), [lang]);

  const websiteJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": BRAND.name,
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://qiyun.com.tw',
    "description": lang === 'zh' 
      ? "用專業與溫度，陪你迎接新生命。提供美國合法代孕、一對一專屬顧問、跨境醫療聯盟服務。"
      : "With professionalism and warmth, we accompany you in welcoming new life. Providing legal US surrogacy, one-on-one dedicated consulting, and cross-border medical alliance services.",
    "inLanguage": ["zh-TW", "en-US"],
    "publisher": {
      "@type": "Organization",
      "name": BRAND.name
    }
  }), [lang]);

  const serviceJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": BRAND.name,
    "description": lang === 'zh' 
      ? "專業代孕諮詢服務，提供美國合法代孕程序、醫療聯盟合作、法律諮詢等一站式服務。"
      : "Professional surrogacy consulting services, providing legal US surrogacy procedures, medical alliance cooperation, legal consultation and one-stop services.",
    "serviceType": [
      lang === 'zh' ? "代孕諮詢" : "Surrogacy Consultation",
      lang === 'zh' ? "醫療聯盟" : "Medical Alliance", 
      lang === 'zh' ? "法律諮詢" : "Legal Consultation",
      lang === 'zh' ? "跨境醫療" : "Cross-border Medical Services"
    ],
    "areaServed": [
      {
        "@type": "Country",
        "name": "Taiwan"
      },
      {
        "@type": "Country", 
        "name": "United States"
      }
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": BRAND.phone,
      "contactType": "customer service",
      "email": BRAND.email
    }
  }), [lang]);

  const localBusinessJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BRAND.name,
    "description": lang === 'zh' 
      ? "祈孕顧問位於台北，提供專業代孕諮詢服務，協助客戶完成美國合法代孕程序。"
      : "Qi Yun Consulting is located in Taipei, providing professional surrogacy consulting services to help clients complete legal US surrogacy procedures.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": BRAND.address,
      "addressLocality": "台北市",
      "addressRegion": "台灣",
      "postalCode": "105",
      "addressCountry": "TW"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "25.0478",
      "longitude": "121.5319"
    },
    "telephone": BRAND.phone,
    "email": BRAND.email,
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://qiyun.com.tw',
    "openingHours": "Mo-Fr 09:00-18:00",
    "priceRange": "$$$$",
    "acceptsReservations": true
  }), [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-50)]/50 text-slate-900">
      <GlobalStyles />
      
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />

      {/* Top Bar */}
      <div className={cx("w-full sticky top-0 z-50 transition-all duration-500", scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-[var(--brand-50)]" : "bg-white/90 backdrop-blur-lg border-b border-white/20")}>
        <div className={cx("mx-auto max-w-7xl px-3 sm:px-6 flex items-center justify-between", scrolled ? "h-16 sm:h-18" : "h-18 sm:h-20")}>
          {/* Mobile Menu Button - 左側 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm shadow-md border border-[var(--brand-50)] text-[var(--brand-800)] hover:bg-[var(--brand-50)] transition-all duration-300"
            aria-label="選單"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 shadow-md border border-[var(--brand-50)]">
              <Baby className="h-6 w-6 sm:h-7 sm:w-7 text-[var(--brand-800)]" />
              <span className="font-bold tracking-tight text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand-600)] bg-clip-text text-transparent">{BRAND.name}</span>
            </div>
            <div className="text-xs text-slate-500 font-medium px-2 py-1 bg-white/60 rounded-lg border border-[var(--brand-50)]">
              <span>{lang === "zh" ? "與 HRC Fertility 合作" : "Partner with HRC Fertility"}</span>
            </div>
          </div>
          
          {/* Desktop Navigation - 隱藏在手機版 */}
          <nav className="hidden lg:flex items-center gap-1 sm:gap-2 lg:gap-3 responsive-text-xs sm:responsive-text-sm lg:responsive-text-base font-semibold rounded-2xl glass-effect px-2 sm:px-4 lg:px-6 py-2 shadow-lg">{NAV.map((n) => {
              const isActive = active === n.id;
              
              // 如果有子項目，渲染下拉菜單
              if (n.subItems) {
                return (
                  <div key={n.id} className="relative group">
                    <a
                      href={n.path}
                      className={cx(
                        "px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 font-medium flex items-center gap-1",
                        isActive
                          ? "btn-gradient text-white shadow-md transform scale-105"
                          : "text-slate-700 hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)] hover:scale-105"
                      )}
                    >
                      {n[lang]}
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    
                    {/* 下拉菜單 */}
                    <div className="absolute top-full left-0 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="bg-white rounded-xl shadow-lg border border-slate-200 py-2 min-w-[180px]">
                        {n.subItems.map((subItem) => (
                          <a
                            key={subItem.id}
                            href={subItem.path}
                            className="block px-4 py-2 text-sm text-slate-700 hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)] transition-colors duration-200"
                          >
                            {subItem[lang]}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }
              
              // 一般導航項目
              return (
                <a
                  key={n.id}
                  href={n.path}
                  className={cx(
                    "px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 font-medium",
                    isActive
                      ? "btn-gradient text-white shadow-md transform scale-105"
                      : "text-slate-700 hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)] hover:scale-105"
                  )}
                >
                  {n[lang]}
                </a>
              );
            })}
          </nav>
          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl btn-gradient text-white hover:scale-105 transition-all duration-300 shadow-lg responsive-text-sm font-medium flex-shrink-0"
          >
            <Languages className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{lang === "zh" ? "EN" : "中文"}</span>
            <span className="sm:hidden">{lang === "zh" ? "EN" : "中"}</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu - 從左側滑出 */}
      <div className={cx(
        "fixed inset-0 z-50 lg:hidden transition-all duration-300",
        mobileMenuOpen ? "visible" : "invisible"
      )}>
        {/* Overlay */}
        <div 
          className={cx(
            "absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        ></div>
        
        {/* Sidebar */}
        <div className={cx(
          "absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 flex flex-col",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[var(--brand-50)]">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 sm:gap-3">
                <Baby className="h-7 w-7 sm:h-8 sm:w-8 text-[var(--brand-800)]" />
                <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand-600)] bg-clip-text text-transparent">{BRAND.name}</span>
              </div>
              <div className="text-xs text-slate-500 font-medium pl-9 sm:pl-11">
                <span>{lang === "zh" ? "與 HRC Fertility 合作" : "Partner with HRC Fertility"}</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-[var(--brand-50)] text-slate-600 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 sm:py-6 px-3 sm:px-4">
            {NAV.map((n) => {
              const isActive = active === n.id;
              
              // 如果有子項目，渲染可展開的項目
              if (n.subItems) {
                return (
                  <div key={n.id} className="mb-2">
                    <a
                      href={n.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cx(
                        "flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 rounded-xl transition-all duration-300 font-medium text-base sm:text-lg min-h-[50px]",
                        isActive
                          ? "btn-gradient text-white shadow-md"
                          : "text-slate-700 hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)]"
                      )}
                    >
                      {n[lang]}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    
                    {/* 子項目 */}
                    <div className="ml-4 mt-1 space-y-1">
                      {n.subItems.map((subItem) => (
                        <a
                          key={subItem.id}
                          href={subItem.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)] rounded-lg transition-colors duration-200"
                        >
                          {subItem[lang]}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // 一般導航項目
              return (
                <a
                  key={n.id}
                  href={n.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cx(
                    "flex items-center px-4 sm:px-6 py-3.5 sm:py-4 mb-2 rounded-xl transition-all duration-300 font-medium text-base sm:text-lg min-h-[50px]",
                    isActive
                      ? "btn-gradient text-white shadow-md"
                      : "text-slate-700 hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)]"
                  )}
                >
                  {n[lang]}
                </a>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 sm:p-6 border-t border-[var(--brand-50)]">
            <button
              onClick={() => {
                setLang(lang === "zh" ? "en" : "zh");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl btn-gradient text-white hover:scale-105 transition-all duration-300 shadow-lg font-medium"
            >
              <Languages className="h-5 w-5" />
              <span>{lang === "zh" ? "English" : "中文"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-50)] via-white to-[var(--brand-50)]">
          <img src={HERO_IMAGES[heroIndex]} alt="背景圖" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/70 to-white/85"></div>
          {/* 動態圓圈裝飾 */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--brand-50)] rounded-full opacity-30 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-[var(--brand-100)] rounded-full opacity-40 animate-bounce"></div>
          <div className="absolute top-1/2 left-20 w-16 h-16 bg-[var(--brand)] rounded-full opacity-20 animate-ping"></div>
        </div>
        
        <div className="relative section-shell text-center z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto space-y-6 sm:space-y-8"
          >
            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)]"
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--brand)]" />
                <span className="whitespace-nowrap">{lang === "zh" ? "專業．可信賴．有溫度" : "Professional · Trusted · Compassionate"}</span>
              </motion.div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-[var(--brand-600)] bg-clip-text text-transparent leading-[1.25] px-2"
            >
              {t.heroTitle[lang]}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-[1.75] px-4"
            >
              {t.heroSub[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-stretch sm:items-center pt-2 sm:pt-4 px-4 sm:px-0"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-2 sm:gap-3 btn-gradient hover-lift px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-white font-semibold text-base shadow-lg min-w-[160px] sm:min-w-[200px] justify-center"
              >
                <Baby className="h-5 w-5" />
                <span>{t.heroCTA[lang]}</span>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl border-2 border-[var(--brand)] text-[var(--brand-800)] font-semibold text-base hover:bg-[var(--brand-50)] transition-all duration-300 min-w-[160px] sm:min-w-[200px] justify-center"
              >
                {lang === "zh" ? "了解服務" : "Learn More"}
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-[var(--brand)] rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-[var(--brand)] rounded-full mt-2"></div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[var(--brand-50)] via-white to-purple-50">
        <div className="section-shell">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 px-4"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)]">
              <Heart className="h-5 w-5 text-[var(--brand)]" />
              <span>{lang === "zh" ? "專業服務" : "Professional Services"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-purple-600 bg-clip-text text-transparent leading-[1.25] px-2">
              {t.servicesTitle[lang]}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-[1.7] px-4">
              {lang === "zh" 
                ? "我們提供專業、可信賴的美國代孕服務，陪伴您完成家庭夢想的每一步旅程。"
                : "We provide professional, trusted US surrogacy services, accompanying you through every step of your family journey."}
            </p>
            
            {/* 快速導航連結 */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 pt-4 px-4">
              <a
                href="#couple-surrogacy"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[var(--brand-50)] rounded-xl text-sm font-medium text-[var(--brand-800)] hover:bg-[var(--brand-50)] hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <HeartHandshake className="h-4 w-4" />
                <span>{lang === "zh" ? "夫妻代孕" : "Couple Surrogacy"}</span>
              </a>
              <a
                href="#lgbtq-surrogacy"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[var(--brand-50)] rounded-xl text-sm font-medium text-[var(--brand-800)] hover:bg-[var(--brand-50)] hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <Users2 className="h-4 w-4" />
                <span>{lang === "zh" ? "同志代孕" : "LGBTQ+ Surrogacy"}</span>
              </a>
              <a
                href="#single-surrogacy"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-[var(--brand-50)] rounded-xl text-sm font-medium text-[var(--brand-800)] hover:bg-[var(--brand-50)] hover:scale-105 transition-all duration-300 shadow-sm"
              >
                <User className="h-4 w-4" />
                <span>{lang === "zh" ? "單身代孕" : "Single Parent Surrogacy"}</span>
              </a>
            </div>
          </motion.div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8">
            {FEATURES.map(({ id, icon: Icon, zh, en, descZh, descEn, image, hasDetail }, index) => (
              <motion.div
                key={index}
                id={id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-5 sm:p-6 lg:p-8 glass-effect rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden scroll-mt-20"
              >
                {/* 背景裝飾 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--brand-50)] to-transparent rounded-full opacity-50 transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* 插圖圖片 - 僅顯示於前三個服務項目 */}
                {image && (
                  <div className="relative z-0 mb-4 sm:mb-5 rounded-xl sm:rounded-2xl overflow-hidden shadow-md">
                    <img 
                      src={image} 
                      alt={lang === "zh" ? zh : en}
                      className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                
                <div className="relative z-10 space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-xl sm:rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--brand-800)] group-hover:text-[var(--brand)] transition-colors duration-300 leading-snug">
                    {lang === "zh" ? zh : en}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-[1.7] group-hover:text-slate-700 transition-colors duration-300">
                    {lang === "zh" ? descZh : descEn}
                  </p>
                  
                  {/* 瞭解更多按鈕 */}
                  {hasDetail && (
                    <button
                      onClick={() => {
                        if (index === 0) setShowCoupleDetail(true);
                        if (index === 1) setShowPartnerDetail(true);
                        if (index === 2) setShowSingleDetail(true);
                      }}
                      className="inline-flex items-center gap-2 text-[var(--brand)] hover:text-[var(--brand-600)] font-semibold transition-colors duration-300 group/btn pt-1 sm:pt-2 text-sm sm:text-base"
                    >
                      <span>{lang === "zh" ? "瞭解更多" : "Learn More"}</span>
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        
        {/* Services Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              "serviceType": lang === "zh" ? "代孕諮詢服務" : "Surrogacy Consultation Services",
              "provider": {
                "@type": "Organization",
                "name": BRAND.name
              },
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "Taiwan"
                },
                {
                  "@type": "Country", 
                  "name": "United States"
                }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": lang === "zh" ? "代孕服務項目" : "Surrogacy Service Catalog",
                "itemListElement": FEATURES.map((feature, index) => ({
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": lang === "zh" ? feature.zh : feature.en,
                    "description": lang === "zh" ? feature.descZh : feature.descEn
                  }
                }))
              }
            })
          }}
        />
      </section>

      {/* HRC Fertility Center Section */}
      <section id="hrc-fertility" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-[var(--brand-50)]/30 to-white">
        <div className="section-shell">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4 px-4"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)]">
              <Globe2 className="h-5 w-5 text-[var(--brand)]" />
              <span>{lang === "zh" ? "合作夥伴" : "Partner"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-purple-600 bg-clip-text text-transparent leading-[1.25] px-2">
              {lang === "zh" ? "HRC Fertility 生育中心" : "HRC Fertility Center"}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-[1.7] px-4">
              {lang === "zh" 
                ? "南加州最權威的生殖醫學中心，30多年專業經驗，成立於1988年"
                : "Southern California's most authoritative reproductive medicine center with over 30 years of professional experience, established in 1988"}
            </p>
          </motion.div>

          {/* Clinic Locations */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
            {/* Pasadena Location */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[var(--brand-50)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--brand-800)]">
                    {lang === "zh" ? "HRC Pasadena 帕薩迪納中心" : "HRC Pasadena Center"}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {lang === "zh" ? "主要醫療中心" : "Main Medical Center"}
                  </p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[var(--brand)] mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--brand-800)]">
                      {lang === "zh" ? "地址" : "Address"}
                    </p>
                    <p className="text-slate-600">
                      55 S. Lake Ave, 9th Floor, Pasadena, CA 91101
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-[var(--brand)] mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--brand-800)]">
                      {lang === "zh" ? "電話" : "Phone"}
                    </p>
                    <p className="text-slate-600">+1 (626) 440-9161</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--brand-800)] mb-3">
                  {lang === "zh" ? "特色服務" : "Featured Services"}
                </h4>
                <div className="space-y-2">
                  {[
                    { zh: "最新IVF實驗室設備", en: "Latest IVF Laboratory Equipment" },
                    { zh: "24/7醫療支援", en: "24/7 Medical Support" },
                    { zh: "多語言服務團隊", en: "Multilingual Service Team" },
                    { zh: "代孕專業協調", en: "Surrogacy Professional Coordination" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--brand)] rounded-full"></div>
                      <span className="text-sm text-slate-600">{service[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* West LA Location */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-8 shadow-lg border border-[var(--brand-50)]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[var(--brand-800)]">
                    {lang === "zh" ? "HRC West LA 西洛杉磯中心" : "HRC West LA Center"}
                  </h3>
                  <p className="text-sm text-slate-600">
                    {lang === "zh" ? "專科醫療中心" : "Specialty Medical Center"}
                  </p>
                </div>
              </div>
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--brand-800)]">
                      {lang === "zh" ? "地址" : "Address"}
                    </p>
                    <p className="text-slate-600">
                      1430 2nd Street, Suite 102, Santa Monica, CA 90401
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-5 w-5 text-purple-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-[var(--brand-800)]">
                      {lang === "zh" ? "電話" : "Phone"}
                    </p>
                    <p className="text-slate-600">+1 (310) 566-1470</p>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-[var(--brand-800)] mb-3">
                  {lang === "zh" ? "特色服務" : "Featured Services"}
                </h4>
                <div className="space-y-2">
                  {[
                    { zh: "胚胎學專業實驗室", en: "Embryology Professional Laboratory" },
                    { zh: "遺傳學諮詢服務", en: "Genetic Counseling Services" },
                    { zh: "心理支援團隊", en: "Psychological Support Team" },
                    { zh: "國際患者服務", en: "International Patient Services" }
                  ].map((service, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">{service[lang]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Professional Expertise */}
          <div className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--brand-800)] mb-4">
                {lang === "zh" ? "專業領域" : "Professional Expertise"}
              </h3>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {/* 第三方生殖醫學 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--brand-50)]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-xl flex items-center justify-center mb-4">
                  <Stethoscope className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3">
                  {lang === "zh" ? "第三方生殖醫學" : "Third-Party Reproductive Medicine"}
                </h4>
                <div className="space-y-2">
                  {[
                    { zh: "代孕醫療協調", en: "Surrogacy Medical Coordination" },
                    { zh: "胚胎移植程序", en: "Embryo Transfer Procedures" },
                    { zh: "代孕母健康監測", en: "Surrogate Health Monitoring" },
                    { zh: "多胎妊娠管理", en: "Multiple Pregnancy Management" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[var(--brand)] rounded-full"></div>
                      <span className="text-sm text-slate-600">{item[lang]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 生殖內分泌學 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--brand-50)]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3">
                  {lang === "zh" ? "生殖內分泌學" : "Reproductive Endocrinology"}
                </h4>
                <div className="space-y-2">
                  {[
                    { zh: "激素週期調節", en: "Hormone Cycle Regulation" },
                    { zh: "卵巢刺激方案", en: "Ovarian Stimulation Protocols" },
                    { zh: "子宮內膜準備", en: "Endometrial Preparation" },
                    { zh: "黃體期支持", en: "Luteal Phase Support" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">{item[lang]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* 胚胎學與遺傳學 */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-[var(--brand-50)]"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <Baby className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3">
                  {lang === "zh" ? "胚胎學與遺傳學" : "Embryology & Genetics"}
                </h4>
                <div className="space-y-2">
                  {[
                    { zh: "胚胎培養技術", en: "Embryo Culture Technology" },
                    { zh: "胚胎基因篩檢", en: "Embryo Genetic Screening" },
                    { zh: "胚胎冷凍保存", en: "Embryo Cryopreservation" },
                    { zh: "植入前診斷", en: "Preimplantation Diagnosis" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                      <span className="text-sm text-slate-600">{item[lang]}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Success Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-3xl p-8 text-white mb-16"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                {lang === "zh" ? "HRC 成功率統計" : "HRC Success Statistics"}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">85%+</div>
                <div className="text-xl font-semibold mb-2">
                  {lang === "zh" ? "代孕成功率" : "Surrogacy Success Rate"}
                </div>
                <p className="text-[var(--brand-50)]">
                  {lang === "zh" ? "單次胚胎移植成功率" : "Single Embryo Transfer Success Rate"}
                </p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">96%+</div>
                <div className="text-xl font-semibold mb-2">
                  {lang === "zh" ? "客戶滿意度" : "Customer Satisfaction"}
                </div>
                <p className="text-[var(--brand-50)]">
                  {lang === "zh" ? "整體服務滿意度評分" : "Overall Service Satisfaction Rating"}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Partner Institutions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <h3 className="text-2xl sm:text-3xl font-bold text-[var(--brand-800)] mb-4">
                {lang === "zh" ? "合作機構" : "Partner Institutions"}
              </h3>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { zh: "南加州大學凱克醫學院", en: "USC Keck School of Medicine" },
                { zh: "加州大學洛杉磯分校醫學中心", en: "UCLA Medical Center" },
                { zh: "Cedars-Sinai醫學中心", en: "Cedars-Sinai Medical Center" },
                { zh: "洛杉磯兒童醫院", en: "Children's Hospital Los Angeles" }
              ].map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl p-6 shadow-lg border border-[var(--brand-50)] text-center"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Building2 className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-medium text-[var(--brand-800)]">
                    {partner[lang]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <div className="bg-gradient-to-br from-white to-[var(--brand-50)]/30 rounded-3xl p-8 border border-[var(--brand-50)]">
              <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-4">
                {lang === "zh" ? "準備開始您的生育之旅？" : "Ready to Start Your Fertility Journey?"}
              </h3>
              <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                {lang === "zh" 
                  ? "聯繫 HRC Fertility 的專業團隊，我們將為您提供個人化的生育治療方案和全方位的支援服務。"
                  : "Contact HRC Fertility's professional team for personalized fertility treatment plans and comprehensive support services."}
              </p>
              <div className="flex justify-center">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[var(--brand)] text-[var(--brand-800)] font-semibold rounded-xl hover:bg-[var(--brand-50)] transition-all duration-300"
                >
                  <Mail className="h-5 w-5" />
                  <span>{lang === "zh" ? "線上諮詢" : "Online Consultation"}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detailed Process Section */}
      <section id="process" className="py-20 bg-gradient-to-br from-slate-50 via-white to-[var(--brand-50)]">
        <div className="section-shell">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)] mb-6">
              <ArrowRight className="h-5 w-5 text-[var(--brand)]" />
              {lang === "zh" ? "完整流程" : "Complete Process"}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-slate-600 bg-clip-text text-transparent mb-6 leading-tight">
              {lang === "zh" ? "詳細代孕流程" : "Detailed Surrogacy Process"}
            </h2>
            <p className="responsive-text-lg sm:responsive-text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {lang === "zh" 
                ? "透明完整的代孕流程說明，讓您清楚了解每個階段的重要步驟與時程安排。"
                : "Transparent and comprehensive surrogacy process explanation, helping you understand key steps and timeline arrangements for each phase."}
            </p>
          </motion.div>

          <div className="space-y-16">
            {DETAILED_PROCESS.map((phase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
              >
                {/* 流程線條 */}
                {idx < DETAILED_PROCESS.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-[var(--brand)] to-transparent opacity-30 z-0"></div>
                )}
                
                <div className="relative glass-effect rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden">
                  {/* 背景裝飾 */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--brand-50)] to-transparent rounded-full opacity-30 transform translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center mb-8">
                      <div className="w-16 h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] text-white rounded-2xl flex items-center justify-center font-bold text-xl mr-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand)] bg-clip-text text-transparent">
                          {lang === "zh" ? phase.phase : phase.phaseEn}
                        </h3>
                        <p className="responsive-text-base text-[var(--brand-600)] font-medium mt-1">
                          {lang === "zh" ? `預計時間：${phase.duration}` : `Duration: ${phase.durationEn}`}
                        </p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {phase.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="relative p-6 bg-gradient-to-br from-white to-[var(--brand-50)] rounded-2xl border border-[var(--brand-200)] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                          <div className="absolute top-4 right-4 responsive-text-xs font-medium text-[var(--brand-600)] bg-[var(--brand-100)] px-3 py-1 rounded-full">
                            {lang === "zh" ? step.timeline : step.timelineEn}
                          </div>
                          <h4 className="responsive-text-base font-bold text-[var(--brand-800)] mb-3 pr-16">
                            {lang === "zh" ? step.title : step.titleEn}
                          </h4>
                          <p className="responsive-text-sm text-slate-700 leading-relaxed">
                            {lang === "zh" ? step.description : step.descriptionEn}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Information Section */}
      <section id="legal" className="section-shell">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-6">
              {lang === "zh" ? "代孕法律資訊" : "Surrogacy Legal Information"}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {lang === "zh" 
                ? "了解美國各州代孕法律差異，選擇最適合您的州別進行代孕程序。"
                : "Understand surrogacy law differences across US states and choose the most suitable state for your surrogacy journey."}
            </p>
          </motion.div>
        </div>

        {/* State Legal Categories */}
        <div className="max-w-2xl mx-auto mb-16">
          {Object.entries(LEGAL_INFO).map(([key, info], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border-2 bg-green-50 border-green-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4 bg-green-500">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  {lang === "zh" ? info.title : info.titleEn}
                </h3>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-slate-700 mb-2">
                  {lang === "zh" ? "主要州別：" : "Main States:"}
                </h4>
                <div className="flex flex-wrap gap-1">
                  {(lang === "zh" ? info.states : info.statesEn).map((state, i) => (
                    <span key={i} className="text-xs bg-white/70 px-2 py-1 rounded-full text-slate-700">
                      {state}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-slate-700 mb-2">
                  {lang === "zh" ? "特徵：" : "Characteristics:"}
                </h4>
                <ul className="space-y-1">
                  {(lang === "zh" ? info.characteristics : info.characteristicsEn).map((char, i) => (
                    <li key={i} className="text-sm text-slate-600 flex items-start">
                      <span className="mr-2 mt-1">•</span>
                      {char}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legal Considerations */}
        <div className="space-y-12">
          {LEGAL_CONSIDERATIONS.map((category, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
            >
              <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
                {lang === "zh" ? category.category : category.categoryEn}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-8">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="p-6 bg-gradient-to-br from-[var(--brand-50)] to-white rounded-xl border border-[var(--brand-200)]">
                    <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3">
                      {lang === "zh" ? item.title : item.titleEn}
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {lang === "zh" ? item.description : item.descriptionEn}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* California Legal Details Section */}
      <section id="california-legal" className="section-shell bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-6">
              {lang === "zh" ? CALIFORNIA_LEGAL_DETAILS.overview.title : CALIFORNIA_LEGAL_DETAILS.overview.titleEn}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {lang === "zh" ? CALIFORNIA_LEGAL_DETAILS.overview.description : CALIFORNIA_LEGAL_DETAILS.overview.descriptionEn}
            </p>
          </motion.div>
        </div>

        {/* Key California Laws */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? "關鍵法律條文" : "Key Legal Statutes"}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {CALIFORNIA_LEGAL_DETAILS.keyLaws.map((law, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-blue-200"
              >
                <div className="text-xs font-mono text-blue-600 mb-2">{law.law}</div>
                <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3">
                  {lang === "zh" ? law.title : law.titleEn}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {lang === "zh" ? law.description : law.descriptionEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* California Advantages */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? "加州代孕優勢" : "California Surrogacy Advantages"}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CALIFORNIA_LEGAL_DETAILS.advantages.map((advantage, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200"
              >
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-4">
                  <span className="text-white font-bold text-lg">✓</span>
                </div>
                <h4 className="text-lg font-bold text-green-800 mb-3">
                  {lang === "zh" ? advantage.title : advantage.titleEn}
                </h4>
                <p className="text-green-700 text-sm leading-relaxed">
                  {lang === "zh" ? advantage.description : advantage.descriptionEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Legal Procedures */}
        <div>
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? "加州代孕法律流程" : "California Surrogacy Legal Process"}
          </h3>
          <div className="space-y-8">
            {CALIFORNIA_LEGAL_DETAILS.procedures.map((procedure, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[var(--brand)] text-white rounded-full flex items-center justify-center font-bold mr-4">
                    {idx + 1}
                  </div>
                  <h4 className="text-xl font-bold text-[var(--brand-800)]">
                    {lang === "zh" ? procedure.step : procedure.stepEn}
                  </h4>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {(lang === "zh" ? procedure.details : procedure.detailsEn).map((detail, detailIdx) => (
                    <div key={detailIdx} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-[var(--brand)] rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-slate-700 text-sm">{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Knowledge & Cases Section */}
      <section id="knowledge" className="section-shell bg-gradient-to-r from-[var(--brand-50)]/30 to-white">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-6">
              {t.knowledgeTitle[lang]}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {lang === "zh"
                ? "深度解析代孕知識，分享真實成功案例，為您的代孕之路提供專業指導與信心。"
                : "In-depth analysis of surrogacy knowledge and sharing real success stories to provide professional guidance and confidence for your surrogacy journey."}
            </p>
          </motion.div>
        </div>

        {/* HRC Knowledge Articles */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? "HRC 專業知識文章" : "HRC Professional Knowledge Articles"}
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {HRC_KNOWLEDGE_ARTICLES.map((article, idx) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-[var(--brand-100)] text-[var(--brand-800)] text-xs font-medium rounded-full">
                    {lang === "zh" ? article.category : article.categoryEn}
                  </span>
                </div>
                
                {/* Video player if video field exists */}
                {article.video && (
                  <div className="mb-4 rounded-xl overflow-hidden">
                    <video 
                      controls 
                      className="w-full h-auto"
                      preload="metadata"
                    >
                      <source src={article.video} type="video/mp4" />
                      {lang === "zh" ? "您的瀏覽器不支援影片播放。" : "Your browser does not support video playback."}
                    </video>
                  </div>
                )}
                
                <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3">
                  {lang === "zh" ? article.title : article.titleEn}
                </h4>
                
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  {lang === "zh" ? article.summary : article.summaryEn}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-slate-500">
                    <span className="font-medium">作者: {article.author}</span>
                    <span className="ml-2">{article.date}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-3">
                  {article.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Success Cases */}
        <div>
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? "HRC 成功案例分享" : "HRC Success Case Studies"}
          </h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            {HRC_SUCCESS_CASES.map((case_item, idx) => (
              <motion.div
                key={case_item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg border border-slate-200"
              >
                <div className="flex items-center mb-3 sm:mb-4">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold mr-2 sm:mr-3 flex-shrink-0">
                    ✓
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-[var(--brand-800)] leading-tight">
                    {lang === "zh" ? case_item.title : case_item.titleEn}
                  </h4>
                </div>

                {/* Video player if video field exists */}
                {case_item.video && (
                  <div className="mb-3 sm:mb-4 rounded-lg sm:rounded-xl overflow-hidden shadow-md">
                    <video 
                      controls 
                      className="w-full h-auto"
                      preload="metadata"
                      controlsList="nodownload"
                      playsInline
                    >
                      <source src={case_item.video} type="video/mp4" />
                      {lang === "zh" ? "您的瀏覽器不支援影片播放。" : "Your browser does not support video playback."}
                    </video>
                  </div>
                )}

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-xs font-medium text-slate-500 min-w-[50px] sm:min-w-[60px] flex-shrink-0">客戶:</span>
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {lang === "zh" ? case_item.clientProfile : case_item.clientProfileEn}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-xs font-medium text-slate-500 min-w-[50px] sm:min-w-[60px] flex-shrink-0">挑戰:</span>
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {lang === "zh" ? case_item.challenge : case_item.challengeEn}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-xs font-medium text-slate-500 min-w-[50px] sm:min-w-[60px] flex-shrink-0">方案:</span>
                    <span className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {lang === "zh" ? case_item.solution : case_item.solutionEn}
                    </span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500">時程:</span>
                      <span className="text-xs sm:text-sm text-[var(--brand-600)] font-medium">
                        {lang === "zh" ? case_item.duration : case_item.durationEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500">結果:</span>
                      <span className="text-xs sm:text-sm text-green-600 font-medium">
                        {lang === "zh" ? case_item.outcome : case_item.outcomeEn}
                      </span>
                    </div>
                  </div>
                </div>

                <blockquote className="bg-slate-50 p-3 sm:p-4 rounded-lg sm:rounded-xl border-l-4 border-[var(--brand)] mb-3 sm:mb-4">
                  <p className="text-xs sm:text-sm text-slate-700 italic leading-relaxed">
                    "{lang === "zh" ? case_item.testimonial : case_item.testimonialEn}"
                  </p>
                </blockquote>

                <div className="flex flex-wrap gap-1">
                  {case_item.tags.map((tag, tagIdx) => (
                    <span key={tagIdx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-shell">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-6">
              {t.teamTitle[lang]}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {lang === "zh" 
                ? "專業的醫師團隊和顧問，為您提供全方位的美國代孕服務支援。"
                : "Professional medical team and consultants providing comprehensive surrogacy service support."}
            </p>
          </motion.div>
        </div>

        {/* US Medical Team Directory */}
        <div className="mb-16">
          <PhysicianDirectory lang={lang} />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 團隊成員卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-800)] rounded-full flex items-center justify-center mx-auto mb-6">
              <Users2 className="h-12 w-12 text-white" />
            </div>
            {/* HRC 介紹影片 */}
            <div className="mb-4 sm:mb-6">
              <video controls className="w-full rounded-lg sm:rounded-xl shadow-lg" preload="metadata" controlsList="nodownload" playsInline>
                <source src="/videos/HRC.mp4" type="video/mp4" />
                {lang === "zh" ? "您的瀏覽器不支援影片播放。" : "Your browser does not support video playback."}
              </video>
            </div>
            <h3 className="text-xl font-semibold text-[var(--brand-800)] mb-3">
              {lang === "zh" ? "醫療顧問團" : "Medical Advisory Team"}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              {lang === "zh" 
                ? "美國認證生殖醫學專家，提供專業醫療指導與支援。"
                : "US certified reproductive medicine specialists providing professional medical guidance."}
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <p>• {lang === "zh" ? "生殖內分泌專科醫師" : "Reproductive Endocrinologists"}</p>
              <p>• {lang === "zh" ? "胚胎學專家" : "Embryology Specialists"}</p>
              <p>• {lang === "zh" ? "心理諮詢師" : "Psychological Counselors"}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-800)] rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="h-12 w-12 text-white" />
            </div>
            {/* HRC 醫生影片 1 */}
            <div className="mb-4 sm:mb-6">
              <video controls className="w-full rounded-lg sm:rounded-xl shadow-lg" preload="metadata" controlsList="nodownload" playsInline>
                <source src="/videos/HRCDR.mp4" type="video/mp4" />
                {lang === "zh" ? "您的瀏覽器不支援影片播放。" : "Your browser does not support video playback."}
              </video>
            </div>
            <h3 className="text-xl font-semibold text-[var(--brand-800)] mb-3">
              {lang === "zh" ? "法律顧問團" : "Legal Advisory Team"}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              {lang === "zh" 
                ? "專精代孕法律的律師團隊，確保所有程序合法合規。"
                : "Legal team specializing in surrogacy law, ensuring all procedures are legally compliant."}
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <p>• {lang === "zh" ? "代孕法律專家" : "Surrogacy Law Experts"}</p>
              <p>• {lang === "zh" ? "合約起草與審查" : "Contract Drafting & Review"}</p>
              <p>• {lang === "zh" ? "父母權確立" : "Parental Rights Establishment"}</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-800)] rounded-full flex items-center justify-center mx-auto mb-6">
              <HeartHandshake className="h-12 w-12 text-white" />
            </div>
            {/* HRC 醫生影片 2 */}
            <div className="mb-4 sm:mb-6">
              <video controls className="w-full rounded-lg sm:rounded-xl shadow-lg" preload="metadata" controlsList="nodownload" playsInline>
                <source src="/videos/HRCDR2.mp4" type="video/mp4" />
                {lang === "zh" ? "您的瀏覽器不支援影片播放。" : "Your browser does not support video playback."}
              </video>
            </div>

            <h3 className="text-xl font-semibold text-[var(--brand-800)] mb-3">
              {lang === "zh" ? "專案管理團" : "Project Management Team"}
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              {lang === "zh" 
                ? "經驗豐富的專案經理，全程陪伴您的代孕旅程。"
                : "Experienced project managers accompanying you throughout your surrogacy journey."}
            </p>
            <div className="space-y-2 text-sm text-slate-500">
              <p>• {lang === "zh" ? "個人專屬顧問" : "Personal Dedicated Consultants"}</p>
              <p>• {lang === "zh" ? "跨境協調專家" : "Cross-border Coordination"}</p>
              <p>• {lang === "zh" ? "24/7 支援服務" : "24/7 Support Services"}</p>
            </div>
          </motion.div>
        </div>

        {/* 團隊特色 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 p-8 bg-gradient-to-r from-[var(--brand-50)] to-white rounded-2xl"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-[var(--brand-800)] mb-4">
              {lang === "zh" ? "為什麼選擇我們的團隊？" : "Why Choose Our Team?"}
            </h3>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">10+</span>
              </div>
              <h4 className="font-semibold text-[var(--brand-800)] mb-2">
                {lang === "zh" ? "年經驗" : "Years Experience"}
              </h4>
              <p className="text-sm text-slate-600">
                {lang === "zh" ? "豐富的跨境美國代孕服務經驗" : "Rich cross-border US surrogacy experience"}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">50+</span>
              </div>
              <h4 className="font-semibold text-[var(--brand-800)] mb-2">
                {lang === "zh" ? "州別專家" : "State Specialists"}
              </h4>
              <p className="text-sm text-slate-600">
                {lang === "zh" ? "熟悉美國加州與台灣相關法律" : "Familiar with California and Taiwan related laws"}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">12/8</span>
              </div>
              <h4 className="font-semibold text-[var(--brand-800)] mb-2">
                {lang === "zh" ? "線上與面對面雙軌" : "Online & In-Person Dual Track"}
              </h4>
              <p className="text-sm text-slate-600">
                {lang === "zh" ? "靈活選擇服務方式" : "Flexible service delivery options"}
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">100%</span>
              </div>
              <h4 className="font-semibold text-[var(--brand-800)] mb-2">
                {lang === "zh" ? "成功保障" : "Success Guarantee"}
              </h4>
              <p className="text-sm text-slate-600">
                {lang === "zh" ? "專業保障每個環節" : "Professional guarantee for every step"}
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-shell bg-gradient-to-r from-[var(--brand-50)]/30 to-white py-12 sm:py-16 md:py-20">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-5 sm:space-y-6"
          >
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--brand-800)] leading-[1.2]">
                {t.faqTitle[lang]}
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-[1.7]">
                {lang === "zh" ? "以下是最常見的問題解答" : "Here are answers to commonly asked questions"}
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              {FAQS.map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 lg:p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <h4 className="font-semibold responsive-text-base text-[var(--brand-800)] mb-2.5 leading-snug">
                    {lang === "zh" ? f.qZh : f.qEn}
                  </h4>
                  <p className="text-slate-600 responsive-text-sm leading-[1.7]">
                    {lang === "zh" ? f.aZh : f.aEn}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src={ILLUSTRATIONS.faq.src}
              srcSet={ILLUSTRATIONS.faq.srcSet}
              sizes={ILLUSTRATIONS.faq.sizes}
              alt={lang === "zh" ? ILLUSTRATIONS.faq.zhAlt : ILLUSTRATIONS.faq.enAlt}
              loading="lazy"
              className="w-full rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>
        
        {/* FAQ Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": FAQS.map(faq => ({
                "@type": "Question",
                "name": lang === "zh" ? faq.qZh : faq.qEn,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": lang === "zh" ? faq.aZh : faq.aEn
                }
              }))
            })
          }}
        />
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-[var(--brand-50)] via-white to-purple-50 relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[var(--brand-50)] to-transparent rounded-full opacity-30 transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-50 to-transparent rounded-full opacity-40 transform translate-x-40 translate-y-40"></div>
        
        <div className="section-shell relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-10 md:mb-12 space-y-3 sm:space-y-4 px-4"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)]">
              <Phone className="h-5 w-5 text-[var(--brand)]" />
              <span>{lang === "zh" ? "聯繫我們" : "Contact Us"}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-purple-600 bg-clip-text text-transparent leading-[1.2] px-2">
              {t.contactTitle[lang]}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-4xl mx-auto leading-[1.7] px-4">
              {lang === "zh"
                ? "準備好開始您的家庭旅程了嗎？聯絡我們，讓專業顧問為您提供免費諮詢。"
                : "Ready to start your family journey? Contact us for a free consultation with our professional consultants."}
            </p>
          </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group text-center p-6 lg:p-8 glass-effect rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <h4 className="responsive-text-base font-bold text-[var(--brand-800)] mb-2.5 group-hover:text-[var(--brand)] transition-colors duration-300 leading-snug">
                {lang === "zh" ? "電話諮詢" : "Phone Consultation"}
              </h4>
              <p className="responsive-text-sm text-slate-600 font-medium">{BRAND.phone}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group text-center p-6 lg:p-8 glass-effect rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="h-7 w-7 lg:h-8 lg:w-8 text-white" />
              </div>
              <h4 className="responsive-text-base font-bold text-[var(--brand-800)] mb-2.5 group-hover:text-[var(--brand)] transition-colors duration-300 leading-snug">
                {lang === "zh" ? "電子郵件" : "Email"}
              </h4>
              <p className="responsive-text-sm text-slate-600">{BRAND.email}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
            >
              <MapPin className="h-8 w-8 text-[var(--brand)] mx-auto mb-4" />
              <h4 className="font-semibold text-[var(--brand-800)] mb-2">
                {lang === "zh" ? "辦公地址" : "Office Address"}
              </h4>
              <p className="text-slate-600">{BRAND.address}</p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative glass-effect rounded-3xl shadow-xl p-10 overflow-hidden"
          >
            {/* 背景裝飾 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[var(--brand-50)] to-transparent rounded-full opacity-50 transform translate-x-16 -translate-y-16"></div>
            
            <div className="relative z-10">
              {sent ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[var(--brand-800)] mb-6">
                    {lang === "zh" ? "訊息已送出！" : "Message Sent!"}
                  </h3>
                  <p className="responsive-text-lg text-slate-600 leading-relaxed">
                    {lang === "zh" 
                      ? "感謝您的聯絡，我們將在24小時內回覆您。"
                      : "Thank you for contacting us. We will respond within 24 hours."}
                  </p>
                </div>
              ) : (
                <>
                  <div className="text-center mb-8 space-y-2">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand)] bg-clip-text text-transparent leading-[1.2]">
                      {lang === "zh" ? "免費諮詢表單" : "Free Consultation Form"}
                    </h3>
                    <p className="responsive-text-base text-slate-600 leading-[1.6]">
                      {lang === "zh" 
                        ? "填寫下方表單，我們將盡快為您安排專業諮詢"
                        : "Fill out the form below and we'll schedule a professional consultation for you"}
                    </p>
                  </div>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" name="hp" style={{ display: 'none' }} />
                  
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 leading-tight">
                        {t.formName[lang]}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition-all duration-300 bg-white hover:border-slate-300 responsive-text-base"
                        placeholder={lang === "zh" ? "請輸入您的姓名" : "Enter your name"}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2 leading-tight">
                        {t.formEmail[lang]}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition-all duration-300 bg-white hover:border-slate-300 responsive-text-base"
                        placeholder={lang === "zh" ? "請輸入您的 Email" : "Enter your email"}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 leading-tight">
                      {t.formPhone[lang]}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition-all duration-300 bg-white hover:border-slate-300 responsive-text-base"
                      placeholder={lang === "zh" ? "請輸入您的聯絡電話" : "Enter your phone number"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2 leading-tight">
                      {t.formMsg[lang]}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition-all duration-300 resize-none bg-white hover:border-slate-300 responsive-text-base leading-[1.6]"
                      placeholder={lang === "zh" ? "請描述您想了解的內容或需求..." : "Please describe what you would like to know or your needs..."}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 btn-gradient text-white rounded-xl text-lg font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                  >
                    {loading 
                      ? (lang === "zh" ? "送出中..." : "Sending...")
                      : t.formSubmit[lang]
                    }
                  </button>
                </form>
              </>
            )}
            </div>
          </motion.div>
        </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[var(--brand-800)] via-[var(--brand-700)] to-[var(--brand-900)] text-white py-10 sm:py-12 md:py-16 relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-white/5 to-transparent rounded-full transform translate-x-40 translate-y-40"></div>
        
        <div className="section-shell relative z-10">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center">
                  <Baby className="h-7 w-7 text-white" />
                </div>
                <span className="text-2xl sm:text-3xl font-black text-black">{BRAND.name}</span>
              </div>
              <p className="text-blue-400/90 leading-[1.7] responsive-text-base pr-4 font-medium">
                {BRAND.tagline}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4"
            >
              <h4 className="responsive-text-base font-bold text-blue-500 leading-snug text-lg">
                {lang === "zh" ? "聯絡資訊" : "Contact Information"}
              </h4>
              <div className="space-y-2 sm:space-y-3 text-blue-400">
                <div className="flex items-center gap-3 hover:text-blue-300 transition-colors duration-300">
                  <Phone className="h-5 w-5 flex-shrink-0 text-[var(--brand-200)]" />
                  <span className="responsive-text-sm font-medium">{BRAND.phone}</span>
                </div>
                <div className="flex items-center gap-3 hover:text-blue-300 transition-colors duration-300">
                  <Mail className="h-5 w-5 flex-shrink-0 text-[var(--brand-200)]" />
                  <span className="responsive-text-sm break-all font-medium">{BRAND.email}</span>
                </div>
                <div className="flex items-start gap-3 hover:text-blue-300 transition-colors duration-300">
                  <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-[var(--brand-200)]" />
                  <span className="responsive-text-sm leading-[1.6] font-medium">{BRAND.address}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-3 sm:space-y-4"
            >
              <h4 className="responsive-text-base font-bold text-blue-500 leading-snug text-lg">
                {lang === "zh" ? "服務項目" : "Services"}
              </h4>
              <div className="space-y-2 sm:space-y-2.5 text-blue-400">
                {FEATURES.slice(0, 4).map((feature, index) => (
                  <p key={index} className="responsive-text-sm hover:text-blue-300 hover:translate-x-1 transition-all duration-300 cursor-pointer leading-snug font-medium flex items-center gap-2">
                    <span className="text-[var(--brand-200)]">▪</span>
                    {lang === "zh" ? feature.zh : feature.en}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="border-t border-white/20 pt-6 mt-8"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <p className="text-blue-400/90 responsive-text-sm leading-tight font-medium">
                © <span className="text-[var(--brand-200)] font-bold">2025</span> <span className="text-blue-500 font-bold">{BRAND.name}</span>. {lang === "zh" ? "版權所有" : "All rights reserved"}.
              </p>
              <div className="flex items-center gap-6">
                <a href="#hero" className="text-blue-400 hover:text-blue-300 transition-colors duration-300 responsive-text-sm font-semibold flex items-center gap-2 hover:gap-3">
                  {lang === "zh" ? "回到頂部" : "Back to Top"}
                  <span className="text-[var(--brand-200)]">↑</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* 夫妻代孕詳細資訊 Modal */}
      {showCoupleDetail && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowCoupleDetail(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCoupleDetail(false)}
              className="sticky top-4 right-4 float-right z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200 text-slate-600 hover:text-[var(--brand)] hover:bg-[var(--brand-50)] transition-all duration-300"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-3xl mb-6 shadow-lg">
                  <HeartHandshake className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-4">
                  {lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.title : COUPLE_SURROGACY_DETAIL.en.title}
                </h2>
                <p className="text-lg text-[var(--brand)] font-semibold">
                  {lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.subtitle : COUPLE_SURROGACY_DETAIL.en.subtitle}
                </p>
              </div>

              {/* 流程總覽 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.overview.title : COUPLE_SURROGACY_DETAIL.en.overview.title}
                </h3>
                <div className="space-y-6">
                  {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.overview.phases : COUPLE_SURROGACY_DETAIL.en.overview.phases).map((phase, idx) => (
                    <div key={idx} className="p-6 glass-effect rounded-2xl border-l-4 border-[var(--brand)]">
                      <h4 className="text-xl font-bold text-[var(--brand-800)] mb-4">{phase.phase}</h4>
                      <ul className="space-y-2">
                        {phase.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-3 text-slate-600">
                            <span className="flex-shrink-0 w-2 h-2 rounded-full bg-[var(--brand)] mt-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* 三種方案 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-3 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.plans.title : COUPLE_SURROGACY_DETAIL.en.plans.title}
                </h3>
                <p className="text-[var(--brand)] font-semibold mb-6">
                  {lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.plans.subtitle : COUPLE_SURROGACY_DETAIL.en.plans.subtitle}
                </p>
                <div className="grid md:grid-cols-3 gap-6">
                  {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.plans.options : COUPLE_SURROGACY_DETAIL.en.plans.options).map((plan, idx) => (
                    <div key={idx} className="group p-6 glass-effect rounded-2xl hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-transparent hover:border-[var(--brand-50)]">
                      <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300">
                        {plan.name}
                      </h4>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">{plan.description}</p>
                      <div className="space-y-2">
                        {plan.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-sm text-slate-700">
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-1.5"></span>
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 三大保證 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.guarantees.title : COUPLE_SURROGACY_DETAIL.en.guarantees.title}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.guarantees.items : COUPLE_SURROGACY_DETAIL.en.guarantees.items).map((guarantee, idx) => (
                    <div key={idx} className="p-6 glass-effect rounded-2xl text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">
                        {idx + 1}
                      </div>
                      <h4 className="text-lg font-bold text-[var(--brand-800)] mb-2">{guarantee.title}</h4>
                      <p className="text-sm text-slate-600">{guarantee.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 時間軸 */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.timeline.title : COUPLE_SURROGACY_DETAIL.en.timeline.title}
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh.timeline.phases : COUPLE_SURROGACY_DETAIL.en.timeline.phases).map((phase, idx) => (
                    <div key={idx} className="relative p-6 glass-effect rounded-2xl">
                      <div className="absolute -top-3 left-6 px-3 py-1 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-600)] text-white text-sm font-bold rounded-full">
                        {phase.duration}
                      </div>
                      <h4 className="text-lg font-bold text-[var(--brand-800)] mb-4 mt-2">{phase.title}</h4>
                      <div className="space-y-2">
                        {phase.items.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]"></span>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-8 border-t border-slate-200">
                <a
                  href="#contact"
                  onClick={() => setShowCoupleDetail(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-600)] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span>{lang === "zh" ? "立即諮詢" : "Contact Us Now"}</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 同志代孕詳細資訊 Modal */}
      {showPartnerDetail && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowPartnerDetail(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowPartnerDetail(false)}
              className="sticky top-4 right-4 float-right z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200 text-slate-600 hover:text-[var(--brand)] hover:bg-[var(--brand-50)] transition-all duration-300"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-3xl mb-6 shadow-lg">
                  <Users2 className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-4">
                  {lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.title : PARTNER_SURROGACY_DETAIL.en.title}
                </h2>
                <p className="text-lg text-[var(--brand)] font-semibold">
                  {lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.subtitle : PARTNER_SURROGACY_DETAIL.en.subtitle}
                </p>
              </div>

              {/* 流程總覽 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? "流程" : "Process"}
                </h3>
                <div className="space-y-6">
                  {(lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.process : PARTNER_SURROGACY_DETAIL.en.process).map((step, idx) => (
                    <div key={idx} className="p-6 glass-effect rounded-2xl border-l-4 border-[var(--brand)] text-slate-700">
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              {/* 各方案詳情 */}
              {(lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.plans : PARTNER_SURROGACY_DETAIL.en.plans).map((plan, planIdx) => (
                <div key={planIdx} className="mb-12">
                  {/* 方案標題 */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-[var(--brand-50)] to-white rounded-2xl border-l-4 border-[var(--brand)]">
                    <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-3">{plan.category}</h3>
                    <div className="space-y-2">
                      <p className="text-slate-700 leading-relaxed">{plan.method}</p>
                      {plan.options && (
                        <ul className="list-disc ml-6 text-slate-600">
                          {plan.options.map((opt, optIdx) => (
                            <li key={optIdx}>{opt}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* 時程 */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-[var(--brand-800)] mb-4 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></span>
                      {lang === "zh" ? "時程" : "Timeline"}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {plan.timeline.map((time, timeIdx) => (
                        <div key={timeIdx} className="p-5 glass-effect rounded-xl border-l-4 border-[var(--brand-600)]">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="px-3 py-1 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-600)] text-white text-xs font-bold rounded-full">
                              {time.type}
                            </div>
                            <span className="text-[var(--brand)] font-bold">{time.duration}</span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{time.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* FAQ for plan */}
                  {plan.faqs && plan.faqs.length > 0 && (
                    <div className="mb-8">
                      <h4 className="text-xl font-bold text-[var(--brand-800)] mb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></span>
                        {lang === "zh" ? "常見問題" : "FAQs"}
                      </h4>
                      <div className="space-y-4">
                        {plan.faqs.map((faq, faqIdx) => (
                          <div key={faqIdx} className="p-4 glass-effect rounded-xl">
                            <div className="font-bold text-[var(--brand-800)] mb-2">Q: {faq.q}</div>
                            <div className="text-slate-600">A: {faq.a}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Divider between plans */}
                  {planIdx < (lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.plans : PARTNER_SURROGACY_DETAIL.en.plans).length - 1 && (
                    <div className="border-t-2 border-dashed border-slate-200 my-12"></div>
                  )}
                </div>
              ))}

              {/* FAQ Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? "常見問題" : "Frequently Asked Questions"}
                </h3>
                <div className="space-y-6">
                  {(lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.faqs : PARTNER_SURROGACY_DETAIL.en.faqs).map((faq, faqIdx) => (
                    <div key={faqIdx} className="p-6 glass-effect rounded-2xl hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3 flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-[var(--brand)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                          Q
                        </span>
                        <span className="flex-1">{faq.q}</span>
                      </h4>
                      <div className="ml-8 space-y-2">
                        <p className="text-slate-600 leading-relaxed">{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-8 border-t border-slate-200">
                <a
                  href="#contact"
                  onClick={() => setShowPartnerDetail(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-600)] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span>{lang === "zh" ? "立即諮詢" : "Contact Us Now"}</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      {showSingleDetail && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setShowSingleDetail(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-6xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSingleDetail(false)}
              className="sticky top-4 right-4 float-right z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-lg border border-slate-200 text-slate-600 hover:text-[var(--brand)] hover:bg-[var(--brand-50)] transition-all duration-300"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-3xl mb-6 shadow-lg">
                  <User className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-4">
                  {lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh.title : SINGLE_SURROGACY_DETAIL.en.title}
                </h2>
                <p className="text-lg text-[var(--brand)] font-semibold">
                  {lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh.subtitle : SINGLE_SURROGACY_DETAIL.en.subtitle}
                </p>
              </div>

              {/* 各方案詳情 */}
              {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh.plans : SINGLE_SURROGACY_DETAIL.en.plans).map((plan, planIdx) => (
                <div key={planIdx} className="mb-12">
                  {/* 方案標題 */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-[var(--brand-50)] to-white rounded-2xl border-l-4 border-[var(--brand)]">
                    <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-3">{plan.category}</h3>
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-[var(--brand)]">{plan.method.title}</h4>
                      <p className="text-slate-700 leading-relaxed">{plan.method.description}</p>
                    </div>
                  </div>

                  {/* 流程階段 */}
                  <div className="mb-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      {plan.phases.map((phase, phaseIdx) => (
                        <div key={phaseIdx} className="p-6 glass-effect rounded-2xl border-t-4 border-[var(--brand)]">
                          <h4 className="text-lg font-bold text-[var(--brand-800)] mb-4">{phase.phase}</h4>
                          <ul className="space-y-3">
                            {phase.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start gap-2 text-sm text-slate-600">
                                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--brand)] mt-2"></span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 時程 */}
                  <div className="mb-8">
                    <h4 className="text-xl font-bold text-[var(--brand-800)] mb-4 flex items-center gap-2">
                      <span className="w-2 h-6 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></span>
                      {lang === "zh" ? "時程" : "Timeline"}
                    </h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      {plan.timeline.map((time, timeIdx) => (
                        <div key={timeIdx} className="p-5 glass-effect rounded-xl border-l-4 border-[var(--brand-600)]">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="px-3 py-1 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-600)] text-white text-xs font-bold rounded-full">
                              {time.type}
                            </div>
                            <span className="text-[var(--brand)] font-bold">{time.duration}</span>
                          </div>
                          <p className="text-sm text-slate-600 leading-relaxed">{time.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Divider between plans */}
                  {planIdx < (lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh.plans : SINGLE_SURROGACY_DETAIL.en.plans).length - 1 && (
                    <div className="border-t-2 border-dashed border-slate-200 my-12"></div>
                  )}
                </div>
              ))}

              {/* FAQ Section */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? "常見問題" : "Frequently Asked Questions"}
                </h3>
                <div className="space-y-6">
                  {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh.faqs : SINGLE_SURROGACY_DETAIL.en.faqs).map((faq, faqIdx) => (
                    <div key={faqIdx} className="p-6 glass-effect rounded-2xl hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-lg font-bold text-[var(--brand-800)] mb-3 flex items-start gap-2">
                        <span className="flex-shrink-0 w-6 h-6 bg-[var(--brand)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                          Q
                        </span>
                        <span className="flex-1">{faq.question}</span>
                      </h4>
                      <div className="ml-8 space-y-2">
                        {faq.answer.map((ans, ansIdx) => (
                          <p key={ansIdx} className="text-slate-600 leading-relaxed">
                            {ans}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-8 border-t border-slate-200">
                <a
                  href="#contact"
                  onClick={() => setShowSingleDetail(false)}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[var(--brand)] to-[var(--brand-600)] text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <span>{lang === "zh" ? "立即諮詢" : "Contact Us Now"}</span>
                  <ArrowRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}