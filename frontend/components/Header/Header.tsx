import React from "react";
import useDarkMode from "use-dark-mode";
import classNames from "classnames/bind";
import Link from "next/link";
import EstherKool from "@enk/icons/estherkool.svg";
import { Toggle } from "@enk/components/Toggle";
import Sun from "@enk/icons/sun.svg";
import Moon from "@enk/icons/moon.svg";
import { useSystemTheme, useUser } from "@enk/utils";
import { Button } from "@enk/components/Button";
import { SignOut } from "@enk/components/User";
import style from "./header.module.scss";

const cx = classNames.bind(style);

export const Header = () => {
  const theme = useSystemTheme() || "light";
  const darkMode = useDarkMode(theme === "dark" ? true : false);
  const user = useUser();

  return (
    <header className={cx(["header"], "header")}>
      <Link href="/">
        <a className={cx(["link"], ["logo"])}>
          <EstherKool title="Go to homepage Esther Kool" />
        </a>
      </Link>
      <div className={style.content}>
        {user && (
          <>
            <Link href="/gezondheid">
              <a className="anchor">Gezondheid</a>
            </Link>
            <SignOut />
          </>
        )}
        {!user && (
          <Button anchor={true} href="/signin">
            Sign in
          </Button>
        )}
        <Toggle
          id="darkmodeToggleHeader"
          size="large"
          tooltips={["Light Mode", "Dark Mode"]}
          icon1={<Sun />}
          icon2={<Moon />}
          checked={!!darkMode.value}
          darkmode={true}
        />
      </div>
    </header>
  );
};
