import { useEffect, useState } from "react";
import classnames from "classnames/bind";
import { useRouter } from "next/router";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button } from "@enk/components/Button";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import Check from "@enk/icons/check.svg";
import { ALL_CHECKLISTITEMS_QUERY, UPDATE_CHECKLIST_MUTATION } from "@enk/lib";
import translations from "@enk/translations";
import { CheckListItemCheckedData, CheckListProps } from "@enk/types";
import { CheckListItem } from "./CheckListItem";
import style from "./checkList.module.scss";

const cx = classnames.bind(style);

export const CheckList = ({ title, categories, filters }: CheckListProps) => {
	const [state, setState] = useState([]);
	const [activeFilter, setActiveFilter] = useState("");
	const [updatedData, setUpdatedData] = useState([]);
	const [isDirty, setIsDirty] = useState(false);
	const [checkedHidden, setCheckedHidden] = useState(false);
	const router = useRouter();
	const { locale } = router;
	const dictionary = {
		...translations[locale].checklist,
		...translations[locale].global,
	};
	let checkListItems;
	const [
		updateCheckListItems,
		{ data: mutationData, loading: mutationLoading },
	] = useMutation(UPDATE_CHECKLIST_MUTATION, {
		variables: {
			data: updatedData,
		},
		refetchQueries: [
			{
				query: ALL_CHECKLISTITEMS_QUERY,
				variables: {
					where: {
						tags: {
							some: {
								OR: [...getCategories()],
							},
						},
					},
				},
			},
		],
	});

	function getCategories(activeFilter = undefined) {
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
	}

	function handleSave(item: CheckListItemCheckedData) {
		const { id, title, checked } = item;
		if (typeof window !== "undefined" && window.localStorage) {
			setIsDirty(true);
			// Set item in local storage
			localStorage.setItem(
				`itemData ${id}`,
				JSON.stringify({
					id,
					title,
					checked: !checked,
				}),
			);
			// Parse what's in local storage
			const localItemData = JSON.parse(localStorage.getItem(`itemData ${id}`));
			// Filter it out of our state if it's already there, no double entries
			const arr = state.filter((item) => item.id !== localItemData.id);
			// Add it to state
			setState([...arr, localItemData]);
			setUpdatedData([
				...updatedData,
				{
					data: { checked: localItemData.checked },
					where: {
						id: localItemData.id,
					},
				},
			]);
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
		setState(arr);
		setIsDirty(false);
	}

	useEffect(() => {
		if (typeof window !== "undefined" && window.localStorage) {
			const arr = Object.keys(localStorage).filter((item) =>
				item.startsWith("itemData"),
			);
			arr.map((item) => {
				const localItemData = JSON.parse(localStorage.getItem(item));
				const itemExistsInState: boolean = !!state.find(
					(obj) => obj.id === localItemData.id,
				);
				if (!itemExistsInState) {
					setState([...state, localItemData]);
					setUpdatedData([
						...updatedData,
						{
							data: { checked: localItemData.checked },
							where: { id: localItemData.id },
						},
					]);
				}
			});
		}
	}, [state, updatedData]);

	const translatedTitle = locale === "nl" ? "titleNL" : "title";
	const { data, loading, error } = useQuery(ALL_CHECKLISTITEMS_QUERY, {
		variables: {
			where: {
				tags: {
					some: {
						OR: [...getCategories()],
					},
				},
			},
			orderBy: [
				{
					[translatedTitle]: "asc",
				},
			],
		},
	});

	const [loadCategory, { called, loading: lazyLoading, data: lazyData }] =
		useLazyQuery(ALL_CHECKLISTITEMS_QUERY, {
			variables: {
				where: {
					tags: {
						some: {
							OR: [...getCategories(activeFilter)],
						},
					},
				},
				orderBy: [
					{
						[translatedTitle]: "asc",
					},
				],
			},
		});

	if (loading || mutationLoading || lazyLoading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;

	checkListItems = getLatestArr();

	function getLatestArr() {
		if (!!lazyData) {
			return lazyData?.checkListItems;
		}
		if (!!data) {
			return data?.checkListItems;
		}
		return null;
	}

	function checkAllOnList() {
		const arr = getLatestArr();
		arr.map((item) => {
			item.checked = false;
			handleSave(item);
		});
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
							icon={!!checkedHidden ? <Check /> : null}
							onClick={toggleHideChecked}
						/>
					</div>
				</div>
			)}
			<ul className={style.list}>
				{checkListItems.map((item) => {
					const localItem = state
						? state.find((obj) => obj.id === item.id)
						: {};
					return (
						<li
							key={item.id}
							className={cx({
								["hidden"]: !!localItem?.checked && checkedHidden,
							})}
						>
							<CheckListItem
								{...item}
								handleSave={(item) => handleSave(item)}
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
