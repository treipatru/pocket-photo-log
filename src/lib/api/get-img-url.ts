import { getEnvVar } from "@/lib/get-env-var";

export type ImageSize = "650x650f" | "900x900f" | "1200x1200f";

export const getImgUrl = (
	recordId: string,
	filename: string,
	thumbSize?: ImageSize
) => {
	const url = `${getEnvVar("API_URL")}/api/files/posts/${recordId}/${filename}`;
	return thumbSize ? `${url}?thumb=${thumbSize}` : url;
};
