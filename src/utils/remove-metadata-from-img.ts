import sharp from "sharp";

/**
 * Strip metadata from an image file and resize it.
 *
 * @export
 * @param {File} file
 * @return {*}
 */
export async function stripResizeImg(file: File) {
	const buffer = await file.arrayBuffer();

	/**
	 * TODO: make the image size and quality configurable
	 */
	const resized = await sharp(Buffer.from(buffer))
		.withMetadata({})
		.resize({
			width: 1000,
			height: 1000,
			fit: sharp.fit.inside, // Ensures the image fits within the specified dimensions
			withoutEnlargement: true, // Prevent upscaling
		})
		.jpeg({ quality: 90 })
		.toBuffer();

	return new File([resized], file.name);
}
