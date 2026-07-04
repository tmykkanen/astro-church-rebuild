type Callback<T> = (value: T | null) => void;

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
	};

	const subscribe = (callback: Callback<string>) => {
		// initial run
		callback(get());

		const handler = () => callback(get());

		window.addEventListener('popstate', handler);

		return () => {
			window.removeEventListener('popstate', handler);
		};
	};

	return { get, set, subscribe };
};

export const getURLState = () => {
	const params = new URLSearchParams(window.location.search);

	return {
		series: params.get('series'),
		preacher: params.get('preacher'),
		from: params.get('from'),
		to: params.get('to'),
		tags: params.get('tags'),
	};
};
