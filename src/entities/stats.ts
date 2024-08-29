import z from "zod";

export const statSchema = z.object({
	// Unique ID of the Stat record
	id: z.string(),
	likes: z.number(),
	// ID of the Post that this Stat record is associated with
	postId: z.string(),
	views: z.number(),
});

export type Stat = z.infer<typeof statSchema>;
