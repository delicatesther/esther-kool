import React from "react";
import { Header } from "@enk/components/Header";
import { Triangle } from "@enk/components/Triangle";
import Head from "next/head";
import { useRouter } from "next/router";

export const Layout = ({ children, locale = "nl" }) => {
	const { asPath } = useRouter();
	const origin =
		typeof window !== "undefined" && window.location.origin
			? window.location.origin
			: "";

	return (
		<>
			<Head>
				<link rel="alternate" hrefLang="nl" href={`${origin}${asPath}`} />
				<link rel="alternate" hrefLang="en" href={`${origin}/en/${asPath}`} />
			</Head>
			<div className="wrapper">
				<Triangle />
				<Header />
				<main className="main">
					<div className="grid-wrapper">{children}</div>
				</main>
				<footer className="footer">
					&copy; Esther Kool {new Date().getFullYear()}
				</footer>
			</div>
		</>
	);
};
