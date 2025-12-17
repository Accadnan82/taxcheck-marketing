// src/pages/Home.jsx
import React, { useMemo, useState } from "react";

/**
 * TaxCheck Home (Marketing) — FINAL (Product Screens fixed to your actual file names)
 *
 * Fix applied:
 * ✅ Images now load from:
 *   /public/screens/Dashboard.png
 *   /public/screens/Workflow.png
 *   /public/screens/Reports.png
 */

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [demoOpen, setDemoOpen] = useState(false);
  const [demoSent, setDemoSent] = useState(false);
  const [demo, setDemo] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // Default language direction only (no language button inside the page)
  const isAR = true;

  const t = useMemo(() => {
    const EN = {
      hero: {
        pill: "Corporate Tax + VAT • UAE",
        title: "TaxCheck: Smart Automation for Corporate Tax & VAT in the UAE",
        desc:
          "Built for accountants and finance teams. Structured workflows, automated validations, and review-ready outputs aligned with UAE tax requirements.",
        cta: "Request a Demo",
      },
      sections: {
        featuresTitle: "Powerful Features",
        screensTitle: "Product Screens",
      },
      features: [
        { title: "Audit-Level Confidence & Accuracy", desc: "Professional validations for reliable outputs." },
        { title: "Reduce Errors by up to 90%", desc: "Structured inputs and checkpoints reduce mistakes." },
        { title: "Easy VAT Return Preparation", desc: "Section-based VAT flow with practical summaries." },
        { title: "Client & Period Management", desc: "Organize clients, periods, and filings across teams." },
        { title: "Rules-Gated AI Intelligence", desc: "AI suggestions validated by deterministic rules." },
        { title: "Professional Outputs", desc: "Summaries, checklists, and review-ready reports." },
      ],
      screens: [
        { title: "Comprehensive Dashboard" },
        { title: "Guided Tax Workflow" },
        { title: "Review-Ready Reports" },
      ],
      demo: {
        title: "Request a Demo",
        subtitle: "Leave your details and we will contact you shortly.",
        name: "Full name",
        email: "Email",
        phone: "Phone",
        company: "Company (optional)",
        message: "Message (optional)",
        send: "Send",
        close: "Close",
        successTitle: "Request sent",
        successBody: "Thank you. We will contact you soon.",
      },
      footer: `© ${year} TaxCheck`,
    };

    const AR = {
      hero: {
        pill: "ضريبة الشركات + VAT • الإمارات",
        title: "TaxCheck: أتمتة ذكية لضريبة الشركات والـ VAT في الإمارات",
        desc:
          "مصمم للمحاسبين وفرق المالية. سير عمل منظم، تحققات تلقائية، ومخرجات جاهزة للمراجعة ومتوافقة مع متطلبات الضرائب في الإمارات.",
        cta: "اطلب عرضًا توضيحيًا",
      },
      sections: {
        featuresTitle: "مميزات قوية",
        screensTitle: "شاشات المنتج",
      },
      features: [
        { title: "دقة وثقة بمستوى تدقيق", desc: "تحققات احترافية لمخرجات موثوقة." },
        { title: "تقليل الأخطاء حتى 90%", desc: "مدخلات منظمة ونقاط تدقيق تقلل الأخطاء." },
        { title: "تحضير VAT بسهولة", desc: "سير VAT مقسم إلى أقسام مع ملخصات عملية." },
        { title: "إدارة العملاء والفترات", desc: "تنظيم العملاء والفترات والملفات عبر الفرق." },
        { title: "ذكاء اصطناعي بضوابط قواعد", desc: "اقتراحات AI يتم التحقق منها بقواعد حتمية." },
        { title: "مخرجات احترافية", desc: "ملخصات وقوائم تدقيق وتقارير جاهزة للمراجعة." },
      ],
      screens: [
        { title: "Comprehensive Dashboard" },
        { title: "Guided Tax Workflow" },
        { title: "Review-Ready Reports" },
      ],
      demo: {
        title: "طلب عرض توضيحي",
        subtitle: "اترك بياناتك وسنتواصل معك قريبًا.",
        name: "الاسم الكامل",
        email: "البريد",
        phone: "الهاتف",
        company: "الشركة (اختياري)",
        message: "رسالة (اختياري)",
        send: "إرسال",
        close: "إغلاق",
        successTitle: "تم الإرسال",
        successBody: "شكرًا لك. سنعاود التواصل قريبًا.",
      },
      footer: `© ${year} TaxCheck`,
    };

    return isAR ? AR : EN;
  }, [isAR, year]);

  // Official TaxCheck colors
  const C = useMemo(
    () => ({
      heading: "#1e3a5f",
      text: "#475569",
      muted: "#64748b",
      bg1: "#ffffff",
      bg2: "#f8fafc",
      border: "#e2e8f0",
      greenFrom: "#10b981",
      greenTo: "#059669",
      useCaseFrom: "#f0fdf4",
      useCaseTo: "#dcfce7",
    }),
    []
  );

  // Official font system
  const FONT_STACK =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

  const S = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        fontFamily: FONT_STACK,
        background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg1} 60%)`,
        color: C.text,
      },
      main: { maxWidth: 1200, margin: "0 auto", padding: "22px 24px 72px" },

      heroCard: {
        width: "100%",
        background: C.bg1,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 28,
        boxShadow: "0 18px 48px rgba(15,23,42,0.10)",
      },
      heroPill: {
        display: "inline-flex",
        padding: "8px 12px",
        borderRadius: 999,
        background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`,
        border: `1px solid ${C.border}`,
        fontSize: 13,
        fontWeight: 600,
        color: C.heading,
        marginBottom: 14,
      },

      heroTitle: {
        fontSize: 48,
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: -0.6,
        color: C.heading,
        margin: "0 0 12px",
        maxWidth: 980,
      },
      heroDesc: {
        fontSize: 18,
        fontWeight: 400,
        lineHeight: 1.7,
        color: C.text,
        margin: 0,
        maxWidth: 980,
      },

      heroActions: { marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" },

      btnPrimary: {
        fontSize: 16,
        fontWeight: 600,
        padding: "12px 16px",
        borderRadius: 12,
        border: "1px solid transparent",
        background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`,
        color: "#fff",
        cursor: "pointer",
      },
      btnSecondary: {
        fontSize: 16,
        fontWeight: 600,
        padding: "12px 16px",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        background: C.bg1,
        color: C.heading,
        cursor: "pointer",
      },

      sectionTitle: {
        margin: "28px 0 14px",
        textAlign: "center",
        fontSize: 36,
        fontWeight: 700,
        color: C.heading,
      },

      grid3: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, width: "100%" },

      card: {
        background: C.bg1,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
      },
      cardTitle: { fontSize: 16, fontWeight: 600, color: C.heading, margin: "0 0 6px" },
      cardText: { fontSize: 14, fontWeight: 400, color: C.text, lineHeight: 1.7, margin: 0 },

      screensGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
      screenCard: {
        background: C.bg1,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
      },
      screenImg: { width: "100%", height: 260, objectFit: "cover", display: "block" },
      screenCap: { padding: "12px 12px", fontSize: 16, fontWeight: 600, color: C.heading },

      footer: { marginTop: 28, textAlign: "center", color: C.muted, fontSize: 14, fontWeight: 400 },

      modalOverlay: {
        position: "fixed",
        inset: 0,
        background: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(6px)",
        display: "grid",
        placeItems: "center",
        zIndex: 9999,
        padding: 18,
      },
      modal: {
        width: "min(880px, 96vw)",
        background: C.bg1,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        overflow: "hidden",
        boxShadow: "0 30px 80px rgba(15,23,42,0.22)",
      },
      modalTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        padding: "12px 14px",
        borderBottom: `1px solid ${C.border}`,
        background: C.bg2,
      },
      modalTitle: { fontSize: 16, fontWeight: 600, color: C.heading },
      modalClose: {
        fontSize: 15,
        fontWeight: 600,
        padding: "8px 10px",
        borderRadius: 10,
        border: `1px solid ${C.border}`,
        background: C.bg1,
        cursor: "pointer",
        color: C.heading,
      },
      modalBody: { padding: 16 },
      modalSubtitle: { fontSize: 14, fontWeight: 400, color: C.muted, lineHeight: 1.6, margin: "6px 0 12px" },

      formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
      inputWrap: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: C.bg1 },
      inputLabel: { fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6 },
      input: {
        width: "100%",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "10px 10px",
        fontSize: 14,
        fontWeight: 400,
        color: C.text,
        outline: "none",
        background: C.bg1,
      },
      textarea: {
        width: "100%",
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: "10px 10px",
        fontSize: 14,
        fontWeight: 400,
        color: C.text,
        outline: "none",
        background: C.bg1,
        minHeight: 90,
        resize: "vertical",
      },
      modalActions: { marginTop: 12, display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" },

      successBox: {
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 14,
        background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`,
      },
      successTitle: { fontSize: 16, fontWeight: 600, color: C.heading, marginBottom: 6 },
      successBody: { fontSize: 14, fontWeight: 400, color: C.text, lineHeight: 1.6 },
    }),
    [C, FONT_STACK]
  );

  // ✅ FIX: Map titles to your actual file names in /public/screens/
  const SCREEN_IMAGE_MAP = useMemo(
    () => ({
      "Comprehensive Dashboard": "/screens/Dashboard.png",
      "Guided Tax Workflow": "/screens/Workflow.png",
      "Review-Ready Reports": "/screens/Reports.png",
    }),
    []
  );

  const imageSrcForTitle = (title) => SCREEN_IMAGE_MAP[title] || "/screens/Dashboard.png";

  const openDemo = () => {
    setDemoOpen(true);
    setDemoSent(false);
    setDemo({ name: "", email: "", phone: "", company: "", message: "" });
  };

  const closeDemo = () => setDemoOpen(false);

  const submitDemo = (e) => {
    e.preventDefault();
    setDemoSent(true);
  };

  return (
    <div style={S.page} dir={isAR ? "rtl" : "ltr"}>
      <main style={S.main}>
        <section style={S.heroCard}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={S.heroPill}>{t.hero.pill}</div>
          </div>

          <h2 style={S.heroTitle}>{t.hero.title}</h2>
          <p style={S.heroDesc}>{t.hero.desc}</p>

          <div style={S.heroActions}>
            <button style={S.btnPrimary} type="button" onClick={openDemo}>
              {t.hero.cta}
            </button>
          </div>
        </section>

        <div style={S.sectionTitle}>{t.sections.featuresTitle}</div>
        <section style={S.grid3}>
          {t.features.map((f, idx) => (
            <div key={idx} style={S.card}>
              <h5 style={S.cardTitle}>{f.title}</h5>
              <p style={S.cardText}>{f.desc}</p>
            </div>
          ))}
        </section>

        <div style={S.sectionTitle}>{t.sections.screensTitle}</div>
        <section style={S.screensGrid}>
          {t.screens.map((s, idx) => (
            <div key={idx} style={S.screenCard}>
              <img
                src={imageSrcForTitle(s.title)}
                alt={s.title}
                style={S.screenImg}
                loading="lazy"
                onError={(e) => {
                  // fallback in case one file name changes
                  e.currentTarget.src = "/screens/Dashboard.png";
                }}
              />
              <div style={S.screenCap}>{s.title}</div>
            </div>
          ))}
        </section>

        <footer style={S.footer}>{t.footer}</footer>
      </main>

      {demoOpen ? (
        <div style={S.modalOverlay} onClick={closeDemo} role="presentation">
          <div style={S.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div style={S.modalTop}>
              <div style={S.modalTitle}>{t.demo.title}</div>
              <button style={S.modalClose} type="button" onClick={closeDemo}>
                {t.demo.close}
              </button>
            </div>

            <div style={S.modalBody}>
              <div style={S.modalSubtitle}>{t.demo.subtitle}</div>

              {demoSent ? (
                <div style={S.successBox}>
                  <div style={S.successTitle}>{t.demo.successTitle}</div>
                  <div style={S.successBody}>{t.demo.successBody}</div>

                  <div style={S.modalActions}>
                    <button style={S.btnSecondary} type="button" onClick={closeDemo}>
                      {t.demo.close}
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={submitDemo}>
                  <div style={S.formGrid}>
                    <Input
                      S={S}
                      label={t.demo.name}
                      value={demo.name}
                      onChange={(v) => setDemo((p) => ({ ...p, name: v }))}
                      type="text"
                      required
                    />
                    <Input
                      S={S}
                      label={t.demo.email}
                      value={demo.email}
                      onChange={(v) => setDemo((p) => ({ ...p, email: v }))}
                      type="email"
                      required
                    />
                    <Input
                      S={S}
                      label={t.demo.phone}
                      value={demo.phone}
                      onChange={(v) => setDemo((p) => ({ ...p, phone: v }))}
                      type="tel"
                      required
                    />
                    <Input
                      S={S}
                      label={t.demo.company}
                      value={demo.company}
                      onChange={(v) => setDemo((p) => ({ ...p, company: v }))}
                      type="text"
                    />
                  </div>

                  <div style={{ marginTop: 12 }}>
                    <div style={S.inputLabel}>{t.demo.message}</div>
                    <textarea
                      style={S.textarea}
                      value={demo.message}
                      onChange={(e) => setDemo((p) => ({ ...p, message: e.target.value }))}
                    />
                  </div>

                  <div style={S.modalActions}>
                    <button style={S.btnSecondary} type="button" onClick={closeDemo}>
                      {t.demo.close}
                    </button>
                    <button style={S.btnPrimary} type="submit">
                      {t.demo.send}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function Input({ S, label, value, onChange, type, required }) {
  return (
    <div style={S.inputWrap}>
      <div style={S.inputLabel}>{label}</div>
      <input
        style={S.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        required={!!required}
      />
    </div>
  );
}
