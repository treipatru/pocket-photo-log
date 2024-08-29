import z from "zod";
import { tagSchema } from "@/entities/tags";

export const postSchema = z.object({
	alt: z.string(),
	caption: z.string(),
	created: z.string(),
	file: z.string(),
	height: z.number(),
	id: z.string(),
	image: z.string(),
	published: z.boolean(),
	shot_on: z.string(),
	tags: z.array(z.string()),
	expand: z
		.object({
			tags: z.array(tagSchema),
		})
		.optional(),
	width: z.number(),
});

const MAX_FILE_SIZE = 1024 * 1024 * 20; // 10MB

export const postSchemaFormCreate = z.object({
	alt: z.string(),
	caption: z.string(),
	file: z.instanceof(File).refine((file) => {
		return !file || file.size <= MAX_FILE_SIZE;
	}, "File size must be less than 20MB"),
	published: z.boolean(),
	shot_on: z.string(),
	tags: z.array(z.string()),
});

export const postSchemaFormDelete = z.object({
	id: z.string(),
});

export const postSchemaFormUpdate = postSchemaFormCreate
	.extend({
		height: z.number(),
		width: z.number(),
	})
	.partial();

export type Post = z.infer<typeof postSchema>;
export type PostFormCreate = z.infer<typeof postSchemaFormCreate>;
export type PostFormDelete = z.infer<typeof postSchemaFormDelete>;
export type PostFormUpdate = z.infer<typeof postSchemaFormUpdate>;
