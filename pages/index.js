import Link from "next/link";
import { APP_LOGIN, APP_SIGNUP } from "../lib/links";

function getCopy(lang) {
  const en = {
    dir: "ltr",
    badge: "Corporate Tax + VAT • AI-assisted • Built for Accountants",
    h1a: "Corporate Tax & VAT in the UAE",
    h1b: "Clear workflows. Practical outputs.",
    heroP:
      "TaxCheck helps accountants and SMEs manage taxpayers, tax periods, and Corporate Tax / VAT filings through guided steps, validations, and professional reports.",
    // ✅ Start Free removed from homepage
    startFree: "",
    viewScreens: "View Product Screens",
    consulting: "Consulting Services",

    m1t: "Guided workflows",
    m1p: "Step-by-step flows with validations and clear checkpoints.",
    m2t: "Professional outputs",
    m2p: "Practical summaries and reporting-ready structures.",

    whyTitle: "Why TaxCheck?",
    whyP: "Accountant-grade experience with clarity, validations, and reliable outputs.",
    w1t: "Corporate Tax workflow",
    w1p: "Structured inputs and checkpoints to reduce errors.",
    w2t: "VAT return preparation",
    w2p: "Clean, section-based flow with practical summaries.",
    w3t: "Taxpayer & period management",
    w3p: "Organize clients, periods, and filings consistently.",
    w4t: "AI + rules",
    w4p: "Suggestions supported by deterministic validation gates.",

    useTitle: "Typical use cases",
    tag1: "VAT returns",
    tag2: "CT periods",
    tag3: "Accounting firms",
    tag4: "Pre-submission checks",

    screensTitle: "Product Screenshots",
    screensP: "A preview of the TaxCheck interface and workflows.",
  };

  const ar = {
    dir: "rtl",
    badge: "الضريبة على الشركات + ضريبة القيمة المضافة • بمساعدة الذكاء الاصطناعي • مخصص للمحاسبين",
    h1a: "الضريبة على الشركات وضريبة القيمة المضافة في الإمارات",
    h1b: "خطوات واضحة. مخرجات عملية.",
    heroP:
      "يساعدك TaxCheck على إدارة المكلفين والفترات الضريبية وتجهيز إقرارات الضريبة على الشركات وضريبة القيمة المضافة عبر خطوات موجهة وتحقق ومخرجات احترافية.",
    // ✅ إلغاء زر Start Free من الصفحة الرئيسية
    startFree: "",
    viewScreens: "عرض صور المنتج",
    consulting: "الخدمات الاستشارية",

    m1t: "خطوات موجهة",
    m1p: "تسلسل واضح مع تحقق ونقاط تدقيق.",
    m2t: "مخرجات احترافية",
    m2p: "ملخصات عملية وتقارير جاهزة للمراجعة.",

    whyTitle: "لماذا TaxCheck؟",
    whyP: "تجربة بمستوى مكاتب المحاسبة: وضوح، تحقق، ومخرجات موثوقة.",
    w1t: "سير عمل الضريبة على الشركات",
    w1p: "مدخلات منظمة ونقاط تدقيق لتقليل الأخطاء.",
    w2t: "تحضير إقرار ضريبة القيمة المضافة",
    w2p: "أقسام مرتبة مع ملخصات عملية.",
    w3t: "إدارة المكلفين والفترات",
    w3p: "تنظيم العملاء والفترات والإقرارات بشكل ثابت.",
    w4t: "الذكاء الاصطناعي + القواعد",
    w4p: "اقتراحات مدعومة بقواعد تحقق حتمية.",

    useTitle: "حالات استخدام شائعة",
    tag1: "إقرارات VAT",
    tag2: "فترات CT",
    tag3: "مكاتب محاسبة",
    tag4: "فحص قبل التقديم",

    screensTitle: "صور من داخل المنتج",
    screensP: "لمحة عن الواجهة وسير العمل داخل TaxCheck.",
  };

  return lang === "ar" ? ar : en;
}

