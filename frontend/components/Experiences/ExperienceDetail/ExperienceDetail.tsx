import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { Button } from "@enk/components/Button";
import ChevronLeft from "@enk/icons/chevronLeft.svg";
import translations from "@enk/translations";
import style from "./experienceDetail.module.scss";

const cx = classNames.bind(style);

export const ExperienceDetail = ({ experience }) => {
	const router = useRouter();
	const { locale } = router;
	const { title, titleNL, summary, summaryNL, tags } = experience || "";
	const { content, contentNL } = experience || undefined;

	// TODO: Add tags on detail page somewhere?
	// const experienceTags = tags.map((tag) => {
	// 	const { name: EnTagTitle, nameNL: NlTagTitle, ...tagsRest } = tag;
	// 	return { ...tagsRest, name: locale === "nl" ? NlTagTitle : EnTagTitle };
	// });

	const dictionary = {
		nl: {
			...translations["nl"].global,
			title: titleNL,
			summary: summaryNL,
			content: contentNL,
		},
		en: {
			...translations["en"].global,
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
				text={dictionary[locale].goBack}
				className={cx(["button"])}
				iconLeft={<ChevronLeft />}
			/>
			<article className={cx("row", ["article"])}>
				<h2 className={cx(["title"])}>{dictionary[locale].title}</h2>
				<p className={cx(["summary"], "text-intro")}>
					{dictionary[locale].summary}
				</p>
				{!!dictionary[locale].content && (
					<div className={cx(["content"], "cms")}>
						<DocumentRenderer document={dictionary[locale].content?.document} />
					</div>
				)}
			</article>
		</>
	);
};
