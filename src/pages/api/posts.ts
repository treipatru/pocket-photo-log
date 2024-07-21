import type { APIRoute } from "astro";
import { postSchemaCreateFormData } from "@/entities/posts";

export const POST: APIRoute = async ({ locals, request }) => {
	/**
	 * Parse and validate the data
	 */

	const formData = await request.formData();
	const parsed = Object.fromEntries(formData.entries());

	const { data, error } = postSchemaCreateFormData.safeParse(parsed);

	if (error) {
		return new Response(
			JSON.stringify({
				message: "Invalid post data",
			}),
			{ status: 400 }
		);
	}

	// Verify that post tags are unique
	const tags = data.tags.split(",");
	const uniqueTags = new Set(tags);

	if (tags.length !== uniqueTags.size) {
		return new Response(
			JSON.stringify({
				message: "Post tags must be unique",
			}),
			{ status: 400 }
		);
	}

	/**
	 * Get the tag ids and create new ones if necessary
	 */
	const tagIds: string[] = [];

	try {
		const allTags = await locals.pbClient.collection("tags").getFullList();
		const postTags = data.tags.split(",");

		await Promise.all(
			postTags.map(async (tag) => {
				const tagId = allTags.find((item) => item.name === tag)?.id;

				if (!!tagId) {
					tagIds.push(tagId);
					return;
				}

				const newTag = await locals.pbClient
					.collection("tags")
					.create({ name: tag });
				console.log("\ncreated ", newTag.id);
				tagIds.push(newTag.id);
			})
		);
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to handle post tags.",
			}),
			{ status: 500 }
		);
	}

	/**
	 * Create the post
	 */
	try {
		const payload = {
			...data,
			tags: tagIds, // PB expects an array of tag ids, not a string
		};

		await locals.pbClient.collection("posts").create(payload);
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
