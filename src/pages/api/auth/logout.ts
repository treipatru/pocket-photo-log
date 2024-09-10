import { lucia } from "@/services/lucia";
import { type APIRoute } from "astro";

export const POST: APIRoute = async ({ cookies, locals, redirect }) => {
	if (!locals.session) {
		return new Response(
			JSON.stringify({
				message: "Invalid credentials",
			}),
			{ status: 401 }
		);
	}

	await lucia.invalidateSession(locals.session.id);

	const sessionCookie = lucia.createBlankSessionCookie();
	cookies.set(
		sessionCookie.name,
		sessionCookie.value,
		sessionCookie.attributes
	);

	return redirect("/");
};
