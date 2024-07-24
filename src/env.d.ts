/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		pbClient: import("@/entities/api-client").TypedPocketBase;
		isAuthenticated: boolean;
		postPayload: Record<string, any>;
	}
}

declare var process: {
	env: {
		API_KEY: string;
		API_USER: string;
		PUBLIC_API_URL: string;
		PUBLIC_SITE_URL: string;
	};
};
