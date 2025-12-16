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
      sub: "Financial and technical consulting for accounting and tax systems.",
      items: [
        { h: "Tax workflow design", p: "Workflow mapping, checkpoints, and validations." },
        { h: "Data & reporting", p: "Review-ready outputs, summaries, and checklists." },
        { h: "Implementation support", p: "Setup, onboarding, and best practices." },
      ],
      cta: "Request a Demo",
    };
    const ar = {
      title: "الخدمات",
      sub: "استشارات مالية وتقنية للأنظمة المحاسبية والضريبية.",
      items: [
        { h: "تصميم سير العمل الضريبي", p: "خرائط تدفق، نقاط تفتيش، ومصادقات." },
        { h: "البيانات والتقارير", p: "مخرجات جاهزة للمراجعة، ملخصات، وقوائم تحقق." },
        { h: "دعم التطبيق", p: "إعداد، تدريب، وأفضل الممارسات." },
      ],
      cta: "طلب عرض توضيحي",
    };
    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <section className="tc-section">
        <h1 className="tc-pageTitle">{c.title}</h1>
        <p className="tc-pageSub">{c.sub}</p>

        <div className="tc-svcGrid">
          {c.items.map((x) => (
            <div className="tc-svcCard" key={x.h}>
              <div className="tc-svcH">{x.h}</div>
              <div className="tc-svcP">{x.p}</div>
            </div>
          ))}
        </div>

        <div className="tc-centerCta">
          <a className="tc-btnPrimary" href="https://app.taxcheck.ae/request-demo">
            {c.cta}
          </a>
        </div>
      </section>

      <style jsx>{`
        .tc-pageTitle {
          text-align: center;
          font-size: 34px;
          margin: 10px 0 6px;
          color: #0b1220;
          font-weight: 900;
        }
        .tc-pageSub {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 18px;
          color: #64748b;
          font-weight: 650;
          line-height: 1.7;
        }
        .tc-svcGrid {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .tc-svcCard {
          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }
        .tc-svcH {
          font-weight: 900;
          font-size: 16px;
          color: #0b1220;
          margin-bottom: 8px;
        }
        .tc-svcP {
          color: #64748b;
          font-weight: 650;
          line-height: 1.7;
        }
        .tc-centerCta {
          display: flex;
          justify-content: center;
          margin-top: 16px;
        }
        @media (max-width: 980px) {
          .tc-svcGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
