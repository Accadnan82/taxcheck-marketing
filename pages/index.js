// pages/index.js
import React, { useEffect, useMemo, useState } from "react";

function getCopy(lang) {
  const ar = {
    dir: "rtl",
    badge: "ضريبة الشركات + VAT • مدعوم بالذكاء الاصطناعي • للمحاسبين",
    h1a: "ضريبة الشركات و VAT في الإمارات",
    h1b: "سير عمل واضح. مخرجات عملية.",
    heroP:
      "يساعد TaxCheck المحاسبين والشركات الصغيرة والمتوسطة على إدارة دافعي الضرائب والفترات الضريبية وتجهيز ملفات ضريبة الشركات و VAT عبر خطوات موجهة وتحققات وتقارير احترافية.",
    ctaScreens: "عرض واجهات المنتج",
    ctaServices: "الخدمات",

    useCasesTitle: "حالات الاستخدام النموذجية",
    ucBannerTitle: "الإيرادات تحت ضريبة الشركات",
    ucBannerDesc: "تنظيم الإيرادات، تصنيفها، والتحقق منها قبل تقديم الإقرار.",
    ucFirmsTitle: "شركات محاسبية",
    ucFirmsDesc: "إدارة عدة عملاء مع سير عمل موحد وتقارير جاهزة.",
    ucBranchesTitle: "فروع شركة في الإمارات",
    ucBranchesDesc: "تقسيم الفترات والملفات حسب الفرع والعميل.",
    ucTeamsTitle: "مجموعات عمل متعددة",
    ucTeamsDesc: "تنظيم الفرق والمهام والتحقق قبل الإرسال.",

    featuresTitle: "مميزات قوية لإدارة الضرائب",
    fWorkflowTitle: "سير عمل موجّه",
    fWorkflowDesc: "خطوات واضحة مع تحققات ونقاط تدقيق قبل الوصول للمخرجات.",
    fOutputsTitle: "مخرجات احترافية",
    fOutputsDesc: "ملخصات وقوائم تدقيق وتقارير جاهزة للمراجعة والمشاركة.",
    fValidationTitle: "تحققات تلقائية",
    fValidationDesc: "تقليل الأخطاء عبر قواعد تحقق حتمية قبل اعتماد النتائج.",
    fAiTitle: "مدعوم بالذكاء الاصطناعي",
    fAiDesc: "اقتراحات ذكية مبنية على قواعد واضحة ومخرجات قابلة للتدقيق.",

    screensTitle: "عاين واجهات TaxCheck",
    screensSubtitle: "نظرة على واجهات التطبيق وسير العمل",

    footerLeft: "© " + new Date().getFullYear() + " TaxCheck",
    footerPricing: "الأسعار",
    footerAbout: "من نحن",
    footerServices: "الخدمات",
  };

  const en = {
    dir: "ltr",
    badge: "Corporate Tax + VAT • AI-assisted • Built for Accountants",
    h1a: "Corporate Tax & VAT in the UAE",
    h1b: "Clear workflows. Practical outputs.",
    heroP:
      "TaxCheck helps accountants and SMEs manage taxpayers, periods, and Corporate Tax / VAT workflows through guided steps, validations, and professional outputs.",
    ctaScreens: "View Product Screens",
    ctaServices: "Services",

    useCasesTitle: "Typical Use Cases",
    ucBannerTitle: "Corporate Tax Revenue",
    ucBannerDesc: "Organize, classify, and validate revenue before filing.",
    ucFirmsTitle: "Accounting Firms",
    ucFirmsDesc: "Manage multiple clients with unified workflows and reports.",
    ucBranchesTitle: "UAE Company Branches",
    ucBranchesDesc: "Split periods and filings by branch and client.",
    ucTeamsTitle: "Multiple Work Teams",
    ucTeamsDesc: "Organize teams, tasks, and pre-submission checks.",

    featuresTitle: "Powerful Tax Management Features",
    fWorkflowTitle: "Guided Workflows",
    fWorkflowDesc: "Clear steps with validations before reaching outputs.",
    fOutputsTitle: "Professional Outputs",
    fOutputsDesc: "Summaries, checklists, and review-ready reports.",
    fValidationTitle: "Automatic Validations",
    fValidationDesc: "Reduce errors through deterministic validation rules.",
    fAiTitle: "AI-Assisted",
    fAiDesc: "Smart suggestions backed by clear rules and auditable outputs.",

    screensTitle: "Product Screens",
    screensSubtitle: "A quick look at the UI and workflows",

    footerLeft: "© " + new Date().getFullYear() + " TaxCheck",
    footerPricing: "Pricing",
    footerAbout: "About",
    footerServices: "Services",
  };

  return lang === "ar" ? ar : en;
}

