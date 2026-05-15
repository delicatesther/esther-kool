export type Locale = "nl" | "en";

export type ExperienceFrontmatter = {
	slug: string;
	locale: Locale;
	title: string;
	summary?: string;
	from: string;
	to?: string;
	ongoing?: boolean;
	published?: boolean;
	organisation?: {
		name: string;
		logo?: string;
	};
	tags?: string[];
};
