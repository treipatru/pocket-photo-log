import { promises as fs } from "fs";
import { UPLOAD_DIR, IMAGE_FORMAT, IMAGE_SIZES } from "@/constants";
import path from "path";
import sharp, { type ResizeOptions } from "sharp";

const sharedSettings = {
	fit: sharp.fit.inside,
	withoutEnlargement: true,
};

type ImageSaveToDiskOptions = ResizeOptions & {
	maxSideLength: number;
	quality: number;
	size: keyof typeof IMAGE_SIZES;
};

export async function imageSaveToDisk(
	image: Buffer,
	fileId: string,
	options: ImageSaveToDiskOptions
) {
	// Make sure the uploads directory exists
	await fs.mkdir(UPLOAD_DIR, { recursive: true });

	// Create a sharp instance from the image buffer
	const sharpBuffer = sharp(image);

	// Get the file name and path
	const fileName = `${fileId}-${options.size}${IMAGE_FORMAT}`;
	const filePath = path.join(UPLOAD_DIR, "/", fileName);

	// Resize the image and save it to disk
	await sharpBuffer
		.clone()
		.resize({
			...sharedSettings,
			height: options.maxSideLength,
			width: options.maxSideLength,
		})
		// Apply EXIF orientation
		.rotate()
		.jpeg({ quality: options.quality })
		.toFile(filePath);

	// Get the metadata of the saved image
	const metadata = await sharp(filePath).metadata();

	return {
		filePath,
		height: metadata.height,
		width: metadata.width,
	};
}
