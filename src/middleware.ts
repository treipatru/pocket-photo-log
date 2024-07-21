import { defineMiddleware } from "astro:middleware";
import { getUserApiClient } from "@/lib/auth/get-user-api-client";
import { sequence } from "astro:middleware";
import { urlMatcher } from "@/utils/url-matcher";

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

const privateRoutes = ["!/api/auth", "/api/*", "/auth/logout", "/cms/*"];

const authorization = defineMiddleware(async (context, next) => {
	const { isAuthenticated } = context.locals;
	const isPrivateRoute = urlMatcher(context.url.pathname, privateRoutes);

	if (isPrivateRoute && !isAuthenticated) {
		return context.redirect("/");
	}

	return next();
});

export const onRequest = sequence(authentication, authorization);
