import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import { Layout } from "@enk/components/Layout";
import { markdownToHtml } from "@enk/lib/content/markdown";
import {
	getAllExperienceSlugs,
	getExperienceBySlug,
} from "@enk/lib/content/experiences";

export default function ExperiencePage({ experience, html }) {
	return (
		<>
			<Head>
				<title>Esther Kool | {experience.title}</title>
				<meta name="description" content={experience.summary ?? ""} />
			</Head>

			<Layout>
				<article>
					<h1>{experience.title}</h1>
					<div dangerouslySetInnerHTML={{ __html: html }} />
				</article>
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

	const html = await markdownToHtml(experience.content);

	return {
		props: {
			experience,
			html,
		},
	};
};
