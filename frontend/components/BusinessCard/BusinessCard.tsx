import React from "react";
import classNames from "classnames/bind";
import style from "./businessCard.module.scss";
import { Avatar } from "@enk/components/Avatar";
const cx = classNames.bind(style);
import { useRouter } from "next/router";
import translations from "@enk/translations";

export const BusinessCard = ({ src, size }) => {
	const router = useRouter();
	const { locale } = router;
	const SampleText =
		"<sample code /> && not true; .some-class { code-goes-here: #bada55; } Once upon a time in a far away place, the dragon before dreams a Dumbo jazz. The wand quite ate a couple big Ginger Bread Men. A few castles in a bewildered ogre terribly said a proud Dumbo. Dumbos of a forest never walk a couple proud dragons. Ginger Bread Men never run those fast Cinderellas. Both Snow Whites happily find a dazzling tower, and they lived happily ever after.";
	const dictionary = translations[locale].businessCard;
	return (
		<article className={style.card}>
			<Avatar className={style.circle} src={src} size={size} alt="" />
			<h2>{dictionary.title}</h2>
			<ul className={cx(["list"])}>
				<li>Esther Kool ({dictionary.pronouns})</li>
				<li>{dictionary.jobTitle}</li>
				<li>{dictionary.hobby}</li>
				<li>{dictionary.family}</li>
				<li>{dictionary.afficionado}</li>
			</ul>
		</article>
	);
};
