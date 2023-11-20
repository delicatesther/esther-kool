import React from "react";
import classNames from "classnames/bind";
import Check from "@enk/icons/check.svg";
import Cross from "@enk/icons/cross.svg";
import style from "./actionFeedbackUI.module.scss";
const cx = classNames.bind(style);

export const ActionFeedbackUI = ({ correctGuess, incorrectGuess }) => {
	return (
		<>
			<span
				className={cx(["feedback"], ["correctFeedback"], {
					["show"]: correctGuess,
				})}
			>
				<Check />
			</span>
			<span
				className={cx(["feedback"], ["incorrectFeedback"], {
					["show"]: incorrectGuess,
				})}
			>
				<Cross />
			</span>
		</>
	);
};
