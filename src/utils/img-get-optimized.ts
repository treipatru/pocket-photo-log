import sharp from "sharp";

type StripResizeImgResult = Promise<{
	file: File;
	metaData: { height: number; width: number };
}>;

/**
 * Strip metadata from an image file and resize it.
 *
 * TODO: make the image size and quality configurable
 *
 * @export
 * @param {File} file
 * @return {*}
 */
export async function imgGetOptimized(file: File): StripResizeImgResult {
	// Convert the file to a buffer as this is what sharp expects
	const originalBuffer = await file.arrayBuffer();

	// Resize the image and transform it to a buffer
	const resizedBuffer = await sharp(Buffer.from(originalBuffer))
		.withMetadata({})
		.resize({
			width: 1000,
			height: 1000,
			fit: sharp.fit.inside, // Ensures the image fits within the specified dimensions
			withoutEnlargement: true, // Prevent upscaling
		})
		.jpeg({ quality: 90 })
		.toBuffer();

	// Convert the buffer back to a file
	const resizedFile = new File([resizedBuffer], file.name);

	// Get the metadata of the resized image
	const metadata = await resizedFile
		.arrayBuffer()
		.then((buffer) => sharp(buffer).metadata());

	// This should never be the case, but just to be safe
	if (!metadata.height || !metadata.width) {
		throw new Error("Failed to get metadata for resized image");
	}

	return {
		file: resizedFile,
		metaData: {
			height: metadata.height,
			width: metadata.width,
		},
	};
}
