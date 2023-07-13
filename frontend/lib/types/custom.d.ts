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

export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    icon?: ReactNode,
    size?: "large" | "small",
    text?: string | number,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}


export type WindowSizeAttributes = {
    windowWidth: number;
    windowHeight: number;
}

