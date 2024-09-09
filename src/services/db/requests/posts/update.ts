import { dbClient } from "@/services/db/db";
import { type Post } from "@/entities/posts";
import { type CreatePostData } from "@/services/db/requests/posts/create";

export type EditPostData = Partial<CreatePostData>;

export async function updatePost(
	id: string,
	data: EditPostData,
): Promise<Post> {
	const { tags, ...updateData } = data;

	try {
		return await dbClient.post.update({
			where: { id },
			data: {
				...updateData,
				tags: {
					// First, remove all existing tag connections
					set: [],
					// Then connect or create new tags
					...(tags && tags.length > 0
						? {
								connectOrCreate: tags.map((tag) => ({
									where: { name: tag },
									create: { name: tag },
								})),
							}
						: {}),
				},
			},
			include: {
				tags: {
					select: {
						id: true,
						name: true,
					},
				},
			},
		});
	} catch (error) {
		throw new Error(`Failed to update post: ${(error as Error).message}`);
	}
}

export const incrementLikeCount = async (postId: string): Promise<Post> => {
	return await dbClient.post.update({
		where: { id: postId },
		data: {
			likes: {
				increment: 1,
			},
		},
		include: {
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
		},
	});
};
