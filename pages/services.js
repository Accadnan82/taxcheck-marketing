import React, { useEffect, useMemo, useState } from "react";

export default function ServicesPage() {
  const [lang, setLang] = useState("ar");
  const isAR = lang === "ar";

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" && localStorage.getItem("tc_lang")) || "ar";
    setLang(saved);

    const onLang = (e) => {
      const next = e?.detail?.lang;
      if (next === "ar" || next === "en") setLang(next);
    };
    window.addEventListener("tc-lang-change", onLang);
    return () => window.removeEventListener("tc-lang-change", onLang);
  }, []);

  const c = useMemo(() => {
    const en = {
      title: "Financial Services",
      items: [
        "Corporate Tax readiness assessment and filing preparation",
        "VAT return review and preparation (UAE)",
        "Tax period closing checklist and review-ready summaries",
        "Revenue classification and tax mapping (accounts-to-tax outputs)",
        "Policy documentation (tax & accounting procedures)",
        "Internal controls review for finance processes",
        "Financial reporting review (management summaries and KPI packs)",
        "Data cleanup and reconciliation support (TB / GL review)",
        "Branch / entity structure review (multi-branch consistency)",
        "Training for accountants and finance teams",
      ],
    };

    const ar = {
      title: "الخدمات المالية",
      items: [
        "تقييم جاهزية ضريبة الشركات والتحضير للإيداع",
        "مراجعة وتجهيز إقرار VAT (الإمارات)",
        "قوائم تحقق لإقفال الفترات وملخصات جاهزة للمراجعة",
        "تصنيف الإيرادات وربط الحسابات بالمخرجات الضريبية",
        "توثيق السياسات والإجراءات (محاسبية وضريبية)",
        "مراجعة الضوابط الداخلية لعمليات المالية",
        "مراجعة التقارير المالية (ملخصات إدارية وحزم KPI)",
        "تنظيف البيانات ودعم المطابقات (TB / GL)",
        "مراجعة هيكل الفروع/الكيانات لضمان الاتساق",
        "تدريب للمحاسبين وفرق المالية",
      ],
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <section className="tc-section">
        <h1 className="tc-pageTitle">{c.title}</h1>

        <div className="tc-listCard">
          <ul className="tc-list">
            {c.items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </section>

      <style jsx>{`
        .tc-pageTitle {
          text-align: center;
          font-size: 34px;
          margin: 10px 0 16px;
          color: #0b1220;
        }

        .tc-listCard {
          max-width: 980px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }

        .tc-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 10px;
          color: #0b1220;
          line-height: 1.7;
        }

        .tc-list li {
          padding: 10px 10px;
          border-bottom: 1px dashed rgba(100, 116, 139, 0.25);
        }

        .tc-list li:last-child {
          border-bottom: 0;
        }

        .tc-list li::before {
          content: "•";
          margin-inline-end: 10px;
          color: #16a34a;
        }
      `}</style>
    </div>
  );
}
