import { checkFontLoaded } from "@enk/utils";

// import '../styles/globals.css'
import "../styles/global/index.scss";
function MyApp({ Component, pageProps }) {
  checkFontLoaded();
  return <Component {...pageProps} />;
}

export default MyApp;
