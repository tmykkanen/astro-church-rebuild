import { bcv_parser } from 'bible-passage-reference-parser/esm/bcv_parser';
import * as lang from 'bible-passage-reference-parser/esm/lang/en';
import brf_parser from 'bible-reference-formatter';

import type { ParseScriptureRefResult } from './types';

export const parser = new bcv_parser(lang);
parser.set_options({ book_alone_strategy: 'full' });

export const isValidScriptureRef = (input: string): boolean => {
	return Boolean(parser.parse(input).osis());
};

export const parseScriptureRef = (input: string): ParseScriptureRefResult => {
	const osis = parser.parse(input).osis();

	if (!osis)
		return { ok: false, error: `${input} is not a valid scripture reference` };

	return {
		ok: true,
		osis,
		ref: brf_parser('esv-long', osis),
		shortRef: brf_parser('esv-short', osis),
	};
};
