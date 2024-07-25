import { pocketClient } from "@/services/pocket/pocket-client";
import type { APIRoute } from "astro";
import z from "zod";

const postPayloadSchema = z.object({
	query: z.string(),
});

export const POST: APIRoute = async ({ locals }) => {
	const { success, data } = postPayloadSchema.safeParse(locals.postPayload);

	if (!success) {
		return new Response(
			JSON.stringify({
				message: "Invalid payload.",
			}),
			{ status: 400 }
		);
	}

	try {
		const tags = await pocketClient.collection("tags").getList(1, 10, {
			filter: `name ~ "${data.query}"`,
		});

		return new Response(
			JSON.stringify({
				...tags,
			}),
			{ status: 200 }
		);
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to fetch tags.",
			}),
			{ status: 500 }
		);
	}
};
