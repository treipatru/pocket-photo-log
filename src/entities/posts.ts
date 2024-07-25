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

const MAX_FILE_SIZE = 1024 * 1024 * 10; // 10MB

/**
 * Schema for frontend form validation when creating or updating a post.
 */
export const postSchemaForm = z.object({
	alt: z.string(),
	caption: z.string(),
	tags: z.array(z.string()),
	published: z.boolean(),
	file: z
		.instanceof(File)
		.refine((file) => {
			const allowedExtensions = ["jpg", "jpeg", "png", "bmp", "webp", "avif"];
			const extension = file.name.split(".").pop();

			if (!extension) {
				return false;
			}

			return allowedExtensions.includes(extension);
		}, "File type is unsupported.")
		.refine((file) => {
			return !file || file.size <= MAX_FILE_SIZE;
		}, "File size must be less than 10MB."),
});

/**
 * Schema for backend data validation when creating or updating a post.
 */
export const postSchemaFormData = postSchemaForm.extend({
	tags: z.string(),
	published: z.string(),
});

export const postSchemaFormDelete = z.object({
	id: z.string(),
});

export type Post = z.infer<typeof postSchema>;
export type PostForm = z.infer<typeof postSchemaForm>;
export type PostFormData = z.infer<typeof postSchemaFormData>;
export type PostFormDelete = z.infer<typeof postSchemaFormDelete>;
