import { Layout } from "@enk/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import translations from "@enk/translations";
import { CollectionCards } from "@enk/components/CollectionCards";
import { useUser } from "@enk/utils";
import { SignIn } from "@enk/components/User";

export default function SpaarplaatjesPage() {
	const me = useUser();
	const router = useRouter();
	const { locale } = router;
	const dictionary = translations[locale];

	if (!me)
		return (
			<Layout>
				<SignIn />
			</Layout>
		);
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
						].sort((a: any, b: any) => b - a)}
					/>
				</div>
			</Layout>
		</div>
	);
}
