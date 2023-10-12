import Image from "next/image";
import getConfig from "next/config";
import { useQuery } from "@apollo/client";
import { DocumentRenderer } from "@keystone-6/document-renderer";
import { Layout } from "@enk/components/Layout";
import pigPic from "../public/images/varken.png";
import babyPic from "../public/images/baby.png";
import { POST_QUERY } from "@enk/lib";
import { ErrorMessage } from "@enk/components/ErrorMessage";

const { publicRuntimeConfig } = getConfig();

export default function AlexPage() {
	const { data, loading, error } = useQuery(POST_QUERY, {
		variables: {
			where: {
				id: publicRuntimeConfig.ALEX_POST,
			},
		},
	});

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;

	const { post } = data;
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
				<div className="two-cols">
					{post?.content?.document && (
						<DocumentRenderer document={post.content.document} />
					)}
				</div>
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
