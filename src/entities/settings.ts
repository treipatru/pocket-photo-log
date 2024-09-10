import z from "zod";

/**
 * The schema for the settings object as used by the frontend.
 */
export const settingsSchema = z.object({
	TITLE: z.string().min(1).max(255),
	DESCRIPTION: z.string(),
});

export const settingsSchemaFormUpdate = settingsSchema;
export type SettingsSchemaFormUpdate = z.infer<typeof settingsSchemaFormUpdate>;

/**
 * Get the types from the settings schema.
 */
type SettingsDerived = z.infer<typeof settingsSchema>;

/**
 * Extract the keys from the derived settings type.
 */
export type SettingsKeys = keyof SettingsDerived;

/**
 * Define possible values types for the settings.
 * TS does not natively allow this kind of union so this is an accepted
 * workaround which allows us to define both string literals and a string type.
 */
type SettingsValues = "true" | "false" | (string & {});

export type Settings = Record<SettingsKeys, SettingsValues>;

/**
 * Convert an array of settings objects to a settings object.
 * Useful to transform the data from the DB into a more usable format.
 */
export function settingsArrayToObject(
	settings: { name: string; value: SettingsValues }[]
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
