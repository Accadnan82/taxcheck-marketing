import React, { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("tc_lang") : null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("tc_lang", lang);
  }, [lang]);

  const copy = useMemo(() => getCopy(lang), [lang]);

  return (
    <div className="mkt" dir={copy.dir} lang={lang}>
      {/* HERO */}
      <section className="mkt-hero" id="home">
        <div className="mkt-container">
          <div className="mkt-heroGrid">
            <div className="mkt-heroText">
              <div className="mkt-badgeRow">
                <span className="mkt-badgeDot" aria-hidden="true" />
                <span className="mkt-badgeText">{copy.badge}</span>
              </div>

              <h1 className="mkt-h1">{copy.h1}</h1>
              <h2 className="mkt-h2">{copy.h2}</h2>

              <p className="mkt-heroP">{copy.heroP}</p>

              <div className="mkt-tags">
                {copy.tags.map((t) => (
                  <span className="mkt-tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>

              {/* NOTE: لا يوجد Start Free هنا (حسب طلبك) */}
              <div className="mkt-heroActions">
                <a className="mkt-btn mkt-btnPrimary" href="#screens">
                  {copy.viewScreens}
                </a>
                <a className="mkt-btn" href="#services">
                  {copy.servicesCta}
                </a>

                {/* زر اللغة داخل الصفحة (اختياري) */}
                <button
                  type="button"
                  className="mkt-btn mkt-btnLang"
                  onClick={() => setLang((v) => (v === "en" ? "ar" : "en"))}
                  aria-label="Switch language"
                >
                  {lang === "en" ? "AR" : "EN"}
                </button>
              </div>
            </div>

            <div className="mkt-heroCard">
              <div className="mkt-heroCardHeader">
                <div>
                  <div className="mkt-heroCardTitle">{copy.whyTitle}</div>
                  <div className="mkt-heroCardSub">{copy.whySub}</div>
                </div>
                <div className="mkt-pill">{copy.aiPill}</div>
              </div>

              <div className="mkt-heroCardList">
                {copy.whyItems.map((x) => (
                  <div className="mkt-heroCardItem" key={x.title}>
                    <div className="mkt-heroCardItemTitle">{x.title}</div>
                    <div className="mkt-heroCardItemDesc">{x.desc}</div>
                  </div>
                ))}

                <div className="mkt-heroCardItem">
                  <div className="mkt-heroCardItemTitle">{copy.useCasesTitle}</div>
                  <div className="mkt-chipRow">
                    {copy.useCaseChips.map((c) => (
                      <span className="mkt-chip" key={c}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* شريط خفيف لتحريك الانتباه (مثل flash) */}
          <div className="mkt-sheen" aria-hidden="true" />
        </div>
      </section>

      {/* USE CASES (BENTO) */}
      <section className="mkt-section mkt-sectionWhite" id="services">
        <div className="mkt-container">
          <div className="mkt-sectionHead">
            <h3 className="mkt-sectionTitle">{copy.bentoTitle}</h3>
            <p className="mkt-sectionSub">{copy.bentoSub}</p>
          </div>

          <div className="mkt-bento">
            <div className="mkt-bentoCard mkt-bentoCardFeatured">
              <div className="mkt-bentoIcon">📊</div>
              <div className="mkt-bentoTitle">{copy.bentoFeatured.title}</div>
              <div className="mkt-bentoDesc">{copy.bentoFeatured.desc}</div>
            </div>

            {copy.bentoCards.map((b) => (
              <div className="mkt-bentoCard" key={b.title}>
                <div className="mkt-bentoIcon">{b.icon}</div>
                <div className="mkt-bentoTitle">{b.title}</div>
                <div className="mkt-bentoDesc">{b.desc}</div>
              </div>
            ))}
          </div>

          {/* خدمات الاستشارات (حسب طلبك سابقاً) */}
          <div className="mkt-servicesGrid">
            {copy.services.map((s) => (
              <div className="mkt-serviceBox" key={s.title}>
                <div className="mkt-serviceTitle">{s.title}</div>
                <div className="mkt-serviceDesc">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mkt-section" id="about">
        <div className="mkt-container">
          <div className="mkt-sectionHead">
            <h3 className="mkt-sectionTitle">{copy.featuresTitle}</h3>
            <p className="mkt-sectionSub">{copy.featuresSub}</p>
          </div>

          <div className="mkt-features">
            {copy.features.map((f) => (
              <div className="mkt-featureBox" key={f.title}>
                <div className="mkt-featureTitle">
                  <span className="mkt-featureIcon">{f.icon}</span>
                  {f.title}
                </div>
                <div className="mkt-featureDesc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SCREENSHOTS */}
      <section className="mkt-section mkt-sectionWhite" id="screens">
        <div className="mkt-container">
          <div className="mkt-sectionHead">
            <h3 className="mkt-sectionTitle">{copy.screensTitle}</h3>
            <p className="mkt-sectionSub">{copy.screensSub}</p>
          </div>

          <div className="mkt-screens">
            <a className="mkt-screen" href="/screens/screen-dashboard.png" target="_blank" rel="noreferrer">
              <img src="/screens/screen-dashboard.png" alt="Dashboard" />
            </a>

            <a className="mkt-screen" href="/screens/screen-flow.png" target="_blank" rel="noreferrer">
              <img src="/screens/screen-flow.png" alt="Flow" />
            </a>

            <a className="mkt-screen" href="/screens/screen-report.png" target="_blank" rel="noreferrer">
              <img src="/screens/screen-report.png" alt="Report" />
            </a>
          </div>

          <div className="mkt-note">
            {copy.screensNote}
          </div>
        </div>
      </section>

      {/* لا يوجد Contact Section هنا نهائياً (حسب طلبك) */}
    </div>
  );
}

function getCopy(lang) {
  const en = {
    dir: "ltr",
    badge: "Corporate Tax + VAT • AI-assisted • Built for Accountants",
    h1: "Corporate Tax & VAT in the UAE",
    h2: "Clear workflows. Practical outputs.",
    heroP:
      "TaxCheck helps accountants and SMEs manage taxpayers, tax periods, and Corporate Tax / VAT filings through guided steps, validations, and professional reports.",
    tags: ["Guided workflows", "Accountant-grade outputs", "AI + deterministic rules", "Compliance-first"],
    viewScreens: "View Product Screens",
    servicesCta: "Consulting Services",

    whyTitle: "Why TaxCheck?",
    whySub: "Accountant-grade experience with clarity, validations, and reliable outputs.",
    aiPill: "AI + Rules",
    whyItems: [
      { title: "Corporate Tax workflow", desc: "Structured inputs and checkpoints to reduce errors." },
      { title: "VAT return preparation", desc: "Clean, section-based flow with practical summaries." },
      { title: "Taxpayer & period management", desc: "Organize clients, periods, and filings consistently." },
      { title: "AI + rules", desc: "Suggestions supported by deterministic validation gates." },
    ],
    useCasesTitle: "Typical use cases",
    useCaseChips: ["VAT returns", "CT periods", "Accounting firms", "Pre-submission checks"],

    bentoTitle: "Typical use cases",
    bentoSub: "A structured system designed for real tax work and predictable outcomes.",
    bentoFeatured: {
      title: "VAT returns",
      desc: "Prepare and review VAT returns with validation gates and export-ready summaries.",
    },
    bentoCards: [
      { icon: "🏢", title: "Corporate Tax periods", desc: "Manage CT periods, taxpayer data, and filing readiness." },
      { icon: "💼", title: "Accounting firms", desc: "Operate across multiple clients with consistent workflows." },
      { icon: "✅", title: "Pre-submission checks", desc: "Catch common issues before submission using checkpoints." },
    ],

    services: [
      { title: "Financial consulting", desc: "Workflow design, reporting structures, and accounting advisory." },
      { title: "Technical consulting", desc: "Tax systems, finance software architecture, and ERP integrations." },
      { title: "Bookkeeping services", desc: "Monthly bookkeeping support aligned with reporting needs." },
      { title: "Tax consulting", desc: "Practical VAT and Corporate Tax guidance for SME operations." },
    ],

    featuresTitle: "Powerful features for tax work",
    featuresSub: "Everything you need to deliver clean, client-ready results.",
    features: [
      { icon: "🎯", title: "Guided workflow", desc: "Step-by-step flows with validations and checkpoints." },
      { icon: "📊", title: "Professional outputs", desc: "Practical summaries and export-ready structures." },
      { icon: "✅", title: "Validation gates", desc: "Built-in checks to reduce errors and improve compliance." },
      { icon: "🤖", title: "AI-supported (rules-first)", desc: "Helpful suggestions backed by deterministic rules." },
    ],

    screensTitle: "Product screenshots",
    screensSub: "A quick preview of the interface and workflows.",
    screensNote:
      "Tip: Upload your 3 images into /public/screens/ with these names: screen-dashboard.png, screen-flow.png, screen-report.png",
  };

  const ar = {
    dir: "rtl",
    badge: "الضريبة على الشركات + ضريبة القيمة المضافة • مدعوم بالذكاء الاصطناعي • للمحاسبين",
    h1: "الضريبة على الشركات وضريبة القيمة المضافة في الإمارات",
    h2: "سير عمل واضح. نتائج عملية.",
    heroP:
      "يساعد TaxCheck المحاسبين والشركات الصغيرة والمتوسطة على إدارة دافعي الضرائب والفترات الضريبية وتقديم الإقرارات عبر خطوات موجهة وتحققات وتقارير احترافية.",
    tags: ["سير عمل موجّه", "مخرجات بمستوى المحاسبين", "ذكاء + قواعد حتمية", "تركيز على الامتثال"],
    viewScreens: "عرض لقطات المنتج",
    servicesCta: "خدمات الاستشارات",

    whyTitle: "لماذا TaxCheck؟",
    whySub: "تجربة واضحة للمحاسب مع تحققات ومخرجات موثوقة.",
    aiPill: "AI + قواعد",
    whyItems: [
      { title: "سير عمل الضريبة على الشركات", desc: "مدخلات منظمة ونقاط تحقق لتقليل الأخطاء." },
      { title: "إعداد إقرار ضريبة القيمة المضافة", desc: "تدفق قائم على الأقسام مع ملخصات عملية." },
      { title: "إدارة دافعي الضرائب والفترات", desc: "تنظيم العملاء والفترات والإقرارات باستمرار." },
      { title: "ذكاء + قواعد", desc: "اقتراحات مدعومة ببوابات تحقق حتمية." },
    ],
    useCasesTitle: "حالات الاستخدام",
    useCaseChips: ["إقرارات VAT", "فترات CT", "مكاتب محاسبة", "فحص قبل التقديم"],

    bentoTitle: "حالات الاستخدام النموذجية",
    bentoSub: "نظام منظم للعمل الضريبي الحقيقي بنتائج يمكن الاعتماد عليها.",
    bentoFeatured: {
      title: "إقرارات ضريبة القيمة المضافة",
      desc: "إعداد ومراجعة الإقرارات مع تحققات وملخصات جاهزة للتصدير.",
    },
    bentoCards: [
      { icon: "🏢", title: "فترات الضريبة على الشركات", desc: "إدارة الفترات وبيانات المكلف وجاهزية التقديم." },
      { icon: "💼", title: "المكاتب المحاسبية", desc: "العمل على عدة عملاء بسير عمل موحد." },
      { icon: "✅", title: "فحص قبل التقديم", desc: "التقاط الأخطاء الشائعة قبل رفع الإقرار." },
    ],

    services: [
      { title: "الاستشارات المالية", desc: "تصميم سير العمل، هياكل التقارير، واستشارات محاسبية." },
      { title: "الاستشارات التقنية", desc: "أنظمة الضرائب، بنية البرامج المالية، وربط ERP." },
      { title: "مسك الدفاتر", desc: "دعم شهري لمسكة الدفاتر متوافق مع احتياج التقارير." },
      { title: "الاستشارات الضريبية", desc: "إرشاد عملي لضريبة القيمة المضافة والضريبة على الشركات." },
    ],

    featuresTitle: "مميزات قوية للعمل الضريبي",
    featuresSub: "كل ما تحتاجه لإخراج نتائج منظمة وجاهزة للعميل.",
    features: [
      { icon: "🎯", title: "سير عمل موجّه", desc: "خطوات واضحة مع تحققات ونقاط تفتيش." },
      { icon: "📊", title: "مخرجات احترافية", desc: "ملخصات عملية وهياكل جاهزة للتصدير." },
      { icon: "✅", title: "تدقيقات مدمجة", desc: "تحققات تقلل الأخطاء وترفع الامتثال." },
      { icon: "🤖", title: "ذكاء مدعوم بالقواعد", desc: "اقتراحات مفيدة مبنية على قواعد حتمية." },
    ],

    screensTitle: "لقطات من المنتج",
    screensSub: "نظرة سريعة على الواجهة وسير العمل.",
    screensNote:
      "ملاحظة: ارفع 3 صور داخل /public/screens/ بالأسماء: screen-dashboard.png, screen-flow.png, screen-report.png",
  };

  return lang === "ar" ? ar : en;
}
