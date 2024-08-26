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
