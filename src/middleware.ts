import { defineMiddleware } from "astro:middleware";
import { getUserApiClient } from "@/lib/auth/get-user-api-client";
import { sequence } from "astro:middleware";
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

	const pbClient = await getUserApiClient(jwt);
	context.locals.pbClient = pbClient;
	context.locals.isAuthenticated = !!pbClient?.authStore.isValid;

	return next();
});

/**
 * Check if the request is authorized to access the route.
 */
const privateRoutes = ["!/api/auth", "/api/*", "/auth/logout", "/cms/*"];
const authorization = defineMiddleware(async (context, next) => {
	const { isAuthenticated } = context.locals;
	const isPrivateRoute = urlMatcher(context.url.pathname, privateRoutes);

	if (isPrivateRoute && !isAuthenticated) {
		return context.redirect("/");
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
	if (context.request.method === "GET") {
		return next();
	}

	/**
	 * Only check for API routes.
	 */
	const isApiRoute = urlMatcher(context.url.pathname, [
		"/api/*",
		"!/api/posts*", // Posts use multipart/form-data.
	]);
	if (!isApiRoute) {
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

export const onRequest = sequence(authentication, authorization, payload);
