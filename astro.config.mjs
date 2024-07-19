import node from '@astrojs/node';
import preact from '@astrojs/preact';
import tailwind from '@astrojs/tailwind';
import htmx from 'astro-htmx';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	adapter: node({
		mode: 'standalone',
	}),
	integrations: [tailwind(), htmx(), preact()],
	output: 'server',
	prefetch: true,
	site: 'https://revelator.planet34.org',
});
