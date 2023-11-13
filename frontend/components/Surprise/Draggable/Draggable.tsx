import React from "react";
import Image from "next/image";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import { starWarsShips, starWarsImages } from "@enk/lib";
import style from "./draggable.module.scss";
import classNames from "classnames/bind";
import { DraggableItem } from "./DraggableItem";

const cx = classNames.bind(style);
type DraggableProps = {
	id: string;
	className?: string;
	children: React.ReactNode | ReadonlyArray<string> | number;
};
export const Draggable = ({ id, className, children }: DraggableProps) => {
	const { attributes, listeners, setNodeRef, transform } = useDraggable({
		id,
		data: {
			type: `${id}`,
		},
	});

	const draggableStyle = transform
		? {
				opacity: 0.5,
		  }
		: undefined;

	return (
		<DraggableItem
			ref={setNodeRef}
			{...listeners}
			{...attributes}
			style={draggableStyle}
			className={cx(["draggable"], className)}
		>
			{children}
		</DraggableItem>
	);
};
