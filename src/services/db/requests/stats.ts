import { dbClient } from "@/services/db/db";
import type { Stat } from "@prisma/client";

/**
 * Get the stats for a post by its ID.
 *
 * @export
 * @param {string} postId
 * @return {*}
 */
export async function getStats(postId: string): Promise<Stat | null> {
	return await dbClient.stat.findUnique({
		where: {
			postId: postId,
		},
	});
}

/**
 * Increment the like count for a post by its ID.
 *
 * @export
 * @param {string} postId
 * @return {*}
 */
export async function incrementLikeCount(postId: string): Promise<Stat> {
	return await dbClient.stat.upsert({
		where: {
			postId: postId,
		},
		create: {
			post: {
				connect: {
					id: postId,
				},
			},
		},
		update: {
			likes: {
				increment: 1,
			},
		},
	});
}
