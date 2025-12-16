// src/pages/Pricing.jsx
import React, { useMemo, useState } from "react";

/**
 * TaxCheck – Pricing Page (EN + AR) — UPDATED TO OFFICIAL TAXCHECK PALETTE
 * Palette (confirmed by you):
 * - Headings: #1e3a5f
 * - Text main: #475569
 * - Text secondary: #64748b
 * - CTA green gradient: #10b981 → #059669
 * - Backgrounds: #ffffff, #f8fafc
 * - Borders: #e2e8f0
 * - Use-cases gradient: #f0fdf4 → #dcfce7
 */

export default function PricingPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [lang, setLang] = useState("EN");
  const isAR = lang === "AR";

  const t = useMemo(() => {
    const EN = {
      brand: "TaxCheck",
      brandSub: "Corporate Tax & VAT • UAE",
      nav: { home: "Home", services: "Services", pricing: "Pricing", contact: "Contact" },
      cta: {
        book: "Book a Consultation",
        login: "Login",
        startPro: "Start Professional",
        chooseBasic: "Choose Basic",
        contactSales: "Contact Sales",
      },
      hero: {
        kicker: "Pricing",
        title: "Pricing that scales with your compliance needs",
        sub: "Choose a plan based on risk, workflow, and client volume. Upgrade anytime.",
        anchorLabel: "Anchor:",
        anchorText: "A single filing mistake can cost more than a full year of TaxCheck.",
        noteTop: "Monthly pricing. Cancel anytime. VAT not included unless stated otherwise.",
      },
      foot:
        "All plans include secure exports and audit-friendly outputs. Prices shown are monthly.",
      plans: {
        basic: {
          name: "Basic",
          tagline: "For micro businesses",
          price: "99 AED / month",
          bullets: ["1 company", "Corporate Tax wizard", "Core validations", "PDF export"],
        },
        pro: {
          badge: "RECOMMENDED",
          name: "Professional",
          tagline: "Best for accountants & SMEs",
          price: "249 AED / month",
          perDay: "Less than 9 AED per day",
          bullets: [
            "Everything in Basic",
            "AI validations & suggestions",
            "Checklists before submission",
            "Multi-period workflows",
            "Arabic + English",
          ],
        },
        firm: {
          name: "Firm / Office",
          tagline: "For accounting firms",
          price: "499 AED / month",
          bullets: [
            "Multiple clients",
            "Client switching",
            "Templates per client",
            "Exports per client",
            "Light branding",
          ],
        },
      },
      contact: {
        title: "Contact",
        emailLabel: "Email",
        phoneLabel: "Mobile",
        email: "info@TaxCheck.com",
        phone: "+971505523307",
      },
    };

    const AR = {
      brand: "TaxCheck",
      brandSub: "ضريبة الشركات والـ VAT • الإمارات",
      nav: { home: "الرئيسية", services: "الخدمات", pricing: "الأسعار", contact: "تواصل معنا" },
      cta: {
        book: "احجز استشارة",
        login: "تسجيل الدخول",
        startPro: "ابدأ Professional",
        chooseBasic: "اختر Basic",
        contactSales: "تواصل للمبيعات",
      },
      hero: {
        kicker: "الأسعار",
        title: "أسعار تناسب احتياجات الامتثال الضريبي لديك",
        sub: "اختر الخطة بناءً على مستوى المخاطر وسير العمل وحجم العملاء. يمكنك الترقية في أي وقت.",
        anchorLabel: "مرجع المقارنة:",
        anchorText: "خطأ واحد في التقديم قد يكلّف أكثر من اشتراك سنة كاملة في TaxCheck.",
        noteTop:
          "اشتراك شهري. يمكنك الإلغاء في أي وقت. ضريبة القيمة المضافة غير مشمولة ما لم يُذكر خلاف ذلك.",
      },
      foot:
        "كل الخطط تشمل مخرجات قابلة للأرشفة وقوائم تدقيق مناسبة للمراجعة. الأسعار المعروضة شهرية.",
      plans: {
        basic: {
          name: "Basic",
          tagline: "للشركات الصغيرة جدًا",
          price: "99 درهم / شهر",
          bullets: ["شركة واحدة", "معالج ضريبة الشركات", "تحققات أساسية", "تصدير PDF"],
        },
        pro: {
          badge: "الأكثر اختيارًا",
          name: "Professional",
          tagline: "الأفضل للمحاسبين والشركات",
          price: "249 درهم / شهر",
          perDay: "أقل من 9 دراهم يوميًا",
          bullets: [
            "كل ما في Basic",
            "تحققات واقتراحات بالذكاء الاصطناعي",
            "قوائم تدقيق قبل الإرسال",
            "إدارة فترات متعددة",
            "عربي + إنجليزي",
          ],
        },
        firm: {
          name: "Firm / Office",
          tagline: "لمكاتب المحاسبة",
          price: "499 درهم / شهر",
          bullets: ["عملاء متعددون", "تنقل بين العملاء", "قوالب لكل عميل", "تصدير لكل عميل", "Branding بسيط"],
        },
      },
      contact: {
        title: "تواصل معنا",
        emailLabel: "البريد",
        phoneLabel: "الموبايل",
        email: "info@TaxCheck.com",
        phone: "+971505523307",
      },
    };

    return isAR ? AR : EN;
  }, [isAR]);

  const href = (path) => path;

  const styles = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        background: "linear-gradient(180deg, #f8fafc 0%, #ffffff 60%)",
        color: "#475569",
      },
      header: {
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #e2e8f0",
      },
      headerInner: {
        maxWidth: 1200,
        margin: "0 auto",
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
      },
      brand: { display: "flex", alignItems: "center", gap: 12, minWidth: 220 },
      logo: {
        width: 42,
        height: 42,
        borderRadius: 12,
        background: "#1e3a5f",
        color: "#ffffff",
        display: "grid",
        placeItems: "center",
        boxShadow: "0 10px 22px rgba(30,58,95,0.18)",
        fontWeight: 900,
      },
      brandTitle: { fontWeight: 800, color: "#1e3a5f", lineHeight: 1.05 },
      brandSub: { fontSize: 12, color: "#64748b", marginTop: 2, fontWeight: 500 },

      nav: { display: "flex", alignItems: "center", gap: 10 },
      navLink: {
        padding: "10px 12px",
        borderRadius: 12,
        color: "#475569",
        fontWeight: 600,
        transition: "background .15s ease, color .15s ease",
      },
      navLinkHover: { background: "rgba(30,58,95,0.08)" },
      navActive: { background: "rgba(30,58,95,0.12)", color: "#1e3a5f" },

      actions: { display: "flex", alignItems: "center", gap: 10, minWidth: 220, justifyContent: "flex-end" },
      btn: {
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        cursor: "pointer",
        fontWeight: 800,
        color: "#1e3a5f",
      },
      btnSoft: {
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid #e2e8f0",
        background: "#f8fafc",
        cursor: "pointer",
        fontWeight: 800,
        color: "#1e3a5f",
      },
      btnPrimary: {
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid transparent",
        background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        color: "#ffffff",
        cursor: "pointer",
        fontWeight: 900,
      },

      main: { maxWidth: 1200, margin: "0 auto", padding: "18px 24px 72px" },

      heroCard: {
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 16,
        padding: 20,
        boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
      },
      kicker: {
        display: "inline-flex",
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(30,58,95,0.08)",
        color: "#1e3a5f",
        fontSize: 12,
        fontWeight: 800,
        marginBottom: 10,
      },
      h1: { margin: 0, fontSize: 30, lineHeight: 1.12, letterSpacing: -0.4, fontWeight: 900, color: "#1e3a5f" },
      sub: { margin: "10px 0 0", color: "#475569", lineHeight: 1.7, fontSize: 13, fontWeight: 600 },

      anchor: {
        marginTop: 14,
        padding: "12px 14px",
        borderRadius: 16,
        border: "1px solid #e2e8f0",
        background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
      },
      anchorLabel: { fontWeight: 900, color: "#1e3a5f" },
      anchorText: { color: "#475569", fontWeight: 800 },

      noteTop: { marginTop: 12, color: "#64748b", fontSize: 13, fontWeight: 700 },

      grid: {
        width: "100%",
        maxWidth: 1100,
        margin: "18px auto 0",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
      },

      footerMini: { textAlign: "center", marginTop: 18, color: "#64748b", fontSize: 13, fontWeight: 700 },

      contactCard: {
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: 14,
        padding: 16,
        boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
      },
      row: {
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "10px 0",
        borderBottom: "1px solid #e2e8f0",
      },
      rowLast: { borderBottom: "none" },
      label: { color: "#64748b", fontWeight: 800 },
      value: { fontWeight: 900, color: "#1e3a5f" },
    }),
    []
  );

  return (
    <div style={styles.page} dir={isAR ? "rtl" : "ltr"}>
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div style={styles.brand}>
            <div style={styles.logo}>T</div>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
              <div style={styles.brandTitle}>{t.brand}</div>
              <div style={styles.brandSub}>{t.brandSub}</div>
            </div>
          </div>

          <nav style={styles.nav} aria-label="Primary">
            <a style={styles.navLink} href={href("/")}>
              {t.nav.home}
            </a>
            <a style={styles.navLink} href={href("/services")}>
              {t.nav.services}
            </a>
            <a style={{ ...styles.navLink, ...styles.navActive }} href={href("/pricing")}>
              {t.nav.pricing}
            </a>
            <a style={styles.navLink} href={href("/contact")}>
              {t.nav.contact}
            </a>
          </nav>

          <div style={styles.actions}>
            <button style={styles.btnSoft} type="button">
              {t.cta.book}
            </button>

            <button
              style={styles.btn}
              type="button"
              onClick={() => setLang(isAR ? "EN" : "AR")}
              aria-label="Toggle language"
              title="Toggle language"
            >
              {lang}
            </button>

            <button style={styles.btn} type="button">
              {t.cta.login}
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.heroCard}>
          <div style={styles.kicker}>{t.hero.kicker}</div>
          <h1 style={styles.h1}>{t.hero.title}</h1>
          <p style={styles.sub}>{t.hero.sub}</p>

          <div style={styles.anchor}>
            <span style={styles.anchorLabel}>{t.hero.anchorLabel}</span>
            <span style={styles.anchorText}>{t.hero.anchorText}</span>
          </div>

          <div style={styles.noteTop}>{t.hero.noteTop}</div>
        </section>

        <section style={{ marginTop: 18 }}>
          <div style={styles.grid}>
            <PlanCard
              palette={styles}
              title={t.plans.basic.name}
              tagline={t.plans.basic.tagline}
              price={t.plans.basic.price}
              bullets={t.plans.basic.bullets}
              ctaLabel={t.cta.chooseBasic}
              variant="outline"
            />

            <PlanCard
              palette={styles}
              title={t.plans.pro.name}
              tagline={t.plans.pro.tagline}
              price={t.plans.pro.price}
              subprice={t.plans.pro.perDay}
              bullets={t.plans.pro.bullets}
              badge={t.plans.pro.badge}
              recommended
              ctaLabel={t.cta.startPro}
              variant="primary"
            />

            <PlanCard
              palette={styles}
              title={t.plans.firm.name}
              tagline={t.plans.firm.tagline}
              price={t.plans.firm.price}
              bullets={t.plans.firm.bullets}
              ctaLabel={t.cta.contactSales}
              variant="outline"
            />
          </div>

          <div style={styles.footerMini}>{t.foot}</div>
        </section>

        <section style={{ maxWidth: 980, margin: "22px auto 0" }}>
          <div style={styles.contactCard}>
            <div style={{ fontWeight: 900, marginBottom: 10, color: "#1e3a5f", fontSize: 15 }}>
              {t.contact.title}
            </div>

            <div style={styles.row}>
              <div style={styles.label}>{t.contact.emailLabel}</div>
              <div style={styles.value}>{t.contact.email}</div>
            </div>

            <div style={{ ...styles.row, ...styles.rowLast }}>
              <div style={styles.label}>{t.contact.phoneLabel}</div>
              <div style={styles.value}>{t.contact.phone}</div>
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button style={styles.btnPrimary} type="button">
                {t.cta.book}
              </button>
              <button style={styles.btn} type="button">
                {t.cta.login}
              </button>
            </div>

            <div style={styles.footerMini}>© {year} TaxCheck</div>
          </div>
        </section>
      </main>
    </div>
  );
}

