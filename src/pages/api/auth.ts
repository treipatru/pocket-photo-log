import type { APIRoute } from "astro";
import { getLoginCookie } from "@/lib/auth/get-login-cookie";
import { userLoginSchema } from "@/entities/users";

export const POST: APIRoute = async ({ request }) => {
	const body = await request.json();
	const { data, success } = userLoginSchema.safeParse(body);

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

		return new Response(
			JSON.stringify({
				message: "Login failed.",
			}),
			{
				status: 200,
				headers: { "Set-Cookie": token },
			}
		);
	} catch (_) {
		return new Response(
			JSON.stringify({
				message: "Login failed.",
			}),
			{ status: 400 }
		);
	}
};
