import { searchTags } from "@/services/db/requests/search";
import type { APIRoute } from "astro";
import z from "zod";

const postPayloadSchema = z.object({
	query: z.string(),
});

export const POST: APIRoute = async ({ request }) => {
	const payload = await request.json();
	const { success, data } = postPayloadSchema.safeParse(payload);

	if (!success) {
		return new Response(
			JSON.stringify({
				message: "Invalid payload.",
			}),
			{ status: 400 }
		);
	}

	try {
		const tags = await searchTags({ query: data.query });

		return new Response(JSON.stringify(tags), { status: 200 });
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to fetch tags.",
			}),
			{ status: 500 }
		);
	}
};
