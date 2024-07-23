import type { Tag } from "@/entities/tags";

/**
 * Utility function to separate existing tags from new ones.
 *
 * @export
 * @param {Tag[]} tags
 * @param {string[]} tagNames
 * @return {Object}
 * @property {string[]} existingTagIds
 * @property {string[]} newTagNames
 */
export function separateTags(
	tags: Tag[],
	tagNames: string[]
): {
	existingTagIds: string[];
	newTagNames: string[];
} {
	const uniqueTagNames = [...new Set(tagNames)];

	const existingTagIds: string[] = [];
	const newTagNames: string[] = [];

	for (const tag of uniqueTagNames) {
		const existingTag = tags.find((item) => item.name === tag);

		if (existingTag) {
			existingTagIds.push(existingTag.id);
			continue;
		}

		newTagNames.push(tag);
	}

	return {
		existingTagIds,
		newTagNames,
	};
}
