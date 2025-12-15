import React, { useMemo, useState } from "react";

export default function AboutPage() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => getCopy(lang), [lang]);

  return (
    <div className="page" dir={t.dir}>
      <div className="container">
        <div className="topRow">
          <div>
            <h1 className="h1">{t.title}</h1>
            <p className="p">{t.sub}</p>
          </div>

          <button className="langBtn" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
            {lang === "en" ? "AR" : "EN"}
          </button>
        </div>

        <div className="grid">
          <div className="card">
            <div className="cardTitle">{t.whoTitle}</div>
            <div className="cardP">{t.whoP}</div>
          </div>

          <div className="card">
            <div className="cardTitle">{t.missionTitle}</div>
            <div className="cardP">{t.missionP}</div>
          </div>

          <div className="card">
            <div className="cardTitle">{t.valuesTitle}</div>
            <ul className="list">
              <li>{t.v1}</li>
              <li>{t.v2}</li>
              <li>{t.v3}</li>
              <li>{t.v4}</li>
            </ul>
          </div>

          <div className="card">
            <div className="cardTitle">{t.consultTitle}</div>
            <div className="cardP">{t.consultP}</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .page { padding: 48px 0 24px; }
        .container { max-width: 1152px; margin: 0 auto; padding: 0 24px; }
        .topRow { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }
        .h1 { margin: 0; font-size: 34px; letter-spacing: -0.03em; font-weight: 900; color: #0F172A; }
        .p { margin: 10px 0 0; font-size: 14px; line-height: 1.9; color: #475569; max-width: 75ch; }
        .langBtn {
          background: #fff; border: 1px solid #E5E7EB; color: #0F172A;
          border-radius: 12px; padding: 10px 12px; font-size: 13px; font-weight: 900; cursor: pointer;
        }
        .langBtn:hover { background: #F8FAFC; }

        .grid { margin-top: 18px; display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 900px) { .grid { grid-template-columns: 1fr 1fr; } }

        .card {
          border: 1px solid #E5E7EB; border-radius: 22px; background: rgba(255,255,255,0.9);
          padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .cardTitle { font-size: 14px; font-weight: 900; color: #0F172A; }
        .cardP { margin-top: 10px; font-size: 14px; line-height: 1.9; color: #475569; }
        .list { margin: 10px 0 0; padding-left: 18px; color: #475569; line-height: 1.9; font-size: 14px; }
        [dir="rtl"] .list { padding-left: 0; padding-right: 18px; }
      `}</style>
    </div>
  );
}

function getCopy(lang) {
  const en = {
    dir: "ltr",
    title: "About TaxCheck",
    sub: "TaxCheck is built to help accountants and SMEs in the UAE work faster with clear workflows, validations, and practical reporting outputs.",
    whoTitle: "Who we are",
    whoP: "Fintech Technologies FZ-LLC builds practical financial software focused on clarity, compliance, and real operational workflows.",
    missionTitle: "Our mission",
    missionP: "Make tax workflows predictable and audit-friendly—so accountants can focus on decisions, not formatting and rework.",
    valuesTitle: "Core values",
    v1: "Clarity over complexity",
    v2: "Compliance by design",
    v3: "Professional outputs",
    v4: "Fast daily usage for SMEs",
    consultTitle: "Financial & Technical Consulting",
    consultP: "We also provide consulting for finance software: workflow design, reporting structures, tax systems, and ERP integrations.",
  };

  const ar = {
    dir: "rtl",
    title: "نبذة عن TaxCheck",
    sub: "تم بناء TaxCheck لمساعدة المحاسبين والشركات الصغيرة في الإمارات على العمل بشكل أسرع عبر مسارات واضحة، تحققات، ومخرجات تقارير عملية.",
    whoTitle: "من نحن",
    whoP: "تطوّر Fintech Technologies FZ-LLC برمجيات مالية عملية تركّز على الوضوح والالتزام وسير العمل الحقيقي.",
    missionTitle: "رسالتنا",
    missionP: "جعل مسارات الضرائب قابلة للتنبؤ وسهلة التدقيق، ليُركز المحاسب على القرار وليس إعادة العمل والتنسيق.",
    valuesTitle: "قيمنا",
    v1: "الوضوح قبل التعقيد",
    v2: "الالتزام بالتصميم",
    v3: "مخرجات احترافية",
    v4: "استخدام يومي سريع للـ SMEs",
    consultTitle: "استشارات مالية وتقنية",
    consultP: "نقدم أيضًا استشارات للأنظمة المالية: تصميم سير العمل، بنية التقارير، الأنظمة الضريبية، وتكاملات ERP.",
  };

  return lang === "ar" ? ar : en;
}
