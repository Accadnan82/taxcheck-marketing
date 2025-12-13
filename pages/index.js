import Layout from "../components/Layout";
import { APP_SIGNUP } from "../lib/links";

export default function Home() {
  return (
    <Layout>
      <div className="heroGrid">
        <div className="card">
          <div className="badge">Corporate Tax + VAT • Built for Accountants</div>
          <h1 className="h1">UAE Corporate Tax — بدون تعقيد، بدون أخطاء</h1>
          <p className="p">
            Taxcheck يساعدك على إدارة الشركات، فترات الضريبة، وإقرارات Corporate Tax وVAT
            بخطوات واضحة تقلّل الأخطاء وتوفّر وقت المحاسب وصاحب الشركة.
          </p>

          <div className="ctaRow">
            <a className="btnBig btnBigPrimary" href={APP_SIGNUP}>ابدأ الاشتراك الآن</a>
            <a className="btnBig btnBigSecondary" href="/pricing">شاهد الباقات</a>
          </div>

          <div className="bullets">
            <div className="bullet">
              <div className="bTitle">تقليل الأخطاء</div>
              <div className="bText">توجيه واضح يمنع النسيان ويقلل إدخالات غير منطقية.</div>
            </div>
            <div className="bullet">
              <div className="bTitle">توفير الوقت</div>
              <div className="bText">تنظيم الشركات والفترات والإقرارات بدون ملفات مبعثرة.</div>
            </div>
            <div className="bullet">
              <div className="bTitle">جاهز للمحاسبين</div>
              <div className="bText">واجهة نظيفة وتقارير تساعدك تنجز بسرعة وبثقة.</div>
            </div>
          </div>
        </div>

        <div className="shots">
          <div className="card">
            <h2 className="sectionTitle">Screenshots</h2>
            <div className="shotBox">ضع صورة Dashboard هنا</div>
            <div className="shotBox">ضع صورة CT Wizard هنا</div>
            <div className="shotBox">ضع صورة VAT Returns هنا</div>
          </div>
        </div>
      </div>

      <div style={{ height: 14 }} />

      <div className="card">
        <h2 className="sectionTitle">كيف يعمل؟</h2>
        <div className="grid3">
          <div className="bullet">
            <div className="bTitle">1) أنشئ الشركة</div>
            <div className="bText">سجل بيانات الشركة وفترة الضريبة بسهولة.</div>
          </div>
          <div className="bullet">
            <div className="bTitle">2) اتبع الـ Wizard</div>
            <div className="bText">أسئلة منظمة تعطيك ناتج واضح وتقارير.</div>
          </div>
          <div className="bullet">
            <div className="bTitle">3) راقب التقارير</div>
            <div className="bText">Dashboard وتقارير جاهزة للعرض والمتابعة.</div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

