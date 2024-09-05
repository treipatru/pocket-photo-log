import { defineMiddleware, sequence } from "astro:middleware";
import { getSettings } from "@/services/db/requests/settings";
import { lucia } from "./services/lucia";
import { match } from "path-to-regexp";

/**
 * Retrieve the session and store it in the context.
 */
const authentication = defineMiddleware(async (context, next) => {
	const sessionId = context.cookies.get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		context.locals.user = null;
		context.locals.session = null;
		return next();
	}

	const { session, user } = await lucia.validateSession(sessionId);
	if (session?.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
	}
	if (!session) {
		const sessionCookie = lucia.createBlankSessionCookie();
		context.cookies.set(
			sessionCookie.name,
			sessionCookie.value,
			sessionCookie.attributes
		);
	}
	context.locals.user = user;
	context.locals.session = session;
	return next();
});

/**
 * Verify if the request has proper authorization to access the route.
 */
const authorization = defineMiddleware(async (context, next) => {
	const allowedPatterns = ["/api/auth/:action"];
	const privatePatterns = ["/api/*path", "/cms/*path"];
	const { pathname } = context.url;

	// Check if the URL is whitelisted first
	const isAllowed = allowedPatterns.some((pattern) => match(pattern)(pathname));
	if (isAllowed) {
		return next();
	}

	// Then verify if private and has session
	const isPrivate = privatePatterns.some((pattern) => match(pattern)(pathname));
	if (isPrivate && !context.locals.user) {
		return context.redirect("/auth/login");
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
