import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import translations from "@enk/translations";
import { useUser } from "@enk/utils";
import style from "./experience.module.scss";

const cx = classNames.bind(style);

export const Experience = ({
	id,
	title,
	titleNL,
	status,
	summary,
	summaryNL,
	tags,
	from,
	to,
	ongoing,
	className,
	organisation,
	content,
	contentNL,
}) => {
	const me = useUser();
	const router = useRouter();
	const { locale } = router;
	const experienceTags = tags.map((tag) => {
		const { name: EnTagTitle, nameNL: NlTagTitle, ...tagsRest } = tag;
		return { ...tagsRest, name: locale === "nl" ? NlTagTitle : EnTagTitle };
	});

	const dictionary = {
		nl: {
			...translations.nl,
			title: titleNL,
			summary: summaryNL,
			content: contentNL,
		},
		en: {
			...translations.en,
			title,
			summary,
			content,
		},
	};

	const translated = dictionary[locale];
	if (!me && status === "draft") {
		return null;
	}
	const fromYear = new Date(from).getFullYear();
	const toYear = to ? new Date(to).getFullYear() : "";
	return (
		<article className={cx(["experience"], [status], [className])}>
			<time dateTime={`${fromYear}`} className={style.years}>
				{fromYear}
				{toYear && toYear !== fromYear && ` - ${toYear}`}
				{ongoing && ` - ${translated.experiences.present}`}
			</time>
			<div className={style.container}>
				{organisation && (
					<img src={`/logos/${organisation.logo}.svg`} className={style.logo} />
				)}
				{!!content?.document[0]?.children[0]?.text?.length ? (
					<Link href={`/experience/${id}`} className={style.titleLink}>
						<h3 className={style.title}>
							{translated.title}
							{status === "draft" && " - Draft"}
						</h3>
					</Link>
				) : (
					<h3 className={cx(["titleSingle"], ["title"])}>
						{translated.title}
						{status === "draft" && " - Draft"}
					</h3>
				)}
				<div className={style.tags}>
					{experienceTags.map((tag) => (
						<span key={tag.id} className={style.tag}>
							{tag.name}
						</span>
					))}
				</div>
				{summary && <p className={style.summary}>{translated.summary}</p>}
			</div>
		</article>
	);
};
