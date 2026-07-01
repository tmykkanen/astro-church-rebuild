const images = import.meta.glob<ImageMetadata>('/src/assets/**/*', {
	eager: true,
	import: 'default',
});

export const getImage = (path?: string, imageMap = images) => {
	return path ? imageMap[path] : undefined;
};
