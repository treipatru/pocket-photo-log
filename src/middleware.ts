import { defineMiddleware, sequence } from "astro:middleware";
import { getUserApiClient } from "@/services/auth/get-user-api-client";
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
const apiRoutes = ["!/api/auth", "/api/*"];
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
 * For API routes check the payload.
 */
const payload = defineMiddleware(async (context, next) => {
	const { request } = context;

	/**
	 * Ignore everything but GET.
	 */
	if (request.method === "GET" || request.method === "DELETE") {
		return next();
	}

	/**
	 * Posts API is always multipart.
	 */
	const isMultipartPath = urlMatcher(context.url.pathname, ["/api/posts*"]);
	if (isMultipartPath) {
		return next();
	}

	/**
	 * Verify the content type and make it available to the context.
	 */
	if (request.headers.get("Content-Type") !== "application/json") {
		return new Response("Invalid content type", { status: 400 });
	}

	const body = await request.json();
	context.locals.postPayload = body;

	return next();
});

/**
 * Retrieve the site settings and store them in the context.
 */
const siteSettings = defineMiddleware(async (context, next) => {
	try {
		// Fetch settings array from the database
		const settingsArr = await pocketClient.collection("settings").getFullList();

		// Transform the settings array into a key-value pairs
		const settings = settingsArrayToObject(settingsArr);

		// Make data available to the context
		context.locals.siteSettings = settings;
	} catch (error) {
		throw new Error("Failed to fetch site settings");
	}

	return next();
});

export const onRequest = sequence(
	authentication,
	authorization,
	payload,
	siteSettings
);
