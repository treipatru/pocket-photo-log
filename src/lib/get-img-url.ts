export type ImageSize = "650x650f" | "900x900f";

/**
 * TODO: This can't be in process.env but it should!
 * Since this method is used in the browser too we need to make it
 * available there too.
 *
 */

const apiUrl = "https://p34rev.planet34.org";

export const getImgUrl = (
	recordId: string,
	filename: string,
	thumbSize?: ImageSize
) => {
	const url = `${apiUrl}/api/files/posts/${recordId}/${filename}`;
	return thumbSize ? `${url}?thumb=${thumbSize}` : url;
};
