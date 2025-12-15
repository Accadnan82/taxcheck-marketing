import React, { useMemo, useState } from "react";

export default function Home() {
  const year = useMemo(() => new Date().getFullYear(), []);

  // ========= Multi-language =========
  const [lang, setLang] = useState("en"); // "en" | "ar"
  const t = useMemo(() => {
    const en = {
      dir: "ltr",
      brand: "TaxCheck",
      top: "Corporate Tax & VAT • UAE",
      navScreens: "Product",
      navAbout: "About",
      navContact: "Contact",
      signIn: "Sign in",
      startFree: "Start Free",

      badge: "Corporate Tax + VAT • AI-assisted • Built for Accountants",
      h1a: "Corporate Tax & VAT in the UAE",
      h1b: "Clear workflows. Practical outputs.",
      heroP:
        "TaxCheck helps accountants and SMEs manage taxpayers, tax periods, and Corporate Tax / VAT filings through guided steps, validations, and professional reports.",
      ctaScreens: "View Product Screens",
      ctaConsult: "Consulting Services",

      secWhyTitle: "Why TaxCheck?",
      secWhyP:
        "Built for accountant-grade work: structured inputs, validation, and outputs you can confidently use with clients.",
      why1T: "Guided workflows",
      why1D: "Step-by-step flows with validations and clear checkpoints.",
      why2T: "Practical outputs",
      why2D: "Professional summaries, checklists, and reporting-ready exports.",
      why3T: "Built for SMEs",
      why3D: "Fast daily use: simple, predictable, and compliant structure.",
      why4T: "AI + rules",
      why4D: "AI suggestions supported by deterministic rules and validation gates.",

      secScreensTitle: "Product Screenshots",
      secScreensP:
        "Add 3 screenshots from inside the product. If you haven’t added them yet, the placeholders will appear.",
      screenLabel: "Screenshot",

      secAboutTitle: "About",
      aboutP:
        "Fintech Technologies FZ-LLC builds practical financial software for accountants and SMEs in the UAE, focused on clarity, compliance, and real operational workflows.",

      secConsultTitle: "Financial & Technical Consulting",
      consultP:
        "We provide consulting for accounting and finance software: workflow design, reporting structures, tax systems, and ERP integrations.",
      consultCTA: "Request consultation",

      secContactTitle: "Contact Us",
      contactP:
        "Send a message and we will get back to you with a clear next step.",
      name: "Your name",
      email: "Email",
      company: "Company (optional)",
      message: "Message",
      send: "Send message",
      sending: "Sending…",
      sent: "Sent. We will contact you shortly.",
      failed: "Failed to send. Please try again.",

      footer1: "All rights reserved.",
    };

    const ar = {
      dir: "rtl",
      brand: "TaxCheck",
      top: "الضريبة الاتحادية + ضريبة القيمة المضافة • الإمارات",
      navScreens: "المنتج",
      navAbout: "نبذة",
      navContact: "تواصل",
      signIn: "تسجيل الدخول",
      startFree: "ابدأ مجانًا",

      badge: "الضريبة + VAT • مساعد بالذكاء الاصطناعي • للمحاسبين",
      h1a: "الضريبة الاتحادية و VAT في الإمارات",
      h1b: "مسارات واضحة. مخرجات عملية.",
      heroP:
        "يساعدك TaxCheck على إدارة المكلّفين والفترات الضريبية وتجهيز إقرارات الضريبة الاتحادية وVAT عبر خطوات موجّهة، تحققات، وتقارير احترافية.",
      ctaScreens: "عرض صور المنتج",
      ctaConsult: "خدمات الاستشارة",

      secWhyTitle: "لماذا TaxCheck؟",
      secWhyP:
        "مصمّم لعمل المحاسبين: إدخال منظّم، تحقق، ومخرجات يمكنك استخدامها بثقة مع العملاء.",
      why1T: "مسارات موجّهة",
      why1D: "خطوات واضحة مع تحققات ونقاط مراجعة.",
      why2T: "مخرجات عملية",
      why2D: "ملمّصات احترافية وقوائم تدقيق وتقارير جاهزة.",
      why3T: "مصمم للـ SMEs",
      why3D: "استخدام يومي سريع وبنية متوافقة ومنطقية.",
      why4T: "ذكاء + قواعد",
      why4D: "اقتراحات ذكية مدعومة بقواعد وتحقيقات ثابتة.",

      secScreensTitle: "صور من داخل المنتج",
      secScreensP:
        "أضف 3 صور من داخل النظام. إذا لم تضفها بعد ستظهر أماكنها كقوالب.",
      screenLabel: "صورة",

      secAboutTitle: "نبذة عنا",
      aboutP:
        "تطوّر Fintech Technologies FZ-LLC برمجيات مالية عملية للمحاسبين والشركات الصغيرة في الإمارات، مع تركيز على الوضوح والالتزام وسير العمل الحقيقي.",

      secConsultTitle: "استشارات مالية وتقنية",
      consultP:
        "نقدم استشارات للأنظمة المالية: تصميم سير العمل، بنية التقارير، الأنظمة الضريبية، وتكاملات ERP.",
      consultCTA: "اطلب استشارة",

      secContactTitle: "اتصل بنا",
      contactP:
        "أرسل رسالة وسنرد عليك بخطوة واضحة ومباشرة.",
      name: "الاسم",
      email: "البريد الإلكتروني",
      company: "الشركة (اختياري)",
      message: "الرسالة",
      send: "إرسال",
      sending: "جاري الإرسال…",
      sent: "تم الإرسال. سنتواصل معك قريبًا.",
      failed: "فشل الإرسال. أعد المحاولة.",

      footer1: "جميع الحقوق محفوظة.",
    };

    return lang === "ar" ? ar : en;
  }, [lang]);

  // ========= Screenshots: بدون أي روابط/لينكات = placeholders فقط =========
  // عندما تضع صور لاحقًا، فقط ضع src فعلي (URL) بدل null
  const screenshots = [
    { src: null, alt: "TaxCheck – Screen 1" },
    { src: null, alt: "TaxCheck – Screen 2" },
    { src: null, alt: "TaxCheck – Screen 3" },
  ];

  // ========= Contact form (فعلي) =========
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [status, setStatus] = useState({ state: "idle", msg: "" }); // idle|sending|success|error

  async function onSubmit(e) {
    e.preventDefault();
    setStatus({ state: "sending", msg: "" });

    try {
      // ✅ غيّر هذا الرابط إذا كان عندك دومين مختلف
      const endpoint = "https://www.taxcheck.ae/api/functions/contact";

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          message: form.message,
          lang,
          source: "landing_page",
        }),
      });

      if (!res.ok) throw new Error("bad_status");

      setStatus({ state: "success", msg: t.sent });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err) {
      setStatus({ state: "error", msg: t.failed });
    }
  }

  return (
    <div dir={t.dir} className="min-h-screen bg-[#F7F9FA] text-slate-900">
      {/* Top background like NetSuite-style (لكن بألواننا) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="tcGlow" />
          <div className="tcShimmer" />
        </div>

        {/* NAV */}
        <div className="relative mx-auto max-w-6xl px-6 pt-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-[#1E2A38] text-white grid place-items-center font-semibold">
                T
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold tracking-tight">{t.brand}</div>
                <div className="text-xs text-slate-500">{t.top}</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm text-slate-600">
              <a className="hover:text-slate-900" href="#screens">{t.navScreens}</a>
              <a className="hover:text-slate-900" href="#about">{t.navAbout}</a>
              <a className="hover:text-slate-900" href="#contact">{t.navContact}</a>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {lang === "en" ? "AR" : "EN"}
              </button>

              <a
                href="/login"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {t.signIn}
              </a>
              <a
                href="/login"
                className="rounded-xl bg-[#2ECC71] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                {t.startFree}
              </a>
            </div>
          </div>

          {/* HERO */}
          <div className="mt-10 grid grid-cols-1 gap-10 pb-14 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-xs font-medium text-slate-600 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#2ECC71]" />
                {t.badge}
              </div>

              <h1 className="mt-6 text-4xl md:text-5xl leading-[1.08] tracking-tight font-semibold text-[#0F172A]">
                {t.h1a}
                <span className="block mt-3 text-slate-700 font-medium">{t.h1b}</span>
              </h1>

              <p className="mt-5 text-base leading-7 text-slate-600">
                {t.heroP}
              </p>

              {/* ✅ الأزرار رجعت */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="/login"
                  className="rounded-xl bg-[#2ECC71] px-6 py-3 text-sm font-semibold text-white hover:opacity-90"
                >
                  {t.startFree}
                </a>
                <a
                  href="#screens"
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  {t.ctaScreens}
                </a>
                <a
                  href="#contact"
                  className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                >
                  {t.ctaConsult}
                </a>
              </div>

              {/* NetSuite-like mini feature strip */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InfoCard title={t.why1T} desc={t.why1D} />
                <InfoCard title={t.why2T} desc={t.why2D} />
              </div>
            </div>

            {/* Right – NetSuite-ish stacked cards */}
            <div className="relative">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-slate-800">{t.secWhyTitle}</div>
                    <div className="mt-1 text-sm text-slate-500">{t.secWhyP}</div>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-700">
                    AI + Rules
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3">
                  <FeatureRow title={t.why3T} desc={t.why3D} />
                  <FeatureRow title={t.why4T} desc={t.why4D} />
                </div>

                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-semibold text-slate-700">
                    {lang === "ar" ? "حالات استخدام شائعة" : "Typical use cases"}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Pill>{lang === "ar" ? "إقرارات VAT" : "VAT Returns"}</Pill>
                    <Pill>{lang === "ar" ? "فترات الضريبة" : "Tax Periods"}</Pill>
                    <Pill>{lang === "ar" ? "مكاتب محاسبة" : "Accounting Firms"}</Pill>
                    <Pill>{lang === "ar" ? "تحقق قبل الإرسال" : "Pre-submission checks"}</Pill>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -right-10 -top-10 hidden h-40 w-40 rounded-full bg-emerald-200/40 blur-3xl md:block" />
              <div className="pointer-events-none absolute -bottom-12 -left-12 hidden h-44 w-44 rounded-full bg-slate-300/40 blur-3xl md:block" />
            </div>
          </div>
        </div>
      </div>

      {/* Screenshots (بدون روابط صور) */}
      <section id="screens" className="mx-auto max-w-6xl px-6 pb-14">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t.secScreensTitle}</h2>
            <p className="mt-2 text-sm text-slate-600">{t.secScreensP}</p>
          </div>
          <a
            href="/login"
            className="hidden md:inline-flex rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 hover:bg-slate-50"
          >
            {lang === "ar" ? "جرّبه الآن" : "Try it"}
          </a>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
          {screenshots.map((s, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-slate-200 bg-white p-3 shadow-sm transition hover:shadow-md"
            >
              <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                {s.src ? (
                  <img
                    src={s.src}
                    alt={s.alt}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-full w-full grid place-items-center px-6 text-center">
                    <div>
                      <div className="text-sm font-semibold text-slate-700">
                        {t.screenLabel} {idx + 1}
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {lang === "ar"
                          ? "ضع صورة من داخل المنتج هنا لاحقًا."
                          : "Add an in-product screenshot here later."}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About + Consulting – NetSuite-like blocks */}
      <section id="about" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{t.secAboutTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t.aboutP}</p>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <MiniCard
                  title={lang === "ar" ? "واجهة واضحة" : "Clarity-first UX"}
                  desc={lang === "ar" ? "أقل ضجيج، أكثر تنظيم." : "Less noise, more structure."}
                />
                <MiniCard
                  title={lang === "ar" ? "الالتزام أولًا" : "Compliance mindset"}
                  desc={lang === "ar" ? "تحققات وإرشاد." : "Validations and guided steps."}
                />
                <MiniCard
                  title={lang === "ar" ? "مخرجات احترافية" : "Accountant-grade outputs"}
                  desc={lang === "ar" ? "تقارير يمكن الاعتماد عليها." : "Clean, reliable reports."}
                />
                <MiniCard
                  title={lang === "ar" ? "مخصص للـ SMEs" : "Built for SMEs"}
                  desc={lang === "ar" ? "سريع للاستخدام اليومي." : "Fast daily usage."}
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold tracking-tight">{t.secConsultTitle}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t.consultP}</p>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-[#F7F9FA] p-6">
                <div className="text-sm font-semibold text-slate-800">
                  {lang === "ar" ? "مجالات الاستشارة" : "Consulting areas"}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Pill>{lang === "ar" ? "الضريبة الاتحادية" : "Corporate Tax"}</Pill>
                  <Pill>{lang === "ar" ? "VAT" : "VAT"}</Pill>
                  <Pill>{lang === "ar" ? "بنية التقارير" : "Reporting"}</Pill>
                  <Pill>{lang === "ar" ? "تكامل ERP" : "ERP Integrations"}</Pill>
                  <Pill>{lang === "ar" ? "تصميم سير العمل" : "Workflow design"}</Pill>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href="#contact"
                    className="rounded-xl bg-[#1E2A38] px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                  >
                    {t.consultCTA}
                  </a>
                  <a
                    href="/login"
                    className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-800 hover:bg-slate-50"
                  >
                    {t.startFree}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact (فعلي) */}
      <section id="contact" className="border-t border-slate-200 bg-[#F7F9FA]">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-start">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{t.secContactTitle}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{t.contactP}</p>

              <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="text-sm font-semibold text-slate-800">
                  {lang === "ar" ? "بيانات التواصل" : "Direct"}
                </div>
                <div className="mt-3 space-y-2 text-sm text-slate-600">
                  <div>
                    <span className="font-medium text-slate-800">Email:</span>{" "}
                    <span>info@taxcheck.ae</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-800">
                      {lang === "ar" ? "الموقع:" : "Location:"}
                    </span>{" "}
                    <span>UAE</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="text-sm font-semibold text-slate-800">
                {lang === "ar" ? "أرسل رسالة" : "Send a message"}
              </div>

              <form className="mt-5 space-y-3" onSubmit={onSubmit}>
                <input
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder={t.name}
                  required
                />
                <input
                  value={form.email}
                  onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder={t.email}
                  type="email"
                  required
                />
                <input
                  value={form.company}
                  onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder={t.company}
                />
                <textarea
                  value={form.message}
                  onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                  rows={5}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  placeholder={t.message}
                  required
                />

                <button
                  type="submit"
                  disabled={status.state === "sending"}
                  className="w-full rounded-xl bg-[#2ECC71] px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
                >
                  {status.state === "sending" ? t.sending : t.send}
                </button>

                {status.state !== "idle" && (
                  <div
                    className={`text-sm ${
                      status.state === "success" ? "text-emerald-700" : "text-red-600"
                    }`}
                  >
                    {status.msg}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="text-sm text-slate-600">
              © {year} <span className="font-medium text-slate-800">TaxCheck</span>. {t.footer1}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <a className="text-slate-600 hover:text-slate-900" href="#screens">
                {t.navScreens}
              </a>
              <a className="text-slate-600 hover:text-slate-900" href="#about">
                {t.navAbout}
              </a>
              <a className="text-slate-600 hover:text-slate-900" href="#contact">
                {t.navContact}
              </a>
              <a className="text-slate-600 hover:text-slate-900" href="/login">
                {t.signIn}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Local CSS (no next/head) */}
      <style>{`
        .tcGlow{
          position:absolute;
          inset:-40% -30%;
          background:
            radial-gradient(circle at 25% 25%, rgba(46,204,113,0.22), transparent 55%),
            radial-gradient(circle at 70% 35%, rgba(30,42,56,0.18), transparent 60%),
            radial-gradient(circle at 45% 80%, rgba(142,68,173,0.10), transparent 60%);
          filter: blur(14px);
        }
        .tcShimmer{
          position:absolute;
          top:-140px;
          left:-45%;
          width:65%;
          height:560px;
          background: linear-gradient(115deg, transparent 0%, rgba(46,204,113,0.10) 45%, transparent 70%);
          transform: rotate(10deg);
          animation: tcShimmerMove 7.5s linear infinite;
          filter: blur(2px);
        }
        @keyframes tcShimmerMove{
          0%{ transform: translateX(0) rotate(10deg); opacity:0.65; }
          50%{ opacity:0.9; }
          100%{ transform: translateX(145%) rotate(10deg); opacity:0.65; }
        }
      `}</style>
    </div>
  );
}

function InfoCard({ title, desc }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="mt-2 text-sm leading-6 text-slate-600">{desc}</div>
    </div>
  );
}

function FeatureRow({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
      {children}
    </span>
  );
}

function MiniCard({ title, desc }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-semibold text-slate-800">{title}</div>
      <div className="mt-1 text-sm text-slate-600">{desc}</div>
    </div>
  );
}
