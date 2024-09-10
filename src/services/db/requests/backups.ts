import { dbClient } from "@/services/db/db";

export async function createBackup({
	fileName,
	size,
}: {
	fileName: string;
	size: number;
}) {
	return await dbClient.backup.create({
		data: {
			fileName,
			size,
		},
	});
}

export async function deleteBackup(id: string) {
	return await dbClient.backup.delete({
		where: {
			id,
		},
	});
}

export async function getBackups() {
	return await dbClient.backup.findMany();
}

export async function getBackup(id: string) {
	return await dbClient.backup.findUnique({
		where: {
			id,
		},
	});
}
