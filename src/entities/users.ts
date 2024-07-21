import z from "zod";

export const userLoginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

export type UserLogin = z.infer<typeof userLoginSchema>;
