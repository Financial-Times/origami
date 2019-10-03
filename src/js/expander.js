import ExpanderUtility from './expander-utility';

class Expander extends ExpanderUtility {

	/**
	 * o-expander constructor.
	 * @param {HTMLElement} oExpanderElement - The component element in the DOM
	 * @param {Object} opts - An options object for configuring the component.
	 * @param {String|Number} opts.shrinkTo ['height'] - The expander collapse method, "height", "hidden", or a number of items.
	 * @param {String|Number} opts.toggleState ['all'] - How to update the expander toggles: "all" to update text and aria-expanded attributes, "aria" to update only aria-expanded attributes, "none" to avoid updating toggles on click.
	 * @param {String} opts.itemSelector ['li'] - A selector for the expandable items when `shrinkTo` is set to a number, relative to `.o-expander__content`.
	 * @param {String} opts.expandedToggleText ['fewer'] - Toggle text for when the expander is collapsed. Defaults to "fewer", or "less" when `shrinkTo` is "height", or "hidden" when `shrinkTo` is "hidden".
	 * @param {String} opts.collapsedToggleText ['more'] - Toggle text for when the expander is collapsed. Defaults to "more" or "show" when `shrinkTo` is "hidden".
	 */
	constructor (oExpanderElement, opts) {
		// Get user configuration.
		const userOptions = opts || Expander._getDataAttributes(oExpanderElement);
		// Initialise with user options and o-expander classes and selectors.
		// Only `selectors.item`, which is not o-expander specific, is
		// configurable by the user with the `itemSelector` option.
		super(oExpanderElement, Object.assign(userOptions, {
			selectors: {
				toggle: '.o-expander__toggle',
				content: '.o-expander__content',
				item: userOptions.itemSelector || 'li',
			},
			classnames: {
				initialized: 'o-expander--initialized',
				inactive: 'o-expander--inactive',
				expanded: 'o-expander__content--expanded',
				collapsed: 'o-expander__content--collapsed',
				collapsibleItem: 'o-expander__collapsible-item'
			}
		}));
	}

	/**
	 * Construct a custom expander. Useful to add customised expander
	 * functionality to a component. E.g. to animate away collapsed items
	 * rather than hide them immediately.
	 *
	 * @param {HTMLElement} oExpanderElement - The expander element in the DOM.
	 * @param {Object} opts [{}] - An options object for configuring the expander @see ExpanderUtility.
	 */
	static createCustom(oExpanderElement, opts) {
		return new ExpanderUtility(oExpanderElement, opts);
	}

	/**
	 * Initialise the component.
	 * @param {(HTMLElement|String)} rootElement - The root element to initialise the component in, or a CSS selector for the root element
	 * @param {Object} opts [{}] - An options object for configuring the component
	 * @returns {(Expander|Array<Expander>)} - Expander instance(s)
	 */
	static init(rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-expander]')) {
			return new Expander(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-expander"]'), rootEl => new Expander(rootEl, opts));
	}

	/**
	 * Get the data attributes from the ExpanderElement. If the component is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} oExpanderElement - The component element in the DOM
	 * @returns {Object} - Data attributes as an object
	 * @access private
	 */
	static _getDataAttributes(oExpanderElement) {
		if (!(oExpanderElement instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(oExpanderElement.dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oExpander(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = oExpanderElement.dataset[key];
			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}
			return options;
		}, {});
	}
}

export default Expander;
