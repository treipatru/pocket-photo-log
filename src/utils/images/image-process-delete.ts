import { UPLOAD_DIR, IMAGE_FORMAT, IMAGE_SIZES } from "@/constants";
import { getPostById } from "@/services/db/requests/posts/get";
import fs from "fs";
import path from "path";

function deleteFile(filePath: string) {
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
	const fileName = imageUrl.split("/").pop();
	if (!fileName) {
		throw new Error("Failed to extract file name from image URL");
	}

	const fileId = fileName.split(".").shift();

	Object.keys(IMAGE_SIZES).forEach(async (size) => {
		const filePath = path.join(UPLOAD_DIR, `${fileId}-${size}${IMAGE_FORMAT}`);
		deleteFile(filePath);
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

	if (!post?.imageUrl) {
		return;
	}

	await deleteImagesFromDisk(post.imageUrl);
}
