import React from "react";
import { ButtonProps } from "@enk/types";
import classNames from "classnames/bind";
import style from "./button.module.scss";
import Check from "@enk/icons/check.svg";
const cx = classNames.bind(style);

export const Button = ({
	text,
	className,
	onClick,
	size = "large",
	icon,
	iconLeft,
	checkbox = false,
	disabled = false,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			className={cx(
				["button"],
				[size],
				[className],
				{
					["checkbox"]: checkbox,
				},
				{ ["disabled"]: disabled },
			)}
			onClick={onClick}
		>
			{iconLeft && iconLeft}
			{text && (
				<span className={cx(["text"])} data-text={text}>
					{text}
				</span>
			)}
			{icon && icon}
			{checkbox && <span className={style.fakeButton}></span>}
		</button>
	);
};
