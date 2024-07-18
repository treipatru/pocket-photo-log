import type { RecordService } from "pocketbase";
import PocketBase from "pocketbase";
import { getEnvVar } from "./get-env-var";

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

type ConstKeys = "SITE_TITLE" | "SITE_DESCRIPTION";

export interface Const {
	name: ConstKeys;
	value: string;
}

export interface TypedPocketBase extends PocketBase {
	collection(idOrName: string): RecordService; // default fallback for any other collection
	collection(idOrName: "tags"): RecordService<Tag>;
	collection(idOrName: "posts"): RecordService<Post>;
	collection(idOrName: "consts"): RecordService<Const>;
	collection(idOrName: "pages"): RecordService<Pages>;
}

export const pb = new PocketBase(getEnvVar("API_URL")) as TypedPocketBase;
await pb
	.collection("users")
	.authWithPassword(getEnvVar("API_USER"), getEnvVar("API_KEY"));

if (!pb.authStore.isValid) {
	throw new Error("Invalid credentials");
}

pb.beforeSend = function (url, options) {
	options.headers = Object.assign({}, options.headers, {
		Authorization: `${pb.authStore.token}`,
	});

	return { url, options };
};

export type ImageSize = "650x650f" | "900x900f" | "1200x1200f";

export const getImgUrl = (
	recordId: string,
	filename: string,
	thumbSize?: ImageSize
) => {
	const url = `https://p34rev.planet34.org/api/files/posts/${recordId}/${filename}`;
	return thumbSize ? `${url}?thumb=${thumbSize}` : url;
};

export const getConstValue = (key: ConstKeys, collection: Const[]) => {
	const record = collection.find((record) => record.name === key);

	if (!record) {
		throw new Error(`Const ${key} not found`);
	}

	return record.value;
};
