import { describe, expect, it } from 'vitest';

import { calculateClamp, generateClamp } from '#/lib/generateClamp';

describe('calculateClamp calculates correct values', () => {
	it.each([
		[1, 3, 3.54, 2.74],
		[2.5, 4.75, 3.98, 25.08],
		[5, 10, 8.84, 46.85],
	])('calculates correct values for %srem -> %srem with defaults', (min, max, expectedVw, expectedIntercept) => {
		const result = calculateClamp(min, max, {});

		expect(result.vw).toBeCloseTo(expectedVw);
		expect(result.intercept).toBeCloseTo(expectedIntercept);
	});

	it.each([
		[{ maxViewportWidth: 1120 }, 6.44, 7.84],
		[{ minViewportWidth: 401 }, 5.46, 10.1],
		[{ baseRemPx: 12 }, 3.98, 9.08],
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
	expect(generateClamp(1, 3)).toBe('clamp(1rem, calc(3.54vw + 2.74px), 3rem)');
});
