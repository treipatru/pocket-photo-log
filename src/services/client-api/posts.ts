import {
	type Post,
	type PostFormCreate,
	type PostFormUpdate,
} from "@/entities/posts";
import { sanitizeTagNames } from "@/entities/tags";
import { type Stat } from "@/entities/stats";

export async function createPost(body: PostFormCreate): Promise<Post> {
	/**
	 * Transform the JSON body to FormData as the server expects it due to
	 * the file upload.
	 */
	const formData = new FormData();

	formData.append("alt", body.alt);
	formData.append("caption", body.caption);
	formData.append("file", body.file);
	formData.append("published", body.published.toString());
	formData.append("tags", sanitizeTagNames(body.tags, "str"));

	if (body.shotOn) {
		formData.append("shotOn", body.shotOn);
	}

	const res = await fetch("/api/posts", {
		method: "POST",
		body: formData,
	});

	if (!res.ok) {
		throw new Error("Failed to create post.");
	}

	const data = await res.json();

	return Promise.resolve(data);
}

export async function deletePost(id: string) {
	const res = await fetch(`/api/posts/${id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		throw new Error("Failed to delete post.");
	}

	return Promise.resolve({});
}

export async function updatePost(id: string, body: PostFormUpdate) {
	/**
	 * Transform the JSON body to FormData as the server expects it due to
	 * the file upload.
	 *
	 * Since this method calls a PATCH request we only need to append record data
	 * which is updated.
	 */
	const formData = new FormData();

	// Checking by type allows us to also send an empty string as a value, thus
	// allowing us to clear the value.
	if (typeof body.alt === "string") {
		formData.append("alt", body.alt);
	}

	if (typeof body.caption === "string") {
		formData.append("caption", body.caption);
	}

	if (body.file?.size && body.file.size > 0) {
		formData.append("file", body.file);
	}

	if (body.published) {
		formData.append("published", body.published.toString());
	}

	if (body.shotOn) {
		formData.append("shotOn", body.shotOn.toString());
	}

	if (body.tags) {
		formData.append("tags", sanitizeTagNames(body.tags, "str"));
	}

	/**
	 * Call API
	 */
	const res = await fetch(`/api/posts/${id}`, {
		method: "PATCH",
		body: formData,
	});

	if (!res.ok) {
		throw new Error("Failed to update post.");
	}

	return Promise.resolve({});
}

export async function likePost(id: Stat["id"]) {
	const res = await fetch(`/api/posts/${id}/like`);

	if (!res.ok) {
		throw new Error("Failed to create post.");
	}

	const data = await res.json();

	return Promise.resolve(data);
}
