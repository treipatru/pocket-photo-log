import type { APIRoute } from "astro";
import { getLoginCookie } from "@/services/auth/get-login-cookie";
import { userLoginSchema } from "@/entities/users";

export const POST: APIRoute = async ({ request }) => {
	const payload = await request.json();
	const { data, success } = userLoginSchema.safeParse(payload);

	if (!success) {
		return new Response(
			JSON.stringify({
				message: "Login failed.",
			}),
			{ status: 400 }
		);
	}

	try {
		const token = await getLoginCookie(data.email, data.password);

		return new Response(JSON.stringify({}), {
			status: 200,
			headers: { "Set-Cookie": token },
		});
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Login failed.",
			}),
			{ status: 401 }
		);
	}
};
