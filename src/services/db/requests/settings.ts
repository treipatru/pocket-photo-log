import { dbClient } from "@/services/db/db";
import { settingsArrayToObject } from "@/entities/settings";
import type { Setting } from "@prisma/client";

/**
 * Retrieve a list of settings from the database.
 *
 * @export
 * @return {*}
 */
export async function getSettings(): Promise<Record<string, string>> {
	const dbSettings = await dbClient.setting.findMany();

	return settingsArrayToObject(dbSettings);
}

export async function updateSetting({
	name,
	value,
}: {
	name: string;
	value: string;
}): Promise<Setting> {
	return await dbClient.setting.update({
		where: {
			name,
		},
		data: {
			value,
		},
	});
}
