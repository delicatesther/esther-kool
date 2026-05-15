import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Button } from "@enk/components/Button";
import EstherKool from "@enk/icons/estherkool.svg";
import Moon from "@enk/icons/moon.svg";
import Sun from "@enk/icons/sun.svg";
import translations from "@enk/translations";
import style from "./header.module.scss";

const cx = classNames.bind(style);

export const Header = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const router = useRouter();
	const { locale } = router;
	const dictionary = translations[locale];
	const otherLocale = locale === "nl" ? "en" : "nl";
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const onChangeLanguage = (lang: string) => (e) => {
		e.preventDefault();
		router.push(router.asPath, undefined, { locale: lang });
	};

	return (
		<header className={cx(["header"], "header")}>
			<Link href="/" className={cx(["link"], ["logo"])}>
				<EstherKool title={`${dictionary.global.goHome} Esther Kool`} />
			</Link>
			<div className={style.content}>
				<Button
					onClick={() =>
						theme === "light" ? setTheme("dark") : setTheme("light")
					}
					size="small"
					icon={!theme || theme === "light" ? <Moon /> : <Sun />}
				/>
				<Button
					role="button"
					onClick={onChangeLanguage(otherLocale)}
					size="small"
					text={locale === "nl" ? "🇬🇧" : "🇳🇱"}
				/>
			</div>
		</header>
	);
};
