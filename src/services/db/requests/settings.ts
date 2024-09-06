import { dbClient } from "@/services/db/db";
import { settingsArrayToObject } from "@/entities/settings";
import type { Setting } from "@prisma/client";
import type { Settings } from "@/entities/settings";

/**
 * Retrieve a list of settings from the database.
 *
 * @export
 * @return {*}
 */
export async function getSettings(): Promise<Settings> {
	const dbSettings = await dbClient.setting.findMany();

	return settingsArrayToObject(dbSettings);
}

/**
 * Update a setting by name
 *
 * @export
 * @param {{
 * 	name: string;
 * 	value: string;
 * }} {
 * 	name,
 * 	value,
 * }
 * @return {*}  {Promise<Setting>}
 */
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
