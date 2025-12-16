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
      quote:
        "A reliable service that makes tax management easy and professional.",
      quoteBy: "Mohammed Al Rashini — CFO",

      featuresTitle: "Powerful Features",
      featuresSub:
        "Everything you need for accurate, review-ready corporate tax and VAT workflows.",
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
      screensSub:
        "A clean UI built for accountants—fast inputs, checkpoints, and outputs you can trust.",
      screens: [
        { title: "Comprehensive Dashboard", img: "/screens/screen-1.png" },
        { title: "Guided Tax Workflow", img: "/screens/screen-2.png" },
        { title: "Review-Ready Reports", img: "/screens/screen-3.png" },
      ],

      customersTitle: "Trusted by",
      customersSub: "Used by accountants and businesses across the UAE.",
      customers: [
        { name: "New Vision Systems LLC", img: "/logos/nvs.png" },
        { name: "MTC DUBAI", img: "/logos/mtc.png" },
        { name: "EMPA Business Solutions", img: "/logos/empa.png" },
        { name: "Raseed LLC", img: "/logos/raseed.png" },
        { name: "LBMC Tax Consultant LLC", img: "/logos/lbmc.png" },
      ],

      servicesTitle: "Services",
      servicesSub:
        "We also provide financial and technical consulting for accounting & tax systems.",
      contactTitle: "Contact",
      contactSub: "Request a demo or ask a compliance question.",

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
      quoteBy: "Mohammed Al Rashini — CFO",

      featuresTitle: "ميزات قوية لإدارة الضرائب",
      featuresSub:
        "كل ما تحتاجه لمخرجات دقيقة وجاهزة للمراجعة في ضريبة الشركات وVAT.",
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
      screensSub:
        "واجهة نظيفة للمحاسبين—إدخال سريع، نقاط تفتيش، ومخرجات موثوقة.",
      screens: [
        { title: "لوحة تحكم شاملة", img: "/screens/screen-1.png" },
        { title: "تدفق عمل ضريبي موجّه", img: "/screens/screen-2.png" },
        { title: "تقارير جاهزة للمراجعة", img: "/screens/screen-3.png" },
      ],

      customersTitle: "موثوق به من قبل",
      customersSub: "يُستخدم من قبل محاسبين وشركات داخل الإمارات.",
      customers: [
        { name: "New Vision Systems LLC", img: "/logos/nvs.png" },
        { name: "MTC DUBAI", img: "/logos/mtc.png" },
        { name: "EMPA Business Solutions", img: "/logos/empa.png" },
        { name: "Raseed LLC", img: "/logos/raseed.png" },
        { name: "LBMC Tax Consultant LLC", img: "/logos/lbmc.png" },
      ],

      servicesTitle: "الخدمات",
      servicesSub:
        "نقدم أيضاً استشارات مالية وتقنية للأنظمة المحاسبية والضريبية.",
      contactTitle: "تواصل معنا",
      contactSub: "اطلب عرضاً توضيحياً أو اسأل سؤال امتثال.",

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
          {/* Replace placeholder art with REAL product screen */}
          <div className="tc-heroScreenCard" aria-label="Product preview">
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
        <p className="tc-sectionSub">{c.featuresSub}</p>

        <div className="tc-featGrid3">
          {c.features.map((f) => (
            <div className="tc-featureCard tc-featureCardTall" key={f.title}>
              <div className="tc-featureHead">
                <span className="tc-ico">{f.icon}</span>
                <span className="tc-featureTitleClamp">{f.title}</span>
              </div>
              <div className="tc-featureText tc-featureTextClamp">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SCREENS */}
      <section className="tc-section" id="screens">
        <h2 className="tc-sectionTitle">{c.screensTitle}</h2>
        <p className="tc-sectionSub">{c.screensSub}</p>

        <div className="tc-screensGrid tc-screensBig">
          {c.screens.map((s) => (
            <div className="tc-screen" key={s.title}>
              <img src={s.img} alt={s.title} />
              <div className="tc-screenCap">{s.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES anchor for header link */}
      <section className="tc-section" id="services">
        <h2 className="tc-sectionTitle">{c.servicesTitle}</h2>
        <p className="tc-sectionSub">{c.servicesSub}</p>

        <div className="tc-serviceCard">
          <div className="tc-serviceLine">
            • {isAR ? "تقييم امتثال ضريبة الشركات وVAT" : "Corporate Tax & VAT compliance assessment"}
          </div>
          <div className="tc-serviceLine">
            • {isAR ? "مراجعة هيكل الحسابات وربطها بالمخرجات" : "Chart of accounts review mapped to outputs"}
          </div>
          <div className="tc-serviceLine">
            • {isAR ? "إعداد سياسات وعمليات محاسبية وضريبية" : "Accounting & tax policies and procedures"}
          </div>
        </div>
      </section>

      {/* CONTACT anchor for header link */}
      <section className="tc-section" id="contact">
        <h2 className="tc-sectionTitle">{c.contactTitle}</h2>
        <p className="tc-sectionSub">{c.contactSub}</p>

        <div className="tc-contactRow">
          <a className="tc-btnPrimary" href="https://app.taxcheck.ae/request-demo">
            {c.cta1}
          </a>
          <a className="tc-btn" href="mailto:info@taxcheck.ae">
            {isAR ? "راسلنا عبر البريد" : "Email us"}
          </a>
        </div>
      </section>

      {/* CUSTOMERS AT BOTTOM */}
      <section className="tc-section">
        <h2 className="tc-sectionTitle">{c.customersTitle}</h2>
        <p className="tc-sectionSub">{c.customersSub}</p>

        <div className="tc-customersRow tc-customersBig">
          {c.customers.map((cu) => (
            <div className="tc-customerLogo tc-customerLogoBig" key={cu.name} title={cu.name}>
              <img src={cu.img} alt={cu.name} />
            </div>
          ))}
        </div>

        <div className="tc-footerMini">{c.footer}</div>
      </section>

      {/* Scoped styles to polish UI (without touching globals.css) */}
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

        .tc-heroScreenCard {
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
          min-height: 220px;
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
          font-weight: 800;
        }

        .tc-quoteBy {
          margin-top: 8px;
          color: #64748b;
          font-weight: 900;
          font-size: 12px;
        }

        .tc-sectionSub {
          text-align: center;
          margin: -4px auto 14px;
          max-width: 820px;
          color: #64748b;
          font-size: 13px;
          font-weight: 650;
          line-height: 1.7;
        }

        /* Make feature cards consistent height */
        .tc-featureCardTall {
          min-height: 120px;
        }

        .tc-featureTitleClamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tc-featureTextClamp {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Bigger screens grid */
        .tc-screensBig .tc-screen img {
          height: 260px;
        }

        /* Services & Contact cards */
        .tc-serviceCard {
          max-width: 980px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.62);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 16px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }

        .tc-serviceLine {
          font-weight: 700;
          color: #0b1220;
          padding: 10px 8px;
          border-bottom: 1px dashed rgba(100, 116, 139, 0.25);
        }
        .tc-serviceLine:last-child {
          border-bottom: 0;
        }

        .tc-contactRow {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* Bigger customer logos */
        .tc-customersBig {
          grid-template-columns: repeat(5, 1fr);
        }

        .tc-customerLogoBig {
          height: 70px;
          padding: 12px;
        }

        .tc-customerLogoBig img {
          max-height: 44px;
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
          .tc-screensBig .tc-screen img {
            height: 280px;
          }
          .tc-customersBig {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}
