// export interface SermonCardElement extends HTMLElement {
// 	dataset: DOMStringMap & {
// 		card: string; // Represents data-sermon-card
// 		series?: string; // Represents data-series
// 		preacher?: string; // Represents data-preacher
// 		date?: string; // Represents data-date
// 		scripture?: string; // Represents data-scripture (JSON stringified array)
// 	};
// }

// export const isSermonCardElement = (
// 	element: unknown,
// ): element is SermonCardElement => {
// 	return element instanceof HTMLElement && 'sermonCard' in element.dataset;
// };

export type SermonCardData = {
	element: HTMLElement;
	title: string;
	series: string;
	preacher: string;
	scriptures: string[];
};
