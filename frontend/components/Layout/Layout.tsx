import React from "react";
import { Header } from "@enk/components/Header";
import Triangle from "/public/images/triangle-bg.svg";
export const Layout = ({ children }) => {
  return (
    <>
    <div className="wrapper">
      <div className="triangle">
        <div className="triangleBg">
          <Triangle role="presentation" />
        </div>
      </div>
      <Header />
      <main className="main">
        <div className="grid-wrapper">{children}</div>
      </main>
      <footer className="footer">&copy; Esther Kool {new Date().getFullYear()}</footer>
    </div>
    </>
  );
};
