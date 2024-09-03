import { type TagFormDelete, type TagFormUpdate } from "@/entities/tags";

export async function deleteTag(body: TagFormDelete) {
	const res = await fetch(`/api/tags/${body.id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to delete tag." });
	}

	return Promise.resolve({});
}

export async function updateTag(body: TagFormUpdate) {
	const res = await fetch(`/api/tags/${body.id}`, {
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
		method: "PATCH",
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to update tag." });
	}

	const data = await res.json();
	return Promise.resolve(data);
}
