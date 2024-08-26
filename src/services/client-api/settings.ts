import { type Settings } from "@/entities/settings";

export async function updateSettings(body: Settings) {
	const res = await fetch("/api/settings", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to update settings." });
	}

	return Promise.resolve({});
}
