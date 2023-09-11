import { CheckList } from "@enk/components/CheckList/CheckList";
import { Layout } from "@enk/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import translations from "@enk/translations";

export default function PaklijstPage() {
	const router = useRouter();
	const { locale } = router;
	return (
		<div>
			<Head>
				<title>Esther Kool.com | {translations[locale].packing.title}</title>
				<meta name="description" content="Personal website to Esther Kool" />
			</Head>
			<Layout>
				<div className="row">
					<CheckList
						categories={["Inpakken"]}
						title={`${translations[locale].packing.title}`}
						filters={[
							"Alex",
							"Buitenland",
							"Cruciaal",
							"Electronica",
							"Eten & Drinken",
							"Festival",
							"Kamperen",
							"Kleding",
							"Reizen",
							"Todo",
							"Verzorging",
						]}
					/>
				</div>
			</Layout>
		</div>
	);
}
