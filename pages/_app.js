import "../styles/globals.css";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import PublicLayout from "../components/PublicLayout";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  const marketingRoutes = ["/", "/about", "/pricing"];
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
