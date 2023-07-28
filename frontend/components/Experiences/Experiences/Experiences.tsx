import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_EXPERIENCES_QUERY } from "lib/resolvers";
import { Experience } from "../Experience";
import style from "./experiences.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

const YearList = ({ years }) => {
	return (
		<ol className={style.yearList} aria-hidden="true">
			{years
				.map((item) => {
					const noExperiences = Math.max(item.experiences.length, 1);
					const cssVar = {
						"--experience-list-item-height": noExperiences,
					} as React.CSSProperties;

					return (
						<li key={item.year} className={cx(["year"])} style={cssVar}>
							<span>{item.year}</span>
						</li>
					);
				})
				.reverse()}
		</ol>
	);
};

export const Experiences = () => {
	let years = [];
	const { data, loading, error } = useQuery(ALL_EXPERIENCES_QUERY, {
		variables: {
			orderBy: [
				{
					from: "desc",
				},
			],
		},
	});

	if (error) return <p>Error!</p>;
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
		const { from } = experience;
		const { to } = experience || "";
		const fromYear = new Date(from).getFullYear();
		const toYear = !!to ? new Date(to).getFullYear() : fromYear;
		const fromMonth = new Date(from).getMonth() + 1;
		const toMonth = !!to ? new Date(to).getMonth() : fromMonth + 1;
		const years = generateYearsBetween(fromYear, toYear);
		return { ...experience, years, fromYear, toYear, fromMonth, toMonth };
	});


	for (let i = 1987; i <= new Date().getFullYear(); i++) {
		const year = {
			year: i,
			currentExperiences: [],
			finishedExperiences: [],
			runningExperiences: [],
			experiences: [],
		};
		years.push(year);
	}

	years.map((year) => {
		const {
			year: thisYear,
			currentExperiences,
			runningExperiences,
			finishedExperiences,
		} = year;
		arr.map((experience, index) => {
			const {
				id,
				title,
				years: experienceYears,
				fromYear,
				toYear,
			} = experience;
			const smallData = { id, title };
			const occursThisYear = experienceYears.includes(thisYear);
			// Experience started this very year
			if (fromYear === thisYear) {
				currentExperiences.push({ ...experience, current: true });
			}
			// Experience continues beyond this year, and hasn't finished yet
			if (occursThisYear && fromYear !== thisYear && toYear !== thisYear) {
				runningExperiences.push({ ...smallData, current: false });
			}
			// Experience is in the past, or ends this very year
			if (toYear === thisYear && occursThisYear) {
				finishedExperiences.push({ ...smallData, current: false });
			}
			year.experiences = [...runningExperiences, ...currentExperiences];
		});
	});

	console.log(years);
	return (
		<div className={style.experiences}>
			<h2>What I&apos;ve been up to</h2>
			<div className={style.lists}>
				<YearList years={years} />
				<ol className={style.experienceList}>
					{years
						.map((item, index) => {
							const nextYear = years[index + 1];
							const lastYear = years[index - 1];
							const hasCurrentExperiences = !!item.currentExperiences.length;
							const noExperiences = Math.max(item.experiences.length, 1);
							const cssVar = {
								"--experience-list-item-height": noExperiences,
							} as React.CSSProperties;

							if (!hasCurrentExperiences) {
								return (
									<li
										data-year={item.year}
										key={item.year}
										className={cx(["experienceListItem"], ["hideMobile"])}
									>
										<span className={"visuallyhidden"}>{item.year}</span>
									</li>
								);
							} else {
								return (
									<li
										data-year={item.year}
										key={item.year}
										className={cx(["experienceListItem"], {
											[`span-${item.experiences.length + 1}`]:
												item.experiences.length,
										})}
										style={cssVar}
									>
										{item.experiences.map((experience) => {

											if (!experience.current) {
												return (
													<span
														className={cx(["spacer"])}
														key={`${experience.id}-${index}`}
													></span>
												);
											} else {
												const gridRows = experience.years.length > 1 ? "1 / -1" : `${experience.fromMonth} / ${experience.toMonth + 1}`;
												return (
													<Experience
														{...experience}
														key={experience.id}
														className={cx(["experience"])}
														style={{gridRow: gridRows }}
													/>
												);
											}
										})}
									</li>
								);
							}
						})
						.reverse()}
				</ol>
			</div>
		</div>
	);
};
