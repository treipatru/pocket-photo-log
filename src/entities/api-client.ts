import z, { ZodSchema } from "zod";

import PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";
import { type Page } from "@/entities/pages";
import { type Post } from "@/entities/posts";
import { type Tag } from "@/entities/tags";
import { type Settings } from "@/entities/settings";

type PostsPerYear = {
	id?: number;
	year: number | null;
	post_count: number;
};

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: "pages"): RecordService<Page>;
	collection(idOrName: "posts"): RecordService<Post>;
	collection(idOrName: "posts_per_year"): RecordService<PostsPerYear>;
	collection(idOrName: "settings"): RecordService<Settings>;
	collection(idOrName: "tags_with_posts"): RecordService<Tag>;
	collection(idOrName: "tags"): RecordService<Tag>;
}

export const paginatedCollection = (schema: ZodSchema) =>
	z.object({
		items: z.array(schema),
		page: z.number(),
		perPage: z.number(),
		totalItems: z.number(),
		totalPages: z.number(),
	});
