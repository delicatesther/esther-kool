export type PackingLocaleText = {
	nl: string;
	en: string;
};

export type PackingListTag =
	| "alex"
	| "buitenland"
	| "cruciaal"
	| "comfort"
	| "entertainment"
	| "evenement"
	| "elektronica"
	| "eten-drinken"
	| "festival"
	| "kamperen"
	| "kleding"
	| "reizen"
	| "todo"
	| "verzorging"
	| "inpakken";

export type PackingListItem = {
	id: string;
	title: PackingLocaleText;
	description?: PackingLocaleText;
	amount?: number;
	tags: PackingListTag[];
	image?: {
		src: string;
		alt: PackingLocaleText;
	};
	defaultChecked?: boolean;
};

export type PackingListCategory = {
	id: string;
	title: PackingLocaleText;
	items: PackingListItem[];
};
