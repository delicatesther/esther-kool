import React from "react";
import { ButtonProps } from "@enk/types";
import classNames from "classnames/bind";
import style from "./button.module.scss";

const cx = classNames.bind(style);

export const Button = ({ children, text, className, onClick, ...props }: ButtonProps) => {
  return (
    <button {...props} className={cx(["button"], [className])} onClick={onClick}>
      {text && (
        <span className={cx(["text"])} data-text={text}>
          {text}
        </span>
      )}
      {children}
    </button>
  );
};
