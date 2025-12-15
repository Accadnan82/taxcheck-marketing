// components/PublicLayout.js
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

function applyDir(lang) {
  const dir = lang === "ar" ? "rtl" : "ltr";
  if (typeof document !== "undefined") {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }
}

export default function PublicLayout({ children }) {
  const router = useRouter();
  const [lang, setLang] = useState("ar");

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && localStorage.getItem("tc_lang")) || "ar";
    setLang(saved);
    applyDir(saved);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem("tc_lang", lang);
    applyDir(lang);

    // إشعار لكل الصفحات لتحديث النصوص فوراً
    window.dispatchEvent(new CustomEvent("tc-lang-change", { detail: { lang } }));
  }, [lang]);

  const t = useMemo(() => {
    const ar = {
      home: "الرئيسية",
      pricing: "الأسعار",
      about: "من نحن",
      services: "الخدمات",
      contact: "تواصل معنا",
      signin: "تسجيل الدخول",
      brandSub: "ضريبة الشركات والـ VAT • الإمارات",
    };
    const en = {
      home: "Home",
      pricing: "Pricing",
      about: "About",
      services: "Services",
      contact: "Contact",
      signin: "Sign in",
      brandSub: "Corporate Tax & VAT • UAE",
    };
    return lang === "ar" ? ar : en;
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

          <nav className="tc-nav">
            <Link className={`tc-navLink ${isActive("/") ? "is-active" : ""}`} href="/">
              {t.home}
            </Link>
            <Link
              className={`tc-navLink ${isActive("/pricing") ? "is-active" : ""}`}
              href="/pricing"
            >
              {t.pricing}
            </Link>
            <Link
              className={`tc-navLink ${isActive("/about") ? "is-active" : ""}`}
              href="/about"
            >
              {t.about}
            </Link>

            {/* رابط خدمات (يروح لقسم الخدمات بالهوم) */}
            <a className="tc-navLink" href="/#services">
              {t.services}
            </a>

            {/* رابط تواصل (إذا بدك القسم لاحقاً) */}
            <a className="tc-navLink" href="/#contact">
              {t.contact}
            </a>
          </nav>

          <div className="tc-actions">
            {/* زر اللغة جنب Sign in */}
            <button
              className="tc-lang"
              type="button"
              onClick={() => setLang((p) => (p === "ar" ? "en" : "ar"))}
              aria-label="Language"
              title="Language"
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>

            <a className="tc-btn" href="https://app.taxcheck.ae/login">
              {t.signin}
            </a>

            {/* تم حذف Start Free نهائياً */}
          </div>
        </div>
      </header>

      {children}
    </div>
  );
}
