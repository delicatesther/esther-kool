import { DndContext, DragOverlay } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import { Draggable } from "../Draggable";
import { Droppable } from "../Droppable";
import { starWarsShips } from "@enk/lib";
import slugify from "slugify";
import style from "./shipGame.module.scss";
import { Ship } from "../Ship/Ship";

export const ShipGame = () => {
	const [activeId, setActiveId] = useState(undefined);
	const [correctlyDragged, setCorrectlyDragged] = useState([]);
	const [notDraggedYet, setNotDraggedYet] = useState(starWarsShips);

	const activeShipProps = starWarsShips.find((ship) => ship.id === activeId);

	useEffect(() => {
		const shipsInRandomOrder = starWarsShips.sort(() => Math.random() - 0.5);
		setNotDraggedYet(shipsInRandomOrder);
		return () => {};
	}, [setNotDraggedYet]);

	function handleDragStart(event) {
		setActiveId(event.active.id);
	}

	function handleDragEnd(event) {
		setActiveId(undefined);
		const { active, over } = event;
		let newArr = [...notDraggedYet];

		if (over) {
			const correctItemDragged = over.data.current.accepts.includes(
				active.data.current.type,
			);
			if (correctItemDragged) {
				const { id } = event.over;
				const itemNotInArr = correctlyDragged.indexOf(id) === -1;
				const arr = itemNotInArr ? [...correctlyDragged, id] : correctlyDragged;
				setCorrectlyDragged(arr);

				let newerArr = newArr.filter((x) => x.id !== id);
				setNotDraggedYet(newerArr);
			}
		}
	}

	return (
		<div className={style.wrapper}>
			<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
				{notDraggedYet.map((obj) => {
					return (
						<Draggable id={obj.id} className={style.draggable} key={obj.ship}>
							<Ship {...obj} />
						</Draggable>
					);
				})}
				{starWarsShips.map((obj) => {
					const correct = correctlyDragged.indexOf(obj.id) >= 0;
					return (
						<Droppable
							id={slugify(obj.ship, {
								remove: /[*+~.()'"!:@]/g,
								lower: true,
							})}
							correct={correct}
							key={obj.ship}
							className={style.droppable}
							{...obj}
						/>
					);
				})}
				<DragOverlay
					className={style.overlay}
					dropAnimation={{
						duration: 500,
						easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
					}}
				>
					{activeId ? <Ship {...activeShipProps} /> : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
};
