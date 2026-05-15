import { useTheme } from "next-themes";
import { useEffect } from "react";

export const ThemeChanger = ({ theme }: { theme: "light" | "dark" }) => {
	const { setTheme } = useTheme();

	useEffect(() => {
		setTheme(theme);
	}, [setTheme, theme]);

	return null;
};
