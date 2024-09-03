import type { APIRoute } from "astro";
import { pageSchemaForm } from "@/entities/pages";

export const POST: APIRoute = async ({ locals, request }) => {
	const payload = await request.json();
	const { data, error } = pageSchemaForm.safeParse(payload);

	if (error) {
		return new Response(
			JSON.stringify({
				message: "Invalid post data",
			}),
			{ status: 400 }
		);
	}

	try {
		await locals.pbClient.collection("pages").create(data);
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to create page",
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
