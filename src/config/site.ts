import { AstroError } from 'astro/errors';

import { SiteConfigSchema } from './schema';
import rawSiteConfig from './site.json';

const parsedSiteConfig = SiteConfigSchema.safeParse(rawSiteConfig);

if (!parsedSiteConfig.success) {
	throw new AstroError(
		'Invalid site configuration — your config is missing required fields or is malformed.',
		`Issues:\n${parsedSiteConfig.error.issues
			.map((issue) => `  • ${issue.path.join('.') || 'root'}: ${issue.message}`)
			.join('\n')}`,
	);
}

export const config = parsedSiteConfig.data;
