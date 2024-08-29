import type { APIRoute } from "astro";
import { pocketClient } from "@/services/pocket/pocket-client";
import type { Stat } from "@/entities/stats";

/**
 * This GET request will increment the likes of a post, in the stats table.
 *
 * We are importing pocketClient instead of using the locals.pbClient instance
 * because this request is public and we don't need to check the user's
 * authentication.
 *
 * The update to the stats table is done by the pocketClient server instance.
 */

export const GET: APIRoute = async ({ params }) => {
	const postId = params.id;

	if (!postId) {
		return new Response(
			JSON.stringify({
				message: "Invalid post",
			}),
			{ status: 400 }
		);
	}

	let stat: Stat | null = null;

	try {
		stat = await pocketClient
			.collection("stats")
			.getFirstListItem(`postId="${postId}"`);

		if (!stat) {
			throw new Error("Failed to get post stats");
		}
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Invalid post.",
			}),
			{ status: 400 }
		);
	}

	try {
		const updatedStats = await pocketClient
			.collection("stats")
			.update(stat.id, {
				likes: stat ? stat.likes + 1 : 1,
			});

		return new Response(
			JSON.stringify({
				likes: updatedStats.likes,
			}),
			{ status: 200 }
		);
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to create page",
			}),
			{ status: 500 }
		);
	}
};
