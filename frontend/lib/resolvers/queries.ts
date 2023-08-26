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
			title
			titleNL
			id
			content {
				document
			}
			tags {
				id
				name
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
			content {
				document
			}
			summary
			summaryNL
			title
			titleNL
			tags {
				name
				nameNL
				id
			}
			organisation {
				name
				nameNL
				logo
			}
		}
	}
`;

export const ALL_CHECKLISTITEMS_QUERY = gql`
	query ALL_CHECKLISTITEMS_QUERY($where: CheckListItemWhereInput!) {
		checkListItems(where: $where) {
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
