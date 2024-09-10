import { incrementLikeCount } from "@/services/db/requests/posts/update";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
	const postId = params.id;

	if (!postId) {
		return new Response(
			JSON.stringify({
				message: "Invalid post",
			}),
			{ status: 400 },
		);
	}

	try {
		const updatedPost = await incrementLikeCount(postId);

		return new Response(
			JSON.stringify({
				likes: updatedPost.likes,
				views: updatedPost.views,
			}),
			{ status: 200 },
		);
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Failed to like post",
			}),
			{ status: 500 },
		);
	}
};
