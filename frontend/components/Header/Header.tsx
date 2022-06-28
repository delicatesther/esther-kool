import React from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import EstherKool from "@enk/icons/estherkool.svg";
import { Toggle } from "@enk/components/Toggle";
import style from "./header.module.scss";
import Sun from "@enk/icons/sun.svg";
import Moon from "@enk/icons/moon.svg";
import useDarkMode from "use-dark-mode";
import { useSystemTheme } from "@enk/utils";

const cx = classNames.bind(style);

export const Header = () => {
  const theme = useSystemTheme() || "light";
  const darkMode = useDarkMode(theme === "dark" ? true : false);
  return (
    <header className={cx(["header"], "header")}>
      <Link href="/">
        <a className={style.link}>
          <EstherKool title="Go to homepage Esther Kool" />
        </a>
      </Link>
      <Toggle
        id="darkmodeToggleHeader"
        size="large"
        tooltips={["Light Mode", "Dark Mode"]}
        icon1={<Sun />}
        icon2={<Moon />}
        checked={!!darkMode.value}
        darkmode={true}
      />
    </header>
  );
};
