import type { APIRoute } from "astro";
import { settingsSchemaFormUpdate } from "@/entities/settings";
import { updateSetting } from "@/services/db/requests/settings";

export const PUT: APIRoute = async ({ request }) => {
	const payload = await request.json();
	/**
	 * Parse and validate the data
	 */

	const { data, error } = settingsSchemaFormUpdate.safeParse(payload);

	if (error) {
		return new Response(
			JSON.stringify({
				message: "Invalid settings data",
			}),
			{ status: 400 }
		);
	}

	/**
	 * Update settings one by one.
	 * PocketBase does not allow updating multiple records at once.
	 */

	try {
		Object.keys(data).forEach(async (key) => {
			await updateSetting({
				name: key,
				value: data[key as keyof typeof data],
			});
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to update settings",
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
