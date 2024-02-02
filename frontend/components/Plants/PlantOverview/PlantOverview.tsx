import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import style from "./plantOverview.module.scss";

export const PlantOverview = ({ plants }) => {
	const router = useRouter();
	return (
		<ul className={style.list}>
			{plants.map((plant) => (
				<li key={plant.id}>
					<Link href={`${router.asPath}/${plant.slug}`}>
						<Image
							src={`/images/plant/${plant.slug}.jpg`}
							alt={plant.title}
							width={200}
							height={200}
							style={{ objectFit: "cover" }}
						/>
					</Link>
				</li>
			))}
		</ul>
	);
};
