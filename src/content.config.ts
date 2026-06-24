import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { NavigationEntrySchema } from '#/content/navigation/schema';

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
	pages: pagesCollection,
	nav: navigationCollection,
};
