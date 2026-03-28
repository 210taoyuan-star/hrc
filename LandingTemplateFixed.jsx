import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as React from "react";
import { Phone, Mail, MapPin, Baby, ShieldCheck, Users2, Globe2, HeartHandshake, Languages, Sparkles, User, Heart, ArrowRight, Building2, Clock, Calendar, Stethoscope, MessageCircle, FileText } from "lucide-react";

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
  tagline: "以專業與信賴，圓您擁有孩子的夢想",
  email: "qiyunsolution@gmail.com",
  address: "台北市松山區復興北路58號10樓",
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
    src: "/images/gallery/Image.webp",
    zhAlt: "祈孕顧問插圖",
    enAlt: "Qiyun Consulting illustration",
  },
  knowledge: {
    src: "/images/gallery/iui.webp",
    srcSet: "/images/gallery/iui-480.webp 480w, /images/gallery/iui-960.webp 960w, /images/gallery/iui-1600.webp 1600w",
    sizes: "(min-width: 1024px) 340px, 80vw",
    zhAlt: "IUI 人工授精代孕知識插圖",
    enAlt: "IUI artificial insemination surrogacy knowledge illustration",
  },
  process: {
    src: "/images/gallery/ABCDE.webp",
    srcSet: "/images/gallery/ABCDE-480.webp 480w, /images/gallery/ABCDE-960.webp 960w, /images/gallery/ABCDE-1600.webp 1600w",
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
    zh: "美國試管與代孕", 
    en: "US Surrogacy Services",
    subItems: [
      { id: "ivf-services", path: "#ivf-services", zh: "夫妻或單身試管", en: "IVF Services" },
      { id: "couple-surrogacy", path: "#couple-surrogacy", zh: "夫妻代孕", en: "Couple Surrogacy" },
      { id: "lgbtq-surrogacy", path: "#lgbtq-surrogacy", zh: "同志代孕", en: "LGBTQ+ Surrogacy" },
      { id: "single-surrogacy", path: "#single-surrogacy", zh: "單身代孕", en: "Single Parent Surrogacy" }
    ]
  },
  { id: "contact", path: "#contact", zh: "聯絡", en: "Contact" },
];

const FEATURES = [
  { id: "ivf-services", icon: ShieldCheck, zh: "夫妻或單身試管", en: "IVF Services", descZh: "提供夫妻或單身人士專業試管嬰兒服務，實現生育夢想。", descEn: "Professional IVF services for couples and single individuals to achieve fertility dreams.", image: "/images/gallery/ABCDE.webp", hasDetail: true },
  { id: "couple-surrogacy", icon: HeartHandshake, zh: "夫妻代孕", en: "Couple Surrogacy", descZh: "為已婚夫妻提供專業美國試管與代孕，圓滿家庭夢想。", descEn: "Professional US surrogacy services for married couples to fulfill their family dreams.", image: "/images/gallery/parent1.webp", hasDetail: true },
  { id: "lgbtq-surrogacy", icon: Users2, zh: "同志代孕", en: "LGBTQ+ Surrogacy", descZh: "支援同志伴侶代孕需求，提供包容性專業服務。", descEn: "Supporting LGBTQ+ couples with inclusive and professional surrogacy services.", image: "/images/gallery/Boys.webp", hasDetail: true },
  { id: "single-surrogacy", icon: User, zh: "單身代孕", en: "Single Parent Surrogacy", descZh: "協助單身人士實現為人父母的夢想，提供全方位支援與陪伴。", descEn: "Helping single individuals achieve their dreams of becoming parents with comprehensive support and guidance.", image: "/images/gallery/son2.webp", hasDetail: true }
];

// 夫妻代孕詳細內容
const COUPLE_SURROGACY_DETAIL = {
  zh: {
    title: "夫妻代孕（自精自卵、捐精自卵、自精捐卵+代孕）",
    subtitle: "從評估到分娩，一站式陪伴",
    processOverview: {
      title: "流程總覽",
      phases: [
        {
          phase: "準備階段",
          items: [
            "台灣醫療體檢評估：確認夫妻精子與卵子健康狀況。",
            "美國醫院視訊問診：提供台灣體檢報告與完成美國醫療問卷、美國醫師確認符合美國試管條件後簽約。",
            "美國精子與卵子銀行選擇捐贈精子或卵子。",
            "精子與卵子遺傳基因篩查，過濾可能的遺傳疾病基因。"
          ]
        },
        {
          phase: "孕母配對階段",
          items: [
            "孕母選擇、懷孕史與健康史評估。",
            "安排雙方視訊溝通、確認彼此認同與意向。",
            "孕母通過醫療評估、心理評估，確認符合代孕條件。"
          ]
        },
        {
          phase: "法律程序階段",
          items: [
            "合同起草：代孕合同、補償金制度、應急處理、特殊醫療費用列表",
            "雙方律師審查、合約談判、確認合約",
            "正式簽約:律師公證、支付代孕費用、信託管理"
          ]
        },
        {
          phase: "試管（IVF）醫療階段",
          items: [
            "取精取卵：女性（自卵或捐卵）按醫師指示週期前赴美、自精男士需在卵子取出前2天赴美",
            "體外人工受精：受精與胚胎培養（一周）",
            "胚胎基因篩檢：進行胚胎染色體篩檢（PGS／PGT-A）、等級分類。",
            "胚胎植入：選擇植入胚胎、孕母週期前至醫院進行內膜準備後植入。",
            "著床監測：植入後第10-12天，赴醫院進行HCG抽血驗孕，確認是否成功懷孕。",
            "胎心監測： 植入6周監測到胎心、孕母就固定在其居住地進行後續產檢。"
          ]
        },
        {
          phase: "代孕階段",
          items: [
            "定期產檢： 定期提供產檢狀況與報告、大排畸檢查與結果。",
            "親權判決：律師向法院提出親權認定，法院判決孩子歸屬准父母所有。",
            "分娩前準備：孕母預產期前兩周抵達美國，居住地以孕母分娩醫院附近之酒店。",
            "產後照顧：完成分娩後，寶寶可安排在月子中心或月嫂協助照顧。",
            "返國文件準備： 完成反台必要之法律文件，入境台灣即可設籍。"
          ]
        }
      ],
      timeEstimate: {
        title: "流程所需時間預估",
        phases: [
          { phase: "準備階段", duration: "3~4個月" },
          { phase: "孕母配對階段", duration: "3~5個月" },
          { phase: "法律程序階段", duration: "1個月" },
          { phase: "試管IVF階段", duration: "3~5個月" },
          { phase: "代孕階段", duration: "10個月" }
        ]
      }
    }
  },
  en: {
    title: "Couple Surrogacy (Own Sperm+Egg+Surrogate)(Donor Sperm+Egg+Surrogate)(Own Sperm+Donor Egg+Surrogate)",
    subtitle: "Comprehensive support from assessment to delivery",
    overview: {
      title: "Process Overview",
      phases: [
        {
          phase: "Preparation Phase",
          items: [
            "Taiwan medical evaluation: Confirm sperm and egg health status of the couple.",
            "US clinic video consultation: Provide Taiwan medical reports and complete US medical questionnaire, sign contract after US physician confirms eligibility for US IVF.",
            "US sperm and egg bank selection for donor sperm or eggs.",
            "Genetic screening of sperm and eggs to filter potential genetic diseases."
          ]
        },
        {
          phase: "Surrogate Matching Phase",
          items: [
            "Surrogate selection, pregnancy history and health history assessment.",
            "Arrange video communication between both parties, confirm mutual acceptance and intentions.",
            "Surrogate passes medical evaluation, psychological assessment, confirms eligibility for surrogacy."
          ]
        },
        {
          phase: "Legal Process Phase",
          items: [
            "Contract drafting: Surrogacy contract, compensation system, emergency procedures, special medical expense list",
            "Legal review by both parties' attorneys, contract negotiation, contract confirmation",
            "Official signing: Attorney notarization, surrogacy fee payment, trust management"
          ]
        },
        {
          phase: "IVF Medical Phase",
          items: [
            "Sperm/egg retrieval: Women (own or donor eggs) travel to US before cycle as instructed; men providing sperm need to arrive 2 days before egg retrieval",
            "In vitro fertilization: Fertilization and embryo culture (one week)",
            "Embryo genetic screening: Chromosomal screening (PGS/PGT-A), grading classification.",
            "Embryo transfer: Select embryos for transfer, surrogate prepares endometrium at clinic before transfer.",
            "Implantation monitoring: 10-12 days after transfer, HCG blood test at clinic to confirm pregnancy.",
            "Fetal heartbeat monitoring: After detecting heartbeat at 6 weeks, surrogate continues prenatal care at her residence."
          ]
        },
        {
          phase: "Surrogacy Phase",
          items: [
            "Regular prenatal checkups: Regular provision of prenatal status and reports, major anomaly screenings and results.",
            "Parental rights judgment: Attorney files parental rights recognition with court, court decides child belongs to intended parents.",
            "Pre-delivery preparation: Surrogate arrives in US two weeks before due date, stays at hotel near delivery hospital.",
            "Postpartum care: After delivery, baby can be arranged for confinement center or nanny care.",
            "Return documentation: Complete necessary legal documents for return to Taiwan, can register upon entry to Taiwan."
          ]
        }
      ]
    },
    timeEstimate: {
      title: "Process Time Estimation",
      phases: [
        {
          phase: "Preparation Phase",
          duration: "3-4 months"
        },
        {
          phase: "Surrogate Matching Phase",
          duration: "3-5 months"
        },
        {
          phase: "Legal Process Phase",
          duration: "1 month"
        },
        {
          phase: "IVF Phase",
          duration: "3-5 months"
        },
        {
          phase: "Surrogacy Phase",
          duration: "10 months"
        }
      ]
    },



  }
};

