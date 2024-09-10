import { type Tag } from "@/entities/tags";

export async function searchTags({ query }: { query: string }) {
	const res = await fetch("/api/search/tags", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query }),
	});

	if (!res.ok) {
		throw new Error("Failed to fetch tags data.");
	}

	const data = (await res.json()) as Tag[];
	return data;
}
