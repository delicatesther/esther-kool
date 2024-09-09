import React from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import style from "./collectionCard.module.scss";
import { useRouter } from "next/router";
import slugify from "slugify";

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

	const filteredTags = tags?.filter((item) => item.name !== "Collection Cards");
	const category = filteredTags[0]?.name;

	const categorySlug =
		category &&
		slugify(category, {
			remove: /[*+~.()'"!:@]/g,
			lower: true,
		});
	return (
		<div
			className={cx(
				["item"],
				{ ["checked"]: checked },
				{ ["hidden"]: checkedHidden },
				[categorySlug],
			)}
		>
			{image !== null ? (
				<div className={style.image}>
					<Image
						src={image.image.publicUrlTransformed}
						alt={name}
						fill={true}
						sizes="(max-width: 768px) 20vw, 88px"
					/>
					<p className={style.nameBig}>{name.replace(/[0-9]/g, "")}</p>
				</div>
			) : (
				<p className={style.name}>{name.replace(/[0-9]/g, "")}</p>
			)}
			<span className={style.cardNumber}>{cardNumber}</span>
		</div>
	);
};
