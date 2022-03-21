export default class FtConceptButton {
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
		this.button = this.element.querySelector('.ft-concept-button__button');
		this.live = this.element.querySelector('.ft-follow-button__announcement');
		this.options = Object.assign({}, options || this.getOptionsFromDom());
	}

	get isPressed() {
		return this.button.getAttribute('aria-pressed') === 'true';
	}

	/**
	 * Set the followed state
	 * Updates the UI and adds text to the a11y box.
	 *
	 * @param {boolean} [state] the state to set
	 */
	set isPressed(state) {
		this.button.setAttribute('aria-pressed', state ? 'true' : 'false');

		if (
			this.options.ariaLivePressedText &&
			this.options.ariaLiveUnpressedText &&
			this.live
		) {
			this.live.textContent = state
				? this.options.ariaLivePressedText
				: this.options.ariaLiveUnpressedText;
		}

		if (this.options.pressedText && this.options.unpressedText) {
			this.button.textContent = state
				? this.options.pressedText
				: this.options.unpressedText;
		}

		if (
			this.options.ariaLabelPressedText &&
			this.options.ariaLabelUnpressedText
		) {
			this.button.setAttribute('aria-label', state
				? this.options.ariaLabelPressedText
				: this.options.ariaLiveUnpressedText);
		}
	}

	getOptionsFromDom() {
		const options = {};
		if (this.element instanceof HTMLElement) {
			for (const [key, value] of Object.entries(this.element.dataset)) {
				if (key.startsWith('ftConceptButton')) {
					const option = key.replace(
						/^ftConceptButton(\w)(\w+)$/,
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
	 * @returns {(FtConceptButton|Array<FtConceptButton>)} - ft-concept-button instance(s)
	 */
	static init(rootEl, options) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (typeof rootEl === 'string') {
			rootEl = document.querySelector(rootEl);
		}

		const selector = '[data-o-component="ft-concept-button"]';

		if (rootEl instanceof HTMLElement && rootEl.matches(selector)) {
			return new FtConceptButton(rootEl, options);
		}
		return Array.from(
			rootEl.querySelectorAll(selector),
			rootEl => new FtConceptButton(rootEl, options)
		);
	}
}
