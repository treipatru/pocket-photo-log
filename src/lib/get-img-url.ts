import { type Post } from "@/entities/posts";

export type ImageSize = "thumb" | "medium" | "large";
const imageSizeMap: Record<ImageSize, string> = {
	thumb: "100x0f",
	medium: "650x650f",
	large: "900x900f",
};

/**
 * TODO: This can't be in process.env but it should!
 * Since this method is used in the browser too we need to make it
 * available there too.
 *
 */

const apiUrl = "https://p34rev.planet34.org";

type PostProp = Pick<Post, "id" | "file">;

export const getImgUrl = (post: PostProp, thumbSize?: ImageSize): string => {
	const url = `${apiUrl}/api/files/posts/${post.id}/${post.file}`;

	return thumbSize ? `${url}?thumb=${imageSizeMap[thumbSize]}` : url;
};
