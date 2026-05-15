import { packingList } from "@enk/data/packing-list";
import { filterPackingItems } from "@enk/lib/packing-list/selectors";
import {
	clearPackingListProgress,
	loadPackingListProgress,
	savePackingListProgress,
} from "@enk/lib/packing-list/storage";
import { PackingListTag } from "@enk/lib/packing-list/types";
import translations from "@enk/translations";
import classnames from "classnames/bind";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import style from "./checkList.module.scss";

async function fetchServerState(): Promise<string[]> {
	try {
		const res = await fetch("/api/checklist-state");
		if (!res.ok) return null;
		const data = await res.json();
		return Array.isArray(data.checkedIds) ? data.checkedIds : null;
	} catch {
		return null;
	}
}

async function pushServerState(checkedIds: string[]) {
	try {
		await fetch("/api/checklist-state", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ checkedIds }),
		});
	} catch {
		// silently ignore — localStorage already saved locally
	}
}
const cx = classnames.bind(style);

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

export const CheckList = ({
	title,
	filters,
}: {
	title: string;
	filters: string[];
}) => {
	const router = useRouter();
	const locale = (router.locale ?? "nl") as "nl" | "en";

	const [checkedIds, setCheckedIds] = useState<string[]>([]);
	const [activeFilter, setActiveFilter] = useState<PackingListTag | "">("");
	const [hideChecked, setHideChecked] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// On mount: load localStorage immediately, then prefer server state
	useEffect(() => {
		const local = loadPackingListProgress();
		setCheckedIds(local.checkedIds);

		fetchServerState().then((serverIds) => {
			if (serverIds !== null) {
				setCheckedIds(serverIds);
				savePackingListProgress({ checkedIds: serverIds });
			}
		});
	}, []);

	// On change: save to localStorage immediately, debounce server sync
	useEffect(() => {
		savePackingListProgress({ checkedIds });

		if (debounceRef.current) clearTimeout(debounceRef.current);
		debounceRef.current = setTimeout(() => {
			pushServerState(checkedIds);
		}, 1000);

		return () => {
			if (debounceRef.current) clearTimeout(debounceRef.current);
		};
	}, [checkedIds]);

	const dictionary = useMemo(
		() => ({
			...translations[locale].checklist,
			...translations[locale].global,
		}),
		[locale],
	);

	const categories = useMemo(() => {
		const filtered = filterPackingItems(packingList, activeFilter);

		if (!hideChecked) return filtered;

		return filtered
			.map((category) => ({
				...category,
				items: category.items.filter((item) => !checkedIds.includes(item.id)),
			}))
			.filter((category) => category.items.length > 0);
	}, [activeFilter, checkedIds, hideChecked]);

	function toggleItem(id: string) {
		setCheckedIds((current) =>
			current.includes(id)
				? current.filter((itemId) => itemId !== id)
				: [...current, id],
		);
	}

	function resetList() {
		setCheckedIds([]);
		clearPackingListProgress();
		pushServerState([]);
	}

	return (
		<>
			<h2 className={style.title}>{title}</h2>
			<div className={style.filters}>
				<label>
					{dictionary.category}
					<select
						value={activeFilter}
						onChange={(e) =>
							setActiveFilter(e.target.value as PackingListTag | "")
						}
					>
						<option value="">--{dictionary.select}--</option>
						{filters.map((filter) => (
							<option key={filter} value={filter}>
								{filter}
							</option>
						))}
					</select>
				</label>
				<label>
					<input
						type="checkbox"
						checked={hideChecked}
						onChange={() => setHideChecked((v) => !v)}
					/>
					{dictionary.hideChecked}
				</label>

				<button type="button" onClick={resetList}>
					{dictionary.reset}
				</button>
			</div>
			{categories.map((category) => (
				<section className={style.items} key={category.id}>
					<h3>{category.title[locale]}</h3>
					<ul className={style.list}>
						{category.items.map((item) => {
							const checked = checkedIds.includes(item.id);

							return (
								<li className={style.item} key={item.id}>
									<label>
										{/* <ChecklistItem /> */}

										<input
											type="checkbox"
											checked={checked}
											onChange={() => toggleItem(item.id)}
										/>
										{item.title[locale]}
										{item.amount ? ` (${item.amount}x)` : ""}
									</label>
								</li>
							);
						})}
					</ul>
				</section>
			))}
		</>
	);
};
