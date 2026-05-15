import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import style from "./avatar.module.scss";
import { useTheme } from "next-themes";

const cx = classNames.bind(style);

export const Avatar = ({ className = null }) => {
	const theme = useTheme();
	const isLight = theme.theme === "light";
	return (
		<div className={cx(["avatar"], [className])}>
			<div className={cx(["frame"])}>
				<div className={cx(["image"])}>
					<Image
						src={isLight ? "/me-light-1000.webp" : "/me-dark.webp"}
						alt="Esther"
						width={200}
						height={200}
					/>
				</div>
			</div>
		</div>
	);
};
