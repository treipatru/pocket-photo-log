import z from "zod";

export const pageSchema = z.object({
	id: z.string(),
	content: z.string(),
	name: z.string(),
	slug: z
		.string()
		.regex(
			/^[a-zA-Z0-9\-]+$/,
			"Slug can only contain letters, numbers, and dashes."
		),
});

export const pageSchemaForm = pageSchema.omit({ id: true });

export const pageSchemaFormDelete = z.object({
	id: z.string(),
});

export type Page = z.infer<typeof pageSchema>;
export type PageForm = z.infer<typeof pageSchemaForm>;
export type PageFormDelete = z.infer<typeof pageSchemaFormDelete>;
