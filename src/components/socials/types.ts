import type { CollectionEntry } from 'astro:content';

export type Social = NonNullable<
	CollectionEntry<'configSite'>['data']['socials']
>[number];