function PlanCard({
  palette,
  title,
  tagline,
  price,
  subprice,
  bullets,
  badge,
  recommended,
  ctaLabel,
  variant,
}) {
  const cardBg = recommended ? "rgba(255,255,255,0.96)" : "rgba(255,255,255,0.92)";
  const outline = "1px solid #e2e8f0";

  return (
    <div
      style={{
        borderRadius: 16,
        border: outline,
        background: cardBg,
        boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
        position: "relative",
        padding: 18,
        overflow: "hidden",
      }}
    >
      {recommended ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.35,
            background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
            maskImage: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))",
            WebkitMaskImage: "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0))",
          }}
        />
      ) : null}

      <div style={{ position: "relative" }}>
        {badge ? (
          <div
            style={{
              display: "inline-flex",
              padding: "6px 10px",
              borderRadius: 999,
              background: recommended
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                : "rgba(30,58,95,0.08)",
              color: recommended ? "#fff" : "#1e3a5f",
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: 0.3,
              marginBottom: 10,
            }}
          >
            {badge}
          </div>
        ) : (
          <div style={{ height: 26 }} />
        )}

        <div style={{ fontWeight: 900, margin: "0 0 6px", color: "#1e3a5f", fontSize: 15 }}>
          {title}
        </div>

        <div style={{ color: "#64748b", fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
          {tagline}
        </div>

        <div style={{ fontSize: 32, fontWeight: 950, letterSpacing: -0.4, color: "#1e3a5f", marginBottom: 4 }}>
          {price}
        </div>

        {subprice ? (
          <div style={{ color: "#475569", fontSize: 13, fontWeight: 900, marginBottom: 12 }}>
            {subprice}
          </div>
        ) : (
          <div style={{ height: 18 }} />
        )}

        <div style={{ height: 1, background: "#e2e8f0", margin: "10px 0 12px" }} />

        <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#475569", lineHeight: 1.85 }}>
          {bullets.map((b, idx) => (
            <li key={idx} style={{ margin: "7px 0", fontSize: 13, fontWeight: 700 }}>
              {b}
            </li>
          ))}
        </ul>

        <div style={{ marginTop: 14 }}>
          {variant === "primary" ? (
            <button
              type="button"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid transparent",
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                color: "#ffffff",
                cursor: "pointer",
                fontWeight: 950,
              }}
            >
              {ctaLabel}
            </button>
          ) : (
            <button
              type="button"
              style={{
                width: "100%",
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                color: "#1e3a5f",
                cursor: "pointer",
                fontWeight: 900,
              }}
            >
              {ctaLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
