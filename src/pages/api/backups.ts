import { type APIRoute } from "astro";
import { createWriteStream, mkdirSync } from "fs";
import path from "path";
import archiver from "archiver";
import { dbClient } from "@/services/db/db";
import { createBackup } from "@/services/db/requests/backups";
import { DATABASE_FILE, BACKUP_DIR, UPLOAD_DIR } from "@/constants";

export const POST: APIRoute = async ({ request }) => {
	const archiveName = new Date().toISOString().replace(/[:.]/g, "-") + ".zip";

	try {
		// Ensure the backup directory exists
		mkdirSync(BACKUP_DIR, { recursive: true });

		// Perform a simple query to ensure connection and flush WAL
		await dbClient.$queryRaw`SELECT 1`;
		await dbClient.$queryRaw`PRAGMA wal_checkpoint(FULL)`;

		// Block database transactions while backing up
		await dbClient.$executeRaw`BEGIN EXCLUSIVE TRANSACTION`;

		// Create archive
		const archivePromise = new Promise((resolve, reject) => {
			const output = createWriteStream(`${BACKUP_DIR}/${archiveName}`);
			const archive = archiver("zip", {
				zlib: { level: 9 },
			});

			output.on("close", () => {
				const totalBytes = archive.pointer();
				resolve(totalBytes);
			});

			archive.on("warning", function (err) {
				if (err.code === "ENOENT") {
					console.warn("Warning during archiving:", err);
				} else {
					reject(err);
				}
			});

			archive.on("error", function (err) {
				reject(err);
			});

			archive.pipe(output);
			// Add sqlite database to archive
			archive.file(DATABASE_FILE, { name: path.basename(DATABASE_FILE) });
			// Add uploaded images to archive
			archive.directory(UPLOAD_DIR, "images");
			archive.finalize();
		});

		const totalBytes = (await archivePromise) as number;

		// Unblock database transactions
		await dbClient.$executeRaw`COMMIT`;

		// Create backup record
		const backup = await createBackup({
			fileName: archiveName,
			size: totalBytes,
		});

		return new Response(JSON.stringify(backup), {
			status: 200,
		});
	} catch (error) {
		return new Response(
			JSON.stringify({
				message: "Failed to backup database",
				error,
			}),
			{ status: 500 }
		);
	}
};
