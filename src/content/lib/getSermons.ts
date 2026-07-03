import { type CollectionEntry, getCollection, getEntry } from 'astro:content';

import type { HydratedSermon } from '#/content/types/sermons';

export const getSermons = async (): Promise<HydratedSermon[]> => {
	const allSermons = (await getCollection('sermons')).sort(
		(a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
	);

	const preacherIds = [...new Set(allSermons.map((s) => s.data.preacher))];
	const seriesIds = [...new Set(allSermons.map((s) => s.data.series))];

	const preacherMap = new Map(
		(
			await Promise.all(
				preacherIds
					.map((p) => getEntry(p.collection, p.id))
					.filter((e): e is Promise<CollectionEntry<'preachers'>> =>
						Boolean(e),
					),
			)
		).map((e) => [e.id, e]),
	);

	const seriesMap = new Map(
		(
			await Promise.all(
				seriesIds
					.map((p) => getEntry(p.collection, p.id))
					.filter((e): e is Promise<CollectionEntry<'series'>> => Boolean(e)),
			)
		).map((e) => [e.id, e]),
	);

	return allSermons.map((sermon) => ({
		...sermon,
		data: {
			...sermon.data,
			preacher: preacherMap.get(sermon.data.preacher.id),
			series: seriesMap.get(sermon.data.series.id),
		},
	}));
};

// const promises = allSermons.map(async (sermon) => {
// 	return {
// 		...sermon,
// 		series: await getEntry(sermon.data.series),
// 		preacher: await getEntry(sermon.data.preacher),
// 	};
// });

// return Promise.all(promises);
