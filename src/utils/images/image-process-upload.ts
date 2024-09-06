import { createId } from "@paralleldrive/cuid2";
import { imageSaveToDisk } from "@/utils/images/image-save-to-disk";
import { UPLOAD_DIR, IMAGE_FORMAT, IMAGE_SIZES } from "@/constants";

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
			})
		);

		const largeImageMetadata = savedFiles[savedFiles.length - 1];

		return {
			imageUrl: `/${UPLOAD_DIR}/${fileId}${IMAGE_FORMAT}`,
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
