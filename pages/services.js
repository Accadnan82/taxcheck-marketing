import React, { useEffect, useMemo, useState } from "react";

function useTcLang(defaultLang = "EN") {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("tc_lang");
      if (saved === "AR" || saved === "EN") setLang(saved);
      else setLang(defaultLang);
    } catch (_) {
      setLang(defaultLang);
    }

    const onStorage = (e) => {
      if (e.key === "tc_lang" && (e.newValue === "AR" || e.newValue === "EN")) setLang(e.newValue);
    };
    const onCustom = () => {
      try {
        const saved = localStorage.getItem("tc_lang");
        if (saved === "AR" || saved === "EN") setLang(saved);
      } catch (_) {}
    };

    window.addEventListener("storage", onStorage);
    window.addEventListener("tc_lang_change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("tc_lang_change", onCustom);
    };
  }, [defaultLang]);

  return lang;
}

export default function Services() {
  const lang = useTcLang("EN");
  const isAR = lang === "AR";

  const C = useMemo(
    () => ({
      heading: "#1e3a5f",
      text: "#475569",
      muted: "#64748b",
      bg1: "#ffffff",
      bg2: "#f8fafc",
      border: "#e2e8f0",
      greenFrom: "#10b981",
      greenTo: "#059669",
      useCaseFrom: "#f0fdf4",
      useCaseTo: "#dcfce7",
    }),
    []
  );

  const FONT_STACK =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

  const t = useMemo(() => {
    const EN = {
      hero: {
        kicker: "Services",
        title: "Financial & FinTech Advisory Services",
        desc:
          "From UAE Corporate Tax & VAT readiness to finance automation and system design. Practical deliverables, not generic advice.",
      },
      sections: [
        {
          title: "UAE Corporate Tax & VAT Advisory",
          items: [
            "Corporate Tax workflow setup and review-ready deliverables",
            "VAT return preparation support and internal controls",
            "Risk review and compliance checklist before submission",
            "Documentation structure aligned with UAE requirements",
          ],
        },
        {
          title: "Accounting & Finance Process Design",
          items: [
            "Chart of Accounts structuring (IFRS-friendly)",
            "Period close process design and month-end checklist",
            "Policies: revenue recognition, accruals, provisions",
            "Management reporting structure for CFO-level oversight",
          ],
        },
        {
          title: "Finance Automation & FinTech Consulting",
          items: [
            "Requirements and functional specs for financial software",
            "Validation rules and audit trails (enterprise-grade)",
            "Data import templates and reconciliation workflows",
            "Dashboards, KPIs, and review/approval flows",
          ],
        },
      ],
      cta: {
        title: "Need a tailored proposal?",
        desc: "Use the Contact page to send your company inquiry and we will respond with a clear plan and pricing.",
        button: "Go to Contact",
      },
    };

    const AR = {
      hero: {
        kicker: "الخدمات",
        title: "خدمات الاستشارات المالية والفنتيك",
        desc:
          "من جاهزية ضريبة الشركات والـ VAT في الإمارات إلى أتمتة المالية وتصميم الأنظمة. مخرجات عملية وليست نصائح عامة.",
      },
      sections: [
        {
          title: "استشارات ضريبة الشركات والـ VAT (الإمارات)",
          items: [
            "إعداد سير عمل ضريبة الشركات ومخرجات جاهزة للمراجعة",
            "دعم إعداد إقرار VAT وضوابط داخلية",
            "مراجعة المخاطر وقائمة تدقيق قبل الإرسال",
            "هيكلة المستندات بما يتوافق مع متطلبات الإمارات",
          ],
        },
        {
          title: "تصميم إجراءات المحاسبة والمالية",
          items: [
            "هيكلة دليل الحسابات (متوافق مع IFRS)",
            "تصميم إقفال الفترة وقائمة مهام نهاية الشهر",
            "سياسات: الاعتراف بالإيراد، الاستحقاقات، المخصصات",
            "تقارير إدارة ورقابة بمستوى CFO",
          ],
        },
        {
          title: "أتمتة المالية واستشارات الفنتيك",
          items: [
            "تحليل المتطلبات وكتابة المواصفات الوظيفية للأنظمة المالية",
            "قواعد تحقق وسجلات تدقيق (Enterprise-grade)",
            "قوالب استيراد البيانات ومطابقات وتسويات",
            "لوحات مؤشرات KPIs وتدفقات مراجعة واعتماد",
          ],
        },
      ],
      cta: {
        title: "تحتاج عرضًا مخصصًا؟",
        desc: "استخدم صفحة تواصل معنا لإرسال طلب الشركة وسنرد بخطة واضحة وتسعير.",
        button: "اذهب لصفحة التواصل",
      },
    };

    return isAR ? AR : EN;
  }, [isAR]);

  const S = useMemo(
    () => ({
      page: {
        minHeight: "100vh",
        fontFamily: FONT_STACK,
        background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg1} 60%)`,
        color: C.text,
      },
      main: { maxWidth: 1200, margin: "0 auto", padding: "22px 24px 72px" },

      hero: {
        background: C.bg1,
        border: `1px solid ${C.border}`,
        borderRadius: 18,
        padding: 24,
        boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
      },
      kicker: {
        display: "inline-flex",
        padding: "6px 10px",
        borderRadius: 999,
        border: `1px solid ${C.border}`,
        background: C.bg2,
        color: C.heading,
        fontSize: 13,
        fontWeight: 600,
        marginBottom: 12,
      },
      h2: { fontSize: 48, fontWeight: 700, lineHeight: 1.2, letterSpacing: -0.6, margin: 0, color: C.heading },
      desc: { fontSize: 18, fontWeight: 400, lineHeight: 1.7, color: C.text, margin: "12px 0 0", maxWidth: 980 },

      sectionTitle: { margin: "22px 0 12px", fontSize: 36, fontWeight: 700, color: C.heading, textAlign: "center" },

      grid: { marginTop: 14, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 },
      card: {
        background: C.bg1,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: 18,
        boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
      },
      cardTitle: { fontSize: 20, fontWeight: 600, color: C.heading, margin: "0 0 10px" },
      li: { margin: "8px 0", fontSize: 14, fontWeight: 400, color: C.text, lineHeight: 1.7 },

      cta: {
        marginTop: 18,
        borderRadius: 18,
        border: `1px solid ${C.border}`,
        padding: 18,
        background: `linear-gradient(135deg, ${C.useCaseFrom} 0%, ${C.useCaseTo} 100%)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 14,
        flexWrap: "wrap",
      },
      ctaTitle: { fontSize: 20, fontWeight: 600, color: C.heading, margin: 0 },
      ctaDesc: { fontSize: 14, fontWeight: 400, color: C.text, lineHeight: 1.7, margin: "6px 0 0" },
      btn: {
        fontSize: 16,
        fontWeight: 600,
        padding: "12px 16px",
        borderRadius: 12,
        border: "1px solid transparent",
        background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`,
        color: "#fff",
        cursor: "pointer",
      },

      responsive: `
        @media (max-width: 980px){
          .tc-grid3{ grid-template-columns: 1fr !important; }
        }
      `,
    }),
    [C, FONT_STACK]
  );

  return (
    <div style={S.page} dir={isAR ? "rtl" : "ltr"}>
      <style>{S.responsive}</style>
      <main style={S.main}>
        <section style={S.hero}>
          <div style={S.kicker}>{t.hero.kicker}</div>
          <h2 style={S.h2}>{t.hero.title}</h2>
          <p style={S.desc}>{t.hero.desc}</p>
        </section>

        <div style={S.sectionTitle}>{isAR ? "مجالات الخدمة" : "Service Areas"}</div>

        <section className="tc-grid3" style={S.grid}>
          {t.sections.map((sec, idx) => (
            <div key={idx} style={S.card}>
              <div style={S.cardTitle}>{sec.title}</div>
              <ul style={{ margin: 0, padding: isAR ? "0 18px 0 0" : "0 0 0 18px" }}>
                {sec.items.map((it) => (
                  <li key={it} style={S.li}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section style={S.cta}>
          <div>
            <h3 style={S.ctaTitle}>{t.cta.title}</h3>
            <p style={S.ctaDesc}>{t.cta.desc}</p>
          </div>
          <button type="button" style={S.btn} onClick={() => (window.location.href = "/contact")}>
            {t.cta.button}
          </button>
        </section>
      </main>
    </div>
  );
}
