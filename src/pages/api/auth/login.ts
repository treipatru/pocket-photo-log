import { getUserByUsername } from "@/services/db/requests/auth";
import { HASH_PARAMETERS, lucia } from "@/services/lucia";
import { type APIRoute } from "astro";
import { userLoginSchema } from "@/entities/users";
import { verify } from "@node-rs/argon2";

function get401Response() {
	return new Response(
		JSON.stringify({
			message: "Invalid credentials",
		}),
		{ status: 401 }
	);
}

export const POST: APIRoute = async ({ cookies, redirect, request }) => {
	const payload = await request
		.json()
		.then((data) => userLoginSchema.safeParse(data));
	const { data, error } = payload;

	if (error) {
		return get401Response();
	}

	const user = await getUserByUsername(data.username);
	if (!user) {
		return get401Response();
	}

	const validPassword = await verify(
		user.password_hash,
		data.password,
		HASH_PARAMETERS
	);

	if (!validPassword) {
		return get401Response();
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return redirect("/");
};
