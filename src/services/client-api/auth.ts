import { type UserLogin } from "@/entities/users";

export async function logIn(body: UserLogin) {
	const res = await fetch("/api/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		return Promise.reject({ message: "Login failed." });
	}

	return Promise.resolve({});
}
