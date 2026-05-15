import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type Locale = "nl" | "en";

export type ExperienceFile = {
	slug: string;
	locale: Locale;
	title: string;
	summary?: string;
	from: string;
	to?: string | null;
	ongoing?: boolean;
	published?: boolean;
	status?: "draft" | "published" | string;
	organisation?: {
		name?: string;
		nameNL?: string;
		logo?: string | null;
	} | null;
	tags?: Array<{
		id?: string;
		name?: string;
		nameNL?: string;
	}>;
	content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");
const EXPERIENCES_DIR = path.join(CONTENT_ROOT, "experiences");

function isLocale(value: string): value is Locale {
	return value === "nl" || value === "en";
}

function parseExperienceFilename(fileName: string) {
	const match = fileName.match(/^(.*)\.(nl|en)\.md$/);

	if (!match) {
		return null;
	}

	const [, slug, locale] = match;

	if (!isLocale(locale)) {
		return null;
	}

	return { slug, locale };
}

export async function readAllExperienceFiles(
	locale: Locale,
): Promise<ExperienceFile[]> {
	const entries = await fs.readdir(EXPERIENCES_DIR);
	const matchingFiles = entries.filter((fileName) =>
		fileName.endsWith(`.${locale}.md`),
	);

	const experiences: Array<ExperienceFile | null> = await Promise.all(
		matchingFiles.map(async (fileName) => {
			const parsedName = parseExperienceFilename(fileName);

			if (!parsedName) {
				return null;
			}

			const fullPath = path.join(EXPERIENCES_DIR, fileName);
			const rawFile = await fs.readFile(fullPath, "utf8");
			const { data, content } = matter(rawFile);

			return {
				slug: parsedName.slug,
				locale: parsedName.locale,
				title: typeof data.title === "string" ? data.title : parsedName.slug,
				summary: typeof data.summary === "string" ? data.summary : null,
				from: data.from instanceof Date
					? data.from.toISOString().split("T")[0]
					: typeof data.from === "string" ? data.from : "",
				to: data.to instanceof Date
					? data.to.toISOString().split("T")[0]
					: typeof data.to === "string" ? data.to : null,
				ongoing: typeof data.ongoing === "boolean" ? data.ongoing : false,
				published: typeof data.published === "boolean" ? data.published : true,
				status: typeof data.status === "string" ? data.status : "published",
				organisation:
					data.organisation && typeof data.organisation === "object"
						? {
								name:
									typeof (data.organisation as Record<string, unknown>).name ===
									"string"
										? ((data.organisation as Record<string, unknown>)
												.name as string)
										: undefined,
								nameNL:
									typeof (data.organisation as Record<string, unknown>)
										.nameNL === "string"
										? ((data.organisation as Record<string, unknown>)
												.nameNL as string)
										: undefined,
								logo:
									typeof (data.organisation as Record<string, unknown>).logo ===
									"string"
										? ((data.organisation as Record<string, unknown>)
												.logo as string)
										: null,
						  }
						: null,
				tags: Array.isArray(data.tags)
					? data.tags
							.filter(
								(tag): tag is Record<string, unknown> =>
									!!tag && typeof tag === "object",
							)
							.map((tag) => ({
								id: typeof tag.id === "string" ? tag.id : null,
								name: typeof tag.name === "string" ? tag.name : null,
								nameNL: typeof tag.nameNL === "string" ? tag.nameNL : null,
							}))
					: [],
				content,
			} satisfies ExperienceFile;
		}),
	);

	return experiences.filter((experience): experience is ExperienceFile =>
		experience !== null && !!experience.from,
	);
}

export async function getAllExperiences(locale: Locale) {
	const items = await readAllExperienceFiles(locale);

	return items
		.filter((item) => item.published !== false && item.status !== "draft")
		.sort((a, b) => b.from.localeCompare(a.from));
}
