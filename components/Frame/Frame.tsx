import Image from "next/image";
import React from "react";
import classNames from "classnames/bind";
import style from "./frame.module.scss";

const cx = classNames.bind(style);

export const Frame = ({ className = null, image }) => {
	const { alt, src, orientation, description } = image;
	return (
		<figure className={cx(["figure", [orientation], [className]])}>
			<div className={cx(["frame"])}>
				<div className={cx(["image"])}>
					<Image
						src={src}
						alt={alt}
						width={orientation === "horizontal" ? 297 : 210}
						height={orientation === "horizontal" ? 210 : 297}
					/>
				</div>
			</div>
			{description && <figcaption>{description}</figcaption>}
		</figure>
	);
};
