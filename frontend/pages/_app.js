import { checkFontLoaded, useSystemTheme } from "@enk/utils";
import Head from "next/head";
// import '../styles/globals.css'
import "../styles/global/index.scss";
import { Layout } from "@enk/components/Layout";

function MyApp({ Component, pageProps }) {
  checkFontLoaded();
  const theme = useSystemTheme() || "light";

  return (
    <>
      <Head>
        <link rel="icon" href={`/favicon-${theme}.ico`} />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
