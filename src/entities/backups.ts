import z from "zod";

export const backupCreateSchema = z.object({
	file: z.instanceof(File).optional(),
});
export type BackupCreate = z.infer<typeof backupCreateSchema>;
