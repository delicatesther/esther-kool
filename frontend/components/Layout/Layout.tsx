import React from "react";
import { Header } from "@enk/components/Header";

export const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        <div className="grid-wrapper">{children}</div>
      </main>
      <footer className="footer">&copy; Esther Kool {new Date().getFullYear()}</footer>
    </div>
  );
};