// 試管嬰兒服務詳細內容
const IVF_SERVICES_DETAIL = {
  zh: {
    title: "夫妻試管（自精自卵、捐精自卵、自精捐卵）",
    subtitle: "單身女性（捐精自卵）",
    processOverview: {
      title: "流程總覽",
      phases: [
        {
          phase: "準備階段",
          items: [
            "台灣醫療體檢評估：確認精子與卵子健康狀況與子宮懷孕條件；單身女性卵子健康狀況與子宮懷孕條件。",
            "美國醫院視訊問診：提供台灣體檢報告與完成美國醫療問卷、美國醫師確認符合美國試管條件後簽約。",
            "美國精子與卵子銀行選擇捐贈精子或卵子。",
            "精子與卵子遺傳基因篩查（約4周），過濾可能的遺傳疾病基因。"
          ]
        },
        {
          phase: "試管（IVF）階段",
          items: [
            "取精取卵：女性（自卵或捐卵）按醫師指示週期前赴美、自精男士需在卵子取出前2天赴美",
            "體外受精與胚胎培養（一周）。",
            "胚胎基因篩檢：胚胎染色體篩檢（PGS／PGT-A）、等級分類。",
            "選擇植入的胚胎，自懷女士週期前到美國進行內膜準備後植入。",
            "著床監測：植入後第10-12天，赴醫院進行HCG抽血驗孕，確認是否成功懷孕。",
            "胎心監測：植入6周監測到胎心便可"
          ]
        }
      ],
      timeEstimate: {
        title: "流程所需時間預估",
        phases: [
          { phase: "前期準備階段", duration: "3~4個月" },
          { phase: "試管IVF階段", duration: "3-5個月", note: "（含胚胎準備與後續植入安排）" }
        ]
      }
    }
  },
  en: {
    title: "IVF Services (Own/Donor Sperm & Eggs)",
    subtitle: "Single Women (Donor Sperm)",
    processOverview: {
      title: "Process Overview",
      phases: [
        {
          phase: "Preparation Phase",
          items: [
            "Taiwan medical examination assessment: Confirm sperm and egg health status and uterine pregnancy conditions; for single women, egg health status and uterine pregnancy conditions.",
            "US hospital video consultation: Provide Taiwan medical reports and complete US medical questionnaire, US physician confirms eligibility for US IVF treatment before signing contract.",
            "US sperm and egg bank selection for donor sperm or eggs.",
            "Sperm and egg genetic screening (about 4 weeks) to filter potential genetic disease genes."
          ]
        },
        {
          phase: "IVF Phase",
          items: [
            "Sperm/egg retrieval: Women (own or donor eggs) travel to US before cycle as instructed; men providing sperm need to arrive 2 days before egg retrieval",
            "In vitro fertilization and embryo culture (one week).",
            "Embryo genetic screening: chromosomal screening (PGS/PGT-A), grading classification.",
            "Select embryos for transfer, self-carrying women travel to US before cycle for endometrial preparation and transfer.",
            "Implantation monitoring: 10-12 days after transfer, HCG blood test at hospital to confirm pregnancy.",
            "Fetal heartbeat monitoring: Can proceed after detecting heartbeat at 6 weeks"
          ]
        }
      ],
      timeEstimate: {
        title: "Process Time Estimation",
        phases: [
          { phase: "Preparation Phase", duration: "3-4 months" },
          { phase: "IVF Phase", duration: "3-5 months", note: "(including embryo preparation and subsequent transfer arrangements)" }
        ]
      }
    }
  }
};

