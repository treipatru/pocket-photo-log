import { deleteTagById, updateTag } from "@/services/db/requests/tags";
import { tagSchemaFormUpdate } from "@/entities/tags";
import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ params }) => {
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
		await deleteTagById(tagId);
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

export const PATCH: APIRoute = async ({ params, request }) => {
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
		const updatedTag = await updateTag({ id: tagId, name: data.name });

		return new Response(JSON.stringify(updatedTag), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to update tag.",
				error: error,
			}),
			{ status: 500 }
		);
	}
};
