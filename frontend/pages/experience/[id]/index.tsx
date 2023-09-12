import { Layout } from "@enk/components/Layout";
import {
	ALL_EXPERIENCES_QUERY,
	EXPERIENCE_QUERY,
	addApolloState,
	initializeApollo,
} from "@enk/lib";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import React from "react";
import { ExperienceDetail } from "@enk/components/Experiences";
import { useRouter } from "next/router";

export default function ExperiencePage({ experience }) {
	const router = useRouter();
	const { locale } = router;
	const { title, titleNL } = experience;
	return (
		<div>
			<Head>
				<title>Esther Kool | {locale === "nl" ? titleNL : title}</title>
			</Head>
			<Layout>
				<ExperienceDetail experience={experience} />
			</Layout>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const apolloClient = initializeApollo();

	const {
		data: { experiences },
	} = await apolloClient.query({
		query: ALL_EXPERIENCES_QUERY,
		variables: {
			orderBy: [
				{
					from: "desc",
				},
			],
		},
	});

	const experienceIdsEn = experiences.map((experience) => {
		return {
			params: {
				id: experience.id,
				locale: "en",
			},
		};
	});
	const experienceIdsNl = experiences.map((experience) => {
		return {
			params: {
				id: experience.id,
				locale: "nl",
			},
		};
	});

	return {
		paths: [...experienceIdsEn, ...experienceIdsNl],
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params: { id } }) => {
	const apolloClient = initializeApollo();

	const { data, loading, error } = await apolloClient.query({
		query: EXPERIENCE_QUERY,
		variables: {
			where: {
				id,
			},
		},
	});

	const { experience } = data;

	return addApolloState(apolloClient, {
		props: { experience },
		revalidate: 10,
	});
};
