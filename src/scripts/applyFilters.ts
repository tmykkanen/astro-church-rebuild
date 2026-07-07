import { isSermonCardElement } from '#/components/card';
import { getURLState } from '#/lib/urlState';

export const applyFilters = () => {
	const { series, preacher, tags, from, to } = getURLState();

	const cards = document.querySelectorAll('[data-sermon-card]');

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

		card.hidden = !(
			matchesSeries &&
			matchesPreacher &&
			matchesTags &&
			matchesFrom &&
			matchesTo
		);
	});
};
