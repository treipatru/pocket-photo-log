import PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";
import { type Pages } from "@/entities/pages";
import { type Post } from "@/entities/posts";
import { type Tag } from "@/entities/tags";
import { type Settings } from "@/entities/settings";

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: "tags"): RecordService<Tag>;
	collection(idOrName: "posts"): RecordService<Post>;
	collection(idOrName: "settings"): RecordService<Settings>;
	collection(idOrName: "pages"): RecordService<Pages>;
}
