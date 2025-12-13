import Layout from ..componentsLayout;

export default function About() {
  return (
    Layout
      div className=card
        h1 className=h1 style={{ fontSize 38 }}About Taxcheckh1
        p className=p
          Taxcheck منصة تساعد الشركات والمحاسبين في الإمارات على تنظيم Corporate Tax وVAT
          عبر خطوات واضحة وتقارير تسهّل اتخاذ القرار وتقليل الأخطاء.
        p

        div className=grid2
          div className=bullet
            div className=bTitleهدفناdiv
            div className=bTextتبسيط الالتزام الضريبي بدون تعقيد ولا فوضى ملفات.div
          div
          div className=bullet
            div className=bTitleلمن؟div
            div className=bTextللمحاسبين، مكاتب التدقيق، وأصحاب الشركات الصغيرة والمتوسطة.div
          div
        div
      div
    Layout
  );
}
