import { getEntry } from 'astro:content';

export const getNavigation = async (id: string) => {
	const res = await getEntry('nav', id);

	if (!res) {
		throw new Error(`Missing required entry "${String(id)}" in "nav".`);
	}

	return res.data.navigationEntries;
};
