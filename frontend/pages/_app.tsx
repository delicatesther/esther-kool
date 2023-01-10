import Head from "next/head";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { checkFontLoaded, useSystemTheme } from "@enk/utils";
import { useApollo } from "@enk/lib";
import "../styles/global/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);
  checkFontLoaded();
  const theme = useSystemTheme() || "light";

  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <link rel="icon" href={`/favicon-${theme}.ico`} />
        {/* @ts-ignore */}
        {/* <link href="print.css" rel="stylesheet" media="print" onload="this.media='all'" /> */}
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
