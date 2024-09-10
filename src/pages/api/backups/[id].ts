import { accessSync, readFileSync, unlinkSync } from "fs";
import { BACKUP_DIR } from "@/constants";
import { deleteBackup, getBackup } from "@/services/db/requests/backups";
import { join } from "path";
import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
	const id = params.id;

	if (!id) {
		return new Response(
			JSON.stringify({
				message: "Invalid data",
			}),
			{ status: 400 },
		);
	}

	try {
		const backup = await getBackup(id);
		if (!backup) {
			throw new Error("Backup not found");
		}

		const filePath = join(BACKUP_DIR, backup?.fileName);
		accessSync(filePath);

		const file = readFileSync(filePath);

		return new Response(file, {
			status: 200,
			headers: {
				"Content-Type": "application/octet-stream",
				"Content-Disposition": `attachment; filename="${backup.fileName}"`,
			},
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to get backup file",
			}),
			{ status: 500 },
		);
	}
};

export const DELETE: APIRoute = async ({ params }) => {
	const id = params.id;

	if (!id) {
		return new Response(
			JSON.stringify({
				message: "Invalid data",
			}),
			{ status: 400 },
		);
	}

	try {
		const backup = await getBackup(id);

		if (!backup) {
			throw new Error("Backup not found");
		}

		// Verify that the file exists and delete it
		const filePath = join(BACKUP_DIR, backup?.fileName);
		accessSync(filePath);
		unlinkSync(filePath);

		// Remove backup record from the database
		deleteBackup(id);

		return new Response(
			JSON.stringify({
				message: "Backup deleted",
			}),
			{ status: 200 },
		);
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to delete backup",
			}),
			{ status: 500 },
		);
	}
};