export default function HomePage() {
  const [lang, setLang] = useState("ar");
  const copy = useMemo(() => getCopy(lang), [lang]);

  useEffect(() => {
    const saved = (typeof window !== "undefined" && localStorage.getItem("tc_lang")) || "ar";
    setLang(saved);

    const handler = (e) => {
      const next = e?.detail?.lang || localStorage.getItem("tc_lang") || "ar";
      setLang(next);
    };

    window.addEventListener("tc-lang-change", handler);
    return () => window.removeEventListener("tc-lang-change", handler);
  }, []);

  // Modal للصور
  const [openImg, setOpenImg] = useState(null);
  const closeModal = () => setOpenImg(null);

  const screens = [
    { src: "/screens/screen-1.png", alt: "Dashboard" },
    { src: "/screens/screen-2.png", alt: "Tax Flow" },
    { src: "/screens/screen-3.png", alt: "Reports" },
  ];

  const goTo = (hash) => {
    if (typeof window === "undefined") return;
    const el = document.querySelector(hash);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="tc">
      <div className="tc-main">
        {/* HERO */}
        <section className="tc-hero" style={{ paddingTop: 8 }}>
          <div className="tc-heroGrid">
            <div className="tc-heroLeft">
              <div className="tc-badge">{copy.badge}</div>

              <h1 className="tc-h1">
                <span className="tc-h1a">{copy.h1a}</span>
                <span className="tc-h1b">{copy.h1b}</span>
              </h1>

              <p className="tc-heroP">{copy.heroP}</p>

              <div className="tc-heroCtas">
                {/* Start Free محذوف */}
                <button className="tc-btnPrimary" onClick={() => goTo("#screens")}>
                  {copy.ctaScreens}
                </button>

                <button className="tc-btn" onClick={() => goTo("#services")}>
                  {copy.ctaServices}
                </button>
              </div>
            </div>

            <div className="tc-heroRight">
              <div className="tc-whyCard">
                <div className="tc-whyHead">
                  <div>
                    <div className="tc-whyTitle">Why TaxCheck?</div>
                    <div className="tc-whySub">
                      {lang === "ar"
                        ? "تجربة احترافية للمحاسبين: وضوح + تحققات + مخرجات قابلة للتدقيق."
                        : "Accountant-grade experience with clarity, validations, and reliable outputs."}
                    </div>
                  </div>
                  <div className="tc-pill">AI + Rules</div>
                </div>

                <div className="tc-whyList">
                  <div className="tc-whyItem">
                    <div className="tc-whyItemT">
                      {lang === "ar" ? "سير عمل ضريبة الشركات" : "Corporate Tax workflow"}
                    </div>
                    <div className="tc-whyItemD">
                      {lang === "ar"
                        ? "مدخلات منظمة ونقاط تحقق لتقليل الأخطاء."
                        : "Structured inputs and checkpoints to reduce errors."}
                    </div>
                  </div>

                  <div className="tc-whyItem">
                    <div className="tc-whyItemT">
                      {lang === "ar" ? "إعداد إقرار VAT" : "VAT return preparation"}
                    </div>
                    <div className="tc-whyItemD">
                      {lang === "ar"
                        ? "تدفق نظيف قائم على الأقسام مع ملخصات عملية."
                        : "Clean, section-based flow with practical summaries."}
                    </div>
                  </div>

                  <div className="tc-whyItem">
                    <div className="tc-whyItemT">
                      {lang === "ar" ? "إدارة دافعي الضرائب والفترات" : "Taxpayer & period management"}
                    </div>
                    <div className="tc-whyItemD">
                      {lang === "ar"
                        ? "تنظيم العملاء والفترات والإقرارات باستمرار."
                        : "Organize clients, periods, and filings consistently."}
                    </div>
                  </div>

                  <div className="tc-whyItem">
                    <div className="tc-whyItemT">{lang === "ar" ? "AI + قواعد" : "AI + rules"}</div>
                    <div className="tc-whyItemD">
                      {lang === "ar"
                        ? "اقتراحات مدعومة ببوابات تحقق حتمية."
                        : "Suggestions supported by deterministic validation gates."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* USE CASES */}
        <section className="tc-section" id="usecases">
          <h2 className="tc-sectionTitle">{copy.useCasesTitle}</h2>

          <div className="tc-useCasesWrap">
            <div className="tc-useCasesBanner">
              <div style={{ fontWeight: 800, marginBottom: 6 }}>{copy.ucBannerTitle}</div>
              <div style={{ opacity: 0.92, fontSize: 13 }}>{copy.ucBannerDesc}</div>
            </div>

            <div className="tc-useCasesGrid">
              <div className="tc-caseCard">
                <div className="tc-caseTitle">{copy.ucFirmsTitle}</div>
                <div className="tc-caseDesc">{copy.ucFirmsDesc}</div>
              </div>

              <div className="tc-caseCard">
                <div className="tc-caseTitle">{copy.ucBranchesTitle}</div>
                <div className="tc-caseDesc">{copy.ucBranchesDesc}</div>
              </div>

              <div className="tc-caseCard">
                <div className="tc-caseTitle">{copy.ucTeamsTitle}</div>
                <div className="tc-caseDesc">{copy.ucTeamsDesc}</div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES / FEATURES */}
        <section className="tc-section" id="services">
          <h2 className="tc-sectionTitle">{copy.featuresTitle}</h2>

          <div className="tc-featureGrid">
            <div className="tc-featureCard">
              <div className="tc-featureHead">✅ {copy.fWorkflowTitle}</div>
              <div className="tc-featureText">{copy.fWorkflowDesc}</div>
            </div>

            <div className="tc-featureCard">
              <div className="tc-featureHead">📌 {copy.fOutputsTitle}</div>
              <div className="tc-featureText">{copy.fOutputsDesc}</div>
            </div>

            <div className="tc-featureCard">
              <div className="tc-featureHead">🧩 {copy.fValidationTitle}</div>
              <div className="tc-featureText">{copy.fValidationDesc}</div>
            </div>

            <div className="tc-featureCard">
              <div className="tc-featureHead">🤖 {copy.fAiTitle}</div>
              <div className="tc-featureText">{copy.fAiDesc}</div>
            </div>
          </div>

          <div style={{ maxWidth: 980, margin: "18px auto 0" }}>
            <div className="tc-useCasesBanner">
              <div style={{ fontWeight: 800, marginBottom: 6 }}>
                {lang === "ar" ? "خدماتنا الاستشارية" : "Consulting Services"}
              </div>
              <div style={{ opacity: 0.92, fontSize: 13 }}>
                {lang === "ar"
                  ? "استشارات مالية وتقنية للبرامج المالية، مسك الدفاتر، والاستشارات الضريبية."
                  : "Financial & technical consulting for finance software, bookkeeping, and tax advisory."}
              </div>
            </div>
          </div>
        </section>

        {/* SCREENS */}
        <section className="tc-section" id="screens">
          <h2 className="tc-sectionTitle">{copy.screensTitle}</h2>
          <p className="tc-subTitle">{copy.screensSubtitle}</p>

          <div className="tc-screensGrid">
            {screens.map((s) => (
              <button
                key={s.src}
                className="tc-screenBtn"
                onClick={() => setOpenImg(s)}
                type="button"
                aria-label={s.alt}
              >
                <div className="tc-screen">
                  <img className="tc-screenImg" src={s.src} alt={s.alt} loading="lazy" />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="tc-footer">
          <div className="tc-footerInner">
            <div>{copy.footerLeft}</div>
            <div className="tc-footerLinks">
              <a href="/pricing">{copy.footerPricing}</a>
              <a href="/about">{copy.footerAbout}</a>
              <a href="#services">{copy.footerServices}</a>
            </div>
          </div>
        </footer>
      </div>

      {/* IMAGE MODAL */}
      {openImg && (
        <div className="tc-modal" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="tc-modalInner" onClick={(e) => e.stopPropagation()}>
            <button className="tc-modalClose" onClick={closeModal} type="button">
              ✕
            </button>
            <img className="tc-modalImg" src={openImg.src} alt={openImg.alt} />
          </div>
        </div>
      )}

      <style jsx>{`
        .tc-heroGrid {
          display: grid;
          grid-template-columns: 1.05fr 0.95fr;
          gap: 18px;
          align-items: start;
        }
        .tc-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.7);
          border: 1px solid rgba(229, 231, 235, 0.9);
          font-weight: 700;
          font-size: 13px;
          color: #334155;
        }
        .tc-h1 {
          margin: 14px 0 10px;
          line-height: 1.05;
        }
        .tc-h1a {
          display: block;
          font-size: 56px;
          font-weight: 850;
          letter-spacing: -0.6px;
          color: #0b1220;
        }
        .tc-h1b {
          display: block;
          margin-top: 6px;
          font-size: 44px;
          font-weight: 750;
          color: #2b4d76;
        }
        .tc-heroP {
          margin: 10px 0 16px;
          max-width: 52ch;
          color: #334155;
          font-size: 15px;
          line-height: 1.75;
          font-weight: 500;
        }
        .tc-heroCtas {
          display: flex;
          gap: 10px;
          align-items: center;
          flex-wrap: wrap;
        }

        .tc-whyCard {
          background: rgba(255, 255, 255, 0.75);
          border: 1px solid rgba(229, 231, 235, 0.9);
          border-radius: 18px;
          padding: 16px;
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
        }
        .tc-whyHead {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }
        .tc-whyTitle {
          font-weight: 850;
          font-size: 18px;
          color: #0b1220;
        }
        .tc-whySub {
          margin-top: 4px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.5;
          font-weight: 600;
        }
        .tc-pill {
          padding: 10px 14px;
          border-radius: 999px;
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
          font-weight: 850;
          font-size: 13px;
          color: #14532d;
          white-space: nowrap;
        }
        .tc-whyList {
          display: grid;
          gap: 10px;
        }
        .tc-whyItem {
          background: rgba(255, 255, 255, 0.82);
          border: 1px solid rgba(229, 231, 235, 0.95);
          border-radius: 14px;
          padding: 12px 12px;
        }
        .tc-whyItemT {
          font-weight: 850;
          font-size: 14px;
          color: #0b1220;
          margin-bottom: 4px;
        }
        .tc-whyItemD {
          font-size: 13px;
          color: #64748b;
          font-weight: 650;
          line-height: 1.55;
        }

        .tc-subTitle {
          text-align: center;
          margin: -6px 0 14px;
          color: #64748b;
          font-size: 13px;
          font-weight: 650;
        }

        .tc-screenBtn {
          padding: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: inherit;
        }
        .tc-screenImg {
          width: 100%;
          height: 320px;
          object-fit: cover;
          display: block;
        }

        .tc-modal {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.65);
          display: grid;
          place-items: center;
          z-index: 9999;
          padding: 20px;
        }
        .tc-modalInner {
          width: min(1100px, 95vw);
          background: #fff;
          border-radius: 14px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.35);
        }
        .tc-modalClose {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid rgba(229, 231, 235, 0.9);
          background: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          font-weight: 900;
        }
        .tc-modalImg {
          width: 100%;
          height: auto;
          display: block;
        }

        @media (max-width: 980px) {
          .tc-heroGrid {
            grid-template-columns: 1fr;
          }
          .tc-h1a {
            font-size: 42px;
          }
          .tc-h1b {
            font-size: 34px;
          }
          .tc-screenImg {
            height: 260px;
          }
        }
      `}</style>
    </main>
  );
}
