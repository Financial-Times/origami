class Example {
	/**
		* Class constructor.
		* @param {HTMLElement} [exampleEl] - The component element in the DOM
		* @param {Object} [options={}] - An options object for configuring the component
		*/
	constructor (exampleEl, options) {
		this.exampleEl = exampleEl;
		this.options = Object.assign({}, {
			highCount: 10
		}, options || Example.getDataAttributes(exampleEl));
		// A property to store the current count.
		this.count = 0;
		// Listen to all click events on the o-example instance.
	  this.exampleEl.addEventListener('click', this);
		// Set a data attribute so we know the component is initiated successfully.
		// The attribute may be used in CSS to style our component conditionally.
		this.exampleEl.setAttribute('data-o-example-js', '');
	}

	/**
		 * A method to handle event listeners.
		 * https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
		 * https://dom.spec.whatwg.org/#dom-eventlistener-handleevent
		 * @param {Event} event - The browser event which was triggered.
		 * @returns {void}
		 */
	handleEvent(event) {
		// When any button within the `o-example` component is clicked
		// increment the count.
		if (event.target.tagName === 'BUTTON') {
			this.count++;
			// Get all the elements within o-example with
			// the attribute data-o-example-current-count.
			const countElements = this.exampleEl.querySelectorAll('[data-o-example-current-count]');
			 // For each count element found, update the count.
			// If the count is equal to or above the high count display a message instead.
			const countText = this.count < this.options.highCount ?
				this.count :
				'lots and lots of';
			countElements.forEach(e => e.innerText = countText);
		}
	}

	/**
		* Get the data attributes from the ExampleElement. If the element is being set up
		* declaratively, this method is used to extract the data attributes from the DOM.
		* @param {HTMLElement} exampleEl - The component element in the DOM
		* @returns {Object} An options object which can be used for configuring the component
		*/
	static getDataAttributes (exampleEl) {
		if (!(exampleEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(exampleEl.dataset).reduce((options, key) => {
			// Ignore keys which are not in the component's namespace
			if (!key.match(/^oExample(\w)(\w+)$/)) {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oExample(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = exampleEl.dataset[key];
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
		* Initialise o-example component/s.
		* @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
		* @param {Object} [options={}] - An options object for configuring the component
		* @returns {Example|Example[]} The newly constructed Example components
		*/
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=o-example]')) {
			return new Example(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-example"]'), rootEl => new Example(rootEl, options));
	}
}

export default Example;
