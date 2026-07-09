import { createURLState } from '#/lib/urlState';

export const init = () => {
	const els = document.querySelectorAll<HTMLElement>(`[data-slot="combobox"]`);

	els.forEach((el) => {
		const { filterType } = el.dataset;
		if (!filterType) return;

		const state = createURLState(filterType);

		state.bind({
			updateUI: (value) => {
				el.dispatchEvent(
					new CustomEvent('combobox:set', { detail: { value } }),
				);
			},
			updateState: (set) => {
				el.addEventListener('combobox:change', (e) => {
					set(e.detail.value);
				});
			},
		});
	});
};
