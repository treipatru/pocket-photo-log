/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					background: 'hsl(var(--primary-background))',
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					background: 'hsl(var(--accent-background))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					background: 'hsl(var(--muted-background))',
				},
			},
			fontFamily: {
				condensed: ['Bebas Neue', ...defaultTheme.fontFamily.sans],
				body: ['Montserrat Variable', ...defaultTheme.fontFamily.sans],
			},
		},
		container: {
			center: true,
		},
	},
	plugins: [
		require('daisyui'),
	],
	daisyui: {
		themes: ['lofi'],
	},
};
