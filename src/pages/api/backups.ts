import { createBackup } from "@/services/db/requests/backups";
import { createWriteStream, existsSync, mkdirSync, writeFileSync } from "fs";
import { DATABASE_FILE, BACKUP_DIR, UPLOAD_DIR } from "@/constants";
import { dbClient } from "@/services/db/db";
import { type APIRoute } from "astro";
import archiver from "archiver";
import path from "path";
import { fileTypeFromBuffer } from "file-type";

export const POST: APIRoute = async ({ request }) => {
	const formData = await request.formData();
	const file = formData.get("file") as InstanceType<typeof File> | undefined;

	try {
		// Ensure the backup directory exists
		mkdirSync(BACKUP_DIR, { recursive: true });

		let archiveName = "";
		let size = 0;

		if (file && file instanceof File && file.size > 0) {
			const backupFromFile = await createBackupFromFile(file);
			archiveName = backupFromFile.archiveName;
			size = backupFromFile.totalBytes;
		} else {
			console.log("Creating default backup");
			// Create backup
			const newBackup = await createBackupDefault();
			archiveName = newBackup.archiveName;
			size = newBackup.totalBytes;
		}

		// Create backup record
		const backup = await createBackup({
			fileName: archiveName,
			size: size,
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
			{ status: 500 },
		);
	}
};

async function createBackupFromFile(file: File) {
	const archiveName = file.name;
	const size = file.size;

	// Verify that the file is a zip archive
	const fileType = await fileTypeFromBuffer(await file.arrayBuffer());
	if (fileType?.mime !== "application/zip") {
		throw new Error("Invalid file type");
	}

	// Verify that the file does not already exist
	const filePath = `${BACKUP_DIR}/${archiveName}`;
	if (existsSync(filePath)) {
		throw new Error("File already exists");
	}

	// Write the file to disk
	writeFileSync(filePath, new Uint8Array(await file.arrayBuffer()));

	return {
		archiveName,
		totalBytes: size,
	};
}

async function createBackupDefault() {
	const archiveName = new Date().toISOString().replace(/[:.]/g, "-") + ".zip";

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

	return { archiveName, totalBytes };
}
