import { type TypedPocketBase } from "@/entities/api-client";
import PocketBase from "pocketbase";

const createPocketClient = async (url: string, user: string, key: string) => {
	const pb = new PocketBase(url) as TypedPocketBase;

	try {
		await pb.collection("users").authWithPassword(user, key);
		if (!pb.authStore.isValid) {
			throw new Error("Invalid user.");
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

export const pocketClient = await createPocketClient(
	process.env.PUBLIC_API_URL,
	process.env.API_USER,
	process.env.API_KEY
);
