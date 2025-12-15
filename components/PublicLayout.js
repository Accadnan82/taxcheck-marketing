import Link from "next/link";
import { useRouter } from "next/router";
import { APP_LOGIN, APP_SIGNUP } from "../lib/links";

export default function PublicLayout({ children }) {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  // زر اللغة مكان Start Free (بالهيدر)
  const lang = router.query?.lang === "ar" ? "ar" : "en";
  const nextLang = lang === "ar" ? "en" : "ar";

  const switchLangHref = (pathname) => ({
    pathname,
    query: { ...router.query, lang: nextLang },
  });

  return (
    <div className="tc">
      <header className="tc-header">
        <div className="tc-headerInner">
          <div className="tc-brand">
            <div className="tc-logo">T</div>
            <div>
              <div className="tc-brandTitle">TaxCheck</div>
              <div className="tc-brandSub">Corporate Tax & VAT • UAE</div>
            </div>
          </div>

          <nav className="tc-nav">
            <Link href="/" legacyBehavior>
              <a className={`tc-navLink ${isActive("/") ? "is-active" : ""}`}>Home</a>
            </Link>
            <Link href="/pricing" legacyBehavior>
              <a className={`tc-navLink ${isActive("/pricing") ? "is-active" : ""}`}>Pricing</a>
            </Link>
            <Link href="/about" legacyBehavior>
              <a className={`tc-navLink ${isActive("/about") ? "is-active" : ""}`}>About</a>
            </Link>
            <Link href="/services" legacyBehavior>
              <a className={`tc-navLink ${isActive("/services") ? "is-active" : ""}`}>Services</a>
            </Link>
            <a className="tc-navLink" href="/#contact">Contact</a>
          </nav>

          <div className="tc-actions">
            <a className="tc-btn" href={APP_LOGIN}>Sign in</a>

            {/* ✅ زر اللغة بجانب Sign in بدل Start Free */}
            <Link href={switchLangHref(router.pathname)} legacyBehavior>
              <a className="tc-btn tc-langBtn">{nextLang.toUpperCase()}</a>
            </Link>

            {/* ✅ Start Free بقي فقط داخل محتوى الصفحة (الـ Hero) وليس في الهيدر */}
            <a className="tc-btnPrimary" href={APP_SIGNUP}>Start Free</a>
          </div>
        </div>
      </header>

      <main className="tc-main">{children}</main>

      <footer className="tc-footer">
        <div className="tc-footerInner">
          <div>© {new Date().getFullYear()} TaxCheck</div>
          <div className="tc-footerLinks">
            <Link href="/pricing" legacyBehavior><a>Pricing</a></Link>
            <Link href="/about" legacyBehavior><a>About</a></Link>
            <Link href="/services" legacyBehavior><a>Services</a></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
