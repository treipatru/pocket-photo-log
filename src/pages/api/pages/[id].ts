import { pageSchemaForm } from "@/entities/pages";
import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ locals, params }) => {
	const pageId = params.id;

	if (!pageId) {
		return new Response(
			JSON.stringify({
				message: "Invalid page id",
			}),
			{ status: 400 }
		);
	}

	try {
		await locals.pbClient.collection("pages").delete(pageId);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to delete page",
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
