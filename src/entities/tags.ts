import z from "zod";

export const tagSchema = z.object({
	id: z.string(),
	name: z.string().regex(/^[a-zA-Z0-9\- ]+$/),
	post_count: z.number().optional(),
});

export type Tag = z.infer<typeof tagSchema>;
