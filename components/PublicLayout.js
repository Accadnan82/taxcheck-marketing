import Link from "next/link";
import { useRouter } from "next/router";
import { APP_LOGIN, APP_SIGNUP } from "../lib/links";

export default function PublicLayout({ children }) {
  const router = useRouter();
  const isActive = (path) => router.pathname === path;

  return (
    <div className="tc">
      <div className="tc-bg">
        <div className="tc-glow" />
        <div className="tc-shimmer" />
      </div>

      <header className="tc-header">
        <div className="tc-container tc-headerInner">
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
            <a className="tc-navLink" href="#contact">Contact</a>
          </nav>

          <div className="tc-actions">
            <a className="tc-btn" href={APP_LOGIN}>Sign in</a>
            <a className="tc-btnPrimary" href={APP_SIGNUP}>Start Free</a>
          </div>
        </div>
      </header>

      <main className="tc-main">{children}</main>

      <footer className="tc-footer">
        <div className="tc-container tc-footerInner">
          <div>© {new Date().getFullYear()} TaxCheck. All rights reserved.</div>
          <div className="tc-footerLinks">
            <Link href="/pricing" legacyBehavior><a>Pricing</a></Link>
            <Link href="/about" legacyBehavior><a>About</a></Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
