import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { NavigationEntrySchema } from '#/content/navigation/schema';

import {
	ConfigFooterSchema,
	ConfigHomepageSchema,
	ConfigSiteSchema,
	ConfigThemeSchema,
} from './content/config/schema';

const configSite = defineCollection({
	loader: glob({ pattern: 'site.yaml', base: './src/content/config' }),
	schema: ConfigSiteSchema,
});

const configHomepage = defineCollection({
	loader: glob({ pattern: 'homepage.yaml', base: './src/content/config' }),
	schema: ConfigHomepageSchema,
});

const configFooter = defineCollection({
	loader: glob({ pattern: 'footer.yaml', base: './src/content/config' }),
	schema: ConfigFooterSchema,
});

const configTheme = defineCollection({
	loader: glob({ pattern: 'theme.yaml', base: './src/content/config' }),
	schema: ConfigThemeSchema,
});

const pagesCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		type: z.enum(['blog', 'events', 'sermons']).optional(),
	}),
});

const navigationCollection = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/navigation' }),
	schema: NavigationEntrySchema,
});

export const collections = {
	configSite,
	configHomepage,
	configFooter,
	configTheme,
	pages: pagesCollection,
	nav: navigationCollection,
};
