import classNames from "classnames/bind";
import { useRouter } from "next/router";
import { Button } from "@enk/components/Button";
import ChevronLeft from "@enk/icons/chevronLeft.svg";
import translations from "@enk/translations";
import style from "./experienceDetail.module.scss";

const cx = classNames.bind(style);

export const ExperienceDetail = ({ experience }) => {
	const router = useRouter();
	const { locale } = router;
	const isNl = locale === "nl";
	const title = isNl
		? experience?.titleNL ?? experience?.title
		: experience?.title ?? experience?.titleNL;
	const summary = isNl
		? experience?.summaryNL ?? experience?.summary
		: experience?.summary ?? experience?.summaryNL;
	const content: string | undefined = experience?.content;

	const globalDictionary = translations[locale as "nl" | "en"].global;

	return (
		<>
			<Button
				size="small"
				onClick={() => router.back()}
				text={globalDictionary.goBack}
				className={cx(["button"])}
				iconLeft={<ChevronLeft />}
			/>
			<article className={cx("row", ["article"])}>
				<h2 className={cx(["title"])}>{title}</h2>
				{summary && <p className={cx(["summary"], "text-intro")}>{summary}</p>}
				{!!content && (
					<div
						className={cx(["content"], "cms")}
						dangerouslySetInnerHTML={{ __html: content }}
					/>
				)}
			</article>
		</>
	);
};
