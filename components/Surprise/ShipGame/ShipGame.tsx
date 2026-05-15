// import { testStarWarsShips } from "@enk/lib";
import slugify from "slugify";
import classNames from "classnames/bind";
import React, { useEffect, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { useStopwatch } from "react-timer-hook";
import { starWarsShips } from "@enk/lib";
import { shuffle } from "@enk/utils";
import { Draggable } from "../Draggable";
import { Droppable } from "../Droppable";
import { Ship } from "../Ship";
import { GalaxyBg } from "../GalaxyBg";
import { Confetti } from "../Confetti";
import { ActionFeedbackUI } from "../ActionFeedbackUI";
import style from "./shipGame.module.scss";

// const starWarsShips = testStarWarsShips;
const cx = classNames.bind(style);

export const ShipGame = () => {
	const { seconds, minutes, isRunning, start, reset, pause } = useStopwatch({
		autoStart: false,
	});
	const [activeId, setActiveId] = useState(undefined);
	const [gameStarted, setGameStarted] = useState(false);
	const [correctGuess, setCorrectGuess] = useState(false);
	const [incorrectGuess, setIncorrectGuess] = useState(false);
	const [correctItems, setCorrectItems] = useState([]);
	const [numberIncorrect, setNumberIncorrect] = useState(0);
	const [hideCompleted, setHideCompleted] = useState(false);
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
			pause();
			setCompleted(true);
		}
	}, [notDraggedYet, pause]);

	function handleDragStart(event) {
		setActiveId(event.active.id);
		if (!gameStarted) {
			start();
			setGameStarted(true);
		}
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
				setCorrectGuess(true);
				setTimeout(() => {
					setCorrectGuess(false);
				}, 500);
				const { id } = event.over;
				const itemNotInArr = correctItems.indexOf(id) === -1;
				const arr = itemNotInArr ? [...correctItems, id] : correctItems;
				setCorrectItems(arr);

				let newerArr = newArr.filter((x) => x.id !== id);
				setNotDraggedYet(newerArr);
			} else {
				const count = numberIncorrect;
				setIncorrectGuess(true);
				setTimeout(() => {
					setIncorrectGuess(false);
				}, 500);
				setNumberIncorrect(count + 1);
			}
		}
	}

	function resetGame() {
		setGameStarted(false);
		reset(null, false);
		setCompleted(false);
		setCorrectItems([]);
		setNotDraggedYet(shuffle([...starWarsShips]));
		setNumberIncorrect(0);
	}

	return (
		<>
			{completed && <Confetti />}
			<GalaxyBg />
			<ActionFeedbackUI
				correctGuess={correctGuess}
				incorrectGuess={incorrectGuess}
			/>
			<div className={style.dashboard}>
				<button className={style.hideBtn} onClick={resetGame}>
					{completed ? "Play again" : "Reset"}
				</button>
				{!!correctItems.length && (
					<button
						className={style.hideBtn}
						onClick={() => setHideCompleted(!hideCompleted)}
					>
						{hideCompleted ? "Show" : "Hide"} Completed
					</button>
				)}
				<span className={cx(["correctScore"], { ["flash"]: correctGuess })}>
					Correct: {correctItems.length}
				</span>
				<span className={cx(["incorrectScore"], { ["flash"]: incorrectGuess })}>
					Incorrect: {numberIncorrect}
				</span>
				<div>
					<span>{minutes}</span>:<span>{seconds}</span>
				</div>
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
						? "Yay! You fixed it! Je cadeaus liggen links onderin de blauwe kast!"
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
						const correct = correctItems.indexOf(obj.id) >= 0;
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
