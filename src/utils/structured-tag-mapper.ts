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
	"yr",
];

export function structuredTagMapper(tags: Tag[]): StructuredTags {
	const structuredTags: StructuredTags = {
		other: tags.filter((t) => /^(?!.*: ).*/.test(t.name)),
	};

	for (const category of categoryKeys) {
		const tag = getStructuredTag(tags, category);

		if (tag) {
			structuredTags[category] = tag;
		}
	}

	return structuredTags;
}
