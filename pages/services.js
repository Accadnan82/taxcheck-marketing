import React, { useMemo } from "react";

/**
 * Services Page (TaxCheck)
 * - Pixel-close layout: Top bar + hero + two service cards + CTA card
 * - RTL ready when AR is selected
 * - No external dependencies
 */

export default function ServicesPage() {
  const year = useMemo(() => new Date().getFullYear(), []);

  // Toggle these if you want to wire real i18n later
  const lang = "EN"; // "EN" | "AR"
  const isRTL = lang === "AR";

  const t = (en, ar) => (lang === "AR" ? ar : en);

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(1200px 600px at 20% 10%, rgba(46, 204, 113, 0.16), transparent 60%)," +
          "radial-gradient(1200px 600px at 85% 0%, rgba(46, 204, 113, 0.10), transparent 55%)," +
          "linear-gradient(180deg, #F7F9FA 0%, #EEF4F2 45%, #F7F9FA 100%)",
      }}
    >
      {/* Page-local styles for exact look */}
      <style>{`
        :root{
          --tc-navy:#1E2A38;
          --tc-text:#2C3E50;
          --tc-muted:#6B7A8C;
          --tc-green:#2ECC71;
          --tc-bg:#F7F9FA;
          --tc-card:#FFFFFF;
          --tc-border: rgba(30,42,56,.10);
          --tc-shadow: 0 14px 40px rgba(30,42,56,.10);
          --tc-shadow-soft: 0 10px 24px rgba(30,42,56,.08);
          --tc-radius: 18px;
        }
        *{box-sizing:border-box}
        a{color:inherit}
        .container{
          width: 100%;
          max-width: 1160px;
          margin: 0 auto;
          padding: 0 18px;
        }
        .topbar{
          height: 74px;
          display:flex;
          align-items:center;
          justify-content:space-between;
        }
        .brand{
          display:flex;
          align-items:center;
          gap:12px;
          min-width: 260px;
        }
        .brandMark{
          width:40px;height:40px;border-radius:12px;
          background: linear-gradient(135deg, rgba(30,42,56,1), rgba(30,42,56,.88));
          display:flex;align-items:center;justify-content:center;
          color:#fff;font-weight:800;
          box-shadow: 0 10px 20px rgba(30,42,56,.15);
          flex: 0 0 auto;
        }
        .brandText{
          display:flex;flex-direction:column;line-height:1.1;
        }
        .brandText strong{
          font-size: 15.5px;
          color: var(--tc-navy);
          letter-spacing:.2px;
        }
        .brandText span{
          font-size: 12px;
          color: var(--tc-muted);
        }
        .navActions{
          display:flex;align-items:center;gap:10px;
        }
        .btn{
          border: 1px solid var(--tc-border);
          background: rgba(255,255,255,.7);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 10px 14px;
          border-radius: 14px;
          font-weight: 600;
          color: var(--tc-navy);
          cursor:pointer;
          transition: transform .12s ease, box-shadow .12s ease, background .12s ease;
          box-shadow: 0 10px 20px rgba(30,42,56,.06);
        }
        .btn:hover{
          transform: translateY(-1px);
          box-shadow: 0 14px 26px rgba(30,42,56,.10);
          background: rgba(255,255,255,.9);
        }
        .btnPrimary{
          border-color: rgba(46,204,113,.22);
          background: linear-gradient(180deg, rgba(46,204,113,.16), rgba(46,204,113,.08));
        }
        .btnSolid{
          border: none;
          background: linear-gradient(180deg, #2ECC71, #24B864);
          color: #fff;
          box-shadow: 0 16px 30px rgba(46,204,113,.22);
        }
        .chip{
          width:44px;
          text-align:center;
          padding: 10px 0;
          border-radius: 14px;
          border: 1px solid var(--tc-border);
          background: rgba(255,255,255,.7);
          box-shadow: 0 10px 20px rgba(30,42,56,.06);
          font-weight:700;
          color: var(--tc-navy);
          cursor:pointer;
        }

        .heroShell{
          margin-top: 14px;
          border: 1px solid rgba(30,42,56,.08);
          border-radius: 22px;
          background: linear-gradient(180deg, rgba(255,255,255,.82), rgba(255,255,255,.58));
          box-shadow: var(--tc-shadow);
          padding: 26px 26px 22px;
        }
        .heroTitle{
          margin: 0;
          font-size: 34px;
          letter-spacing: -0.6px;
          color: var(--tc-navy);
        }
        .heroSubtitle{
          margin: 10px 0 0;
          color: var(--tc-muted);
          font-size: 14.5px;
          max-width: 820px;
        }

        .grid{
          margin-top: 18px;
          display:grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 980px){
          .grid{grid-template-columns: 1fr}
        }

        .card{
          border: 1px solid rgba(30,42,56,.08);
          border-radius: 18px;
          background: rgba(255,255,255,.72);
          box-shadow: var(--tc-shadow-soft);
          padding: 18px 18px 14px;
          position: relative;
          overflow:hidden;
        }
        .card::before{
          content:"";
          position:absolute; inset:-2px -2px auto -2px;
          height: 84px;
          background: radial-gradient(400px 120px at 20% 0%, rgba(46,204,113,.16), transparent 60%);
          pointer-events:none;
        }
        .card h3{
          margin:0 0 12px;
          color: var(--tc-navy);
          font-size: 15.5px;
          letter-spacing:.1px;
        }
        .list{
          margin:0; padding:0;
          list-style:none;
          display:flex; flex-direction:column;
          gap: 10px;
        }
        .item{
          display:flex; gap: 10px;
          align-items:flex-start;
          color: var(--tc-text);
        }
        .iconBox{
          width: 30px; height: 30px;
          border-radius: 10px;
          display:flex; align-items:center; justify-content:center;
          border: 1px solid rgba(30,42,56,.10);
          background: rgba(255,255,255,.75);
          flex: 0 0 auto;
        }
        .itemText{
          font-size: 13.5px;
          color: var(--tc-text);
          opacity: .92;
          line-height: 1.35;
          margin-top: 4px;
        }

        .ctaWrap{
          margin-top: 16px;
          display:flex;
          justify-content:center;
        }
        .cta{
          width: 100%;
          max-width: 560px;
          border-radius: 18px;
          border: 1px solid rgba(30,42,56,.08);
          background: rgba(255,255,255,.78);
          box-shadow: var(--tc-shadow-soft);
          padding: 16px 16px 14px;
          text-align:center;
        }
        .ctaTitle{
          margin:0;
          color: var(--tc-navy);
          font-weight: 800;
          font-size: 15px;
        }
        .ctaSub{
          margin: 6px 0 12px;
          color: var(--tc-muted);
          font-size: 13px;
        }
        .ctaRow{
          display:flex;
          justify-content:center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .contactLine{
          margin-top: 10px;
          font-size: 12.5px;
          color: var(--tc-muted);
        }
        .footer{
          padding: 18px 0 24px;
          color: rgba(44,62,80,.55);
          font-size: 12px;
          text-align:center;
        }

        /* Small sparkle on right like screenshot */
        .sparkle{
          position: fixed;
          right: 40px;
          bottom: 70px;
          width: 54px;
          height: 54px;
          opacity: .55;
          transform: rotate(10deg);
          filter: blur(.1px);
          pointer-events:none;
        }
        @media (max-width: 980px){
          .sparkle{display:none}
        }
      `}</style>

      {/* Top Bar */}
      <div className="container">
        <div className="topbar">
          <div className="brand">
            <div className="brandMark">T</div>
            <div className="brandText">
              <strong>TaxCheck</strong>
              <span>Corporate Tax &amp; VAT • UAE</span>
            </div>
          </div>

          <div className="navActions">
            <button className="btn btnPrimary" type="button">
              {t("Book a Consultation", "احجز استشارة")}
            </button>
            <button className="chip" type="button" aria-label="Language">
              AR
            </button>
            <button className="btn" type="button">
              {t("Login", "تسجيل الدخول")}
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="heroShell">
          <h1 className="heroTitle">
            {t(
              "Integrated Financial Services & FinTech Solutions",
              "خدمات مالية متكاملة وحلول تقنية مالية"
            )}
          </h1>
          <p className="heroSubtitle">
            {t(
              "Expert consulting and software designed to ensure tax compliance and optimize your business in the UAE",
              "استشارات وخدمات وبرمجيات لضمان الامتثال الضريبي وتحسين أعمالك في دولة الإمارات"
            )}
          </p>

          {/* Two Cards */}
          <div className="grid">
            <div className="card">
              <h3>{t("Financial Services", "الخدمات المالية")}</h3>
              <ul className="list">
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <DocIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Corporate Tax readiness, filing support and end-to-end guidance (UAE).",
                      "جاهزية ضريبة الشركات، دعم تقديم الإقرار، وإرشاد شامل (الإمارات)."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <DocIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Seamless VAT return preparation with ready summaries.",
                      "إعداد إقرار ضريبة القيمة المضافة بسلاسة مع ملخصات جاهزة."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <CalendarIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Automated compliance setup for SMEs & groups.",
                      "إعداد امتثال آلي للشركات الصغيرة والمتوسطة والمجموعات."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <LockIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Internal control checklists & validations to reduce errors.",
                      "قوائم تدقيق وضوابط داخلية مع تحققات لتقليل الأخطاء."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <ReportIcon />
                  </div>
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
              <h3>{t("FinTech & Financial Software Consulting", "استشارات تقنية مالية وبرمجيات")}</h3>
              <ul className="list">
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <GearIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Requirements for workflow design for accounting & tax applications.",
                      "تحليل المتطلبات وتصميم سير العمل لتطبيقات المحاسبة والضرائب."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <DatabaseIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Customized data modelling (entities, structure, periods).",
                      "نمذجة بيانات مخصصة (كيانات، هيكل، فترات)."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <CheckIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Intelligent controls design (deterministic gates) to reduce risk.",
                      "تصميم ضوابط ذكية (بوابات تحقق حتمية) لتقليل المخاطر."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <ChartIcon />
                  </div>
                  <div className="itemText">
                    {t(
                      "Dashboard/KPI design for compliance and finance operations.",
                      "تصميم لوحات معلومات ومؤشرات KPI للامتثال والعمليات المالية."
                    )}
                  </div>
                </li>
                <li className="item">
                  <div className="iconBox" aria-hidden="true">
                    <LinkIcon />
                  </div>
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

          {/* CTA */}
          <div className="ctaWrap">
            <div className="cta">
              <div className="ctaTitle">
                {t("Ready to simplify your finances?", "جاهز لتبسيط أمورك المالية؟")}
              </div>
              <div className="ctaSub">
                {t(
                  "Book your free consultation today and let our experts guide you.",
                  "احجز استشارة مجانية اليوم ودع خبراءنا يرشدونك."
                )}
              </div>

              <div className="ctaRow">
                <button className="btn btnSolid" type="button">
                  {t("Book a Call Now", "احجز مكالمة الآن")}
                </button>
              </div>

              <div className="contactLine">
                {t(
                  "Or contact us: info@TaxCheck.com  |  +97150552307",
                  "أو تواصل معنا: info@TaxCheck.com  |  +97150552307"
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="footer">© {year} TaxCheck. All rights reserved.</div>
      </div>

      {/* Decorative sparkle (bottom right) */}
      <svg className="sparkle" viewBox="0 0 64 64" aria-hidden="true">
        <path
          d="M32 6l4.2 17.3L54 28l-17.8 4.7L32 50l-4.2-17.3L10 28l17.8-4.7L32 6z"
          fill="rgba(46, 204, 113, 0.18)"
        />
        <path
          d="M52 42l2.3 9.5L64 54l-9.7 2.5L52 66l-2.3-9.5L40 54l9.7-2.5L52 42z"
          fill="rgba(30, 42, 56, 0.10)"
        />
      </svg>
    </div>
  );
}

