import node from '@astrojs/node';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
	adapter: node({
		mode: 'standalone'
	}),
	integrations: [tailwind(), react()],
	output: 'server',
	prefetch: true,
	site: 'https://revelator.planet34.org'
});
