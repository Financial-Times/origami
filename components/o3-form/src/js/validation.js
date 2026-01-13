/**
 * Options to configure validation behaviour.
 *
 * @typedef {Object} O3ValidationOptions
 * @property {boolean} [useBrowserReport=false] When true, call `form.reportValidity()` after an invalid submit (do not combine with `preventSubmit=true`).
 * @property {boolean} [errorSummary=true] Whether to create/update an error summary element.
 * @property {Object.<string,string>} [customMessages] Map of field id or name to a custom error message override.
 * @property {boolean} [preventSubmit=true] Prevent form submission while invalid.
 * @property {boolean} [focusFirstInvalid=true] Focus the first invalid control (or summary heading) after validation.
 * @property {(formEl: HTMLFormElement) => Promise<FieldError[]>} [asyncValidate] Optional future hook for asynchronous validation. (Reserved; currently ignored.)
 */

/**
 * FieldError represents a single invalid field.
 * Mirrors exported TS FieldError type.
 *
 * @typedef {Object} FieldError
 * @property {string} id Element id (may be blank if missing; summary links omitted if so).
 * @property {string} fieldName Human friendly label text.
 * @property {string} message Validation message.
 * @property {('native'|'custom')} [source] Origin of message (native browser vs custom override).
 */

const SUMMARY_CLASS = 'o3-form__error-summary';
const ERROR_INPUT_CLASS = 'o3-form-text-input--error';
const FORM_FEEDBACK_ERROR_CLASS = 'o3-form-feedback__error';
const FORM_FIELD_CLASS = 'o3-form-field';

/** Maintain internal state per form element */
const formState = new WeakMap();

/**
 * Initialise validation on a form element or selector.
 *
 * @param {string|HTMLFormElement} formOrSelector A form element or a selector resolving to one.
 * @param {O3ValidationOptions} [options] Validation configuration overrides.
 * @returns {HTMLFormElement|null} The initialised form element.
 */
function initO3FormValidation(formOrSelector, options = {}) {
	const formElement =
		formOrSelector instanceof HTMLFormElement
			? formOrSelector
			: document.querySelector(formOrSelector);

	if (!formElement || !(formElement instanceof HTMLFormElement)) {
		throw new Error(
			'initO3FormValidation must be passed a form element or selector resolving to a form.'
		);
	}
	const validationOptions = Object.assign(
		{
			useBrowserReport: false,
			errorSummary: true,
			customMessages: undefined,
			preventSubmit: true,
			focusFirstInvalid: true,
		},
		options
	);

	if (validationOptions.useBrowserReport && validationOptions.preventSubmit) {
		throw new Error('Cannot enable both useBrowserReport and preventSubmit.');
	}

	if (formState.has(formElement)) return formElement; // already initialised

	const state = {validationOptions, isSubmitAttempted: false, elementsPreviouslyFocussed: []}; // future: may hold cached lastErrors etc.
	formState.set(formElement, state);

	const progressiveHandler = event => {
		const current = formState.get(formElement);
		if (!current) return;
		const errors = collectInvalidFields(event.currentTarget, validationOptions);

		const focussedErrors = current.isSubmitAttempted ? errors : errors.filter((error) => current.elementsPreviouslyFocussed.includes(error.id));

		applyInlineFeedback(formElement, focussedErrors);
	};

	formElement.addEventListener(
		'invalid',
		event => {
			// suppress native tooltip when using custom summary
			const current = formState.get(formElement);
			if (!current) return;
			if (current.isSubmitAttempted) {
				const errors = collectInvalidFields(formElement, validationOptions);
				applyInlineFeedback(formElement, errors);
				createErrorSummary(formElement, errors, validationOptions);
				if (current.validationOptions.errorSummary) {
					event.preventDefault();
				}
				current.isSubmitAttempted = false;
			}
		},
		true
	);

	formElement.addEventListener('submit', (event) => {
		const current = formState.get(formElement);
		current.isSubmitAttempted = true;

		const ok = validateAndReRender(formElement, validationOptions);

		if (!ok && validationOptions.preventSubmit) event.preventDefault();
	});

	formElement.addEventListener('pointerdown', event => {
		const current = formState.get(formElement);
		const target = event.target.closest('button[type="submit"], input[type="submit"]');

		const isSubmit =
			target instanceof HTMLButtonElement
				? target.type === 'submit'
				: target instanceof HTMLInputElement && target.type === 'submit';

		if (!isSubmit) return;

		if (!current) return;
		const {validationOptions} = current;
		current.isSubmitAttempted = true;

		for (const fieldElement of formElement.elements) {
			current.elementsPreviouslyFocussed.push(fieldElement.id);
		}

		const ok = validateAndReRender(formElement, validationOptions);

		if (!ok && validationOptions.preventSubmit) event.preventDefault();
	}, true);

	formElement.addEventListener('input', progressiveHandler, true);
	formElement.addEventListener('blur', progressiveHandler, true);

	const fieldElements = Array.from(formElement.elements);

	for (const fieldElement of fieldElements) {
		if (!isFormFieldElement(fieldElement)) continue;

		fieldElement.addEventListener('focusin', () => {
			const current = formState.get(formElement);
			current.elementsPreviouslyFocussed.push(fieldElement.id);
		});
	}

	return formElement;
}

