import React from "react";
import { useUser } from "@enk/utils";
import classNames from "classnames/bind";
import style from "./experience.module.scss";
import Link from "next/link";

const cx = classNames.bind(style);

export const Experience = ({
	id,
	title,
	status,
	summary,
	tags,
	from,
	to,
	className,
	organisation,
}) => {
	const me = useUser();

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
			</time>
			<div className={style.container}>
				{organisation && (
					<img src={`/logos/${organisation.logo}.svg`} className={style.logo} />
				)}
				<Link href={`/experience/${id}`} className={style.titleLink}>
					<h3 className={style.title}>
						{title}
						{status === "draft" && " - Draft"}
					</h3>
				</Link>
				<div className={style.tags}>
					{tags.map((tag) => (
						<span key={tag.id} className={style.tag}>
							{tag.name}
						</span>
					))}
				</div>
				{summary && <p className={style.summary}>{summary}</p>}
			</div>
		</article>
	);
};
