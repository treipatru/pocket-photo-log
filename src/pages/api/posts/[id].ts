import {
	updatePost,
	type EditPostData,
} from "@/services/db/requests/posts/update";
import { deletePost } from "@/services/db/requests/posts/delete";
import { postSchemaFormUpdate } from "@/entities/posts";
import { z } from "zod";
import type { APIRoute } from "astro";
import { imageProcessDelete } from "@/utils/images/image-process-delete";
import { imageProcessUpload } from "@/utils/images/image-process-upload";

export const DELETE: APIRoute = async ({ params }) => {
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
		await imageProcessDelete(postId);
		await deletePost(postId);

		return new Response(
			JSON.stringify({
				message: "Success!",
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to delete post.",
			}),
			{ status: 500 }
		);
	}
};

export const PATCH: APIRoute = async ({ request, params }) => {
	const formData = await request
		.formData()
		.then((data) => Object.fromEntries(data));
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
		.safeParse(formData);

	if (error || !postId) {
		return new Response(
			JSON.stringify({
				message: "Invalid post data",
			}),
			{ status: 400 }
		);
	}

	try {
		const payload: EditPostData = {
			tags: data.tags?.split(",").filter((tag) => !!tag.length) ?? [],
		};

		if (data.shotOn) {
			payload.shotOn = new Date(data.shotOn).toISOString();
		}

		if (data.file && data.file.size > 0) {
			const { imageUrl, metadata } = await imageProcessUpload(data.file);
			await imageProcessDelete(postId);

			payload.imageUrl = imageUrl;
			payload.width = metadata.width;
			payload.height = metadata.height;
		}

		const updatedPost = await updatePost(postId, payload);

		return new Response(JSON.stringify(updatedPost), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to update post",
			}),
			{ status: 500 }
		);
	}
};
