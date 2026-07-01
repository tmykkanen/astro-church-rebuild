import type { CollectionEntry } from 'astro:content';

export type Social = NonNullable<
	CollectionEntry<'site'>['data']['socials']
>[number];
