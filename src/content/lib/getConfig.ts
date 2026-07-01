import { type CollectionEntry, getEntry } from 'astro:content';
import { AstroError } from 'astro/errors';

type Collection = 'site' | 'homepage' | 'footer' | 'theme';

export const getConfig = async <C extends Collection>(
	collection: C,
): Promise<CollectionEntry<C>['data']> => {
	const res = await getEntry(collection, collection);

	if (!res) {
		throw new AstroError(`Error retrieving collection: ${collection}`);
	}

	return res.data;
};
