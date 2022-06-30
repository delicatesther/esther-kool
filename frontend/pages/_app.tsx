import Head from "next/head";
import App from "next/app";
import Cookies from "universal-cookie";
import { consts } from "@enk/lib";
import { checkFontLoaded, useSystemTheme } from "@enk/utils";
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

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  const cookies = new Cookies(appContext.ctx.req.headers.cookie);
  const password = cookies.get(consts.SiteReadCookie) ?? "";

  if (password === "hodor") {
    appProps.pageProps.hasReadPermission = true;
  }
  return { ...appProps };
};

export default MyApp;
