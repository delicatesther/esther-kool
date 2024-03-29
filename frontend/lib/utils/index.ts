import React, { useState, useEffect, useRef } from "react";
import { WindowSizeAttributes } from "@enk/types";
import useTheme from "react-use-system-theme";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "@enk/lib";

export const useWindowSize = (): WindowSizeAttributes => {
	const [windowSize, setWindowSize] = useState<WindowSizeAttributes>({
		windowWidth: 0,
		windowHeight: 0,
	});

	useEffect(() => {
		function handleResizeWindow() {
			setWindowSize({
				windowWidth: window.innerWidth,
				windowHeight: window.innerHeight,
			});
		}

		handleResizeWindow();
		window.addEventListener("resize", handleResizeWindow);
		return () => window.removeEventListener("resize", handleResizeWindow);
	}, []);

	return windowSize;
};

export const useActiveElement = (): Element | null => {
	const [active, setActive] = useState(null);

	const handleFocusIn = () => {
		setActive(document.activeElement);
	};

	useEffect(() => {
		document.addEventListener("focusin", handleFocusIn);
		return () => {
			document.removeEventListener("focusin", handleFocusIn);
		};
	}, []);

	return active;
};

export const checkFontLoaded = () => {
	let interval = null;

	function fontLoadListener() {
		let hasLoaded = false;
		try {
			if (typeof window !== "undefined") {
				hasLoaded = document.fonts.check('14px "Open Sans"');
			}
		} catch (error) {
			console.info("CSS font loading API error", error);
			fontLoadedSuccess();
			return;
		}

		if (hasLoaded) {
			fontLoadedSuccess();
		}
	}

	function fontLoadedSuccess() {
		if (interval) {
			clearInterval(interval);
		}

		document.getElementsByTagName("body")[0].removeAttribute("class");
	}

	interval = setInterval(fontLoadListener, 500);
};

export const useSystemTheme = () => {
	const theme = useTheme();
	return theme;
};

export function useUser() {
	const { data } = useQuery(CURRENT_USER_QUERY);
	return data?.authenticatedItem;
}

export function sortByKey(array, key) {
	return array.sort(function (a, b) {
		var x = a[key];
		var y = b[key];
		return x < y ? -1 : x > y ? 1 : 0;
	});
}

export * from "./ThemeChanger";
export * from "./arrays";
