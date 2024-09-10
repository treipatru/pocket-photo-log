import { createId } from "@paralleldrive/cuid2";
import { imageSaveToDisk } from "@/utils/images/image-save-to-disk";
import { IMAGE_FORMAT, IMAGE_SIZES } from "@/constants";

export async function imageProcessUpload(file: File) {
	// Generate a unique file id
	const fileId = createId();

	// Convert the file input to a buffer
	const buffer = Buffer.from(await file.arrayBuffer());

	try {
		// Save file variants to disk
		const savedFiles = await Promise.all(
			Object.values(IMAGE_SIZES).map(async (variant) => {
				return imageSaveToDisk(buffer, fileId, variant);
			}),
		);

		const largeImageMetadata = savedFiles[savedFiles.length - 1];

		return {
			/**
			 * The image will be available publicly so it will be served from the
			 * /public directory. However, astro abstracts that away so we only
			 * reference the root of the site. Example:
			 * - On disk 				/public/storage/1234-LG.jpg
			 * - In the browser /storage/1234-LG.jpg
			 **/
			imageUrl: `/storage/${fileId}${IMAGE_FORMAT}`,
			metadata: {
				height: largeImageMetadata?.height!,
				width: largeImageMetadata?.width!,
			},
		};
	} catch (error) {
		console.error("Error processing and saving images:", error);
		throw error;
	}
}
