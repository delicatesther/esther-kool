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
	const { locale } = router;
	const { title, titleNL, summary, summaryNL, tags } = experience || "";
	const { content, contentNL } = experience || undefined;

	const experienceTags = tags.map((tag) => {
		const { name: EnTagTitle, nameNL: NlTagTitle, ...tagsRest } = tag;
		return { ...tagsRest, name: locale === "nl" ? NlTagTitle : EnTagTitle };
	});

	const translations = {
		nl: {
			title: titleNL,
			summary: summaryNL,
			content: contentNL,
		},
		en: {
			title,
			summary,
			content,
		},
	};

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
				<h2 className={cx(["title"])}>{translations[locale].title}</h2>
				<p className={cx(["summary"], "text-intro")}>
					{translations[locale].summary}
				</p>
				{!!translations[locale].content && (
					<div className={cx(["content"])}>
						<DocumentRenderer
							document={translations[locale].content?.document}
						/>
					</div>
				)}
			</article>
		</>
	);
};
