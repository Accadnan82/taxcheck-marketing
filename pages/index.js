import { useState, useMemo } from "react";
import { useRouter } from "next/router";

export default function IndexPage() {
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const isAR = lang === "ar";

  const t = useMemo(
    () => ({
      en: {
        nav: {
          pricing: "Pricing",
          services: "Services",
          about: "About",
          login: "Login",
          lang: "AR",
        },
        hero: {
          h1: "TaxCheck: Smart Automation for Corporate Tax & VAT in the UAE",
          sub:
            "Built for accountants and finance teams. Structured workflows, automated validations, and review-ready outputs aligned with UAE tax regulations.",
          demo: "Request a Demo",
          screens: "View Product Screens",
        },
        featuresTitle: "Powerful Features",
        features: [
          {
            title: "Audit-Level Confidence & Accuracy",
            desc: "Professional-grade validations ensuring clarity and reliable, review-ready outputs.",
          },
          {
            title: "Reduce Errors by up to 90%",
            desc: "Structured inputs and checkpoints that significantly reduce manual mistakes.",
          },
          {
            title: "Easy VAT Return Preparation",
            desc: "Clean, section-based VAT workflows with practical summaries.",
          },
          {
            title: "Consistent Client & Period Management",
            desc: "Organize clients, periods, and filings consistently across teams.",
          },
          {
            title: "Rules-Gated AI Intelligence",
            desc: "AI suggestions validated through deterministic compliance rules.",
          },
          {
            title: "Professional Outputs",
            desc: "Clear summaries, checklists, and reports designed for accountants.",
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
      },

      ar: {
        nav: {
          pricing: "الأسعار",
          services: "الخدمات",
          about: "من نحن",
          login: "تسجيل الدخول",
          lang: "EN",
        },
        hero: {
          h1: "TaxCheck: أتمتة ذكية لضرائب الشركات وVAT في الإمارات",
          sub:
            "مصمم للمحاسبين وفرق المالية. تدفقات عمل منظمة، مصادقات آلية، ومخرجات جاهزة للمراجعة وفق قوانين الضرائب الإماراتية.",
          demo: "طلب عرض توضيحي",
          screens: "شاشات المنتج",
        },
        featuresTitle: "ميزات قوية لإدارة الضرائب",
        features: [
          {
            title: "دقة وثقة على مستوى المراجعة",
            desc: "مصادقات احترافية تضمن الوضوح ومخرجات موثوقة.",
          },
          {
            title: "خفض الأخطاء حتى 90%",
            desc: "مدخلات منظمة ونقاط تفتيش تقلل الأخطاء البشرية.",
          },
          {
            title: "سهولة إعداد إقرارات VAT",
            desc: "تدفق واضح مبني على أقسام مع ملخصات عملية.",
          },
          {
            title: "إدارة متناسقة للعملاء والفترات",
            desc: "تنظيم العملاء والفترات والإيداعات عبر الفرق.",
          },
          {
            title: "ذكاء اصطناعي مضبوط بقواعد",
            desc: "اقتراحات ذكية مدعومة بقواعد امتثال حتمية.",
          },
          {
            title: "مخرجات احترافية",
            desc: "تقارير وملخصات وقوائم تحقق جاهزة للمراجعة.",
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
      },
    }),
    []
  );

  const c = t[lang];

  return (
    <div dir={isAR ? "rtl" : "ltr"} style={{ fontFamily: "Inter, sans-serif" }}>
      {/* NAV */}
      <header style={{ display: "flex", justifyContent: "space-between", padding: 24 }}>
        <strong>TaxCheck</strong>
        <nav style={{ display: "flex", gap: 16 }}>
          <button onClick={() => router.push("/pricing")}>{c.nav.pricing}</button>
          <button onClick={() => router.push("/services")}>{c.nav.services}</button>
          <button onClick={() => router.push("/about")}>{c.nav.about}</button>
          <button onClick={() => setLang(isAR ? "en" : "ar")}>{c.nav.lang}</button>
          <button onClick={() => router.push("/login")}>{c.nav.login}</button>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ padding: "60px 24px", maxWidth: 1100, margin: "auto" }}>
        <h1>{c.hero.h1}</h1>
        <p>{c.hero.sub}</p>
        <div style={{ marginTop: 24 }}>
          <button onClick={() => router.push("/contact")}>{c.hero.demo}</button>
          <button onClick={() => document.getElementById("screens").scrollIntoView()}>
            {c.hero.screens}
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "40px 24px", maxWidth: 1100, margin: "auto" }}>
        <h2>{c.featuresTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {c.features.map((f) => (
            <div key={f.title}>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SCREENS */}
      <section id="screens" style={{ padding: "40px 24px", maxWidth: 1100, margin: "auto" }}>
        <h2>{c.screensTitle}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {c.screens.map((s) => (
            <div key={s.title}>
              <img src={s.img} alt={s.title} style={{ width: "100%" }} />
              <p>{s.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUSTOMERS – BOTTOM */}
      <section style={{ padding: "40px 24px", maxWidth: 1100, margin: "auto" }}>
        <h3>{c.customersTitle}</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 24 }}>
          {c.customers.map((cu) => (
            <img
              key={cu.name}
              src={cu.img}
              alt={cu.name}
              style={{ maxHeight: 40, objectFit: "contain" }}
            />
          ))}
        </div>
      </section>

      <footer style={{ padding: 24, textAlign: "center" }}>© 2024 TaxCheck</footer>
    </div>
  );
}
