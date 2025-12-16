// pages/index.js
import React, { useEffect, useMemo, useState } from "react";

export default function IndexPage() {
  const [lang, setLang] = useState("ar");
  const isAR = lang === "ar";

  const [modal, setModal] = useState({ open: false, title: "", img: "" });

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

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === "Escape") setModal({ open: false, title: "", img: "" });
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  const c = useMemo(() => {
    const en = {
      kicker: "Corporate Tax + VAT • UAE",
      h1: "TaxCheck: Smart Automation for Corporate Tax & VAT in the UAE",
      p: "Built for accountants and finance teams. Structured workflows, automated validations, and review-ready outputs aligned with UAE tax requirements.",
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
        { title: "Professional Outputs", desc: "Summaries, checklists, and review-ready reports." }
      ],
      screensTitle: "Product Screens",
      screens: [
        { title: "Comprehensive Dashboard", img: "/screens/screen-1.png" },
        { title: "Guided Tax Workflow", img: "/screens/screen-2.png" },
        { title: "Review-Ready Reports", img: "/screens/screen-3.png" }
      ],
      customersTitle: "Trusted by",
      customers: [
        { name: "New Vision Systems LLC", img: "/logos/nvs.png" },
        { name: "MTC DUBAI", img: "/logos/mtc.png" },
        { name: "EMPA Business Solutions", img: "/logos/empa.png" },
        { name: "Raseed LLC", img: "/logos/raseed.png" },
        { name: "LBMC Tax Consultant LLC", img: "/logos/lbmc.png" }
      ],
      footer: "© 2024 TaxCheck"
    };

    const ar = {
      kicker: "ضريبة الشركات + VAT • الإمارات",
      h1: "TaxCheck: أتمتة ذكية لضرائب الشركات وVAT في الإمارات",
      p: "مصمم للمحاسبين وفرق المالية. تدفقات عمل منظمة، مصادقات آلية، ومخرجات جاهزة للمراجعة بما يتوافق مع متطلبات الضرائب في الإمارات.",
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
        { title: "مخرجات احترافية", desc: "ملخصات وقوائم تحقق وتقارير جاهزة للمراجعة." }
      ],
      screensTitle: "شاشات المنتج",
      screens: [
        { title: "لوحة تحكم شاملة", img: "/screens/screen-1.png" },
        { title: "تدفق عمل موجّه", img: "/screens/screen-2.png" },
        { title: "تقارير جاهزة للمراجعة", img: "/screens/screen-3.png" }
      ],
      customersTitle: "موثوق به من قبل",
      customers: [
        { name: "New Vision Systems LLC", img: "/logos/nvs.png" },
        { name: "MTC DUBAI", img: "/logos/mtc.png" },
        { name: "EMPA Business Solutions", img: "/logos/empa.png" },
        { name: "Raseed LLC", img: "/logos/raseed.png" },
        { name: "LBMC Tax Consultant LLC", img: "/logos/lbmc.png" }
      ],
      footer: "© 2024 TaxCheck"
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  const openModal = (title, img) => setModal({ open: true, title, img });
  const closeModal = () => setModal({ open: false, title: "", img: "" });

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      {/* HERO */}
      <section className="tc-hero">
        <div className="tc-heroLeft">
          <div className="tc-heroKicker">{c.kicker}</div>
          <h1 className="tc-heroTitle">{c.h1}</h1>
          <p className="tc-heroSub">{c.p}</p>

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
          <div className="tc-heroScreenCard" role="button" tabIndex={0} onClick={() => openModal(c.screens[1].title, c.screens[1].img)}>
            <img src={c.screens[1].img} alt="Product preview" />
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
        <div className="tc-featureGrid">
          {c.features.map((f) => (
            <div className="tc-featureCard" key={f.title}>
              <div className="tc-featureHead">{f.title}</div>
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
            <button
              key={s.title}
              type="button"
              className="tc-screen"
              onClick={() => openModal(s.title, s.img)}
              aria-label={s.title}
            >
              <img src={s.img} alt={s.title} />
              <div className="tc-screenCap">{s.title}</div>
            </button>
          ))}
        </div>
      </section>

      {/* TRUSTED BY – BOTTOM / HORIZONTAL */}
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

      {/* MODAL */}
      {modal.open && (
        <div className="tc-modalOverlay" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="tc-modal" onClick={(e) => e.stopPropagation()}>
            <div className="tc-modalTop">
              <div className="tc-modalTitle">{modal.title}</div>
              <button className="tc-modalClose" type="button" onClick={closeModal}>
                Close
              </button>
            </div>
            <div className="tc-modalBody">
              <img src={modal.img} alt={modal.title} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
