import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="fallback-font">
        <div aria-hidden="true" className="visuallyhidden" style={{ fontFamily: "Open Sans" }}>
          &nbsp;
        </div>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
