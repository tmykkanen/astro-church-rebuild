const images = import.meta.glob<ImageMetadata>('/src/assets/**/*', {
	eager: true,
	import: 'default',
});

export const getImage = (path?: string) => {
	// TODO: Should this fail silently with undefined or throw an error?

	return path ? images[path] : undefined;
};
