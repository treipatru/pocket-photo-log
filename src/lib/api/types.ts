import PocketBase from "pocketbase";
import type { RecordService } from "pocketbase";

export type ConstKeys = "SITE_TITLE" | "SITE_DESCRIPTION";

export interface Const {
	name: ConstKeys;
	value: string;
}

export interface Tag {
	id: string;
	name: string;
}

export interface Post {
	alt: string;
	caption: string;
	created: string;
	file: string;
	id: string;
	image: string;
	published: boolean;
	tags: string[];
	expand?: {
		tags: Tag[];
	};
}

export interface Pages {
	content: string;
	name: string;
	slug: string;
	title: string;
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: "tags"): RecordService<Tag>;
	collection(idOrName: "posts"): RecordService<Post>;
	collection(idOrName: "consts"): RecordService<Const>;
	collection(idOrName: "pages"): RecordService<Pages>;
}