// 同志代孕詳細內容
const PARTNER_SURROGACY_DETAIL = {
  zh: {
    title: "男同志伴侶代孕（自精+捐卵+代孕）\n女同志伴侶代孕（捐精+自卵+代孕）",
    subtitle: "多元家庭的美國生育解決方案",
    overview: {
      title: "流程總覽",
      phases: [
        {
          phase: "準備階段",
          items: [
            "台灣醫療體檢評估：確認精子與卵子健康狀況。",
            "美國醫院視訊問診：提供台灣體檢報告與完成美國醫療問卷、美國醫師確認符合美國試管條件後簽約。",
            "美國精子與卵子銀行選擇捐精或捐卵。",
            "精子與卵子遺傳基因篩查，過濾可能的遺傳疾病。"
          ]
        },
        {
          phase: "孕母配對階段",
          items: [
            "孕母選擇、懷孕史與健康史評估。",
            "安排雙方視訊溝通、確認彼此認同與意向。",
            "孕母通過醫療評估、心理評估，確認符合代孕條件。"
          ]
        },
        {
          phase: "法律程序階段",
          items: [
            "合同起草：代孕合同、補償金制度、應急處理、特殊醫療費用列表",
            "雙方律師審查、合約談判、確認合約",
            "正式簽約:律師公證、支付代孕費用、信託管理"
          ]
        },
        {
          phase: "試管（IVF）醫療階段",
          items: [
            "取精取卵：女性（自卵或捐卵）按醫師指示週期前赴美、自精男士需在卵子取出前2天赴美",
            "體外人工受精：受精與胚胎培養（一周）",
            "胚胎基因篩檢：進行胚胎染色體篩檢（PGS／PGT-A）、等級分類。",
            "胚胎植入：選擇植入胚胎、孕母週期前至醫院進行內膜準備後植入。",
            "著床監測：植入後第10-12天，赴醫院進行HCG抽血驗孕，確認是否成功懷孕。",
            "胎心監測： 植入6周監測到胎心、孕母就固定在其居住地進行後續產檢。"
          ]
        },
        {
          phase: "代孕階段",
          items: [
            "定期產檢： 定期提供產檢狀況與報告、大排畸檢查與結果。",
            "親權判決：律師向法院提出親權認定，法院判決孩子歸屬准父母所有。",
            "分娩前準備：孕母預產期前兩周抵達美國，居住地以孕母分娩醫院附近之酒店。",
            "產後照顧：完成分娩後，寶寶可安排在月子中心或月嫂協助照顧。",
            "返國文件準備： 完成反台必要之法律文件，入境台灣即可設籍。"
          ]
        }
      ]
    },
    timeEstimate: {
      title: "流程所需時間預估",
      phases: [
        {
          phase: "準備階段",
          duration: "3~4個月"
        },
        {
          phase: "孕母配對階段",
          duration: "3~5個月"
        },
        {
          phase: "法律程序階段",
          duration: "1個月"
        },
        {
          phase: "試管IVF階段",
          duration: "3~5個月"
        },
        {
          phase: "代孕階段",
          duration: "10個月"
        }
      ]
    }
  },
  en: {
    title: "Male Same-Sex Surrogacy (Own Sperm+Donor Egg+Surrogate)\nFemale Same-Sex Surrogacy (Donor Sperm+Own Egg+Surrogate)",
    subtitle: "US fertility solutions for diverse families",
    overview: {
      title: "Process Overview",
      phases: [
        {
          phase: "Preparation Phase",
          items: [
            "Taiwan medical evaluation: Confirm sperm and egg health conditions.",
            "US clinic video consultation: Provide Taiwan medical reports and complete US medical questionnaire, sign contract after US physician confirms eligibility.",
            "US sperm and egg banks selection for donor sperm or eggs.",
            "Genetic screening of sperm and eggs to filter potential genetic diseases."
          ]
        },
        {
          phase: "Surrogate Matching Phase",
          items: [
            "Surrogate selection, pregnancy and health history evaluation.",
            "Arrange video communication between both parties, confirm mutual agreement and intentions.",
            "Surrogate passes medical evaluation and psychological assessment, confirming suitability for surrogacy."
          ]
        },
        {
          phase: "Legal Process Phase",
          items: [
            "Contract drafting: surrogacy contract, compensation system, emergency handling, special medical expense list",
            "Lawyers from both parties review, contract negotiation, contract confirmation",
            "Official signing: lawyer notarization, surrogacy payment, trust management"
          ]
        },
        {
          phase: "IVF Medical Phase",
          items: [
            "Sperm/egg retrieval: Women (own or donor eggs) travel to US before cycle as instructed; men providing sperm need to arrive 2 days before egg retrieval",
            "In vitro fertilization: fertilization and embryo culture (one week)",
            "Embryo genetic screening: chromosomal screening (PGS/PGT-A), grading classification.",
            "Embryo transfer: select embryos for transfer, surrogate prepares endometrium at hospital before transfer.",
            "Implantation monitoring: 10-12 days after transfer, HCG blood test at hospital to confirm pregnancy.",
            "Fetal heartbeat monitoring: After detecting heartbeat at 6 weeks, surrogate continues prenatal care at her location."
          ]
        },
        {
          phase: "Surrogacy Phase",
          items: [
            "Regular prenatal checkups: Regular provision of prenatal examination status and reports, major anomaly screening and results.",
            "Parental rights judgment: Lawyer submits parental rights determination to court, court rules child belongs to intended parents.",
            "Pre-delivery preparation: Surrogate arrives in US two weeks before due date, staying at hotel near delivery hospital.",
            "Postpartum care: After delivery, baby can be arranged at confinement center or with postpartum care assistance.",
            "Return documents preparation: Complete necessary legal documents for return to Taiwan, can register upon entry to Taiwan."
          ]
        }
      ]
    },
    timeEstimate: {
      title: "Process Time Estimation",
      phases: [
        {
          phase: "Preparation Phase",
          duration: "3-4 months"
        },
        {
          phase: "Surrogate Matching Phase",
          duration: "3-5 months"
        },
        {
          phase: "Legal Process Phase",
          duration: "1 month"
        },
        {
          phase: "IVF Phase",
          duration: "3-5 months"
        },
        {
          phase: "Surrogacy Phase",
          duration: "10 months"
        }
      ]
    }
  }
};

// 單身代孕詳細內容
const SINGLE_SURROGACY_DETAIL = {
  zh: {
    title: "單身男士（自精捐卵+代孕）\n單身女士（捐精自卵+代孕）",
    subtitle: "為單身人士提供完整的生育解決方案",
    plans: [
      {
        category: "單身男士（自精捐卵+代孕）",
        description: "適合需要捐卵和代孕服務的單身男性"
      },
      {
        category: "單身女士（捐精自卵+代孕）",
        description: "適合需要捐精和代孕服務的單身女性"
      }
    ],
    processOverview: {
      title: "流程總覽",
      phases: [
        {
          phase: "準備階段",
          items: [
            "台灣醫療體檢評估：確認精子與卵子健康狀況。",
            "美國醫院視訊問診：提供台灣體檢報告與完成美國醫療問卷、美國醫師確認符合美國試管條件後簽約。",
            "美國精子與卵子銀行選擇捐精或捐卵。",
            "精子與卵子遺傳基因篩查，過濾可能的遺傳疾病。"
          ]
        },
        {
          phase: "孕母配對階段",
          items: [
            "孕母選擇、懷孕史與健康史評估",
            "安排雙方視訊溝通、確認彼此認同與意向。",
            "孕母通過醫療評估、心理評估，確認符合代孕條件。"
          ]
        },
        {
          phase: "法律程序階段",
          items: [
            "合同起草：代孕合同、補償金制度、應急處理、特殊醫療費用列表",
            "雙方律師審查、合約談判、確認合約",
            "正式簽約:律師公證、支付代孕費用、信託管理"
          ]
        },
        {
          phase: "試管（IVF）醫療階段",
          items: [
            "取精取卵：女性（自卵或捐卵）按醫師指示週期前赴美、自精男士需在卵子取出前2天赴美",
            "體外人工受精：受精與胚胎培養（一周）",
            "胚胎基因篩檢：進行胚胎染色體篩檢（PGS／PGT-A）、等級分類。",
            "胚胎植入：選擇植入胚胎、孕母週期前至醫院進行內膜準備後植入。",
            "著床監測：植入後第10-12天，赴醫院進行HCG抽血驗孕，確認是否成功懷孕。",
            "胎心監測： 植入6周監測到胎心、孕母就固定在其居住地進行後續產檢。"
          ]
        },
        {
          phase: "代孕階段",
          items: [
            "定期產檢： 定期提供產檢狀況與報告、大排畸檢查與結果。",
            "親權判決：律師向法院提出親權認定，法院判決孩子歸屬准父母所有。",
            "分娩前準備：孕母預產期前兩周抵達美國，居住地以孕母分娩醫院附近之酒店。",
            "產後照顧：完成分娩後，寶寶可安排在月子中心或月嫂協助照顧。",
            "返國文件準備： 完成反台必要之法律文件，入境台灣即可設籍。"
          ]
        }
      ],
      timeEstimate: {
        title: "流程所需時間預估",
        phases: [
          { phase: "準備階段", duration: "3~4個月" },
          { phase: "孕母配對階段", duration: "3~5個月" },
          { phase: "法律程序階段", duration: "1個月" },
          { phase: "試管IVF階段", duration: "3~5個月" },
          { phase: "代孕階段", duration: "10個月" }
        ]
      }
    },
    faqs: []
  },
  en: {
    title: "Single Male (Own Sperm + Egg Donor + Surrogate)\nSingle Female (Sperm Donor + Own Egg + Surrogate)",
    subtitle: "Complete fertility solutions for single individuals",
    plans: [
      {
        category: "Single Male (Own Sperm + Egg Donor + Surrogate)",
        description: "Suitable for single men who need egg donor and surrogacy services"
      },
      {
        category: "Single Female (Sperm Donor + Own Egg + Surrogate)",
        description: "Suitable for single women who need sperm donor and surrogacy services"
      }
    ],
    processOverview: {
      title: "Process Overview",
      phases: [
        {
          phase: "Preparation Phase",
          items: [
            "Taiwan medical examination assessment: Confirm sperm and egg health status.",
            "US hospital video consultation: Provide Taiwan medical reports and complete US medical questionnaire, US physician confirms eligibility for US IVF treatment before signing contract.",
            "US sperm and egg bank selection for sperm donation or egg donation.",
            "Sperm and egg genetic screening to filter potential genetic diseases."
          ]
        },
        {
          phase: "Surrogate Matching Phase",
          items: [
            "Surrogate selection, pregnancy history and health history assessment",
            "Arrange video communication between both parties, confirm mutual understanding and intentions.",
            "Surrogate passes medical evaluation and psychological assessment, confirming suitability for surrogacy."
          ]
        },
        {
          phase: "Legal Process Phase",
          items: [
            "Contract drafting: surrogacy contract, compensation system, emergency handling, special medical expense list",
            "Lawyers from both parties review, contract negotiation, contract confirmation",
            "Official signing: lawyer notarization, surrogacy payment, trust management"
          ]
        },
        {
          phase: "IVF Medical Phase",
          items: [
            "Sperm/egg retrieval: Women (own or donor eggs) travel to US before cycle as instructed; men providing sperm need to arrive 2 days before egg retrieval",
            "In vitro fertilization: fertilization and embryo culture (one week)",
            "Embryo genetic screening: chromosomal screening (PGS/PGT-A), grading classification.",
            "Embryo transfer: select embryos for transfer, surrogate prepares endometrium at hospital before transfer.",
            "Implantation monitoring: 10-12 days after transfer, HCG blood test at hospital to confirm pregnancy.",
            "Fetal heartbeat monitoring: After detecting heartbeat at 6 weeks, surrogate continues prenatal care at her location."
          ]
        },
        {
          phase: "Surrogacy Phase",
          items: [
            "Regular prenatal checkups: Regular provision of prenatal examination status and reports, major anomaly screening and results.",
            "Parental rights judgment: Lawyer submits parental rights determination to court, court rules child belongs to intended parents.",
            "Pre-delivery preparation: Surrogate arrives in US two weeks before due date, staying at hotel near delivery hospital.",
            "Postpartum care: After delivery, baby can be arranged at confinement center or with postpartum care assistance.",
            "Return documents preparation: Complete necessary legal documents for return to Taiwan, can register upon entry to Taiwan."
          ]
        }
      ],
      timeEstimate: {
        title: "Process Time Estimation",
        phases: [
          { phase: "Preparation Phase", duration: "3-4 months" },
          { phase: "Surrogate Matching Phase", duration: "3-5 months" },
          { phase: "Legal Process Phase", duration: "1 month" },
          { phase: "IVF Phase", duration: "3-5 months" },
          { phase: "Surrogacy Phase", duration: "10 months" }
        ]
      }
    },
    faqs: []
  }
};

