import { CheckList } from "@enk/components/CheckList/CheckList";
import { Layout } from "@enk/components/Layout";
import Head from "next/head";

export default function PaklijstPage() {
	return (
		<div>
			<Head>
				<title>Esther Kool.com | Paklijst</title>
				<meta name="description" content="Personal website to Esther Kool" />
			</Head>
			<Layout>
				<div className="row">
					<CheckList categories={["Packing"]} lang="nl" title="Inpaklijst" />
				</div>
			</Layout>
		</div>
	);
}
