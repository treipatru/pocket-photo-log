import { type UserLogin, type UserSignup } from "@/entities/users";

export async function logIn(body: UserLogin) {
	const res = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}

	return Promise.resolve({});
}

export async function logOut() {
	const res = await fetch("/api/auth/logout", {
		method: "POST",
	});

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}

	return Promise.resolve({});
}

export async function signUp(body: UserSignup) {
	const res = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}

	return Promise.resolve({});
}
