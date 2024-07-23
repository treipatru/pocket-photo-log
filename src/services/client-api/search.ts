import { paginatedCollection } from "@/entities/api-client";
import { tagSchema } from "@/entities/tags";

export async function searchTags({ query }: { query: string }) {
	const res = await fetch("/api/search/tags", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to fetch tags data." });
	}

	const json = await res.json();
	const parsed = paginatedCollection(tagSchema).safeParse(json);

	if (!parsed.success) {
		return Promise.reject({ message: "Failed to validate tags data." });
	}

	return parsed.data;
}
