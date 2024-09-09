import type { Backup } from "@prisma/client";
import type { BackupCreate } from "@/entities/backups";

export async function createBackup(body?: BackupCreate): Promise<Backup> {
	const formData = new FormData();
	if (body?.file) {
		formData.append("file", body.file);
	}

	const res = await fetch("/api/backups", {
		method: "POST",
		body: formData,
	});

	if (!res.ok) {
		throw new Error("Failed to create new backup.");
	}

	return await res.json();
}
