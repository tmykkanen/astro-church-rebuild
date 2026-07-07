export const providers = {
	spotify: {
		type: 'spotify',
		getUrl: (uri: string, isCompact = false) =>
			`https://open.spotify.com/embed/episode/${uri}${isCompact ? '' : '/video'}`,
	},
	youtube: {
		type: 'youtube',
		getUrl: (uri: string) => `https://www.youtube.com/embed/${uri}`,
	},
} as const;

export type ProviderType = keyof typeof providers;
export type Provider = (typeof providers)[ProviderType];
