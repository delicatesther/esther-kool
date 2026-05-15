import { oudeLijst } from "@enk/data/oudelijst";
import slugify from "slugify";

export const convertData = () => {
	const data = oudeLijst.map((item) => {
		const { title, titleNL, description, descriptionNL, amount, tags } = item;
		const newTags = tags.map((tag) =>
			slugify(tag.nameNL, { remove: /[*+~.()'"!:@\+/]/g, lower: true }),
		);
		const id = slugify(titleNL, {
			remove: /[*+~.()'"!:@]/g,
			lower: true,
		});

		return {
			id,
			title: {
				nl: titleNL,
				en: title,
			},
			description: {
				nl: descriptionNL,
				en: description,
			},
			amount: amount,
			tags: newTags,
		};
	});
	return data;
};
