import { UPLOAD_DIR, IMAGE_FORMAT, IMAGE_SIZES } from "@/constants";
import { getPostById } from "@/services/db/requests/posts";
import fs from "fs";
import path from "path";

function deleteFile(fileName: string) {
	const filePath = path.join(UPLOAD_DIR, fileName);

	try {
		fs.accessSync(filePath);
		fs.unlinkSync(filePath);
	} catch (error) {
		if ((error as NodeJS.ErrnoException).code === "ENOENT") {
			// File doesn't exist, so we'll skip deletion
			return;
		} else {
			throw new Error(`Failed to delete file: ${(error as Error).message}`);
		}
	}
}

async function deleteImagesFromDisk(imageUrl: string) {
	const fileId = imageUrl
		.replace(UPLOAD_DIR, "")
		.replace(IMAGE_FORMAT, "")
		// Remove any remaining slashes
		.replace(/\//g, "");

	Object.keys(IMAGE_SIZES).forEach(async (size) => {
		deleteFile(`${fileId}-${size}${IMAGE_FORMAT}`);
	});
}

/**
 * Delete all images associated with a post from storage
 *
 * @export
 * @param {string} postId
 * @return {*}
 */
export async function imageProcessDelete(postId: string): Promise<void> {
	const post = await getPostById(postId);

	if (!post || !post.image_url) {
		return;
	}

	await deleteImagesFromDisk(post.image_url);
}
