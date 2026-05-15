import { useDroppable } from "@dnd-kit/core";
import React from "react";
import style from "./droppable.module.scss";
import Check from "@enk/icons/check.svg";
import classNames from "classnames/bind";
import { Ship } from "../Ship";

const cx = classNames.bind(style);

export const Droppable = ({ id, ship, desc, img, className, correct }) => {
	const { isOver, node, setNodeRef } = useDroppable({
		id,
		data: {
			accepts: [`${id}`],
		},
	});
	const droppableStyle = {
		transform: isOver ? "scale(1.1)" : undefined,
	};
	return (
		<div
			id={id}
			ref={setNodeRef}
			className={cx(["droppable"], { ["correct"]: correct }, className)}
			style={droppableStyle}
		>
			<h2 className={style.title}>{ship}</h2>
			{isOver && correct && "Correct!"}
			{correct && (
				<>
					<span className={style.check}>
						<Check />
					</span>
					<Ship id={id} ship={ship} img={img} className={style.ship} />
					<p>{desc}</p>
				</>
			)}
		</div>
	);
};
