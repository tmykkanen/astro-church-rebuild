import { resetURLState } from '#/lib/urlState';

export const init = () => {
	const filtersContainer = document.querySelector<HTMLDivElement>(
		'[data-filters-container]',
	);

	const filtersToggle = document.querySelector<HTMLButtonElement>(
		'[data-filters-toggle]',
	);

	const filtersReset = document.querySelector<HTMLButtonElement>(
		'[data-filters-reset]',
	);

	if (!filtersContainer || !filtersToggle || !filtersReset) return;

	filtersToggle.addEventListener('click', () => {
		filtersContainer.toggleAttribute('data-filters-hidden');
	});

	filtersReset.addEventListener('click', () => {
		resetURLState();
		filtersContainer.toggleAttribute('data-filters-hidden', true);
	});
};
