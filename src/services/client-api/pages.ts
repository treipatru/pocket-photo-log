import { type PageForm, type PageFormDelete } from "@/entities/pages";

export async function createPage(body: PageForm) {
	const res = await fetch("/api/pages", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to create page." });
	}

	return Promise.resolve({});
}
