import type { Post, PostFormCreate } from "@/entities/posts";
import { dbClient } from "@/services/db/db";

/**
 * The data required to create a new post.
 * This corresponds to the types which the DB expects.
 */
export type CreatePostData = Omit<PostFormCreate, "file" | "published"> & {
	height: number;
	imageUrl: string;
	published: boolean;
	width: number;
};

/**
 * Create a new post
 *
 * @export
 * @param {CreatePostData} data
 * @return {*}
 */
export async function createPost(data: CreatePostData): Promise<Post> {
	return await dbClient.post.create({
		data: {
			alt: data.alt,
			caption: data.caption,
			height: data.height,
			imageUrl: data.imageUrl,
			published: data.published,
			shotOn: new Date(data.shotOn),
			width: data.width,
			tags: {
				connectOrCreate: data.tags.map((tag) => ({
					where: {
						name: tag,
					},
					create: {
						name: tag,
					},
				})),
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
}
