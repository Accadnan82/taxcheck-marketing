import Link from "next/link";
import { APP_LOGIN, APP_SIGNUP } from "../lib/links";

export default function Layout({ children }) {
  return (
    <div className="container">
      <div className="nav">
        <div className="brand">
          <div className="logo">▦</div>
          <div>
            <div className="brandTitle">taxcheck</div>
            <div className="brandSub">UAE Corporate Tax</div>
          </div>
        </div>

        <div className="navLinks">
          <Link className="btn" href="/">Home</Link>
          <Link className="btn" href="/pricing">Pricing</Link>
          <Link className="btn" href="/about">About</Link>
          <a className="btn" href={APP_LOGIN}>Login</a>
          <a className="btnPrimary" href={APP_SIGNUP}>Subscribe</a>
        </div>
      </div>

      {children}

      <div className="footer">
        <div>© {new Date().getFullYear()} taxcheck</div>
      </div>
    </div>
  );
}

