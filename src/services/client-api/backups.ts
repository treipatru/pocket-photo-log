import type { Backup } from "@prisma/client";

export async function createBackup(): Promise<Backup> {
	const res = await fetch("/api/backups", {
		method: "POST",
	});

	if (!res.ok) {
		throw new Error("Failed to create new backup.");
	}

	return await res.json();
}
