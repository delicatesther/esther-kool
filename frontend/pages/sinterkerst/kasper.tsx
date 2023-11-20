import { ShipGame } from "@enk/components/Surprise";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useEffect } from "react";

export default function SurpriseKasperPage() {
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		if (theme === "light") {
			setTheme("dark");
		}
	}, [theme, setTheme]);

	return (
		<>
			<Head>
				<title>SinterStarWarskerst</title>
			</Head>
			<ShipGame />
		</>
	);
}
