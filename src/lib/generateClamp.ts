// clamp(min, (viewportWidthCoefficientw)vw + (intercept)px, max)
// viewportWidthCoefficientw = slope x 100
// slope = (maxFontPx - minFontpx) / (maxViewportWidth - minViewportWidth)
// intercept = minFontpx - slope × minViewportWidth

type ClampOptions = {
	maxViewportWidth?: number;
	minViewportWidth?: number;
	baseRemPx?: number;
};

export const calculateClamp = (
	minFontInRem: number,
	maxFontInRem: number,
	options: ClampOptions = {},
) => {
	const {
		// 1024 is Tailwind lg breakpoint
		maxViewportWidth = 1024,
		minViewportWidth = 375,
		baseRemPx = 16,
	} = options;

	const slope =
		(maxFontInRem * baseRemPx - minFontInRem * baseRemPx) /
		(maxViewportWidth - minViewportWidth);
	const viewportWidthCoefficient = slope * 100;
	const intercept = minFontInRem * baseRemPx - slope * minViewportWidth;

	return {
		vw: viewportWidthCoefficient,
		intercept,
	};
};

export const generateClamp = (
	minFontInRem: number,
	maxFontInRem: number,
	options: ClampOptions = {},
) => {
	const { vw, intercept } = calculateClamp(minFontInRem, maxFontInRem, options);

	return `clamp(${minFontInRem}rem, calc(${vw.toFixed(2)}vw + ${intercept.toFixed(2)}px), ${maxFontInRem}rem)`;
};
