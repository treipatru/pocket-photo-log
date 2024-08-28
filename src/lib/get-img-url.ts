import { type Post } from "@/entities/posts";

export type ImageSize = "thumb" | "medium" | "large";

/**
 * These sizes must match the data model in the backend otherwise
 * the image returned will be the original size.
 */
const imageSizeMap: Record<ImageSize, string> = {
	thumb: "100x0f",
	medium: "600x600f",
	large: "1000x0f",
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
