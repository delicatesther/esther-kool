import React, { forwardRef } from "react";
import Image from "next/image";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { starWarsShips, starWarsImages } from "@enk/lib";
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
	const imageNeeded = starWarsImages.find((image) => image.src.includes(img));
	return (
		<div className={cx(["ship"], className)}>
			{img && (
				<Image
					src={imageNeeded}
					alt={ship}
					width={200}
					height={200}
					className={style.image}
				/>
			)}
		</div>
	);
};
