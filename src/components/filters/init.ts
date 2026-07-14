import { initComboboxes } from './combobox';
import { applyFilters, initControls } from './control';
import { initDatepickers } from './datepicker';
import { initSearch } from './search';

export const initAll = () => {
	const cards = document.querySelectorAll<HTMLElement>('[data-card]');

	const filtersContainer = document.querySelector<HTMLDivElement>(
		'[data-filters-container]',
	);

	initComboboxes();
	initDatepickers();
	initSearch(cards);
	initControls();

	window.addEventListener('urlstate:change', () => {
		const filtersActive = applyFilters(cards);

		filtersContainer?.toggleAttribute('data-filters-active', filtersActive);
	});

	window.dispatchEvent(new Event('urlstate:change'));
};
