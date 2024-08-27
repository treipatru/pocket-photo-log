import {
	type PostFormCreate,
	type PostFormDelete,
	type PostFormUpdate,
} from "@/entities/posts";
import { sanitizeTagNames } from "@/entities/tags";

export async function createPost(body: PostFormCreate) {
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

	if (body.shot_on) {
		formData.append("shot_on", body.shot_on);
	}

	const res = await fetch("/api/posts", {
		method: "POST",
		body: formData,
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to create post." });
	}

	return Promise.resolve({});
}

export async function deletePost(body: PostFormDelete) {
	const res = await fetch(`/api/posts/${body.id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to delete post." });
	}

	return Promise.resolve({});
}

export async function updatePost(body: PostFormUpdate, id: string) {
	/**
	 * Transform the JSON body to FormData as the server expects it due to
	 * the file upload.
	 *
	 * Since this method calls a PATCH request we only need to append resource data
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

	if (body.shot_on) {
		formData.append("shot_on", body.shot_on.toString());
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
		return Promise.reject({ message: "Failed to update post." });
	}

	return Promise.resolve({});
}
