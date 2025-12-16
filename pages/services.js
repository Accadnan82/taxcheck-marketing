// pages/services.js
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
      title: "Services",
      sub: "Financial services and specialized consulting for accounting and FinTech software.",
      blocks: [
        {
          h: "Financial Services",
          items: [
            "Corporate Tax readiness assessment and filing support (UAE).",
            "VAT return preparation and review-ready summaries.",
            "Tax period and compliance calendar setup for SMEs and groups.",
            "Internal controls and validation checklists for finance teams.",
            "Review of tax outputs and management reports for decision makers."
          ]
        },
        {
          h: "FinTech & Financial Software Consulting",
          items: [
            "Requirements and workflow design for accounting & tax applications.",
            "Data model design (IFRS-aligned structure, periods, clients, branches).",
            "Validation rules design (deterministic gates) to reduce human errors.",
            "Dashboard/KPI design for compliance and finance operations.",
            "Implementation advisory: integrations, exports, and reporting outputs."
          ]
        }
      ],
      contact: "Need a consultation? Contact us at info@TaxCheck.com or +971505523307."
    };

    const ar = {
      title: "الخدمات",
      sub: "خدمات مالية واستشارات متخصصة للبرامج المحاسبية والـ FinTech.",
      blocks: [
        {
          h: "الخدمات المالية",
          items: [
            "تقييم الجاهزية لضريبة الشركات ودعم الإيداع (الإمارات).",
            "إعداد إقرارات VAT ومخرجات جاهزة للمراجعة.",
            "إعداد تقويم امتثال للفترات والمواعيد للشركات والمجموعات.",
            "قوائم تحقق ومصادقات داخلية لفرق المالية.",
            "مراجعة المخرجات والتقارير الإدارية لدعم القرار."
          ]
        },
        {
          h: "استشارات برمجة مالية و FinTech",
          items: [
            "تصميم المتطلبات وتدفقات العمل لتطبيقات المحاسبة والضرائب.",
            "تصميم نماذج البيانات (هيكل متوافق مع IFRS والفترات والعملاء والفروع).",
            "تصميم قواعد المصادقة (Deterministic Gates) لتقليل الأخطاء البشرية.",
            "تصميم لوحات تحكم ومؤشرات KPI للامتثال والعمليات المالية.",
            "استشارات التنفيذ: التكاملات، التصدير، والمخرجات التقاريرّية."
          ]
        }
      ],
      contact: "للاستشارة: info@TaxCheck.com أو +971505523307."
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <section className="tc-pageHeader">
        <h1 className="tc-h1">{c.title}</h1>
        <p className="tc-sub">{c.sub}</p>
      </section>

      <section className="tc-section">
        <div className="tc-twoCol">
          {c.blocks.map((b) => (
            <div className="tc-card" key={b.h}>
              <h2 className="tc-h2">{b.h}</h2>
              <ul className="tc-list">
                {b.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="tc-section">
        <div className="tc-card">
          <p className="tc-sub">{c.contact}</p>
        </div>
      </section>
    </div>
  );
}
