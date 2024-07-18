import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import htmx from 'astro-htmx';

// https://astro.build/config
export default defineConfig({
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [
		tailwind(),
		htmx(),
	],
	output: 'server',
	site: 'https://revelator.planet34.org',
});
