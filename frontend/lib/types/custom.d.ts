import React, {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	DetailedHTMLProps,
	ReactHTMLElement,
	ReactNode,
	SetStateAction,
	Dispatch,
	MouseEventHandler,
} from "react";

export interface ButtonProps
	extends DetailedHTMLProps<
		ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {
	icon?: ReactNode;
	iconLeft?: ReactNode;
	size?: "large" | "small";
	text?: string | number;
	className?: string;
	checkbox?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type WindowSizeAttributes = {
	windowWidth: number;
	windowHeight: number;
};

export type CheckListCategories =
	| "Abroad"
	| "Packing"
	| "Festival"
	| "Clothing"
	| "Multi-day trip"
	| "Always Needed"
	| "Vacation"
	| "Camping"
	| "Crucial";

export type CheckListProps = {
	title: string;
	categories: Array[CheckListCategories];
	lang: "nl" | "en";
};

type CheckListItemCheckedData = {
	id: string;
	title: string;
	checked: boolean;
};
