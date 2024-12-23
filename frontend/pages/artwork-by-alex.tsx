import { useQuery } from "@apollo/client";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import { Frame } from "@enk/components/Frame/Frame";
import { Layout } from "@enk/components/Layout";
import { POST_QUERY } from "@enk/lib";
import translations from "@enk/translations";
import { useRouter } from "next/router";

const images = [
	{
		src: "/images/kunst-alex/alex-1.webp",
		alt: "",
		orientation: "vertical",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-2.webp",
		alt: "",
		orientation: "horizontal",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-3.webp",
		alt: "",
		orientation: "vertical",
		description:
			"Zonder titel, 2024 - Waterverf en vingerverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-4.webp",
		alt: "",
		orientation: "vertical",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-5.webp",
		alt: "",
		orientation: "horizontal",
		description: "Hartje, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-6.webp",
		alt: "",
		orientation: "horizontal",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-7.webp",
		alt: "",
		orientation: "horizontal",
		description: "Mond, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-8.webp",
		alt: "",
		orientation: "horizontal",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-9.webp",
		alt: "",
		orientation: "horizontal",
		description: "Nogge hartje, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-10.webp",
		alt: "",
		orientation: "horizontal",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-11.webp",
		alt: "",
		orientation: "vertical",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-12.webp",
		alt: "",
		orientation: "vertical",
		description: "Zonder titel, 2024 - Vingerverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-13.webp",
		alt: "",
		orientation: "vertical",
		description: "Zonder titel, 2024 - Acrylverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-14.webp",
		alt: "",
		orientation: "vertical",
		description: "Opa, 2024 - Waterverf op papier, 210x297mm",
	},
	{
		src: "/images/kunst-alex/alex-15.webp",
		alt: "",
		orientation: "horizontal",
		description: "Zonder titel, 2024 - Waterverf op papier, 210x297mm",
	},
];

export default function AlexPage() {
	const router = useRouter();
	const { locale } = router;
	const { data, loading, error } = useQuery(POST_QUERY, {
		variables: {
			where: {
				id: "97ecf266-4626-459d-b78b-cedf5fb99d0e",
			},
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	const { post } = data;
	const dictionary = translations[locale].artByAlex;

	return (
		<Layout>
			<div className="row-spacing-bottom">
				<h1 style={{ gridColumn: "span 6", lineHeight: "0.8" }}>
					{dictionary.title}
				</h1>
				<p
					style={{ gridColumn: "1/-1", marginBottom: "40px", maxWidth: "35em" }}
				>
					{dictionary.description}
				</p>
			</div>
			<div
				className="row-spacing-bottom"
				style={{
					gridAutoFlow: "row",
					gridAutoRows: "min-content",
					alignItems: "center",
					justifyContent: "center",
					justifyItems: "center",
					gridRow: "auto",
					gap: "24px",
				}}
			>
				{images.map((image) => {
					const { src, alt, orientation, description } = image;
					return (
						<Frame key={src} image={{ src, alt, orientation, description }} />
					);
				})}
			</div>
		</Layout>
	);
}
