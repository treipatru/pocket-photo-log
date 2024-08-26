import z from "zod";

/**
 * The schema for the settings object as used by the frontend.
 */
export const settingsSchema = z.object({
	TITLE: z.string().min(1).max(255),
	DESCRIPTION: z.string(),
});

export const settingsSchemaFormUpdate = settingsSchema;

/**
 * Site settings in a key-value format.
 */
export type Settings = z.infer<typeof settingsSchema>;

export type SettingsSchemaFormUpdate = z.infer<typeof settingsSchemaFormUpdate>;

/**
 * Keys of the settings object.
 */
export type SettingsKeys = keyof Settings;

/**
 * Convert an array of settings objects to a settings object.
 * Useful to transform the data from the DB into a more usable format.
 */
export function settingsArrayToObject(
	settings: { name: string; value: string }[]
): Settings {
	// Create the object with the settings
	const obj: Partial<Settings> = {};
	settings.forEach((item) => {
		obj[item.name as SettingsKeys] = item.value;
	});

	// Validate it against the schema
	const { data, error } = settingsSchema.safeParse(obj);

	if (error) {
		throw new Error("Invalid settings data");
	}

	return data;
}