/* Inline SVG icons (simple + crisp, similar to screenshot) */

function DocIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M14 3v4a2 2 0 0 0 2 2h4"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M8 12h8M8 16h8"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 3v3M17 3v3"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M5 7h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M3 11h18"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M6 11h12a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2z"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M12 15v3"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ReportIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 3h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M8 9h8M8 13h8M8 17h5"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GearIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 15.2a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M19.4 15a7.9 7.9 0 0 0 .1-2l2-1.2-2-3.4-2.3.8a8.3 8.3 0 0 0-1.7-1l-.3-2.4H10.8l-.3 2.4a8.3 8.3 0 0 0-1.7 1l-2.3-.8-2 3.4 2 1.2a7.9 7.9 0 0 0 .1 2l-2 1.2 2 3.4 2.3-.8c.5.4 1.1.7 1.7 1l.3 2.4h4.4l.3-2.4c.6-.3 1.2-.6 1.7-1l2.3.8 2-3.4-2-1.2z"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DatabaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <ellipse
        cx="12"
        cy="6"
        rx="7"
        ry="3"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
      />
      <path
        d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M20 6L9 17l-5-5"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 19V5"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M4 19h16"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8 17v-6M12 17V8M16 17v-4"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M10 13a5 5 0 0 1 0-7l1-1a5 5 0 0 1 7 7l-1 1"
        stroke="rgba(30,42,56,.70)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14 11a5 5 0 0 1 0 7l-1 1a5 5 0 0 1-7-7l1-1"
        stroke="rgba(30,42,56,.45)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
