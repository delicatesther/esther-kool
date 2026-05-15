import {
	COLLECTION_CARDS,
	COLLECTION_CATEGORIES,
} from "@enk/data/collection-cards";

type CollectionState = Record<string, number>;
import translations from "@enk/translations";
import classnames from "classnames/bind";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import style from "./collectionCards.module.scss";

const cx = classnames.bind(style);

async function fetchState(): Promise<CollectionState> {
	try {
		const res = await fetch("/api/collection-state");
		if (!res.ok) return {};
		return (await res.json()) as CollectionState;
	} catch {
		return {};
	}
}

async function pushState(state: CollectionState) {
	try {
		await fetch("/api/collection-state", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(state),
		});
	} catch {
		// ignore
	}
}

type Props = {
	title: string;
	categories: string[];
	filters?: string[];
};

export const CollectionCards = ({ title }: Props) => {
	const router = useRouter();
	const { locale } = router;
	const dictionary = translations[locale as "nl" | "en"].collectionCards;

	const [counts, setCounts] = useState<CollectionState>({});
	const [activeCategory, setActiveCategory] = useState<string>("");
	const [isDirty, setIsDirty] = useState(false);
	const [showSaved, setShowSaved] = useState(false);
	const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		fetchState().then((s) => setCounts(s));
	}, []);

	function handleCountChange(cardId: string, value: number) {
		setCounts((prev) => ({ ...prev, [cardId]: value }));
		setIsDirty(true);
	}

	function save(e?: React.FormEvent) {
		e?.preventDefault();
		if (debounceRef.current) clearTimeout(debounceRef.current);
		pushState(counts).then(() => {
			setIsDirty(false);
			setShowSaved(true);
			setTimeout(() => setShowSaved(false), 700);
		});
	}

	const visibleCards = activeCategory
		? COLLECTION_CARDS.filter((c) => c.category === activeCategory)
		: COLLECTION_CARDS;

	if (COLLECTION_CARDS.length === 0) {
		return (
			<div style={{ padding: "2rem 0" }}>
				<h2>{title}</h2>
				<p>Er is momenteel geen actieve spaaractie.</p>
			</div>
		);
	}

	return (
		<div className={style.wrapper}>
			<h2 className={style.title}>{title}</h2>

			{COLLECTION_CATEGORIES.length > 0 && (
				<div className={style.filters}>
					<select
						value={activeCategory}
						onChange={(e) => setActiveCategory(e.target.value)}
					>
						<option value="">-- Alles --</option>
						{COLLECTION_CATEGORIES.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.title}
							</option>
						))}
					</select>
				</div>
			)}

			<form onSubmit={save} className={style.form}>
				<table className={style.table}>
					<thead>
						<tr className={style.titleRow}>
							<th>{dictionary.card}</th>
							<th>Aantal</th>
						</tr>
					</thead>
					<tbody>
						{visibleCards.map((card) => {
							const count = counts[card.id] ?? 0;
							return (
								<tr
									key={card.id}
									className={cx({ hasCard: count > 0, hasMoreCopies: count > 1 })}
								>
									<th>{card.title}</th>
									<td>
										<input
											className={style.numberInput}
											type="number"
											min="0"
											value={count}
											onChange={(e) =>
												handleCountChange(card.id, Math.max(0, parseInt(e.target.value) || 0))
											}
										/>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>

				<div className={style.buttons}>
					<button
						type="submit"
						disabled={!isDirty}
					>
						Opslaan
					</button>
				</div>
			</form>

			<p
				aria-hidden={!showSaved}
				className={cx({ showSaved }, ["savedMessage"])}
			>
				Opgeslagen!
			</p>
		</div>
	);
};
