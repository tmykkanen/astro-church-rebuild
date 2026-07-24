import { actions, isInputError } from 'astro:actions';

export const init = () => {
	const form = document.querySelector<HTMLFormElement>('#subscribe-form');
	if (!form) {
		throw new Error('Missing subscribe form');
	}

	const submitButton = form.querySelector<HTMLButtonElement>(
		'[data-submit-button]',
	);

	if (!submitButton) {
		throw new Error('Missing submit button');
	}

	// const resetButton = form?.querySelector('[data-reset-button]');
	const submitLabel = form.querySelector<HTMLSpanElement>(
		'[data-submit-label]',
	);
	const submitSpinner = submitButton.querySelector<SVGSVGElement>(
		'[data-slot="spinner"]',
	);
	const idleLabel =
		submitLabel instanceof HTMLSpanElement
			? submitLabel.textContent || 'Subscribe'
			: 'Subscribe';

	const messageEl = document.querySelector('[data-result-box]');

	const setSubmitting = (submitting: boolean) => {
		submitButton.disabled = submitting;
		// if (resetButton instanceof HTMLButtonElement) {
		// 	resetButton.disabled = submitting;
		// }

		if (submitSpinner instanceof Element) {
			submitSpinner.classList.toggle('hidden', !submitting);
		}
		if (submitLabel instanceof HTMLElement) {
			submitLabel.textContent = submitting ? 'Subscribing...' : idleLabel;
		}
	};

	const clearErrors = () => {
		form.querySelectorAll('[data-error-for]').forEach((el) => {
			if (!(el instanceof HTMLElement)) return;

			el.textContent = '';
			el.classList.add('hidden');
		});
	};

	form?.addEventListener('submit', async (event) => {
		event.preventDefault();
		setSubmitting(true);

		const [result] = await Promise.all([
			actions.subscribeClient(new FormData(form)),
		]);

		setSubmitting(false);

		if (result.error && isInputError(result.error)) {
			const fields = result.error.fields;

			for (const [field, errors] of Object.entries(fields)) {
				const node = form.querySelector<HTMLElement>(
					`[data-error-for=${field}]`,
				);
				if (!node) continue;

				node.textContent = errors[0];
				node.classList.remove('hidden');
				console.error(result.error.message);
			}

			return;
		}

		if (result.data) {
			const { ok, message, error } = result.data;

			error && console.log(error);

			if (messageEl instanceof HTMLElement) {
				messageEl.textContent = message;
				messageEl.classList.add(ok ? 'text-primary' : 'text-destructive');
				messageEl.classList.remove('hidden');
			}

			form.reset();
		}
	});

	form.addEventListener('reset', () => {
		setSubmitting(false);
		clearErrors();
	});
};
