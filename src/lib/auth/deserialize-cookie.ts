import z from "zod";

const cookieSchema = z.object({
	data: z.object({
		token: z.string().min(10),
		model: z.object({
			avatar: z.string(),
			collectionId: z.string(),
			collectionName: z.string(),
			created: z.string(),
			email: z.string(),
			emailVisibility: z.boolean(),
			id: z.string(),
			name: z.string(),
			updated: z.string(),
			username: z.string(),
			verified: z.boolean(),
		}),
	}),
	attributes: z.object({
		Path: z.string(),
		Expires: z.string(),
		HttpOnly: z.boolean(),
		Secure: z.boolean(),
		SameSite: z.literal("Strict"),
	}),
});

export function deserializeCookie(cookie: string) {
	let parts = cookie.split("; ");

	/**
	 * Extract the JSON string from the cookie
	 */
	let jsonStringEncoded = parts[0].split("=")[1];
	const jsonStringDecoded = decodeURIComponent(jsonStringEncoded);
	const jsonObject = JSON.parse(jsonStringDecoded);

	/**
	 * Extract the attributes from the cookie
	 */
	let attributes = {};
	for (let i = 1; i < parts.length; i++) {
		let [key, value] = parts[i].split("=");

		// @ts-ignore
		attributes[key] = value || true;
	}

	return cookieSchema.parse({
		data: jsonObject,
		attributes: attributes,
	});
}
