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

	filtersToggle?.addEventListener('click', () => {
		filtersContainer?.classList.toggle('hidden');
		filtersContainer?.classList.toggle('xl:hidden');
	});

	filtersReset?.addEventListener('click', () => {
		resetURLState();
	});
};
