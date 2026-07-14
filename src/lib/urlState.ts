type Callback<T> = (value: T | null) => void;

type BindOptions = {
	updateUI: (value: string | null) => void;
	updateState: (set: (value: string) => void) => void;
};

export const createURLState = (key: string) => {
	const get = () => {
		const params = new URLSearchParams(window.location.search);
		return params.get(key);
	};

	const set = (value: string) => {
		const url = new URL(window.location.href);

		if (value) url.searchParams.set(key, value);
		else url.searchParams.delete(key);

		history.replaceState({}, '', url);

		window.dispatchEvent(new Event('urlstate:change'));
	};

	const subscribe = (callback: Callback<string>) => {
		// initial run
		callback(get());

		const handler = () => callback(get());

		window.addEventListener('popstate', handler);
		window.addEventListener('urlstate:change', handler);

		return () => {
			window.removeEventListener('popstate', handler);
			window.removeEventListener('urlstate:change', handler);
		};
	};

	const bind = ({ updateUI, updateState }: BindOptions) => {
		const unsubscribe = subscribe(updateUI);
		updateState(set);

		// return cleanup function
		return unsubscribe;
	};

	return { bind };
};

export const getURLState = () => {
	const params = new URLSearchParams(window.location.search);

	return {
		series: params.get('series'),
		preacher: params.get('preacher'),
		from: params.get('from'),
		to: params.get('to'),
		tag: params.get('tag'),
		query: params.get('q'),
	};
};

export const resetURLState = () => {
	history.replaceState({}, '', window.location.pathname);
	window.dispatchEvent(new Event('urlstate:change'));
};
