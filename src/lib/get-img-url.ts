export type ImageSize = "650x650f" | "900x900f";

const apiUrl = process.env.PUBLIC_API_URL;

export const getImgUrl = (
	recordId: string,
	filename: string,
	thumbSize?: ImageSize
) => {
	const url = `${apiUrl}/api/files/posts/${recordId}/${filename}`;
	return thumbSize ? `${url}?thumb=${thumbSize}` : url;
};
