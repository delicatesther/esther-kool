import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_EXPERIENCES_QUERY } from "@enk/lib";
import { Experience } from "@enk/components/Experiences";
import style from "./timeline.module.scss";
import classNames from "classnames/bind";
import translations from "@enk/translations";
import { useRouter } from "next/router";

const cx = classNames.bind(style);

export const Timeline = () => {
	const router = useRouter();
	const { locale } = router;
	const dictionary = {
		...translations[locale].experiences,
		...translations[locale].global,
	};
	const { data, loading, error } = useQuery(ALL_EXPERIENCES_QUERY, {
		variables: {
			orderBy: [
				{
					from: "desc",
				},
			],
		},
	});

	if (error) return null;
	if (loading) return <p>Loading...</p>;
	const { experiences } = data || [];

	function generateYearsBetween(startYear = 2000, endYear) {
		const endDate = endYear || new Date().getFullYear();
		let years = [];

		for (var i = startYear; i <= endDate; i++) {
			years.push(startYear);
			startYear++;
		}
		return years;
	}

	let arr = experiences.map((experience) => {
		const { from, to } = experience || "";
		const fromYear = new Date(from).getFullYear();
		const toYear = !!to ? new Date(to).getFullYear() : fromYear;
		const years = generateYearsBetween(fromYear, toYear);
		return { ...experience, fromYear, toYear, years };
	});
	return (
		<div className={style.wrapper}>
			<h2>{dictionary.title}</h2>
			<div className={style.container}>
				<div aria-hidden className={style.timelineBar}></div>
				<ol className={style.list}>
					{arr.map((experience, index) => {
						return (
							<li
								key={experience.id}
								className={cx(
									["listItem"],
									{ even: index % 2 == 0 },
									{ ["draft"]: experience.status === "draft" },
								)}
							>
								<Experience {...experience} />
							</li>
						);
					})}
				</ol>
			</div>
		</div>
	);
};
