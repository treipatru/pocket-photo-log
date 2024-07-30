import z from "zod";

export const tagSchema = z.object({
	id: z.string(),
	name: z.string(),
	post_count: z.number().optional(),
});

export type Tag = z.infer<typeof tagSchema>;

export type TagCategory =
	| "camera"
	| "co"
	| "film"
	| "form"
	| "format"
	| "pl"
	| "yr";

export type StructuredTags = {
	camera?: Tag;
	co?: Tag;
	film?: Tag;
	form?: Tag;
	format?: Tag;
	other: Tag[];
	pl?: Tag;
	yr?: Tag;
};
