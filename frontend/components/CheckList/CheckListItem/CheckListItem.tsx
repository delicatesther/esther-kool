import React from "react";
import { Button } from "@enk/components/Button";
import Check from "@enk/icons/check.svg";
import classNames from "classnames/bind";
import style from "./checkListItem.module.scss";
import { useRouter } from "next/router";

const cx = classNames.bind(style);

export const CheckListItem = ({
	id,
	title,
	titleNL,
	description,
	descriptionNL,
	checked,
	checkedHidden,
	handleSave,
	tags,
}) => {
	const router = useRouter();
	const { locale } = router;
	const name = locale === "nl" ? titleNL : title;
	const desc = locale === "nl" ? descriptionNL : description;
	const item = {
		id,
		title,
		checked,
	};

	return (
		<div
			className={cx(
				["item"],
				{ ["checked"]: checked },
				{ ["hidden"]: checkedHidden },
			)}
		>
			<p className={style.name}>{name}</p>
			<p className={cx(["desc"], "text-small")}>{desc}</p>
			<div className={style.tags}>
				{tags.map((tag) => {
					const tagName = locale === "nl" ? tag.nameNL : tag.name;
					if (tag.name !== "Packing") {
						return <span key={tag.id}>{tagName}</span>;
					}
				})}
			</div>
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
