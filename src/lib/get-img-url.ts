import { IMAGE_SIZES, IMAGE_FORMAT } from "@/constants";

type ImageSize = keyof typeof IMAGE_SIZES;

function urlFromSize(size: ImageSize, imageUrl: string) {
	return imageUrl.replace(
		IMAGE_FORMAT,
		"-" + IMAGE_SIZES[size].size + IMAGE_FORMAT
	);
}

export function getImgUrl(imageUrl: string, size?: ImageSize) {
	switch (true) {
		case size === "MD":
			return urlFromSize("MD", imageUrl);
		case size === "SM":
			return urlFromSize("SM", imageUrl);
		default:
			return urlFromSize("LG", imageUrl);
	}
}
