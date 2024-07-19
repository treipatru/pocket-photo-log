import z from "zod";

export const pagesSchema = z.object({
	content: z.string(),
	name: z.string(),
	slug: z.string(),
	title: z.string(),
});

export type Pages = z.infer<typeof pagesSchema>;
