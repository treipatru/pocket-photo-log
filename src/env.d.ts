/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ENV_KEYS = "API_USER" | "API_KEY" | "PUBLIC_API_URL";

interface ImportMetaEnv extends Record<ENV_KEYS, string> {}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		pbClient: import("@/entities/api-client").TypedPocketBase;
		isAuthenticated: boolean;
	}
}
