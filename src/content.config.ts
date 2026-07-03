import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { BlogSchema } from './content/schemas/blog';
import {
	ConfigFooterSchema,
	ConfigHomepageSchema,
	ConfigSiteSchema,
	ConfigThemeSchema,
} from './content/schemas/config';
import { NavigationEntrySchema } from './content/schemas/navigation';
import { PreacherSchema } from './content/schemas/preacher';
import { SeriesSchema } from './content/schemas/series';
import { SermonSchema } from './content/schemas/sermon';

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

const navigationCollection = defineCollection({
	loader: glob({ pattern: '**/*.yaml', base: './src/content/navigation' }),
	schema: NavigationEntrySchema,
});

const pagesCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
	schema: z.object({
		title: z.string(),
		type: z.enum(['blog', 'events', 'sermons']).optional(),
	}),
});

const preacherCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/preachers' }),
	schema: PreacherSchema,
});

const seriesCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/series' }),
	schema: SeriesSchema,
});

const sermonCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/sermons' }),
	schema: SermonSchema,
});

const blogCollection = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
	schema: BlogSchema,
});

export const collections = {
	site: configSite,
	homepage: configHomepage,
	footer: configFooter,
	theme: configTheme,
	nav: navigationCollection,
	pages: pagesCollection,
	preachers: preacherCollection,
	series: seriesCollection,
	sermons: sermonCollection,
	blog: blogCollection,
};
