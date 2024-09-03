import { imgGetOptimized } from "@/utils/img-get-optimized";
import { postSchemaFormCreate, type Post } from "@/entities/posts";
import { sanitizeTagNames } from "@/entities/tags";
import { separateTags } from "@/pages/api/_utils/separate-tags";
import { z } from "zod";
import type { APIRoute } from "astro";
import { captureException } from "@sentry/astro";

export const POST: APIRoute = async ({ locals, request }) => {
	const formData = await request
		.formData()
		.then((data) => Object.fromEntries(data));

	/**
	 * Since the form data is not typed, everything is a string so we need to
	 * update the schema to reflect that.
	 */
	const { data, error } = postSchemaFormCreate
		.extend({
			published: z.string().optional(),
			tags: z.string().optional(),
		})
		.safeParse(formData);

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
	let newPost: Post | null = null;

	try {
		const { file, metaData } = await imgGetOptimized(data.file);

		const payload = {
			...data,
			file,
			height: metaData.height,
			tags: tagIds, // PB expects an array of tag ids, not a string
			width: metaData.width,
		};

		newPost = await pbClient.collection("posts").create(payload);

		if (!newPost) {
			throw new Error();
		}
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to create post",
			}),
			{ status: 500 }
		);
	}

	/**
	 * Create associated stats entry
	 */
	try {
		await pbClient.collection("stats").create({
			postId: newPost.id,
			likes: 0,
			views: 0,
		});
	} catch (error) {
		/**
		 * Log the error but don't block the response.
		 * The stat will be created on the next view.
		 */
		captureException(error);
	}

	return new Response(JSON.stringify(newPost), { status: 200 });
};
