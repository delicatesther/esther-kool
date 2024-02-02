import { Layout } from "@enk/components/Layout";
import { PlantDetail } from "@enk/components/Plants";
import {
	POSTS_QUERY,
	POST_QUERY,
	addApolloState,
	initializeApollo,
} from "@enk/lib";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export default function PlantPage({ plant }) {
	const router = useRouter();
	const { title } = plant;
	return (
		<div>
			<Head>
				<title>Esther Kool | {title}</title>
			</Head>
			<Layout>
				<PlantDetail plant={plant} />
			</Layout>
		</div>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const apolloClient = initializeApollo();

	const {
		data: { posts },
	} = await apolloClient.query({
		query: POSTS_QUERY,
		variables: {
			where: {
				tags: {
					some: {
						name: {
							contains: "Plant",
						},
					},
				},
			},
		},
	});

	const plantSlugsEn = posts.map((plant) => {
		return {
			params: {
				slug: plant.slug,
				locale: "en",
			},
		};
	});

	const plantSlugsNl = posts.map((plant) => {
		return {
			params: {
				slug: plant.slug,
				locale: "nl",
			},
		};
	});

	return {
		paths: [...plantSlugsEn, ...plantSlugsNl],
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps = async ({ params: { slug } }) => {
	const apolloClient = initializeApollo();

	const { data, loading, error } = await apolloClient.query({
		query: POST_QUERY,
		variables: {
			where: {
				slug,
			},
		},
	});

	const { post: plant } = data;

	return addApolloState(apolloClient, {
		props: { plant },
		revalidate: 10,
	});
};
