import type { APIRoute } from "astro";
import { separateTags } from "@/pages/api/_utils/separate-tags";
import { postSchemaFormCreate } from "@/entities/posts";
import { z } from "zod";
import { sanitizeTagNames } from "@/entities/tags";

export const POST: APIRoute = async ({ locals, request }) => {
	/**
	 * Parse and validate the data
	 */

	const formData = await request.formData();
	const parsed = Object.fromEntries(formData.entries());

	/**
	 * Since the form data is not typed, everything is a string so we need to
	 * update the schema to reflect that.
	 */
	const { data, error } = postSchemaFormCreate
		.extend({
			published: z.string().optional(),
			tags: z.string().optional(),
		})
		.safeParse(parsed);

	if (error) {
		return new Response(
			JSON.stringify({
				message: "Invalid post data",
			}),
			{ status: 400 }
		);
	}
	const { pbClient } = locals;

	/**
	 * Get the tag ids and create new ones if necessary
	 */

	const tagIds = [];
	if (data.tags) {
		const allTags = await pbClient.collection("tags").getFullList();
		const { existingTagIds, newTagNames } = separateTags(
			allTags,
			sanitizeTagNames(data.tags, "arr")
		);
		tagIds.push(...existingTagIds);

		/**
		 * Create new tags if necessary
		 */
		try {
			for (const tag of newTagNames) {
				const newTag = await pbClient.collection("tags").create({ name: tag });
				tagIds.push(newTag.id);
			}
		} catch (error) {
			return new Response(
				JSON.stringify({
					message: "Failed to create new tags",
				}),
				{ status: 500 }
			);
		}
	}

	/**
	 * Create the post
	 */
	try {
		const payload = {
			...data,
			tags: tagIds, // PB expects an array of tag ids, not a string
		};

		await pbClient.collection("posts").create(payload);
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to create post",
			}),
			{ status: 500 }
		);
	}

	return new Response(
		JSON.stringify({
			message: "Success!",
		}),
		{ status: 200 }
	);
};
