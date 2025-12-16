// src/pages/Pricing.jsx
import React, { useMemo, useState } from "react";

/**
 * TaxCheck – Pricing Page (EN + AR)
 * Updated per your request:
 * ✅ Bank details set to Mashreq Bank + provided account/IBAN/currency
 * ✅ Modal shows Amount (AED) automatically based on selected plan
 * ✅ "I have paid" opens a receipt submission form (inside the modal)
 * ✅ Header/Nav removed to avoid duplication with Layout header
 * ✅ Contact section last two buttons removed (Book a Consultation / Login)
 *
 * NOTE:
 * - Receipt form is front-end only. Hook it to your backend/email sender later.
 */

export default function PricingPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [lang, setLang] = useState("EN");
  const isAR = lang === "AR";

  // Modal state
  const [bankModalOpen, setBankModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showReceiptForm, setShowReceiptForm] = useState(false);

  // Receipt form state
  const [receipt, setReceipt] = useState({
    fullName: "",
    email: "",
    phone: "",
    transferDate: "",
    reference: "",
    notes: "",
    file: null,
  });
  const [receiptSubmitted, setReceiptSubmitted] = useState(false);

  // ✅ Bank details (provided by you)
  const BANK_DETAILS = useMemo(
    () => ({
      bankName: "Mashreq Bank",
      accountNumber: "019100279275",
      iban: "AE430330000019100279275",
      currency: "AED",
      // Balance is informational; shown as "Current Balance"
      currentBalance: "8,029.23",
      beneficiaryName: "TaxCheck",
      referenceHint: "Use your email + plan name as the transfer reference.",
      activationNote: "After transfer, submit the receipt here to activate your subscription.",
    }),
    []
  );

  // ✅ Plan pricing (amount auto)
  const PLAN_AMOUNTS = useMemo(
    () => ({
      basic: 99,
      pro: 249,
      firm: 499,
    }),
    []
  );

  const onChoosePlan = (planKey) => {
    setSelectedPlan(planKey);
    setBankModalOpen(true);
    setShowReceiptForm(false);
    setReceiptSubmitted(false);
    setReceipt({
      fullName: "",
      email: "",
      phone: "",
      transferDate: "",
      reference: "",
      notes: "",
      file: null,
    });
  };

  const closeModal = () => {
    setBankModalOpen(false);
    setShowReceiptForm(false);
    setReceiptSubmitted(false);
  };

  const amount = useMemo(() => {
    if (!selectedPlan) return "";
    const a = PLAN_AMOUNTS[selectedPlan];
    if (!a && a !== 0) return "";
    return `${a} AED`;
  }, [selectedPlan, PLAN_AMOUNTS]);

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
      sectionTitle: "Plans",
      foot: "All plans include secure exports and audit-friendly outputs. Prices shown are monthly.",
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
      contact: {
        title: "Contact",
        emailLabel: "Email",
        phoneLabel: "Mobile",
        email: "info@TaxCheck.com",
        phone: "+971505523307",
      },
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
        subtitle: "اختر الخطة بناءً على مستوى المخاطر وسير العمل وحجم العملاء. يمكنك الترقية في أي وقت.",
        anchorLabel: "مرجع المقارنة:",
        anchorText: "خطأ واحد في التقديم قد يكلّف أكثر من اشتراك سنة كاملة في TaxCheck.",
        noteTop: "اشتراك شهري. يمكنك الإلغاء في أي وقت. ضريبة القيمة المضافة غير مشمولة ما لم يُذكر خلاف ذلك.",
      },
      sectionTitle: "الخطط",
      foot: "كل الخطط تشمل مخرجات قابلة للأرشفة وقوائم تدقيق مناسبة للمراجعة. الأسعار المعروضة شهرية.",
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
      contact: {
        title: "تواصل معنا",
        emailLabel: "البريد",
        phoneLabel: "الموبايل",
        email: "info@TaxCheck.com",
        phone: "+971505523307",
      },
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

  // ✅ Official palette (confirmed)
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

  // ✅ Official typography
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
        background: C.bg1,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
      },
      kicker: {
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        borderRadius: 999,
        border: `1px solid ${C.border}`,
        background: C.bg2,
        color: C.heading,
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 12,
      },
      heroTitle: { fontSize: 48, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.6, margin: 0, color: C.heading },
      heroDesc: { fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: C.text, margin: "12px 0 0", maxWidth: 880 },

      anchor: {
        marginTop: 16,
        padding: "14px 14px",
        borderRadius: 16,
        border: `1px solid ${C.border}`,
        background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`,
        display: "flex",
        gap: 10,
        flexWrap: "wrap",
        alignItems: "center",
      },
      anchorLabel: { fontSize: 14, fontWeight: 600, color: C.heading },
      anchorText: { fontSize: 14, fontWeight: 500, color: C.text },
      noteTop: { marginTop: 12, color: C.muted, fontSize: 14, fontWeight: 400 },

      langRow: { marginTop: 14, display: "flex", justifyContent: "flex-end", gap: 10, flexWrap: "wrap" },
      btnSmall: {
        fontSize: 15,
        fontWeight: 600,
        padding: "10px 14px",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        background: C.bg1,
        color: C.heading,
        cursor: "pointer",
      },

      sectionTitle: { margin: "26px 0 14px", textAlign: "center", fontSize: 36, fontWeight: 700, color: C.heading },

      grid: {
        width: "100%",
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 14,
      },

      footerMini: { textAlign: "center", marginTop: 18, color: C.muted, fontSize: 14, fontWeight: 400 },

      contactWrap: { maxWidth: 980, margin: "22px auto 0" },
      contactCard: { background: C.bg1, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, boxShadow: "0 10px 26px rgba(15,23,42,0.06)" },
      contactTitle: { fontSize: 16, fontWeight: 600, color: C.heading, marginBottom: 10 },
      row: { display: "flex", justifyContent: "space-between", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.border}` },
      rowLast: { borderBottom: "none" },
      label: { color: C.muted, fontWeight: 600, fontSize: 14 },
      value: { color: C.heading, fontWeight: 600, fontSize: 14 },

      // Modal
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
        width: "min(980px, 96vw)",
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

      infoRow: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 12,
        marginBottom: 12,
      },

      pill: {
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 12,
        background: C.bg1,
      },
      pillLabel: { fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6 },
      pillValue: { fontSize: 16, fontWeight: 600, color: C.heading },

      modalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },

      field: { border: `1px solid ${C.border}`, borderRadius: 12, padding: 12, background: C.bg1 },
      fieldLabel: { fontSize: 13, fontWeight: 600, color: C.muted, marginBottom: 6 },
      fieldValueRow: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 },
      fieldValue: { fontSize: 14, fontWeight: 600, color: C.heading, wordBreak: "break-word" },
      copyBtn: {
        fontSize: 13,
        fontWeight: 600,
        padding: "8px 10px",
        borderRadius: 10,
        border: `1px solid ${C.border}`,
        background: C.bg2,
        cursor: "pointer",
        color: C.heading,
        whiteSpace: "nowrap",
      },

      modalNote: {
        marginTop: 12,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 12,
        background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`,
        color: C.text,
        fontSize: 14,
        lineHeight: 1.6,
        fontWeight: 400,
      },

      modalActions: { marginTop: 12, display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" },
      btnPrimary: {
        fontSize: 16,
        fontWeight: 600,
        padding: "10px 14px",
        borderRadius: 12,
        border: "1px solid transparent",
        background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`,
        color: "#fff",
        cursor: "pointer",
      },
      btnSecondary: {
        fontSize: 16,
        fontWeight: 600,
        padding: "10px 14px",
        borderRadius: 12,
        border: `1px solid ${C.border}`,
        background: C.bg1,
        color: C.heading,
        cursor: "pointer",
      },

      // Receipt form
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

  const planDisplayName = useMemo(() => {
    if (!selectedPlan) return "";
    if (selectedPlan === "basic") return t.plans.basic.name;
    if (selectedPlan === "pro") return t.plans.pro.name;
    if (selectedPlan === "firm") return t.plans.firm.name;
    return "";
  }, [selectedPlan, t]);

  const planBullets = useMemo(() => {
    if (!selectedPlan) return [];
    return t.bullets[selectedPlan] || [];
  }, [selectedPlan, t]);

  const copy = async (value) => {
    try {
      await navigator.clipboard.writeText(String(value || ""));
    } catch (_) {
      // ignore
    }
  };

  const onReceiptChange = (k, v) => setReceipt((p) => ({ ...p, [k]: v }));

  const submitReceipt = (e) => {
    e.preventDefault();
    // Front-end only confirmation (wire to backend later)
    setReceiptSubmitted(true);
  };

  return (
    <div style={S.page} dir={isAR ? "rtl" : "ltr"}>
      {/* Header/Nav removed (Layout already has header) */}

      <main style={S.main}>
        {/* HERO */}
        <section style={S.heroCard}>
          <div style={S.kicker}>{t.hero.kicker}</div>
          <h2 style={S.heroTitle}>{t.hero.title}</h2>
          <p style={S.heroDesc}>{t.hero.subtitle}</p>

          <div style={S.anchor}>
            <span style={S.anchorLabel}>{t.hero.anchorLabel}</span>
            <span style={S.anchorText}>{t.hero.anchorText}</span>
          </div>

          <div style={S.noteTop}>{t.hero.noteTop}</div>

          <div style={S.langRow}>
            <button style={S.btnSmall} type="button" onClick={() => setLang(isAR ? "EN" : "AR")}>
              {lang}
            </button>
          </div>
        </section>

        <div style={S.sectionTitle}>{t.sectionTitle}</div>

        {/* PLANS */}
        <section>
          <div style={S.grid}>
            <PlanCard
              C={C}
              badge={null}
              recommended={false}
              title={t.plans.basic.name}
              tagline={t.plans.basic.tagline}
              price={t.plans.basic.price}
              bullets={t.bullets.basic}
              ctaLabel={t.plans.basic.cta}
              ctaVariant="outline"
              onCta={() => onChoosePlan("basic")}
            />

            <PlanCard
              C={C}
              badge={t.plans.pro.badge}
              recommended
              title={t.plans.pro.name}
              tagline={t.plans.pro.tagline}
              price={t.plans.pro.price}
              subprice={t.plans.pro.perDay}
              bullets={t.bullets.pro}
              ctaLabel={t.plans.pro.cta}
              ctaVariant="primary"
              onCta={() => onChoosePlan("pro")}
            />

            <PlanCard
              C={C}
              badge={null}
              recommended={false}
              title={t.plans.firm.name}
              tagline={t.plans.firm.tagline}
              price={t.plans.firm.price}
              bullets={t.bullets.firm}
              ctaLabel={t.plans.firm.cta}
              ctaVariant="outline"
              onCta={() => onChoosePlan("firm")}
            />
          </div>

          <div style={S.footerMini}>{t.foot}</div>
        </section>

        {/* CONTACT (no buttons as requested earlier) */}
        <section style={S.contactWrap}>
          <div style={S.contactCard}>
            <div style={S.contactTitle}>{t.contact.title}</div>

            <div style={S.row}>
              <div style={S.label}>{t.contact.emailLabel}</div>
              <div style={S.value}>{t.contact.email}</div>
            </div>

            <div style={{ ...S.row, ...S.rowLast }}>
              <div style={S.label}>{t.contact.phoneLabel}</div>
              <div style={S.value}>{t.contact.phone}</div>
            </div>

            <div style={{ marginTop: 14, color: C.muted, fontSize: 14, fontWeight: 400, textAlign: "center" }}>
              © {year} TaxCheck
            </div>
          </div>
        </section>
      </main>

      {/* BANK TRANSFER MODAL */}
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
                    <div style={{ color: C.text }}>{BANK_DETAILS.referenceHint}</div>
                    <div style={{ marginTop: 8, color: C.text }}>{BANK_DETAILS.activationNote}</div>
                  </div>

                  <div style={S.modalActions}>
                    <button style={S.btnSecondary} type="button" onClick={closeModal}>
                      {t.bank.close}
                    </button>
                    <button style={S.btnPrimary} type="button" onClick={() => setShowReceiptForm(true)}>
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
                        <Input
                          S={S}
                          label={t.bank.fields.fullName}
                          value={receipt.fullName}
                          onChange={(v) => onReceiptChange("fullName", v)}
                          type="text"
                          required
                        />
                        <Input
                          S={S}
                          label={t.bank.fields.email}
                          value={receipt.email}
                          onChange={(v) => onReceiptChange("email", v)}
                          type="email"
                          required
                        />
                        <Input
                          S={S}
                          label={t.bank.fields.phone}
                          value={receipt.phone}
                          onChange={(v) => onReceiptChange("phone", v)}
                          type="tel"
                          required
                        />
                        <Input
                          S={S}
                          label={t.bank.fields.transferDate}
                          value={receipt.transferDate}
                          onChange={(v) => onReceiptChange("transferDate", v)}
                          type="date"
                          required
                        />
                        <Input
                          S={S}
                          label={t.bank.fields.transferRef}
                          value={receipt.reference}
                          onChange={(v) => onReceiptChange("reference", v)}
                          type="text"
                          placeholder={BANK_DETAILS.referenceHint}
                        />
                        <div style={S.inputWrap}>
                          <div style={S.inputLabel}>{t.bank.fields.file}</div>
                          <input
                            style={S.input}
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => onReceiptChange("file", e.target.files?.[0] || null)}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: 12 }}>
                        <div style={S.inputLabel}>{t.bank.fields.notes}</div>
                        <textarea
                          style={S.textarea}
                          value={receipt.notes}
                          onChange={(e) => onReceiptChange("notes", e.target.value)}
                          placeholder=""
                        />
                      </div>

                      <div style={S.modalActions}>
                        <button style={S.btnSecondary} type="button" onClick={() => setShowReceiptForm(false)}>
                          {t.bank.back}
                        </button>
                        <button style={S.btnPrimary} type="submit">
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

