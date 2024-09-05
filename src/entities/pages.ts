import z from "zod";

export const pageSchema = z.object({
	id: z.string(),
	created: z.date(),
	updated: z.date(),

	content: z.string(),
	name: z.string(),
	slug: z
		.string()
		.regex(
			/^[a-zA-Z0-9-]+$/,
			"Slug can only contain letters, numbers, and dashes."
		),
});
export type Page = z.infer<typeof pageSchema>;

export const pageCreateSchema = pageSchema.omit({
	id: true,
	created: true,
	updated: true,
});
export type PageCreate = z.infer<typeof pageCreateSchema>;

export const pageUpdateSchema = pageSchema.omit({
	created: true,
	updated: true,
});
export type PageUpdate = z.infer<typeof pageUpdateSchema>;
