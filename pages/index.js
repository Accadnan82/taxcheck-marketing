export default function HomePage() {
  return (
    <div className="tc-section">
      {/* حالات الاستخدام النموذجية */}
      <h2 className="tc-sectionTitle">حالات الاستخدام النموذجية</h2>

      <div className="tc-useCasesWrap">
        <div className="tc-useCasesBanner">
          <div style={{ fontWeight: 800, fontSize: 14, marginBottom: 6 }}>
            الإيرادات تحت ضريبة الشركات
          </div>
          <div style={{ fontSize: 12, opacity: 0.9 }}>
            تنظيم الإيرادات، تصنيفها، والتحقق منها قبل تقديم الإقرار.
          </div>
        </div>

        <div className="tc-useCasesGrid">
          <div className="tc-caseCard">
            <div className="tc-caseTitle">شركات محاسبية</div>
            <div className="tc-caseDesc">إدارة عدة عملاء مع سير عمل موحد وتقارير جاهزة.</div>
          </div>

          <div className="tc-caseCard">
            <div className="tc-caseTitle">فروع شركة في الإمارات</div>
            <div className="tc-caseDesc">تقسيم الفترات والملفات حسب الفرع والعميل.</div>
          </div>

          <div className="tc-caseCard">
            <div className="tc-caseTitle">مجموعات عمل متعددة</div>
            <div className="tc-caseDesc">تنظيم الفرق والمهام والتحقق قبل الإرسال.</div>
          </div>
        </div>
      </div>

      {/* مميزات قوية لإدارة الضرائب */}
      <h2 className="tc-sectionTitle" style={{ marginTop: 34 }}>
        مميزات قوية لإدارة الضرائب
      </h2>

      <div className="tc-featureGrid">
        <div className="tc-featureCard">
          <div className="tc-featureHead">سير عمل موجّه</div>
          <div className="tc-featureText">
            خطوات واضحة مع تحققات ونقاط تدقيق قبل الوصول للمخرجات.
          </div>
        </div>

        <div className="tc-featureCard">
          <div className="tc-featureHead">مخرجات احترافية</div>
          <div className="tc-featureText">
            ملخصات وقوائم تدقيق وتقارير جاهزة للمراجعة والمشاركة.
          </div>
        </div>

        <div className="tc-featureCard">
          <div className="tc-featureHead">تحققات تلقائية</div>
          <div className="tc-featureText">
            تقليل الأخطاء عبر قواعد تحقق حتمية قبل اعتماد النتائج.
          </div>
        </div>

        <div className="tc-featureCard">
          <div className="tc-featureHead">مدعوم بالذكاء الاصطناعي</div>
          <div className="tc-featureText">
            اقتراحات ذكية مبنية على قواعد واضحة ومخرجات قابلة للتدقيق.
          </div>
        </div>
      </div>

      {/* عاين واجهات TaxCheck */}
      <h2 className="tc-sectionTitle" style={{ marginTop: 34 }}>
        عاين واجهات TaxCheck
      </h2>

      <div className="tc-screensGrid">
        <div className="tc-screen">Dashboard View</div>
        <div className="tc-screen">Tax Return Flow</div>
        <div className="tc-screen">Reports</div>
      </div>

      {/* ملاحظة: تم حذف قسم "تواصل معنا" والفورم بالكامل حسب طلبك */}
    </div>
  );
}