function PlanCard({ C, title, tagline, price, subprice, bullets, badge, recommended, ctaLabel, ctaVariant, onCta }) {
  const cardBase = {
    borderRadius: 16,
    border: `1px solid ${C.border}`,
    background: C.bg1,
    boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
    position: "relative",
    padding: 18,
    overflow: "hidden",
    minHeight: 420,
    display: "flex",
    flexDirection: "column",
  };

  return (
    <div style={cardBase}>
      {recommended ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            opacity: 0.5,
            background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`,
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
              background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`,
              color: "#fff",
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 10,
            }}
          >
            {badge}
          </div>
        ) : (
          <div style={{ height: 28 }} />
        )}

        <div style={{ fontSize: 18, fontWeight: 600, color: C.heading, margin: "0 0 6px" }}>{title}</div>

        <div style={{ fontSize: 14, fontWeight: 400, color: C.muted, lineHeight: 1.7, marginBottom: 12 }}>
          {tagline}
        </div>

        <div style={{ fontSize: 32, fontWeight: 700, color: C.heading, letterSpacing: -0.4 }}>{price}</div>

        {subprice ? (
          <div style={{ marginTop: 6, fontSize: 14, fontWeight: 500, color: C.text }}>{subprice}</div>
        ) : (
          <div style={{ height: 20 }} />
        )}

        <div style={{ height: 1, background: C.border, margin: "14px 0 12px" }} />

        <ul style={{ margin: 0, padding: "0 0 0 18px", color: C.text, lineHeight: 1.7 }}>
          {bullets.map((b, idx) => (
            <li key={idx} style={{ margin: "8px 0", fontSize: 14, fontWeight: 400 }}>
              {b}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: "auto", paddingTop: 14, position: "relative" }}>
        {ctaVariant === "primary" ? (
          <button
            type="button"
            onClick={onCta}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid transparent",
              background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`,
              color: "#fff",
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {ctaLabel}
          </button>
        ) : (
          <button
            type="button"
            onClick={onCta}
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 12,
              border: `1px solid ${C.border}`,
              background: C.bg1,
              color: C.heading,
              cursor: "pointer",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            {ctaLabel}
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
      <div style={S.fieldValueRow}>
        <div style={S.fieldValue}>{value}</div>
        <button style={S.copyBtn} type="button" onClick={onCopy}>
          {copyLabel}
        </button>
      </div>
    </div>
  );
}

function Input({ S, label, value, onChange, type, placeholder, required }) {
  return (
    <div style={S.inputWrap}>
      <div style={S.inputLabel}>{label}</div>
      <input
        style={S.input}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        placeholder={placeholder || ""}
        required={!!required}
      />
    </div>
  );
}
