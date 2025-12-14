export default function Home() {
  const APP = "https://app.taxcheck.ae";

  return (
    <div style={{ minHeight: "100vh", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: 18 }}>TaxCheck UAE</div>
            <div style={{ opacity: 0.7, fontSize: 13 }}>Corporate Tax · VAT · Free Zone</div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href={`${APP}/onboarding`}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "#16a34a",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              جرّب مجاناً
            </a>

            <a
              href={`${APP}/login`}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(15,23,42,0.06)",
                color: "#0f172a",
                textDecoration: "none",
                fontWeight: 900,
                border: "1px solid rgba(15,23,42,0.10)",
              }}
            >
              تسجيل الدخول
            </a>

            <a
              href={`${APP}/pricing`}
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "#1f4b8f",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
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
              "radial-gradient(900px 400px at 15% 0%, rgba(34,197,94,0.14), transparent 60%), radial-gradient(900px 400px at 95% 0%, rgba(59,130,246,0.14), transparent 60%), #ffffff",
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
              fontWeight: 900,
              fontSize: 12,
              marginBottom: 10,
            }}
          >
            Corporate Tax + VAT • مدعوم بالذكاء الصناعي
          </div>

          <h1 style={{ margin: 0, fontSize: 40, lineHeight: 1.1 }}>
            إدارة Corporate Tax وVAT في الإمارات
            <br />
            بخطوات واضحة وتقارير عملية
          </h1>

          <p style={{ marginTop: 12, marginBottom: 0, opacity: 0.8, fontSize: 16, lineHeight: 1.7 }}>
            التسجيل مجاني ✔️ — استعراض قبل الدفع ✔️ — أول فعل حقيقي داخل النظام يتطلب اشتراك ✔️
          </p>
        </div>

        {/* Footer */}
        <div style={{ marginTop: 18, opacity: 0.7, fontSize: 12 }}>
          © {new Date().getFullYear()} Fintech Technologies FZ-LLC · support@fintechtech.com
        </div>
      </div>
    </div>
  );
}
