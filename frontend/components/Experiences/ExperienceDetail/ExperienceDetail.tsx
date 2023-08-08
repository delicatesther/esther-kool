import React from "react";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import classNames from "classnames/bind";
import style from "./experienceDetail.module.scss";
import { useRouter } from "next/router";
import { Button } from "@enk/components/Button";
import ChevronLeft from "@enk/icons/chevronLeft.svg";

const cx = classNames.bind(style);

export const ExperienceDetail = ({ experience }) => {
	const router = useRouter();
	return (
		<>
			<Button
				size="small"
				onClick={() => router.back()}
				text="Go Back"
				className={cx(["button"])}
				iconLeft={<ChevronLeft />}
			/>
			<article className={cx("row", ["article"])}>
				<h2 className={cx(["title"])}>{experience.title}</h2>
				<p className={cx(["summary"], "text-intro")}>{experience.summary}</p>
				<div className={cx(["content"])}>
					<DocumentRenderer document={experience.content.document} />
				</div>
			</article>
		</>
	);
};
