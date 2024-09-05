import { dbClient } from "@/services/db/db";
import { settingsArrayToObject } from "@/entities/settings";

/**
 * Retrieve all settings
 */
export async function getSettings() {
	const dbSettings = await dbClient.setting.findMany();

	return settingsArrayToObject(dbSettings);
}
