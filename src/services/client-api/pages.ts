import { type PageCreate, type PageUpdate } from "@/entities/pages";

export async function createPage(body: PageCreate) {
	const res = await fetch("/api/pages", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message);
	}

	return Promise.resolve(data);
}

export async function deletePage(id: string) {
	const res = await fetch(`/api/pages/${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		const data = await res.json();
		throw new Error(data.message);
	}

	return Promise.resolve({});
}

export async function updatePage(body: PageUpdate) {
	const res = await fetch(`/api/pages/${body.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

	const data = await res.json();

	if (!res.ok) {
		throw new Error(data.message);
	}

	return Promise.resolve(data);
}
