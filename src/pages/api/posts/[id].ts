import { postSchemaFormData } from "@/entities/posts";
import { separateTags } from "@/pages/api/_utils/separate-tags";
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

	const { data, error } = postSchemaFormData.safeParse(parsed);

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
	 */
	try {
		const { file, tags, ...rest } = data;
		await pbClient.collection("posts").update(postId, {
			...rest,
			...(data.file && data.file.size > 0 && { file: data.file }),
			tags: tagIds,
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
