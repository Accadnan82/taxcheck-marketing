import React, { useEffect, useState } from "react";

export default function TaxCheckHeader() {
  const [lang, setLang] = useState("EN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tc_lang");
      if (saved === "AR" || saved === "EN") setLang(saved);
      else localStorage.setItem("tc_lang", "EN");
    } catch (_) {}
  }, []);

  const toggleLang = () => {
    const next = lang === "AR" ? "EN" : "AR";
    setLang(next);

    // ✅ هذا هو المكان الصحيح للكود
    try {
      localStorage.setItem("tc_lang", next);
    } catch (_) {}

    // ✅ نجبر كل الصفحات التي تستمع لهذا الحدث أن تعيد القراءة فورًا
    window.dispatchEvent(new Event("tc_lang_change"));
  };

  const isAR = lang === "AR";

  const C = {
    heading: "#1e3a5f",
    text: "#475569",
    border: "#e2e8f0",
    bg: "#ffffff",
    bg2: "#f8fafc",
    greenFrom: "#10b981",
    greenTo: "#059669",
  };

  const FONT_STACK =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

  const S = {
    header: {
      position: "sticky",
      top: 0,
      zIndex: 50,
      background: "rgba(255,255,255,0.92)",
      backdropFilter: "blur(10px)",
      borderBottom: `1px solid ${C.border}`,
      fontFamily: FONT_STACK,
    },
    inner: {
      maxWidth: 1200,
      margin: "0 auto",
      padding: "12px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 16,
    },
    brand: { display: "flex", alignItems: "center", gap: 12, minWidth: 240 },
    logo: {
      width: 42,
      height: 42,
      borderRadius: 12,
      background: C.heading,
      color: "#fff",
      display: "grid",
      placeItems: "center",
      fontWeight: 700,
    },
    brandText: { lineHeight: 1.05 },
    title: { fontWeight: 700, color: C.heading },
    sub: { fontSize: 12, color: C.text, marginTop: 2 },

    nav: { display: "flex", alignItems: "center", gap: 10 },
    link: {
      padding: "10px 12px",
      borderRadius: 12,
      color: C.text,
      fontSize: 15,
      fontWeight: 500,
      background: "transparent",
      border: `1px solid transparent`,
      cursor: "pointer",
    },

    actions: { display: "flex", alignItems: "center", gap: 10, minWidth: 240, justifyContent: "flex-end" },
    lang: {
      padding: "10px 14px",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.bg,
      cursor: "pointer",
      fontSize: 15,
      fontWeight: 600,
      color: C.heading,
    },
    login: {
      padding: "10px 14px",
      borderRadius: 12,
      border: `1px solid ${C.border}`,
      background: C.bg2,
      cursor: "pointer",
      fontSize: 15,
      fontWeight: 600,
      color: C.heading,
    },
    primary: {
      padding: "10px 14px",
      borderRadius: 12,
      border: "1px solid transparent",
      background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`,
      cursor: "pointer",
      fontSize: 15,
      fontWeight: 600,
      color: "#fff",
    },
  };

  return (
    <header style={S.header} dir={isAR ? "rtl" : "ltr"}>
      <div style={S.inner}>
        <div style={S.brand}>
          <div style={S.logo}>T</div>
          <div style={S.brandText}>
            <div style={S.title}>TaxCheck</div>
            <div style={S.sub}>Corporate Tax & VAT • UAE</div>
          </div>
        </div>

        <nav style={S.nav}>
          <button style={S.link} type="button" onClick={() => (window.location.href = "/")}>
            Home
          </button>
          <button style={S.link} type="button" onClick={() => (window.location.href = "/pricing")}>
            Pricing
          </button>
          <button style={S.link} type="button" onClick={() => (window.location.href = "/services")}>
            Services
          </button>
          <button style={S.link} type="button" onClick={() => (window.location.href = "/contact")}>
            Contact
          </button>
        </nav>

        <div style={S.actions}>
          <button style={S.primary} type="button" onClick={() => (window.location.href = "/pricing")}>
            Book a Consultation
          </button>
          <button style={S.lang} type="button" onClick={toggleLang}>
            {lang}
          </button>
          <button style={S.login} type="button" onClick={() => (window.location.href = "/login")}>
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
