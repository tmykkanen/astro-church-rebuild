export type Ok<T> = { ok: true } & T;
export type Err<E = string> = { ok: false; error: E };

export type ScriptureRef = {
	osis: string;
	ref: string;
	shortRef: string;
};

export type ParseScriptureRefSuccess = Ok<ScriptureRef>;
export type ParseScriptureRefResult = ParseScriptureRefSuccess | Err;
