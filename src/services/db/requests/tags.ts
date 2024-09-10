import { dbClient } from "@/services/db/db";
import type { Tag } from "@/entities/tags";

/**
 * Create a new tag with the provided name.
 *
 * @export
 * @param {string} name
 * @return {*}
 */
export async function createTag(name: string): Promise<Tag> {
	const newTag = await dbClient.tag.create({
		data: {
			name: name.trim().toLowerCase(),
		},
	});

	return {
		id: newTag.id,
		name: newTag.name,
	};
}

/**
 * Delete a tag by its ID.
 *
 * @export
 * @param {string} id
 */
export async function deleteTagById(id: string) {
	await dbClient.tag.delete({
		where: { id },
	});
}

/**
 * Get a list of ALL tags.
 *
 * @export
 * @return {*}
 */
export async function getTags(): Promise<Tag[]> {
	return await dbClient.tag.findMany({
		select: {
			id: true,
			name: true,
		},
	});
}

/**
 * Get a paginated list of tags.
 *
 * @export
 * @param {APIPaginationOptions} {
 * 	page = 1,
 * 	perPage = 10,
 * 	query = "",
 * }
 * @return {*}  {Promise<APIPaginatedResponse<Tag>>}
 */
export async function getPaginatedTags({
	page = 1,
	perPage = 10,
	query = "",
}: APIPaginationOptions): Promise<APIPaginatedResponse<Tag>> {
	// If query is provided, filter tags by name
	const where = query.length
		? {
				name: {
					contains: query.trim().toLowerCase(),
				},
		  }
		: {};

	// Fetch tags with post count, ordered by post count
	const tagsWithCount = await dbClient.tag.findMany({
		where,
		select: {
			id: true,
			name: true,
			_count: {
				select: { Posts: true },
			},
		},
		orderBy: {
			Posts: {
				_count: "desc",
			},
		},
		skip: (page - 1) * perPage,
		take: perPage,
	});

	// Get total count of tags
	const totalTags = await dbClient.tag.count();

	// Transform the result to match our desired output structure
	const items = tagsWithCount.map((tag) => ({
		id: tag.id,
		name: tag.name,
		postCount: tag._count.Posts,
	}));

	return {
		items,
		pagination: {
			page,
			perPage,
			totalItems: totalTags,
			totalPages: Math.ceil(totalTags / perPage),
		},
	};
}

/**
 * Get a tag by its ID.
 *
 * @export
 * @param {string} id
 * @return {*}
 */
export async function getTagById(id: string): Promise<Tag | null> {
	return await dbClient.tag.findUnique({
		where: { id },
		select: {
			id: true,
			name: true,
		},
	});
}

/**
 * Get all the tags which have at least one published post associated with them.
 *
 * @export
 * @return {*}
 */
export async function getTagsWithPosts(): Promise<Tag[]> {
	const tags = await dbClient.tag.findMany({
		where: {
			Posts: {
				some: {
					published: true,
				},
			},
		},
		include: {
			_count: {
				select: {
					Posts: true,
				},
			},
		},
	});

	return tags.map((tag) => ({ id: tag.id, name: tag.name }));
}

/**
 * Update a tag by its ID.
 *
 * @export
 * @param {{ id: string; name: string }} { id, name }
 * @return {*}
 */
export async function updateTag({
	id,
	name,
}: {
	id: string;
	name: string;
}): Promise<Tag> {
	const updatedTag = await dbClient.tag.update({
		where: { id },
		data: {
			name,
		},
	});

	return {
		id: updatedTag.id,
		name: updatedTag.name,
	};
}
