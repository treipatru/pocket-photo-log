import type { Post } from "@/entities/posts";
import { dbClient } from "@/services/db/db";

export async function getPaginatedPosts({
	page = 1,
	perPage = 10,
	tagId,
	year,
}: APIPaginationOptions & {
	tagId?: string;
	year?: string;
}): Promise<APIPaginatedResponse<Post>> {
	const where: any = {};

	// Add the tag ID to the where clause if it exists
	if (tagId) {
		where.tags = {
			some: {
				id: tagId,
			},
		};
	}

	// Add the year to the where clause if it exists
	if (year) {
		const startDate = new Date(parseInt(year), 0, 1); // January 1st of the given year
		const endDate = new Date(parseInt(year) + 1, 0, 1); // January 1st of the next year

		where.shotOn = {
			gte: startDate,
			lt: endDate,
		};
	}

	// Retrieve the posts
	const posts = await dbClient.post.findMany({
		where,
		include: {
			tags: {
				select: {
					id: true,
					name: true,
				},
			},
		},
		orderBy: {
			shotOn: "desc",
		},
		skip: (page - 1) * perPage,
		take: perPage,
	});

	// Get the total number of posts
	const total = await dbClient.post.count({
		where,
	});

	// Increment the view count for each post
	if (total > 0) {
		await dbClient.post.updateMany({
			where: { id: { in: posts.map((post) => post.id) } },
			data: { views: { increment: 1 } },
		});
	}

	return {
		items: posts,
		pagination: {
			page,
			perPage,
			totalItems: total,
			totalPages: Math.ceil(total / perPage),
		},
	};
}

/**
 * Get a post by its ID.
 *
 * @export
 * @param {string} id
 * @return {*}
 */
export async function getPostById(id: string): Promise<Post | null> {
	return await dbClient.post.update({
		where: { id },
		data: {
			views: {
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
}

/**
 * Get a list of all years with the number of posts published in each year.
 *
 * @export
 * @return {*}
 */
export async function getYearlyPostCount(): Promise<YearlyPostCount[]> {
	const yearlyPostCount: YearlyPostCountRaw[] = await dbClient.$queryRaw`
    SELECT
      CAST(strftime('%Y', datetime(shotOn / 1000, 'unixepoch')) AS INTEGER) as year,
      COUNT(*) as postCount
    FROM Post
    WHERE published = true
    GROUP BY year
    ORDER BY year DESC
  `;

	return yearlyPostCount.map((item: YearlyPostCountRaw) => ({
		year: Number(item.year),
		postCount: Number(item.postCount),
	}));
}

export type YearlyPostCountRaw = {
	postCount: bigint;
	year: bigint;
};

export type YearlyPostCount = {
	postCount: number;
	year: number;
};
