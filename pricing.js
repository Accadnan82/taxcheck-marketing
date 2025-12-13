import Layout from "../components/Layout";
import { APP_SIGNUP } from "../lib/links";

export default function Pricing() {
  return (
    <Layout>
      <div className="card">
        <h1 className="h1" style={{ fontSize: 38 }}>Pricing</h1>
        <p className="p">اختر باقة بسيطة. ابدأ اليوم، وفعّل التطبيق خلال دقائق.</p>

        <div className="grid2">
          <div className="card priceCard">
            <h3>Starter</h3>
            <div className="small">لشركة واحدة + أساسيات CT وVAT</div>
            <div className="price">$29<span className="small">/month</span></div>
            <ul className="small" style={{ lineHeight: 1.8 }}>
              <li>Taxpayers + Periods</li>
              <li>CT Wizard + Reports</li>
              <li>VAT Wizard + Returns</li>
            </ul>
            <div className="ctaRow">
              <a className="btnBig btnBigPrimary" href={APP_SIGNUP}>Subscribe</a>
            </div>
          </div>

          <div className="card priceCard">
            <h3>Pro</h3>
            <div className="small">لمكاتب المحاسبة (عدة شركات)</div>
            <div className="price">$79<span className="small">/month</span></div>
            <ul className="small" style={{ lineHeight: 1.8 }}>
              <li>Multiple Companies</li>
              <li>Advanced Reports</li>
              <li>Filing History</li>
            </ul>
            <div className="ctaRow">
              <a className="btnBig btnBigPrimary" href={APP_SIGNUP}>Subscribe</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
