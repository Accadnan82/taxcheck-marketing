import React, { useEffect, useMemo, useState } from "react";

export default function PricingPage() {
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
      title: "Pricing",
      sub: "Simple plans for accountants and businesses. No “Free Trial” CTA on this page.",
      cards: [
        {
          name: "Accountant",
          price: "Contact us",
          desc: "For accounting firms managing multiple clients.",
          bullets: [
            "Multi-client workspace",
            "Guided workflows + validations",
            "Review-ready outputs",
            "Priority support",
          ],
          cta: "Request a Demo",
        },
        {
          name: "Business",
          price: "Contact us",
          desc: "For in-house finance teams and business owners.",
          bullets: [
            "Corporate Tax workflows",
            "VAT return preparation",
            "Client & period management",
            "Professional summaries",
          ],
          cta: "Request a Demo",
        },
      ],
      note: "Pricing is currently offered via demo-first onboarding.",
    };

    const ar = {
      title: "الأسعار",
      sub: "خطط بسيطة للمحاسبين والشركات. لا يوجد زر تجربة مجانية هنا.",
      cards: [
        {
          name: "مكاتب المحاسبة",
          price: "تواصل معنا",
          desc: "للمكاتب التي تدير عدة عملاء.",
          bullets: [
            "مساحة عمل متعددة العملاء",
            "سير عمل موجّه + مصادقات",
            "مخرجات جاهزة للمراجعة",
            "دعم أولوية",
          ],
          cta: "طلب عرض توضيحي",
        },
        {
          name: "الشركات",
          price: "تواصل معنا",
          desc: "لفرق المالية الداخلية وأصحاب الشركات.",
          bullets: [
            "سير عمل ضريبة الشركات",
            "إعداد إقرارات VAT",
            "إدارة العملاء والفترات",
            "ملخصات احترافية",
          ],
          cta: "طلب عرض توضيحي",
        },
      ],
      note: "حالياً نعتمد أسلوب البدء عبر عرض توضيحي قبل التسعير النهائي.",
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <section className="tc-section">
        <h1 className="tc-pageTitle">{c.title}</h1>
        <p className="tc-pageSub">{c.sub}</p>

        <div className="tc-priceGrid">
          {c.cards.map((p) => (
            <div className="tc-priceCard" key={p.name}>
              <div className="tc-priceName">{p.name}</div>
              <div className="tc-priceValue">{p.price}</div>
              <div className="tc-priceDesc">{p.desc}</div>

              <ul className="tc-bullets">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              <a className="tc-btnPrimary" href="https://app.taxcheck.ae/request-demo">
                {p.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="tc-note">{c.note}</div>
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
        .tc-priceGrid {
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 14px;
        }
        .tc-priceCard {
          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }
        .tc-priceName {
          font-weight: 900;
          font-size: 16px;
          color: #0b1220;
        }
        .tc-priceValue {
          margin-top: 8px;
          font-weight: 900;
          font-size: 26px;
          color: #0b1220;
        }
        .tc-priceDesc {
          margin-top: 8px;
          color: #64748b;
          font-weight: 650;
          line-height: 1.6;
        }
        .tc-bullets {
          margin: 14px 0;
          padding: 0;
          list-style: none;
          display: grid;
          gap: 8px;
          color: #0b1220;
          font-weight: 650;
        }
        .tc-bullets li::before {
          content: "✓";
          margin-inline-end: 10px;
          color: #16a34a;
          font-weight: 900;
        }
        .tc-note {
          text-align: center;
          margin-top: 16px;
          color: #64748b;
          font-weight: 650;
        }
        @media (max-width: 980px) {
          .tc-priceGrid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
