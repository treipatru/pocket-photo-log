/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare namespace App {
	interface Locals {
		session: import("@lucia/session").Session;
		siteSettings: import("@/entities/settings").Settings;
		user: import("lucia").User | null;
	}
}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			API_KEY: string;
			API_USER: string;
			ERROR_TRACKING_DSN: string;
			NODE_ENV: "development" | "production";
			PUBLIC_API_URL: string;
			PUBLIC_SITE_URL: string;
		}
	}
}

type APIPagination = {
	page: number;
	perPage: number;
	totalItems: number;
	totalPages: number;
};

type APIPaginationOptions = Pick<APIPagination, "page" | "perPage"> & {
	query?: string;
};

type APIPaginatedResponse<T> = {
	items: T[];
	pagination: APIPagination;
};
