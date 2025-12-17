import React, { useEffect, useMemo, useState } from "react";

/**
 * Contact.jsx — Companies + Careers (Bilingual via tc_lang)
 */

function useTcLang(defaultLang = "EN") {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tc_lang");
      if (saved === "AR" || saved === "EN") setLang(saved);
    } catch (_) {}

    const onStorage = (e) => {
      if (e.key === "tc_lang" && (e.newValue === "AR" || e.newValue === "EN")) setLang(e.newValue);
    };
    const onCustom = () => {
      try {
        const saved = localStorage.getItem("tc_lang");
        if (saved === "AR" || saved === "EN") setLang(saved);
      } catch (_) {}
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("tc_lang_change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("tc_lang_change", onCustom);
    };
  }, []);

  return lang;
}

export default function Contact() {
  const lang = useTcLang("EN");
  const isAR = lang === "AR";

  const [tab, setTab] = useState("company"); // company | careers
  const [sent, setSent] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
    file: null, // CV
    linkedin: "",
  });

  const t = useMemo(() => {
    const EN = {
      hero: {
        kicker: "Contact",
        title: "Talk to TaxCheck",
        desc: "For companies, partnerships, and recruitment. Choose the section below and send your request.",
      },
      tabs: { company: "For Companies", careers: "Careers" },
      company: {
        title: "Company Inquiries",
        sub: "Sales, partnerships, onboarding, compliance consulting, and product questions.",
        subject: "Topic",
        subjects: ["Sales / Pricing", "Partnership", "Support", "Consultation", "Other"],
        cta: "Send Request",
      },
      careers: {
        title: "Careers & Recruitment",
        sub: "Apply for open roles or share your CV. We review applications continuously.",
        positionsTitle: "Open positions (sample)",
        positions: ["Tax Associate (UAE)", "Accounting Analyst", "Customer Success", "Full-Stack Engineer (FinTech)"],
        linkedin: "LinkedIn profile (optional)",
        cv: "Upload CV (PDF)",
        cta: "Submit Application",
      },
      fields: {
        name: "Full name",
        email: "Email",
        phone: "Phone",
        company: "Company (optional)",
        message: "Message",
      },
      direct: {
        title: "Direct Contact",
        email: "info@TaxCheck.com",
        phone: "+971505523307",
      },
      ok: {
        title: "Submitted",
        body: "Thank you. We will contact you soon.",
        reset: "Send another",
      },
    };

    const AR = {
      hero: {
        kicker: "تواصل معنا",
        title: "تواصل مع TaxCheck",
        desc: "للشركات، الشراكات، والتوظيف. اختر القسم المناسب وأرسل طلبك.",
      },
      tabs: { company: "للشركات", careers: "التوظيف" },
      company: {
        title: "طلبات الشركات",
        sub: "مبيعات، شراكات، بدء الاستخدام، استشارات امتثال، وأسئلة المنتج.",
        subject: "الموضوع",
        subjects: ["المبيعات / الأسعار", "شراكة", "الدعم", "استشارة", "أخرى"],
        cta: "إرسال الطلب",
      },
      careers: {
        title: "التوظيف والوظائف",
        sub: "قدّم على الوظائف المتاحة أو أرسل سيرتك الذاتية. تتم مراجعة الطلبات باستمرار.",
        positionsTitle: "وظائف متاحة (مثال)",
        positions: ["Tax Associate (UAE)", "Accounting Analyst", "Customer Success", "Full-Stack Engineer (FinTech)"],
        linkedin: "رابط لينكدإن (اختياري)",
        cv: "رفع السيرة الذاتية (PDF)",
        cta: "إرسال الطلب",
      },
      fields: {
        name: "الاسم الكامل",
        email: "البريد",
        phone: "الهاتف",
        company: "الشركة (اختياري)",
        message: "الرسالة",
      },
      direct: {
        title: "تواصل مباشر",
        email: "info@TaxCheck.com",
        phone: "+971505523307",
      },
      ok: {
        title: "تم الإرسال",
        body: "شكرًا لك. سنعاود التواصل قريبًا.",
        reset: "إرسال طلب جديد",
      },
    };

    return isAR ? AR : EN;
  }, [isAR]);

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

  const FONT_STACK =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

  const S = useMemo(
    () => ({
      page: { minHeight: "100vh", fontFamily: FONT_STACK, background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg1} 60%)`, color: C.text },
      main: { maxWidth: 1200, margin: "0 auto", padding: "22px 24px 72px" },

      hero: { background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 18, padding: 24, boxShadow: "0 14px 34px rgba(15,23,42,0.08)" },
      kicker: { display: "inline-flex", padding: "6px 10px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.bg2, color: C.heading, fontSize: 13, fontWeight: 600, marginBottom: 12 },
      h2: { fontSize: 48, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.6, margin: 0, color: C.heading },
      desc: { fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: C.text, margin: "12px 0 0", maxWidth: 980 },

      tabs: { marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" },
      tab: { fontSize: 15, fontWeight: 600, padding: "10px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg1, color: C.heading, cursor: "pointer" },
      tabActive: { background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)` },

      grid: { marginTop: 16, display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 14 },

      card: { background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, boxShadow: "0 10px 26px rgba(15,23,42,0.06)" },
      cardTitle: { fontSize: 20, fontWeight: 600, color: C.heading, margin: "0 0 6px" },
      cardText: { fontSize: 14, fontWeight: 400, color: C.muted, lineHeight: 1.7, margin: "0 0 14px" },

      formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
      inputWrap: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: C.bg1 },
      label: { fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6 },
      input: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 10px", fontSize: 14, fontWeight: 400, color: C.text, outline: "none", background: C.bg1 },
      textarea: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 10px", fontSize: 14, fontWeight: 400, color: C.text, outline: "none", background: C.bg1, minHeight: 110, resize: "vertical" },

      btnPrimary: { marginTop: 12, width: "100%", fontSize: 16, fontWeight: 600, padding: "12px 14px", borderRadius: 12, border: "1px solid transparent", background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`, color: "#fff", cursor: "pointer" },

      pill: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)` },
      pillTitle: { fontSize: 16, fontWeight: 600, color: C.heading, marginBottom: 10 },
      line: { display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` },
      lineLast: { borderBottom: "none" },
      left: { color: C.muted, fontSize: 14, fontWeight: 600 },
      right: { color: C.heading, fontSize: 14, fontWeight: 600 },

      listTitle: { marginTop: 12, fontSize: 16, fontWeight: 600, color: C.heading },
      li: { marginTop: 8, color: C.text, fontSize: 14, lineHeight: 1.7 },

      okBox: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)` },
      okTitle: { fontSize: 16, fontWeight: 600, color: C.heading, marginBottom: 6 },
      okBody: { fontSize: 14, fontWeight: 400, color: C.text, lineHeight: 1.6 },
      btnOutline: { marginTop: 12, width: "100%", fontSize: 16, fontWeight: 600, padding: "12px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg1, color: C.heading, cursor: "pointer" },

      responsive: `
        @media (max-width: 980px){
          .tc-grid{ grid-template-columns: 1fr !important; }
          .tc-formgrid{ grid-template-columns: 1fr !important; }
        }
      `,
    }),
    [C, FONT_STACK]
  );

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  const reset = () => {
    setSent(false);
    setForm({ name: "", email: "", phone: "", company: "", subject: "", message: "", file: null, linkedin: "" });
  };

  return (
    <div style={S.page} dir={isAR ? "rtl" : "ltr"}>
      <style>{S.responsive}</style>
      <main style={S.main}>
        <section style={S.hero}>
          <div style={S.kicker}>{t.hero.kicker}</div>
          <h2 style={S.h2}>{t.hero.title}</h2>
          <p style={S.desc}>{t.hero.desc}</p>

          <div style={S.tabs}>
            <button
              type="button"
              style={{ ...S.tab, ...(tab === "company" ? S.tabActive : {}) }}
              onClick={() => {
                setTab("company");
                setSent(false);
              }}
            >
              {t.tabs.company}
            </button>
            <button
              type="button"
              style={{ ...S.tab, ...(tab === "careers" ? S.tabActive : {}) }}
              onClick={() => {
                setTab("careers");
                setSent(false);
              }}
            >
              {t.tabs.careers}
            </button>
          </div>
        </section>

        <section className="tc-grid" style={S.grid}>
          <div style={S.card}>
            {!sent ? (
              <>
                <div style={S.cardTitle}>{tab === "company" ? t.company.title : t.careers.title}</div>
                <div style={S.cardText}>{tab === "company" ? t.company.sub : t.careers.sub}</div>

                <form onSubmit={submit}>
                  <div className="tc-formgrid" style={S.formGrid}>
                    <Field S={S} label={t.fields.name} type="text" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} required />
                    <Field S={S} label={t.fields.email} type="email" value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} required />
                    <Field S={S} label={t.fields.phone} type="tel" value={form.phone} onChange={(v) => setForm((p) => ({ ...p, phone: v }))} required />
                    <Field S={S} label={t.fields.company} type="text" value={form.company} onChange={(v) => setForm((p) => ({ ...p, company: v }))} />
                  </div>

                  {tab === "company" ? (
                    <div style={{ marginTop: 12 }}>
                      <div style={S.label}>{t.company.subject}</div>
                      <select
                        style={S.input}
                        value={form.subject}
                        onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                        required
                      >
                        <option value="" disabled>
                          {isAR ? "اختر..." : "Select..."}
                        </option>
                        {t.company.subjects.map((x) => (
                          <option key={x} value={x}>
                            {x}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : (
                    <>
                      <div style={{ marginTop: 12 }}>
                        <Field S={S} label={t.careers.linkedin} type="text" value={form.linkedin} onChange={(v) => setForm((p) => ({ ...p, linkedin: v }))} />
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <div style={S.label}>{t.careers.cv}</div>
                        <input
                          style={S.input}
                          type="file"
                          accept=".pdf"
                          onChange={(e) => setForm((p) => ({ ...p, file: e.target.files?.[0] || null }))}
                          required
                        />
                      </div>
                    </>
                  )}

                  <div style={{ marginTop: 12 }}>
                    <div style={S.label}>{t.fields.message}</div>
                    <textarea style={S.textarea} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} required />
                  </div>

                  <button style={S.btnPrimary} type="submit">
                    {tab === "company" ? t.company.cta : t.careers.cta}
                  </button>
                </form>
              </>
            ) : (
              <div style={S.okBox}>
                <div style={S.okTitle}>{t.ok.title}</div>
                <div style={S.okBody}>{t.ok.body}</div>
                <button style={S.btnOutline} type="button" onClick={reset}>
                  {t.ok.reset}
                </button>
              </div>
            )}
          </div>

          <div style={S.card}>
            <div style={S.pill}>
              <div style={S.pillTitle}>{t.direct.title}</div>
              <div style={S.line}>
                <div style={S.left}>{isAR ? "البريد" : "Email"}</div>
                <div style={S.right}>{t.direct.email}</div>
              </div>
              <div style={{ ...S.line, ...S.lineLast }}>
                <div style={S.left}>{isAR ? "الموبايل" : "Mobile"}</div>
                <div style={S.right}>{t.direct.phone}</div>
              </div>
            </div>

            {tab === "careers" ? (
              <>
                <div style={S.listTitle}>{t.careers.positionsTitle}</div>
                <ul style={{ margin: "8px 0 0", padding: isAR ? "0 18px 0 0" : "0 0 0 18px" }}>
                  {t.careers.positions.map((p) => (
                    <li key={p} style={S.li}>
                      {p}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </section>
      </main>
    </div>
  );
}

function Field({ S, label, type, value, onChange, required }) {
  return (
    <div style={S.inputWrap}>
      <div style={S.label}>{label}</div>
      <input style={S.input} type={type} value={value} onChange={(e) => onChange(e.target.value)} required={!!required} />
    </div>
  );
}
