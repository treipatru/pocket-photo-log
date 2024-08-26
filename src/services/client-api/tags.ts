import { type TagFormDelete } from "@/entities/tags";

export async function deleteTag(body: TagFormDelete) {
	const res = await fetch(`/api/tags/${body.id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to delete tag." });
	}

	return Promise.resolve({});
}
