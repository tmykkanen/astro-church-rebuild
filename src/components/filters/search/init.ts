import Fuse from 'fuse.js';

import type { SermonCardData } from '#/components/card';
import { createURLState } from '#/lib/urlState';

export let fuse: Fuse<SermonCardData> | undefined;

export const createCardData = (
	cards: NodeListOf<HTMLElement>,
): SermonCardData[] =>
	[...cards].map((card) => ({
		element: card,
		title: card.dataset.title ?? '',
		series: card.dataset.series ?? '',
		preacher: card.dataset.preacher ?? '',
		scriptures: JSON.parse(card.dataset.scriptures ?? '[]'),
	}));

export const init = (cards: NodeListOf<HTMLElement>) => {
	const cardData = createCardData(cards);

	fuse = new Fuse(cardData, {
		includeScore: true,
		ignoreLocation: true,
		minMatchCharLength: 2,
		threshold: 0.35,
		useExtendedSearch: true,
		keys: [
			{ name: 'title', weight: 0.7 },
			{ name: 'series', weight: 0.5 },
			{ name: 'preacher', weight: 0.3 },
			{ name: 'scriptures', weight: 0.5 },
		],
	});

	const el = document.querySelector<HTMLElement>(`[data-slot="search"]`);

	if (!el) return;
	const input = el.querySelector<HTMLInputElement>(
		"[data-slot='search-input']",
	);

	if (!input) return;

	const state = createURLState('q');

	state.bind({
		updateUI: (value) => {
			input.value = value ?? '';
			if (value) {
				el.dataset.value = value;
			} else {
				delete el.dataset.value;
			}
		},
		updateState: (set) => {
			el.addEventListener('input', () => {
				set(input.value);
			});
		},
	});
};