// Detailed Surrogacy Process Timeline
const DETAILED_PROCESS = [
  {
    phase: "準備階段",
    phaseEn: "Preparation Phase",
    duration: "3-4個月",
    durationEn: "3-4 months",
    steps: [
      {
        title: "台灣醫療體檢評估",
        titleEn: "Taiwan Medical Examination",
        description: "確認精子與卵子健康狀況",
        descriptionEn: "Confirm sperm and egg health status"
      },
      {
        title: "美國醫院視訊問診",
        titleEn: "US Hospital Video Consultation",
        description: "提供台灣體檢報告與完成美國醫療問卷、美國醫師確認符合美國試管條件後簽約",
        descriptionEn: "Provide Taiwan medical reports and complete US medical questionnaire, sign contract after US doctor confirms IVF eligibility"
      },
      {
        title: "美國精子與卵子銀行選擇",
        titleEn: "US Sperm & Egg Bank Selection",
        description: "捐精或捐卵選擇",
        descriptionEn: "Sperm or egg donor selection"
      },
      {
        title: "遺傳基因篩查",
        titleEn: "Genetic Screening",
        description: "精子與卵子遺傳基因篩查，過濾可能的遺傳疾病",
        descriptionEn: "Genetic screening of sperm and eggs to filter potential hereditary diseases"
      }
    ]
  },
  {
    phase: "孕母配對階段",
    phaseEn: "Surrogate Matching Phase",
    duration: "3-5個月",
    durationEn: "3-5 months",
    steps: [
      {
        title: "孕母選擇",
        titleEn: "Surrogate Selection",
        description: "孕母選擇、懷孕史與健康史評估",
        descriptionEn: "Surrogate selection, pregnancy history and health history assessment"
      },
      {
        title: "雙方溝通",
        titleEn: "Communication Setup",
        description: "安排雙方視訊溝通、確認彼此認同與意向",
        descriptionEn: "Arrange video communication between both parties, confirm mutual understanding and intentions"
      },
      {
        title: "資格確認",
        titleEn: "Qualification Confirmation", 
        description: "孕母通過醫療評估、心理評估，確認符合代孕條件",
        descriptionEn: "Surrogate passes medical evaluation and psychological assessment, confirming suitability for surrogacy"
      }
    ]
  },
  {
    phase: "法律程序階段",
    phaseEn: "Legal Process Phase",
    duration: "1個月",
    durationEn: "1 month",
    steps: [
      {
        title: "合同起草",
        titleEn: "Contract Drafting",
        description: "代孕合同、補償金制度、應急處理、特殊醫療費用列表",
        descriptionEn: "Surrogacy contract, compensation system, emergency handling, special medical expense list"
      },
      {
        title: "律師審查",
        titleEn: "Legal Review",
        description: "雙方律師審查、合約談判、確認合約",
        descriptionEn: "Lawyers from both parties review, contract negotiation, contract confirmation"
      },
      {
        title: "正式簽約",
        titleEn: "Contract Execution",
        description: "律師公證、支付代孕費用、信託管理",
        descriptionEn: "Lawyer notarization, surrogacy payment, trust management"
      }
    ]
  },
  {
    phase: "試管（IVF）醫療階段",
    phaseEn: "IVF Medical Phase", 
    duration: "3~5個月",
    durationEn: "3-5 months",
    steps: [
      {
        title: "取精取卵",
        titleEn: "Sperm/Egg Retrieval",
        description: "女性（自卵或捐卵）按醫師指示週期前赴美、自精男士需在卵子取出前2天赴美",
        descriptionEn: "Women (own or donor eggs) travel to US before cycle as instructed; men providing sperm need to arrive 2 days before egg retrieval"
      },
      {
        title: "體外人工受精",
        titleEn: "In Vitro Fertilization",
        description: "受精與胚胎培養（一周）",
        descriptionEn: "Fertilization and embryo culture (one week)"
      },
      {
        title: "胚胎基因篩檢",
        titleEn: "Embryo Genetic Screening",
        description: "進行胚胎染色體篩檢（PGS／PGT-A）、等級分類",
        descriptionEn: "Chromosomal screening (PGS/PGT-A), grading classification"
      },
      {
        title: "胚胎植入",
        titleEn: "Embryo Transfer",
        description: "選擇植入胚胎、孕母週期前至醫院進行內膜準備後植入",
        descriptionEn: "Select embryos for transfer, surrogate prepares endometrium at hospital before transfer"
      },
      {
        title: "著床監測",
        titleEn: "Implantation Monitoring",
        description: "植入後第10-12天，赴醫院進行HCG抽血驗孕，確認是否成功懷孕",
        descriptionEn: "10-12 days after transfer, HCG blood test at hospital to confirm pregnancy"
      },
      {
        title: "胎心監測",
        titleEn: "Fetal Heartbeat Monitoring",
        description: "植入6周監測到胎心、孕母就固定在其居住地進行後續產檢",
        descriptionEn: "After detecting heartbeat at 6 weeks, surrogate continues prenatal care at her location"
      }
    ]
  },
  {
    phase: "代孕階段",
    phaseEn: "Surrogacy Phase",
    duration: "10個月",
    durationEn: "10 months",
    steps: [
      {
        title: "定期產檢",
        titleEn: "Regular Prenatal Checkups",
        description: "定期提供產檢狀況與報告、大排畸檢查與結果",
        descriptionEn: "Regular provision of prenatal examination status and reports, major anomaly screening and results"
      },
      {
        title: "親權判決",
        titleEn: "Parental Rights Judgment",
        description: "律師向法院提出親權認定，法院判決孩子歸屬准父母所有",
        descriptionEn: "Lawyer submits parental rights determination to court, court rules child belongs to intended parents"
      },
      {
        title: "分娩前準備",
        titleEn: "Pre-delivery Preparation",
        description: "孕母預產期前兩周抵達美國，居住地以孕母分娩醫院附近之酒店",
        descriptionEn: "Surrogate arrives in US two weeks before due date, staying at hotel near delivery hospital"
      },
      {
        title: "產後照顧",
        titleEn: "Postpartum Care",
        description: "完成分娩後，寶寶可安排在月子中心或月嫂協助照顧",
        descriptionEn: "After delivery, baby can be arranged at confinement center or with postpartum care assistance"
      },
      {
        title: "返國文件準備",
        titleEn: "Return Documents Preparation",
        description: "完成反台必要之法律文件，入境台灣即可設籍",
        descriptionEn: "Complete necessary legal documents for return to Taiwan, can register upon entry to Taiwan"
      }
    ]
  }
];








