import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import react from "@astrojs/react";
import sentry from "@sentry/astro";
import tailwind from '@astrojs/tailwind';

/**
 * TODO: Dynamic site name
 * The site name is used for the sitemap and RSS feed and has to be the correct
 * one for any give deployment.
 * This needs to be read from the env file at runtime, but Astro needs to read
 * it when building the site.
 */


// https://astro.build/config
export default defineConfig({
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [
		tailwind(),
		react(),
		sentry({
			dsn: process.env.SENTRY_DSN,
			sourceMapsUploadOptions: {
				project: process.env.SENTRY_PROJECT,
				authToken: process.env.SENTRY_AUTH_TOKEN,
			},
		}),
	],
	output: 'server',
	prefetch: true,
	site: "http://revelator.planet34.org"
});
