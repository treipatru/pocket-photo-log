import z from "zod";

export const userSignupSchema = z.object({
	username: z
		.string()
		.min(3)
		.max(31)
		.regex(/^[a-z0-9_-]+$/, {
			message:
				"Username can only contain lowercase letters, numbers, underscores, and hyphens",
		})
		.toLowerCase(),
	password: z.string().min(8).max(255),
});

export const userLoginSchema = userSignupSchema;

export type UserLogin = z.infer<typeof userLoginSchema>;
export type UserSignup = z.infer<typeof userLoginSchema>;
