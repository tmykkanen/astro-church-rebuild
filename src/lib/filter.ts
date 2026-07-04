import { getURLState } from './urlState';

export const applyFilters = () => {
	const { series, preacher, tags } = getURLState();

	const cards = document.querySelectorAll('[data-sermon-card]');

	cards.forEach((card) => {
		if (!(card instanceof HTMLElement)) return;

		const matchesSeries = !series || card.dataset.series === series;
		const matchesPreacher = !preacher || card.dataset.preacher === preacher;
		const matchesTags = !tags || card.dataset.tags === tags;

		// TODO: Implement from / to filters
		// const matchesFrom = !from || card.dataset.from === from;

		card.hidden = !(matchesSeries && matchesPreacher && matchesTags);
	});
};
