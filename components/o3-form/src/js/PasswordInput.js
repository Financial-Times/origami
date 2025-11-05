// src/js/PasswordInput.js
// @ts-check

/**
 * @typedef {Object} PasswordInputOptions
 * @property {string} [toggleButtonId]
 */

/**
 * @export
 */
export class PasswordInput {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [element] - An input element in the DOM
	 * @param {PasswordInputOptions} [options] - An options object for configuring the password input
	 */
	constructor(
		element,
		options = {toggleButtonId: 'o3-form-password-input-toggle'}
	) {
		this._toggleButtonId = options.toggleButtonId;
		this._input = element;
		this._toggleState = false;
		this._toggleButton = document.getElementById(options.toggleButtonId);
		this._setAttributes();
	}

	_setAttributes() {
		const buttonLabel = this._toggleState ? 'Hide password' : 'Show password';

		this._input.type = this._toggleState ? 'text' : 'password';

		this._toggleButton.setAttribute(
			'aria-pressed',
			this._toggleState.toString()
		);
		this._toggleButton.setAttribute('aria-label', buttonLabel);
		this._toggleButton.setAttribute('title', buttonLabel);

		this._toggleButton.classList.remove(
			this._toggleState
				? 'o3-password-input__show-password-toggle--show'
				: 'o3-password-input__show-password-toggle--hide'
		);
		this._toggleButton.classList.add(
			this._toggleState
				? 'o3-password-input__show-password-toggle--hide'
				: 'o3-password-input__show-password-toggle--show'
		);
	}

	/** @returns {void} */
	toggle() {
		if (!this._toggleButton) {
			throw new Error(
				`Toggle button for password field not found using id ${this._toggleButtonId}`
			);
		}

		this._toggleState = !this._toggleState;
		this._setAttributes();
	}
}
