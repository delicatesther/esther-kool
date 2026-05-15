const STORAGE_KEY = "estherkool-packing-list-v1";

export type PackingListProgress = {
	checkedIds: string[];
};

const defaultValue: PackingListProgress = {
	checkedIds: [],
};

export function loadPackingListProgress(): PackingListProgress {
	if (typeof window === "undefined") return defaultValue;

	const raw = window.localStorage.getItem(STORAGE_KEY);
	if (!raw) return defaultValue;

	try {
		const parsed = JSON.parse(raw) as PackingListProgress;
		return {
			checkedIds: Array.isArray(parsed.checkedIds) ? parsed.checkedIds : [],
		};
	} catch {
		return defaultValue;
	}
}

export function savePackingListProgress(progress: PackingListProgress) {
	if (typeof window === "undefined") return;
	window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function clearPackingListProgress() {
	if (typeof window === "undefined") return;
	window.localStorage.removeItem(STORAGE_KEY);
}
