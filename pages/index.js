import React, { useEffect, useMemo, useState } from "react";

export default function IndexPage() {
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
      heroKicker: "Corporate Tax + VAT • UAE",
      heroH: "TaxCheck: Smart Automation for Corporate Tax & VAT in the UAE",
      heroP:
        "Built for accountants and finance teams. Structured workflows, automated validations, and review-ready outputs aligned with UAE tax requirements.",
      cta1: "Request a Demo",
      cta2: "View Product Screens",
      quote: "A reliable service that makes tax management easy and professional.",
      quoteBy: "— CFO",
      featuresTitle: "Powerful Features",
      features: [
        { title: "Audit-Level Confidence & Accuracy", desc: "Professional validations for reliable outputs." },
        { title: "Reduce Errors by up to 90%", desc: "Structured inputs and checkpoints reduce mistakes." },
        { title: "Easy VAT Return Preparation", desc: "Section-based VAT flow with practical summaries." },
        { title: "Client & Period Management", desc: "Organize clients, periods, and filings across teams." },
        { title: "Rules-Gated AI Intelligence", desc: "AI suggestions validated by deterministic rules." },
        { title: "Professional Outputs", desc: "Summaries, checklists, and review-ready reports." },
      ],
      screensTitle: "Product Screens",
      screens: [
        { title: "Comprehensive Dashboard", img: "/screens/screen-1.png" },
        { title: "Guided Tax Workflow", img: "/screens/screen-2.png" },
        { title: "Review-Ready Reports", img: "/screens/screen-3.png" },
      ],
      customersTitle: "Trusted by",
      customers: [
        { name: "New Vision Systems LLC", img: "/logos/nvs.png" },
        { name: "MTC DUBAI", img: "/logos/mtc.png" },
        { name: "EMPA Business Solutions", img: "/logos/empa.png" },
        { name: "Raseed LLC", img: "/logos/raseed.png" },
        { name: "LBMC Tax Consultant LLC", img: "/logos/lbmc.png" },
      ],
      footer: "© 2024 TaxCheck",
    };

    const ar = {
      heroKicker: "ضريبة الشركات + VAT • الإمارات",
      heroH: "TaxCheck: أتمتة ذكية لضرائب الشركات وVAT في الإمارات",
      heroP:
        "مصمم للمحاسبين وفرق المالية. تدفقات عمل منظمة، مصادقات آلية، ومخرجات جاهزة للمراجعة بما يتوافق مع متطلبات الضرائب في الإمارات.",
      cta1: "طلب عرض توضيحي",
      cta2: "شاشات المنتج",
      quote: "خدمة موثوقة تجعل إدارة الضرائب أسهل وأكثر احترافية.",
      quoteBy: "— المدير المالي",
      featuresTitle: "ميزات قوية",
      features: [
        { title: "ثقة على مستوى المراجعة", desc: "مصادقات احترافية لمخرجات موثوقة." },
        { title: "تقليل الأخطاء حتى 90%", desc: "مدخلات منظمة ونقاط تفتيش تقلل الأخطاء." },
        { title: "سهولة إعداد إقرارات VAT", desc: "تدفق واضح مبني على أقسام مع ملخصات." },
        { title: "إدارة العملاء والفترات", desc: "تنظيم العملاء والفترات والإيداعات عبر الفرق." },
        { title: "ذكاء مضبوط بقواعد", desc: "اقتراحات مدعومة ببوابات امتثال حتمية." },
        { title: "مخرجات احترافية", desc: "ملخصات وقوائم تحقق وتقارير جاهزة للمراجعة." },
      ],
      screensTitle: "شاشات المنتج",
      screens: [
        { title: "لوحة تحكم شاملة", img: "/screens/screen-1.png" },
        { title: "تدفق عمل موجّه", img: "/screens/screen-2.png" },
        { title: "تقارير جاهزة للمراجعة", img: "/screens/screen-3.png" },
      ],
      customersTitle: "موثوق به من قبل",
      customers: [
        { name: "New Vision Systems LLC", img: "/logos/nvs.png" },
        { name: "MTC DUBAI", img: "/logos/mtc.png" },
        { name: "EMPA Business Solutions", img: "/logos/empa.png" },
        { name: "Raseed LLC", img: "/logos/raseed.png" },
        { name: "LBMC Tax Consultant LLC", img: "/logos/lbmc.png" },
      ],
      footer: "© 2024 TaxCheck",
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      {/* HERO */}
      <section className="tc-hero">
        <div className="tc-heroLeft">
          <div className="tc-heroKicker">{c.heroKicker}</div>
          <h1 className="tc-heroTitle">{c.heroH}</h1>
          <p className="tc-heroSub">{c.heroP}</p>

          <div className="tc-heroActions">
            <a className="tc-btnPrimary" href="https://app.taxcheck.ae/request-demo">
              {c.cta1}
            </a>
            <a className="tc-btn" href="#screens">
              {c.cta2}
            </a>
          </div>
        </div>

        <div className="tc-heroRight">
          <div className="tc-heroScreenCard">
            <img src="/screens/screen-2.png" alt="Product preview" />
          </div>

          <div className="tc-quote">
            <div className="tc-quoteText">“{c.quote}”</div>
            <div className="tc-quoteBy">{c.quoteBy}</div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="tc-section">
        <h2 className="tc-sectionTitle">{c.featuresTitle}</h2>

        <div className="tc-featGrid3">
          {c.features.map((f) => (
            <div className="tc-featureCard tc-featureCardTall" key={f.title}>
              <div className="tc-featureHead">{f.title}</div>
              <div className="tc-featureText">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SCREENS */}
      <section className="tc-section" id="screens">
        <h2 className="tc-sectionTitle">{c.screensTitle}</h2>

        <div className="tc-screensGrid tc-screensBig">
          {c.screens.map((s) => (
            <div className="tc-screen" key={s.title}>
              <img src={s.img} alt={s.title} />
              <div className="tc-screenCap">{s.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* LOGOS (FIXED: ALWAYS HORIZONTAL) */}
      <section className="tc-section">
        <h2 className="tc-sectionTitle">{c.customersTitle}</h2>

        <div className="tc-logosRow">
          {c.customers.map((cu) => (
            <div className="tc-logoPill" key={cu.name} title={cu.name}>
              <img src={cu.img} alt={cu.name} />
            </div>
          ))}
        </div>

        <div className="tc-footerMini">{c.footer}</div>
      </section>

      <style jsx>{`
        .tc-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 16px;
          align-items: start;
          padding: 18px 0 6px;
        }

        .tc-heroLeft {
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 22px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }

        .tc-heroKicker {
          display: inline-flex;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(26, 62, 110, 0.08);
          color: #0b1220;
          font-size: 12px;
          margin-bottom: 12px;
        }

        .tc-heroTitle {
          margin: 0;
          font-size: 40px;
          line-height: 1.1;
          letter-spacing: -0.6px;
          color: #0b1220;
        }

        .tc-heroSub {
          margin: 12px 0 16px;
          color: #475569;
          line-height: 1.7;
          font-size: 14px;
        }

        .tc-heroActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .tc-heroRight {
          display: grid;
          gap: 12px;
        }

        .tc-heroScreenCard {
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }

        .tc-heroScreenCard img {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          filter: none !important;
        }

        .tc-quote {
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 14px 16px;
          color: #0b1220;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
          line-height: 1.55;
        }

        .tc-quoteText {
          color: #0b1220;
        }

        .tc-quoteBy {
          margin-top: 8px;
          color: #64748b;
          font-size: 12px;
        }

        .tc-featGrid3 {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .tc-featureCardTall {
          min-height: 110px;
        }

        .tc-featureHead {
          font-size: 14px;
          color: #0b1220;
          margin-bottom: 6px;
        }

        .tc-featureText {
          font-size: 12px;
          color: #64748b;
          line-height: 1.7;
        }

        .tc-screensBig .tc-screen img {
          height: 260px;
        }

        /* LOGOS FIX: horizontal always */
        .tc-logosRow {
          max-width: 980px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: center;
          align-items: center;
        }

        .tc-logoPill {
          height: 64px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 14px;
          box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
          flex: 0 0 auto;
        }

        .tc-logoPill img {
          max-height: 42px;
          max-width: 160px;
          object-fit: contain;
          filter: none !important;
        }

        .tc-footerMini {
          text-align: center;
          margin-top: 18px;
          color: #64748b;
          font-size: 13px;
        }

        @media (max-width: 980px) {
          .tc-hero {
            grid-template-columns: 1fr;
          }
          .tc-featGrid3 {
            grid-template-columns: 1fr;
          }
          .tc-screensBig .tc-screen img {
            height: 280px;
          }
          .tc-logoPill img {
            max-width: 140px;
          }
        }
      `}</style>
    </div>
  );
}
