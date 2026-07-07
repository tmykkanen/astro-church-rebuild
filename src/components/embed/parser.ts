import type { ProviderType } from './providers';

export const parseEmbed = (url: string) => {
	if (url.includes('youtube.com') || url.includes('youtu.be')) {
		const uri = url.match(/(?:v=|youtu\.be\/|live\/)([a-zA-Z0-9_-]{11})/)?.[1];

		if (!uri) return null;

		return {
			type: 'youtube' as ProviderType,
			uri,
		};
	}

	if (url.includes('spotify.com')) {
		const uri = url.match(
			/(?:track|album|playlist|episode)\/([a-zA-Z0-9]{22})/,
		)?.[1];

		if (!uri) return null;

		return {
			type: 'spotify' as ProviderType,
			uri,
		};
	}

	return null;
};
