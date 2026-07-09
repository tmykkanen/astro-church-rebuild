import { Calendar, type Options } from 'vanilla-calendar-pro';

import { createURLState } from '#/lib/urlState';

import 'vanilla-calendar-pro/styles/index.css';

export const init = () => {
	const els = document.querySelectorAll<HTMLElement>(
		`[data-slot="datepicker"]`,
	);

	els.forEach((el) => {
		const { filterType } = el.dataset;
		const input = el.querySelector<HTMLInputElement>(
			"[data-slot='datepicker-input']",
		);
		const clear = el.querySelector<HTMLButtonElement>(
			"[data-slot='datepicker-clear']",
		);
		if (!filterType || !input) return;

		const calendar = create(input);
		calendar.init();

		const state = createURLState(filterType);

		state.bind({
			updateUI: (value) => {
				input.value = value ?? '';
				if (value) {
					el.dataset.value = value;
				} else {
					delete el.dataset.value;
				}
				// Update calendar
				calendar.set({ selectedDates: value ? [value] : [] });
			},
			updateState: (set) => {
				el.addEventListener('datepicker:change', (e) => {
					set(e.detail.value);
				});

				clear?.addEventListener('click', () => {
					set('');
				});
			},
		});
	});
};

export const create = (el: HTMLElement) => {
	const options: Options = {
		inputMode: true,
		positionToInput: 'auto',
		onChangeToInput(self) {
			const input = self.context.inputElement;
			const selectedDates = self.context.selectedDates;

			if (!input) return;
			if (selectedDates[0]) {
				input.value = selectedDates[0];
				el.dataset.value = selectedDates[0];

				input.dispatchEvent(
					new CustomEvent('datepicker:change', {
						bubbles: true,
						detail: {
							value: input.value,
							// selectedDates: selectedDates,
						},
					}),
				);

				// if you want to hide the calendar after picking a date
				self.hide();
			} else {
				input.value = '';
			}
		},
	};

	return new Calendar(el, options);
};