const FAQS = [];

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
  const [showIvfDetail, setShowIvfDetail] = useState(false);
  const [showLineQR, setShowLineQR] = useState(false);

  const t = useMemo(() => ({
    heroTitle: {
      zh: "以專業與信賴，陪您迎接新生命的到來",
      en: "Professional, compassionate support for your family journey",
    },
    heroCTA: { zh: "免費諮詢", en: "Free Consultation" },
    heroSub: {
      zh: BRAND.tagline || "高信任、可落地的跨國生育顧問服務",
      en: BRAND.tagline || "Trusted, end‑to‑end cross‑border fertility consulting",
    },
    servicesTitle: { zh: "祈孕顧問．美國試管與代孕諮詢", en: "Qiyun Consulting · Services" },
    processTitle: { zh: "流程", en: "Process" },
    contactTitle: { zh: "聯絡我們", en: "Get In Touch" },
    formName: { zh: "您的姓名", en: "Your Name" },
    formEmail: { zh: "Email", en: "Email" },
    formPhone: { zh: "聯絡電話", en: "Phone Number" },
    formLineId: { zh: "您的 LINE ID", en: "Your LINE ID" },
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
    const pageTitle = lang === 'zh' ? `${BRAND.name}｜美國試管與代孕專家` : `${BRAND.name} | US Surrogacy Services`;
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

  // Contact form - Using Formspree for reliable email delivery
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = React.useRef(null);

  useEffect(() => {
    if (sent && typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", "conversion", { send_to: "AW-17757916409/1TLRCPbFrsYbEPmZ0ZNC" });
    }
  }, [sent]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const fd = new FormData(formRef.current);
      
      // 調試：輸出所有表單數據
      console.log("Form data keys:", Array.from(fd.keys()));
      
      const hp = (fd.get("hp") || ""); // honeypot
      if (hp.trim().length > 0) {
        console.log("Honeypot triggered - spam detected");
        setSent(true);
        formRef.current?.reset();
        return;
      }

      // 驗證必填欄位
      const name = fd.get("name");
      const email = fd.get("email");
      const phone = fd.get("phone");
      const message = fd.get("message");
      
      if (!name || !email || !phone || !message) {
        console.error("Missing required fields:", { name, email, phone, message });
        alert("Please fill in all required fields");
        return;
      }

      console.log("Submitting to Formspree:", { name, email, phone });

      // 使用 Formspree 發送表單到 qiyunsolution@gmail.com
      // 添加郵件目標地址和回信地址
      fd.append("_to", "qiyunsolution@gmail.com");
      fd.append("_replyto", email); // 使用提交者的 email 作為回信地址
      
      const res = await fetch("https://formspree.io/f/mwpanbkk", { 
        method: "POST", 
        headers: { "Accept": "application/json" }, 
        body: fd 
      });

      console.log("Formspree response status:", res.status);
      const responseData = await res.json();
      console.log("Formspree response:", responseData);

      if (res.ok) { 
        setSent(true); 
        formRef.current?.reset(); 
        console.log("✓ Form submitted successfully via Formspree");
      } else {
        console.error("✗ Form submission failed:", res.status, responseData);
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("✗ Form submission error:", error);
      alert("Error submitting form: " + error.message);
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
      ? "祈孕顧問提供專業美國試管與代孕，包含夫妻代孕、同志代孕等，擁有合法醫療聯盟與一對一專屬顧問服務。"
      : "Qi Yun Consulting provides professional US surrogacy services, including couple and LGBTQ+ surrogacy, with legal medical alliance and one-on-one dedicated consulting services.",
    "url": typeof window !== 'undefined' ? window.location.origin : 'https://qiyun.com.tw',
    "logo": typeof window !== 'undefined' ? `${window.location.origin}/images/logos/logo.png` : 'https://qiyun.com.tw/images/logos/logo.png',
    "contactPoint": {
      "@type": "ContactPoint",
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
      ? "以專業與信賴，圓您擁有孩子的夢想。提供美國合法代孕、一對一專屬顧問服務。"
      : "With professionalism and warmth, we accompany you in welcoming new life. Providing legal US surrogacy and one-on-one dedicated consulting services.",
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
      lang === 'zh' ? "專業醫療" : "Professional Medical Services"
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
        <div className={cx("mx-auto max-w-7xl px-3 sm:px-6 flex items-center", scrolled ? "h-16 sm:h-18" : "h-18 sm:h-20")}>
          {/* Mobile 版佈局：Logo 居左，Menu 按鈕居右 */}
          <div className="lg:hidden flex items-center justify-between w-full">
            {/* Logo - 左側，超小尺寸橫向一行 */}
            <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-white/85 to-white/75 backdrop-blur-md px-2 py-1 shadow-sm border border-white/30">
              <div className="relative">
                <div className="w-4 h-4 rounded-md bg-gradient-to-br from-[var(--brand)] to-[var(--brand-700)] flex items-center justify-center shadow-sm">
                  <Baby className="h-2.5 w-2.5 text-white drop-shadow-sm" />
                </div>
                <div className="absolute inset-0 w-4 h-4 rounded-md bg-gradient-to-br from-[var(--brand)]/10 to-transparent blur-sm"></div>
              </div>
              <span className="font-medium tracking-tight text-xs bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand-600)] bg-clip-text text-transparent leading-none">{BRAND.name}</span>
            </div>
            
            {/* Menu Button - 右側，加上文字 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[var(--brand)] shadow-xl text-white hover:bg-[var(--brand-700)] hover:scale-105 transition-all duration-300 active:scale-95"
              aria-label="選單"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
              <span className="text-sm font-semibold">
                {mobileMenuOpen ? (lang === "zh" ? "關閉" : "Close") : "Menu"}
              </span>
            </button>
          </div>

          {/* Desktop 版佈局：原來的三欄式設計 */}
          <div className="hidden lg:flex items-center justify-between w-full">
            {/* 佔位空間 */}
            <div className="w-20"></div>
            
            {/* 中央 Logo - 完全橫向單行設計 */}
            <div className="flex flex-row items-center gap-2.5 rounded-2xl bg-gradient-to-r from-white/95 to-white/85 backdrop-blur-xl px-4 py-2.5 shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300 whitespace-nowrap">
              {/* 圖標 */}
              <div className="flex-shrink-0 w-7 h-7 rounded-xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-700)] flex items-center justify-center shadow-md transform hover:scale-105 transition-all duration-300">
                <Baby className="h-4 w-4 text-white drop-shadow-sm" />
              </div>
              
              {/* 品牌名稱 */}
              <span className="flex-shrink-0 font-bold text-sm bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand-600)] bg-clip-text text-transparent">{BRAND.name}</span>
            </div>
            
            {/* 語言切換按鈕 - 桌面版保留 */}
            <div className="flex items-center gap-4">
              {/* Desktop Navigation */}
              <nav className="flex items-center gap-3 text-sm font-semibold rounded-2xl glass-effect px-6 py-2 shadow-lg">{NAV.map((n) => {
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
              
              {/* 語言切換按鈕 - 桌面版 */}
              <button
                onClick={() => setLang(lang === "zh" ? "en" : "zh")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl btn-gradient text-white hover:scale-105 transition-all duration-300 shadow-lg text-sm font-medium"
              >
                <Languages className="h-4 w-4" />
                <span>{lang === "zh" ? "EN" : "中文"}</span>
              </button>
            </div>
          </div>
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
        
        {/* Sidebar - 更現代化設計 */}
        <div className={cx(
          "absolute left-0 top-0 h-full w-80 max-w-[90vw] bg-white shadow-2xl transition-transform duration-500 flex flex-col border-r-4 border-[var(--brand)]",
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          {/* Sidebar Header - 美化設計 */}
          <div className="flex items-center justify-between p-6 border-b-2 border-[var(--brand-200)] bg-gradient-to-br from-[var(--brand-50)] via-white to-[var(--brand-25)]">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                {/* 美化的側邊選單圖標 */}
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--brand)] to-[var(--brand-700)] flex items-center justify-center shadow-xl transform hover:scale-105 transition-all duration-300">
                    <Baby className="h-7 w-7 text-white drop-shadow-sm" />
                  </div>
                  {/* 裝飾性外框 */}
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[var(--brand)]/30 to-transparent blur-sm"></div>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-2xl bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-[var(--brand-600)] bg-clip-text text-transparent drop-shadow-sm">{BRAND.name}</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <div className="w-2 h-2 rounded-full bg-[var(--brand)] shadow-sm"></div>
                    <span className="text-sm text-slate-600 font-semibold">{lang === "zh" ? "專業諮詢服務" : "Professional Consulting"}</span>
                  </div>
                </div>
              </div>

            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-2xl bg-white hover:bg-[var(--brand)] text-slate-600 hover:text-white transition-all duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Sidebar Navigation - 垂直單欄排列 */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-3">
            {NAV.map((n) => {
              const isActive = active === n.id;
              
              // 如果有子項目，渲染可展開的項目
              if (n.subItems) {
                return (
                  <div key={n.id} className="w-full">
                    <a
                      href={n.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cx(
                        "w-full flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg border-2 min-h-[58px]",
                        isActive
                          ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-lg"
                          : "text-slate-700 border-slate-200 hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)]"
                      )}
                    >
                      <span className="flex-1 text-left">{n[lang]}</span>
                      <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>
                    
                    {/* 子項目 */}
                    <div className="mt-2 ml-4 space-y-2">
                      {n.subItems.map((subItem) => (
                        <a
                          key={subItem.id}
                          href={subItem.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block w-full px-4 py-3 text-base text-slate-600 hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)] rounded-xl transition-colors duration-200 border border-slate-100 hover:border-[var(--brand-200)]"
                        >
                          {subItem[lang]}
                        </a>
                      ))}
                    </div>
                  </div>
                );
              }
              
              // 一般導航項目 - 垂直單欄排列
              return (
                <a
                  key={n.id}
                  href={n.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cx(
                    "w-full flex items-center px-5 py-4 rounded-2xl transition-all duration-300 font-semibold text-lg border-2 min-h-[58px]",
                    isActive
                      ? "bg-[var(--brand)] text-white border-[var(--brand)] shadow-lg"
                      : "text-slate-700 border-slate-200 hover:border-[var(--brand-300)] hover:bg-[var(--brand-50)] hover:text-[var(--brand-800)]"
                  )}
                >
                  <span className="flex-1 text-left">{n[lang]}</span>
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

      {/* Hero Section with Illustration */}
      <section id="hero" className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-br from-white via-[var(--brand-50)]/30 to-white">
        <div className="section-shell">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6 sm:space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
                  <span className="text-[var(--brand)]">{lang === "zh" ? "祈孕" : "Fertility"}</span>
                  <span className="text-[var(--text-primary)]">{lang === "zh" ? "顧問" : " Guidance"}</span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-secondary)] leading-relaxed">
                  {lang === "zh" 
                    ? "以專業與信賴，圓您擁有孩子的夢想" 
                    : "Professional, compassionate support for your family journey"
                  }
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 pt-4">
                <a
                  href="https://line.me/R/ti/p/@293mminh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-8 sm:px-10 py-4 sm:py-5 bg-[var(--brand)] text-white rounded-2xl font-bold shadow-lg hover:bg-[var(--brand-800)] transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </div>
                    {lang === "zh" ? "開始諮詢" : "Start Consultation"}
                  </div>
                </a>
                
                <div className="flex items-center gap-2 text-sm sm:text-base text-[var(--text-muted)]">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-[var(--brand)] flex-shrink-0" />
                  <span className="font-medium break-all">qiyunsolution@gmail.com</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:block"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
                <img
                  src={ILLUSTRATIONS.hero.src}
                  alt={lang === "zh" ? ILLUSTRATIONS.hero.zhAlt : ILLUSTRATIONS.hero.enAlt}
                  className="w-full h-auto rounded-2xl sm:rounded-3xl object-cover"
                />
              </div>
            </motion.div>
          </div>
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
            {/* Professional Services title hidden */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-purple-600 bg-clip-text text-transparent leading-[1.25] px-2">
              {t.servicesTitle[lang]}
            </h2>
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
                        if (index === 3) setShowIvfDetail(true);
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
          <div className="grid md:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-4 sm:mb-6 md:mb-8">
            {/* Line Consultation Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              onClick={() => setShowLineQR(true)}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00B900] via-[#009900] to-[#00A300]"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 p-2 lg:p-2.5 text-center text-white min-h-0">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 bg-white/20 backdrop-blur-sm rounded-lg mb-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <MessageCircle className="h-2 w-2 lg:h-2.5 lg:w-2.5 text-white" />
                </div>
                <h4 className="text-xs lg:text-sm font-bold mb-0.5 leading-tight text-white drop-shadow-md">
                  {lang === "zh" ? "加入 Line 諮詢" : "Line Consultation"}
                </h4>
                <p className="text-3xs lg:text-2xs text-white/90 font-medium">{lang === "zh" ? "掃描 QR Code" : "Scan QR Code"}</p>
                <p className="text-3xs lg:text-2xs text-white/70 mt-1">@293mminh</p>
                
                {/* Arrow Indicator */}
                <div className="mt-1.5 flex items-center justify-center gap-0.5 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-3xs lg:text-2xs">{lang === "zh" ? "點擊開啟" : "Click"}</span>
                  <svg className="w-1.5 h-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
            
            {/* Contact Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 cursor-pointer"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 p-2 lg:p-2.5 text-center text-white min-h-0">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 bg-white/20 backdrop-blur-sm rounded-lg mb-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="h-2 w-2 lg:h-2.5 lg:w-2.5 text-white" />
                </div>
                <h4 className="text-xs lg:text-sm font-bold mb-0.5 leading-tight text-white drop-shadow-md">
                  {lang === "zh" ? "諮詢表單" : "Consultation"}
                </h4>
                <p className="text-3xs lg:text-2xs text-white/90 font-medium">{lang === "zh" ? "請填寫下方表單" : "Fill Form"}</p>
                <p className="text-3xs lg:text-2xs text-white/70 mt-1">{lang === "zh" ? "24小時回" : "24h"}</p>
                
                {/* Arrow Indicator */}
                <div className="mt-1.5 flex items-center justify-center gap-0.5 text-white/80 group-hover:text-white transition-colors">
                  <span className="text-3xs lg:text-2xs">{lang === "zh" ? "點擊填寫" : "Click"}</span>
                  <svg className="w-1.5 h-1.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
            
            {/* Email Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand)] via-[var(--brand-700)] to-[var(--brand-800)]"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Content */}
              <div className="relative z-10 p-2 lg:p-2.5 text-center text-white min-h-0">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 bg-white/20 backdrop-blur-sm rounded-lg mb-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Mail className="h-2 w-2 lg:h-2.5 lg:w-2.5 text-white" />
                </div>
                <h4 className="text-xs lg:text-sm font-bold mb-0.5 leading-tight text-white drop-shadow-md">
                  {lang === "zh" ? "電子郵件" : "Email"}
                </h4>
                <p className="text-3xs lg:text-2xs text-white/90 font-medium break-all">{BRAND.email}</p>
                
                {/* Copy Email Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(BRAND.email);
                    alert(lang === "zh" ? "已複製" : "Copied");
                  }}
                  className="mt-1.5 inline-flex items-center justify-center gap-0.5 px-1.5 py-0.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-md text-white text-3xs lg:text-2xs font-medium transition-all duration-300"
                >
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </motion.div>

            {/* Phone Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-purple-600 to-purple-700"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 p-2 lg:p-2.5 text-center text-white min-h-0">
                <div className="inline-flex items-center justify-center w-4 h-4 lg:w-5 lg:h-5 bg-white/20 backdrop-blur-sm rounded-lg mb-1 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Phone className="h-2 w-2 lg:h-2.5 lg:w-2.5 text-white" />
                </div>
                <h4 className="text-xs lg:text-sm font-bold mb-0.5 leading-tight text-white drop-shadow-md">
                  {lang === "zh" ? "聯絡電話" : "Phone"}
                </h4>
                <p className="text-3xs lg:text-2xs text-white/90 font-medium">02 6609-0980</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText("02 6609-0980");
                    alert(lang === "zh" ? "已複製" : "Copied");
                  }}
                  className="mt-1.5 inline-flex items-center justify-center gap-0.5 px-1.5 py-0.5 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-md text-white text-3xs lg:text-2xs font-medium transition-all duration-300"
                >
                  <svg className="w-2 h-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </motion.div>
          </div>

          <motion.div
            id="contact-form"
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
                      {lang === "zh" ? "諮詢表單" : "Consultation Form"}
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
                      {t.formLineId[lang]}
                      <span className="text-slate-500 text-xs ml-1">
                        {lang === "zh" ? "(選填)" : "(Optional)"}
                      </span>
                    </label>
                    <input
                      type="text"
                      name="lineId"
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-[var(--brand)] transition-all duration-300 bg-white hover:border-slate-300 responsive-text-base"
                      placeholder={lang === "zh" ? "請輸入您的 LINE ID (例如: @abc123)" : "Enter your LINE ID (e.g., @abc123)"}
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
              <div className="flex items-center gap-4">
                {/* 美化的頁尾圖標 */}
                <div className="relative group">
                  <div className="w-14 h-14 bg-gradient-to-br from-white/30 via-white/20 to-white/10 rounded-3xl flex items-center justify-center shadow-2xl border border-white/20 group-hover:scale-110 transition-all duration-500">
                    <Baby className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  {/* 裝飾光暈效果 */}
                  <div className="absolute inset-0 w-14 h-14 rounded-3xl bg-gradient-to-br from-white/20 to-transparent blur-xl scale-150 group-hover:scale-125 transition-all duration-500"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-3xl sm:text-4xl font-black text-white drop-shadow-lg">{BRAND.name}</span>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-2 h-2 rounded-full bg-white/80 shadow-sm"></div>
                    <span className="text-sm text-white/90 font-medium">{lang === "zh" ? "值得信賴的夢想夥伴" : "Trusted Dream Partner"}</span>
                  </div>
                </div>
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
                  <Mail className="h-5 w-5 flex-shrink-0 text-[var(--brand-200)]" />
                  <span className="responsive-text-sm break-all font-medium">{BRAND.email}</span>
                </div>
                <div className="flex items-center gap-3 hover:text-blue-300 transition-colors duration-300">
                  <Phone className="h-5 w-5 flex-shrink-0 text-[var(--brand-200)]" />
                  <span className="responsive-text-sm font-medium">02 6609-0980</span>
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

              {/* Process Overview */}
              {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh : COUPLE_SURROGACY_DETAIL.en).processOverview && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
                    {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh : COUPLE_SURROGACY_DETAIL.en).processOverview.title}
                  </h3>
                  
                  <div className="space-y-8">
                    {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh : COUPLE_SURROGACY_DETAIL.en).processOverview.phases.map((phase, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h4 className="text-xl font-bold text-[var(--brand-700)] mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          {phase.phase}
                        </h4>
                        <ul className="space-y-3">
                          {phase.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3 text-slate-700">
                              <div className="w-2 h-2 bg-[var(--brand)] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Time Estimate */}
                  {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh : COUPLE_SURROGACY_DETAIL.en).processOverview.timeEstimate && (
                    <div className="mt-8 bg-gradient-to-br from-[var(--brand-50)] to-white rounded-2xl p-8 border border-[var(--brand-200)]">
                      <h4 className="text-xl font-bold text-[var(--brand-800)] mb-6 text-center">
                        {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh : COUPLE_SURROGACY_DETAIL.en).processOverview.timeEstimate.title}
                      </h4>
                      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {(lang === "zh" ? COUPLE_SURROGACY_DETAIL.zh : COUPLE_SURROGACY_DETAIL.en).processOverview.timeEstimate.phases.map((phase, index) => (
                          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="text-lg font-bold text-[var(--brand-700)] mb-2">
                              {phase.phase}
                            </div>
                            <div className="text-2xl font-bold text-[var(--brand)]">
                              {phase.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                  {(lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.title : PARTNER_SURROGACY_DETAIL.en.title).split('\n').map((line, index) => (
                    <div key={index}>{line}</div>
                  ))}
                </h2>
                <p className="text-lg text-[var(--brand)] font-semibold">
                  {lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.subtitle : PARTNER_SURROGACY_DETAIL.en.subtitle}
                </p>
              </div>

              {/* 流程總覽 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.overview.title : PARTNER_SURROGACY_DETAIL.en.overview.title}
                </h3>
                <div className="space-y-6">
                  {(lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.overview.phases : PARTNER_SURROGACY_DETAIL.en.overview.phases).map((phase, idx) => (
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

              {/* 流程所需時間預估 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-6 flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-[var(--brand)] to-[var(--brand-600)] rounded-full"></div>
                  {lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.timeEstimate.title : PARTNER_SURROGACY_DETAIL.en.timeEstimate.title}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(lang === "zh" ? PARTNER_SURROGACY_DETAIL.zh.timeEstimate.phases : PARTNER_SURROGACY_DETAIL.en.timeEstimate.phases).map((timePhase, idx) => (
                    <div key={idx} className="p-6 glass-effect rounded-2xl border-l-4 border-[var(--brand)]">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-xl flex items-center justify-center text-white font-bold">
                          {idx + 1}
                        </div>
                        <h4 className="text-lg font-bold text-[var(--brand-800)]">{timePhase.phase}</h4>
                      </div>
                      <div className="ml-14">
                        <span className="inline-block text-lg text-[var(--brand)] bg-[var(--brand-50)] px-4 py-2 rounded-xl font-semibold">
                          {timePhase.duration}
                        </span>
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

              {/* 服務方案 */}
              <div className="mb-12">
                <div className="grid md:grid-cols-2 gap-6">
                  {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh.plans : SINGLE_SURROGACY_DETAIL.en.plans).map((plan, planIdx) => (
                    <div key={planIdx} className="p-6 bg-gradient-to-r from-[var(--brand-50)] to-white rounded-2xl border border-[var(--brand-200)]">
                      <h3 className="text-xl font-bold text-[var(--brand-800)] mb-3">{plan.category}</h3>
                      <p className="text-slate-700">{plan.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Overview */}
              {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh : SINGLE_SURROGACY_DETAIL.en).processOverview && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
                    {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh : SINGLE_SURROGACY_DETAIL.en).processOverview.title}
                  </h3>
                  
                  <div className="space-y-8">
                    {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh : SINGLE_SURROGACY_DETAIL.en).processOverview.phases.map((phase, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h4 className="text-xl font-bold text-[var(--brand-700)] mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          {phase.phase}
                        </h4>
                        <ul className="space-y-3">
                          {phase.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3 text-slate-700">
                              <div className="w-2 h-2 bg-[var(--brand)] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Time Estimate */}
                  {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh : SINGLE_SURROGACY_DETAIL.en).processOverview.timeEstimate && (
                    <div className="mt-8 bg-gradient-to-br from-[var(--brand-50)] to-white rounded-2xl p-8 border border-[var(--brand-200)]">
                      <h4 className="text-xl font-bold text-[var(--brand-800)] mb-6 text-center">
                        {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh : SINGLE_SURROGACY_DETAIL.en).processOverview.timeEstimate.title}
                      </h4>
                      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {(lang === "zh" ? SINGLE_SURROGACY_DETAIL.zh : SINGLE_SURROGACY_DETAIL.en).processOverview.timeEstimate.phases.map((phase, index) => (
                          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="text-lg font-bold text-[var(--brand-700)] mb-2">
                              {phase.phase}
                            </div>
                            <div className="text-2xl font-bold text-[var(--brand)]">
                              {phase.duration}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}



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

      {/* IVF服務詳細頁面 */}
      {showIvfDetail && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowIvfDetail(false)}
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
              onClick={() => setShowIvfDetail(false)}
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
                  <ShieldCheck className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-4">
                  {lang === "zh" ? IVF_SERVICES_DETAIL.zh.title : IVF_SERVICES_DETAIL.en.title}
                </h2>
                <p className="text-3xl md:text-4xl font-bold text-[var(--brand)] mb-2">
                  {lang === "zh" ? IVF_SERVICES_DETAIL.zh.subtitle : IVF_SERVICES_DETAIL.en.subtitle}
                </p>
              </div>

              {/* Process Overview */}
              {(lang === "zh" ? IVF_SERVICES_DETAIL.zh : IVF_SERVICES_DETAIL.en).processOverview && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
                    {(lang === "zh" ? IVF_SERVICES_DETAIL.zh : IVF_SERVICES_DETAIL.en).processOverview.title}
                  </h3>
                  
                  <div className="space-y-8">
                    {(lang === "zh" ? IVF_SERVICES_DETAIL.zh : IVF_SERVICES_DETAIL.en).processOverview.phases.map((phase, index) => (
                      <div key={index} className="bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                        <h4 className="text-xl font-bold text-[var(--brand-700)] mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          {phase.phase}
                        </h4>
                        <ul className="space-y-3">
                          {phase.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3 text-slate-700">
                              <div className="w-2 h-2 bg-[var(--brand)] rounded-full mt-2 flex-shrink-0"></div>
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Time Estimate */}
                  {(lang === "zh" ? IVF_SERVICES_DETAIL.zh : IVF_SERVICES_DETAIL.en).processOverview.timeEstimate && (
                    <div className="mt-8 bg-gradient-to-br from-[var(--brand-50)] to-white rounded-2xl p-8 border border-[var(--brand-200)]">
                      <h4 className="text-xl font-bold text-[var(--brand-800)] mb-6 text-center">
                        {(lang === "zh" ? IVF_SERVICES_DETAIL.zh : IVF_SERVICES_DETAIL.en).processOverview.timeEstimate.title}
                      </h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {(lang === "zh" ? IVF_SERVICES_DETAIL.zh : IVF_SERVICES_DETAIL.en).processOverview.timeEstimate.phases.map((phase, index) => (
                          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
                            <div className="text-lg font-bold text-[var(--brand-700)] mb-2">
                              {phase.phase}
                            </div>
                            <div className="text-2xl font-bold text-[var(--brand)] mb-1">
                              {phase.duration}
                            </div>
                            {phase.note && (
                              <div className="text-sm text-slate-600">
                                {phase.note}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* CTA */}
              <div className="text-center pt-8 border-t border-slate-200">
                <a
                  href="#contact"
                  onClick={() => setShowIvfDetail(false)}
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

      {/* Line QR Code Modal */}
      {showLineQR && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowLineQR(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md mx-4 glass-effect rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* 背景裝飾 */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#00B900] to-transparent rounded-full opacity-20 transform translate-x-16 -translate-y-16"></div>

            <div className="relative z-10 p-8">
              {/* 關閉按鈕 */}
              <button
                onClick={() => setShowLineQR(false)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-slate-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-2">
                    {lang === "zh" ? "加入 Line 諮詢" : "Join Our Line"}
                  </h3>
                  <p className="text-slate-600">
                    {lang === "zh" ? "掃描下方 QR Code 或搜尋 Line ID：@293mminh" : "Scan the QR Code below or search Line ID: @293mminh"}
                  </p>
                </div>

                {/* QR Code 圖片 */}
                <div className="flex justify-center">
                  <div className="w-48 h-48 bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
                    <img 
                      src="https://qr-official.line.me/sid/M/293mminh.png" 
                      alt="Line QR Code"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='white'/%3E%3Ctext x='50%' y='50%' font-size='14' text-anchor='middle' dominant-baseline='middle'%3EQR Code%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>

                {/* 直接開啟 Line 按鈕 */}
                <a
                  href="https://line.me/R/ti/p/@293mminh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-[#00B900] to-[#00A300] text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {lang === "zh" ? "直接開啟 Line" : "Open Line Directly"}
                </a>

                <button
                  onClick={() => setShowLineQR(false)}
                  className="block w-full px-6 py-2 text-slate-600 hover:text-slate-800 font-semibold transition-colors duration-300"
                >
                  {lang === "zh" ? "關閉" : "Close"}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* 浮動 LINE 按鈕 */}
      <a
        href="https://line.me/R/ti/p/@293mminh"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group"
        aria-label="LINE 諮詢"
      >
        {/* LINE 圖標 SVG */}
        <svg 
          className="w-9 h-9 group-hover:scale-110 transition-transform duration-300" 
          viewBox="0 0 512 512" 
          fill="currentColor"
        >
          <path d="M443 233.8c0-84.6-84.6-153.3-188.6-153.3S65.8 149.2 65.8 233.8c0 75.9 67.2 139.4 158.1 151.4 6.2 1.3 14.6 4.1 16.7 9.4 1.9 4.7 1.2 12.1 0.6 16.9 0 0-2.2 13.4-2.7 16.2-0.8 4.9-3.8 19.3 16.9 10.5s112.3-66 153.3-113C424.5 306.6 443 272.1 443 233.8zM203.6 281.1h-49.4c-5.4 0-9.8-4.4-9.8-9.8V190.7c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8v70.8h39.6c5.4 0 9.8 4.4 9.8 9.8S209 281.1 203.6 281.1zM254.3 271.3c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8V190.7c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8V271.3zM327.7 271.3c0 4.6-3.2 8.5-7.5 9.5-1 0.2-2 0.3-3 0.3-3.6 0-6.9-2-8.5-5.2l-27.4-54.1v49.5c0 5.4-4.4 9.8-9.8 9.8s-9.8-4.4-9.8-9.8V190.7c0-4.6 3.2-8.5 7.5-9.5 1-0.2 2-0.3 3-0.3 3.6 0 6.9 2 8.5 5.2l27.4 54.1v-49.5c0-5.4 4.4-9.8 9.8-9.8s9.8 4.4 9.8 9.8V271.3zM408.9 220.3c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8h-29.8v21.6h29.8c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8h-39.6c-5.4 0-9.8-4.4-9.8-9.8V190.7c0-5.4 4.4-9.8 9.8-9.8h39.6c5.4 0 9.8 4.4 9.8 9.8s-4.4 9.8-9.8 9.8h-29.8v19.8H408.9z"/>
        </svg>
        
        {/* 小提示氣泡 */}
        <div className="absolute right-full mr-3 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
          {lang === "zh" ? "LINE 諮詢" : "LINE Consultation"}
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-800"></div>
        </div>
      </a>
    </div>
  );
}
