import React from "react";
import { Button } from "@enk/components/Button";
import Check from "@enk/icons/check.svg";
import classNames from "classnames/bind";
import style from "./checkListItem.module.scss";

const cx = classNames.bind(style);

export const CheckListItem = ({
	lang,
	id,
	title,
	titleNL,
	description,
	descriptionNL,
	checked,
	handleSave,
	tags,
}) => {
	const name = lang === "nl" ? titleNL : title;
	const desc = lang === "nl" ? descriptionNL : description;

	const item = {
		id,
		title,
		checked,
	};

	return (
		<div className={style.item}>
			<p className={style.name}>{name}</p>
			<p className={cx(["desc"], "text-small")}>{desc}</p>
			<Button
				className={style.checkbox}
				onClick={() => handleSave(item)}
				type="button"
				checkbox={true}
				icon={!!checked ? <Check /> : null}
			/>
		</div>
	);
};
