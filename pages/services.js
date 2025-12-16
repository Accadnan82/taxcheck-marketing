import React, { useMemo, useState, useEffect } from "react";

export default function ServicesPage() {
  const year = useMemo(() => new Date().getFullYear(), []);
  const [lang, setLang] = useState("en");
  const isAR = lang === "ar";

  // Consultation Modal
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    service: "Financial Services",
    preferred: "",
    message: "",
  });

  // Sync language with PublicLayout (localStorage + event)
  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && localStorage.getItem("tc_lang")) || "en";
    setLang(saved);

    const handler = (e) => {
      const next = e?.detail?.lang || "en";
      setLang(next);
    };
    window.addEventListener("tc-lang-change", handler);
    return () => window.removeEventListener("tc-lang-change", handler);
  }, []);

  const t = (en, ar) => (isAR ? ar : en);

  const contactEmail = "info@TaxCheck.com";
  const contactPhone = "+971505523307";

  const onChange = (key) => (e) =>
    setForm((p) => ({ ...p, [key]: e.target.value }));

  const validate = () => form.fullName.trim() && form.email.trim();

  const submitViaMailto = () => {
    const subject = encodeURIComponent(
      `TaxCheck Consultation Request - ${form.fullName || "New Lead"}`
    );

    const body = encodeURIComponent(
      [
        `Full Name: ${form.fullName}`,
        `Company: ${form.company}`,
        `Email: ${form.email}`,
        `Phone: ${form.phone}`,
        `Service: ${form.service}`,
        `Preferred: ${form.preferred || "-"}`,
        "",
        "Message:",
        form.message || "-",
      ].join("\n")
    );

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <div dir={isAR ? "rtl" : "ltr"} className="tc-srv">
      {/* NOTE: No header/nav/logo here on purpose — PublicLayout already renders it */}
      <style>{`
        /* ===========================
           Font System (Saved)
           =========================== */
        .tc-srv{
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          font-size: 16px;
          line-height: 1.6;
          font-weight: 400;
          color: #475569; /* primary text */
        }

        :root{
          /* ===== Approved Colors (exact) ===== */
          --tc-title: #1e3a5f;
          --tc-text:  #475569;
          --tc-muted: #64748b;
          --tc-border:#e2e8f0;
          --tc-bg:    #ffffff;
          --tc-bg2:   #f8fafc;
          --tc-g1:    #10b981;
          --tc-g2:    #059669;

          --tc-shadow: 0 14px 40px rgba(30,58,95,.10);
          --tc-shadow-soft: 0 10px 24px rgba(30,58,95,.08);
        }

        *{box-sizing:border-box}

        .container{
          width:100%;
          max-width:1160px;
          margin:0 auto;
          padding: 0 18px 26px;
        }

        /* ===== Page Card Shell ===== */
        .shell{
          margin-top: 18px;
          border: 1px solid var(--tc-border);
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(255,255,255,.88), rgba(248,250,252,.70));
          box-shadow: var(--tc-shadow);
          padding: 28px 28px 22px;
          position: relative;
          overflow:hidden;
        }
        .shell::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            radial-gradient(900px 420px at 18% 0%, rgba(16,185,129,.18), transparent 60%),
            radial-gradient(900px 420px at 85% 0%, rgba(16,185,129,.10), transparent 55%);
          pointer-events:none;
        }
        .inner{ position:relative; }

        /* H2 main headline: 48/700/1.2 */
        .title{
          margin:0;
          color: var(--tc-title);
          font-size: 48px;
          line-height: 1.2;
          font-weight: 700;
          letter-spacing: -0.6px;
        }

        /* hero description: 18/400/1.7 */
        .desc{
          margin: 14px 0 0;
          color: var(--tc-muted);
          font-size: 18px;
          line-height: 1.7;
          font-weight: 400;
          max-width: 920px;
        }

        /* Cards */
        .grid{
          margin-top: 20px;
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 980px){
          .title{ font-size: 36px; line-height: 1.25; }
          .grid{ grid-template-columns: 1fr; }
          .shell{ padding: 22px 18px 18px; }
        }

        .card{
          border: 1px solid var(--tc-border);
          border-radius: 18px;
          background: rgba(255,255,255,.78);
          box-shadow: var(--tc-shadow-soft);
          padding: 18px 18px 14px;
        }

        /* Card title: 18/600 (within 16–20) */
        .cardTitle{
          margin:0 0 12px;
          color: var(--tc-title);
          font-size: 18px;
          font-weight: 600;
          letter-spacing: .1px;
        }

        /* feature text: 14/400/1.65 */
        .list{
          margin:0; padding:0;
          list-style:none;
          display:flex;
          flex-direction:column;
          gap: 12px;
        }
        .item{
          display:flex;
          gap: 10px;
          align-items:flex-start;
        }
        .iconBox{
          width: 32px; height: 32px;
          border-radius: 12px;
          display:flex; align-items:center; justify-content:center;
          border: 1px solid var(--tc-border);
          background: rgba(255,255,255,.92);
          flex: 0 0 auto;
          margin-top: 1px;
        }
        .itemText{
          font-size: 14px;
          line-height: 1.65;
          font-weight: 400;
          color: var(--tc-text);
        }

        /* CTA */
        .ctaWrap{
          margin-top: 18px;
          display:flex;
          justify-content:center;
        }
        .cta{
          width: 100%;
          max-width: 620px;
          border-radius: 18px;
          border: 1px solid var(--tc-border);
          background: rgba(255,255,255,.82);
          box-shadow: var(--tc-shadow-soft);
          padding: 18px 18px 16px;
          text-align:center;
        }

        .ctaTitle{
          margin:0;
          color: var(--tc-title);
          font-size: 20px;
          font-weight: 600;
          line-height: 1.3;
        }
        .ctaSub{
          margin: 8px 0 14px;
          color: var(--tc-muted);
          font-size: 14px;
          line-height: 1.65;
          font-weight: 400;
        }

        /* Primary button: 16/600 + green gradient */
        .btnPrimary{
          border: none;
          padding: 12px 18px;
          border-radius: 16px;
          background: linear-gradient(180deg, var(--tc-g1), var(--tc-g2));
          color: #fff;
          font-size: 16px;
          font-weight: 600;
          cursor:pointer;
          box-shadow: 0 16px 30px rgba(16,185,129,.22);
          transition: transform .12s ease, opacity .12s ease, box-shadow .12s ease;
        }
        .btnPrimary:hover{
          opacity:.96;
          transform: translateY(-1px);
          box-shadow: 0 18px 36px rgba(16,185,129,.26);
        }
        .btnPrimary:active{ transform: translateY(0px); }

        .btnSecondary{
          border: 1px solid var(--tc-border);
          background: rgba(248,250,252,.85);
          padding: 12px 14px;
          border-radius: 16px;
          font-size: 16px;
          font-weight: 600;
          cursor:pointer;
          color: var(--tc-title);
        }

        .contactLine{
          margin-top: 12px;
          font-size: 14px;
          color: var(--tc-muted);
          font-weight: 400;
          line-height: 1.6;
        }

        /* Footer: 14 */
        .footer{
          padding: 18px 0 6px;
          color: var(--tc-muted);
          font-size: 14px;
          line-height: 1.6;
          text-align:center;
          font-weight: 400;
        }

        /* Modal */
        .overlay{
          position: fixed;
          inset: 0;
          background: rgba(15,23,42,0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          display: grid;
          place-items: center;
          z-index: 9999;
          padding: 18px;
        }
        .modal{
          width: min(760px, 96vw);
          background: rgba(255,255,255,0.97);
          border: 1px solid var(--tc-border);
          border-radius: 18px;
          box-shadow: 0 30px 80px rgba(15,23,42,0.22);
          overflow: hidden;
        }
        .modalTop{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap: 12px;
          padding: 14px 16px;
          border-bottom: 1px solid var(--tc-border);
        }
        .modalTitle{
          font-size: 16px;
          font-weight: 600;
          color: var(--tc-title);
        }
        .closeBtn{
          border: 1px solid var(--tc-border);
          background: #fff;
          border-radius: 12px;
          padding: 8px 10px;
          font-weight: 600;
          font-size: 14px;
          cursor:pointer;
          color: var(--tc-title);
        }
        .modalBody{ padding: 16px; }

        .formGrid{
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 820px){
          .formGrid{ grid-template-columns: 1fr; }
        }

        label{
          display:block;
          font-size: 13px;
          color: var(--tc-muted);
          margin-bottom: 6px;
          font-weight: 600;
        }
        input, select, textarea{
          width: 100%;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid var(--tc-border);
          background: rgba(255,255,255,.98);
          outline: none;
          color: var(--tc-text);
          font-size: 16px;
          line-height: 1.6;
          font-weight: 400;
        }
        textarea{
          min-height: 110px;
          resize: vertical;
        }
        .modalActions{
          display:flex;
          justify-content:flex-end;
          gap: 10px;
          margin-top: 14px;
          flex-wrap: wrap;
        }
        .hint{
          margin-top: 10px;
          font-size: 14px;
          color: var(--tc-muted);
          line-height: 1.6;
          font-weight: 400;
        }
      `}</style>

      <div className="container">
        <div className="shell">
          <div className="inner">
            <h1 className="title">
              {t(
                "Integrated Financial Services & FinTech Solutions",
                "خدمات مالية متكاملة وحلول تقنية مالية"
              )}
            </h1>

            <p className="desc">
              {t(
                "Expert consulting and software designed to ensure tax compliance and optimize your business in the UAE.",
                "استشارات وخدمات وبرمجيات لضمان الامتثال الضريبي وتحسين أعمالك في دولة الإمارات."
              )}
            </p>

            <div className="grid">
              <div className="card">
                <h2 className="cardTitle">{t("Financial Services", "الخدمات المالية")}</h2>
                <ul className="list">
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><DocIcon /></div>
                    <div className="itemText">
                      {t(
                        "Corporate Tax readiness, filing support and end-to-end guidance (UAE).",
                        "جاهزية ضريبة الشركات، دعم تقديم الإقرار، وإرشاد شامل (الإمارات)."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><DocIcon /></div>
                    <div className="itemText">
                      {t(
                        "Seamless VAT return preparation with ready summaries.",
                        "إعداد إقرار ضريبة القيمة المضافة بسلاسة مع ملخصات جاهزة."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><CalendarIcon /></div>
                    <div className="itemText">
                      {t(
                        "Automated compliance setup for SMEs & groups.",
                        "إعداد امتثال آلي للشركات الصغيرة والمتوسطة والمجموعات."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><LockIcon /></div>
                    <div className="itemText">
                      {t(
                        "Internal control checklists & validations to reduce errors.",
                        "قوائم تدقيق وضوابط داخلية مع تحققات لتقليل الأخطاء."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><ReportIcon /></div>
                    <div className="itemText">
                      {t(
                        "Review of outputs and executive-ready reports for decision makers.",
                        "مراجعة المخرجات وتقارير جاهزة للإدارة لدعم اتخاذ القرار."
                      )}
                    </div>
                  </li>
                </ul>
              </div>

              <div className="card">
                <h2 className="cardTitle">
                  {t("FinTech & Financial Software Consulting", "استشارات تقنية مالية وبرمجيات")}
                </h2>
                <ul className="list">
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><GearIcon /></div>
                    <div className="itemText">
                      {t(
                        "Requirements for workflow design for accounting & tax applications.",
                        "تحليل المتطلبات وتصميم سير العمل لتطبيقات المحاسبة والضرائب."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><DatabaseIcon /></div>
                    <div className="itemText">
                      {t(
                        "Customized data modelling (entities, structure, periods).",
                        "نمذجة بيانات مخصصة (كيانات، هيكل، فترات)."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><CheckIcon /></div>
                    <div className="itemText">
                      {t(
                        "Intelligent controls design (deterministic gates) to reduce risk.",
                        "تصميم ضوابط ذكية (بوابات تحقق حتمية) لتقليل المخاطر."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><ChartIcon /></div>
                    <div className="itemText">
                      {t(
                        "Dashboard/KPI design for compliance and finance operations.",
                        "تصميم لوحات معلومات ومؤشرات KPI للامتثال والعمليات المالية."
                      )}
                    </div>
                  </li>
                  <li className="item">
                    <div className="iconBox" aria-hidden="true"><LinkIcon /></div>
                    <div className="itemText">
                      {t(
                        "Implementation advisory, integrations, exports & reporting outputs.",
                        "استشارات تنفيذ، تكاملات، تصدير بيانات، ومخرجات تقارير."
                      )}
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="ctaWrap">
              <div className="cta">
                <div className="ctaTitle">
                  {t("Ready to simplify your finances?", "جاهز لتبسيط أمورك المالية؟")}
                </div>
                <div className="ctaSub">
                  {t(
                    "Book your consultation today and let our experts guide you.",
                    "احجز استشارتك اليوم ودع خبراءنا يرشدونك."
                  )}
                </div>

                {/* MAIN CTA BUTTON */}
                <button className="btnPrimary" type="button" onClick={() => setOpen(true)}>
                  {t("Book a Consultation", "احجز استشارة")}
                </button>

                <div className="contactLine">
                  {t(
                    `Or contact us: ${contactEmail}  |  ${contactPhone}`,
                    `أو تواصل معنا: ${contactEmail}  |  ${contactPhone}`
                  )}
                </div>
              </div>
            </div>

            <div className="footer">© {year} TaxCheck. All rights reserved.</div>
          </div>
        </div>
      </div>

      {/* MODAL */}
      {open && (
        <div className="overlay" role="dialog" aria-modal="true">
          <div className="modal">
            <div className="modalTop">
              <div className="modalTitle">{t("Book a Consultation", "حجز استشارة")}</div>
              <button className="closeBtn" type="button" onClick={() => setOpen(false)}>
                {t("Close", "إغلاق")}
              </button>
            </div>

            <div className="modalBody">
              <div className="formGrid">
                <div>
                  <label>{t("Full name", "الاسم الكامل")}</label>
                  <input value={form.fullName} onChange={onChange("fullName")} />
                </div>

                <div>
                  <label>{t("Company", "الشركة")}</label>
                  <input value={form.company} onChange={onChange("company")} />
                </div>

                <div>
                  <label>{t("Email", "البريد الإلكتروني")}</label>
                  <input value={form.email} onChange={onChange("email")} />
                </div>

                <div>
                  <label>{t("Phone", "رقم الهاتف")}</label>
                  <input value={form.phone} onChange={onChange("phone")} />
                </div>

                <div>
                  <label>{t("Service", "الخدمة")}</label>
                  <select value={form.service} onChange={onChange("service")}>
                    <option value="Financial Services">{t("Financial Services", "الخدمات المالية")}</option>
                    <option value="FinTech Consulting">{t("FinTech & Software Consulting", "استشارات فن تيك وبرمجيات")}</option>
                    <option value="Corporate Tax & VAT Support">{t("Corporate Tax & VAT Support", "دعم ضريبة الشركات وVAT")}</option>
                  </select>
                </div>

                <div>
                  <label>{t("Preferred contact time", "وقت التواصل المفضل")}</label>
                  <input
                    placeholder={t("e.g., Today 3pm UAE time", "مثال: اليوم 3 عصراً بتوقيت الإمارات")}
                    value={form.preferred}
                    onChange={onChange("preferred")}
                  />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label>{t("Message", "الرسالة")}</label>
                <textarea value={form.message} onChange={onChange("message")} />
              </div>

              <div className="modalActions">
                <button className="btnSecondary" type="button" onClick={() => setOpen(false)}>
                  {t("Cancel", "إلغاء")}
                </button>

                <button
                  className="btnPrimary"
                  type="button"
                  onClick={() => {
                    if (!validate()) {
                      alert(
                        t(
                          "Please enter at least your full name and email.",
                          "رجاءً أدخل على الأقل الاسم الكامل والبريد الإلكتروني."
                        )
                      );
                      return;
                    }
                    submitViaMailto();
                  }}
                >
                  {t("Send Request", "إرسال الطلب")}
                </button>
              </div>

              <div className="hint">
                {t(
                  "Note: This form opens your email client and sends the request to info@TaxCheck.com.",
                  "ملاحظة: هذا النموذج يفتح تطبيق البريد لديك ويرسل الطلب إلى info@TaxCheck.com."
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* Icons */
function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M14 3v4a2 2 0 0 0 2 2h4" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M8 12h8M8 16h8" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 3v3M17 3v3" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M5 7h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M3 11h18" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M7 11V8a5 5 0 0 1 10 0v3" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M6 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M12 15v3" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function ReportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M8 9h8M8 13h8M8 17h5" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.2-2-3.4-2.3.8a8.3 8.3 0 0 0-1.7-1l-.3-2.4H10.8l-.3 2.4a8.3 8.3 0 0 0-1.7 1l-2.3-.8-2 3.4 2 1.2a7.9 7.9 0 0 0 .1 2l-2 1.2 2 3.4 2.3-.8c.5.4 1.1.7 1.7 1l.3 2.4h4.4l.3-2.4c.6-.3 1.2-.6 1.7-1l2.3.8 2-3.4-2-1.2z" stroke="rgba(100,116,139,.75)" strokeWidth="1.4" strokeLinejoin="round" />
    </svg>
  );
}
function DatabaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="6" rx="7" ry="3" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="rgba(71,85,105,.75)" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M4 19V5" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M4 19h16" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M8 17v-6M12 17V8M16 17v-4" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1" stroke="rgba(71,85,105,.75)" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1" stroke="rgba(100,116,139,.75)" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}
