import React, { useEffect, useMemo, useState } from "react";

/**
 * Pricing.jsx — Bilingual via localStorage tc_lang
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

export default function Pricing() {
  const lang = useTcLang("EN");
  const isAR = lang === "AR";

  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showReceiptForm, setShowReceiptForm] = useState(false);
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);

  const [receipt, setReceipt] = useState({
    fullName: "",
    email: "",
    phone: "",
    transferDate: "",
    reference: "",
    notes: "",
    file: null,
  });

  const BANK_DETAILS = useMemo(
    () => ({
      bankName: "Mashreq Bank",
      accountNumber: "019100279275",
      iban: "AE430330000019100279275",
      currency: "AED",
      currentBalance: "8,029.23",
      beneficiaryName: "TaxCheck",
      referenceHint: "Use your email + plan name as the transfer reference.",
      activationNote: "After transfer, submit the receipt here to activate your subscription.",
    }),
    []
  );

  const PLAN_AMOUNTS = useMemo(() => ({ basic: 99, pro: 249, firm: 499 }), []);

  const t = useMemo(() => {
    const EN = {
      hero: {
        kicker: "Pricing",
        title: "Pricing that scales with your compliance needs",
        subtitle: "Choose a plan based on risk, workflow, and client volume. Upgrade anytime.",
        anchorLabel: "Anchor:",
        anchorText: "A single filing mistake can cost more than a full year of TaxCheck.",
        noteTop: "Monthly pricing. Cancel anytime. VAT not included unless stated otherwise.",
      },
      plans: {
        basic: { name: "Basic", tagline: "For micro businesses", price: "99 AED / month", cta: "Choose Basic" },
        pro: { badge: "RECOMMENDED", name: "Professional", tagline: "Best for accountants & SMEs", price: "249 AED / month", perDay: "Less than 9 AED per day", cta: "Start Professional" },
        firm: { name: "Firm / Office", tagline: "For accounting firms", price: "499 AED / month", cta: "Contact Sales" },
      },
      bullets: {
        basic: ["1 company", "Corporate Tax wizard", "Core validations", "PDF export"],
        pro: ["Everything in Basic", "AI validations & suggestions", "Checklists before submission", "Multi-period workflows", "Arabic + English"],
        firm: ["Multiple clients", "Client switching", "Templates per client", "Exports per client", "Light branding"],
      },
      foot: "All plans include secure exports and audit-friendly outputs. Prices shown are monthly.",
      bank: {
        title: "Bank Transfer Details",
        subtitle: "Complete a bank transfer to activate your selected plan.",
        selectedPlanLabel: "Selected plan",
        amountLabel: "Amount (AED)",
        currentBalance: "Current Balance",
        close: "Close",
        copy: "Copy",
        havePaid: "I have paid",
        back: "Back",
        receiptTitle: "Submit Payment Receipt",
        receiptSubtitle: "Fill in the details below and attach your receipt/screenshot.",
        submit: "Submit",
        successTitle: "Receipt submitted",
        successBody: "Thank you. We will review and activate your subscription.",
        fields: {
          beneficiaryName: "Beneficiary Name",
          bankName: "Bank Name",
          accountNumber: "Account Number",
          iban: "IBAN",
          currency: "Currency",
          reference: "Reference",
          fullName: "Full name",
          email: "Email",
          phone: "Phone",
          transferDate: "Transfer date",
          transferRef: "Transfer reference",
          notes: "Notes (optional)",
          file: "Receipt file (image/PDF)",
        },
      },
    };

    const AR = {
      hero: {
        kicker: "الأسعار",
        title: "أسعار تناسب احتياجات الامتثال الضريبي لديك",
        subtitle: "اختر الخطة بناءً على المخاطر وسير العمل وحجم العملاء. يمكنك الترقية في أي وقت.",
        anchorLabel: "مرجع المقارنة:",
        anchorText: "خطأ واحد في التقديم قد يكلّف أكثر من اشتراك سنة كاملة في TaxCheck.",
        noteTop: "اشتراك شهري. يمكنك الإلغاء في أي وقت. ضريبة القيمة المضافة غير مشمولة ما لم يُذكر خلاف ذلك.",
      },
      plans: {
        basic: { name: "Basic", tagline: "للشركات الصغيرة جدًا", price: "99 درهم / شهر", cta: "اختر Basic" },
        pro: { badge: "الأكثر اختيارًا", name: "Professional", tagline: "الأفضل للمحاسبين والشركات", price: "249 درهم / شهر", perDay: "أقل من 9 دراهم يوميًا", cta: "ابدأ Professional" },
        firm: { name: "Firm / Office", tagline: "لمكاتب المحاسبة", price: "499 درهم / شهر", cta: "تواصل للمبيعات" },
      },
      bullets: {
        basic: ["شركة واحدة", "معالج ضريبة الشركات", "تحققات أساسية", "تصدير PDF"],
        pro: ["كل ما في Basic", "تحققات واقتراحات بالذكاء الاصطناعي", "قوائم تدقيق قبل الإرسال", "إدارة فترات متعددة", "عربي + إنجليزي"],
        firm: ["عملاء متعددون", "تنقل بين العملاء", "قوالب لكل عميل", "تصدير لكل عميل", "Branding بسيط"],
      },
      foot: "كل الخطط تشمل مخرجات قابلة للأرشفة وقوائم تدقيق مناسبة للمراجعة. الأسعار المعروضة شهرية.",
      bank: {
        title: "تفاصيل التحويل البنكي",
        subtitle: "قم بالتحويل البنكي لتفعيل الخطة التي اخترتها.",
        selectedPlanLabel: "الخطة المختارة",
        amountLabel: "المبلغ (درهم)",
        currentBalance: "الرصيد الحالي",
        close: "إغلاق",
        copy: "نسخ",
        havePaid: "تم التحويل",
        back: "رجوع",
        receiptTitle: "إرسال إيصال الدفع",
        receiptSubtitle: "املأ البيانات وأرفق الإيصال/لقطة شاشة.",
        submit: "إرسال",
        successTitle: "تم إرسال الإيصال",
        successBody: "شكرًا لك. سنراجع الطلب ونفعّل الاشتراك.",
        fields: {
          beneficiaryName: "اسم المستفيد",
          bankName: "اسم البنك",
          accountNumber: "رقم الحساب",
          iban: "IBAN",
          currency: "العملة",
          reference: "المرجع",
          fullName: "الاسم الكامل",
          email: "البريد",
          phone: "الهاتف",
          transferDate: "تاريخ التحويل",
          transferRef: "مرجع التحويل",
          notes: "ملاحظات (اختياري)",
          file: "ملف الإيصال (صورة/PDF)",
        },
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

      heroCard: { background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 18, padding: 24, boxShadow: "0 14px 34px rgba(15,23,42,0.08)" },
      kicker: { display: "inline-flex", padding: "6px 10px", borderRadius: 999, border: `1px solid ${C.border}`, background: C.bg2, color: C.heading, fontSize: 13, fontWeight: 600, marginBottom: 12 },

      h2: { fontSize: 48, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.6, margin: 0, color: C.heading },
      desc: { fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: C.text, margin: "12px 0 0" },

      anchor: { marginTop: 16, padding: 14, borderRadius: 16, border: `1px solid ${C.border}`, background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`, display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" },
      anchorLabel: { fontSize: 14, fontWeight: 600, color: C.heading },
      anchorText: { fontSize: 14, fontWeight: 500, color: C.text },

      note: { marginTop: 12, color: C.muted, fontSize: 14 },

      grid: { marginTop: 18, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
      card: { background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, boxShadow: "0 14px 34px rgba(15,23,42,0.08)", position: "relative", minHeight: 420, display: "flex", flexDirection: "column" },
      badge: { display: "inline-flex", padding: "6px 10px", borderRadius: 999, background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`, color: "#fff", fontSize: 13, fontWeight: 600, marginBottom: 10 },

      title: { fontSize: 18, fontWeight: 600, color: C.heading, margin: "0 0 6px" },
      tagline: { fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 12 },
      price: { fontSize: 32, fontWeight: 700, color: C.heading, letterSpacing: -0.4 },
      subprice: { marginTop: 6, fontSize: 14, fontWeight: 500, color: C.text },

      hr: { height: 1, background: C.border, margin: "14px 0 12px" },

      btnPrimary: { width: "100%", marginTop: "auto", padding: "12px 14px", borderRadius: 12, border: "1px solid transparent", background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`, color: "#fff", cursor: "pointer", fontSize: 16, fontWeight: 600 },
      btnOutline: { width: "100%", marginTop: "auto", padding: "12px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg1, color: C.heading, cursor: "pointer", fontSize: 16, fontWeight: 600 },

      foot: { textAlign: "center", marginTop: 18, color: C.muted, fontSize: 14 },

      modalOverlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.55)", backdropFilter: "blur(6px)", display: "grid", placeItems: "center", zIndex: 9999, padding: 18 },
      modal: { width: "min(980px, 96vw)", background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 30px 80px rgba(15,23,42,0.22)" },
      modalTop: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "12px 14px", borderBottom: `1px solid ${C.border}`, background: C.bg2 },
      modalTitle: { fontSize: 16, fontWeight: 600, color: C.heading },
      modalClose: { fontSize: 15, fontWeight: 600, padding: "8px 10px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg1, cursor: "pointer", color: C.heading },
      modalBody: { padding: 16 },
      modalSubtitle: { fontSize: 14, color: C.muted, lineHeight: 1.6, margin: "6px 0 12px" },

      infoRow: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
      pill: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: C.bg1 },
      pillLabel: { fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6 },
      pillValue: { fontSize: 16, fontWeight: 600, color: C.heading },

      modalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
      field: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: C.bg1 },
      fieldLabel: { fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6 },
      fieldRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
      fieldValue: { fontSize: 14, fontWeight: 600, color: C.heading, wordBreak: "break-word" },
      copyBtn: { fontSize: 13, fontWeight: 600, padding: "8px 10px", borderRadius: 10, border: `1px solid ${C.border}`, background: C.bg2, cursor: "pointer", color: C.heading, whiteSpace: "nowrap" },

      modalNote: { marginTop: 12, border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`, color: C.text, fontSize: 14, lineHeight: 1.6 },
      modalActions: { marginTop: 12, display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" },
      btnSecondary: { fontSize: 16, fontWeight: 600, padding: "10px 14px", borderRadius: 12, border: `1px solid ${C.border}`, background: C.bg1, color: C.heading, cursor: "pointer" },
      btnModalPrimary: { fontSize: 16, fontWeight: 600, padding: "10px 14px", borderRadius: 12, border: "1px solid transparent", background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`, color: "#fff", cursor: "pointer" },

      formGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
      inputWrap: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: C.bg1 },
      inputLabel: { fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6 },
      input: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 10px", fontSize: 14, fontWeight: 400, color: C.text, outline: "none", background: C.bg1 },
      textarea: { width: "100%", border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 10px", fontSize: 14, fontWeight: 400, color: C.text, outline: "none", background: C.bg1, minHeight: 90, resize: "vertical" },

      successBox: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 14, background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)` },
      successTitle: { fontSize: 16, fontWeight: 600, color: C.heading, marginBottom: 6 },
      successBody: { fontSize: 14, fontWeight: 400, color: C.text, lineHeight: 1.6 },
    }),
    [C, FONT_STACK]
  );

  const onChoosePlan = (planKey) => {
    setSelectedPlan(planKey);
    setBankModalOpen(true);
    setShowReceiptForm(false);
    setReceiptSubmitted(false);
    setReceipt({ fullName: "", email: "", phone: "", transferDate: "", reference: "", notes: "", file: null });
  };

  const closeModal = () => {
    setBankModalOpen(false);
    setShowReceiptForm(false);
    setReceiptSubmitted(false);
  };

  const amount = useMemo(() => (selectedPlan ? `${PLAN_AMOUNTS[selectedPlan]} AED` : ""), [selectedPlan, PLAN_AMOUNTS]);

  const planDisplayName = useMemo(() => {
    if (!selectedPlan) return "";
    if (selectedPlan === "basic") return t.plans.basic.name;
    if (selectedPlan === "pro") return t.plans.pro.name;
    if (selectedPlan === "firm") return t.plans.firm.name;
    return "";
  }, [selectedPlan, t]);

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(String(value || ""));
    } catch (_) {}
  };

  const submitReceipt = (e) => {
    e.preventDefault();
    setReceiptSubmitted(true);
  };

  return (
    <div style={S.page} dir={isAR ? "rtl" : "ltr"}>
      <main style={S.main}>
        <section style={S.heroCard}>
          <div style={S.kicker}>{t.hero.kicker}</div>
          <h2 style={S.h2}>{t.hero.title}</h2>
          <p style={S.desc}>{t.hero.subtitle}</p>

          <div style={S.anchor}>
            <span style={S.anchorLabel}>{t.hero.anchorLabel}</span>
            <span style={S.anchorText}>{t.hero.anchorText}</span>
          </div>

          <div style={S.note}>{t.hero.noteTop}</div>
        </section>

        <section style={S.grid}>
          <PlanCard S={S} C={C} t={t} planKey="basic" badge={null} recommended={false} onCta={() => onChoosePlan("basic")} />
          <PlanCard S={S} C={C} t={t} planKey="pro" badge={t.plans.pro.badge} recommended onCta={() => onChoosePlan("pro")} />
          <PlanCard S={S} C={C} t={t} planKey="firm" badge={null} recommended={false} onCta={() => onChoosePlan("firm")} />
        </section>

        <div style={S.foot}>{t.foot}</div>
      </main>

      {bankModalOpen ? (
        <div style={S.modalOverlay} onClick={closeModal} role="presentation">
          <div style={S.modal} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <div style={S.modalTop}>
              <div style={S.modalTitle}>{t.bank.title}</div>
              <button style={S.modalClose} type="button" onClick={closeModal}>
                {t.bank.close}
              </button>
            </div>

            <div style={S.modalBody}>
              {!showReceiptForm ? (
                <>
                  <div style={S.modalSubtitle}>{t.bank.subtitle}</div>

                  <div style={S.infoRow}>
                    <div style={S.pill}>
                      <div style={S.pillLabel}>{t.bank.selectedPlanLabel}</div>
                      <div style={S.pillValue}>{planDisplayName}</div>
                    </div>
                    <div style={S.pill}>
                      <div style={S.pillLabel}>{t.bank.amountLabel}</div>
                      <div style={S.pillValue}>{amount}</div>
                    </div>
                  </div>

                  <div style={S.infoRow}>
                    <div style={S.pill}>
                      <div style={S.pillLabel}>{t.bank.currentBalance}</div>
                      <div style={S.pillValue}>AED {BANK_DETAILS.currentBalance}</div>
                    </div>
                    <div style={S.pill}>
                      <div style={S.pillLabel}>{t.bank.fields.currency}</div>
                      <div style={S.pillValue}>{BANK_DETAILS.currency}</div>
                    </div>
                  </div>

                  <div style={S.modalGrid}>
                    <Field S={S} label={t.bank.fields.beneficiaryName} value={BANK_DETAILS.beneficiaryName} onCopy={() => copy(BANK_DETAILS.beneficiaryName)} copyLabel={t.bank.copy} />
                    <Field S={S} label={t.bank.fields.bankName} value={BANK_DETAILS.bankName} onCopy={() => copy(BANK_DETAILS.bankName)} copyLabel={t.bank.copy} />
                    <Field S={S} label={t.bank.fields.accountNumber} value={BANK_DETAILS.accountNumber} onCopy={() => copy(BANK_DETAILS.accountNumber)} copyLabel={t.bank.copy} />
                    <Field S={S} label={t.bank.fields.iban} value={BANK_DETAILS.iban} onCopy={() => copy(BANK_DETAILS.iban)} copyLabel={t.bank.copy} />
                  </div>

                  <div style={S.modalNote}>
                    <div style={{ fontWeight: 600, color: C.heading, marginBottom: 6 }}>{t.bank.fields.reference}</div>
                    <div>{BANK_DETAILS.referenceHint}</div>
                    <div style={{ marginTop: 8 }}>{BANK_DETAILS.activationNote}</div>
                  </div>

                  <div style={S.modalActions}>
                    <button style={S.btnSecondary} type="button" onClick={closeModal}>
                      {t.bank.close}
                    </button>
                    <button style={S.btnModalPrimary} type="button" onClick={() => setShowReceiptForm(true)}>
                      {t.bank.havePaid}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div style={S.modalSubtitle}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: C.heading }}>{t.bank.receiptTitle}</div>
                    <div style={{ marginTop: 6 }}>{t.bank.receiptSubtitle}</div>
                  </div>

                  {receiptSubmitted ? (
                    <div style={S.successBox}>
                      <div style={S.successTitle}>{t.bank.successTitle}</div>
                      <div style={S.successBody}>{t.bank.successBody}</div>
                    </div>
                  ) : (
                    <form onSubmit={submitReceipt}>
                      <div style={S.formGrid}>
                        <Input S={S} label={t.bank.fields.fullName} value={receipt.fullName} onChange={(v) => setReceipt((p) => ({ ...p, fullName: v }))} type="text" required />
                        <Input S={S} label={t.bank.fields.email} value={receipt.email} onChange={(v) => setReceipt((p) => ({ ...p, email: v }))} type="email" required />
                        <Input S={S} label={t.bank.fields.phone} value={receipt.phone} onChange={(v) => setReceipt((p) => ({ ...p, phone: v }))} type="tel" required />
                        <Input S={S} label={t.bank.fields.transferDate} value={receipt.transferDate} onChange={(v) => setReceipt((p) => ({ ...p, transferDate: v }))} type="date" required />
                        <Input S={S} label={t.bank.fields.transferRef} value={receipt.reference} onChange={(v) => setReceipt((p) => ({ ...p, reference: v }))} type="text" />
                        <div style={S.inputWrap}>
                          <div style={S.inputLabel}>{t.bank.fields.file}</div>
                          <input style={S.input} type="file" accept="image/*,.pdf" onChange={(e) => setReceipt((p) => ({ ...p, file: e.target.files?.[0] || null }))} required />
                        </div>
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <div style={S.inputLabel}>{t.bank.fields.notes}</div>
                        <textarea style={S.textarea} value={receipt.notes} onChange={(e) => setReceipt((p) => ({ ...p, notes: e.target.value }))} />
                      </div>

                      <div style={S.modalActions}>
                        <button style={S.btnSecondary} type="button" onClick={() => setShowReceiptForm(false)}>
                          {t.bank.back}
                        </button>
                        <button style={S.btnModalPrimary} type="submit">
                          {t.bank.submit}
                        </button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PlanCard({ S, t, planKey, badge, recommended, onCta }) {
  const plan = t.plans[planKey];
  const bullets = t.bullets[planKey];

  return (
    <div style={S.card}>
      <div style={{ position: "relative" }}>
        {badge ? <div style={S.badge}>{badge}</div> : <div style={{ height: 28 }} />}
        <div style={S.title}>{plan.name}</div>
        <div style={S.tagline}>{plan.tagline}</div>
        <div style={S.price}>{plan.price}</div>
        {plan.perDay ? <div style={S.subprice}>{plan.perDay}</div> : <div style={{ height: 20 }} />}
        <div style={S.hr} />
        <ul style={{ margin: 0, padding: "0 0 0 18px", color: "#475569", lineHeight: 1.7 }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ margin: "8px 0", fontSize: 14, fontWeight: 400 }}>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "auto", paddingTop: 14 }}>
        {planKey === "pro" ? (
          <button style={S.btnPrimary} type="button" onClick={onCta}>
            {plan.cta}
          </button>
        ) : (
          <button style={S.btnOutline} type="button" onClick={onCta}>
            {plan.cta}
          </button>
        )}
      </div>
    </div>
  );
}

function Field({ S, label, value, onCopy, copyLabel }) {
  return (
    <div style={S.field}>
      <div style={S.fieldLabel}>{label}</div>
      <div style={S.fieldRow}>
        <div style={S.fieldValue}>{value}</div>
        <button style={S.copyBtn} type="button" onClick={onCopy}>
          {copyLabel}
        </button>
      </div>
    </div>
  );
}

function Input({ S, label, value, onChange, type, required }) {
  return (
    <div style={S.inputWrap}>
      <div style={S.inputLabel}>{label}</div>
      <input style={S.input} value={value} onChange={(e) => onChange(e.target.value)} type={type} required={!!required} />
    </div>
  );
}
