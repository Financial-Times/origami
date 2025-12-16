declare module '@financial-times/o3-form/validation' {
	export type FieldError = {
		id: string;
		fieldName: string;
		message: string;
		source?: 'native' | 'custom';
	};

	export type O3ValidationOptions = {
		useBrowserReport?: boolean;
		errorSummary?: boolean;
		customMessages?: Record<string, string>;
		preventSubmit?: boolean;
		focusFirstInvalid?: boolean;
		asyncValidate?: (formEl: HTMLFormElement) => Promise<FieldError[]>; // reserved for future
	};

	/** Initialise validation on a form element or selector. */
	export function initO3FormValidation(
		formOrSelector: string | HTMLFormElement,
		options?: O3ValidationOptions
	): HTMLFormElement | null;

	/** Tear down validation listeners and remove summary if present. */
	export function destroyO3FormValidation(
		formOrSelector: string | HTMLFormElement
	): void;

	/** Collect current invalid fields for a form element. */
	export function collectInvalidFields(
		formEl: HTMLFormElement,
		opts: O3ValidationOptions
	): FieldError[];

	/** Show or update an error summary section. */
	export function showErrorSummary(
		formEl: HTMLFormElement,
		errors: FieldError[],
		opts: O3ValidationOptions
	): void;

	/** Set a custom validity message for a given field. */
	export function setCustomMessage(
		inputEl: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
		message: string
	): void;

	/** Revalidate a single field and return its error or null. */
	export function revalidateField(
		inputEl: HTMLElement,
		opts: O3ValidationOptions
	): FieldError | null;
}
