import classNames from "classnames/bind";
import Image from "next/image";
import { useRouter } from "next/router";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { Button } from "@enk/components/Button";
import ChevronLeft from "@enk/icons/chevronLeft.svg";
import translations from "@enk/translations";
import style from "./plantDetail.module.scss";

const cx = classNames.bind(style);

export const PlantDetail = ({ plant }) => {
	const router = useRouter();
	const { locale } = router;
	const { title } = plant || "";
	const { content } = plant || undefined;

	const dictionary = {
		nl: {
			...translations["nl"].global,
			title: title,
			content: content,
		},
		en: {
			...translations["en"].global,
			title,
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
				{router.locale === "en" && (
					<p className={style.english}>This page is only available in Dutch.</p>
				)}
				<h2 className={cx(["title"])}>{dictionary[locale].title}</h2>
				<div className={style.image}>
					<Image
						src={`/images/plant/${plant.slug}.jpg`}
						alt={dictionary[locale].title}
						width={200}
						height={200}
						style={{ objectFit: "cover" }}
					/>
				</div>
				{!!dictionary[locale].content && (
					<div className={cx(["content"], "cms")}>
						<DocumentRenderer document={dictionary[locale].content?.document} />
					</div>
				)}
			</article>
		</>
	);
};
