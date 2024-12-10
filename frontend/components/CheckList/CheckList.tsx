import { Button } from "@enk/components/Button";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import Check from "@enk/icons/check.svg";
import translations from "@enk/translations";
import { CheckListItemCheckedData, CheckListProps } from "@enk/types";
import classnames from "classnames/bind";
import { useChecklistApolloData } from "lib/checklist/useChecklistApolloData";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { CheckListItem } from "./CheckListItem";
import style from "./checkList.module.scss";

const cx = classnames.bind(style);

export type ChecklistItem = {
	checked: boolean;
	id: string;
	title: string;
};

function getLocalStorageItems(): ChecklistItem[] {
	if (typeof window !== "undefined") {
		const arr = Object.keys(localStorage).filter((item) =>
			item.startsWith("itemData"),
		);

		const allItems: ChecklistItem[] = arr.map((item) =>
			JSON.parse(localStorage.getItem(item)),
		);
		return allItems;
	}
	return [];
}

export const CheckList = ({ title, categories, filters }: CheckListProps) => {
	const [state, setState] = useState<ChecklistItem[]>(getLocalStorageItems());
	const [activeFilter, setActiveFilter] = useState("");
	const [isDirty, setIsDirty] = useState(false);
	const [checkedHidden, setCheckedHidden] = useState(false);

	const {
		checkListItems,
		updatedData,
		setUpdatedData,
		loadCategory,
		loading,
		error,
		updateCheckListItems,
	} = useChecklistApolloData(categories, activeFilter);

	const router = useRouter();
	const { locale } = router;

	const dictionary = useMemo(() => {
		const dictionary = {
			...translations[locale].checklist,
			...translations[locale].global,
		};
		return dictionary;
	}, [locale]);

	function handleSave(item: CheckListItemCheckedData, checked: boolean) {
		const { id, title } = item;
		setIsDirty(true);

		// Filter it out of our state if it's already there, no double entries
		const arr = state.filter((stateItem) => stateItem.id !== item.id);

		// Add it to state
		setState([...arr, { ...item, checked: checked }]);
		setUpdatedData([
			...updatedData,
			{
				data: { checked },
				where: {
					id: item.id,
				},
			},
		]);
		if (typeof window !== "undefined" && window.localStorage) {
			// Set item in local storage
			localStorage.setItem(
				`itemData ${id}`,
				JSON.stringify({
					id,
					title,
					checked: checked,
				}),
			);
		}
	}

	function clearList() {
		if (typeof window !== "undefined" && window.localStorage) {
			const arr = checkListItems.map((item) => {
				return {
					data: {
						checked: false,
					},
					where: {
						id: item.id,
					},
				};
			});

			setUpdatedData(arr);
			localStorage.clear();
			setIsDirty(true);
			setState([]);
		}
	}

	function saveList() {
		updateCheckListItems();
		setIsDirty(false);
	}

	function resetList() {
		const arr = checkListItems.map((item) => {
			return {
				id: item.id,
				title: item.title,
				checked: item.checked,
			};
		});
		setState([...arr]);
		setIsDirty(false);
	}

	if (loading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;

	function checkAllOnList() {
		setIsDirty(true);
		const arr = checkListItems.map((item) => {
			return {
				id: item.id,
				title: item.title,
				checked: true,
			};
		});
		setState([...arr]);
		if (typeof window !== "undefined" && window.localStorage) {
			// Set item in local storage
			arr.map((item) =>
				localStorage.setItem(
					`itemData ${item.id}`,
					JSON.stringify({
						id: item.id,
						title: item.title,
						checked: true,
					}),
				),
			);
		}
	}

	function filterCategory(filter = undefined) {
		setActiveFilter(filter);
		loadCategory();
	}

	function toggleHideChecked() {
		setCheckedHidden(!checkedHidden);
	}

	return (
		<>
			<h2 className={style.title}>{title}</h2>
			{filters && (
				<div className={style.filters}>
					<h3>{dictionary.category}</h3>
					<select
						value={activeFilter}
						onChange={(e) => filterCategory(e.target.value)}
					>
						<option disabled value="">
							--{dictionary.select}--
						</option>
						{filters.map((filter) => (
							<option key={filter} value={filter}>
								{filter}
							</option>
						))}
					</select>
					<Button
						size="small"
						text={`${dictionary.showAll}`}
						onClick={() => filterCategory(categories)}
					/>
					<div className={style.hideChecked}>
						<h3>{dictionary.hideChecked}</h3>
						<Button
							checkbox={true}
							icon={checkedHidden ? <Check /> : null}
							onClick={toggleHideChecked}
						/>
					</div>
				</div>
			)}
			<ul className={style.list}>
				{checkListItems.map((item) => {
					const localItem = state
						? state.find((obj) => obj.id === item.id)
						: item;
					return (
						<li
							key={item.id}
							className={cx({
								["hidden"]: !!localItem?.checked && checkedHidden,
							})}
						>
							<CheckListItem
								{...item}
								handleClick={(item) => handleSave(item, !localItem?.checked)}
								checked={!!localItem?.checked}
								checkedHidden={!!localItem?.checked && checkedHidden}
							/>
						</li>
					);
				})}
			</ul>
			<div className={style.buttons}>
				<Button
					size="small"
					text={`${dictionary.uncheckAll}`}
					onClick={clearList}
				/>
				<Button
					size="small"
					text={`${dictionary.checkAll}`}
					onClick={checkAllOnList}
				/>
				<Button size="small" text={`${dictionary.reset}`} onClick={resetList} />
				<Button
					size="small"
					text={`${dictionary.save}`}
					disabled={!isDirty}
					onClick={saveList}
				/>
			</div>
		</>
	);
};
