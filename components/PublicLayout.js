import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useState } from "react";
import { APP_LOGIN } from "../lib/links";

export default function PublicLayout({ children }) {
  const router = useRouter();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tc_lang") : null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("tc_lang", lang);
  }, [lang]);

  const t = useMemo(() => getCopy(lang), [lang]);

  const nav = [
    { label: t.nav.home, href: "/" },
    { label: t.nav.pricing, href: "/pricing" },
    { label: t.nav.about, href: "/about" },
    { label: t.nav.services, href: "/services" },
    { label: t.nav.contact, href: "/contact" },
  ];

  return (
    <div className="tc" dir={t.dir} lang={lang}>
      <header className="tc-header">
        <div className="tc-headerInner">
          <div className="tc-brand">
            <div className="tc-logo">T</div>
            <div>
              <div className="tc-brandTitle">TaxCheck</div>
              <div className="tc-brandSub">Corporate Tax &amp; VAT • UAE</div>
            </div>
          </div>

          <nav className="tc-nav" aria-label="Primary">
            {nav.map((item) => {
              const isActive = router.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`tc-navLink ${isActive ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="tc-actions">
            {/* زر اللغة بجانب Sign in */}
            <button
              type="button"
              className="tc-btn tc-btnLang"
              onClick={() => setLang((v) => (v === "en" ? "ar" : "en"))}
              aria-label="Switch language"
              title="Switch language"
            >
              {lang === "en" ? "AR" : "EN"}
            </button>

            <a className="tc-btn tc-btnPrimary" href={APP_LOGIN}>
              {t.signIn}
            </a>

            {/* تم إلغاء Start Free من الهيدر بالكامل */}
          </div>
        </div>
      </header>

      <main className="tc-main">{children}</main>

      <footer className="tc-footer">
        <div className="tc-footerInner">
          <div>© {new Date().getFullYear()} TaxCheck</div>
          <div className="tc-footerLinks">
            <Link href="/pricing">{t.nav.pricing}</Link>
            <Link href="/about">{t.nav.about}</Link>
            <Link href="/services">{t.nav.services}</Link>
            <Link href="/contact">{t.nav.contact}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function getCopy(lang) {
  const en = {
    dir: "ltr",
    signIn: "Sign in",
    nav: { home: "Home", pricing: "Pricing", about: "About", services: "Services", contact: "Contact" },
  };

  const ar = {
    dir: "rtl",
    signIn: "تسجيل الدخول",
    nav: { home: "الرئيسية", pricing: "الأسعار", about: "من نحن", services: "الخدمات", contact: "تواصل معنا" },
  };

  return lang === "ar" ? ar : en;
}
