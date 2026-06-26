import { type CollectionEntry, getEntry } from 'astro:content';
import { AstroError } from 'astro/errors';

const collections = {
	site: 'configSite',
	homepage: 'configHomepage',
	footer: 'configFooter',
	theme: 'configTheme',
} as const;

type Collection = keyof typeof collections;
type CollectionId<C extends Collection> = (typeof collections)[C];

export const getConfig = async <C extends Collection>(
	collection: C,
): Promise<CollectionEntry<CollectionId<C>>['data']> => {
	const res = await getEntry(collections[collection], collection);

	if (!res) {
		throw new AstroError(`Error retrieving collection: ${collection}`);
	}

	return res.data;
};
