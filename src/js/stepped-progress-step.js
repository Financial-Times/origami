
/**
 * Component class names.
 *
 * @access private
 * @type {Object}
 */
const classNames = {
	complete: 'o-stepped-progress__step--complete',
	current: 'o-stepped-progress__step--current',
	error: 'o-stepped-progress__step--error',
	label: 'o-stepped-progress__label',
	status: 'o-stepped-progress__status'
};

/**
 * Component status texts mapped from states.
 *
 * @access private
 * @type {Object}
 */
const statusTexts = {
	complete: '(completed)',
	current: '(current step)',
	error: '(error)'
};

/**
 * State class names as an array.
 *
 * @access private
 * @type {Array}
 */
const stateClassNames = [
	classNames.complete,
	classNames.current,
	classNames.error
];

/**
 * Represents a step in a stepped progress component.
 */
class SteppedProgressStep {

	/**
	 * Class constructor.
	 *
	 * @access public
	 * @param {HTMLElement} stepElement - The step element in the DOM
	 * @param {SteppedProgress} parent - The parent stepped progress instance
	 */
	constructor (stepElement, parent) {
		this.stepElement = stepElement;
		this.parent = parent;
		this.labelElement = this._selectLabelElement();
		this.statusElement = this._selectStatusElement();
		this._setInitialStatusText();
	}

	/**
	 * Get whether the step has the "complete" state.
	 *
	 * @access public
	 * @returns {Boolean} Returns whether the step is complete.
	 */
	isComplete() {
		return this.stepElement.classList.contains(classNames.complete);
	}

	/**
	 * Get whether the step has the "current" state.
	 *
	 * @access public
	 * @returns {Boolean} Returns whether the step is current.
	 */
	isCurrent() {
		return this.stepElement.classList.contains(classNames.current);
	}

	/**
	 * Get whether the step has the "error" state.
	 *
	 * @access public
	 * @returns {Boolean} Returns whether the step has an error.
	 */
	isError() {
		return this.stepElement.classList.contains(classNames.error);
	}

	/**
	 * Get whether the step has no explicit state (and so is a future step).
	 *
	 * @access public
	 * @returns {Boolean} Returns whether the step has no explicit state.
	 */
	isFuture() {
		return (
			!this.isComplete() &&
			!this.isCurrent() &&
			!this.isError()
		);
	}

	/**
	 * Set the step's state to "complete".
	 *
	 * @access public
	 * @returns {void}
	 */
	markAsComplete() {
		this._clearStateClasses();
		this.stepElement.classList.add(classNames.complete);
		this._setStatusText(statusTexts.complete);
	}

	/**
	 * Set the step's state to "current".
	 *
	 * @access public
	 * @returns {void}
	 */
	markAsCurrent() {
		this._clearStateClasses();
		this.stepElement.classList.add(classNames.current);
		this._setStatusText(statusTexts.current);
	}

	/**
	 * Set the step's state to "error".
	 *
	 * @access public
	 * @returns {void}
	 */
	markAsError() {
		this._clearStateClasses();
		this.stepElement.classList.add(classNames.error);
		this._setStatusText(statusTexts.error);
	}

	/**
	 * Remove all states from the step (marking it as a future step).
	 *
	 * @access public
	 * @returns {void}
	 */
	markAsFuture() {
		this._clearStateClasses();
		this._setStatusText();
	}

	/**
	 * Get the step label HTML element.
	 *
	 * @access private
	 * @returns {HTMLElement} Returns the step label HTML element.
	 */
	_selectLabelElement() {
		return this.stepElement.querySelector(`.${classNames.label}`);
	}

	/**
	 * Get the step status HTML element, creating it if it does not exist.
	 *
	 * @access private
	 * @returns {HTMLElement} Returns the step status HTML element.
	 */
	_selectStatusElement() {
		let statusElement = this.stepElement.querySelector(`.${classNames.status}`);
		if (!statusElement) {
			statusElement = document.createElement('span');
			statusElement.classList.add(classNames.status);
			this.labelElement.appendChild(statusElement);
		}
		return statusElement;
	}

	/**
	 * Set the text of the step status element.
	 *
	 * @access private
	 * @param {String} [statusText=''] - The text to set.
	 * @returns {void}
	 */
	_setStatusText(statusText = '') {
		this.statusElement.innerHTML = statusText;
	}

	/**
	 * Set the initial status text based on the step state in the DOM.
	 *
	 * @access private
	 * @returns {void}
	 */
	_setInitialStatusText() {
		if (this.isComplete()) {
			return this._setStatusText(statusTexts.complete);
		}
		if (this.isCurrent()) {
			return this._setStatusText(statusTexts.current);
		}
		if (this.isError()) {
			return this._setStatusText(statusTexts.error);
		}
		this._setStatusText();
	}

	/**
	 * Clear all state classes from the step element.
	 *
	 * @access private
	 * @returns {void}
	 */
	_clearStateClasses() {
		for (const className of stateClassNames) {
			this.stepElement.classList.remove(className);
		}
	}

}

export default SteppedProgressStep;
