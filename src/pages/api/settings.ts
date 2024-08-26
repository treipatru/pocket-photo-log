import type { APIRoute } from "astro";
import { settingsSchemaFormUpdate } from "@/entities/settings";

export const PUT: APIRoute = async ({ locals }) => {
	const { postPayload, pbClient } = locals;
	/**
	 * Parse and validate the data
	 */

	const { data, error } = settingsSchemaFormUpdate.safeParse(postPayload);

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
	 * PocketBase does not allow updating multiple resource IDs at once.
	 */

	try {
		const settingsDb = await pbClient.collection("settings").getFullList();
		const payloadKeys = Object.keys(data);

		payloadKeys.forEach(async (key) => {
			const settingId = settingsDb.find((setting) => setting.name === key)?.id;

			if (!settingId) {
				throw new Error("Setting not found");
			}

			await pbClient.collection("settings").update(settingId, {
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
