import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import style from "./collectionCard.module.scss";
import { useRouter } from "next/router";

const cx = classNames.bind(style);

export const CollectionCard = ({
	id,
	title,
	titleNL,
	description,
	descriptionNL,
	checked,
	checkedHidden,
	handleSave,
	image,
	tags,
}) => {
	const router = useRouter();
	const { locale } = router;
	const name = locale === "nl" ? titleNL : title;
	const item = {
		id,
		title,
		checked,
	};
	const cardNumber = name.match(/\d+/)[0];

	return (
		<div
			className={cx(
				["item"],
				{ ["checked"]: checked },
				{ ["hidden"]: checkedHidden },
			)}
		>
			{image !== null ? (
				<Image
					src={image.image.publicUrlTransformed}
					alt={name}
					width={56}
					height={84}
				/>
			) : (
				<p className={style.name}>{name.replace(/[0-9]/g, "")}</p>
			)}
			<span className={style.cardNumber}>{cardNumber}</span>
		</div>
	);
};
