import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
	query {
		authenticatedItem {
			... on User {
				id
				email
				name
			}
		}
	}
`;

export const ALL_EXPERIENCES_QUERY = gql`
	query ALL_EXPERIENCES_QUERY($orderBy: [ExperienceOrderByInput!]!) {
		experiences(orderBy: $orderBy) {
			status
			summary
			summaryNL
			from
			to
			ongoing
			title
			titleNL
			id
			content {
				document
			}
			tags {
				id
				name
				nameNL
			}
			organisation {
				name
				nameNL
				logo
			}
		}
	}
`;

export const EXPERIENCES_QUERY = gql`
	query EXPERIENCES_QUERY($where: ExperienceWhereInput) {
		experiences(where: $where) {
			status
			summary
			summaryNL
			from
			to
			ongoing
			title
			titleNL
			id
			content {
				document
			}
			contentNL {
				document
			}
			tags {
				id
				name
				nameNL
			}
			organisation {
				name
				nameNL
				logo
			}
		}
	}
`;

export const EXPERIENCE_QUERY = gql`
	query Experience($where: ExperienceWhereUniqueInput!) {
		experience(where: $where) {
			id
			status
			from
			to
			ongoing
			summary
			summaryNL
			title
			titleNL
			content {
				document
			}
			contentNL {
				document
			}
			tags {
				id
				name
				nameNL
			}
			organisation {
				id
				name
				nameNL
				logo
			}
		}
	}
`;

export const ALL_CHECKLISTITEMS_QUERY = gql`
	query ALL_CHECKLISTITEMS_QUERY(
		$where: CheckListItemWhereInput!
		$orderBy: [CheckListItemOrderByInput!]!
	) {
		checkListItems(where: $where, orderBy: $orderBy) {
			id
			titleNL
			title
			checked
			description
			descriptionNL
			amount
			tags {
				nameNL
				name
				id
			}
		}
	}
`;

export const ALL_COLLECTIONCARDS_QUERY = gql`
	query ALL_COLLECTIONCARDS_QUERY(
		$where: CheckListItemWhereInput!
		$orderBy: [CheckListItemOrderByInput!]!
		$where2: UserWhereInput!
		$orderBy2: [UserOrderByInput!]!
	) {
		checkListItems(where: $where, orderBy: $orderBy) {
			id
			titleNL
			title
			checked
			description
			descriptionNL
			amount
			tags {
				nameNL
				name
				id
			}
			image {
				altText
				id
				image {
					publicUrlTransformed
				}
			}
		}
		users(where: $where2, orderBy: $orderBy2) {
			id
			name
			checkListItems {
				id
				count
				checkListItem {
					id
				}
			}
		}
	}
`;

export const POST_QUERY = gql`
	query POST_QUERY($where: PostWhereUniqueInput!) {
		post(where: $where) {
			id
			slug
			title
			content {
				document
			}
		}
	}
`;

export const POSTS_QUERY = gql`
	query POSTS_QUERY($where: PostWhereInput!) {
		posts(where: $where) {
			id
			slug
			title
			content {
				document
			}
		}
	}
`;
