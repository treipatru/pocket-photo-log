import { createUser, getUserByUsername } from "@/services/db/requests/auth";
import { generateIdFromEntropySize } from "lucia";
import { hash } from "@node-rs/argon2";
import { HASH_PARAMETERS, lucia } from "@/services/lucia";
import type { APIRoute } from "astro";
import { userSignupSchema } from "@/entities/users";

export const POST: APIRoute = async ({ cookies, redirect, request }) => {
	const payload = await request
		.json()
		.then((data) => userSignupSchema.safeParse(data));
	const { data, error } = payload;

	if (error) {
		return new Response(
			JSON.stringify({
				message: "Invalid credentials",
			}),
			{ status: 400 }
		);
	}

	const userId = generateIdFromEntropySize(10); // 16 characters long
	const passwordHash = await hash(data.password, HASH_PARAMETERS);

	try {
		const user = await getUserByUsername(data.username);
		if (user) {
			return new Response(
				JSON.stringify({
					message: "Invalid credentials",
				}),
				{ status: 400 }
			);
		}
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: error,
			}),
			{ status: 500 }
		);
	}

	await createUser({
		id: userId,
		password_hash: passwordHash,
		username: data.username,
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);

	cookies.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return redirect("/");
};
