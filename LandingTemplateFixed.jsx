import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as React from "react";
import { Phone, Mail, MapPin, Baby, ShieldCheck, Users2, Globe2, HeartHandshake, Languages, Sparkles, User, Heart, ArrowRight } from "lucide-react";

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
          --brand:#019875; 
          --brand-800:#006e5a; 
          --brand-50:#e9f7f4; 
          --brand-100:#d1f0ea;
          --brand-600:#017a61;
          --surface:#ffffff; 
          --surface-muted:#f3faf8; 
          --gradient-primary: linear-gradient(135deg, #019875 0%, #00c896 100%);
          --gradient-secondary: linear-gradient(135deg, #e9f7f4 0%, #ffffff 100%);
          --shadow-soft: 0 4px 20px rgba(1, 152, 117, 0.1);
          --shadow-medium: 0 8px 30px rgba(1, 152, 117, 0.15);
          --shadow-strong: 0 12px 40px rgba(1, 152, 117, 0.2);
        }
        html {
          font-size:16px;
          scroll-behavior:smooth;
          scroll-padding-top:6rem;
        }
        @media (min-width:640px) {
          html { font-size:17px; }
        }
        @media (min-width:1024px) {
          html { font-size:18px; }
        }
        body {
          font-size:1rem;
          letter-spacing:.3px;
          line-height:1.7;
          background: var(--gradient-secondary);
          font-family: 'Inter', 'Noto Sans TC', system-ui, sans-serif;
        }
        .section-shell {
          max-width:1200px;
          margin:0 auto;
          padding: 3rem 1rem;
        }
        @media (min-width:640px) {
          .section-shell {
            padding: 4rem 1.5rem;
          }
        }
        @media (min-width:768px) {
          .section-shell {
            padding: 5rem 2rem;
          }
        }
        @media (min-width:1024px) {
          .section-shell {
            padding: 6rem 2rem;
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
        
        /* 漸層按鈕 */
        .btn-gradient {
          background: var(--gradient-primary);
          transition: all 0.3s ease;
        }
        .btn-gradient:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-medium);
        }
        
        /* 玻璃材質效果 */
        .glass-effect {
          backdrop-filter: blur(20px);
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        /* 現代卡片設計 */
        .modern-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(1, 152, 117, 0.1);
          border-radius: 20px;
          box-shadow: var(--shadow-soft);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .modern-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-medium);
          border-color: rgba(1, 152, 117, 0.2);
        }
        
        /* 響應式文字 */
        .responsive-text-xs { font-size: 0.75rem; line-height: 1.4; }
        .responsive-text-sm { font-size: 0.875rem; line-height: 1.5; }
        .responsive-text-base { font-size: 1rem; line-height: 1.6; }
        .responsive-text-lg { font-size: 1.125rem; line-height: 1.6; }
        .responsive-text-xl { font-size: 1.25rem; line-height: 1.5; }
        
        @media (min-width: 640px) {
          .responsive-text-xs { font-size: 0.8rem; }
          .responsive-text-sm { font-size: 0.9rem; }
          .responsive-text-base { font-size: 1.05rem; }
          .responsive-text-lg { font-size: 1.2rem; }
          .responsive-text-xl { font-size: 1.35rem; }
        }
        
        @media (min-width: 1024px) {
          .responsive-text-xs { font-size: 0.85rem; }
          .responsive-text-sm { font-size: 0.95rem; }
          .responsive-text-base { font-size: 1.1rem; }
          .responsive-text-lg { font-size: 1.3rem; }
          .responsive-text-xl { font-size: 1.5rem; }
        }
      `}</style>
    </>
  );
}

// ---- Interactive Surrogacy Screening Module ----
function SurrogacyScreeningModule({ lang }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const screeningQuestions = [
    {
      zh: "代理孕母候選人是否年齡在21-40歲之間？",
      en: "Is the surrogate candidate between 21-40 years old?"
    },
    {
      zh: "代理孕母候選人是否已有至少一次成功懷孕經驗？",
      en: "Has the surrogate candidate had at least one successful pregnancy?"
    },
    {
      zh: "代理孕母候選人是否完成心理評估？",
      en: "Has the surrogate candidate completed thorough psychological evaluation?"
    }
  ];

  const handleAnswer = (isYes) => {
    if (!isYes) {
      setIsSuccess(false);
      setShowResult(true);
      setShowControls(true);
      return;
    }
    
    if (currentQuestionIndex < screeningQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsSuccess(true);
      setShowResult(true);
      setShowControls(true);
    }
  };

  const resetScreening = () => {
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setIsSuccess(false);
    setShowControls(false);
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
      <h3 className="text-xl font-semibold mb-4">{lang === "zh" ? "互動式代母初篩" : "Interactive Surrogate Screening"}</h3>
      
      {!showResult && (
        <div className={`relative grid place-items-center h-32 bg-slate-50 rounded-lg border-2 mb-4 transition-all duration-300 ${
          currentQuestionIndex < screeningQuestions.length ? "border-[var(--brand)]" : "border-slate-200"
        }`}>
          <svg viewBox="0 0 24 24" className="w-12 h-12 text-slate-400">
            <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm transition-all duration-300 ${
            currentQuestionIndex < screeningQuestions.length ? "bg-[var(--brand)]" : "bg-slate-400"
          }`}>
            {currentQuestionIndex + 1}
          </div>
        </div>
      )}

      {!showResult ? (
        <div className="space-y-4">
          <div className="text-center">
            <h4 className="text-lg font-medium mb-3">
              {screeningQuestions[currentQuestionIndex]?.[lang] || screeningQuestions[currentQuestionIndex]?.zh}
            </h4>
            <div className="text-sm text-slate-500 mb-4">
              {lang === "zh" ? `問題 ${currentQuestionIndex + 1} / ${screeningQuestions.length}` : `Question ${currentQuestionIndex + 1} / ${screeningQuestions.length}`}
            </div>
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={() => handleAnswer(true)}
                className="px-6 py-2 bg-[var(--brand)] hover:bg-[var(--brand-800)] text-white rounded-lg transition-colors"
              >
                {lang === "zh" ? "是" : "Yes"}
              </button>
              <button
                onClick={() => handleAnswer(false)}
                className="px-6 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
              >
                {lang === "zh" ? "否" : "No"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={`p-4 rounded-lg border mb-4 ${
          isSuccess 
            ? "bg-green-50 border-green-200 text-green-800" 
            : "bg-red-50 border-red-200 text-red-800"
        }`}>
          <div className="font-semibold mb-2">
            {isSuccess 
              ? (lang === "zh" ? "✅ 初步篩選通過" : "✅ Initial Screening Passed")
              : (lang === "zh" ? "❌ 需要進一步評估" : "❌ Further Assessment Needed")
            }
          </div>
          <div className="text-sm">
            {isSuccess 
              ? (lang === "zh" ? "候選人符合基本條件，建議進行詳細諮詢。" : "Candidate meets basic criteria. Detailed consultation recommended.")
              : (lang === "zh" ? "建議與專業顧問討論其他可能的選項。" : "Recommend discussing alternative options with our consultant.")
            }
          </div>
        </div>
      )}

      {showControls && (
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={resetScreening}
            className="px-4 py-2 bg-slate-500 hover:bg-slate-600 text-white rounded-lg transition-colors"
          >
            {lang === "zh" ? "重新開始" : "Start Over"}
          </button>
          <a
            href="#contact"
            className="px-4 py-2 bg-[var(--brand)] hover:bg-[var(--brand-800)] text-white rounded-lg transition-colors inline-block"
          >
            {lang === "zh" ? "聯絡顧問" : "Contact Consultant"}
          </a>
        </div>
      )}
    </div>
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
  { id: "services", path: "#services", zh: "美國代孕服務", en: "US Surrogacy Services" },
  { id: "process", path: "#process", zh: "詳細流程", en: "Process" },
  { id: "legal", path: "#legal", zh: "法律資訊", en: "Legal Info" },
  { id: "knowledge", path: "#knowledge", zh: "代孕知識與案例", en: "Knowledge & Cases" },
  { id: "team", path: "#team", zh: "團隊", en: "Team" },
  { id: "faq", path: "#faq", zh: "FAQ", en: "FAQ" },
  { id: "contact", path: "#contact", zh: "聯絡", en: "Contact" },
];

