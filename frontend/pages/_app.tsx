import Head from "next/head";
import { AppProps } from "next/app";
import { checkFontLoaded, useSystemTheme } from "@enk/utils";
import { ThemeProvider } from "next-themes";
import "../styles/global/index.scss";

function MyApp({ Component, pageProps }: AppProps) {
	checkFontLoaded();
	const theme = useSystemTheme() || "light";

	return (
		<>
			<Head>
				<link rel="icon" href={`/favicon-${theme}.ico`} />
			</Head>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
