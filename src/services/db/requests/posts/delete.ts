import { dbClient } from "@/services/db/db";

/**
 * Delete a post by ID.
 *
 * @export
 * @param {string} id
 */
export async function deletePost(id: string) {
	await dbClient.post.delete({
		where: {
			id,
		},
	});
}
