import NavBar from "../components/NavBar";
import Layout from "../components/Layout";

export default function App({Component, pageProps}) {
  return (
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}
