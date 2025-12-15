import React, { useMemo, useState } from "react";
import { APP_LOGIN, APP_SIGNUP } from "../lib/links";

export default function IndexPage() {
  const [lang, setLang] = useState("en"); // "en" | "ar"
  const t = useMemo(() => getCopy(lang), [lang]);

  // ✅ لا روابط صور هنا (placeholder). ضع صورك لاحقاً بتبديل src من null إلى رابط
  const screenshots = [
    { src: null, alt: "TaxCheck – Screen 1" },
    { src: null, alt: "TaxCheck – Screen 2" },
    { src: null, alt: "TaxCheck – Screen 3" },
  ];

  // Contact (UI + إرسال فعلي اختياري لاحقاً)
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle|sending|success|error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });

    try {
      // ✅ ضع لاحقاً endpoint حقيقي للإرسال إذا رغبت
      // حالياً: نجاح وهمي حتى لا تنكسر الصفحة
      await new Promise((r) => setTimeout(r, 650));
      setStatus({ state: "success", msg: t.sent });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch {
      setStatus({ state: "error", msg: t.failed });
    }
  }

  return (
    <div className="page" dir={t.dir}>
      {/* HERO */}
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroLeft">
            <div className="badgeRow">
              <span className="dot" />
              <span className="badgeText">{t.badge}</span>
            </div>

            <h1 className="h1">
              {t.h1a}
              <span className="h1sub">{t.h1b}</span>
            </h1>

            <p className="heroP">{t.heroP}</p>

            <div className="ctaRow">
              <a className="btnPrimary" href={APP_SIGNUP}>{t.startFree}</a>
              <a className="btn" href="#screens">{t.viewScreens}</a>
              <a className="btn" href="#contact">{t.consulting}</a>
              <button className="langBtn" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
                {lang === "en" ? "AR" : "EN"}
              </button>
            </div>

            <div className="miniGrid">
              <MiniCard title={t.m1t} desc={t.m1d} />
              <MiniCard title={t.m2t} desc={t.m2d} />
            </div>
          </div>

          <div className="heroRight">
            <div className="cardTop">
              <div className="cardHead">
                <div>
                  <div className="cardTitle">{t.whyTitle}</div>
                  <div className="cardSub">{t.whySub}</div>
                </div>
                <div className="pill">AI + Rules</div>
              </div>

              <div className="featureList">
                <Feature title={t.f1t} desc={t.f1d} />
                <Feature title={t.f2t} desc={t.f2d} />
                <Feature title={t.f3t} desc={t.f3d} />
                <Feature title={t.f4t} desc={t.f4d} />
              </div>

              <div className="useCases">
                <div className="useCasesTitle">{t.useCases}</div>
                <div className="chips">
                  <Chip>{t.c1}</Chip>
                  <Chip>{t.c2}</Chip>
                  <Chip>{t.c3}</Chip>
                  <Chip>{t.c4}</Chip>
                </div>
              </div>
            </div>

            <div className="shadowBlob b1" />
            <div className="shadowBlob b2" />
          </div>
        </div>
      </section>

      {/* SCREENS */}
      <section id="screens" className="section">
        <div className="container">
          <div className="sectionHead">
            <div>
              <h2 className="h2">{t.screensTitle}</h2>
              <p className="p">{t.screensSub}</p>
            </div>
            <a className="btn" href={APP_LOGIN}>{t.tryNow}</a>
          </div>

          <div className="shotsGrid">
            {screenshots.map((s, idx) => (
              <div key={idx} className="shotCard">
                <div className="shot">
                  {s.src ? (
                    <img className="shotImg" src={s.src} alt={s.alt} />
                  ) : (
                    <div className="shotPlaceholder">
                      <div className="shotLabel">{t.screen} {idx + 1}</div>
                      <div className="shotHint">{t.screenHint}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section id="about" className="section alt">
        <div className="container aboutGrid">
          <div>
            <h2 className="h2">{t.aboutTitle}</h2>
            <p className="p">{t.aboutP}</p>
            <div className="miniGrid2">
              <MiniCard title={t.a1t} desc={t.a1d} />
              <MiniCard title={t.a2t} desc={t.a2d} />
              <MiniCard title={t.a3t} desc={t.a3d} />
              <MiniCard title={t.a4t} desc={t.a4d} />
            </div>
          </div>

          <div className="consultCard">
            <div className="consultTitle">{t.consultTitle}</div>
            <div className="consultSub">{t.consultP}</div>

            <div className="chips mt">
              <Chip>{t.s1}</Chip>
              <Chip>{t.s2}</Chip>
              <Chip>{t.s3}</Chip>
              <Chip>{t.s4}</Chip>
              <Chip>{t.s5}</Chip>
            </div>

            <div className="ctaRow mt2">
              <a className="btnDark" href="#contact">{t.requestConsult}</a>
              <a className="btn" href={APP_SIGNUP}>{t.startFree}</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <div className="container contactGrid">
          <div>
            <h2 className="h2">{t.contactTitle}</h2>
            <p className="p">{t.contactSub}</p>

            <div className="directCard">
              <div className="directTitle">{t.direct}</div>
              <div className="directLine"><b>Email:</b> info@taxcheck.ae</div>
              <div className="directLine"><b>{t.location}:</b> UAE</div>
            </div>
          </div>

          <div className="formCard">
            <div className="formTitle">{t.sendMsg}</div>

            <form onSubmit={onSubmit} className="form">
              <input
                className="input"
                placeholder={t.name}
                value={form.name}
                onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                required
              />
              <input
                className="input"
                placeholder={t.email}
                type="email"
                value={form.email}
                onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                required
              />
              <input
                className="input"
                placeholder={t.company}
                value={form.company}
                onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
              />
              <textarea
                className="textarea"
                placeholder={t.message}
                rows={6}
                value={form.message}
                onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                required
              />
              <button className="btnPrimary full" disabled={status.state === "sending"} type="submit">
                {status.state === "sending" ? t.sending : t.send}
              </button>

              {status.state !== "idle" && (
                <div className={`status ${status.state === "success" ? "ok" : "bad"}`}>
                  {status.msg}
                </div>
              )}

              <div className="smallNote">{t.note}</div>
            </form>
          </div>
        </div>
      </section>

      <style jsx>{`
        .page { padding-bottom: 24px; }
        .container { max-width: 1152px; margin: 0 auto; padding: 0 24px; }

        .hero { padding: 56px 0 18px; }
        .heroGrid { display: grid; gap: 28px; grid-template-columns: 1fr; align-items: start; }
        @media (min-width: 980px) {
          .heroGrid { grid-template-columns: 1.05fr 0.95fr; align-items: center; gap: 34px; }
        }

        .badgeRow {
          display: inline-flex; align-items: center; gap: 10px;
          padding: 10px 14px; border: 1px solid #E5E7EB; border-radius: 999px;
          background: rgba(255,255,255,0.75); backdrop-filter: blur(10px);
          color: #475569; font-size: 12px; font-weight: 600;
        }
        .dot { width: 8px; height: 8px; border-radius: 999px; background: #2ECC71; }

        .h1 {
          margin: 18px 0 0; font-size: 44px; line-height: 1.08;
          letter-spacing: -0.03em; font-weight: 800; color: #0F172A;
        }
        .h1sub { display: block; margin-top: 10px; font-weight: 700; color: #334155; }
        @media (max-width: 520px) { .h1 { font-size: 36px; } }

        .heroP { margin: 14px 0 0; font-size: 15.5px; line-height: 1.8; color: #475569; max-width: 58ch; }

        .ctaRow { margin-top: 18px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }

        .btn, .btnPrimary, .btnDark, .langBtn {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 12px 14px; border-radius: 12px; text-decoration: none;
          font-size: 13px; font-weight: 800;
        }
        .btn { background: #fff; border: 1px solid #E5E7EB; color: #334155; }
        .btn:hover { background: #F8FAFC; }
        .btnPrimary { background: #2ECC71; border: 1px solid transparent; color: #fff; }
        .btnPrimary:hover { opacity: 0.92; }
        .btnDark { background: #1A3E6E; border: 1px solid transparent; color: #fff; }
        .btnDark:hover { opacity: 0.92; }
        .langBtn { background: #fff; border: 1px solid #E5E7EB; color: #0F172A; cursor: pointer; }
        .langBtn:hover { background: #F8FAFC; }

        .miniGrid { margin-top: 20px; display: grid; gap: 12px; grid-template-columns: 1fr; }
        @media (min-width: 600px) { .miniGrid { grid-template-columns: 1fr 1fr; } }

        .heroRight { position: relative; }
        .cardTop {
          border: 1px solid #E5E7EB; border-radius: 22px; background: rgba(255,255,255,0.9);
          backdrop-filter: blur(10px);
          padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .cardHead { display: flex; justify-content: space-between; gap: 14px; align-items: flex-start; }
        .cardTitle { font-size: 13px; font-weight: 900; color: #0F172A; }
        .cardSub { margin-top: 4px; font-size: 13px; color: #64748B; line-height: 1.5; }
        .pill { font-size: 12px; font-weight: 900; padding: 8px 10px; border-radius: 999px; background: rgba(46,204,113,0.14); color: #18794E; }

        .featureList { margin-top: 14px; display: grid; gap: 10px; }
        .useCases {
          margin-top: 14px;
          background: #F7F9FA;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 12px;
        }
        .useCasesTitle { font-size: 12px; font-weight: 900; color: #334155; margin-bottom: 8px; }
        .chips { display: flex; flex-wrap: wrap; gap: 8px; }

        .shadowBlob { position: absolute; width: 220px; height: 220px; border-radius: 999px; filter: blur(32px); opacity: 0.35; z-index: -1; }
        .b1 { top: -40px; right: -40px; background: #2ECC71; }
        .b2 { bottom: -50px; left: -60px; background: #1A3E6E; }

        .section { padding: 52px 0; }
        .alt { background: rgba(255,255,255,0.55); border-top: 1px solid #E5E7EB; border-bottom: 1px solid #E5E7EB; }

        .sectionHead { display: flex; justify-content: space-between; align-items: flex-end; gap: 16px; }
        .h2 { margin: 0; font-size: 24px; font-weight: 900; letter-spacing: -0.02em; color: #0F172A; }
        .p { margin: 8px 0 0; font-size: 14px; line-height: 1.8; color: #475569; max-width: 68ch; }

        .shotsGrid { margin-top: 18px; display: grid; gap: 14px; grid-template-columns: 1fr; }
        @media (min-width: 900px) { .shotsGrid { grid-template-columns: 1fr 1fr 1fr; } }
        .shotCard { border: 1px solid #E5E7EB; border-radius: 22px; background: rgba(255,255,255,0.9); padding: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
        .shot { border-radius: 16px; background: #F1F5F9; overflow: hidden; aspect-ratio: 16/10; display: grid; place-items: center; }
        .shotPlaceholder { text-align: center; padding: 18px; }
        .shotLabel { font-weight: 900; color: #0F172A; font-size: 13px; }
        .shotHint { margin-top: 6px; font-size: 12px; color: #64748B; line-height: 1.5; }
        .shotImg { width: 100%; height: 100%; object-fit: cover; display: block; }

        .aboutGrid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 980px) { .aboutGrid { grid-template-columns: 1.05fr 0.95fr; gap: 22px; } }
        .miniGrid2 { margin-top: 14px; display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 700px) { .miniGrid2 { grid-template-columns: 1fr 1fr; } }

        .consultCard {
          border: 1px solid #E5E7EB; border-radius: 22px; background: #F7F9FA; padding: 18px;
        }
        .consultTitle { font-size: 14px; font-weight: 900; color: #0F172A; }
        .consultSub { margin-top: 8px; font-size: 14px; line-height: 1.8; color: #475569; }

        .mt { margin-top: 14px; }
        .mt2 { margin-top: 16px; }

        .contactGrid { display: grid; grid-template-columns: 1fr; gap: 16px; align-items: start; }
        @media (min-width: 980px) { .contactGrid { grid-template-columns: 1fr 1fr; gap: 22px; } }

        .directCard { margin-top: 14px; border: 1px solid #E5E7EB; border-radius: 22px; background: rgba(255,255,255,0.9); padding: 18px; }
        .directTitle { font-size: 13px; font-weight: 900; color: #0F172A; margin-bottom: 8px; }
        .directLine { font-size: 13px; color: #475569; line-height: 1.8; }

        .formCard { border: 1px solid #E5E7EB; border-radius: 22px; background: rgba(255,255,255,0.9); padding: 18px; }
        .formTitle { font-size: 13px; font-weight: 900; color: #0F172A; }
        .form { margin-top: 12px; display: grid; gap: 10px; }
        .input, .textarea {
          width: 100%;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          padding: 12px 12px;
          font-size: 13px;
          outline: none;
          background: #fff;
          color: #0F172A;
        }
        .input:focus, .textarea:focus { box-shadow: 0 0 0 4px rgba(46,204,113,0.18); border-color: rgba(46,204,113,0.55); }
        .full { width: 100%; }
        .status { font-size: 13px; font-weight: 800; }
        .ok { color: #18794E; }
        .bad { color: #DC2626; }
        .smallNote { margin-top: 6px; font-size: 12px; color: #64748B; line-height: 1.6; }

        /* RTL tweaks */
        [dir="rtl"] .ctaRow { justify-content: flex-start; }
      `}</style>
    </div>
  );
}

function MiniCard({ title, desc }) {
  return (
    <>
      <div className="miniCard">
        <div className="miniTitle">{title}</div>
        <div className="miniDesc">{desc}</div>
      </div>
      <style jsx>{`
        .miniCard {
          border: 1px solid #E5E7EB;
          border-radius: 18px;
          background: rgba(255,255,255,0.9);
          padding: 14px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .miniTitle { font-size: 13px; font-weight: 900; color: #0F172A; }
        .miniDesc { margin-top: 6px; font-size: 13px; color: #475569; line-height: 1.7; }
      `}</style>
    </>
  );
}

function Feature({ title, desc }) {
  return (
    <>
      <div className="feat">
        <div className="ft">{title}</div>
        <div className="fd">{desc}</div>
      </div>
      <style jsx>{`
        .feat {
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          background: #fff;
          padding: 12px;
        }
        .ft { font-size: 13px; font-weight: 900; color: #0F172A; }
        .fd { margin-top: 6px; font-size: 13px; color: #475569; line-height: 1.7; }
      `}</style>
    </>
  );
}

function Chip({ children }) {
  return (
    <>
      <span className="chip">{children}</span>
      <style jsx>{`
        .chip {
          display: inline-flex;
          align-items: center;
          border: 1px solid #E5E7EB;
          background: #fff;
          border-radius: 999px;
          padding: 8px 10px;
          font-size: 12px;
          font-weight: 800;
          color: #334155;
        }
      `}</style>
    </>
  );
}

function getCopy(lang) {
  const en = {
    dir: "ltr",
    badge: "Corporate Tax + VAT • AI-assisted • Built for Accountants",
    h1a: "Corporate Tax & VAT in the UAE",
    h1b: "Clear workflows. Practical outputs.",
    heroP:
      "TaxCheck helps accountants and SMEs manage taxpayers, tax periods, and Corporate Tax / VAT filings through guided steps, validations, and professional reports.",
    viewScreens: "View Product Screens",
    consulting: "Consulting Services",

    m1t: "Guided workflows",
    m1d: "Step-by-step flows with validations and checkpoints.",
    m2t: "Professional outputs",
    m2d: "Practical summaries and reporting-ready structures.",

    whyTitle: "Why TaxCheck?",
    whySub:
      "Accountant-grade experience with clarity, validations, and reliable outputs.",
    f1t: "Corporate Tax workflow",
    f1d: "Structured inputs and checkpoints to reduce errors.",
    f2t: "VAT return preparation",
    f2d: "Clean, section-based flow with practical summaries.",
    f3t: "Taxpayer & period management",
    f3d: "Organize clients, periods, and filings consistently.",
    f4t: "AI + rules",
    f4d: "Suggestions supported by deterministic validation gates.",

    useCases: "Typical use cases",
    c1: "VAT returns",
    c2: "CT periods",
    c3: "Accounting firms",
    c4: "Pre-submission checks",

    screensTitle: "Product Screenshots",
    screensSub: "A quick look at the product interface and workflows.",
    tryNow: "Try now",
    screen: "Screenshot",
    screenHint: "Add an in-product screenshot here later.",

    aboutTitle: "About",
    aboutP:
      "Fintech Technologies FZ-LLC builds practical financial software for accountants and SMEs in the UAE, focused on clarity, compliance, and real operational workflows.",

    a1t: "Clarity-first UX",
    a1d: "Less noise, more structure.",
    a2t: "Compliance mindset",
    a2d: "Validations + guided steps.",
    a3t: "Accountant-grade outputs",
    a3d: "Clean, reliable reporting.",
    a4t: "Built for SMEs",
    a4d: "Fast daily usage.",

    consultTitle: "Financial & Technical Consulting",
    consultP:
      "We provide consulting for finance and accounting software: workflow design, reporting structures, tax systems, and ERP integrations.",
    requestConsult: "Request consultation",
    s1: "Corporate Tax",
    s2: "VAT",
    s3: "Reporting",
    s4: "ERP integrations",
    s5: "Workflow design",

    contactTitle: "Contact Us",
    contactSub: "Send a message and we will get back to you with a clear next step.",
    direct: "Direct",
    location: "Location",
    sendMsg: "Send a message",
    name: "Your name",
    email: "Email",
    company: "Company (optional)",
    message: "Message",
    send: "Send message",
    sending: "Sending…",
    sent: "Sent. We will contact you shortly.",
    failed: "Failed to send. Please try again.",
    note: "This form is ready. If you want real email delivery, tell me which provider you use (Resend/SendGrid/SES).",
  };

  const ar = {
    dir: "rtl",
    badge: "الضريبة + VAT • مساعد بالذكاء الاصطناعي • للمحاسبين",
    h1a: "الضريبة الاتحادية و VAT في الإمارات",
    h1b: "مسارات واضحة. مخرجات عملية.",
    heroP:
      "يساعدك TaxCheck على إدارة المكلّفين والفترات الضريبية وتجهيز إقرارات الضريبة الاتحادية وVAT عبر خطوات موجّهة، تحققات، وتقارير احترافية.",
    startFree: "ابدأ مجانًا",
    viewScreens: "عرض صور المنتج",
    consulting: "خدمات الاستشارة",

    m1t: "مسارات موجّهة",
    m1d: "خطوات واضحة مع تحققات ونقاط مراجعة.",
    m2t: "مخرجات احترافية",
    m2d: "ملخصات عملية وبنية تقارير جاهزة.",

    whyTitle: "لماذا TaxCheck؟",
    whySub: "تجربة بمستوى المحاسبين: وضوح، تحققات، ومخرجات يمكن الاعتماد عليها.",
    f1t: "مسار الضريبة الاتحادية",
    f1d: "إدخال منظّم ونقاط تدقيق لتقليل الأخطاء.",
    f2t: "تجهيز إقرار VAT",
    f2d: "أقسام واضحة مع ملخصات عملية.",
    f3t: "إدارة المكلّفين والفترات",
    f3d: "تنظيم العملاء والفترات والإقرارات بشكل ثابت.",
    f4t: "ذكاء + قواعد",
    f4d: "اقتراحات مدعومة بتحققات ثابتة.",

    useCases: "حالات استخدام شائعة",
    c1: "إقرارات VAT",
    c2: "فترات الضريبة",
    c3: "مكاتب محاسبة",
    c4: "تحقق قبل الإرسال",

    screensTitle: "صور من داخل المنتج",
    screensSub: "نظرة سريعة على الواجهة وسير العمل.",
    tryNow: "جرّبه الآن",
    screen: "صورة",
    screenHint: "ضع صورة من داخل المنتج هنا لاحقًا.",

    aboutTitle: "نبذة",
    aboutP:
      "تطوّر Fintech Technologies FZ-LLC برمجيات مالية عملية للمحاسبين والشركات الصغيرة في الإمارات، مع تركيز على الوضوح والالتزام وسير العمل الحقيقي.",

    a1t: "واجهة واضحة",
    a1d: "أقل ضجيج، أكثر تنظيم.",
    a2t: "الالتزام أولًا",
    a2d: "تحققات وخطوات موجّهة.",
    a3t: "تقارير احترافية",
    a3d: "تقارير نظيفة يمكن الاعتماد عليها.",
    a4t: "مصمم للـ SMEs",
    a4d: "سريع للاستخدام اليومي.",

    consultTitle: "استشارات مالية وتقنية",
    consultP:
      "نقدم استشارات للأنظمة المالية: تصميم سير العمل، بنية التقارير، الأنظمة الضريبية، وتكاملات ERP.",
    requestConsult: "اطلب استشارة",
    s1: "الضريبة الاتحادية",
    s2: "VAT",
    s3: "التقارير",
    s4: "تكامل ERP",
    s5: "تصميم سير العمل",

    contactTitle: "اتصل بنا",
    contactSub: "أرسل رسالة وسنرد عليك بخطوة واضحة ومباشرة.",
    direct: "بيانات التواصل",
    location: "الموقع",
    sendMsg: "أرسل رسالة",
    name: "الاسم",
    email: "البريد الإلكتروني",
    company: "الشركة (اختياري)",
    message: "الرسالة",
    send: "إرسال",
    sending: "جاري الإرسال…",
    sent: "تم الإرسال. سنتواصل معك قريبًا.",
    failed: "فشل الإرسال. أعد المحاولة.",
    note: "النموذج جاهز. إذا أردت إرسال بريد فعلي، أخبرني مزود البريد (Resend/SendGrid/SES).",
  };

  return lang === "ar" ? ar : en;
}
