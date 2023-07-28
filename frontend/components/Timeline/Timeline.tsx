import React from 'react'
import { useQuery } from '@apollo/client';
import { ALL_EXPERIENCES_QUERY } from '@enk/lib';
import { Experience } from "@enk/components/Experiences";
import style from './timeline.module.scss';

export const Timeline = () => {
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

    let arr = experiences.map(experience => {
        const {from, to} = experience || "";
        const fromYear = new Date(from).getFullYear();
		const toYear = !!to ? new Date(to).getFullYear() : fromYear;
        const years = generateYearsBetween(fromYear, toYear);
        return {...experience, fromYear, toYear, years}
    })

  return (
    <div className={style.wrapper}>
        <h3>What I&apos;ve been up to</h3>
        <div className={style.container}>
            <div aria-hidden className={style.timelineBar}>
            </div>
            <ol className={style.list}>
                {
                    arr.map(experience => {
                        const noExperiences = Math.max(experience.years.length, 1);
                        const cssVar = {
                            "--list-item-years": noExperiences,
                        } as React.CSSProperties;
                        return (
                        <li key={experience.id} className={style.listItem} style={{...cssVar}}>
                            <Experience {...experience} />
                        </li>
                        )
                    })
                }
            </ol>
        </div>
    </div>
  )
}
