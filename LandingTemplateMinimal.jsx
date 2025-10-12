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
        body {
          font-size:1rem;
          letter-spacing:.2px;
          line-height:1.75;
          background:linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(233,247,244,0.4) 100%);
          font-family: 'Inter', 'Noto Sans TC', sans-serif;
        }
        .section-shell {
          max-width:1200px;
          margin:0 auto;
          padding:4rem 1.5rem;
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

const NAV = [
  { id: "home", path: "#hero", zh: "首頁", en: "Home" },
  { id: "services", path: "#services", zh: "代孕服務", en: "Services" },
  { id: "contact", path: "#contact", zh: "聯絡", en: "Contact" },
];

export default function LandingTemplateMinimal() {
  const [lang, setLang] = useState("zh");
  const [scrolled, setScrolled] = useState(false);

  const t = useMemo(() => ({
    heroTitle: {
      zh: "以專業與溫度，完成你的家庭藍圖",
      en: "Professional, compassionate support for your family journey",
    },
    heroCTA: { zh: "免費諮詢", en: "Free Consultation" },
  }), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--brand-50)]/50 text-slate-900">
      <GlobalStyles />

      {/* Top Bar */}
      <div className={cx("w-full sticky top-0 z-50 transition-shadow", 
        scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white/85 border-b backdrop-blur"
      )}>
        <div className="mx-auto max-w-6xl px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 shadow-sm backdrop-blur">
            <Baby className="h-7 w-7 text-[var(--brand-800)]" />
            <span className="font-semibold tracking-tight text-xl text-[var(--brand-800)]">{BRAND.name}</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-4 text-base font-medium">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={n.path}
                className="px-4 py-2 rounded-full hover:bg-[var(--brand-50)] text-slate-700 hover:text-[var(--brand-800)] transition-colors"
              >
                {n[lang]}
              </a>
            ))}
          </nav>

          <button
            onClick={() => setLang(lang === "zh" ? "en" : "zh")}
            className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--brand)] text-white hover:bg-[var(--brand-800)] transition-colors"
          >
            <Languages className="h-4 w-4" />
            {lang === "zh" ? "EN" : "中文"}
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[var(--brand-50)] to-white">
        <div className="section-shell text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-[var(--brand-800)] mb-6">
              {t.heroTitle[lang]}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8">
              {BRAND.tagline}
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--brand)] text-white rounded-full text-lg font-semibold hover:bg-[var(--brand-800)] transition-colors shadow-lg"
            >
              <Baby className="h-5 w-5" />
              {t.heroCTA[lang]}
            </a>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section-shell">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-4">
            {lang === "zh" ? "我們的服務" : "Our Services"}
          </h2>
          <p className="text-xl text-slate-600">
            {lang === "zh" ? "專業的代孕服務，陪伴您完成家庭夢想" : "Professional surrogacy services to help you achieve your family dreams"}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: HeartHandshake,
              zh: "夫妻代孕",
              en: "Couple Surrogacy",
              descZh: "為已婚夫妻提供專業代孕服務",
              descEn: "Professional surrogacy services for married couples"
            },
            {
              icon: Users2,
              zh: "同志代孕",
              en: "LGBTQ+ Surrogacy",
              descZh: "支援同志伴侶代孕需求",
              descEn: "Supporting LGBTQ+ couples"
            },
            {
              icon: ShieldCheck,
              zh: "法律諮詢",
              en: "Legal Consultation",
              descZh: "提供完整的法律保障與諮詢",
              descEn: "Complete legal protection and consultation"
            }
          ].map((service, index) => (
            <div key={index} className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <service.icon className="h-12 w-12 text-[var(--brand)] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-[var(--brand-800)]">
                {service[lang]}
              </h3>
              <p className="text-slate-600">
                {lang === "zh" ? service.descZh : service.descEn}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-shell bg-[var(--brand-50)]/30">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--brand-800)] mb-4">
            {lang === "zh" ? "聯絡我們" : "Contact Us"}
          </h2>
          <p className="text-xl text-slate-600">
            {lang === "zh" ? "歡迎與我們聯絡，開始您的家庭計劃" : "Contact us to start your family planning journey"}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Phone className="h-6 w-6 text-[var(--brand)]" />
              <div>
                <div className="font-semibold text-[var(--brand-800)]">
                  {lang === "zh" ? "電話" : "Phone"}
                </div>
                <div className="text-slate-600">{BRAND.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
              <Mail className="h-6 w-6 text-[var(--brand)]" />
              <div>
                <div className="font-semibold text-[var(--brand-800)]">
                  {lang === "zh" ? "電子郵件" : "Email"}
                </div>
                <div className="text-slate-600">{BRAND.email}</div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-[var(--brand-800)]">
              {lang === "zh" ? "免費諮詢" : "Free Consultation"}
            </h3>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={lang === "zh" ? "姓名" : "Name"}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                />
                <input
                  type="email"
                  placeholder={lang === "zh" ? "電子郵件" : "Email"}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
                />
              </div>
              <textarea
                placeholder={lang === "zh" ? "請描述您的需求..." : "Please describe your needs..."}
                rows={4}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand)]"
              />
              <button
                type="submit"
                className="w-full px-6 py-3 bg-[var(--brand)] text-white rounded-lg font-semibold hover:bg-[var(--brand-800)] transition-colors"
              >
                {lang === "zh" ? "發送訊息" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--brand-800)] text-white py-8">
        <div className="section-shell text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Baby className="h-8 w-8" />
            <span className="text-2xl font-bold">{BRAND.name}</span>
          </div>
          <p className="text-[var(--brand-50)] mb-4">{BRAND.tagline}</p>
          <div className="text-sm text-[var(--brand-50)]">
            © 2024 {BRAND.name}. {lang === "zh" ? "版權所有" : "All rights reserved"}.
          </div>
        </div>
      </footer>
    </div>
  );
}