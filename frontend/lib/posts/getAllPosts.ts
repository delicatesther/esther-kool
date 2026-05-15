import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export type PostFile = {
	id: string;
	slug: string;
	title: string;
	status: string;
	publishDate?: string;
	tags: Array<{ name?: string; nameNL?: string }>;
	contentHtml: string;
};

async function readPostFile(fileName: string): Promise<PostFile | null> {
	const fullPath = path.join(POSTS_DIR, fileName);
	const raw = await fs.readFile(fullPath, "utf8");
	const { data, content } = matter(raw);

	const processed = await remark()
		.use(remarkGfm)
		.use(remarkHtml, { sanitize: false })
		.process(content);

	return {
		id: typeof data.id === "string" ? data.id : "",
		slug: typeof data.slug === "string" ? data.slug : fileName.replace(".md", ""),
		title: typeof data.title === "string" ? data.title : "",
		status: typeof data.status === "string" ? data.status : "draft",
		publishDate: data.publishDate instanceof Date
			? data.publishDate.toISOString().split("T")[0]
			: typeof data.publishDate === "string" ? data.publishDate : null,
		tags: Array.isArray(data.tags) ? data.tags : [],
		contentHtml: processed.toString(),
	};
}

export async function getAllPosts(tagFilter?: string): Promise<PostFile[]> {
	const entries = await fs.readdir(POSTS_DIR);
	const posts = await Promise.all(
		entries.filter((f) => f.endsWith(".md")).map(readPostFile),
	);

	return posts
		.filter((p): p is PostFile => {
			if (!p || p.status === "draft") return false;
			if (tagFilter) {
				return p.tags.some((t) => t.name === tagFilter || t.nameNL === tagFilter);
			}
			return true;
		})
		.sort((a, b) => (b.publishDate ?? "").localeCompare(a.publishDate ?? ""));
}

export async function getPostBySlug(slug: string): Promise<PostFile | null> {
	try {
		return await readPostFile(`${slug}.md`);
	} catch {
		return null;
	}
}
