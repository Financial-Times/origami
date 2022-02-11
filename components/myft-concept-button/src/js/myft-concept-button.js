export default class MyftConceptButton {
	// TODO make a @typedef for options
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement=} [element] The component element in the DOM
	 * @param {object} [options={}] An options object for configuring the component
	 * @property {HTMLElement} element The component element in the DOM
	 * @property {object} options The merged options
	 */
	constructor(element, options) {
		this.element = element;
		this.button = this.element.querySelector('.myft-concept-button__button');
		this.live = this.element.querySelector('.myft-follow-button__announcement');
		this.options = Object.assign({}, options || this.getOptionsFromDom());
	}

	get isFollowed() {
		return this.button.ariaPressed;
	}

	/**
	 * Toggle the button between followed and not.
	 * Updates the UI and adds text to the a11y box.
	 *
	 * @param {boolean=} [setting] If this is true, we are going
	 */
	toggle(setting) {
		if (arguments.length === 0) {
			setting = !this.isFollowed;
		}

		if (setting) {
			this.button.ariaPressed = 'false';
		} else {
			this.button.ariaPressed = 'true';
		}
	}

	getOptionsFromDom() {
		const options = {};
		if (this.element instanceof HTMLElement) {
			for (const [key, value] of Object.entries(this.element.dataset)) {
				if (key.startsWith('myftConceptButton')) {
					const option = key.replace(
						/^myftConceptButton(\w)(\w+)$/,
						(m, m1, m2) => m1.toLowerCase() + m2
					);
					options[option] = value;

					try {
						options[option] = JSON.parse(value);
					} catch (_) {
						// empty
					}
				}
			}
		}
		return options;
	}

	/**
	 * Initialize components on the page
	 *
	 * @param {(Element | HTMLElement | string)} rootEl - The root element to initialize the component in, or a CSS-style selector for the root element
	 * @param {object} [options={}] - An options object for configuring the component
	 * @returns {(MyftConceptButton|Array<MyftConceptButton>)} - myft-concept-button instance(s)
	 */
	static init(rootEl, options) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const selector = '[data-o-component="myft-concept-button"]';

		if (rootEl instanceof HTMLElement && rootEl.matches(selector)) {
			return new MyftConceptButton(rootEl, options);
		}
		return Array.from(
			rootEl.querySelectorAll(selector),
			rootEl => new MyftConceptButton(rootEl, options)
		);
	}
}
