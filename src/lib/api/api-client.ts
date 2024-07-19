import { type TypedPocketBase } from "@/entities/api-client";
import PocketBase from "pocketbase";
import { getEnvVar } from "@/lib/get-env-var";

export const createApiClient = async (
	url: string,
	user: string,
	key: string
) => {
	const pb = new PocketBase(url) as TypedPocketBase;

	try {
		await pb.collection("users").authWithPassword(user, key);

		if (!pb.authStore.isValid) {
			throw new Error("Invalid credentials");
		}
	} catch (_) {
		throw new Error("Invalid credentials");
	}

	pb.beforeSend = function (url, options) {
		options.headers = Object.assign({}, options.headers, {
			Authorization: `${pb.authStore.token}`,
		});

		return { url, options };
	};

	return pb;
};

export const apiClient = await createApiClient(
	getEnvVar("API_URL"),
	getEnvVar("API_USER"),
	getEnvVar("API_KEY")
);
