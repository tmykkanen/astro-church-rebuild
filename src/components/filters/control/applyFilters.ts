import { isSermonCardElement } from '#/components/card';
import { getMatches } from '#/components/filters/';
import { getURLState } from '#/lib/urlState';

export const applyFilters = (cards: NodeListOf<HTMLElement>) => {
	const { series, preacher, tags, from, to, query } = getURLState();

	const searchResults = query ? getMatches(query) : null;

	cards.forEach((card) => {
		if (!isSermonCardElement(card)) return;

		const matchesSeries = !series || card.dataset.series === series;
		const matchesPreacher = !preacher || card.dataset.preacher === preacher;
		const matchesTags = !tags || card.dataset.tags === tags;
		const matchesFrom =
			!from ||
			(card.dataset.date &&
				Number(card.dataset.date) >= new Date(from ?? '').getTime());
		const matchesTo =
			!to ||
			(card.dataset.date &&
				Number(card.dataset.date) <= new Date(to ?? '').getTime());

		const matchesQuery = !query || searchResults?.has(card);

		card.hidden = !(
			matchesSeries &&
			matchesPreacher &&
			matchesTags &&
			matchesFrom &&
			matchesTo &&
			matchesQuery
		);
	});
};
