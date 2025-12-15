import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export default function PublicLayout({ children }) {
  const router = useRouter();
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tc_lang") : null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  const isAr = lang === "ar";
  const dir = isAr ? "rtl" : "ltr";

  const t = useMemo(() => {
    const en = {
      brandSub: "Corporate Tax & VAT • UAE",
      home: "Home",
      pricing: "Pricing",
      about: "About",
      services: "Services",
      contact: "Contact",
      signin: "Sign in",
      // (ملاحظة) لا يوجد Start Free في الهيدر أو الصفحة
      footerLeft: `© ${new Date().getFullYear()} TaxCheck`,
    };

    const ar = {
      brandSub: "ضريبة الشركات والـ VAT • الإمارات",
      home: "الرئيسية",
      pricing: "الأسعار",
      about: "من نحن",
      services: "الخدمات",
      contact: "تواصل معنا",
      signin: "تسجيل الدخول",
      footerLeft: `© ${new Date().getFullYear()} TaxCheck`,
    };

    return isAr ? ar : en;
  }, [isAr]);

  const nav = [
    { href: "/", label: t.home },
    { href: "/pricing", label: t.pricing },
    { href: "/about", label: t.about },
    { href: "/services", label: t.services },
    { href: "/contact", label: t.contact },
  ];

  const isActive = (href) => router.pathname === href;

  const toggleLang = () => {
    const next = isAr ? "en" : "ar";
    setLang(next);
    if (typeof window !== "undefined") localStorage.setItem("tc_lang", next);
  };

  return (
    <div className="tc" dir={dir} lang={lang}>
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
            {nav.map((item) => (
              <Link
                key={item.href}
                className={`tc-navLink ${isActive(item.href) ? "is-active" : ""}`}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="tc-actions">
            <button className="tc-lang" onClick={toggleLang} type="button">
              {isAr ? "EN" : "AR"}
            </button>

            <a className="tc-btn" href="https://app.taxcheck.ae/login">
              {t.signin}
            </a>
          </div>
        </div>
      </header>

      <main className="tc-main">
        {/* نمرر اللغة للصفحات لو احتاجتها */}
        {typeof children === "object" ? children : children}
      </main>

      <footer className="tc-footer">
        <div className="tc-footerInner">
          <div>{t.footerLeft}</div>
          <div className="tc-footerLinks">
            <Link href="/pricing">{t.pricing}</Link>
            <Link href="/about">{t.about}</Link>
            <Link href="/services">{t.services}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
