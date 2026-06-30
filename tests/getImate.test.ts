import { expect, it } from 'vitest';

import { getImage } from '#/lib/getImage';

it('returns an image for a valid path', () => {
	const image = getImage('/src/assets/test.svg');

	expect(image).toBeDefined();
	expect(image?.src).toContain('test');
});

it('returns undefined for an invalid path', () => {
	expect(getImage('/src/assets/does-not-exist.svg')).toBeUndefined();
});

it('returns undefined when no path is provided', () => {
	expect(getImage()).toBeUndefined();
});
