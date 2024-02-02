import { useQuery } from "@apollo/client";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import { Layout } from "@enk/components/Layout";
import { PlantOverview } from "@enk/components/Plants/PlantOverview";
import { POSTS_QUERY } from "@enk/lib";
import Head from "next/head";
import { useRouter } from "next/router";

export default function PlantPage() {
	const { data, loading, error } = useQuery(POSTS_QUERY, {
		variables: {
			where: {
				tags: {
					some: {
						name: {
							equals: "Plant",
						},
					},
				},
			},
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	const { posts } = data;
	console.log(posts);
	return (
		<>
			<Head>
				<title>Esther Kool | Plant</title>
			</Head>
			<Layout>
				<PlantOverview plants={posts} />
			</Layout>
		</>
	);
}
