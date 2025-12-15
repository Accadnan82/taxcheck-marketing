import Link from "next/link";
import { useRouter } from "next/router";
import { APP_LOGIN, APP_SIGNUP } from "../lib/links";

export default function PublicLayout({ children }) {
  const router = useRouter();

  const isActive = (path) => router.pathname === path;

  return (
    <div className="tc">
      <div className="bg">
        <div className="glow" />
        <div className="shimmer" />
      </div>

      {/* Header */}
      <header className="header">
        <div className="container headerInner">
          <div className="brand">
            <div className="logo">T</div>
            <div>
              <div className="brandTitle">TaxCheck</div>
              <div className="brandSub">Corporate Tax & VAT • UAE</div>
            </div>
          </div>

          <nav className="nav">
            <Link className={`navLink ${isActive("/") ? "active" : ""}`} href="/">
              Home
            </Link>
            <Link
              className={`navLink ${isActive("/pricing") ? "active" : ""}`}
              href="/pricing"
            >
              Pricing
            </Link>
            <Link
              className={`navLink ${isActive("/about") ? "active" : ""}`}
              href="/about"
            >
              About
            </Link>
            <a className="navLink" href="#contact">
              Contact
            </a>
          </nav>

          <div className="actions">
            <a className="btn" href={APP_LOGIN}>
              Sign in
            </a>
            <a className="btnPrimary" href={APP_SIGNUP}>
              Start Free
            </a>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="main">{children}</main>

      {/* Footer */}
      <footer className="footer">
        <div className="container footerInner">
          <div>© {new Date().getFullYear()} TaxCheck. All rights reserved.</div>
          <div className="footerLinks">
            <Link href="/pricing">Pricing</Link>
            <Link href="/about">About</Link>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .tc {
          min-height: 100vh;
          background: #f5f7fa;
          color: #2c3e50;
          position: relative;
          font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        .bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }
        .glow {
          position: absolute;
          inset: -40% -30%;
          background: radial-gradient(circle at 25% 25%, rgba(46, 204, 113, 0.22), transparent 55%),
            radial-gradient(circle at 70% 35%, rgba(26, 62, 110, 0.18), transparent 60%),
            radial-gradient(circle at 45% 80%, rgba(142, 68, 173, 0.1), transparent 60%);
          filter: blur(16px);
        }
        .shimmer {
          position: absolute;
          top: -140px;
          left: -45%;
          width: 65%;
          height: 560px;
          background: linear-gradient(
            115deg,
            transparent 0%,
            rgba(46, 204, 113, 0.1) 45%,
            transparent 70%
          );
          transform: rotate(10deg);
          animation: shimmerMove 7.5s linear infinite;
          filter: blur(2px);
          opacity: 0.8;
        }
        @keyframes shimmerMove {
          0% {
            transform: translateX(0) rotate(10deg);
          }
          100% {
            transform: translateX(145%) rotate(10deg);
          }
        }

        .container {
          max-width: 1152px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .header {
          position: sticky;
          top: 0;
          z-index: 10;
          background: rgba(255, 255, 255, 0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid #e5e7eb;
        }
        .headerInner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 0;
          gap: 16px;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .logo {
          width: 40px;
          height: 40px;
          border-radius: 14px;
          background: #1a3e6e;
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 800;
          letter-spacing: -0.02em;
        }
        .brandTitle {
          font-size: 14px;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .brandSub {
          font-size: 12px;
          color: #64748b;
          margin-top: 2px;
        }

        .nav {
          display: none;
          gap: 18px;
          font-size: 13px;
          color: #475569;
        }
        .navLink {
          text-decoration: none;
          color: inherit;
          padding: 8px 10px;
          border-radius: 10px;
        }
        .navLink:hover {
          color: #0f172a;
          background: rgba(15, 23, 42, 0.04);
        }
        .active {
          color: #0f172a;
          background: rgba(26, 62, 110, 0.08);
        }

        .actions {
          display: flex;
          gap: 10px;
          align-items: center;
        }
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid #e5e7eb;
          background: #fff;
          color: #334155;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
        }
        .btn:hover {
          background: #f8fafc;
        }
        .btnPrimary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid transparent;
          background: #2ecc71;
          color: #fff;
          font-size: 13px;
          font-weight: 800;
          text-decoration: none;
        }
        .btnPrimary:hover {
          opacity: 0.92;
        }

        .main {
          position: relative;
          z-index: 1;
        }

        .footer {
          margin-top: 56px;
          border-top: 1px solid #e5e7eb;
          background: rgba(255, 255, 255, 0.9);
        }
        .footerInner {
          display: flex;
          justify-content: space-between;
          gap: 16px;
          padding: 18px 0;
          font-size: 13px;
          color: #64748b;
        }
        .footerLinks :global(a) {
          margin-left: 12px;
          color: #64748b;
          text-decoration: none;
        }
        .footerLinks :global(a:hover) {
          color: #0f172a;
        }

        @media (min-width: 900px) {
          .nav {
            display: flex;
          }
        }
      `}</style>
    </div>
  );
}
