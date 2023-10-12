import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { Avatar } from "@enk/components/Avatar";
import translations from "@enk/translations";
import style from "./businessCard.module.scss";

const cx = classNames.bind(style);

export const BusinessCard = ({}) => {
	const router = useRouter();
	const { locale } = router;
	const dictionary = translations[locale].businessCard;
	return (
		<article className={style.card}>
			<Avatar />
			<h2>
				{dictionary.title}
				<span className="visuallyhidden">
					Esther Kool ({dictionary.pronouns})
				</span>
			</h2>
			<ul className={cx(["list"])}>
				<li aria-hidden={true}>Esther Kool ({dictionary.pronouns})</li>
				<li>{dictionary.jobTitle}</li>
				<li>{dictionary.hobby}</li>
				<li>{dictionary.family}</li>
				<li>{dictionary.afficionado}</li>
			</ul>
		</article>
	);
};
