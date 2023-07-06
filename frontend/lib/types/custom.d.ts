export interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    children: React.Node,
    size?: "large" | "small",
    text?: string | number,
    className?: string,
    onClick?: MouseEventHandler<HTMLButtonElement>
}


export type WindowSizeAttributes = {
    windowWidth: number;
    windowHeight: number;
}

