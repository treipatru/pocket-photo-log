import { pageUpdateSchema } from "@/entities/pages";
import {
	deletePage,
	getPageBySlug,
	updatePage,
} from "@/services/db/requests/pages";
import type { Page } from "@prisma/client";
import type { APIRoute } from "astro";

export const DELETE: APIRoute = async ({ params }) => {
	const slug = params.slug;
	if (!slug) {
		return new Response(
			JSON.stringify({
				message: "Invalid page",
			}),
			{ status: 400 }
		);
	}

	/**
	 * Verify that the page exists and retrieve it
	 */
	let page: Page | null = null;
	try {
		page = await getPageBySlug(slug);
		if (!page) {
			return new Response(
				JSON.stringify({
					message: "Page not found",
				}),
				{ status: 404 }
			);
		}
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to retrieve page",
			}),
			{ status: 500 }
		);
	}

	try {
		await deletePage(page.id);
		return new Response(
			JSON.stringify({
				message: "Success!",
			}),
			{ status: 200 }
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to delete page",
			}),
			{ status: 500 }
		);
	}
};

export const PATCH: APIRoute = async ({ params, request }) => {
	const slug = params.slug;
	const { data, error } = await request
		.json()
		.then((data) => pageUpdateSchema.safeParse(data));

	if (error || !slug) {
		return new Response(
			JSON.stringify({
				message: "Invalid page data",
			}),
			{ status: 400 }
		);
	}

	try {
		const updatedPage = await updatePage(data);
		return new Response(JSON.stringify(updatedPage), { status: 200 });
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to update page",
			}),
			{ status: 500 }
		);
	}
};
