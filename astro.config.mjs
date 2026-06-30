// @ts-check

import tailwindcss from '@tailwindcss/vite';
import { defineConfig, fontProviders } from 'astro/config';
import icon from 'astro-icon';

// bejamas:astro-fonts:start
/** @type {NonNullable<import("astro").AstroUserConfig["fonts"]>} */
const BEJAMAS_ASTRO_FONTS = [
	{
		provider: fontProviders.google(),
		name: 'Poppins',
		cssVariable: '--font-sans',
		subsets: ['latin'],
	},
];
// bejamas:astro-fonts:end

// https://astro.build/config
export default defineConfig({
	fonts: BEJAMAS_ASTRO_FONTS,
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [icon()],
});
