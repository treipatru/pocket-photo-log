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
			ERROR_TRACKING_DSN: string;
			NODE_ENV: "development" | "production";
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
