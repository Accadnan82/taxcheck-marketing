// components/PublicLayout.js
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function applyDir(lang) {
  const isAR = lang === "AR";
  const dir = isAR ? "rtl" : "ltr";

  if (typeof document !== "undefined") {
    document.documentElement.lang = isAR ? "ar" : "en";
    document.documentElement.dir = dir;
  }
}

export default function PublicLayout({ children }) {
  const router = useRouter();

  // ✅ اجعل القيمة معيارية: "AR" / "EN"
  const [lang, setLang] = useState("EN");

  // ✅ اقرأ من localStorage مرة واحدة عند التحميل
  useEffect(() => {
    try {
      const saved = localStorage.getItem("tc_lang");
      const normalized = saved === "AR" || saved === "EN" ? saved : "EN";
      setLang(normalized);
      applyDir(normalized);
    } catch (_) {
      setLang("EN");
      applyDir("EN");
    }
  }, []);

  // ✅ عند تغيير اللغة: خزّن + طبّق dir + أطلق الحدث الذي تنتظره الصفحات
  useEffect(() => {
    try {
      localStorage.setItem("tc_lang", lang);
    } catch (_) {}

    applyDir(lang);

    // IMPORTANT: this matches Home/Pricing/Contact listeners
    window.dispatchEvent(new Event("tc_lang_change"));
  }, [lang]);

  const t = useMemo(() => {
    const AR = {
      home: "الرئيسية",
      pricing: "الأسعار",
      services: "الخدمات",
      contact: "تواصل معنا",
      signin: "تسجيل الدخول",
      brandSub: "ضريبة الشركات والـ VAT • الإمارات",
    };
    const EN = {
      home: "Home",
      pricing: "Pricing",
      services: "Services",
      contact: "Contact",
      signin: "Login",
      brandSub: "Corporate Tax & VAT • UAE",
    };
    return lang === "AR" ? AR : EN;
  }, [lang]);

  const isActive = (href) => router.pathname === href;

  return (
    <div className="tc">
      <header className="tc-header">
        <div className="tc-headerInner">
          <div className="tc-brand">
            <div className="tc-logo">T</div>
            <div className="tc-brandText">
              <div className="tc-brandTitle">TaxCheck</div>
              <div className="tc-brandSub">{t.brandSub}</div>
            </div>
          </div>

          <nav className="tc-nav" aria-label="Primary">
            <Link className={`tc-navLink ${isActive("/") ? "is-active" : ""}`} href="/">
              {t.home}
            </Link>

            <Link className={`tc-navLink ${isActive("/pricing") ? "is-active" : ""}`} href="/pricing">
              {t.pricing}
            </Link>

            <Link className={`tc-navLink ${isActive("/services") ? "is-active" : ""}`} href="/services">
              {t.services}
            </Link>

            <Link className={`tc-navLink ${isActive("/contact") ? "is-active" : ""}`} href="/contact">
              {t.contact}
            </Link>
          </nav>

          <div className="tc-actions">
            <button
              className="tc-lang"
              type="button"
              onClick={() => setLang((p) => (p === "AR" ? "EN" : "AR"))}
              aria-label="Language"
              title="Language"
            >
              {lang === "AR" ? "EN" : "AR"}
            </button>

            <a className="tc-btn" href="https://app.taxcheck.ae/login">
              {t.signin}
            </a>
          </div>
        </div>
      </header>

      <main className="tc-main">{children}</main>
    </div>
  );
}
