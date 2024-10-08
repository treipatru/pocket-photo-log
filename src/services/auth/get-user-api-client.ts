import { type TypedPocketBase } from "@/entities/api-client";
import PocketBase from "pocketbase";

export const getUserApiClient = async (
	jwt: string
): Promise<TypedPocketBase> => {
	const pbClient = new PocketBase(process.env.PUBLIC_API_URL);

	/**
	 * Load the cookie into the client and do a first local check
	 */
	pbClient.authStore.save(jwt);
	if (!pbClient.authStore.isValid) {
		throw new Error("Invalid cookie");
	}

	/**
	 * Check with the backend if the cookie is still valid
	 */
	try {
		pbClient.authStore.isValid &&
			(await pbClient.collection("users").authRefresh());
	} catch (_) {
		throw new Error("Invalid session");
	}

	return pbClient;
};
