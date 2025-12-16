import React, { useEffect, useMemo, useState } from "react";

export default function AboutPage() {
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
      title: "About TaxCheck",
      sub: "TaxCheck helps accountants and businesses build compliant, review-ready corporate tax and VAT outputs.",
      blocks: [
        {
          h: "Built for Accountants",
          p: "Structured workflows, deterministic validations, and professional outputs designed for audit-level confidence.",
        },
        {
          h: "Designed for UAE Compliance",
          p: "Clear sections and checkpoints aligned with real-world filing requirements and best practices.",
        },
        {
          h: "Consulting Services",
          p: "We provide financial and technical consulting for accounting and tax software implementations.",
        },
      ],
    };

    const ar = {
      title: "من نحن",
      sub: "يساعد TaxCheck المحاسبين والشركات على إعداد مخرجات ضريبية دقيقة وجاهزة للمراجعة في ضريبة الشركات وVAT.",
      blocks: [
        {
          h: "مصمم للمحاسبين",
          p: "سير عمل موجّه، مصادقات حتمية، ومخرجات احترافية ترفع الثقة على مستوى المراجعة.",
        },
        {
          h: "متوافق مع متطلبات الإمارات",
          p: "أقسام واضحة ونقاط تفتيش تتماشى مع متطلبات الإيداع الفعلي وأفضل الممارسات.",
        },
        {
          h: "خدمات استشارية",
          p: "نقدم استشارات مالية وتقنية لتطبيقات الأنظمة المحاسبية والضريبية.",
        },
      ],
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <section className="tc-section">
        <h1 className="tc-pageTitle">{c.title}</h1>
        <p className="tc-pageSub">{c.sub}</p>

        <div className="tc-aboutGrid">
          {c.blocks.map((b) => (
            <div className="tc-aboutCard" key={b.h}>
              <div className="tc-aboutH">{b.h}</div>
              <div className="tc-aboutP">{b.p}</div>
            </div>
          ))}
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
        .tc-aboutGrid {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }
        .tc-aboutCard {
          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }
        .tc-aboutH {
          font-weight: 900;
          font-size: 16px;
          color: #0b1220;
          margin-bottom: 8px;
        }
        .tc-aboutP {
          color: #64748b;
          font-weight: 650;
          line-height: 1.7;
        }
        @media (max-width: 980px) {
          .tc-aboutGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
