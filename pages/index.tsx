import { BusinessCard } from "@enk/components/BusinessCard/BusinessCard";
import { Layout } from "@enk/components/Layout";
import { Timeline } from "@enk/components/Timeline";
import { getAllExperiences } from "@enk/lib/experiences/getAllExperiences";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home({ experiences }) {
	const { asPath } = useRouter();
	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: "";
	return (
		<div>
			<Head>
				<title>Esther Kool.com</title>
				<link rel="alternate" hrefLang="nl" href={`${origin}${asPath}`} />
				<link rel="alternate" hrefLang="en" href={`${origin}/en/${asPath}`} />
				<meta property="og:url" content={`${origin}${asPath}`} />
				<meta name="description" content="Personal website to Esther Kool" />
			</Head>
			<Layout>
				<div className="row">
					<BusinessCard />
				</div>
				<div className="row">
					<Timeline experiences={experiences} />
				</div>
			</Layout>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
	const experiences = await getAllExperiences((locale ?? "nl") as "nl" | "en");

	return {
		props: {
			experiences,
		},
	};
};
