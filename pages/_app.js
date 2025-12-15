import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import PublicLayout from "../components/PublicLayout";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // ✅ كل الصفحات التسويقية
  const marketingRoutes = ["/", "/about", "/pricing", "/services"];
  const isMarketing = marketingRoutes.includes(router.pathname);

  if (isMarketing) {
    return (
      <PublicLayout>
        <Component {...pageProps} />
      </PublicLayout>
    );
  }

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
