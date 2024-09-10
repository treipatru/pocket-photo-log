import { createPost } from "@/services/db/requests/posts/create";
import { imageProcessUpload } from "@/utils/images/image-process-upload";
import { postSchemaFormCreate } from "@/entities/posts";
import { z } from "zod";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
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

	try {
		const { imageUrl, metadata } = await imageProcessUpload(data.file);

		const newPost = await createPost({
			alt: data.alt,
			caption: data.caption,
			height: metadata.height,
			imageUrl: imageUrl,
			published: data.published === "true",
			shotOn: new Date(data.shotOn).toISOString(),
			tags: data.tags?.split(",") ?? [],
			width: metadata.width,
		});

		return new Response(JSON.stringify(newPost), { status: 201 });
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to create post",
			}),
			{ status: 500 }
		);
	}
};
