import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Button } from "@enk/components/Button";
import { SignOut } from "@enk/components/User";
import EstherKool from "@enk/icons/estherkool.svg";
import Moon from "@enk/icons/moon.svg";
import Sun from "@enk/icons/sun.svg";
import translations from "@enk/translations";
import { useUser } from "@enk/utils";
import style from "./header.module.scss";

const cx = classNames.bind(style);

export const Header = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const user = useUser();
	const router = useRouter();
	const { locale } = router;
	const dictionary = translations[locale];
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className={cx(["header"], "header")}>
			<Link href="/" className={cx(["link"], ["logo"])}>
				<EstherKool title={`${dictionary.global.goHome} Esther Kool`} />
			</Link>
			<div className={style.content}>
				<nav>
					{user && (
						<>
							<ul className={style.list}>
								<li>
									<Link href="/alex" className="anchor">
										Alex
									</Link>
								</li>
								<li>
									<Link href="/spaarplaatjes" className="anchor">
										{dictionary.collectionCards.title}
									</Link>
								</li>
								<li>
									<Link href="/paklijst" className="anchor">
										{dictionary.packing.title}
									</Link>
								</li>
								<li>
									<a
										href="https://cms.estherkool.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										CMS
									</a>
								</li>
							</ul>
							<SignOut size="small" />
						</>
					)}
					{!user && <Link href="/signin">{dictionary.user.signin}</Link>}
					<Button
						onClick={() =>
							theme === "light" ? setTheme("dark") : setTheme("light")
						}
						size="small"
						icon={!theme || theme === "light" ? <Moon /> : <Sun />}
					/>
				</nav>
			</div>
		</header>
	);
};
