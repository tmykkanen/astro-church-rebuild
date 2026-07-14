import { getMatches } from '#/components/filters/';
import { getURLState } from '#/lib/urlState';

export const applyFilters = (cards: NodeListOf<HTMLElement>): boolean => {
	const { series, preacher, tag, from, to, query } = getURLState();

	const filtersActive = Boolean(
		series || preacher || tag || from || to || query,
	);

	const searchResults = query ? getMatches(query) : null;

	cards.forEach((card) => {
		const matchesSeries = !series || card.dataset.series === series;
		const matchesPreacher = !preacher || card.dataset.preacher === preacher;
		const matchesTag =
			!tag || (card.dataset.tags ?? '').split(',').includes(tag);
		const matchesFrom =
			!from ||
			(card.dataset.date &&
				Number(card.dataset.date) >= new Date(from).getTime());
		const matchesTo =
			!to ||
			(card.dataset.date &&
				Number(card.dataset.date) <= new Date(to).getTime());

		const matchesQuery = !query || searchResults?.has(card);

		card.hidden = !(
			matchesSeries &&
			matchesPreacher &&
			matchesTag &&
			matchesFrom &&
			matchesTo &&
			matchesQuery
		);
	});

	return filtersActive;
};
