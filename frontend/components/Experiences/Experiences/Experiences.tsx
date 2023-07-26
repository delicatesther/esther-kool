import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_EXPERIENCES_QUERY } from "lib/resolvers";
import { Experience } from "../Experience";
import style from "./experiences.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(style);

export const Experiences = () => {
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

	let arr = experiences.map(experience => {
		const { from } = experience;
		const { to  } = experience || '';
		const fromYear = new Date(from).getFullYear();
		const toYear = !!to ? new Date(to).getFullYear() : fromYear;
		const years = generateYearsBetween(fromYear, toYear);
		return {...experience, years, fromYear, toYear};
	})

	let years = [];
	// for (let i = 1987; i <= new Date().getFullYear(); i++) {
	for (let i = 2002; i <= 2010; i++) {
		const year = {
			year: i,
			currentExperiences: [],
			finishedExperiences: [],
			runningExperiences: [],
		};
		years.push(year);
	}

	years.map((year) => {
		const { year: thisYear, currentExperiences, runningExperiences, finishedExperiences } = year;
        // TODO: make experiences inside years numbered (i.e. experience-1, experience-2).
        // Add logic that if an experience OR runningExperience already occurs in the experience's FROM year,
        // the experience's index number is increased (for each previous/running experience).
        // Then: Add the experience index to the className and move it over a column/down a peg!
		arr.map((experience, index) => {
			const { id, title, years: experienceYears, fromYear, toYear } = experience;
			const smallData = {id, title};
			const occursThisYear = experienceYears.includes(thisYear);
			// Experience started this very year
			if (fromYear === thisYear) {
				currentExperiences.push({...experience});
			}
			// Experience continues beyond this year, and hasn't finished yet
			if(occursThisYear && fromYear !== thisYear ) {
				runningExperiences.push(smallData)
			}
			// Experience is in the past, or ends this very year
			if(toYear <= thisYear && occursThisYear) {
				finishedExperiences.push(smallData);
			}
		});
	});

	return (
		<div className={style.experiences}>
			<h2>What I've been up to</h2>
			<div className={style.lists}>
				<ol className={style.yearList} aria-hidden="true">
					{years
						.map((item) => {
							return (
								<li
									key={item.year}
									className={cx(["year"], {[`span-${item.currentExperiences.length + 1}`]: !!item.currentExperiences.length})}>
									{item.year}
								</li>
							);
						})}
				</ol>
				<ol className={style.experienceList}>
					{years
						.map((item) => {
							return (
								<li
									key={item.year}
									className={cx(["experienceListItem"])}
								>
									{!item.currentExperiences.length && (
										<span className={"visuallyhidden"}>{item.year}</span>
									)}
									{item.runningExperiences.map((experience) => (
										<span className={cx(["spacer"])} key={experience.title}></span>
									))}
                                    {item.currentExperiences.map(experience => (
									<Experience
										{...experience}
										key={experience.title}
										className={cx(["experience"])}
									/>
                                    ))}
								</li>
							);
						})}
				</ol>
			</div>
		</div>
	);
};
