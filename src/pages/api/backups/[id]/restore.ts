import { BACKUP_DIR, DATABASE_FILE, UPLOAD_DIR } from "@/constants";
import {
	copyFileSync,
	cpSync,
	createReadStream,
	existsSync,
	readdirSync,
	rmSync,
} from "fs";
import { dbClient } from "@/services/db/db";
import { exec } from "child_process";
import { Extract } from "unzipper";
import { getBackup } from "@/services/db/requests/backups";
import { join } from "path";
import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ params }) => {
	const backupId = params.id;

	if (!backupId) {
		return new Response(
			JSON.stringify({
				message: "Invalid post",
			}),
			{ status: 400 },
		);
	}

	const backup = await getBackup(backupId);
	if (!backup) {
		return new Response(
			JSON.stringify({
				message: "Backup not found",
			}),
			{ status: 404 },
		);
	}

	try {
		// Block database transactions while backing up
		await dbClient.$executeRaw`BEGIN EXCLUSIVE TRANSACTION`;

		const { tmpDir } = await unzipArchive(backup.fileName);

		// Delete current application files
		deleteApplicationFiles();

		// Restore the backup contents
		cpSync(tmpDir, "/app/storage", { recursive: true });

		// Tell PM2 to restart the application
		setTimeout(() => {
			exec("pm2 restart all", (error, stdout, stderr) => {
				if (error) {
					console.log(error);
					console.error("Exec error");
					return;
				}
				console.log(`stdout: ${stdout}`);
				console.error(`stderr: ${stderr}`);
			});
		}, 500);

		return new Response(JSON.stringify({}), { status: 200 });
	} catch (error) {
		// Unblock database transactions
		await dbClient.$executeRaw`COMMIT`;

		return new Response(
			JSON.stringify({
				message: "Failed to restore backup.",
			}),
			{ status: 500 },
		);
	}
};

async function unzipArchive(fileName: string) {
	// The source backup file
	const archiveFile = `${BACKUP_DIR}/${fileName}`;

	// Temporary directory to extract the backup file
	const tmpDir = `/tmp/${fileName.replace(".zip", "")}`;

	// Temporary copy of the backup file
	const tmpArchive = `/tmp/${fileName}`;

	// Make a copy of the backup file
	copyFileSync(archiveFile, tmpArchive);

	// Verify that the backup file exists
	if (!existsSync(archiveFile)) {
		throw new Error("Backup file not found");
	}

	// Make sure a previous temp directory does not exist
	rmSync(tmpDir, { recursive: true, force: true });

	// Unzip the backup file to a temp location
	const unzipPromise = new Promise<void>((resolve, reject) => {
		createReadStream(tmpArchive)
			.pipe(Extract({ path: tmpDir }))
			.on("close", () => {
				resolve();
			})
			.on("error", (err) => {
				reject(err);
			});
	});

	await unzipPromise;

	return { tmpDir };
}

function deleteApplicationFiles() {
	// Delete the current upload directory
	rmSync(UPLOAD_DIR, { recursive: true, force: true });

	// Delete any backup files
	const files = readdirSync(BACKUP_DIR);
	for (const file of files) {
		const filePath = join(BACKUP_DIR, file);
		rmSync(filePath, { recursive: true, force: true });
	}
	// Delete the current DB file
	rmSync(DATABASE_FILE);
}
