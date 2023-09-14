import checklistDisney from "../lib/checklist-disney.json";
import { ADD_ALL_COLLECTIONCARDS_TO_USER } from "@enk/lib";
import { useMutation } from "@apollo/client";

const connectChecklistArr = checklistDisney.data.checkListItems.map((item) => ({
	checkListItem: {
		connect: {
			id: item.id,
		},
	},
	user: {
		connect: {
			id: "acd9f585-9223-49a9-9deb-400b46823c04",
		},
	},
}));

// const [updateUserCards, { data, loading }] = useMutation(
// 	ADD_ALL_COLLECTIONCARDS_TO_USER,
// 	{
// 		variables: {
// 			data: connectChecklistArr,
// 		},
// 	},
// );

function createList() {
	console.log(connectChecklistArr);
	// updateUserCards();
}
