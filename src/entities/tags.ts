import z from "zod";

export const tagSchema = z.object({
	id: z.string(),
	name: z.string(),
	post_count: z.number().optional(),
});

export type Tag = z.infer<typeof tagSchema>;

export type TagCategory =
	| "camera"
	| "co"
	| "film"
	| "form"
	| "format"
	| "pl"
	| "set";

export type StructuredTags = {
	camera?: Tag;
	co?: Tag;
	film?: Tag;
	form?: Tag;
	format?: Tag;
	other: Tag[];
	pl?: Tag;
	set?: Tag;
};

type SanitizeTagNamesOutput = "str" | "arr";

/**
 *
 * Process an array of tag names into a single string.
 *
 * Perform clean up on the tags for consistency.
 *
 * @export
 * @template T
 * @param {(string[] | string)} [tags]
 * @param {T} [output="str" as T]
 * @return {*}  {T extends "arr" ? string[] : string}
 */
export function sanitizeTagNames<T extends SanitizeTagNamesOutput | undefined>(
	tags?: string[] | string,
	output: T = "str" as T
): T extends "arr" ? string[] : string {
	if (!tags) {
		return (output === "arr" ? [] : "") as T extends "arr" ? string[] : string;
	}

	const data = Array.isArray(tags) ? tags : tags.split(",");

	const cleanTags = data
		// Remove any whitespace
		.map((tag) => tag.trim())
		// Remove any empty tags
		.filter((tag) => tag.length > 0)
		// Remove any whitespace around the delimiter
		.map((tag) => tag.replace(/\s*:\s*/g, ": "))
		// Remove any tags with more than one delimiter
		.filter((tag) => tag.split(":").length - 1 < 2);

	return (output === "arr" ? cleanTags : cleanTags.join(",")) as T extends "arr"
		? string[]
		: string;
}
