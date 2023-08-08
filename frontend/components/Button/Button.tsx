import React from "react";
import { ButtonProps } from "@enk/types";
import classNames from "classnames/bind";
import style from "./button.module.scss";

const cx = classNames.bind(style);

export const Button = ({
	text,
	className,
	onClick,
	size = "large",
	icon,
	iconLeft,
	...props
}: ButtonProps) => {
	return (
		<button
			{...props}
			className={cx(["button"], [size], [className])}
			onClick={onClick}
		>
			{iconLeft && iconLeft}
			{text && (
				<span className={cx(["text"])} data-text={text}>
					{text}
				</span>
			)}
			{icon && icon}
		</button>
	);
};
