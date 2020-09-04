
import SteppedProgressStep from './stepped-progress-step.js';

/**
 * Component class names.
 *
 * @access private
 * @type {Object}
 */
const classNames = {
	step: 'o-stepped-progress__step'
};

/**
 * Represents a stepped progress component.
 */
class SteppedProgress {

	/**
	 * Class constructor.
	 *
	 * @access public
	 * @param {HTMLElement} steppedProgressElement - The component element in the DOM.
	 * @param {Object} [options={}] - An options object for configuring the component.
	 */
	constructor (steppedProgressElement, options) {
		this.steppedProgressElement = steppedProgressElement;
		this.options = Object.assign({}, {
			// TODO
		}, options || SteppedProgress.getDataAttributes(steppedProgressElement));
		this._constructSteps();
	}

	/**
	 * Get an array of steps.
	 *
	 * @access public
	 * @returns {Array<SteppedProgressStep>} Returns an array of steps.
	 */
	getSteps() {
		return [...this._steps];
	}

	/**
	 * Get an array of steps with a "completed" status.
	 *
	 * @access public
	 * @returns {Array<SteppedProgressStep>} Returns an array of steps.
	 */
	getCompletedSteps() {
		return this._steps.filter(step => step.isComplete());
	}

	/**
	 * Get whether a step exists at a given index (0-based).
	 *
	 * @access public
	 * @param {Number} index - The index to check.
	 * @returns {Boolean} Returns whether a step exists at a given index.
	 */
	hasStepAtIndex(index) {
		return Boolean(this._steps[index]);
	}

	/**
	 * Get the step at a given index (0-based).
	 *
	 * @access public
	 * @param {Number} index - The index of the step to get.
	 * @returns {SteppedProgressStep} Returns the step at the given index.
	 * @throws {Error} Will throw an error if there is no step at the given index. Use {@link SteppedProgress#hasStepAtIndex} to check.
	 */
	getStepAtIndex(index) {
		if (!this.hasStepAtIndex(index)) {
			throw new Error(`No step at index: ${index}`);
		}
		return this._steps[index];
	}

	/**
	 * Get the step which has the "current" state. If there are multiple steps with this state then
	 * the last one will be returned.
	 *
	 * @access public
	 * @returns {SteppedProgressStep} Returns the current step.
	 */
	getCurrentStep() {
		return this._steps.filter(step => step.isCurrent()).pop();
	}

	/**
	 * Get the last step in the stepped progress.
	 *
	 * @access public
	 * @returns {SteppedProgressStep} Returns the last step.
	 */
	getLastStep() {
		return this._steps[this._steps.length - 1];
	}

	/**
	 * Get whether all steps have the "completed" state.
	 *
	 * @access public
	 * @returns {Boolean} Returns whether all steps are completed.
	 */
	isComplete() {
		return this._steps.every(step => step.isComplete());
	}

	/**
	 * Get the next future step (a step which does not have the "current", "complete", or "error"
	 * states). If no such step exists, the last step will be returned.
	 *
	 * @access public
	 * @returns {SteppedProgressStep} Returns the next step.
	 */
	getNextStep() {
		if (!this.isComplete()) {
			return this._steps.find(step => step.isFuture()) || this.getLastStep();
		}
		return this.getLastStep();
	}

	/**
	 * Mark the current step as "complete" and then mark the next step as "current". If all steps
	 * have the "complete" state then this method does nothing.
	 *
	 * @access public
	 * @returns {void}
	 */
	progress() {
		if (!this.isComplete()) {
			const currentStep = this.getCurrentStep();
			if (currentStep) {
				currentStep.markAsComplete();
			}
		}
		if (!this.isComplete()) {
			this.getNextStep().markAsCurrent();
		}
	}

	/**
	 * Construct step instances and store them on the `_steps` property.
	 *
	 * @access private
	 * @returns {void}
	 */
	_constructSteps() {
		const elements = this.steppedProgressElement.querySelectorAll(`.${classNames.step}`);
		this._steps = [...elements].map(element => new SteppedProgressStep(element, this));
	}

	/**
	 * Get the data attributes from the stepped progress element. If the component is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 *
	 * @access public
	 * @param {HTMLElement} steppedProgressElement - The component element in the DOM
	 * @returns {Object} Returns an options object constructed from the DOM.
	 */
	static getDataAttributes(steppedProgressElement) {
		if (!(steppedProgressElement instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(steppedProgressElement.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oSteppedProgress(w)(w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = steppedProgressElement.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}

			return options;
		}, {});
	}

	/**
	 * Initialise stepped progress component.
	 *
	 * @access public
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 * @returns {(SteppedProgress|Array<SteppedProgress>)} Returns a stepped progress instance, or an array of instances.
	 */
	static init(rootEl, options) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-stepped-progress]')) {
			return new SteppedProgress(rootEl, options);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-stepped-progress"]'), rootEl => new SteppedProgress(rootEl, options));
	}
}

export default SteppedProgress;
