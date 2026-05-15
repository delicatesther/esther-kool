import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@enk/components/Layout";
import { markdownToHtml } from "@enk/lib/content/markdown";
import { ExperienceDetail } from "../../components/Experiences/ExperienceDetail/ExperienceDetail";
import {
	getAllExperienceSlugs,
	getExperienceBySlug,
} from "@enk/lib/content/experiences";

export default function ExperiencePage({ experience }) {
	return (
		<>
			<Head>
				<title>Esther Kool | {experience.title}</title>
				<meta name="description" content={experience.summary ?? ""} />
			</Head>

			<Layout>
				<ExperienceDetail experience={experience} />
			</Layout>
		</>
	);
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
	const slugs = await getAllExperienceSlugs();

	const paths =
		locales?.flatMap((locale) =>
			slugs.map((slug) => ({
				params: { slug },
				locale,
			})),
		) ?? [];

	return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
	const experience = await getExperienceBySlug(
		params?.slug as string,
		(locale ?? "nl") as "nl" | "en",
	);

	if (!experience) {
		return { notFound: true };
	}

	const contentHtml = await markdownToHtml(experience.content);

	return {
		props: {
			experience: { ...experience, content: contentHtml },
		},
	};
};
