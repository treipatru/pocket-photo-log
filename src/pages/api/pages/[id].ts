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

export const PATCH: APIRoute = async ({ locals, params }) => {
	const pageId = params.id;
	const { data, error } = pageSchemaForm.safeParse(locals.postPayload);

	if (error || !pageId) {
		return new Response(
			JSON.stringify({
				message: "Invalid page data",
			}),
			{ status: 400 }
		);
	}

	try {
		await locals.pbClient.collection("pages").update(pageId, data);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to update page",
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
