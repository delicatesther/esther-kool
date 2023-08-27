import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import { useTheme } from "next-themes";
import Link from "next/link";
import EstherKool from "@enk/icons/estherkool.svg";
import Sun from "@enk/icons/sun.svg";
import Moon from "@enk/icons/moon.svg";
import { useUser } from "@enk/utils";
import { Button } from "@enk/components/Button";
import { SignOut } from "@enk/components/User";
import style from "./header.module.scss";

const cx = classNames.bind(style);

export const Header = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();
	const user = useUser();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<header className={cx(["header"], "header")}>
			<Link href="/" className={cx(["link"], ["logo"])}>
				<EstherKool title="Go to homepage Esther Kool" />
			</Link>
			<div className={style.content}>
				{user && (
					<>
						<Link href="/paklijst" className="anchor">
							Paklijst
						</Link>
						{/* <Link href="/gezondheid" className="anchor">
              Gezondheid
            </Link> */}
						<a
							href="https://cms.estherkool.com"
							target="_blank"
							rel="noopener noreferrer"
						>
							CMS
						</a>
						<SignOut size="small" />
					</>
				)}
				{!user && <Link href="/signin">Sign in</Link>}
				<Button
					onClick={() =>
						theme === "light" ? setTheme("dark") : setTheme("light")
					}
					size="small"
					icon={!theme || theme === "light" ? <Moon /> : <Sun />}
				/>
			</div>
		</header>
	);
};
