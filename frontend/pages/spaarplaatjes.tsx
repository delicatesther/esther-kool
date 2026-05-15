import { Layout } from "@enk/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import translations from "@enk/translations";
import { CollectionCards } from "@enk/components/CollectionCards";

export default function SpaarplaatjesPage() {
	const router = useRouter();
	const { locale } = router;
	const dictionary = translations[locale];

	return (
		<div>
			<Head>
				<title>Esther Kool.com | {dictionary.collectionCards.title}</title>
			</Head>
			<Layout>
				<div className="row">
					<CollectionCards
						categories={["Spaarplaatjes"]}
						title={dictionary.collectionCards.title}
						filters={[
							"Hollandse Helden",
							"Rimboe-rakkers",
							"Zeerotten",
							"Zandlopers",
							"Bosbazen",
							"Koukleumen",
							"Waterratten",
							"Steppe Strijders",
						]}
					/>
				</div>
			</Layout>
		</div>
	);
}
