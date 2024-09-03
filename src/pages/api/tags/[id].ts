import { tagSchemaFormUpdate } from "@/entities/tags";
import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ locals, params }) => {
	const tagId = params.id;

	if (!tagId) {
		return new Response(
			JSON.stringify({
				message: "Invalid tag id",
			}),
			{ status: 400 }
		);
	}

	try {
		await locals.pbClient.collection("tags").delete(tagId);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to delete tag.",
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

export const PATCH: APIRoute = async ({ locals, params, request }) => {
	const tagId = params.id;
	const payload = await request.json();

	const { data, error } = tagSchemaFormUpdate.safeParse(payload);

	if (error || !tagId) {
		return new Response(
			JSON.stringify({
				message: "Invalid tag data",
			}),
			{ status: 400 }
		);
	}

	try {
		const updatedTag = await locals.pbClient.collection("tags").update(tagId, {
			name: data.name,
		});

		return new Response(JSON.stringify(updatedTag), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response(
			JSON.stringify({
				message: "Failed to update tag.",
				error: error,
			}),
			{ status: 500 }
		);
	}
};
