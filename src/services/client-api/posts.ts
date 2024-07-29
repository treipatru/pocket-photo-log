import { type PostForm, type PostFormDelete } from "@/entities/posts";

export async function createPost(body: PostForm) {
	/**
	 * Transform the JSON body to FormData as the server expects it due to
	 * the file upload.
	 */
	const formData = new FormData();

	formData.append("alt", body.alt);
	formData.append("caption", body.caption);
	formData.append("file", body.file);
	formData.append("published", body.published.toString());
	formData.append("tags", body.tags.join(","));

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
	console.log("deleting from frontend");
	const res = await fetch(`/api/posts/${body.id}`, {
		method: "DELETE",
	});

	if (!res.ok) {
		return Promise.reject({ message: "Failed to delete post." });
	}

	return Promise.resolve({});
}

export async function updatePost(body: PostForm, id: string) {
	/**
	 * Transform the JSON body to FormData as the server expects it due to
	 * the file upload.
	 */
	const formData = new FormData();

	formData.append("alt", body.alt);
	formData.append("caption", body.caption);
	formData.append("published", body.published.toString());
	formData.append("tags", body.tags.join(","));

	/**
	 * Optional fields
	 */
	if (body.shot_on) {
		formData.append("shot_on", body.shot_on);
	}

	if (body.file.size > 0) {
		formData.append("file", body.file);
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
