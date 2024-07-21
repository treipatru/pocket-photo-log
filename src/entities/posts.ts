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

export const postSchemaCreate = z.object({
	alt: z.string(),
	caption: z.string(),
	tags: z.array(z.string()),
	published: z.boolean(),
	file: z.instanceof(File).refine((file) => {
		return !file || file.size <= MAX_FILE_SIZE;
	}, "File size must be less than 10MB"),
});

export const postSchemaCreateFormData = postSchemaCreate.extend({
	tags: z.string(),
	published: z.string(),
});

export type Post = z.infer<typeof postSchema>;
export type PostCreate = z.infer<typeof postSchemaCreate>;

export const postDto = {
	create: {
		transformToServer: (post: PostCreate) => {
			const { data, error } = postSchemaCreate.safeParse(post);

			if (error) {
				throw new Error("Invalid post data. Unable to transform to server DTO");
			}

			const formData = new FormData();

			formData.append("alt", data.alt);
			formData.append("caption", data.caption);
			formData.append("published", data.published.toString());
			formData.append("file", data.file);
			formData.append("tags", data.tags.join(","));

			return formData;
		},
	},
};
