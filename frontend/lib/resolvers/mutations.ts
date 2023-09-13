import { gql } from "@apollo/client";

export const SIGNUP_MUTATION = gql`
	mutation SIGNUP_MUTATION(
		$name: String!
		$email: String!
		$password: String!
	) {
		createUser(data: { name: $name, email: $email, password: $password }) {
			id
			email
			name
		}
	}
`;

export const SIGNIN_MUTATION = gql`
	mutation SIGNIN_MUTATION($email: String!, $password: String!) {
		authenticateUserWithPassword(email: $email, password: $password) {
			... on UserAuthenticationWithPasswordSuccess {
				item {
					id
					email
					name
				}
			}
			... on UserAuthenticationWithPasswordFailure {
				message
			}
		}
	}
`;

export const SIGNOUT_MUTATION = gql`
	mutation SIGNOUT_MUTATION {
		endSession
	}
`;

export const REQUEST_RESET_MUTATION = gql`
	mutation REQUEST_RESET_MUTATION($email: String!) {
		sendUserPasswordResetLink(email: $email) {
			message
		}
	}
`;

export const RESET_MUTATION = gql`
	mutation RESET_MUTATION(
		$email: String!
		$token: String!
		$password: String!
	) {
		redeemUserPasswordResetToken(
			email: $email
			token: $token
			password: $password
		) {
			message
		}
	}
`;

export const UPDATE_CHECKLIST_MUTATION = gql`
	mutation UPDATE_CHECKLIST_MUTATION($data: [CheckListItemUpdateArgs!]!) {
		updateCheckListItems(data: $data) {
			id
			checked
		}
	}
`;

export const UPDATE_COLLECTIONCARD_MUTATION = gql`
	mutation UPDATE_COLLECTIONCARD_MUTATION(
		$data: [UserChecklistItemUpdateArgs!]!
	) {
		updateUserChecklistItems(data: $data) {
			id
		}
	}
`;
