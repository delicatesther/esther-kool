import React, { forwardRef } from "react";
import Image from "next/image";
import { starWarsImages } from "@enk/lib";
import style from "./ship.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);
export type ShipProps = {
	id: string;
	ship: string;
	img: string;
	className?: string;
};

export const Ship = ({ id, ship, img, className }: ShipProps) => {
	const dreadnought = "executor-class-star-dreadnought";
	const imageNeeded = starWarsImages.find((image) => image.src.includes(img));
	return (
		<div className={cx(["ship"], className)}>
			{img && id !== dreadnought && (
				<Image
					src={imageNeeded}
					alt={ship}
					width={200}
					height={200}
					className={style.image}
				/>
			)}
			{img && id === dreadnought && (
				<Image
					src={imageNeeded}
					alt={ship}
					width={500}
					height={184}
					className={style.dreadnought}
				/>
			)}
		</div>
	);
};
