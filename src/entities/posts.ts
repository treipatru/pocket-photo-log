import { MAX_FILE_SIZE } from "@/constants";
import { tagSchema } from "@/entities/tags";
import z from "zod";

export const postSchema = z.object({
	id: z.string(),
	createdAt: z.date(),

	alt: z.string(),
	caption: z.string(),
	height: z.number(),
	imageUrl: z.string(),
	likes: z.number(),
	published: z.boolean(),
	shotOn: z.date(),
	tags: z.array(tagSchema),
	views: z.number(),
	width: z.number(),
});

export const postSchemaFormCreate = z.object({
	alt: z.string(),
	caption: z.string(),
	file: z.instanceof(File).refine((file) => {
		return !file || file.size <= MAX_FILE_SIZE;
	}, "File size must be less than 20MB"),
	published: z.boolean(),
	shotOn: z.string(),
	tags: z.array(z.string()),
});

export const postSchemaFormUpdate = postSchemaFormCreate.partial();

export type Post = z.infer<typeof postSchema>;
export type PostFormCreate = z.infer<typeof postSchemaFormCreate>;
export type PostFormUpdate = z.infer<typeof postSchemaFormUpdate>;
