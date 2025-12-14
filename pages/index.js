import React, { useMemo } from "react";

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  // Base44 App links
  const APP_BASE = "https://app.taxcheck.ae";
  const APP_ONBOARDING = `${APP_BASE}/onboarding`;
  const APP_LOGIN = `${APP_BASE}/login`;
  const APP_PRICING = `${APP_BASE}/pricing`;
  const APP_DASHBOARD = `${APP_BASE}/dashboard`;

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <div style={styles.topBar}>
        <div style={styles.brand}>
          <div style={styles.logo}>▦</div>
          <div>
            <div style={styles.brandName}>TaxCheck UAE</div>
            <div style={styles.brandSub}>Corporate Tax · VAT · Free Zone</div>
          </div>
        </div>

        <div style={styles.topActions}>
          {/* Only 3 clear buttons */}
          <a href={APP_ONBOARDING} style={styles.primaryBtn}>
            Try Free
          </a>
          <a href={APP_LOGIN} style={styles.ghostBtn}>
            Sign in
          </a>
          <a href={APP_PRICING} style={styles.ghostBtn}>
            Pricing
          </a>
        </div>
      </div>

      {/* Hero */}
      <div style={styles.heroWrap}>
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
            TaxCheck helps accountants and business owners manage taxpayers, tax
            periods, and Corporate Tax / VAT filings through guided steps, smart
            checks, and concise reports—so you reduce errors and move faster.
          </p>

          <div style={styles.ctaRow}>
            <a href={APP_ONBOARDING} style={styles.primaryBtnLarge}>
              Start Free
            </a>

            <a href={APP_DASHBOARD} style={styles.secondaryBtnLarge}>
              View Dashboard (Preview)
            </a>

            <a href={APP_PRICING} style={styles.secondaryBtnLarge}>
              See Pricing
            </a>
          </div>

          {/* Value bullets */}
          <div style={styles.bullets}>
            <div style={styles.bullet}>
              <div style={styles.bulletTitle}>Corporate Tax + VAT</div>
              <div style={styles.bulletText}>
                Separate, structured flows for Corporate Tax and VAT—with period
                tracking, returns, and summaries.
              </div>
            </div>

            <div style={styles.bullet}>
              <div style={styles.bulletTitle}>Preview before you pay</div>
              <div style={styles.bulletText}>
                Sign up for free, explore the experience, then subscribe when
                you’re ready to run real filings and exports.
              </div>
            </div>

            <div style={styles.bullet}>
              <div style={styles.bulletTitle}>Accountant-first UX</div>
              <div style={styles.bulletText}>
                Clean screens, fewer clicks, and helpful validations—built to
                replace scattered spreadsheets.
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div style={styles.trustStrip}>
            <div style={styles.trustItem}>✔ Fintech Technologies FZ-LLC (Dubai)</div>
            <div style={styles.trustItem}>✔ UAE Corporate Tax + VAT workflows</div>
            <div style={styles.trustItem}>✔ Built for SMEs & Accountants</div>
          </div>

          {/* Quick Note */}
          <div style={styles.note}>
            Note: This is a marketing page only. Sign up, sign in, and
            subscriptions are handled inside the app at{" "}
            <a href={APP_BASE} style={styles.noteLink}>
              app.taxcheck.ae
            </a>
            .
          </div>
        </div>

        {/* Screenshot placeholders */}
        <div style={styles.shots}>
          <div style={styles.shotCard}>
            <div style={styles.shotLabel}>Dashboard Preview</div>
            <div style={styles.shotBox}>
              <div style={styles.shotHint}>Add a dashboard screenshot here</div>
            </div>
            <a href={APP_DASHBOARD} style={styles.shotBtn}>
              Open Dashboard
            </a>
          </div>

          <div style={styles.shotCard}>
            <div style={styles.shotLabel}>Corporate Tax Filing Wizard</div>
            <div style={styles.shotBox}>
              <div style={styles.shotHint}>
                Add a CT Wizard or Tax Returns screenshot here
              </div>
            </div>
            <a href={`${APP_BASE}/taxfilingwizard`} style={styles.shotBtn}>
              Open CT Wizard
            </a>
          </div>

          <div style={styles.shotCard}>
            <div style={styles.shotLabel}>VAT Filing Wizard</div>
            <div style={styles.shotBox}>
              <div style={styles.shotHint}>
                Add a VAT Wizard or VAT Returns screenshot here
              </div>
            </div>
            <a href={`${APP_BASE}/vatfilingwizard`} style={styles.shotBtn}>
              Open VAT Wizard
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={{ opacity: 0.85 }}>
            © {year} TaxCheck UAE · Fintech Technologies FZ-LLC
          </div>

          <div style={styles.footerLinks}>
            <a href={APP_PRICING} style={styles.footerLink}>
              Pricing
            </a>
            <a href={APP_LOGIN} style={styles.footerLink}>
              Sign in
            </a>
            <a href="mailto:support@fintechtech.com" style={styles.footerLink}>
              support@fintechtech.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(1200px 700px at 18% 0%, rgba(34,197,94,0.16), transparent 60%), radial-gradient(900px 600px at 92% 8%, rgba(59,130,246,0.16), transparent 55%), #ffffff",
    padding: 24,
    boxSizing: "border-box",
  },

  topBar: {
    maxWidth: 1120,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  brand: { display: "flex", alignItems: "center", gap: 12 },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#1f4b8f",
    color: "#fff",
    fontWeight: 900,
    boxShadow: "0 10px 22px rgba(31,75,143,0.18)",
    userSelect: "none",
  },
  brandName: { fontWeight: 900, color: "#0f172a", lineHeight: 1.1 },
  brandSub: { fontSize: 12, color: "rgba(15,23,42,0.65)", marginTop: 2 },

  topActions: { display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },

  ghostBtn: {
    padding: "10px 12px",
    borderRadius: 12,
    textDecoration: "none",
    color: "#0f172a",
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(15,23,42,0.10)",
    fontWeight: 900,
  },

  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    color: "#fff",
    background: "#16a34a",
    border: "1px solid rgba(22,163,74,0.35)",
    fontWeight: 900,
    boxShadow: "0 12px 24px rgba(22,163,74,0.18)",
  },

  heroWrap: {
    maxWidth: 1120,
    margin: "18px auto 0",
    display: "grid",
    gridTemplateColumns: "1.1fr 0.9fr",
    gap: 16,
    alignItems: "start",
  },

  heroCard: {
    borderRadius: 18,
    padding: 22,
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(15,23,42,0.10)",
    boxShadow: "0 18px 50px rgba(15,23,42,0.10)",
    backdropFilter: "blur(10px)",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(15,23,42,0.12)",
    background: "rgba(255,255,255,0.92)",
    fontSize: 12,
    fontWeight: 900,
    color: "#0f172a",
    marginBottom: 10,
  },

  h1: {
    margin: 0,
    fontSize: 44,
    letterSpacing: -1,
    color: "#0f172a",
    lineHeight: 1.08,
  },

  p: {
    marginTop: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "rgba(15,23,42,0.78)",
    maxWidth: 720,
    lineHeight: 1.6,
  },

  ctaRow: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 },

  primaryBtnLarge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 14,
    background: "#16a34a",
    color: "#fff",
    fontWeight: 900,
    textDecoration: "none",
    boxShadow: "0 14px 28px rgba(22,163,74,0.20)",
  },

  secondaryBtnLarge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: 14,
    background: "rgba(15,23,42,0.06)",
    color: "#0f172a",
    fontWeight: 900,
    textDecoration: "none",
    border: "1px solid rgba(15,23,42,0.10)",
  },

  bullets: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 10,
    marginTop: 16,
  },

  bullet: {
    borderRadius: 14,
    padding: 12,
    border: "1px solid rgba(15,23,42,0.10)",
    background: "rgba(255,255,255,0.88)",
  },

  bulletTitle: { fontWeight: 900, color: "#0f172a", marginBottom: 6 },
  bulletText: { fontSize: 13.5, color: "rgba(15,23,42,0.74)", lineHeight: 1.45 },

  trustStrip: {
    marginTop: 14,
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
  },
  trustItem: {
    fontSize: 12.5,
    fontWeight: 900,
    color: "rgba(15,23,42,0.72)",
    border: "1px solid rgba(15,23,42,0.10)",
    background: "rgba(255,255,255,0.86)",
    padding: "8px 10px",
    borderRadius: 999,
  },

  note: {
    marginTop: 14,
    borderRadius: 14,
    padding: 12,
    background: "rgba(15,23,42,0.04)",
    border: "1px solid rgba(15,23,42,0.08)",
    color: "rgba(15,23,42,0.72)",
    fontSize: 13.5,
    lineHeight: 1.5,
    fontWeight: 800,
  },
  noteLink: {
    color: "#1f4b8f",
    textDecoration: "none",
    fontWeight: 900,
  },

  shots: {
    display: "grid",
    gridTemplateRows: "repeat(3, auto)",
    gap: 12,
  },

  shotCard: {
    borderRadius: 18,
    padding: 14,
    background: "rgba(255,255,255,0.78)",
    border: "1px solid rgba(15,23,42,0.10)",
    boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
    backdropFilter: "blur(10px)",
  },

  shotLabel: { fontWeight: 900, color: "#0f172a", marginBottom: 10 },

  shotBox: {
    borderRadius: 14,
    border: "1px dashed rgba(15,23,42,0.22)",
    background: "rgba(15,23,42,0.02)",
    height: 160,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    boxSizing: "border-box",
  },

  shotHint: {
    textAlign: "center",
    fontSize: 13,
    color: "rgba(15,23,42,0.55)",
    lineHeight: 1.4,
    maxWidth: 260,
    fontWeight: 800,
  },

  shotBtn: {
    marginTop: 10,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 12px",
    borderRadius: 12,
    textDecoration: "none",
    color: "#0f172a",
    background: "rgba(15,23,42,0.06)",
    border: "1px solid rgba(15,23,42,0.10)",
    fontWeight: 900,
  },

  footer: { marginTop: 18 },
  footerInner: {
    maxWidth: 1120,
    margin: "0 auto",
    padding: "12px 6px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    color: "rgba(15,23,42,0.7)",
    fontSize: 12,
  },
  footerLinks: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" },
  footerLink: { color: "rgba(15,23,42,0.75)", textDecoration: "none", fontWeight: 900 },
};
