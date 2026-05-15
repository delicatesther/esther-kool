import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import style from "./avatar.module.scss";

const cx = classNames.bind(style);

export const Avatar = ({ className = null }) => {
	return (
		<div className={cx(["avatar"], [className])}>
			<div className={cx(["frame"])}>
				<div className={cx(["image"])}>
					<Image
						src={"/me-light-1000.webp"}
						alt="Esther"
						width={200}
						height={200}
					/>
				</div>
			</div>
		</div>
	);
};
