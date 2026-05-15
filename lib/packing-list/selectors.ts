import { PackingListCategory, PackingListItem, PackingListTag } from "./types";

export function flattenPackingItems(
	categories: PackingListCategory[],
): PackingListItem[] {
	return categories.flatMap((category) => category.items);
}

export function filterPackingItems(
	categories: PackingListCategory[],
	activeTag?: PackingListTag | "",
): PackingListCategory[] {
	if (!activeTag) return categories;

	return categories
		.map((category) => ({
			...category,
			items: category.items.filter((item) => item.tags.includes(activeTag)),
		}))
		.filter((category) => category.items.length > 0);
}
