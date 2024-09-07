import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Button } from "@enk/components/Button";
import { ErrorMessage } from "@enk/components/ErrorMessage";
import {
	ALL_COLLECTIONCARDS_QUERY,
	UPDATE_COLLECTIONCARD_MUTATION,
} from "@enk/lib";
import translations from "@enk/translations";
import { CheckListProps } from "@enk/types";
import { useState } from "react";
import classnames from "classnames/bind";
import { useRouter } from "next/router";
import { useUser } from "@enk/utils";
import { CollectionCard } from "./CollectionCard";
import style from "./collectionCards.module.scss";

const cx = classnames.bind(style);

export const CollectionCards = ({
	title,
	categories,
	filters,
}: CheckListProps) => {
	const me = useUser();
	const [activeFilter, setActiveFilter] = useState("");
	const [state, setState] = useState([]);
	const [isDirty, setIsDirty] = useState(false);

	const [showAll, setShowAll] = useState(true);
	const [showSaved, setShowSaved] = useState(false);

	const router = useRouter();
	const { locale } = router;
	const dictionary = {
		...translations[locale].collectionCards,
		...translations[locale].global,
	};
	const { all, collected, doubles, missing } = dictionary;
	const [showCards, setShowCards] = useState(all);
	let checkListItems;
	const cardTypes = [collected, doubles, missing];

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

	const translatedTitle = locale === "nl" ? "titleNL" : "title";

	const filterByAnimalCollectionCards = {
		checkListItems: {
			some: {
				checkListItem: {
					tags: {
						some: {
							name: {
								equals: "Collection Cards",
							},
						},
					},
				},
			},
		},
	};

	const { data, loading, error } = useQuery(ALL_COLLECTIONCARDS_QUERY, {
		variables: {
			where: {
				AND: [
					{
						tags: {
							some: {
								name: {
									equals: "Collection Cards",
								},
							},
						},
					},
					{
						tags: {
							some: {
								OR: [...getCategories()],
							},
						},
					},
				],
			},
			orderBy: [
				{
					[translatedTitle]: "asc",
				},
			],
			where2: filterByAnimalCollectionCards,
			orderBy2: [
				{
					name: "asc",
				},
			],
		},
	});

	const [loadCategory, { called, loading: lazyLoading, data: lazyData }] =
		useLazyQuery(ALL_COLLECTIONCARDS_QUERY, {
			variables: {
				where: {
					tags: {
						some: {
							OR: [...getCategories(activeFilter)],
						},
					},
				},
				where2: filterByAnimalCollectionCards,
				orderBy: [
					{
						[translatedTitle]: "asc",
					},
				],
				orderBy2: [
					{
						name: "asc",
					},
				],
			},
		});

	const [updateCards, { data: mutationData, loading: mutationLoading }] =
		useMutation(UPDATE_COLLECTIONCARD_MUTATION, {
			variables: {
				data: state,
			},
			refetchQueries: [
				{
					query: ALL_COLLECTIONCARDS_QUERY,
					variables: {
						variables: {
							where: {
								tags: {
									some: {
										OR: [...getCategories(activeFilter)],
									},
								},
							},
							where2: filterByAnimalCollectionCards,
							orderBy: [
								{
									[translatedTitle]: "asc",
								},
							],
						},
					},
				},
			],
		});

	if (loading || lazyLoading) return <p>Loading...</p>;
	if (error) return <ErrorMessage error={error} />;

	function getLatestArr() {
		function getCardIndex(item) {
			return item.title.match(/\d+/)[0];
		}

		function sortByNumber(item) {
			return item.sort(function (a, b) {
				return Number(getCardIndex(a)) - Number(getCardIndex(b));
			});
		}

		if (lazyData) {
			return sortByNumber([...lazyData.checkListItems]);
		}
		if (data) {
			return sortByNumber([...data.checkListItems]);
		}
		return null;
	}

	function filterCategory(filter = undefined) {
		setActiveFilter(filter);
		setShowAll(false);
		loadCategory();
	}

	function filterCards(cardType) {
		setShowCards(cardType);
	}

	function flashSaved() {
		setShowSaved(true);
		setTimeout(() => {
			setShowSaved(false);
		}, 700);
	}

	function saveChanges(e) {
		e.preventDefault();
		updateCards();
		flashSaved();
		setIsDirty(false);
	}

	checkListItems = getLatestArr();
	const { users } = data;

	function hasCard(cardId, userId) {
		// Don't check all users, just the ones in here. Also, make
		// sure we don't need to import all checkListItems on currentUser query.
		const userWeNeed = users.find((user) => user.id === userId);
		const itemWeNeed = userWeNeed?.checkListItems?.find((subItem) => {
			return subItem.checkListItem.id === cardId;
		});
		const hasAtLeastOne = itemWeNeed?.count && itemWeNeed.count > 0;
		return hasAtLeastOne ? itemWeNeed.count : 0;
	}

	return (
		<div className={style.wrapper}>
			<h2 className={style.title}>{title}</h2>
			{filters && (
				<div className={style.filters}>
					<h3>{dictionary.showOnlyMy}</h3>
					<select
						value={showCards}
						onChange={(e) => filterCards(e.target.value)}
					>
						<option disabled value={all}>
							--{dictionary.select}--
						</option>
						{cardTypes.map((cardType) => (
							<option key={cardType} value={cardType}>
								{cardType}
							</option>
						))}
					</select>
					<Button
						size="small"
						className={cx(["showAll"], {
							["hidden"]: showCards === all,
						})}
						disabled={showCards === all}
						text={dictionary.showAllCards}
						onClick={() => {
							filterCards(all);
						}}
					/>
					<div className={style.dropdown}>
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
					</div>
					<Button
						size="small"
						className={cx(["showAll"], { ["hidden"]: !!showAll })}
						disabled={!!showAll}
						text={dictionary.showAll}
						onClick={() => {
							filterCategory(categories);
							setShowAll(true);
						}}
					/>
				</div>
			)}
			<form onSubmit={(e) => saveChanges(e)} className={style.form}>
				<table
					className={cx(
						["table"],
						{ ["showOnlyDoubles"]: showCards === doubles },
						{ ["showOnlyCollected"]: showCards === collected },
						{ ["showOnlyMissing"]: showCards === missing },
					)}
				>
					<thead>
						<tr className={style.titleRow}>
							<th>
								<span>{dictionary.card}</span>
							</th>
							{users.map((user) => (
								<th key={user.id}>{user.name}</th>
							))}
						</tr>
					</thead>
					<tbody>
						{checkListItems.map((item) => {
							const cardCount = hasCard(item.id, me.id);
							return (
								<tr
									key={item.id}
									className={cx(
										{ ["hasCard"]: cardCount },
										{ ["hasMoreCopies"]: cardCount > 1 },
									)}
								>
									<th>
										<div>
											<CollectionCard {...item} />
										</div>
									</th>
									{users.map((user) => {
										const currentUserItem = user.checkListItems.find(
											(subItem) => {
												return subItem.checkListItem.id === item.id;
											},
										);
										const count = currentUserItem?.count || 0;
										return (
											<td title={user.name} key={user.id}>
												<input
													className={style.numberInput}
													type="number"
													min="0"
													defaultValue={count}
													onChange={(e) => {
														setIsDirty(true);
														const filteredState = state.filter(
															(item) => item.where.id !== currentUserItem.id,
														);
														setState([
															...filteredState,
															{
																where: {
																	id: currentUserItem.id,
																},
																data: {
																	count: parseFloat(e.target.value),
																},
															},
														]);
													}}
													disabled={user.id !== me.id}
												/>
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
				<div className={style.buttons}>
					<Button
						size="small"
						text={`${dictionary.save}`}
						disabled={!isDirty}
						type="submit"
					/>
				</div>
			</form>
			<p
				aria-hidden={!showSaved}
				className={cx({ ["showSaved"]: showSaved }, ["savedMessage"])}
			>
				Saved!
			</p>
		</div>
	);
};
