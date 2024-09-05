import { defineMiddleware, sequence } from "astro:middleware";
import { getSettings } from "@/services/db/requests/settings";
import { pocketClient } from "@/services/pocket/pocket-client";
import { settingsArrayToObject } from "@/entities/settings";
import { urlMatcher } from "@/utils/url-matcher";

/**
 * Check if user is authenticated and set the pbClient in the context.
 */
const authentication = defineMiddleware(async (context, next) => {
	const jwt = context.cookies.get("pb_auth")?.value;

	if (!jwt) {
		context.locals.isAuthenticated = false;
		return next();
	}

	try {
		const pbClient = await getUserApiClient(jwt);
		context.locals.pbClient = pbClient;
		context.locals.isAuthenticated = !!pbClient?.authStore.isValid;
	} catch (error) {
		context.locals.isAuthenticated = false;
	}

	return next();
});

/**
 * Check if the request is authorized to access the route.
 */
const privateRoutes = ["/auth/logout", "/cms/*"];
const apiRoutes = [
	// Auth routes are public
	"!/api/auth",

	// All other API routes are private by default
	"/api/*",

	// Except for these:
	"!/api/posts/*/like",
];
const authorization = defineMiddleware(async (context, next) => {
	const { isAuthenticated } = context.locals;
	const isPrivateRoute = urlMatcher(context.url.pathname, privateRoutes);
	const isApiRoute = urlMatcher(context.url.pathname, apiRoutes);

	if (isPrivateRoute && !isAuthenticated) {
		return context.redirect("/auth/login");
	}

	if (isApiRoute && !isAuthenticated) {
		return new Response("Unauthorized", { status: 401 });
	}

	return next();
});

/**
 * Retrieve the site settings and store them in the context.
 */
const siteSettings = defineMiddleware(async (context, next) => {
	try {
		// Fetch settings array from the database
		const settings = await getSettings();

		// Make data available to the context
		context.locals.siteSettings = settings;
	} catch (error) {
		throw new Error("Failed to fetch site settings");
	}

	return next();
});

export const onRequest = sequence(authentication, authorization, siteSettings);
