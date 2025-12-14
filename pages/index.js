import React, { useMemo } from "react";

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  const APP_BASE = "https://app.taxcheck.ae";
  const APP_LOGIN = `${APP_BASE}/login`;
  const APP_ONBOARDING = `${APP_BASE}/onboarding`;

  return (
    <div style={styles.page}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <div style={styles.brand}>
          <div style={styles.logo}>▦</div>
          <div>
            <div style={styles.brandName}>TaxCheck UAE</div>
            <div style={styles.brandSub}>Corporate Tax · VAT · Free Zone</div>
          </div>
        </div>

        <div style={styles.topActions}>
          <a href="#product" style={styles.ghostBtn}>Product</a>
          <a href="#customers" style={styles.ghostBtn}>Customers</a>
          <a href={APP_LOGIN} style={styles.primaryBtn}>Sign in</a>
        </div>
      </div>

      {/* Hero */}
      <div style={styles.container}>
        <div style={styles.heroCard}>
          <div style={styles.badge}>
            Corporate Tax + VAT • AI-assisted • Built for Accountants
          </div>

          <h1 style={styles.h1}>
            Corporate Tax & VAT in the UAE
            <br />
            Clear workflows. Practical outputs.
          </h1>

          <p style={styles.p}>
            TaxCheck helps accountants and SMEs manage taxpayers, tax periods,
            and Corporate Tax / VAT filings through guided steps, validations,
            and professional reports.
          </p>

          <div style={styles.heroCtas}>
            <a href={APP_ONBOARDING} style={styles.primaryBtnLarge}>
              Start Free
            </a>
            <a href="#screenshots" style={styles.secondaryBtnLarge}>
              View Product Screens
            </a>
            <a href="#consulting" style={styles.secondaryBtnLarge}>
              Consulting Services
            </a>
          </div>
        </div>

        {/* Screenshots */}
        <div id="screenshots" style={styles.section}>
          <div style={styles.sectionTitle}>Product Screenshots</div>

          <div style={styles.screensGrid}>
            <img src="/screens/taxpayers-list.png" style={styles.screenImg} />
            <img src="/screens/taxpayers-page.png" style={styles.screenImg} />
            <img src="/screens/pdf-generator.png" style={styles.screenImg} />
          </div>
        </div>

        {/* About */}
        <div id="product" style={styles.section}>
          <div style={styles.sectionTitle}>About TaxCheck</div>
          <p style={styles.p}>
            <b>Fintech Technologies FZ-LLC</b> builds practical financial software
            for accountants and SMEs in the UAE, focused on clarity, compliance,
            and real operational workflows.
          </p>
        </div>

        {/* Customers */}
        <div id="customers" style={styles.section}>
          <div style={styles.sectionTitle}>Companies using TaxCheck</div>
          <div style={styles.customersRow}>
            <div style={styles.customerPill}>New Vision Systems</div>
            <div style={styles.customerPill}>RAST LLC</div>
            <div style={styles.customerPill}>EMPA Business Solutions</div>
          </div>
        </div>

        {/* Consulting */}
        <div id="consulting" style={styles.section}>
          <div style={styles.sectionTitle}>Financial & Technical Consulting</div>
          <p style={styles.p}>
            We provide financial and technical consulting for accounting and
            finance software, including workflow design, reporting structures,
            tax systems, and ERP integrations.
          </p>
        </div>

        {/* Footer */}
        <div style={styles.footer}>
          © {year} TaxCheck UAE · Fintech Technologies FZ-LLC ·
          support@fintechtech.com
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    fontFamily: "Inter, system-ui, Arial",
    background:
      "radial-gradient(1200px 700px at 18% 0%, rgba(34,197,94,0.16), transparent 60%), #ffffff",
    padding: 24,
  },

  topBar: {
    maxWidth: 1100,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  brand: { display: "flex", gap: 12, alignItems: "center" },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    background: "#1f4b8f",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 900,
  },
  brandName: { fontWeight: 900 },
  brandSub: { fontSize: 12, opacity: 0.7 },

  topActions: { display: "flex", gap: 10 },

  ghostBtn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #ddd",
    textDecoration: "none",
    fontWeight: 700,
    color: "#111",
  },

  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 10,
    background: "#16a34a",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
  },

  container: { maxWidth: 1100, margin: "20px auto" },

  heroCard: {
    padding: 24,
    borderRadius: 16,
    background: "#fff",
    border: "1px solid #eee",
  },

  badge: { fontWeight: 700, fontSize: 12, marginBottom: 10 },

  h1: { fontSize: 42, margin: 0 },
  p: { fontSize: 16, opacity: 0.85 },

  heroCtas: { display: "flex", gap: 10, marginTop: 14 },

  primaryBtnLarge: {
    padding: "12px 18px",
    background: "#16a34a",
    color: "#fff",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 900,
  },

  secondaryBtnLarge: {
    padding: "12px 18px",
    borderRadius: 12,
    border: "1px solid #ddd",
    textDecoration: "none",
    fontWeight: 800,
    color: "#111",
  },

  section: { marginTop: 30 },
  sectionTitle: { fontWeight: 900, fontSize: 18, marginBottom: 10 },

  screensGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },

  screenImg: {
    width: "100%",
    borderRadius: 12,
    border: "1px solid #ddd",
  },

  customersRow: { display: "flex", gap: 10, flexWrap: "wrap" },
  customerPill: {
    padding: "8px 12px",
    borderRadius: 20,
    border: "1px solid #ddd",
    fontWeight: 800,
  },

  footer: {
    marginTop: 40,
    fontSize: 12,
    opacity: 0.7,
    textAlign: "center",
  },
};
