import React, { useEffect, useMemo, useState } from "react";

function useTcLang(defaultLang = "EN") {
  const [lang, setLang] = useState(defaultLang);

  useEffect(() => {
    const read = () => {
      try {
        const v = localStorage.getItem("tc_lang");
        if (v === "AR" || v === "EN") setLang(v);
      } catch (_) {}
    };
    read();

    const onStorage = (e) => {
      if (e.key === "tc_lang" && (e.newValue === "AR" || e.newValue === "EN")) {
        setLang(e.newValue);
      }
    };
    const onCustom = () => read();

    window.addEventListener("storage", onStorage);
    window.addEventListener("tc_lang_change", onCustom);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("tc_lang_change", onCustom);
    };
  }, [defaultLang]);

  return lang;
}

export default function Contact() {
  const lang = useTcLang("EN");
  const isAR = lang === "AR";

  // 🎨 TaxCheck colors (canonical)
  const C = {
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
  };

  const FONT_STACK =
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif";

  const t = useMemo(() => {
    const EN = {
      hero: {
        kicker: "Contact",
        title: "Get in touch",
        desc: "For company inquiries or career opportunities, choose the relevant section below.",
      },
      companies: {
        title: "For Companies",
        desc: "Questions about Corporate Tax, VAT, or TaxCheck software.",
        name: "Full name",
        company: "Company name",
        email: "Email",
        phone: "Phone",
        message: "Message",
        submit: "Send Company Inquiry",
      },
      careers: {
        title: "Careers",
        desc: "Interested in joining our team? Send us your details.",
        name: "Full name",
        email: "Email",
        phone: "Phone",
        position: "Position / Role",
        message: "Message",
        submit: "Send Application",
      },
    };

    const AR = {
      hero: {
        kicker: "تواصل معنا",
        title: "تواصل معنا",
        desc: "لاستفسارات الشركات أو فرص التوظيف، اختر القسم المناسب أدناه.",
      },
      companies: {
        title: "للشركات",
        desc: "استفسارات حول ضريبة الشركات أو VAT أو نظام TaxCheck.",
        name: "الاسم الكامل",
        company: "اسم الشركة",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        message: "الرسالة",
        submit: "إرسال استفسار الشركة",
      },
      careers: {
        title: "التوظيف",
        desc: "هل ترغب بالانضمام إلى فريقنا؟ أرسل بياناتك.",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        position: "المسمى الوظيفي",
        message: "الرسالة",
        submit: "إرسال طلب التوظيف",
      },
    };

    return isAR ? AR : EN;
  }, [isAR]);

  // 🧾 State – Companies
  const [cName, setCName] = useState("");
  const [cCompany, setCCompany] = useState("");
  const [cEmail, setCEmail] = useState("");
  const [cPhone, setCPhone] = useState("");
  const [cMessage, setCMessage] = useState("");

  // 🧾 State – Careers
  const [jName, setJName] = useState("");
  const [jEmail, setJEmail] = useState("");
  const [jPhone, setJPhone] = useState("");
  const [jPosition, setJPosition] = useState("");
  const [jMessage, setJMessage] = useState("");

  const S = {
    page: {
      minHeight: "100vh",
      fontFamily: FONT_STACK,
      background: `linear-gradient(180deg, ${C.bg2} 0%, ${C.bg1} 60%)`,
      color: C.text,
    },
    main: { maxWidth: 1100, margin: "0 auto", padding: "22px 24px 72px" },

    hero: {
      background: C.bg1,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: 24,
      boxShadow: "0 14px 34px rgba(15,23,42,0.08)",
      marginBottom: 22,
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
      marginBottom: 10,
    },
    h2: { fontSize: 48, fontWeight: 700, lineHeight: 1.2, color: C.heading, margin: 0 },
    desc: { fontSize: 18, lineHeight: 1.7, marginTop: 10 },

    grid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },

    card: {
      background: C.bg1,
      border: `1px solid ${C.border}`,
      borderRadius: 16,
      padding: 20,
      boxShadow: "0 10px 26px rgba(15,23,42,0.06)",
    },
    cardTitle: { fontSize: 24, fontWeight: 700, color: C.heading, marginBottom: 6 },
    cardDesc: { fontSize: 14, color: C.muted, marginBottom: 14 },

    label: { fontSize: 13, fontWeight: 600, marginBottom: 6, display: "block" },
    input: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      marginBottom: 10,
      fontSize: 14,
      fontFamily: FONT_STACK,
    },
    textarea: {
      width: "100%",
      padding: "10px 12px",
      borderRadius: 10,
      border: `1px solid ${C.border}`,
      marginBottom: 12,
      fontSize: 14,
      fontFamily: FONT_STACK,
      minHeight: 90,
    },
    btn: {
      padding: "12px 16px",
      borderRadius: 12,
      border: "1px solid transparent",
      background: `linear-gradient(135deg, ${C.greenFrom} 0%, ${C.greenTo} 100%)`,
      color: "#fff",
      fontSize: 16,
      fontWeight: 600,
      cursor: "pointer",
    },
  };

  return (
    <div style={S.page} dir={isAR ? "rtl" : "ltr"}>
      <main style={S.main}>
        <section style={S.hero}>
          <div style={S.kicker}>{t.hero.kicker}</div>
          <h2 style={S.h2}>{t.hero.title}</h2>
          <p style={S.desc}>{t.hero.desc}</p>
        </section>

        <section style={S.grid}>
          {/* Companies */}
          <div style={S.card}>
            <div style={S.cardTitle}>{t.companies.title}</div>
            <div style={S.cardDesc}>{t.companies.desc}</div>

            <label style={S.label}>{t.companies.name}</label>
            <input style={S.input} value={cName} onChange={(e) => setCName(e.target.value)} />

            <label style={S.label}>{t.companies.company}</label>
            <input style={S.input} value={cCompany} onChange={(e) => setCCompany(e.target.value)} />

            <label style={S.label}>{t.companies.email}</label>
            <input style={S.input} value={cEmail} onChange={(e) => setCEmail(e.target.value)} />

            <label style={S.label}>{t.companies.phone}</label>
            <input style={S.input} value={cPhone} onChange={(e) => setCPhone(e.target.value)} />

            <label style={S.label}>{t.companies.message}</label>
            <textarea style={S.textarea} value={cMessage} onChange={(e) => setCMessage(e.target.value)} />

            <button
              style={S.btn}
              type="button"
              onClick={() => {
                const subject = encodeURIComponent("Company Inquiry – TaxCheck");
                const body = encodeURIComponent(
                  `Name: ${cName}\nCompany: ${cCompany}\nEmail: ${cEmail}\nPhone: ${cPhone}\n\nMessage:\n${cMessage}`
                );
                window.location.href = `mailto:info@taxcheck.ae?subject=${subject}&body=${body}`;
              }}
            >
              {t.companies.submit}
            </button>
          </div>

          {/* Careers */}
          <div style={S.card}>
            <div style={S.cardTitle}>{t.careers.title}</div>
            <div style={S.cardDesc}>{t.careers.desc}</div>

            <label style={S.label}>{t.careers.name}</label>
            <input style={S.input} value={jName} onChange={(e) => setJName(e.target.value)} />

            <label style={S.label}>{t.careers.email}</label>
            <input style={S.input} value={jEmail} onChange={(e) => setJEmail(e.target.value)} />

            <label style={S.label}>{t.careers.phone}</label>
            <input style={S.input} value={jPhone} onChange={(e) => setJPhone(e.target.value)} />

            <label style={S.label}>{t.careers.position}</label>
            <input style={S.input} value={jPosition} onChange={(e) => setJPosition(e.target.value)} />

            <label style={S.label}>{t.careers.message}</label>
            <textarea style={S.textarea} value={jMessage} onChange={(e) => setJMessage(e.target.value)} />

            <button
              style={S.btn}
              type="button"
              onClick={() => {
                const subject = encodeURIComponent("Career Application – TaxCheck");
                const body = encodeURIComponent(
                  `Name: ${jName}\nEmail: ${jEmail}\nPhone: ${jPhone}\nPosition: ${jPosition}\n\nMessage:\n${jMessage}`
                );
                window.location.href = `mailto:careers@taxcheck.ae?subject=${subject}&body=${body}`;
              }}
            >
              {t.careers.submit}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
