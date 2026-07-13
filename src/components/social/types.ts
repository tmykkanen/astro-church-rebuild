import type { CollectionEntry } from 'astro:content';

export type Social = NonNullable<
	CollectionEntry<'config:site'>['data']['socials']
>[number];
