import path from "node:path";
import { CONTENT_ROOT, readDir, readFile } from "./fs";
import { ExperienceFrontmatter, Locale } from "./types";
import { parseMarkdown } from "./markdown";

function fileNameForExperience(slug: string, locale: Locale) {
	return path.join(CONTENT_ROOT, "experiences", `${slug}.${locale}.md`);
}

export async function getAllExperienceSlugs() {
	const entries = await readDir("experiences");
	const slugs = new Set(
		entries
			.filter((file) => file.endsWith(".md"))
			.map((file) => file.replace(/\.((nl)|(en))\.md$/, "")),
	);

	return [...slugs];
}

export async function getExperienceBySlug(slug: string, locale: Locale) {
	const source = await readFile(fileNameForExperience(slug, locale));
	const { data, content } = await parseMarkdown<ExperienceFrontmatter>(source);

	if (data.published === false) return null;

	return {
		...data,
		content,
	};
}
