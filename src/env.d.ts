declare global {
	interface HTMLElementEventMap {
		'combobox:change': CustomEvent<{
			value: string;
		}>;

		'combobox:input-change': CustomEvent<{
			inputValue: string;
		}>;
	}
}

export {};
