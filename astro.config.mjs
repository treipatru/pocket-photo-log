import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

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
	integrations: [tailwind(), react()],
	output: 'server',
	prefetch: true,
	security: {
		checkOrigin: true,
	},
	site: "http://revelator.planet34.org"
});