const FEATURES = [
  { icon: HeartHandshake, zh: "夫妻代孕", en: "Couple Surrogacy", descZh: "為已婚夫妻提供專業美國代孕服務，圓滿家庭夢想。", descEn: "Professional US surrogacy services for married couples to fulfill their family dreams." },
  { icon: Users2, zh: "同志代孕", en: "LGBTQ+ Surrogacy", descZh: "支援同志伴侶代孕需求，提供包容性專業服務。", descEn: "Supporting LGBTQ+ couples with inclusive and professional surrogacy services." },
  { icon: User, zh: "單身代孕", en: "Single Parent Surrogacy", descZh: "協助單身人士實現為人父母的夢想，提供全方位支援與陪伴。", descEn: "Helping single individuals achieve their dreams of becoming parents with comprehensive support and guidance." },
  { icon: ShieldCheck, zh: "法律保障", en: "Legal Protection", descZh: "提供完整的法律文件與程序保障，確保權益。", descEn: "Comprehensive legal documentation and procedural protection to ensure rights." },
  { icon: Globe2, zh: "跨境醫療聯盟", en: "Cross-Border Clinics", descZh: "串接美國生殖中心與法務，透明流程與費用。", descEn: "Trusted US clinics & attorneys with transparent steps and fees." },
];

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
        metric: "活產率",
        metricEn: "Live Birth Rate", 
        value: "78%+",
        description: "35歲以下女性活產率",
        descriptionEn: "Live birth rate for women under 35"
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
    content: "隨著女性年齡增長，卵子品質下降是影響IVF成功率的主要因素。HRC的數據顯示，35歲以下女性的活產率可達78%，而40歲以上則降至約45%。透過PGT-A基因篩檢，我們能夠選擇最健康的胚胎進行移植...",
    contentEn: "As women age, declining egg quality is the main factor affecting IVF success rates. HRC data shows live birth rates of 78% for women under 35, dropping to about 45% for those over 40. Through PGT-A genetic screening, we can select the healthiest embryos for transfer...",
    tags: ["IVF", "成功率", "年齡", "胚胎篩檢"]
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
  },
  {
    id: "case-002", 
    title: "同性伴侶的家庭夢想實現",
    titleEn: "Same-Sex Couple's Family Dream Realization",
    clientProfile: "美國同性男性伴侶，均30多歲",
    clientProfileEn: "US same-sex male couple, both in their 30s",
    challenge: "需要卵子捐贈和美國代孕服務",
    challengeEn: "Required egg donation and surrogacy services",
    solution: "卵子捐贈配對+代孕一站式服務",
    solutionEn: "Egg donation matching + comprehensive surrogacy services",
    duration: "16個月",
    durationEn: "16 months", 
    outcome: "龍鳳胎健康出生",
    outcomeEn: "Healthy twins (boy and girl) born",
    testimonial: "HRC團隊幫我們實現了不可能的夢想。從卵子捐贈者配對到代孕母親選擇，每個環節都很專業。",
    testimonialEn: "HRC team helped us achieve the impossible dream. From egg donor matching to surrogate selection, every step was professional.",
    tags: ["同性伴侶", "卵子捐贈", "龍鳳胎", "LGBTQ+友善"]
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
  
  { qZh: "HRC的胚胎移植成功率如何？", aZh: "HRC的單次胚胎移植成功率超過85%，35歲以下女性活產率達78%以上，遠超全國平均水準。實驗室設備先進，胚胎學團隊經驗豐富。", qEn: "What is HRC's embryo transfer success rate?", aEn: "HRC's single embryo transfer success rate exceeds 85%, with live birth rates for women under 35 reaching over 78%, far above national averages. They have advanced laboratory equipment and experienced embryology teams." },
  
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
      const res = await fetch("https://formspree.io/f/xbldvyqn", { method: "POST", headers: { "Accept": "application/json" }, body: fd });
      if (res.ok) { setSent(true); formRef.current?.reset(); }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-50)]/50 text-slate-900">
      <GlobalStyles />

      {/* Top Bar */}
      <div className={cx("w-full sticky top-0 z-50 transition-all duration-500", scrolled ? "bg-white/95 backdrop-blur-xl shadow-lg border-b border-[var(--brand-50)]" : "bg-white/90 backdrop-blur-lg border-b border-white/20")}>
        <div className={cx("mx-auto max-w-7xl px-3 sm:px-6 flex items-center justify-between", scrolled ? "h-16 sm:h-18" : "h-18 sm:h-20")}>
          <div className="flex items-center gap-2 sm:gap-3 rounded-2xl bg-white/90 backdrop-blur-sm px-3 sm:px-4 py-2 shadow-md border border-[var(--brand-50)]">
            <Baby className="h-6 w-6 sm:h-7 sm:w-7 text-[var(--brand-800)]" />
            <span className="font-bold tracking-tight text-lg sm:text-xl lg:text-2xl bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand-600)] bg-clip-text text-transparent">{BRAND.name}</span>
          </div>
          <nav className="flex items-center gap-1 sm:gap-2 lg:gap-3 responsive-text-xs sm:responsive-text-sm lg:responsive-text-base font-semibold rounded-2xl glass-effect px-2 sm:px-4 lg:px-6 py-2 shadow-lg max-w-[55vw] sm:max-w-none overflow-x-auto scrollbar-hide">{NAV.map((n) => {
              const isActive = active === n.id;
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
        
        <div className="relative section-shell text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)]"
              >
                <Sparkles className="h-5 w-5 text-[var(--brand)]" />
                {lang === "zh" ? "專業．可信賴．有溫度" : "Professional · Trusted · Compassionate"}
              </motion.div>
            </div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-[var(--brand-600)] bg-clip-text text-transparent mb-8 leading-tight"
            >
              {t.heroTitle[lang]}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="responsive-text-lg sm:responsive-text-xl text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed"
            >
              {t.heroSub[lang]}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <a
                href="#contact"
                className="inline-flex items-center gap-3 btn-gradient hover-lift px-8 py-4 rounded-2xl text-white font-semibold responsive-text-base shadow-lg min-w-[200px] justify-center"
              >
                <Baby className="h-5 w-5" />
                {t.heroCTA[lang]}
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-[var(--brand)] text-[var(--brand-800)] font-semibold responsive-text-base hover:bg-[var(--brand-50)] transition-all duration-300 min-w-[200px] justify-center"
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
      <section id="services" className="py-20 bg-gradient-to-br from-[var(--brand-50)] via-white to-purple-50">
        <div className="section-shell">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)] mb-6">
              <Heart className="h-5 w-5 text-[var(--brand)]" />
              {lang === "zh" ? "專業服務" : "Professional Services"}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              {t.servicesTitle[lang]}
            </h2>
            <p className="responsive-text-lg sm:responsive-text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {lang === "zh" 
                ? "我們提供專業、可信賴的美國代孕服務，陪伴您完成家庭夢想的每一步旅程。"
                : "We provide professional, trusted US surrogacy services, accompanying you through every step of your family journey."}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {FEATURES.map(({ icon: Icon, zh, en, descZh, descEn }, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative p-8 glass-effect rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                {/* 背景裝飾 */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-[var(--brand-50)] to-transparent rounded-full opacity-50 transform translate-x-6 -translate-y-6 group-hover:scale-150 transition-transform duration-500"></div>
                
                <div className="relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="responsive-text-lg font-bold mb-4 text-[var(--brand-800)] group-hover:text-[var(--brand)] transition-colors duration-300">
                    {lang === "zh" ? zh : en}
                  </h3>
                  <p className="responsive-text-sm text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {lang === "zh" ? descZh : descEn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive Screening Module */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SurrogacyScreeningModule lang={lang} />
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

      {/* HRC Fertility Information Section */}
      <section id="hrc-info" className="section-shell bg-gradient-to-br from-purple-50 via-white to-pink-50">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-6">
              {lang === "zh" ? HRC_FERTILITY_INFO.overview.title : HRC_FERTILITY_INFO.overview.titleEn}
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              {lang === "zh" ? HRC_FERTILITY_INFO.overview.description : HRC_FERTILITY_INFO.overview.descriptionEn}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-[var(--brand-600)]">
              <span className="font-semibold">{lang === "zh" ? "成立於" : "Established"}</span>
              <span className="text-2xl font-bold">{HRC_FERTILITY_INFO.overview.established}</span>
            </div>
          </motion.div>
        </div>

        {/* HRC Locations */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? "診所位置" : "Clinic Locations"}
          </h3>
          <div className="grid lg:grid-cols-2 gap-8">
            {HRC_FERTILITY_INFO.locations.map((location, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-purple-200"
              >
                <h4 className="text-xl font-bold text-[var(--brand-800)] mb-4">
                  {lang === "zh" ? location.name : location.nameEn}
                </h4>
                <div className="mb-4">
                  <p className="text-slate-600 mb-2">📍 {location.address}</p>
                  <p className="text-[var(--brand-600)] font-medium">📞 {location.phone}</p>
                </div>
                <div>
                  <h5 className="font-semibold text-slate-700 mb-2">
                    {lang === "zh" ? "特色服務：" : "Featured Services:"}
                  </h5>
                  <div className="grid grid-cols-2 gap-2">
                    {(lang === "zh" ? location.features : location.featuresEn).map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-slate-600 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HRC Specialties */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? "專業領域" : "Medical Specialties"}
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {HRC_FERTILITY_INFO.specialties.map((specialty, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200"
              >
                <h4 className="text-lg font-bold text-purple-800 mb-4">
                  {lang === "zh" ? specialty.area : specialty.areaEn}
                </h4>
                <div className="space-y-2">
                  {(lang === "zh" ? specialty.services : specialty.servicesEn).map((service, serviceIdx) => (
                    <div key={serviceIdx} className="flex items-start gap-2">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></span>
                      <span className="text-purple-700 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HRC Statistics */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? HRC_FERTILITY_INFO.statistics.title : HRC_FERTILITY_INFO.statistics.titleEn}
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {HRC_FERTILITY_INFO.statistics.data.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 bg-white rounded-2xl shadow-lg border border-emerald-200"
              >
                <div className="text-4xl font-bold text-emerald-600 mb-2">{stat.value}</div>
                <h4 className="text-lg font-bold text-[var(--brand-800)] mb-2">
                  {lang === "zh" ? stat.metric : stat.metricEn}
                </h4>
                <p className="text-slate-600 text-sm">
                  {lang === "zh" ? stat.description : stat.descriptionEn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* HRC Partnerships */}
        <div>
          <h3 className="text-2xl font-bold text-[var(--brand-800)] mb-8 text-center">
            {lang === "zh" ? HRC_FERTILITY_INFO.partnerships.title : HRC_FERTILITY_INFO.partnerships.titleEn}
          </h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {(lang === "zh" ? HRC_FERTILITY_INFO.partnerships.institutions : HRC_FERTILITY_INFO.partnerships.institutionsEn).map((institution, idx) => (
                <div key={idx} className="text-center p-4 bg-gradient-to-br from-slate-50 to-gray-50 rounded-xl">
                  <div className="w-12 h-12 bg-[var(--brand)] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-white font-bold">🏥</span>
                  </div>
                  <p className="text-slate-700 font-medium text-sm">{institution}</p>
                </div>
              ))}
            </div>
          </motion.div>
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
          
          <div className="grid lg:grid-cols-2 gap-8">
            {HRC_SUCCESS_CASES.map((case_item, idx) => (
              <motion.div
                key={case_item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200"
              >
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                    ✓
                  </div>
                  <h4 className="text-lg font-bold text-[var(--brand-800)]">
                    {lang === "zh" ? case_item.title : case_item.titleEn}
                  </h4>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-medium text-slate-500 min-w-[60px]">客戶:</span>
                    <span className="text-sm text-slate-700">
                      {lang === "zh" ? case_item.clientProfile : case_item.clientProfileEn}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-medium text-slate-500 min-w-[60px]">挑戰:</span>
                    <span className="text-sm text-slate-700">
                      {lang === "zh" ? case_item.challenge : case_item.challengeEn}
                    </span>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-medium text-slate-500 min-w-[60px]">方案:</span>
                    <span className="text-sm text-slate-700">
                      {lang === "zh" ? case_item.solution : case_item.solutionEn}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500">時程:</span>
                      <span className="text-sm text-[var(--brand-600)] font-medium">
                        {lang === "zh" ? case_item.duration : case_item.durationEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-500">結果:</span>
                      <span className="text-sm text-green-600 font-medium">
                        {lang === "zh" ? case_item.outcome : case_item.outcomeEn}
                      </span>
                    </div>
                  </div>
                </div>

                <blockquote className="bg-slate-50 p-4 rounded-xl border-l-4 border-[var(--brand)] mb-4">
                  <p className="text-sm text-slate-700 italic">
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
      <section id="faq" className="section-shell bg-gradient-to-r from-[var(--brand-50)]/30 to-white">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-8">
              {t.faqTitle[lang]}
            </h2>
            
            <div className="space-y-6">
              {FAQS.map((f, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm"
                >
                  <h4 className="font-semibold text-lg text-[var(--brand-800)] mb-3">
                    {lang === "zh" ? f.qZh : f.qEn}
                  </h4>
                  <p className="text-slate-600 leading-relaxed">
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
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-[var(--brand-50)] via-white to-purple-50 relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-[var(--brand-50)] to-transparent rounded-full opacity-30 transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-purple-50 to-transparent rounded-full opacity-40 transform translate-x-40 translate-y-40"></div>
        
        <div className="section-shell relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-effect shadow-lg responsive-text-sm font-semibold text-[var(--brand-800)] mb-6">
              <Phone className="h-5 w-5 text-[var(--brand)]" />
              {lang === "zh" ? "聯繫我們" : "Contact Us"}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand)] to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              {t.contactTitle[lang]}
            </h2>
            <p className="responsive-text-lg sm:responsive-text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              {lang === "zh"
                ? "準備好開始您的家庭旅程了嗎？聯絡我們，讓專業顧問為您提供免費諮詢。"
                : "Ready to start your family journey? Contact us for a free consultation with our professional consultants."}
            </p>
          </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="group text-center p-8 glass-effect rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h4 className="responsive-text-lg font-bold text-[var(--brand-800)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300">
                {lang === "zh" ? "電話諮詢" : "Phone Consultation"}
              </h4>
              <p className="responsive-text-sm text-slate-600 font-medium">{BRAND.phone}</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="group text-center p-8 glass-effect rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[var(--brand)] to-[var(--brand-600)] rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h4 className="responsive-text-lg font-bold text-[var(--brand-800)] mb-3 group-hover:text-[var(--brand)] transition-colors duration-300">
                {lang === "zh" ? "電子郵件" : "Email"}
              </h4>
              <p className="text-slate-600">{BRAND.email}</p>
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
                  <div className="text-center mb-10">
                    <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-[var(--brand-800)] to-[var(--brand)] bg-clip-text text-transparent mb-4">
                      {lang === "zh" ? "免費諮詢表單" : "Free Consultation Form"}
                    </h3>
                    <p className="responsive-text-base text-slate-600">
                      {lang === "zh" 
                        ? "填寫下方表單，我們將盡快為您安排專業諮詢"
                        : "Fill out the form below and we'll schedule a professional consultation for you"}
                    </p>
                  </div>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <input type="text" name="hp" style={{ display: 'none' }} />
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t.formName[lang]}
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-colors"
                        placeholder={lang === "zh" ? "請輸入您的姓名" : "Enter your name"}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        {t.formEmail[lang]}
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-colors"
                        placeholder={lang === "zh" ? "請輸入您的 Email" : "Enter your email"}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.formPhone[lang]}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-colors"
                      placeholder={lang === "zh" ? "請輸入您的聯絡電話" : "Enter your phone number"}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {t.formMsg[lang]}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)] focus:border-transparent transition-colors resize-none"
                      placeholder={lang === "zh" ? "請描述您想了解的內容或需求..." : "Please describe what you would like to know or your needs..."}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-8 py-4 bg-[var(--brand)] text-white rounded-lg text-lg font-semibold hover:bg-[var(--brand-800)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
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
      <footer className="bg-gradient-to-br from-[var(--brand-800)] via-[var(--brand-700)] to-[var(--brand-900)] text-white py-16 relative overflow-hidden">
        {/* 背景裝飾 */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full transform -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-white/5 to-transparent rounded-full transform translate-x-40 translate-y-40"></div>
        
        <div className="section-shell relative z-10">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-white/20 to-white/10 rounded-2xl flex items-center justify-center">
                  <Baby className="h-8 w-8" />
                </div>
                <span className="text-2xl sm:text-3xl font-bold">{BRAND.name}</span>
              </div>
              <p className="text-[var(--brand-50)] leading-relaxed responsive-text-base">
                {BRAND.tagline}
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="responsive-text-lg font-bold mb-6 text-white">
                {lang === "zh" ? "聯絡資訊" : "Contact Information"}
              </h4>
              <div className="space-y-4 text-[var(--brand-50)]">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5" />
                  <span className="responsive-text-sm">{BRAND.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5" />
                  <span className="responsive-text-sm">{BRAND.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5" />
                  <span className="responsive-text-sm">{BRAND.address}</span>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="responsive-text-lg font-bold mb-6 text-white">
                {lang === "zh" ? "服務項目" : "Services"}
              </h4>
              <div className="space-y-3 text-[var(--brand-50)]">
                {FEATURES.slice(0, 4).map((feature, index) => (
                  <p key={index} className="responsive-text-sm hover:text-white transition-colors duration-300 cursor-pointer">
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
            className="border-t border-white/20 pt-8 mt-12"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[var(--brand-50)] responsive-text-sm">
                © 2024 {BRAND.name}. {lang === "zh" ? "版權所有" : "All rights reserved"}.
              </p>
              <div className="flex items-center gap-6">
                <a href="#hero" className="text-[var(--brand-50)] hover:text-white transition-colors duration-300 responsive-text-sm">
                  {lang === "zh" ? "回到頂部" : "Back to Top"}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}