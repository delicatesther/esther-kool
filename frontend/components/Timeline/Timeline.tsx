import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { useUser } from "@enk/utils";
import { Experience } from "@enk/components/Experiences";
import { ALL_EXPERIENCES_QUERY } from "@enk/lib/resolvers";
import translations from "@enk/translations";
import style from "./timeline.module.scss";

const cx = classNames.bind(style);

export type TimelineExperience = {
	id?: string;
	slug?: string;
	title?: string;
	titleNL?: string;
	summary?: string;
	summaryNL?: string;
	from: string;
	to?: string | null;
	ongoing?: boolean;
	status?: "draft" | "published" | string;
	organisation?: {
		name?: string;
		nameNL?: string;
		logo?: {
			publicUrlTransformed?: string;
			url?: string;
		} | null;
	} | null;
	tags?: Array<{
		id?: string;
		name?: string;
		nameNL?: string;
	}>;
};

type TimelineProps = {
	experiences: TimelineExperience[];
};

function generateYearsBetween(startYear = 2000, endYear) {
	const endDate = endYear || new Date().getFullYear();
	let years = [];

	for (var i = startYear; i <= endDate; i++) {
		years.push(startYear);
		startYear++;
	}
	return years;
}

export const Timeline = ({ experiences }: TimelineProps) => {
	const me = useUser();
	const router = useRouter();
	const locale = (router.locale ?? "nl") as "nl" | "en";

	const dictionary = {
		...translations[locale].experiences,
		...translations[locale].global,
	};

	const sortedExperiences = [...(experiences ?? [])].sort((a, b) =>
		b.from.localeCompare(a.from),
	);

	const items = sortedExperiences.map((experience) => {
		const fromYear = new Date(experience.from).getFullYear();
		const toYear = experience.to
			? new Date(experience.to).getFullYear()
			: fromYear;
		const years = generateYearsBetween(fromYear, toYear);

		return {
			...experience,
			fromYear,
			toYear,
			years,
		};
	});

	return (
		<div className={style.wrapper}>
			<h2>{dictionary.title}</h2>
			<div className={style.container}>
				<div aria-hidden className={style.timelineBar}></div>
				<ol className={style.list}>
					{items.map((experience, index) => {
						if (!me && experience.status === "draft") {
							return null;
						} else {
							return (
								<li
									key={
										experience.id ??
										experience.slug ??
										`${experience.from}-${index}`
									}
									className={cx(
										["listItem"],
										{ even: index % 2 == 1 },
										{ odd: index % 2 == 0 },
										{ ["draft"]: experience.status === "draft" },
									)}
								>
									<Experience {...experience} />
								</li>
							);
						}
					})}
				</ol>
			</div>
		</div>
	);
};
