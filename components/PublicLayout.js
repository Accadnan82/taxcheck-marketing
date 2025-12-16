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

    // Notify pages to refresh copy immediately (optional, but keep your behavior)
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
      signin: "Login",
      brandSub: "Corporate Tax & VAT • UAE",
    };
    return lang === "ar" ? ar : en;
  }, [lang]);

  const isActive = (href) => router.pathname === href;

  return (
    <div className="tc-public">
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

            <a className="tc-navLink" href="/#services">
              {t.services}
            </a>

            <a className="tc-navLink" href="/#contact">
              {t.contact}
            </a>
          </nav>

          <div className="tc-actions">
            <button
              className="tc-lang"
              type="button"
              onClick={() => setLang((p) => (p === "ar" ? "en" : "ar"))}
              aria-label="Language"
              title="Language"
            >
              {lang === "ar" ? "EN" : "AR"}
            </button>

            {/* Login button (as requested) */}
            <a className="tc-btn" href="https://app.taxcheck.ae/login">
              {t.signin}
            </a>
          </div>
        </div>
      </header>

      <main className="tc-main">{children}</main>

      {/* IMPORTANT: Scoped CSS only (NO global * rules) */}
      <style jsx>{`
        .tc-public {
          width: 100%;
          min-height: 100vh;
        }

        .tc-main {
          width: 100%;
        }

        /* Guardrails: prevent layout from forcing colors/backgrounds globally */
        .tc-public :global(img) {
          /* keep logos in original color, no filters */
          filter: none !important;
          opacity: 1 !important;
          mix-blend-mode: normal !important;
        }

        .tc-public :global(a) {
          color: inherit;
          text-decoration: none;
        }

        .tc-public :global(button) {
          font: inherit;
        }

        /* Header styles kept minimal so it does not override page design */
        .tc-header {
          position: sticky;
          top: 0;
          z-index: 50;
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.60);
          border-bottom: 1px solid rgba(15, 23, 42, 0.08);
        }

        .tc-headerInner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 14px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .tc-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          user-select: none;
        }

        .tc-logo {
          width: 34px;
          height: 34px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          font-weight: 900;
          color: #fff;
          background: linear-gradient(135deg, #19c37d 0%, #2e7cf6 100%);
        }

        .tc-brandTitle {
          font-weight: 900;
          line-height: 1.1;
        }

        .tc-brandSub {
          font-size: 12px;
          opacity: 0.75;
          line-height: 1.1;
        }

        .tc-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tc-navLink {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(15, 23, 42, 0.08);
          background: rgba(255, 255, 255, 0.55);
          font-weight: 700;
          font-size: 13px;
        }

        .tc-navLink.is-active {
          background: rgba(46, 204, 113, 0.12);
          border-color: rgba(46, 204, 113, 0.22);
        }

        .tc-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .tc-lang {
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid rgba(15, 23, 42, 0.10);
          background: rgba(255, 255, 255, 0.70);
          font-weight: 800;
          cursor: pointer;
        }

        .tc-btn {
          padding: 10px 12px;
          border-radius: 12px;
          background: #0f172a;
          color: #fff;
          font-weight: 800;
          border: 1px solid rgba(15, 23, 42, 0.12);
        }

        @media (max-width: 920px) {
          .tc-headerInner {
            align-items: flex-start;
            flex-direction: column;
          }
          .tc-nav {
            width: 100%;
          }
          .tc-actions {
            width: 100%;
            justify-content: flex-end;
          }
        }
      `}</style>
    </div>
  );
}
