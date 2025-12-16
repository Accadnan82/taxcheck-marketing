import React, { useEffect, useMemo, useState } from "react";

export default function IndexPage() {
  const [lang, setLang] = useState("ar");
  const isAR = lang === "ar";

  // Read language from PublicLayout + listen for changes
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
      quote:
        "A reliable service that makes tax management easy and professional.",
      quoteBy: "— CFO",

      featuresTitle: "Powerful Features",
      features: [
        {
          title: "Audit-Level Confidence & Accuracy",
          desc: "Professional-grade validations ensuring clarity and reliable, review-ready outputs.",
          icon: "✅",
        },
        {
          title: "Reduce Errors by up to 90%",
          desc: "Structured inputs and checkpoints that significantly reduce manual mistakes.",
          icon: "🛡️",
        },
        {
          title: "Easy VAT Return Preparation",
          desc: "Clean, section-based VAT workflows with practical summaries.",
          icon: "🧾",
        },
        {
          title: "Consistent Client & Period Management",
          desc: "Organize clients, periods, and filings consistently across teams.",
          icon: "📁",
        },
        {
          title: "Rules-Gated AI Intelligence",
          desc: "AI suggestions validated through deterministic compliance rules.",
          icon: "🤖",
        },
        {
          title: "Professional Outputs",
          desc: "Clear summaries, checklists, and reports designed for accountants.",
          icon: "📄",
        },
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
      quote:
        "خدمة موثوقة تجعل إدارة الضرائب أسهل وأكثر احترافية.",
      quoteBy: "— المدير المالي",

      featuresTitle: "ميزات قوية لإدارة الضرائب",
      features: [
        {
          title: "دقة وثقة على مستوى المراجعة",
          desc: "مصادقات احترافية تضمن الوضوح ومخرجات موثوقة قابلة للمراجعة.",
          icon: "✅",
        },
        {
          title: "خفض الأخطاء حتى 90%",
          desc: "مدخلات منظمة ونقاط تفتيش تقلل الأخطاء البشرية بشكل كبير.",
          icon: "🛡️",
        },
        {
          title: "سهولة إعداد إقرارات VAT",
          desc: "تدفق واضح مبني على أقسام مع ملخصات عملية.",
          icon: "🧾",
        },
        {
          title: "إدارة متناسقة للعملاء والفترات",
          desc: "تنظيم العملاء والفترات والإيداعات عبر الفرق والكيانات.",
          icon: "📁",
        },
        {
          title: "ذكاء اصطناعي مضبوط بقواعد",
          desc: "اقتراحات ذكية مدعومة ببوابات امتثال حتمية (Deterministic).",
          icon: "🤖",
        },
        {
          title: "مخرجات احترافية",
          desc: "تقارير وملخصات وقوائم تحقق جاهزة للمراجعة.",
          icon: "📄",
        },
      ],

      screensTitle: "شاشات المنتج",
      screens: [
        { title: "لوحة تحكم شاملة", img: "/screens/screen-1.png" },
        { title: "تدفق عمل ضريبي موجّه", img: "/screens/screen-2.png" },
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

  // Ensure page direction matches selected language
  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      {/* HERO */}
      <section className="tc-hero">
        <div className="tc-heroLeft">
          <div className="tc-heroKicker">{c.heroKicker}</div>
          <h1 className="tc-heroTitle">{c.heroH}</h1>
          <p className="tc-heroSub">{c.heroP}</p>

          <div className="tc-heroActions">
            {/* No Start Free Trial anywhere */}
            <a className="tc-btnPrimary" href="https://app.taxcheck.ae/request-demo">
              {c.cta1}
            </a>
            <a className="tc-btn" href="#screens">
              {c.cta2}
            </a>
          </div>
        </div>

        <div className="tc-heroRight">
          <div className="tc-heroArt">
            <div className="tc-heroArtInner">
              <div className="tc-checkCircle">✓</div>
              <div className="tc-artLines">
                <div className="tc-line" />
                <div className="tc-line" />
                <div className="tc-line" />
              </div>
            </div>
          </div>

          <div className="tc-quote">
            “{c.quote}”
            <span className="tc-quoteBy">{c.quoteBy}</span>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="tc-section">
        <h2 className="tc-sectionTitle">{c.featuresTitle}</h2>

        <div className="tc-featGrid3">
          {c.features.map((f) => (
            <div className="tc-featureCard" key={f.title}>
              <div className="tc-featureHead">
                <span className="tc-ico">{f.icon}</span>
                {f.title}
              </div>
              <div className="tc-featureText">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SCREENS */}
      <section className="tc-section" id="screens">
        <h2 className="tc-sectionTitle">{c.screensTitle}</h2>

        <div className="tc-screensGrid">
          {c.screens.map((s) => (
            <div className="tc-screen" key={s.title}>
              <img src={s.img} alt={s.title} />
              <div className="tc-screenCap">{s.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMERS AT BOTTOM */}
      <section className="tc-section">
        <h2 className="tc-sectionTitle">{c.customersTitle}</h2>

        <div className="tc-customersRow">
          {c.customers.map((cu) => (
            <div className="tc-customerLogo" key={cu.name} title={cu.name}>
              <img src={cu.img} alt={cu.name} />
            </div>
          ))}
        </div>

        <div className="tc-footerMini">{c.footer}</div>
      </section>

      {/* Page-scoped styling to match the agreed design */}
      <style jsx>{`
        .tc-hero {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 16px;
          align-items: center;
          padding: 18px 0 6px;
        }

        .tc-heroLeft {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(229, 231, 235, 0.9);
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
          font-weight: 900;
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

        .tc-heroArt {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(229, 231, 235, 0.9);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
          min-height: 220px;
          display: grid;
          place-items: center;
        }

        .tc-heroArtInner {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          background: linear-gradient(
            135deg,
            rgba(34, 197, 94, 0.12),
            rgba(26, 62, 110, 0.08)
          );
          position: relative;
          overflow: hidden;
          display: grid;
          place-items: center;
        }

        .tc-checkCircle {
          width: 74px;
          height: 74px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: rgba(34, 197, 94, 0.16);
          border: 1px solid rgba(34, 197, 94, 0.28);
          color: #16a34a;
          font-weight: 900;
          font-size: 34px;
          z-index: 2;
        }

        .tc-artLines {
          position: absolute;
          inset: 0;
          display: grid;
          place-items: center;
          gap: 10px;
          opacity: 0.9;
        }

        .tc-line {
          width: 70%;
          height: 10px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.06);
        }

        .tc-quote {
          background: rgba(255, 255, 255, 0.6);
          border: 1px solid rgba(229, 231, 235, 0.9);
          border-radius: 16px;
          padding: 14px 16px;
          color: #0b1220;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
          font-weight: 700;
          line-height: 1.6;
        }

        .tc-quoteBy {
          display: block;
          margin-top: 8px;
          color: #64748b;
          font-weight: 900;
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

        .tc-ico {
          display: inline-grid;
          place-items: center;
          width: 28px;
          height: 28px;
          border-radius: 10px;
          background: rgba(34, 197, 94, 0.12);
          margin-inline-end: 8px;
        }

        .tc-screenCap {
          padding: 10px 12px;
          font-weight: 900;
          font-size: 13px;
          color: #0b1220;
        }

        .tc-customersRow {
          width: 100%;
          max-width: 980px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          align-items: center;
        }

        .tc-customerLogo {
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(229, 231, 235, 0.9);
          border-radius: 14px;
          padding: 10px;
          height: 58px;
          display: grid;
          place-items: center;
          box-shadow: 0 10px 26px rgba(15, 23, 42, 0.06);
        }

        .tc-customerLogo img {
          max-height: 34px;
          object-fit: contain;
          filter: none !important;
        }

        .tc-footerMini {
          text-align: center;
          margin-top: 18px;
          color: #64748b;
          font-size: 13px;
          font-weight: 700;
        }

        @media (max-width: 980px) {
          .tc-hero {
            grid-template-columns: 1fr;
          }
          .tc-featGrid3 {
            grid-template-columns: 1fr;
          }
          .tc-customersRow {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
