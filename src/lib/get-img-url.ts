export type ImageSize = "650x650f" | "900x900f";

/**
 * TODO: This can't be process.env as it is not available in the browser.
 * Verify that the value is not baked in the docker image at build time.
 */

const apiUrl = import.meta.env.PUBLIC_API_URL;

export const getImgUrl = (
	recordId: string,
	filename: string,
	thumbSize?: ImageSize
) => {
	const url = `${apiUrl}/api/files/posts/${recordId}/${filename}`;
	return thumbSize ? `${url}?thumb=${thumbSize}` : url;
};
