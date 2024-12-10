import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
	ALL_CHECKLISTITEMS_QUERY,
	UPDATE_CHECKLIST_MUTATION,
} from "lib/resolvers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useCategories } from "./useCategories";

export const useChecklistApolloData = (categories, activeFilter) => {
	const [updatedData, setUpdatedData] = useState<Array<unknown>>([]);

	const router = useRouter();
	const { locale } = router;

	const translatedTitle = locale === "nl" ? "titleNL" : "title";
	const {
		data: originalData,
		loading: loadingData,
		error,
	} = useQuery(ALL_CHECKLISTITEMS_QUERY, {
		variables: {
			where: {
				tags: {
					some: {
						OR: [...useCategories(categories)],
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

	const [loadCategory, { loading: lazyLoading, data: lazyData }] = useLazyQuery(
		ALL_CHECKLISTITEMS_QUERY,
		{
			variables: {
				where: {
					tags: {
						some: {
							OR: [...useCategories(categories, activeFilter)],
						},
					},
				},
				orderBy: [
					{
						[translatedTitle]: "asc",
					},
				],
			},
		},
	);

	const [updateCheckListItems, { loading: mutationLoading }] = useMutation(
		UPDATE_CHECKLIST_MUTATION,
		{
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
									OR: [...useCategories(categories)],
								},
							},
						},
					},
				},
			],
		},
	);

	const loading = loadingData || lazyLoading || mutationLoading;
	const checkListItems =
		lazyData?.checkListItems ?? originalData?.checkListItems ?? null;

	return {
		checkListItems,
		updateCheckListItems,
		updatedData,
		setUpdatedData,
		loading,
		loadCategory,
		error,
	};
};
