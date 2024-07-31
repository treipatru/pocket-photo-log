import {
	type Tag,
	type TagCategory,
	type StructuredTags,
} from "@/entities/tags";

const tagCategorySeparator = ": ";

function getStructuredTag(
	tags: Tag[],
	tagCategory: TagCategory
): Tag | undefined {
	const tag = tags.find((t) => t.name.startsWith(tagCategory + ": "));

	if (tag) {
		return tagCategoryTrimmer(tag, tagCategory);
	}
}

/**
 * TODO: This should be included into a mapper applied to the response of
 * API calls.
 */

function tagCategoryTrimmer(tag: Tag, category: TagCategory): Tag {
	return {
		...tag,
		name: tag.name.replace(`${category}${tagCategorySeparator}`, ""),
	};
}

const categoryKeys: TagCategory[] = [
	"camera",
	"co",
	"film",
	"form",
	"format",
	"pl",
];

export function structuredTagMapper(tags: Tag[]): StructuredTags {
	const structuredTags: StructuredTags = {
		/**
		 * Filter out tags which are already categorized.
		 * This means that anything starting with the category key will
		 * not be in the `other` array.
		 *
		 * Tags which use the same format as the category keys but have different
		 * values will be included.
		 *
		 * Example:
		 * - 'camera: 35mm' will not be included
		 * - 'my-property: my-value' will be included
		 */
		other: tags.filter(
			(tag) => !categoryKeys.some((key) => tag.name.startsWith(key))
		),
	};

	for (const category of categoryKeys) {
		const tag = getStructuredTag(tags, category);

		if (tag) {
			structuredTags[category] = tag;
		}
	}

	return structuredTags;
}