export default function HomePage() {
  // لغة بسيطة عبر query: ?lang=ar
  const lang =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("lang") === "ar"
      ? "ar"
      : "en";

  const c = getCopy(lang);

  return (
    <div dir={c.dir}>
      <section className="tc-hero">
        <div className="tc-heroGrid">
          <div>
            <div className="tc-pill">
              <span className="tc-dot" />
              <span>{c.badge}</span>
            </div>

            <h1 className="tc-heroTitle">
              {c.h1a}
              <br />
              <span className="tc-heroTitleSoft">{c.h1b}</span>
            </h1>

            <p className="tc-heroSubtitle">{c.heroP}</p>

            <div className="tc-heroActions">
              {/* ✅ Start Free removed from homepage by empty text */}
              {c.startFree ? (
                <a className="tc-btnPrimary" href={APP_SIGNUP}>
                  {c.startFree}
                </a>
              ) : null}

              <a className="tc-btn" href="#screens">
                {c.viewScreens}
              </a>
              <Link href="/services" legacyBehavior>
                <a className="tc-btn">{c.consulting}</a>
              </Link>

              <Link href={{ pathname: "/", query: { lang: lang === "ar" ? "en" : "ar" } }} legacyBehavior>
                <a className="tc-btn tc-langBtn">{lang === "ar" ? "EN" : "AR"}</a>
              </Link>
            </div>

            <div className="tc-miniCards">
              <div className="tc-miniCard">
                <div className="tc-miniTitle">{c.m1t}</div>
                <div className="tc-miniText">{c.m1p}</div>
              </div>
              <div className="tc-miniCard">
                <div className="tc-miniTitle">{c.m2t}</div>
                <div className="tc-miniText">{c.m2p}</div>
              </div>
            </div>
          </div>

          <div className="tc-sideCard">
            <div className="tc-sideHeader">
              <div>
                <div className="tc-sideTitle">{c.whyTitle}</div>
                <div className="tc-sideText">{c.whyP}</div>
              </div>
              <div className="tc-badge">AI + Rules</div>
            </div>

            <div className="tc-sideList">
              <div className="tc-sideItem">
                <div className="tc-sideItemTitle">{c.w1t}</div>
                <div className="tc-sideItemText">{c.w1p}</div>
              </div>
              <div className="tc-sideItem">
                <div className="tc-sideItemTitle">{c.w2t}</div>
                <div className="tc-sideItemText">{c.w2p}</div>
              </div>
              <div className="tc-sideItem">
                <div className="tc-sideItemTitle">{c.w3t}</div>
                <div className="tc-sideItemText">{c.w3p}</div>
              </div>
              <div className="tc-sideItem">
                <div className="tc-sideItemTitle">{c.w4t}</div>
                <div className="tc-sideItemText">{c.w4p}</div>
              </div>
            </div>

            <div className="tc-sideFooter">
              <div className="tc-sideFooterTitle">{c.useTitle}</div>
              <div className="tc-tags">
                <span className="tc-tag">{c.tag1}</span>
                <span className="tc-tag">{c.tag2}</span>
                <span className="tc-tag">{c.tag3}</span>
                <span className="tc-tag">{c.tag4}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="screens" className="tc-section">
        <h2 className="tc-sectionTitle">{c.screensTitle}</h2>
        <p className="tc-sectionSub">{c.screensP}</p>

        <div className="screens">
          <img src="/screens/screen-dashboard.png" alt="Dashboard" />
          <img src="/screens/screen-tax-wizard.png" alt="Tax Wizard" />
          <img src="/screens/screen-reports.png" alt="Reports" />
        </div>
      </section>

      <section id="contact" className="tc-section">
        <h2 className="tc-sectionTitle">{lang === "ar" ? "اتصل بنا" : "Contact Us"}</h2>
        <p className="tc-sectionSub">
          {lang === "ar"
            ? "أرسل لنا رسالة وسنعاود التواصل معك."
            : "Send us a message and we’ll get back to you."}
        </p>

        <form className="tc-contactForm">
          <div className="tc-formGrid">
            <div>
              <label className="tc-label">{lang === "ar" ? "الاسم" : "Name"}</label>
              <input className="tc-input" placeholder={lang === "ar" ? "اسمك الكامل" : "Your full name"} />
            </div>
            <div>
              <label className="tc-label">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</label>
              <input className="tc-input" placeholder="name@company.com" />
            </div>
          </div>

          <div style={{ marginTop: 14 }}>
            <label className="tc-label">{lang === "ar" ? "الرسالة" : "Message"}</label>
            <textarea className="tc-textarea" rows={5} placeholder={lang === "ar" ? "اكتب رسالتك هنا..." : "Write your message..."} />
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
            <button type="button" className="tc-btnPrimary">
              {lang === "ar" ? "إرسال" : "Send"}
            </button>
            <a className="tc-btn" href={APP_LOGIN}>
              {lang === "ar" ? "تسجيل الدخول" : "Sign in"}
            </a>
          </div>
        </form>
      </section>
    </div>
  );
}
