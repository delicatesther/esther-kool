import { useRouter } from "next/router";

export const useCategories = (categories, activeFilter = undefined) => {
	const router = useRouter();
	const { locale } = router;

	const key = locale === "nl" ? "nameNL" : "name";
	if (activeFilter) {
		return [
			{
				[key]: {
					equals: activeFilter,
				},
			},
		];
	} else {
		const arr = categories.map((category) => {
			return {
				[key]: {
					equals: category,
				},
			};
		});
		return arr;
	}
};
