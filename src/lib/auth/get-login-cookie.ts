import { deserializeCookie } from "@/lib/auth/deserialize-cookie";
import { getEnvVar } from "@/lib/get-env-var";
import PocketBase from "pocketbase";

/**
 * Gets a JWT cookie for a user.
 */
export const getLoginCookie = async (email: string, password: string) => {
	const pbClient = new PocketBase(getEnvVar("PUBLIC_API_URL"));

	try {
		await pbClient.collection("users").authWithPassword(email, password);

		if (!pbClient.authStore.isValid) {
			throw new Error("Invalid credentials");
		}
	} catch (_) {
		throw new Error("Login failed.");
	}

	/**
	 * The PB client has a method to export the auth store to a cookie, however,
	 * it contains more information than necessary (i.e. the user model).
	 *
	 * We only need the token and the expiry date.
	 */
	const cookie = deserializeCookie(pbClient.authStore.exportToCookie());
	const options = `Path=/; HttpOnly; Secure; SameSite=Strict; Expires=${cookie.attributes.Expires}`;

	return `pb_auth=${cookie.data.token}; ${options}`;
};
