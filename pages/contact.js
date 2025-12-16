import React, { useEffect, useMemo, useState } from "react";

export default function ContactPage() {
  const [lang, setLang] = useState("ar");
  const isAR = lang === "ar";

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

  const c = useMemo(() => {
    const en = {
      title: "Contact",
      sub: "Request a demo or ask a compliance question.",
      email: "info@taxcheck.ae",
      cta1: "Request a Demo",
      cta2: "Email us",
    };
    const ar = {
      title: "تواصل معنا",
      sub: "اطلب عرضاً توضيحياً أو اسأل سؤال امتثال.",
      email: "info@taxcheck.ae",
      cta1: "طلب عرض توضيحي",
      cta2: "راسلنا عبر البريد",
    };
    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <section className="tc-section">
        <h1 className="tc-pageTitle">{c.title}</h1>
        <p className="tc-pageSub">{c.sub}</p>

        <div className="tc-contactCard">
          <div className="tc-contactLine">
            <strong>{isAR ? "البريد:" : "Email:"}</strong> {c.email}
          </div>

          <div className="tc-contactActions">
            <a className="tc-btnPrimary" href="https://app.taxcheck.ae/request-demo">
              {c.cta1}
            </a>
            <a className="tc-btn" href={`mailto:${c.email}`}>
              {c.cta2}
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        .tc-pageTitle {
          text-align: center;
          font-size: 34px;
          margin: 10px 0 6px;
          color: #0b1220;
          font-weight: 900;
        }
        .tc-pageSub {
          text-align: center;
          max-width: 820px;
          margin: 0 auto 18px;
          color: #64748b;
          font-weight: 650;
          line-height: 1.7;
        }
        .tc-contactCard {
          max-width: 760px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(229, 231, 235, 0.92);
          border-radius: 16px;
          padding: 18px;
          box-shadow: 0 14px 34px rgba(15, 23, 42, 0.08);
        }
        .tc-contactLine {
          color: #0b1220;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .tc-contactActions {
          display: flex;
          gap: 10px;
          justify-content: center;
          flex-wrap: wrap;
        }
      `}</style>
    </div>
  );
}
