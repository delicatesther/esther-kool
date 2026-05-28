import { CheckList } from "@enk/components/CheckList/CheckList";
import { Layout } from "@enk/components/Layout";
import Head from "next/head";
import { useRouter } from "next/router";
import translations from "@enk/translations";

export default function PaklijstPage() {
	const router = useRouter();
	const { locale } = router;
	const title = translations[locale].packing.title;
	return (
		<div>
			<Head>
				<title>Esther Kool.com | {title}</title>
				<meta name="description" content="Inpaklijst" />
			</Head>
			<Layout>
				<div className="row">
					<CheckList
						title={`${title}`}
						filters={[
							"alex",
							"buitenland",
							"cruciaal",
							"elektronica",
							"eten-drinken",
							"festival",
							"kamperen",
							"kleding",
							"reizen",
							"todo",
							"verzorging",
						]}
					/>
				</div>
			</Layout>
		</div>
	);
}
