import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind()],
	site: 'https://revelator.planet34.org',
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
});
