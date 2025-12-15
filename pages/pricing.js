import React, { useMemo, useState } from "react";
import { APP_SIGNUP } from "../lib/links";

export default function PricingPage() {
  const [lang, setLang] = useState("en");
  const t = useMemo(() => getCopy(lang), [lang]);

  const plans = [
    {
      name: t.p1n,
      price: t.p1p,
      note: t.p1note,
      features: [t.f1, t.f2, t.f3, t.f4],
      highlight: false,
    },
    {
      name: t.p2n,
      price: t.p2p,
      note: t.p2note,
      features: [t.f1, t.f2, t.f3, t.f4, t.f5, t.f6],
      highlight: true,
    },
    {
      name: t.p3n,
      price: t.p3p,
      note: t.p3note,
      features: [t.f1, t.f2, t.f3, t.f4, t.f5, t.f6, t.f7],
      highlight: false,
    },
  ];

  return (
    <div className="page" dir={t.dir}>
      <div className="container">
        <div className="topRow">
          <div>
            <h1 className="h1">{t.title}</h1>
            <p className="p">{t.sub}</p>
          </div>

          <button className="langBtn" onClick={() => setLang(lang === "en" ? "ar" : "en")}>
            {lang === "en" ? "AR" : "EN"}
          </button>
        </div>

        <div className="grid">
          {plans.map((p) => (
            <div key={p.name} className={`card ${p.highlight ? "hi" : ""}`}>
              <div className="planName">{p.name}</div>
              <div className="price">{p.price}</div>
              <div className="note">{p.note}</div>

              <div className="listTitle">{t.includes}</div>
              <ul className="list">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>

              <a className={`cta ${p.highlight ? "ctaHi" : ""}`} href={APP_SIGNUP}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="faq">
          <div className="faqTitle">{t.faqTitle}</div>
          <div className="faqGrid">
            <FaqItem q={t.q1} a={t.a1} />
            <FaqItem q={t.q2} a={t.a2} />
            <FaqItem q={t.q3} a={t.a3} />
            <FaqItem q={t.q4} a={t.a4} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .page { padding: 48px 0 24px; }
        .container { max-width: 1152px; margin: 0 auto; padding: 0 24px; }
        .topRow { display: flex; justify-content: space-between; align-items: flex-start; gap: 14px; }
        .h1 { margin: 0; font-size: 34px; letter-spacing: -0.03em; font-weight: 900; color: #0F172A; }
        .p { margin: 10px 0 0; font-size: 14px; line-height: 1.9; color: #475569; max-width: 75ch; }

        .langBtn {
          background: #fff; border: 1px solid #E5E7EB; color: #0F172A;
          border-radius: 12px; padding: 10px 12px; font-size: 13px; font-weight: 900; cursor: pointer;
        }
        .langBtn:hover { background: #F8FAFC; }

        .grid { margin-top: 18px; display: grid; grid-template-columns: 1fr; gap: 14px; }
        @media (min-width: 980px) { .grid { grid-template-columns: 1fr 1fr 1fr; } }

        .card {
          border: 1px solid #E5E7EB; border-radius: 22px; background: rgba(255,255,255,0.9);
          padding: 18px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
          display: flex; flex-direction: column;
        }
        .hi { border-color: rgba(46,204,113,0.55); box-shadow: 0 10px 30px rgba(46,204,113,0.10); }

        .planName { font-size: 14px; font-weight: 900; color: #0F172A; }
        .price { margin-top: 10px; font-size: 28px; font-weight: 900; letter-spacing: -0.02em; color: #0F172A; }
        .note { margin-top: 6px; font-size: 13px; line-height: 1.7; color: #64748B; }

        .listTitle { margin-top: 14px; font-size: 12px; font-weight: 900; color: #334155; }
        .list { margin: 10px 0 0; padding-left: 18px; color: #475569; line-height: 1.9; font-size: 14px; flex: 1; }
        [dir="rtl"] .list { padding-left: 0; padding-right: 18px; }

        .cta {
          margin-top: 14px;
          display: inline-flex; justify-content: center; align-items: center;
          padding: 12px 14px; border-radius: 12px;
          text-decoration: none; font-size: 13px; font-weight: 900;
          background: #fff; border: 1px solid #E5E7EB; color: #334155;
        }
        .cta:hover { background: #F8FAFC; }
        .ctaHi { background: #2ECC71; color: #fff; border-color: transparent; }
        .ctaHi:hover { opacity: 0.92; }

        .faq { margin-top: 22px; border-top: 1px solid #E5E7EB; padding-top: 18px; }
        .faqTitle { font-size: 14px; font-weight: 900; color: #0F172A; }
        .faqGrid { margin-top: 12px; display: grid; grid-template-columns: 1fr; gap: 12px; }
        @media (min-width: 980px) { .faqGrid { grid-template-columns: 1fr 1fr; } }
      `}</style>
    </div>
  );
}

function FaqItem({ q, a }) {
  return (
    <>
      <div className="faqItem">
        <div className="q">{q}</div>
        <div className="a">{a}</div>
      </div>
      <style jsx>{`
        .faqItem {
          border: 1px solid #E5E7EB; border-radius: 18px; background: rgba(255,255,255,0.9);
          padding: 14px; box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .q { font-size: 13px; font-weight: 900; color: #0F172A; }
        .a { margin-top: 8px; font-size: 14px; line-height: 1.9; color: #475569; }
      `}</style>
    </>
  );
}

function getCopy(lang) {
  const en = {
    dir: "ltr",
    title: "Pricing",
    sub: "Simple plans for accountants and SMEs. Upgrade as your workload grows.",
    includes: "Includes",
    cta: "Start Free",

    p1n: "Starter",
    p1p: "Free",
    p1note: "For trying the workflow and basic organization.",
    p2n: "Professional",
    p2p: "Contact us",
    p2note: "For accountants managing multiple clients and periods.",
    p3n: "Enterprise",
    p3p: "Contact us",
    p3note: "For teams, advanced controls, and tailored workflows.",

    f1: "Taxpayer & period management",
    f2: "Guided Corporate Tax workflow",
    f3: "VAT return preparation structure",
    f4: "Professional summaries",
    f5: "Advanced validations",
    f6: "Export-ready outputs",
    f7: "Priority consulting & onboarding",

    faqTitle: "FAQ",
    q1: "Do I need a subscription to start?",
    a1: "No. Start free to explore workflows. Upgrade when you need advanced features.",
    q2: "Can I use it for multiple clients?",
    a2: "Yes. Professional plan is designed for accountants managing multiple taxpayers.",
    q3: "Do you provide consulting?",
    a3: "Yes. We offer financial and technical consulting for workflows, reporting, and integrations.",
    q4: "Can you tailor the system to our practice?",
    a4: "Yes. Enterprise engagements can include tailored workflows, structures, and onboarding.",
  };

  const ar = {
    dir: "rtl",
    title: "التسعير",
    sub: "خطط بسيطة للمحاسبين والشركات. قم بالترقية مع توسّع عملك.",
    includes: "يشمل",
    cta: "ابدأ مجانًا",

    p1n: "مبتدئ",
    p1p: "مجاني",
    p1note: "لتجربة سير العمل والتنظيم الأساسي.",
    p2n: "احترافي",
    p2p: "تواصل معنا",
    p2note: "للمحاسبين الذين يديرون عدة عملاء وفترات.",
    p3n: "مؤسسات",
    p3p: "تواصل معنا",
    p3note: "للفِرق والتحكم المتقدم وسير عمل مخصص.",

    f1: "إدارة المكلّفين والفترات",
    f2: "مسار الضريبة الاتحادية الموجّه",
    f3: "بنية تجهيز إقرار VAT",
    f4: "ملخصات احترافية",
    f5: "تحققات متقدمة",
    f6: "مخرجات جاهزة للتصدير",
    f7: "استشارات وأونبوردينغ أولوية",

    faqTitle: "أسئلة شائعة",
    q1: "هل أحتاج اشتراك للبدء؟",
    a1: "لا. ابدأ مجانًا لتجربة سير العمل، ثم قم بالترقية عند الحاجة لميزات متقدمة.",
    q2: "هل يمكن استخدامه لعدة عملاء؟",
    a2: "نعم. الخطة الاحترافية مصممة للمحاسبين الذين يديرون عدة مكلّفين.",
    q3: "هل تقدمون استشارات؟",
    a3: "نعم. نقدم استشارات مالية وتقنية لسير العمل والتقارير والتكاملات.",
    q4: "هل يمكن تخصيص النظام لمكتبنا؟",
    a4: "نعم. يمكن تقديم تخصيصات ضمن خطة المؤسسات وسير عمل مخصص وأونبوردينغ.",
  };

  return lang === "ar" ? ar : en;
}