/**
 * Collect invalid fields using the Constraint Validation API.
 *
 * @param {HTMLFormElement} formElement The form to scan for invalid controls.
 * @param {O3ValidationOptions} validationOptions Validation configuration.
 * @returns {FieldError[]} An array of field error objects.
 */
function collectInvalidFields(formElement, validationOptions) {
	const elements = Array.from(formElement.elements);
	/** @type {FieldError[]} */
	const errors = [];

	for (const fieldElement of elements) {
		if (!isFormFieldElement(fieldElement))
			continue;

		if (fieldElement.checkValidity()) continue;

		/** @type string */
		let message = fieldElement.validationMessage;
		let source = 'native';

		// Custom message precedence: explicit option map -> data attributes
		const idOrName = fieldElement.id || fieldElement.name;

		if (
			idOrName &&
			validationOptions.customMessages &&
			validationOptions.customMessages[idOrName]
		) {
			message = validationOptions.customMessages[idOrName];
			source = 'custom';
		} else {
			// Data attribute overrides (e.g. data-o3-form-message-required)
			const validity = fieldElement.validity;

			const dataKey = validity.valueMissing
				? 'required'
				: validity.typeMismatch
					? 'type'
					: validity.patternMismatch
						? 'pattern'
						: validity.tooShort
							? 'too-short'
							: validity.tooLong
								? 'too-long'
								: validity.rangeUnderflow
									? 'range-underflow'
									: validity.rangeOverflow
										? 'range-overflow'
										: validity.stepMismatch
											? 'step'
											: validity.badInput
												? 'bad-input'
												: null;

			if (dataKey) {
				const attr = fieldElement.getAttribute(
					`data-o3-form-message-${dataKey}`
				);

				if (attr) {
					message = attr;
					source = 'custom';
				}
			}
		}

		errors.push({
			id: fieldElement.id,
			fieldName: deriveFieldName(fieldElement),
			message,
			source,
		});
	}
	return errors;
}

/**
 * Apply or remove inline error classes on affected form controls.
 *
 * @param {HTMLFormElement} formElement The form element hosting the controls.
 * @param {FieldError[]} errors Current list of errors to reflect.
 */
function applyInlineFeedback(formElement, errors) {
	const elements = Array.from(formElement.elements)

	for (const fieldElement of elements) {
		if (!(fieldElement instanceof HTMLElement)) continue;

		const [error] = errors.filter((error) => error.id === fieldElement.id);

		if (!error) {
			fieldElement.closest(`.${FORM_FIELD_CLASS}`)?.querySelector(`.${FORM_FEEDBACK_ERROR_CLASS}`)?.remove();
			fieldElement.classList.remove(ERROR_INPUT_CLASS);
		} else {
			if (fieldElement.classList.contains('o3-form-text-input') && !fieldElement.classList.contains(ERROR_INPUT_CLASS)) {
				fieldElement.classList.add(ERROR_INPUT_CLASS);
			}

			if (!fieldElement.parentElement.querySelector(`.${FORM_FEEDBACK_ERROR_CLASS}`)) {
				const errorMessageContainer = createFeedbackElement(error);
				fieldElement.closest(`.${FORM_FIELD_CLASS}`).appendChild(errorMessageContainer);
			}
		}
	}
}

/**
 * Validates form is valid and conditionally displays an error summary
 * @param formElement
 * @param validationOptions
 * @returns boolean
 */
function validateAndReRender(formElement, validationOptions) {
	const invalid = !formElement.checkValidity();

	if (invalid) {
		const errors = collectInvalidFields(formElement, validationOptions);

		applyInlineFeedback(formElement, errors);
		createErrorSummary(formElement, errors, validationOptions);

		if (errors.length && validationOptions.focusFirstInvalid) {
			const target = formElement.querySelector(`#${errors[0].id}`);
			target?.focus();
		}
	} else {
		document.querySelector(`.${SUMMARY_CLASS}`)?.remove();
	}

	return !invalid;
}

/**
 * Creates feedback element
 *
 * @param {FieldError} error The error to create a feedback element for.
 * @returns {HTMLElement} A field error if invalid, otherwise null.
 */
