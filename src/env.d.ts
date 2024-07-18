/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type ENV_KEYS = "API_USER" | "API_KEY" | "API_URL";

interface ImportMetaEnv extends Record<ENV_KEYS, string> {}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare namespace App {
	interface Locals {
		pbClient: TypedPocketBase | null;
		isAuthenticated: boolean;
	}
}
