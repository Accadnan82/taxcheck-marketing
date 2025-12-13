import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="card">
        <h1 className="h1" style={{ fontSize: 38 }}>
          About Taxcheck
        </h1>

        <p className="p">
          Taxcheck هو نظام مبسّط لمساعدة الشركات والمحاسبين في الإمارات
          على الالتزام بضريبة الشركات وضريبة القيمة المضافة بدون تعقيد.
        </p>

        <div className="grid2">
          <div className="bullet">
            <div className="bTitle">رؤيتنا</div>
            <div className="bText">
              تبسيط الالتزام الضريبي وتقليل الأخطاء.
            </div>
          </div>

          <div className="bullet">
            <div className="bTitle">الفئة المستهدفة</div>
            <div className="bText">
              المحاسبون، مكاتب التدقيق، والشركات الصغيرة والمتوسطة.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
