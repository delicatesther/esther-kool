import { DndContext, DragOverlay } from "@dnd-kit/core";
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { Draggable } from "../Draggable";
import { Droppable } from "../Droppable";
import { starWarsShips } from "@enk/lib";
// import { testStarWarsShips } from "@enk/lib";
import slugify from "slugify";
import style from "./shipGame.module.scss";
import { Ship } from "../Ship/Ship";
import { shuffle } from "@enk/utils";
import Check from "@enk/icons/check.svg";
import Cross from "@enk/icons/cross.svg";

const cx = classNames.bind(style);

export const ShipGame = () => {
	// const starWarsShips = testStarWarsShips;
	const [activeId, setActiveId] = useState(undefined);
	const [hideCompleted, setHideCompleted] = useState(false);
	const [correctlyDragged, setCorrectlyDragged] = useState([]);
	const [incorrect, setIncorrect] = useState(0);
	const [incorrectDrag, setInCorrectDrag] = useState(false);
	const [correctDrag, setCorrectDrag] = useState(false);
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
	}, [setNotDraggedYet, setRandomShips, starWarsShips]);

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
				setCorrectDrag(true);
				setTimeout(() => {
					setCorrectDrag(false);
				}, 500);
				const { id } = event.over;
				const itemNotInArr = correctlyDragged.indexOf(id) === -1;
				const arr = itemNotInArr ? [...correctlyDragged, id] : correctlyDragged;
				setCorrectlyDragged(arr);

				let newerArr = newArr.filter((x) => x.id !== id);
				setNotDraggedYet(newerArr);
			} else {
				const count = incorrect;
				setInCorrectDrag(true);
				setTimeout(() => {
					setInCorrectDrag(false);
				}, 500);
				setIncorrect(count + 1);
			}
		}
	}

	function resetGame() {
		setCompleted(false);
		setCorrectlyDragged([]);
		setNotDraggedYet(shuffle([...starWarsShips]));
		setIncorrect(0);
	}

	return (
		<>
			<div className={style.galaxy}></div>
			<span
				className={cx(["feedback"], ["correctFeedback"], {
					["show"]: correctDrag,
				})}
			>
				<Check />
			</span>
			<span
				className={cx(["feedback"], ["incorrectFeedback"], {
					["show"]: incorrectDrag,
				})}
			>
				<Cross />
			</span>
			<div className={style.dashboard}>
				<button className={style.hideBtn} onClick={resetGame}>
					{completed ? "Play again" : "Reset"}
				</button>
				{!!correctlyDragged.length && (
					<button
						className={style.hideBtn}
						onClick={() => setHideCompleted(!hideCompleted)}
					>
						{hideCompleted ? "Show" : "Hide"} Completed
					</button>
				)}
				<span className={cx(["correctScore"], { ["flash"]: correctDrag })}>
					Correct: {correctlyDragged.length}
				</span>
				<span className={cx(["incorrectScore"], { ["flash"]: incorrectDrag })}>
					Incorrect: {incorrect}
				</span>
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
							<Draggable
								id={obj.id}
								className={cx(["draggable"], {
									dreadnought: obj.id === "executor-class-star-dreadnought",
								})}
								key={obj.ship}
							>
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
