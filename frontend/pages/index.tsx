import { BusinessCard } from "@enk/components/BusinessCard/BusinessCard";
import { Layout } from "@enk/components/Layout";
import { Timeline } from "@enk/components/Timeline";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home() {
	const { asPath } = useRouter();
	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: "";
	return (
		<div>
			<Head>
				<title>Esther Kool.com</title>
				<Head>
					<link rel="alternate" hrefLang="nl" href={`${origin}${asPath}`} />
					<link rel="alternate" hrefLang="en" href={`${origin}/en/${asPath}`} />
				</Head>
				<meta name="description" content="Personal website to Esther Kool" />
			</Head>
			<Layout>
				<div className="row">
					<BusinessCard />
				</div>
				<div className="row">
					<Timeline />
				</div>
			</Layout>
		</div>
	);
}
