import { Calendar, type Options } from 'vanilla-calendar-pro';

import 'vanilla-calendar-pro/styles/index.css';

export const createDatepicker = (el: HTMLElement) => {
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
