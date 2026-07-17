import { describe, expect, it } from 'vitest';

import { calculateClamp, generateClamp } from '#/lib/generateClamp';

describe('calculateClamp calculates correct values', () => {
	it.each([
		[1, 3, 4.93, -2.49],
		[2.5, 4.75, 5.55, 19.2],
		[5, 10, 12.33, 33.78],
	])('calculates correct values for %srem -> %srem with defaults', (min, max, expectedVw, expectedIntercept) => {
		const result = calculateClamp(min, max);

		expect(result.vw).toBeCloseTo(expectedVw);
		expect(result.intercept).toBeCloseTo(expectedIntercept);
	});

	it.each([
		[{ maxViewportWidth: 1120 }, 6.44, 7.84],
		[{ minViewportWidth: 401 }, 7.7, 1.1],
		[{ baseRemPx: 12 }, 5.55, 3.2],
		[
			{ maxViewportWidth: 1120, minViewportWidth: 401, baseRemPx: 12 },
			5.01,
			3.92,
		],
	])('calculates correct values with options %s', (options, expectedVw, expectedIntercept) => {
		const result = calculateClamp(2, 5, options);

		expect(result.vw).toBeCloseTo(expectedVw);
		expect(result.intercept).toBeCloseTo(expectedIntercept);
	});
});

it('generateClamp returns valid text', () => {
	expect(generateClamp(1, 3)).toBe('clamp(1rem, calc(4.93vw + -2.49px), 3rem)');
});
