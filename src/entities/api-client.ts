import { type Page } from "@/entities/pages";
import { type Post } from "@/entities/posts";
import { type Stat } from "@/entities/stats";
import { type Tag } from "@/entities/tags";
import PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";
import z, { ZodSchema } from "zod";

export type PostsPerYear = {
	id?: number;
	year: number | null;
	post_count: number;
};

export type SettingsArr = {
	id: string;
	name: string;
	value: string;
};

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: "pages"): RecordService<Page>;
	collection(idOrName: "posts_per_year"): RecordService<PostsPerYear>;
	collection(idOrName: "posts"): RecordService<Post>;
	collection(idOrName: "settings"): RecordService<SettingsArr>;
	collection(idOrName: "stats"): RecordService<Stat>;
	collection(idOrName: "tags_with_posts"): RecordService<Tag>;
	collection(idOrName: "tags"): RecordService<Tag>;

	collection(idOrName: string): RecordService; // default fallback for any other collection
}

export const paginatedCollection = (schema: ZodSchema) =>
	z.object({
		items: z.array(schema),
		page: z.number(),
		perPage: z.number(),
		totalItems: z.number(),
		totalPages: z.number(),
	});

export type PaginatedCollection<T> = {
	items: T[];
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
};

export type Pagination = Omit<PaginatedCollection<any>, "items">;
