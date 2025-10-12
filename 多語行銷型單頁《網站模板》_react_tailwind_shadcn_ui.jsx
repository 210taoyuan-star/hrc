import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import * as React from "react";
import { Phone, Mail, MapPin, Baby, ShieldCheck, Users2, Globe2, HeartHandshake, Languages, Sparkles } from "lucide-react";

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
        :root { --brand:#019875; --brand-800:#006e5a; --brand-50:#e9f7f4; --surface:#ffffff; --surface-muted:#f3faf8; }
        html {
          font-size:16px;
          scroll-behavior:smooth;
          scroll-padding-top:5rem;
        }
        @media (min-width:640px) {
          html { font-size:17px; }
        }
        @media (min-width:1024px) {
          html { font-size:18px; }
        }
        body {
          font-size:1rem;
          letter-spacing:.2px;
          line-height:1.75;
          background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(233,247,244,0.4) 100%);
        }
        .section-shell {
          max-width:1200px;
          margin:0 auto;
          padding:4rem 1.5rem;
        }
        @media (min-width:768px) {
          .section-shell {
            padding:5rem 2rem;
          }
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
      id: 'health-history',
      zh: "候選代母是否曾有順利、無併發症的孕產史？",
      en: "Does the surrogate candidate have a successful pregnancy and delivery history without complications?"
    },
    {
      id: 'medical-health',
      zh: "候選代母是否通過完整的醫學篩檢（傳染病、一般健康、毒理檢驗等）？",
      en: "Has the surrogate candidate passed comprehensive medical screening (infectious diseases, general health, toxicology testing, etc.)?"
    },
    {
      id: 'psych-stability',
      zh: "候選代母是否完成充分的心理評估？",
      en: "Has the surrogate candidate completed thorough psychological evaluation?"
    },
    {
      id: 'physical-readiness',
      zh: "候選代母的骨盆與生殖健康是否適合承載妊娠？",
      en: "Is the surrogate candidate's pelvic and reproductive health suitable for carrying a pregnancy?"
    }
  ];

  const handleAnswer = (isYes) => {
    if (isYes) {
      if (currentQuestionIndex < screeningQuestions.length - 1) {
        setTimeout(() => {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        }, 500);
      } else {
        setShowResult(true);
        setIsSuccess(true);
        setShowControls(true);
      }
    } else {
      setShowResult(true);
      setIsSuccess(false);
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

      {/* Surrogate Visual */}
      <div className={`relative grid place-items-center h-32 bg-slate-50 rounded-lg border-2 mb-4 transition-all duration-300 ${
        showResult && isSuccess ? 'border-green-300 bg-green-50' :
        showResult && !isSuccess ? 'border-red-300 bg-red-50' :
        'border-slate-200'
      }`}>
        <svg viewBox="0 0 24 24" className="w-12 h-12 text-slate-400">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-sm transition-all duration-300 ${
          showResult && isSuccess ? 'bg-green-500' :
          showResult && !isSuccess ? 'bg-red-500' :
          'bg-slate-300'
        }`}>
          {showResult && isSuccess ? '✓' : showResult && !isSuccess ? '✗' : ''}
        </div>
      </div>

      {/* Questions */}
      {!showResult && (
        <div className="space-y-4">
          {screeningQuestions.map((question, index) => (
            <div
              key={question.id}
              className={`p-4 rounded-lg border transition-all duration-300 ${
                index === currentQuestionIndex ? 'border-slate-300 bg-slate-50' : 'border-slate-200 bg-white opacity-50'
              } ${index > currentQuestionIndex ? 'hidden' : ''}`}
            >
              <p className="font-medium mb-3">{lang === "zh" ? question.zh : question.en}</p>
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => handleAnswer(true)}
                  className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 border border-green-300 rounded-lg transition-colors"
                >
                  {lang === "zh" ? "符合條件" : "Meets Criteria"}
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-800 border border-red-300 rounded-lg transition-colors"
                >
                  {lang === "zh" ? "不符合條件" : "Does Not Meet"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Result */}
      {showResult && (
        <div className={`p-4 rounded-lg border mb-4 ${
          isSuccess
            ? 'bg-green-50 border-green-200 text-green-800'
            : 'bg-red-50 border-red-200 text-red-800'
        }`}>
          <p className="font-semibold">
            {isSuccess
              ? (lang === "zh" ? "代母已通過！" : "Surrogate Approved!")
              : (lang === "zh" ? "未通過篩選！" : "Screening Failed!")
            }
          </p>
          <p className="text-sm mt-1">
            {isSuccess
              ? (lang === "zh" ? "該候選人已通過嚴謹的初步篩選。" : "This candidate has passed rigorous preliminary screening.")
              : (lang === "zh" ? "代母資格要求極為嚴格。為確保孕程健康與結果良好，許多申請者（約 90%）會在篩選中被淘汰。" : "Surrogate qualification requirements are extremely strict. To ensure pregnancy health and optimal results, many applicants (about 90%) are eliminated during screening.")
            }
          </p>
        </div>
      )}

      {/* Controls */}
      {showControls && (
        <div className="flex gap-3 flex-wrap">
          {!isSuccess && (
            <button
              onClick={resetScreening}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              {lang === "zh" ? "再試一次" : "Try Again"}
            </button>
          )}
          {isSuccess && (
            <a
              href="#gestational-explained"
              className="px-4 py-2 bg-[var(--brand)] hover:bg-[var(--brand-800)] text-white rounded-lg transition-colors inline-block"
            >
              {lang === "zh" ? "繼續了解" : "Continue Learning"}
            </a>
          )}
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
    src: "/images/gallery/gallery-2.webp",
    srcSet: "/images/gallery/gallery-2-480.webp 480w, /images/gallery/gallery-2-960.webp 960w, /images/gallery/gallery-2-1600.webp 1600w",
    sizes: "(min-width: 1024px) 340px, 80vw",
    zhAlt: "祈孕顧問分享代孕知識的插圖",
    enAlt: "Illustration representing surrogacy insights",
  },
  process: {
    src: "/images/hero/hero-3.webp",
    srcSet: "/images/hero/hero-3-480.webp 480w, /images/hero/hero-3-960.webp 960w, /images/hero/hero-3-1600.webp 1600w",
    sizes: "(min-width: 1024px) 340px, 80vw",
    zhAlt: "代孕流程示意插圖",
    enAlt: "Illustration depicting the surrogacy process",
  },
  faq: {
    src: "/images/gallery/gallery-3.webp",
    srcSet: "/images/gallery/gallery-3-480.webp 480w, /images/gallery/gallery-3-960.webp 960w, /images/gallery/gallery-3-1600.webp 1600w",
    sizes: "(min-width: 1024px) 320px, 80vw",
    zhAlt: "常見問題解答插圖",
    enAlt: "FAQ illustration",
  },
};

// NAV routes with anchor links for smooth scrolling
const NAV = [
  { id: "home", path: "#hero", zh: "首頁", en: "Home" },
  { id: "services", path: "#services", zh: "代孕服務", en: "Services" },
  { id: "knowledge", path: "#knowledge", zh: "代孕知識與消息", en: "Knowledge & News" },
  { id: "process", path: "#process", zh: "流程", en: "Process" },
  { id: "team", path: "#team", zh: "團隊", en: "Team" },
  { id: "faq", path: "#faq", zh: "FAQ", en: "FAQ" },
  { id: "contact", path: "#contact", zh: "聯絡", en: "Contact" },
];

const FEATURES = [
  { icon: HeartHandshake, zh: "夫妻代孕", en: "Couple Surrogacy", descZh: "為已婚夫妻提供專業代孕服務，圓滿家庭夢想。", descEn: "Professional surrogacy services for married couples to fulfill their family dreams." },
  { icon: Users2, zh: "同志代孕", en: "LGBTQ+ Surrogacy", descZh: "支援同志伴侶代孕需求，提供包容性專業服務。", descEn: "Supporting LGBTQ+ couples with inclusive and professional surrogacy services." },
  { icon: Baby, zh: "單身代孕", en: "Single Parent Surrogacy", descZh: "協助單身人士實現為人父母的夢想與願望。", descEn: "Helping single individuals achieve their dreams of becoming parents." },
  { icon: ShieldCheck, zh: "美國合法代孕", en: "US-Legal Surrogacy", descZh: "依州法合規執行，重視隱私保護與醫療倫理。", descEn: "Operate fully within US state laws with privacy-first ethics." },
  { icon: Globe2, zh: "跨境醫療聯盟", en: "Cross-Border Clinics", descZh: "串接美國生殖中心與法務，透明流程與費用。", descEn: "Trusted US clinics & attorneys with transparent steps and fees." },
  { icon: Languages, zh: "多語服務支援", en: "Multilingual Support", descZh: "提供中英雙語文件、即時口譯與跨時區溝通。", descEn: "Bilingual documentation, live interpretation, and cross-timezone communication." },
];

const STEPS = [
  { n: 1, zh: "免費諮詢", en: "Free Consultation", descZh: "瞭解美國加州代孕海外專案，同意後進入下一階段。", descEn: "Learn about our California surrogacy overseas program, proceed after agreement." },
  { n: 2, zh: "評估與配對", en: "Assessment & Matching", descZh: "全面評估需求並媒合適合的代孕母親。", descEn: "Comprehensive assessment and matching with suitable surrogate mothers." },
  { n: 3, zh: "醫療與法務", en: "Medical & Legal", descZh: "醫療程序安排與合約法務確保合規進行。", descEn: "Medical procedures and legal contracts to ensure compliance." },
  { n: 4, zh: "孕期與關懷", en: "Pregnancy & Care", descZh: "孕期全程關懷與醫療照護支援服務。", descEn: "Full pregnancy care and medical support services." },
  { n: 5, zh: "迎接新生", en: "Welcome Baby", descZh: "協助新生兒相關手續與迎接新生命。", descEn: "Assist with newborn procedures and welcome your new life." },
];

const FAQS = [
  { qZh: "首次諮詢要費用嗎？", aZh: "線上初談免費，將為您評估適合的州別與流程。", qEn: "Is the first consultation free?", aEn: "Yes—it's free. We'll assess best-fit states and pathways." },
  { qZh: "整體時間需要多久？", aZh: "平均 12–18 個月，視配對速度與州法文件而定。", qEn: "How long does it take?", aEn: "Typically 12–18 months depending on matching and legal timeline." },
  { qZh: "費用如何構成？", aZh: "費用由醫療、律師、公證、孕母補貼與保險等組成，提供明細與里程碑撥款。", qEn: "What are the costs?", aEn: "Medical, legal, notary, surrogate compensation, and insurance. Itemized with milestone disbursements." },
  { qZh: "是否提供多語服務？", aZh: "提供中英雙語文件、即時口譯與跨時區溝通。", qEn: "Do you support multiple languages?", aEn: "Yes—bilingual docs, live interpretation, and cross‑timezone support." },
];

// ---- Tiny hash router (Fix for missing useHashRoute) ----
function useHashRoute() {
  const getPath = () => window.location.hash || "#/";
  const [path, setPath] = useState(typeof window !== 'undefined' ? getPath() : "#/");
  useEffect(() => {
    const onHash = () => setPath(getPath());
    if (!window.location.hash) window.location.hash = "#/";
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

// ==============================================
// Physician Directory Component
// ==============================================

/**
 * @typedef {Object} Physician
 * @property {string} id
 * @property {string} name
 * @property {string} credentials
 * @property {string} title
 * @property {string[]} [locations]
 * @property {string[]} [interests]
 * @property {string} imageUrl
 * @property {string[]} [languages]
 * @property {string[]} [staffLanguages]
 * @property {string} [bio]
 * @property {string[]} [education]
 * @property {string[]} [affiliations]
 * @property {string[]} [awards]
 * @property {string} [locationAddress]
 * @property {string} [officeHours]
 * @property {string} [phoneExisting]
 * @property {string} [phoneNew]
 * @property {string} [insuranceNote]
 * @property {string[]} [certifications]
 * @property {string[]} [categories]
 */

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

// UI Components
const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs text-gray-700 bg-white/70 border-gray-200">
    {children}
  </span>
);

const PhysicianCard = ({ physician, onOpen, cta = "了解更多" }) => {
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
            alt="醫師頭像"
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
              {physician.interests.slice(0, 6).map((interest) => (
                <Pill key={interest}>{interest}</Pill>
              ))}
            </div>
          ) : null}
          <div className="mt-1 flex items-center gap-2">
            {physician.locations?.map((location) => (
              <span key={location} className="text-xs text-gray-500">📍 {location}</span>
            ))}
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-50">
              {cta}
            </span>
          </div>
        </div>
      </button>
    </article>
  );
};

const PhysicianDetail = ({ physician, onBack }) => {
  const jsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: physician.name,
    jobTitle: physician.title,
    image: physician.imageUrl,
  }), [physician]);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 text-sm text-gray-800 hover:bg-gray-50"
      >
        ← 返回清單
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-[320px,1fr]">
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
          <img src={physician.imageUrl} alt="醫師頭像" className="aspect-[3/4] w-full object-cover" />
        </div>
        <div className="flex flex-col gap-6">
          <header>
            <h1 className="text-2xl font-bold">
              {physician.name} <span className="text-gray-600 font-medium">{physician.credentials}</span>
            </h1>
            <p className="mt-1 text-gray-700">{physician.title}</p>
            {physician.locations?.length ? (
              <p className="mt-1 text-sm text-gray-500">{physician.locations.map((l) => `📍 ${l}`).join("  ")}</p>
            ) : null}
          </header>

          {physician.bio ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">履歷</h2>
              <p className="text-gray-700 leading-relaxed">{physician.bio}</p>
            </section>
          ) : null}

          {physician.interests?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">興趣與研究領域</h2>
              <div className="flex flex-wrap gap-1.5">
                {physician.interests.map((interest) => (
                  <Pill key={interest}>{interest}</Pill>
                ))}
              </div>
            </section>
          ) : null}

          {physician.education?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">教育</h2>
              <ul className="list-disc pl-4 text-sm text-gray-700">
                {physician.education.map((edu) => (
                  <li key={edu}>{edu}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {physician.affiliations?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">專業組織</h2>
              <ul className="list-disc pl-4 text-sm text-gray-700">
                {physician.affiliations.map((aff) => (
                  <li key={aff}>{aff}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {physician.awards?.length ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">獎項</h2>
              <ul className="list-disc pl-4 text-sm text-gray-700">
                {physician.awards.map((award) => (
                  <li key={award}>{award}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {(physician.languages?.length || physician.staffLanguages?.length) ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">語言</h2>
              {physician.languages?.length ? (
                <p className="text-sm text-gray-700">醫師：{physician.languages.join("、")}</p>
              ) : null}
              {physician.staffLanguages?.length ? (
                <p className="text-sm text-gray-700">員工：{physician.staffLanguages.join("、")}</p>
              ) : null}
            </section>
          ) : null}

          {physician.locationAddress ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">執業地點</h2>
              <address className="not-italic whitespace-pre-line text-sm text-gray-700">{physician.locationAddress}</address>
            </section>
          ) : null}

          {physician.officeHours ? (
            <section>
              <h2 className="mb-2 text-sm font-semibold text-gray-700">辦公時間</h2>
              <p className="text-sm text-gray-700">{physician.officeHours}</p>
            </section>
          ) : null}

          {(physician.phoneExisting || physician.phoneNew || physician.insuranceNote) ? (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {physician.phoneExisting ? (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700">現有患者</h2>
                  <p className="text-sm text-gray-700"><a className="underline" href={`tel:${physician.phoneExisting}`}>{physician.phoneExisting}</a></p>
                </div>
              ) : null}
              {physician.phoneNew ? (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700">新患者</h2>
                  <p className="text-sm text-gray-700"><a className="underline" href={`tel:${physician.phoneNew}`}>{physician.phoneNew}</a></p>
                </div>
              ) : null}
              {physician.insuranceNote ? (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700">接受保險</h2>
                  <p className="text-sm text-gray-700">{physician.insuranceNote}</p>
                </div>
              ) : null}
            </section>
          ) : null}

          {(physician.certifications?.length || physician.categories?.length) ? (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {physician.certifications?.length ? (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700">認證</h2>
                  <ul className="list-disc pl-4 text-sm text-gray-700">
                    {physician.certifications.map((cert) => (
                      <li key={cert}>{cert}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {physician.categories?.length ? (
                <div>
                  <h2 className="mb-2 text-sm font-semibold text-gray-700">分類</h2>
                  <ul className="list-disc pl-4 text-sm text-gray-700">
                    {physician.categories.map((cat) => (
                      <li key={cat}>{cat}</li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </section>
          ) : null}
        </div>
      </div>
    </main>
  );
};

const PhysicianDirectory = () => {
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
    return <PhysicianDetail physician={selected} onBack={() => setSelectedId(null)} />;
  }

  return (
    <main>
      <section className="mb-4">
        <h1 className="text-3xl font-bold tracking-tight">美國醫師團隊</h1>
        <p className="text-sm text-gray-600">認識我們在美國的醫師團隊。</p>
      </section>

      <section>
        {PHYSICIAN_DATA.length === 0 ? (
          <p className="text-sm text-gray-600">目前尚無醫師資料。</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {PHYSICIAN_DATA.map((physician) => (
              <PhysicianCard key={physician.id} physician={physician} onOpen={setSelectedId} cta="了解更多" />
            ))}
          </div>
        )}
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(listJsonLd) }}
      />
    </main>
  );
};

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
    knowledgeTitle: { zh: "祈孕顧問．美國代孕知識與消息", en: "US Surrogacy Knowledge & News" },
    processTitle: { zh: "流程", en: "Process" },
    teamTitle: { zh: "團隊", en: "Team" },
    faqTitle: { zh: "常見問題", en: "Frequently Asked Questions" },
    contactTitle: { zh: "聯絡我們", en: "Get In Touch" },
    formName: { zh: "您的姓名", en: "Your Name" },
    formEmail: { zh: "Email", en: "Email" },
    formMsg: { zh: "想了解的重點", en: "What would you like to know?" },
    formSubmit: { zh: "送出表單", en: "Send" },
  }), [lang]);

  // Google Maps link for address
  const mapUrl = React.useMemo(() => `https://www.google.com/maps?q=${encodeURIComponent(BRAND.address)}` , []);

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
    const pageTitle = lang === 'zh' ? `${BRAND.name}｜代孕服務專家` : `${BRAND.name} | Surrogacy Services`;
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
      <div className={cx("w-full sticky top-0 z-50 transition-shadow", scrolled ? "bg-gradient-to-r from-white/92 via-[var(--brand-50)]/85 to-white/92 shadow-md backdrop-blur" : "bg-gradient-to-r from-white/85 via-[var(--brand-50)]/70 to-white/85 border-b backdrop-blur")}
      >
        <div className={cx("mx-auto max-w-6xl px-4 flex items-center justify-between", scrolled ? "h-16" : "h-20")}
        >
          <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <Baby className="h-7 w-7 text-[var(--brand-800)]" />
            <span className="font-semibold tracking-tight text-xl md:text-2xl text-[var(--brand-800)]">{BRAND.name}</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-base md:text-lg font-medium rounded-full bg-white/75 px-6 py-2 shadow-sm backdrop-blur">
            {NAV.map((n) => {
              const isActive = active === n.id;
              return (
                <a
                  key={n.id}
                  href={n.path}
                  className={cx(
                    "px-2 py-1 rounded-full transition-colors",
                    isActive ? "bg-[var(--brand-50)] text-[var(--brand)]" : "text-slate-700 hover:text-[var(--brand)] hover:bg-[var(--brand-50)]/80"
                  )}
                >
                  {lang === "zh" ? n.zh : n.en}
                </a>
              );
            })}
          </nav>
          <div className="flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 shadow-sm backdrop-blur">
            <Button variant="outline" className="px-4 py-1.5 text-base md:text-lg" onClick={() => setLang(lang === "zh" ? "en" : "zh")}>
              <Languages className="mr-2 h-4 w-4"/>{lang === "zh" ? "EN" : "中文"}
            </Button>
            <a href={NAV.find(n=>n.id==='contact').path}>
              <Button className="text-lg md:text-xl px-5 py-2.5 hover:scale-105 transition-transform bg-gradient-to-r from-[var(--brand)] to-[var(--brand-800)]">
                {lang === "zh" ? t.heroCTA.zh : t.heroCTA.en}
              </Button>
            </a>
          </div>
        </div>
        {/* Mobile nav scroller */}
        <div className="md:hidden overflow-x-auto border-t border-white/50 bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3 text-base whitespace-nowrap">
            {NAV.map((n) => {
              const isActive = active === n.id;
              return (
                <a
                  key={n.id}
                  href={n.path}
                  className={cx(
                    "px-3 py-1.5 rounded-full border",
                    isActive ? "border-[var(--brand)] bg-[var(--brand-50)] text-[var(--brand)]" : "border-transparent bg-white/70 text-slate-700"
                  )}
                >
                  {lang === "zh" ? n.zh : n.en}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* SINGLE SCROLLABLE PAGE LAYOUT */}
      
      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden min-h-[80vh]">
        <div className="absolute inset-0 -z-20">
          <img src={HERO_IMAGES[heroIndex]} alt="背景圖" className="h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--brand-800)/45,rgba(12,33,28,0.75))]"></div>
        <div className="section-shell grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-center min-h-[80vh] relative z-10">
          <div className="bg-white/92 rounded-3xl p-7 sm:p-10 shadow-lg backdrop-blur">
            <span className="inline-flex items-center gap-2 rounded-full bg-[var(--brand-50)] px-4 py-1 text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand-800)]">
              {lang === "zh" ? "專業美國代孕" : "US Surrogacy Expert"}
            </span>
            <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-4 text-2xl sm:text-3xl md:text-[2.5rem] leading-[2] font-bold tracking-tight text-slate-900">
              {lang === "zh" ? t.heroTitle.zh : t.heroTitle.en}
            </motion.h1>
            <p className="mt-5 text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {lang === "zh" ? t.heroSub.zh : t.heroSub.en}
            </p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href={NAV.find(n=>n.id==='contact').path}><Button className="text-base sm:text-lg px-6 py-3 sm:px-7 sm:py-3.5 hover:translate-y-[-1px] transition-transform w-full sm:w-auto">{lang === "zh" ? t.heroCTA.zh : t.heroCTA.en}</Button></a>
              <a href={NAV.find(n=>n.id==='services').path}><Button variant="outline" className="text-base sm:text-lg px-6 py-3 sm:px-7 sm:py-3.5 hover:translate-y-[-1px] transition-transform w-full sm:w-auto">{lang === "zh" ? "了解代孕服務" : "Explore Services"}</Button></a>
            </div>
            <div className="mt-6 grid gap-3 text-sm sm:text-base md:text-lg text-slate-500 sm:grid-cols-2">
              <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4"/>{BRAND.phone}</span>
              <span className="inline-flex items-center gap-2"><Mail className="h-4 w-4"/>{BRAND.email}</span>
              <a href={mapUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[var(--brand-800)] transition-colors sm:col-span-2"><MapPin className="h-4 w-4"/><span className="underline decoration-dotted underline-offset-2">{BRAND.address}</span></a>
            </div>
          </div>
          <div className="hidden md:flex justify-end">
            <div className="space-y-6 max-w-md">
              <div className="relative overflow-hidden rounded-3xl border border-white/70 shadow-[0_40px_80px_-60px_rgba(1,152,117,0.5)]">
                <img
                  src={ILLUSTRATIONS.hero.src}
                  alt={lang === "zh" ? ILLUSTRATIONS.hero.zhAlt : ILLUSTRATIONS.hero.enAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/20" />
              </div>
              <Card className="py-8 px-6 bg-white/85 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="text-2xl text-[var(--brand-800)]">{lang === "zh" ? "貼近家庭的美國代孕顧問" : "Family-Centered US Surrogacy"}</CardTitle>
                  <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                    {lang === "zh" ? "汲取 HRC Fertility 團隊經驗，以醫療、法務、心理全方位照護，為多元家庭打造更安心的迎新旅程。" : "Inspired by HRC Fertility, we blend medical, legal, and emotional support to craft a reassuring journey for every growing family."}
                  </p>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {["跨州法務諮詢","一對一專案經理","透明里程碑費用"].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-600">
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-50)] text-[var(--brand-800)] font-semibold">{idx + 1}</span>
                      <span>{lang === "zh" ? item : ["Cross-State Legal Advisors","Dedicated Project Manager","Transparent Milestone Pricing"][idx]}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-shell">
        <div className="relative overflow-hidden rounded-[36px] shadow-[0_50px_90px_-70px_rgba(1,152,117,0.55)]">
          <div aria-hidden className="absolute inset-0">
            <img
              src="/images/gallery/egg_freezing900.webp"
              srcSet="/images/gallery/egg_freezing480.webp 480w, /images/gallery/egg_freezing900.webp 900w, /images/gallery/egg_freezing1600.webp 1600w"
              sizes="(min-width: 1280px) 1100px, (min-width: 1024px) 900px, 100vw"
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/92 via-white/86 to-[var(--brand-50)]/75 backdrop-blur-[2px]" />
          </div>
          <div className="relative px-6 sm:px-12 py-16 lg:py-20">
            <div className="max-w-4xl">
              <SectionTitle>{lang === "zh" ? t.servicesTitle.zh : t.servicesTitle.en}</SectionTitle>
              <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed">
                {lang === "zh"
                  ? "結合 HRC Fertility 醫療鏈與法務夥伴，為每個家庭打造安心、透明的美國代孕方案。"
                  : "Partnering with HRC Fertility physicians and legal experts, we craft transparent and reassuring US surrogacy plans for every family."}
              </p>
            </div>
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map(({ icon: Icon, zh, en, descZh, descEn }, index) => (
                <div
                  key={zh}
                  className="group rounded-2xl border border-white/70 bg-white/88 backdrop-blur-sm p-6 shadow-[0_30px_60px_-55px_rgba(1,152,117,0.6)] transition-transform hover:-translate-y-1"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                      index === 0 ? 'bg-pink-100 text-pink-600' :
                      index === 1 ? 'bg-blue-100 text-blue-600' :
                      index === 2 ? 'bg-green-100 text-green-600' :
                      index === 3 ? 'bg-orange-100 text-orange-600' :
                      index === 4 ? 'bg-violet-100 text-violet-600' :
                      'bg-teal-100 text-teal-600'
                    }`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900">
                      {lang === "zh" ? zh : en}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {lang === "zh" ? descZh : descEn}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Section - Interactive Surrogacy Journey */}
      <section id="knowledge" className="section-shell">
        <div className="space-y-12">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] items-center">
            <div className="max-w-4xl">
              <SectionTitle>{lang === "zh" ? t.knowledgeTitle.zh : t.knowledgeTitle.en}</SectionTitle>
              <p className="mt-3 text-slate-600 text-base sm:text-lg">
                {lang === "zh" ? "提供代孕相關的知識文章、法規更新與最新消息。" : "Knowledge articles, regulatory updates, and the latest surrogacy news."}
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src={ILLUSTRATIONS.knowledge.src}
                srcSet={ILLUSTRATIONS.knowledge.srcSet}
                sizes={ILLUSTRATIONS.knowledge.sizes}
                alt={lang === "zh" ? ILLUSTRATIONS.knowledge.zhAlt : ILLUSTRATIONS.knowledge.enAlt}
                className="w-[320px] max-w-full rounded-3xl border border-white/70 shadow-[0_40px_80px_-60px_rgba(1,152,117,0.45)]"
                loading="lazy"
              />
            </div>
            <div className="lg:hidden">
              <img
                src={ILLUSTRATIONS.knowledge.src}
                srcSet={ILLUSTRATIONS.knowledge.srcSet}
                sizes="100vw"
                alt={lang === "zh" ? ILLUSTRATIONS.knowledge.zhAlt : ILLUSTRATIONS.knowledge.enAlt}
                className="w-full rounded-3xl border border-white/70 shadow-[0_30px_60px_-50px_rgba(1,152,117,0.35)]"
                loading="lazy"
              />
            </div>
          </div>

          {/* WHY HRC Section */}
          <div className="rounded-[32px] bg-white/95 backdrop-blur border border-white/70 px-6 sm:px-10 py-12 shadow-[0_35px_60px_-50px_rgba(0,107,86,0.35)]">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4 text-slate-900">{lang === "zh" ? "為什麼選擇 HRC Fertility？" : "Why Choose HRC Fertility?"}</h2>
            <p className="text-center text-base sm:text-lg text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">{lang === "zh" ? "跨專科團隊、完善檢測與法務流程、重視身心與隱私；以實證醫學與貼心服務陪伴每一步。" : "A cross-disciplinary team with comprehensive diagnostics and legal processes, prioritising wellbeing and privacy with evidence-based, compassionate care."}</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[{
                zhTitle:"01 專業團隊與個人化方案",
                enTitle:"01 Professional Team & Personalized Solutions",
                zhPoints:["生殖內分泌專科、胚胎實驗室與護理個管跨域協作","依病因（輸卵管阻塞、多囊、男性因素等）與年齡擬定方案"],
                enPoints:["Collaboration between reproductive endocrinology specialists, embryology labs, and care coordinators","Tailored protocols based on underlying causes and patient age"]
              },{
                zhTitle:"02 第三方生殖經驗",
                enTitle:"02 Third-Party Reproduction Experience",
                zhPoints:["嚴謹代母／卵子精子捐贈評估與媒合","與法務夥伴協作，確保權益與合規"],
                enPoints:["Rigorous surrogate and gamete donor evaluations with thoughtful matching","Partnering with legal specialists to safeguard rights and compliance"]
              },{
                zhTitle:"03 全程陪伴",
                enTitle:"03 Full Journey Support",
                zhPoints:["前測、刺激排卵、受精培養至胚胎移植一站式","孕期與產後關懷，提供心理支持與資源"],
                enPoints:["One-stop support from assessment, stimulation, fertilisation to embryo transfer","Pregnancy and postpartum care with emotional support and resources"]
              }].map((block, idx) => (
                <article key={idx} className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm hover:shadow-md transition-all">
                  <h3 className="text-xl font-semibold mb-4 text-[var(--brand-800)]">
                    {lang === "zh" ? block.zhTitle : block.enTitle}
                  </h3>
                  <ul className="space-y-3 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {(lang === "zh" ? block.zhPoints : block.enPoints).map((point, pointIdx) => (
                      <li key={pointIdx} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[var(--brand-50)] text-[var(--brand-800)] font-semibold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          {/* Interactive Surrogacy Journey */}
          <div className="mt-12 max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-3">{lang === "zh" ? "代孕旅程" : "Surrogacy Journey"}</h3>
              <p className="text-slate-600 mb-4">
                {lang === "zh"
                  ? "所謂代孕，是由一位女性為他人或伴侶懷孕並完成生產，幫助他們實現為人父母的心願。本互動指南將帶你走過代孕旅程的重要環節，從代母挑選與嚴謹篩檢，到法律保障與流程重點。"
                  : "Surrogacy is when a woman carries and gives birth to a child for another person or couple, helping them fulfill their dream of becoming parents. This interactive guide will take you through the key aspects of the surrogacy journey, from surrogate selection and rigorous screening to legal protections and process highlights."
                }
              </p>
            </div>

            {/* Interactive Screening Module */}
            <SurrogacyScreeningModule lang={lang} />

            {/* Surrogacy Overview */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="inline-block bg-[var(--brand)] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {lang === "zh" ? "妊娠代孕 Surrogacy" : "Gestational Surrogacy"}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">{lang === "zh" ? "誰適合、如何開始？" : "Who is Suitable, How to Start?"}</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <p className="text-slate-600 mb-6">{lang === "zh" ? "妊娠代孕適用於因醫療因素無法懷孕／不宜懷孕者、同性伴侶或需要第三方協助的家庭。" : "Gestational surrogacy is suitable for those unable to conceive/due to medical reasons, same-sex couples, or families needing third-party assistance."}</p>
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-[var(--brand)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                      <div>
                        <strong className="text-slate-800">{lang === "zh" ? "初談與評估：" : "Initial Consultation & Assessment:"}</strong>
                        <span className="text-slate-600 ml-1">{lang === "zh" ? "了解目標、病史與可行選項，說明法規與時程。" : "Understand goals, medical history and viable options, explain regulations and timeline."}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-[var(--brand)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                      <div>
                        <strong className="text-slate-800">{lang === "zh" ? "代母媒合與法務：" : "Surrogate Matching & Legal:"}</strong>
                        <span className="text-slate-600 ml-1">{lang === "zh" ? "健康篩檢、心理評估與合約簽訂，建立清楚的權利義務。" : "Health screening, psychological assessment and contract signing, establishing clear rights and obligations."}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-[var(--brand)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                      <div>
                        <strong className="text-slate-800">{lang === "zh" ? "醫療程序：" : "Medical Procedures:"}</strong>
                        <span className="text-slate-600 ml-1">{lang === "zh" ? "通常使用意向父母的胚胎（或捐贈卵／精），完成胚胎移植。" : "Usually using intended parents' embryos (or donor eggs/sperm), completing embryo transfer."}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 w-6 h-6 bg-[var(--brand)] text-white rounded-full flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                      <div>
                        <strong className="text-slate-800">{lang === "zh" ? "孕期關懷與生產：" : "Pregnancy Care & Birth:"}</strong>
                        <span className="text-slate-600 ml-1">{lang === "zh" ? "產檢更新、分娩規劃與親權文件。" : "Prenatal updates, birth planning and parental rights documentation."}</span>
                      </div>
                    </li>
                  </ol>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                  <h4 className="font-semibold text-slate-800 mb-3">{lang === "zh" ? "貼心提醒" : "Caring Reminders"}</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start">
                      <span className="text-[var(--brand)] mr-2">•</span>
                      {lang === "zh" ? "不同地區之法律差異大，務必由專業法務團隊把關。" : "Legal differences vary greatly by region, must be overseen by professional legal team."}
                    </li>
                    <li className="flex items-start">
                      <span className="text-[var(--brand)] mr-2">•</span>
                      {lang === "zh" ? "建立透明溝通（醫療、費用、保險、產檢更新）可促進合作關係。" : "Establish transparent communication (medical, costs, insurance, prenatal updates) to promote cooperative relationships."}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Gestational Surrogacy Explanation */}
            <div id="gestational-explained" className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">{lang === "zh" ? "妊娠型代孕說明" : "Gestational Surrogacy Explained"}</h3>
              <div className="grid grid-cols-1 gap-4 justify-items-center">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center text-blue-800 font-medium">
                  {lang === "zh" ? "意向父母的遺傳物質（精子與卵子）或捐贈者配子" : "Intended parents' genetic material (sperm and eggs) or donor gametes"}
                </div>
                <div className="text-2xl text-slate-400">↓</div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center text-green-800 font-medium">
                  {lang === "zh" ? "體外受精（IVF）以形成胚胎" : "In-vitro fertilization (IVF) to create embryos"}
                </div>
                <div className="text-2xl text-slate-400">↓</div>
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center text-purple-800 font-medium">
                  {lang === "zh" ? "將胚胎移植至代母子宮" : "Embryo transfer to surrogate's uterus"}
                </div>
                <div className="text-2xl text-slate-400">↓</div>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-center text-pink-800 font-medium">
                  {lang === "zh" ? "由代母承載孕程" : "Surrogate carries the pregnancy"}
                </div>
              </div>
              <p className="text-center mt-6 text-slate-600">
                {lang === "zh"
                  ? "在妊娠型代孕中，代母負責懷孕，但與寶寶沒有基因血緣關係。這是目前最常見的代孕形式。"
                  : "In gestational surrogacy, the surrogate carries the pregnancy but has no genetic relation to the baby. This is the most common form of surrogacy today."
                }
              </p>
            </div>

            {/* Legal Support */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">{lang === "zh" ? "法律與代孕機構支援" : "Legal & Agency Support"}</h3>

              <details className="mb-4">
                <summary className="cursor-pointer font-semibold text-lg mb-2 hover:text-[var(--brand)] transition-colors">
                  {lang === "zh" ? "完整的法律契約" : "Comprehensive Legal Contracts"}
                </summary>
                <div className="mt-2 text-slate-600">
                  {lang === "zh"
                    ? "完整的法律契約是成功代孕的基石。由生殖法專業律師擬定，明確載明意向父母與代母的權利、角色與責任，涵蓋親權歸屬、財務安排與孕期醫療決策等，確保各方自一開始即受到保障並有共同理解。"
                    : "Comprehensive legal contracts are the foundation of successful surrogacy. Drafted by reproductive law specialists, they clearly define the rights, roles, and responsibilities of intended parents and surrogates, covering parental rights, financial arrangements, and pregnancy medical decisions, ensuring all parties are protected and have a shared understanding from the start."
                  }
                </div>
              </details>

              <details>
                <summary className="cursor-pointer font-semibold text-lg mb-2 hover:text-[var(--brand)] transition-colors">
                  {lang === "zh" ? "代孕機構的角色" : "Role of Surrogacy Agencies"}
                </summary>
                <div className="mt-2 text-slate-600">
                  {lang === "zh"
                    ? "可信賴的代孕機構扮演向導與協調者：招募並嚴格篩選代母、進行相容性媒合、安排醫療與心理評估、管理財務托管（escrow），並協助親權建立與出生證明等法務流程，提供關鍵的專業支援以因應各種複雜情況。"
                    : "Trusted surrogacy agencies serve as guides and coordinators: recruiting and rigorously screening surrogates, facilitating compatibility matching, arranging medical and psychological evaluations, managing escrow accounts, and assisting with parental rights establishment and birth certificate processes, providing essential professional support to handle complex situations."
                  }
                </div>
              </details>
            </div>

            {/* Location Advantages */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="text-xl font-semibold mb-4">{lang === "zh" ? "地點的重要性" : "Importance of Location"}</h3>
              <p className="text-slate-600 mb-4">
                {lang === "zh"
                  ? "全球各地的代孕法規差異極大。具備明確、開放且成熟法律架構的地區（例如美國加州）特別受到國際意向父母青睞。"
                  : "Surrogacy laws vary greatly around the world. Regions with clear, open, and mature legal frameworks (such as California, USA) are particularly favored by international intended parents."
                }
              </p>
              <p className="text-slate-600">
                {lang === "zh"
                  ? "這些友善法制提供關鍵的法律確定性，包含允許使用卵／精捐贈與代母合作，以及在孩子出生前即可完成親權預立（pre-birth order）。健全的法規可降低爭議，確保寶寶出生當下即由意向父母取得合法親權。"
                  : "These friendly jurisdictions provide crucial legal certainty, including allowing egg/sperm donation and surrogate collaboration, as well as enabling pre-birth parental orders. Sound regulations reduce disputes and ensure intended parents obtain legal parental rights from the moment of birth."
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="section-shell">
        <div className="rounded-[32px] bg-white/92 backdrop-blur border border-white/70 px-6 sm:px-10 py-12 shadow-[0_35px_60px_-50px_rgba(0,107,86,0.35)]">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] items-center">
            <div>
              <SectionTitle>{lang === "zh" ? t.processTitle.zh : t.processTitle.en}</SectionTitle>
              <p className="mt-4 text-slate-600 max-w-3xl text-base sm:text-lg">
                {lang === "zh" ? "從諮詢到迎接新生，每一步都以專案經理陪伴，確保節奏清晰、資訊透明。" : "From consultation to birth, a dedicated manager guides every milestone with clarity and transparency."}
              </p>
            </div>
            <div className="hidden lg:block">
              <img
                src={ILLUSTRATIONS.process.src}
                srcSet={ILLUSTRATIONS.process.srcSet}
                sizes={ILLUSTRATIONS.process.sizes}
                alt={lang === "zh" ? ILLUSTRATIONS.process.zhAlt : ILLUSTRATIONS.process.enAlt}
                className="w-[320px] max-w-full rounded-3xl border border-white/70 shadow-[0_40px_80px_-60px_rgba(1,152,117,0.45)]"
                loading="lazy"
              />
            </div>
            <div className="lg:hidden">
              <img
                src={ILLUSTRATIONS.process.src}
                srcSet={ILLUSTRATIONS.process.srcSet}
                sizes="100vw"
                alt={lang === "zh" ? ILLUSTRATIONS.process.zhAlt : ILLUSTRATIONS.process.enAlt}
                className="w-full rounded-3xl border border-white/70 shadow-[0_30px_60px_-50px_rgba(1,152,117,0.35)]"
                loading="lazy"
              />
            </div>
          </div>
          <div className="mt-10 relative">
            <div className="hidden lg:block absolute top-16 left-10 right-10 h-px bg-gradient-to-r from-[var(--brand)] via-teal-300 to-[var(--brand-800)] opacity-40"></div>
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
              {STEPS.map((s, index) => (
                <li key={s.n} className="relative">
                  <div className="rounded-2xl border border-slate-100 bg-white/95 p-7 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                    <div className={cx(
                      "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full text-white text-lg font-semibold shadow-lg",
                      index === 0 ? 'bg-gradient-to-br from-blue-400 to-blue-600' :
                      index === 1 ? 'bg-gradient-to-br from-green-400 to-green-600' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                      index === 3 ? 'bg-gradient-to-br from-purple-400 to-purple-600' :
                      'bg-gradient-to-br from-pink-400 to-pink-600'
                    )}>
                      {s.n}
                    </div>
                    <div className="font-semibold text-lg mb-2 text-slate-900">{lang === "zh" ? s.zh : s.en}</div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{lang === "zh" ? s.descZh : s.descEn}</p>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3 top-16 -translate-y-1/2 text-[var(--brand)] opacity-60">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="section-shell">
        <div className="space-y-6">
          <SectionTitle>{lang === "zh" ? t.teamTitle.zh : t.teamTitle.en}</SectionTitle>
          <p className="text-slate-600 text-base sm:text-lg max-w-3xl">
            {lang === "zh" ? "HRC Fertility 醫師與專業團隊在美國各據點提供醫療照護，祈孕顧問串接流程與溝通，讓跨國療程也能像親臨現場般安心。" : "HRC Fertility physicians lead care across the US while Qiyun Consulting orchestrates every touchpoint, keeping cross-border journeys as calm as being onsite."}
          </p>
        </div>
        <div className="mt-10">
          <PhysicianDirectory />
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="section-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] items-start">
          <div className="max-w-3xl">
            <SectionTitle>{lang === "zh" ? t.faqTitle.zh : t.faqTitle.en}</SectionTitle>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">{lang === "zh" ? "快速了解常見問題，節省首次諮詢前的準備時間。" : "Explore frequently asked questions so you can make the most of your first consultation."}</p>
            <div className="mt-8 space-y-4">
              {FAQS.map((f, idx) => (
                <details key={idx} className="rounded-2xl border border-slate-100 bg-white/95 px-5 py-4 shadow-sm open:shadow-md transition-all">
                  <summary className="cursor-pointer select-none font-medium text-base sm:text-lg text-slate-800">
                    {lang === "zh" ? f.qZh : f.qEn}
                  </summary>
                  <div className="mt-2 text-slate-600 text-sm sm:text-base leading-relaxed">{lang === "zh" ? f.aZh : f.aEn}</div>
                </details>
              ))}
            </div>
          </div>
          <div className="hidden lg:block">
            <img
              src={ILLUSTRATIONS.faq.src}
              srcSet={ILLUSTRATIONS.faq.srcSet}
              sizes={ILLUSTRATIONS.faq.sizes}
              alt={lang === "zh" ? ILLUSTRATIONS.faq.zhAlt : ILLUSTRATIONS.faq.enAlt}
              className="w-[280px] max-w-full rounded-3xl border border-white/70 shadow-[0_40px_80px_-60px_rgba(1,152,117,0.45)]"
              loading="lazy"
            />
          </div>
          <div className="lg:hidden">
            <img
              src={ILLUSTRATIONS.faq.src}
              srcSet={ILLUSTRATIONS.faq.srcSet}
              sizes="100vw"
              alt={lang === "zh" ? ILLUSTRATIONS.faq.zhAlt : ILLUSTRATIONS.faq.enAlt}
              className="w-full rounded-3xl border border-white/70 shadow-[0_30px_60px_-50px_rgba(1,152,117,0.35)]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-shell">
        <div className="rounded-[32px] bg-white/95 backdrop-blur border border-white/70 px-6 sm:px-10 py-12 shadow-[0_35px_60px_-50px_rgba(0,107,86,0.35)]">
          <div className="text-center max-w-3xl mx-auto">
            <SectionTitle>{lang === "zh" ? t.contactTitle.zh : t.contactTitle.en}</SectionTitle>
            <p className="mt-3 text-slate-600 text-base sm:text-lg">
              {lang === "zh" ? "留下聯絡方式，我們的顧問團隊會於一個工作天內與您安排視訊或電話諮詢。" : "Leave your details and our consultants will arrange a video or phone consultation within one business day."}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
            {/* Left: Form */}
            <Card className="h-full">
              <CardContent className="pt-6 space-y-5">
                {sent ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700 text-sm">
                    {lang === "zh" ? "感謝您的留言！我們已收到，會儘快回覆。" : "Thanks! We've received your message and will reply soon."}
                  </div>
                ) : null}
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                  {/* Honeypot for bots */}
                  <div className="hidden" aria-hidden>
                    <label>Do not fill
                      <input name="hp" tabIndex={-1} autoComplete="off" />
                    </label>
                  </div>
                  <div>
                    <label className="text-base block mb-1">{lang === "zh" ? t.formName.zh : t.formName.en}</label>
                    <Input name="name" required placeholder={lang === "zh" ? "王小明" : "Jane Doe"} />
                  </div>
                  <div>
                    <label className="text-base block mb-1">{lang === "zh" ? t.formEmail.zh : t.formEmail.en}</label>
                    <Input name="email" type="email" required placeholder="you@example.com" />
                  </div>
                  <div>
                    <label className="text-base block mb-1">{lang === "zh" ? t.formMsg.zh : t.formMsg.en}</label>
                    <Textarea name="message" rows={5} required placeholder={lang === "zh" ? "請簡述需求與時程" : "Tell us your needs & timing"} />
                  </div>
                  <input type="hidden" name="_subject" value="祈孕顧問：網站聯絡表單" />
                  <Button className="w-full" disabled={loading}>{loading ? (lang === "zh" ? "送出中…" : "Sending…") : (lang === "zh" ? t.formSubmit.zh : t.formSubmit.en)}</Button>
                  <p className="text-xs text-slate-500">{lang === "zh" ? "送出代表同意我們的服務條款與隱私政策。" : "By sending, you agree to our Terms and Privacy."}</p>
                </form>
              </CardContent>
            </Card>

            {/* Right: Info */}
            <div className="space-y-5">
              <Card>
                <CardContent className="pt-6 space-y-3 text-sm sm:text-base">
                  <div className="flex items-center gap-3"><Phone className="h-4 w-4"/><span>{BRAND.phone}</span></div>
                  <div className="flex items-center gap-3"><Mail className="h-4 w-4"/><span>{BRAND.email}</span></div>
                  <a href={mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-[var(--brand-800)] transition-colors"><MapPin className="h-4 w-4"/><span className="underline decoration-dotted underline-offset-2">{BRAND.address}</span></a>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6 text-sm sm:text-base text-slate-600 space-y-3">
                  {lang === "zh" ? (
                    <>
                      <p>想快速上線？此模板已含雙語切換、導覽、Hero、服務卡片、流程、團隊、FAQ 與表單區塊。直接替換文字與圖片即可。</p>
                      <p>也可加值：<strong>LINE</strong> 浮動按鈕、<strong>GA4/Meta Pixel</strong>、<strong>表單串接</strong>（Formspree/Getform）。</p>
                    </>
                  ) : (
                    <>
                      <p>Go live fast: bilingual toggle, nav, hero, services, process, team, FAQ, and contact form included. Replace copy & images to ship today.</p>
                      <p>Optional add‑ons: floating LINE, GA4/Meta Pixel, and form integrations (Formspree/Getform).</p>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    </section>

      {/* Floating chat buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        <a href="https://line.me/R/ti/p/@yourOfficialLine" target="_blank" rel="noreferrer">
          <Button className="rounded-full px-4 py-3 shadow-lg"><span className="mr-2">LINE</span></Button>
        </a>
      </div>

      {/* JSON-LD SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        name: BRAND.name,
        url: "https://qiyun.example",
        slogan: BRAND.tagline,
        email: BRAND.email,
        telephone: BRAND.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "復興北路58號10樓",
          addressLocality: "台北市",
          addressCountry: "TW"
        },
        sameAs: [
          "https://line.me/R/ti/p/@yourOfficialLine"
        ]
      })}} />

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