function createFeedbackElement(error) {
	const errorMessageContainer = document.createElement('div');
	errorMessageContainer.classList.add('o3-form-feedback', FORM_FEEDBACK_ERROR_CLASS);

	const errorMessage = document.createElement('span');
	errorMessage.classList.add(`${FORM_FEEDBACK_ERROR_CLASS}-message`);
	errorMessage.innerText = error.message;
	errorMessageContainer.appendChild(errorMessage);

	return errorMessageContainer;
}

/**
 * Render or update the error summary element for the form.
 *
 * @param {HTMLFormElement} formElement The form to render a summary for.
 * @param {FieldError[]} errors Errors to list; if empty the summary is removed.
 * @param {O3ValidationOptions} validationOptions Validation configuration.
 */
function createErrorSummary(formElement, errors, validationOptions) {
	if (!validationOptions.errorSummary) return;

	let summary = formElement.querySelector(`.${SUMMARY_CLASS}`);

	if (!errors.length) {
		if (summary) summary.remove();
		return;
	}

	if (!summary) {
		summary = document.createElement('div');
		summary.className = SUMMARY_CLASS;
		summary.setAttribute('role', 'alert');
		summary.setAttribute('aria-live', 'polite');
		formElement.insertBefore(summary, formElement.firstChild);
	}
	summary.innerHTML = '';

	const icon = document.createElement('span');
	icon.className = `${SUMMARY_CLASS}-icon`;

	const headingWrapper = document.createElement('div');
	headingWrapper.className = `${SUMMARY_CLASS}__heading`;
	headingWrapper.setAttribute('aria-labelledby', 'error-summary-title');

	const heading = document.createElement('span');
	heading.id = 'error-summary-title';
	heading.className = 'o3-typography-heading5';
	heading.textContent = 'Please correct these errors and try again.';

	const list = document.createElement('ul');
	list.className = `${SUMMARY_CLASS}__list o3-typography-body-small`;

	for (const error of errors) {
		const listItem = document.createElement('li');

		if (error.id) {
			const link = document.createElement('a');
			link.className = 'o3-typography-link';
			link.href = `#${error.id}`;
			link.textContent = error.fieldName;
			listItem.appendChild(link);

			const messageSpan = document.createElement('span');
			messageSpan.textContent = `: ${error.message}`;

			listItem.appendChild(messageSpan);
		} else {
			listItem.textContent = `${error.fieldName}: ${error.message}`;
		}
		list.appendChild(listItem);
	}
	headingWrapper.appendChild(heading);
	headingWrapper.appendChild(list);

	summary.appendChild(icon);
	summary.appendChild(headingWrapper);

	if (validationOptions.focusFirstInvalid) {
		heading.focus?.();
	}
}

/**
 * Derive a human-readable field name from its associated `<label>` or fallback attributes.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} element The form control to derive a label for.
 * @returns {string} A human friendly name for the field.
 */
function deriveFieldName(element) {
	if (!element) return 'Field';

	if (element.id) {
		const label = element.form?.querySelector(`label[for="${element.id}"]`);
		if (label && label.textContent) return label.textContent.trim();
	}

	return element.getAttribute('name') || element.id || 'Field';
}

/**
 * Check if a given HTMLElement is a valid form field element.
 *
 * @param fieldElement {HTMLElement}
 * @returns {boolean}
 */
function isFormFieldElement(fieldElement) {
	return fieldElement instanceof HTMLInputElement ||
		fieldElement instanceof HTMLSelectElement ||
		fieldElement instanceof HTMLTextAreaElement;
}

/**
 * Set a custom message for a field; clears any previous message when falsy.
 *
 * @param {HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement} element The field element to annotate.
 * @param {string} message The custom message (empty string clears).
 */
function setCustomMessage(element, message) {
	if (!element) return;
	element.setCustomValidity(message || '');
}

/**
 * Destroy validation instance: remove listeners and summary.
 *
 * @param {string|HTMLFormElement} formOrSelector A form element or a selector resolving to one.
 */
function destroyO3FormValidation(formOrSelector) {
	const formElement =
		formOrSelector instanceof HTMLFormElement
			? formOrSelector
			: document.querySelector(formOrSelector);

	if (!formElement || !(formElement instanceof HTMLFormElement)) return;

	const state = formState.get(formElement);

	if (!state) return;

	// clone without listeners (simpler than tracking each bound handler)
	const clone = formElement.cloneNode(true);
	formElement.parentNode?.replaceChild(clone, formElement);

	const summary = clone.querySelector(`.${SUMMARY_CLASS}`);
	summary?.remove();
	formState.delete(clone); // new clone not initialised
}

export {
	collectInvalidFields,
	destroyO3FormValidation,
	initO3FormValidation,
	setCustomMessage,
	createErrorSummary as showErrorSummary,
};
