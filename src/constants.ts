export const IMAGE_FORMAT = ".jpg";

export const UPLOAD_DIR = "storage/images";

export const IMAGE_SIZES = {
	SM: {
		maxSideLength: 100,
		quality: 75,
		size: "SM",
	},
	MD: {
		maxSideLength: 500,
		quality: 85,
		size: "MD",
	},
	LG: {
		maxSideLength: 1000,
		quality: 90,
		size: "LG",
	},
} as const;
