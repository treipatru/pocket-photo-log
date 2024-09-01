import { postSchemaFormUpdate, type PostFormUpdate } from "@/entities/posts";
import { separateTags } from "@/pages/api/_utils/separate-tags";
import { imgGetOptimized } from "@/utils/img-get-optimized";
import { z } from "zod";
import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ locals, params }) => {
	const postId = params.id;

	if (!postId) {
		return new Response(
			JSON.stringify({
				message: "Invalid post id",
			}),
			{ status: 400 }
		);
	}

	try {
		await locals.pbClient.collection("posts").delete(postId);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to delete post.",
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

export const PATCH: APIRoute = async ({ locals, request, params }) => {
	const formData = await request.formData();
	const parsed = Object.fromEntries(formData.entries());
	const postId = params.id;

	/**
	 * Since the FormData object received with the request is not typed,
	 * everything is a string so we need to update the initial schema
	 * to reflect that.
	 */
	const { data, error } = postSchemaFormUpdate
		.extend({
			published: z.string().optional(),
			tags: z.string().optional(),
		})
		.safeParse(parsed);

	if (error || !postId) {
		return new Response(
			JSON.stringify({
				message: "Invalid post data",
			}),
			{ status: 400 }
		);
	}

	const { pbClient } = locals;

	const tagIds = [];
	if (data.tags) {
		const allTags = await locals.pbClient.collection("tags").getFullList();
		const { existingTagIds, newTagNames } = separateTags(
			allTags,
			data.tags.split(",")
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
	 * Update the post
	 * If the file is empty, do not update the field.
	 * FIXME: Impossible to delete tags if length is 0. Published is not updated.
	 */
	try {
		const { file, tags, ...rest } = data;

		/**
		 * We are adding the width and height of the image to the existing type.
		 * The W/H properties are part of the Post data type, but they are always
		 * calculated by the backend so they are not accepted in the request body.
		 */
		const payload: PostFormUpdate & {
			width?: number;
			height?: number;
		} = {};

		// Process image if it exists
		if (file && file.size > 0) {
			const { file: resized, metaData } = await imgGetOptimized(file);

			payload.file = resized;
			payload.height = metaData.height;
			payload.width = metaData.width;
		}

		// Include tags if there are any
		if (tagIds.length > 0) {
			payload.tags = tagIds;
		}

		await pbClient.collection("posts").update(postId, {
			...rest,
			...payload,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to update post",
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
