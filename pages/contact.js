// pages/contact.js
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
      sub: "Reach out for product inquiries, demos, or consulting.",
      email: "info@TaxCheck.com",
      phone: "+971505523307"
    };
    const ar = {
      title: "تواصل معنا",
      sub: "للاستفسار عن المنتج أو العروض أو الاستشارات.",
      email: "info@TaxCheck.com",
      phone: "+971505523307"
    };
    return lang === "ar" ? ar : en;
  }, [lang]);

  return (
    <div dir={isAR ? "rtl" : "ltr"}>
      <section className="tc-pageHeader">
        <h1 className="tc-h1">{c.title}</h1>
        <p className="tc-sub">{c.sub}</p>
      </section>

      <section className="tc-section">
        <div className="tc-card">
          <div className="tc-contactRow">
            <div className="tc-contactLabel">Email</div>
            <a className="tc-contactValue" href={`mailto:${c.email}`}>{c.email}</a>
          </div>

          <div className="tc-contactRow">
            <div className="tc-contactLabel">Mobile</div>
            <a className="tc-contactValue" href={`tel:${c.phone}`}>{c.phone}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
