/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		isAuthenticated: boolean;
		pbClient: import("@/entities/api-client").TypedPocketBase;
		postPayload: Record<string, any>;
		siteSettings: import("@/entities/settings").Settings;
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
