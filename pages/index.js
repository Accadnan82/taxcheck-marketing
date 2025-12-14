export default function Home() {
  const APP = "https://app.taxcheck.ae";
  const year = new Date().getFullYear();

  const btnPrimary = {
    padding: "12px 16px",
    borderRadius: 12,
    background: "#16a34a",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    boxShadow: "0 14px 28px rgba(22,163,74,0.18)",
    border: "1px solid rgba(22,163,74,0.35)",
  };

  const btnSecondary = {
    padding: "12px 16px",
    borderRadius: 12,
    background: "rgba(15,23,42,0.06)",
    color: "#0f172a",
    textDecoration: "none",
    fontWeight: 900,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "1px solid rgba(15,23,42,0.10)",
  };

  const btnDark = {
    padding: "12px 16px",
    borderRadius: 12,
    background: "#1f4b8f",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 900,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    border: "1px solid rgba(31,75,143,0.35)",
    boxShadow: "0 14px 28px rgba(31,75,143,0.14)",
  };

  const card = {
    borderRadius: 18,
    border: "1px solid rgba(15,23,42,0.10)",
    background: "rgba(255,255,255,0.92)",
    boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
  };

  const sectionTitle = {
    margin: 0,
    fontSize: 20,
    fontWeight: 950,
    color: "#0f172a",
    letterSpacing: -0.2,
  };

  const smallText = { opacity: 0.78, lineHeight: 1.7, fontSize: 14.5 };

  return (
    <div
      style={{
        minHeight: "100vh",
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial",
        background:
          "radial-gradient(1200px 700px at 15% 0%, rgba(34,197,94,0.14), transparent 60%), radial-gradient(900px 600px at 92% 8%, rgba(59,130,246,0.14), transparent 55%), #ffffff",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 950, fontSize: 18, color: "#0f172a" }}>TaxCheck UAE</div>
            <div style={{ opacity: 0.7, fontSize: 13, color: "#0f172a" }}>Corporate Tax · VAT · Free Zone</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`${APP}/onboarding`} style={{ ...btnPrimary, padding: "10px 14px" }}>
              جرّب مجاناً
            </a>

            <a href={`${APP}/login`} style={{ ...btnSecondary, padding: "10px 14px" }}>
              تسجيل الدخول
            </a>

            <a href={`${APP}/pricing`} style={{ ...btnDark, padding: "10px 14px" }}>
              عرض الباقات
            </a>
          </div>
        </div>

        {/* Hero */}
        <div
          style={{
            marginTop: 28,
            padding: 22,
            borderRadius: 18,
            border: "1px solid rgba(15,23,42,0.10)",
            background:
              "radial-gradient(900px 400px at 15% 0%, rgba(34,197,94,0.14), transparent 60%), radial-gradient(900px 400px at 95% 0%, rgba(59,130,246,0.14), transparent 60%), rgba(255,255,255,0.92)",
            boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "6px 10px",
              borderRadius: 999,
              border: "1px solid rgba(15,23,42,0.12)",
              background: "rgba(255,255,255,0.9)",
              fontWeight: 950,
              fontSize: 12,
              marginBottom: 10,
              color: "#0f172a",
            }}
          >
            Corporate Tax + VAT • مدعوم بالذكاء الصناعي
          </div>

          <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1.1, color: "#0f172a", letterSpacing: -0.6 }}>
            إدارة Corporate Tax وVAT في الإمارات
            <br />
            بخطوات واضحة وتقارير عملية
          </h1>

          <p style={{ marginTop: 12, marginBottom: 16, opacity: 0.82, fontSize: 16, lineHeight: 1.7, color: "#0f172a" }}>
            التسجيل مجاني ✔️ — استعراض قبل الدفع ✔️ — أول فعل حقيقي داخل النظام يتطلب اشتراك ✔️
          </p>

          {/* IMPORTANT: Add CTA inside hero (people see it first) */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
            <a href={`${APP}/onboarding`} style={btnPrimary}>
              ابدأ الآن (مجاني)
            </a>
            <a href={`${APP}/login`} style={btnSecondary}>
              لدي حساب — تسجيل الدخول
            </a>
            <a href={`${APP}/pricing`} style={btnDark}>
              عرض الباقات
            </a>
          </div>
        </div>

        {/* Value grid */}
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
          <div style={{ ...card, padding: 16 }}>
            <div style={{ fontWeight: 950, marginBottom: 6, color: "#0f172a" }}>Corporate Tax Filing Wizard</div>
            <div style={smallText}>خطوات موجهة لإعداد الإقرار وتجنّب الأخطاء الشائعة.</div>
          </div>
          <div style={{ ...card, padding: 16 }}>
            <div style={{ fontWeight: 950, marginBottom: 6, color: "#0f172a" }}>VAT 201 + VAT Returns</div>
            <div style={smallText}>إدارة VAT Periods وVAT Returns مع تقارير واضحة.</div>
          </div>
          <div style={{ ...card, padding: 16 }}>
            <div style={{ fontWeight: 950, marginBottom: 6, color: "#0f172a" }}>Alerts + Dashboard</div>
            <div style={smallText}>تنبيهات المواعيد + لوحة مؤشرات تساعدك تتابع وضع الشركات بسرعة.</div>
          </div>
        </div>

        {/* How it works */}
        <div style={{ marginTop: 16, ...card, padding: 18 }}>
          <h2 style={sectionTitle}>كيف يعمل؟</h2>
          <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 12 }}>
            {[
              { n: "1", t: "أنشئ شركة", d: "أضف بيانات Taxpayer بسهولة." },
              { n: "2", t: "حدد الفترة", d: "Tax Periods منظمة بدون ملفات." },
              { n: "3", t: "ابدأ الـ Wizard", d: "Corporate Tax أو VAT بخطوات." },
              { n: "4", t: "احفظ وراجع", d: "Draft / Calculated / Filed." },
            ].map((x) => (
              <div key={x.n} style={{ border: "1px solid rgba(15,23,42,0.10)", borderRadius: 14, padding: 12, background: "rgba(255,255,255,0.75)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 10,
                      background: "rgba(31,75,143,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 950,
                      color: "#1f4b8f",
                    }}
                  >
                    {x.n}
                  </div>
                  <div style={{ fontWeight: 950, color: "#0f172a" }}>{x.t}</div>
                </div>
                <div style={smallText}>{x.d}</div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`${APP}/onboarding`} style={btnPrimary}>
              جرّب الآن (مجاني)
            </a>
            <a href={`${APP}/pricing`} style={btnDark}>
              عرض الباقات
            </a>
          </div>
        </div>

        {/* Pricing teaser */}
        <div style={{ marginTop: 16, ...card, padding: 18 }}>
          <h2 style={sectionTitle}>التسعير</h2>
          <p style={{ ...smallText, marginTop: 8, marginBottom: 12 }}>
            تسجيل مجاني واستعراض قبل الدفع. أول استخدام فعلي (مثل بدء Filing Wizard أو تنزيل تقرير) يتطلب اشتراك.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
            <div style={{ border: "1px solid rgba(15,23,42,0.10)", borderRadius: 16, padding: 14 }}>
              <div style={{ fontWeight: 950, color: "#0f172a" }}>Starter</div>
              <div style={{ fontSize: 28, fontWeight: 950, marginTop: 6, color: "#0f172a" }}>79 AED</div>
              <div style={{ ...smallText, marginTop: 4 }}>شهرياً</div>
              <div style={{ ...smallText, marginTop: 10 }}>للشركات الصغيرة وملف واحد أو ملفين.</div>
            </div>
            <div style={{ border: "2px solid rgba(22,163,74,0.35)", borderRadius: 16, padding: 14, background: "rgba(22,163,74,0.05)" }}>
              <div style={{ fontWeight: 950, color: "#0f172a" }}>Pro</div>
              <div style={{ fontSize: 28, fontWeight: 950, marginTop: 6, color: "#0f172a" }}>149 AED</div>
              <div style={{ ...smallText, marginTop: 4 }}>شهرياً</div>
              <div style={{ ...smallText, marginTop: 10 }}>مناسب للمحاسبين وإدارة عدة شركات.</div>
            </div>
            <div style={{ border: "1px solid rgba(15,23,42,0.10)", borderRadius: 16, padding: 14 }}>
              <div style={{ fontWeight: 950, color: "#0f172a" }}>Firm</div>
              <div style={{ fontSize: 28, fontWeight: 950, marginTop: 6, color: "#0f172a" }}>Custom</div>
              <div style={{ ...smallText, marginTop: 4 }}>للمكاتب</div>
              <div style={{ ...smallText, marginTop: 10 }}>صلاحيات متعددة + إعدادات خاصة.</div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`${APP}/pricing`} style={btnDark}>
              افتح صفحة الأسعار
            </a>
            <a href={`${APP}/onboarding`} style={btnPrimary}>
              جرّب مجاناً
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginTop: 16, ...card, padding: 18 }}>
          <h2 style={sectionTitle}>أسئلة شائعة</h2>
          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            <div style={{ border: "1px solid rgba(15,23,42,0.10)", borderRadius: 14, padding: 12 }}>
              <div style={{ fontWeight: 950, color: "#0f172a" }}>هل التسجيل مجاني؟</div>
              <div style={smallText}>نعم. يمكنك التسجيل واستعراض النظام. أول إجراء فعلي داخل النظام يتطلب اشتراك.</div>
            </div>
            <div style={{ border: "1px solid rgba(15,23,42,0.10)", borderRadius: 14, padding: 12 }}>
              <div style={{ fontWeight: 950, color: "#0f172a" }}>هل يدعم Corporate Tax وVAT؟</div>
              <div style={smallText}>نعم. يوجد صفحات وWizards لكلا النظامين ضمن التطبيق.</div>
            </div>
            <div style={{ border: "1px solid rgba(15,23,42,0.10)", borderRadius: 14, padding: 12 }}>
              <div style={{ fontWeight: 950, color: "#0f172a" }}>هل هو بديل عن مستشار ضريبي؟</div>
              <div style={smallText}>
                لا. هو نظام تنظيم وتنفيذ وتقارير، يساعدك تعمل الصح وتقلل الأخطاء وتجمع البيانات بشكل واضح.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href={`${APP}/onboarding`} style={btnPrimary}>
              ابدأ الآن
            </a>
            <a href={`${APP}/login`} style={btnSecondary}>
              تسجيل الدخول
            </a>
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 18, opacity: 0.72, fontSize: 12, color: "#0f172a" }}>
          © {year} Fintech Technologies FZ-LLC · support@fintechtech.com
        </div>
      </div>
    </div>
  );
}
