import Image from "next/image";
import { Layout } from "@enk/components/Layout";
import pigPic from "../public/images/varken.png";
import babyPic from "../public/images/baby.png";
import { GetStaticProps } from "next";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

type Props = {
	contentHtml: string;
};

export default function AlexPage({ contentHtml }: Props) {
	return (
		<Layout>
			<div className="row-spacing-bottom bruksanvisnung">
				<div
					className="illustrationContainer"
					style={{ gridColumnEnd: "span 3" }}
				>
					<Image
						src={pigPic}
						alt="varkentje"
						width={500}
						height={279}
						className="illustration"
					/>
				</div>
				<h1 style={{ gridColumn: "span 3" }}>
					bruksanvisnung alex
					<br />
					&nbsp;&nbsp;&nbsp;&nbsp;kool
				</h1>
			</div>
			<div className="row-spacing-bottom cms bruksanvisnung">
				<div
					className="two-cols"
					dangerouslySetInnerHTML={{ __html: contentHtml }}
				/>
				<div className="illustrationContainer" style={{ maxWidth: "200px" }}>
					<Image
						src={babyPic}
						alt="baby"
						width={200}
						height={179}
						className="illustration"
					/>
				</div>
			</div>
		</Layout>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const filePath = path.join(process.cwd(), "content", "posts", "alex-bruksanvisnung.md");
	const raw = fs.readFileSync(filePath, "utf8");
	const { content } = matter(raw);

	const processed = await remark()
		.use(remarkGfm)
		.use(remarkHtml, { sanitize: false })
		.process(content);

	return {
		props: { contentHtml: processed.toString() },
	};
};
