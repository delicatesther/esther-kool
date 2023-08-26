import React, { useEffect, useState } from "react";
import style from "./checkList.module.scss";
import {
	ALL_CHECKLISTITEMS_QUERY,
	UPDATE_CHECKLIST_MUTATION,
} from "lib/resolvers";
import { useMutation, useQuery } from "@apollo/client";
import { Button } from "@enk/components/Button";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import { CheckListItemCheckedData, CheckListProps } from "@enk/types";
import { CheckListItem } from "./CheckListItem";

export const CheckList = ({ title, categories, lang }: CheckListProps) => {
	const [state, setState] = useState([]);
	const [updatedData, setUpdatedData] = useState([]);
	const [isDirty, setIsDirty] = useState(false);
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

	function getCategories() {
		const arr = categories.map((category) => {
			return {
				name: {
					equals: category,
				},
			};
		});
		return arr;
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

	const { data, loading, error } = useQuery(ALL_CHECKLISTITEMS_QUERY, {
		variables: {
			where: {
				tags: {
					some: {
						OR: [...getCategories()],
					},
				},
			},
		},
	});
	if (loading || mutationLoading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;
	const { checkListItems } = data || [];

	return (
		<>
			<h2 className={style.title}>{title}</h2>
			<ul className={style.list}>
				{checkListItems.map((item) => {
					const localItem = state
						? state.find((obj) => obj.id === item.id)
						: {};
					return (
						<li key={item.id}>
							<CheckListItem
								{...item}
								handleSave={(item) => handleSave(item)}
								checked={!!localItem?.checked}
								lang={lang}
							/>
						</li>
					);
				})}
			</ul>
			<div className={style.buttons}>
				<Button text="Uncheck All" onClick={clearList} />
				<Button text="Reset" onClick={resetList} />
				<Button text="Save" disabled={!isDirty} onClick={saveList} />
			</div>
		</>
	);
};
