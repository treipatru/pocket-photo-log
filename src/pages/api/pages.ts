import type { APIRoute } from "astro";
import { pageCreateSchema } from "@/entities/pages";
import { createPage, getPageBySlug } from "@/services/db/requests/pages";

export const POST: APIRoute = async ({ request }) => {
	const payload = await request.json();
	const { data, error } = pageCreateSchema.safeParse(payload);

	if (error) {
		return new Response(
			JSON.stringify({
				message: "Invalid page data",
			}),
			{ status: 400 }
		);
	}

	const existingPage = await getPageBySlug(data.slug);
	if (existingPage) {
		return new Response(
			JSON.stringify({
				message: "Page with that slug already exists",
			}),
			{ status: 400 }
		);
	}

	try {
		const newPage = await createPage(data);
		return new Response(JSON.stringify(newPage), { status: 200 });
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to create page",
			}),
			{ status: 500 }
		);
	}
};
