import type { Err, Ok } from '#/lib/types';

export type ScriptureRef = {
	osis: string;
	ref: string;
	shortRef: string;
};

export type ParseScriptureRefSuccess = Ok<ScriptureRef>;
export type ParseScriptureRefResult = ParseScriptureRefSuccess | Err;
