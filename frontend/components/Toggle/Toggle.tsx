import React from "react";
import classNames from "classnames/bind";
import useDarkMode from "use-dark-mode";
import style from "./toggle.module.scss";
import { ToggleAttributes } from "@enk/types";
import { useSystemTheme } from "@enk/utils";

const cx = classNames.bind(style);

export const Toggle = ({
  className = "default",
  size = "normal",
  darkmode = false,
  text,
  icon1,
  icon2,
  tooltips = ["on", "off"],
  id,
  name,
  value,
  checked = null,
  defaultChecked = null,
  onChange,
  input,
  disabled = false,
  ...props
}: ToggleAttributes) => {
  // classNames:
  // 1. Base appearance,
  // 2. optional disabled class,
  // 3. optional extra class to position it within another component
  const classNames = cx([className], ["default"], { ["icons"]: !!icon1 || !!icon2 }, [size], {
    ["disabled"]: disabled,
  });
  const theme = useSystemTheme() || "light";
  const darkMode = useDarkMode(theme === "dark" ? true : false);

  const setOnChange = darkmode ? darkMode.toggle : onChange;

  return (
    <div className={classNames}>
      <input
        type="checkbox"
        aria-checked={checked ? checked : defaultChecked}
        name={name}
        id={id}
        value={value}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={setOnChange}
        {...input}
        disabled={disabled}
      />
      <label htmlFor={id}>
        {icon1 && icon1}
        <span className={style.tooltip}>{tooltips[0]}</span>
        {icon2 && icon2}
        <span className={style.tooltip}>{tooltips[1]}</span>
        {text && <span>{text}</span>}
      </label>
    </div>
  );
};
