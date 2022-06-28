export type ToggleAttributes = {
    className?: string;
    disabled?: boolean;
    size?: "normal" | "large";
    onChange?: ReactEventHandler;
    icon1?: any;
    icon2?: any;
    tooltips: Array<string>;
    text?: string;
    id: string;
    name?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    darkmode?: boolean;
    input?: partial<HTMLInputElement>;
    value?: string | number | readonly string[];
}

export type WindowSizeAttributes = {
    windowWidth: number;
    windowHeight: number;
}