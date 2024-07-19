import z from "zod";

export const SettingsKeys = z.enum(["SITE_TITLE", "SITE_DESCRIPTION"]);

export const settingsSchema = z.object({
	name: SettingsKeys,
	value: z.string(),
});

export type SettingsKeys = z.infer<typeof SettingsKeys>;
export type Settings = z.infer<typeof settingsSchema>;
