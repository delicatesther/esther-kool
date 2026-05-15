// const [createUserChecklistItems, { data, loading }] = useMutation(
//   ADD_ALL_COLLECTIONCARDS_TO_USER,
// );

function createUserChecklistItems(data) {}

export function connectUserToCards(arr, user) {
	arr.map((item) => {
		createUserChecklistItems({
			variables: {
				data: [
					{
						user: {
							connect: {
								id: user,
							},
						},
						checkListItem: {
							connect: {
								id: item,
							},
						},
					},
				],
			},
		});
	});
}
