import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

export async function parseMarkdown<T>(
	source: string,
): Promise<{ data: T; content: string }> {
	const { data, content } = matter(source);
	return { data: data as T, content };
}

export async function markdownToHtml(markdown: string) {
	const result = await remark().use(gfm).use(html).process(markdown);
	return result.toString();
}
