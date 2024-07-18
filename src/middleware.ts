import { defineMiddleware } from "astro:middleware";
import { getUserApiClient } from "@/lib/auth/get-user-api-client";
import { sequence } from "astro:middleware";

const authentication = defineMiddleware(async (context, next) => {
	const jwt = context.cookies.get("pb_auth")?.value;

	if (!jwt) {
		context.locals.pbClient = null;
		context.locals.isAuthenticated = false;
		return next();
	}

	const pbClient = await getUserApiClient(jwt);
	context.locals.pbClient = pbClient;
	context.locals.isAuthenticated = !!pbClient?.authStore.isValid;

	return next();
});

const privateRoutes = ["/cms/*", "/partials/cms"];
const urlMatcher = (url: string, patterns: string[]) =>
	patterns.some((pattern) =>
		new RegExp("^" + pattern.replace(/\*/g, ".*") + "$").test(url)
	);

const authorization = defineMiddleware(async (context, next) => {
	const { isAuthenticated } = context.locals;
	const isPrivateRoute = urlMatcher(context.url.pathname, privateRoutes);

	if (isPrivateRoute && !isAuthenticated) {
		return context.redirect("/");
	}

	return next();
});

export const onRequest = sequence(authentication, authorization);
