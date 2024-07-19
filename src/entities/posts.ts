import z from "zod";
import { tagSchema } from "@/entities/tags";

export const postSchema = z.object({
	alt: z.string(),
	caption: z.string(),
	created: z.string(),
	file: z.string(),
	id: z.string(),
	image: z.string(),
	published: z.boolean(),
	tags: z.array(z.string()),
	expand: z
		.object({
			tags: z.array(tagSchema),
		})
		.optional(),
});

export type Post = z.infer<typeof postSchema>;
