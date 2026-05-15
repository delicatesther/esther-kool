import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import translations from "@enk/translations";
import style from "./experience.module.scss";
import { TimelineExperience } from "@enk/components/Timeline";

const cx = classNames.bind(style);

export type ExperienceProps = TimelineExperience & {
	className?: string;
	content?: string;
	contentNL?: string;
};

export const Experience = ({
	id,
	slug,
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
}: ExperienceProps) => {
	const router = useRouter();
	const { locale } = router;
	const experienceTags = tags.map((tag) => {
		const { name: EnTagTitle, nameNL: NlTagTitle, ...tagsRest } = tag;
		return { ...tagsRest, name: locale === "nl" ? NlTagTitle : EnTagTitle };
	});

	const dictionary = {
		nl: {
			...translations.nl,
			title: titleNL ?? title,
			summary: summaryNL ?? summary,
			content: contentNL,
			organisation: organisation?.nameNL,
		},
		en: {
			...translations.en,
			title,
			summary,
			content,
			organisation: organisation?.name,
		},
	};

	const translated = dictionary[locale];
	if (status === "draft") {
		return null;
	}
	const fromYear = new Date(from).getFullYear();
	const toYear = to ? new Date(to).getFullYear() : "";
	return (
		<article className={cx(["experience"], [status], [className])}>
			<div className={style.container}>
				{slug && content?.trim() ? (
					<Link href={`/experience/${slug}`} className={cx(["titleLink"])}>
						<h3 className={cx(["title"])}>{translated.title}</h3>
					</Link>
				) : (
					<h3 className={cx(["titleSingle"], ["title"])}>{translated.title}</h3>
				)}

				<time dateTime={`${fromYear}`} className={style.years}>
					{fromYear}
					{ongoing && !toYear
						? ` - ${translated.experiences.present}`
						: toYear && toYear !== fromYear && ` - ${toYear}`}
				</time>

				{organisation?.logo && (
					<img
						src={`/logos/${organisation.logo}.svg`}
						className={style.logo}
						alt={`Logo ${translated.organisation}`}
						width="80"
					/>
				)}

				<div className={style.tags}>
					{experienceTags.map((tag) => (
						<span key={tag.id} className={style.tag}>
							{tag.name}
						</span>
					))}
				</div>
				{translated.summary && (
					<p className={style.summary}>{translated.summary}</p>
				)}
			</div>
		</article>
	);
};
