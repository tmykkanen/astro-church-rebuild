import type { z } from 'astro/zod';

import type { SiteConfigSchema } from './site.schema';

export type SiteConfig = z.infer<typeof SiteConfigSchema>;
