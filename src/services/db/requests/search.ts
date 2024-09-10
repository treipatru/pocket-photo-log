import { dbClient } from "@/services/db/db";
import type { Tag } from "@/entities/tags";

/**
 * Search for tags by name.
 *
 * @export
 * @param {{ query: string }} { query }
 * @return {*}
 */
export function searchTags({ query }: { query: string }): Promise<Tag[]> {
	return dbClient.tag.findMany({
		where: {
			name: {
				contains: query,
			},
		},
		select: {
			id: true,
			name: true,
		},
	});
}
