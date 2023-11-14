import { DndContext, DragOverlay } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Draggable } from "../Draggable";
import { Droppable } from "../Droppable";
import { starWarsShips } from "@enk/lib";
import slugify from "slugify";
import style from "./shipGame.module.scss";
import { Ship } from "../Ship/Ship";
import { shuffle } from "@enk/utils";

const cx = classNames.bind(style);

export const ShipGame = () => {
	const [activeId, setActiveId] = useState(undefined);
	const [hideCompleted, setHideCompleted] = useState(false);
	const [correctlyDragged, setCorrectlyDragged] = useState([]);
	const [randomShips, setRandomShips] = useState(starWarsShips);
	const [notDraggedYet, setNotDraggedYet] = useState(starWarsShips);
	const [completed, setCompleted] = useState(false);

	const activeShipProps = starWarsShips.find((ship) => ship.id === activeId);

	useEffect(() => {
		const arr = shuffle(starWarsShips);
		let arr2 = shuffle([...starWarsShips]);
		setNotDraggedYet(arr);
		setRandomShips(arr2);

		return () => {};
	}, [setNotDraggedYet, setRandomShips]);

	useEffect(() => {
		if (!notDraggedYet.length) {
			setCompleted(true);
		}
	}, [notDraggedYet]);

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

	function resetGame() {
		setCompleted(false);
		setCorrectlyDragged([]);
		setNotDraggedYet(shuffle([...starWarsShips]));
	}

	return (
		<>
			<div className={style.galaxy}></div>
			<div className={style.btns}>
				{completed && (
					<button className={style.hideBtn} onClick={resetGame}>
						Play again
					</button>
				)}
				<button
					className={style.hideBtn}
					onClick={() => setHideCompleted(!hideCompleted)}
				>
					{hideCompleted ? "Show" : "Hide"} Completed
				</button>
			</div>
			<div
				className={cx(
					["wrapper"],
					{ ["hideCompleted"]: hideCompleted },
					{ ["completed"]: completed },
				)}
			>
				<h1 className={style.title}>
					{completed
						? "Yay! You fixed it!"
						: "Fly the ships to their correct type please!"}
				</h1>
				<DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
					{notDraggedYet.map((obj) => {
						return (
							<Draggable id={obj.id} className={style.draggable} key={obj.ship}>
								<Ship {...obj} />
							</Draggable>
						);
					})}
					{randomShips.map((obj) => {
						const correct = correctlyDragged.indexOf(obj.id) >= 0;
						return (
							<Droppable
								id={slugify(obj.ship, {
									remove: /[*+~.()'"!:@]/g,
									lower: true,
								})}
								correct={correct}
								key={obj.ship}
								className={cx(["droppable"], {
									["hide"]: hideCompleted && correct,
									["correct"]: correct,
								})}
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
		</>
	);
};
