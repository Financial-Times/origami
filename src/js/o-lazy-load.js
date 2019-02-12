const defaults = {
	selector: '.o-lazy-load'
};

const flag = 'data-o-lazy-load';

function loadContent (element) {
	if (element.nodeName.toLowerCase() === 'picture') {
		// NOTE: element.children returns a live HTMLCollection
		// but element.childNodes includes non-element children
		Array.from(element.children).forEach(loadContent);
	}

	if (element.hasAttribute('data-src')) {
		element.src = element.getAttribute('data-src');
		element.removeAttribute('data-src');
	}

	if (element.hasAttribute('data-srcset')) {
		element.srcset = element.getAttribute('data-srcset');
		element.removeAttribute('data-srcset');
	}

	if (element.hasAttribute('data-toggle-class')) {
		element.classList.toggle(element.getAttribute('data-toggle-class'));
		element.removeAttribute('data-toggle-class');
	}

	element.setAttribute(flag, true);
}

function isLoaded (element) {
	return element.hasAttribute(flag);
}

function callback (entries, observer) {
	// NOTE: when an intersection observer is created this callback will be called with
	// all items being observed so the threshold must be checked.
	const threshold = observer.thresholds[0];

	entries.forEach((entry) => {
		if (entry.isIntersecting && entry.intersectionRatio >= threshold) {
			const target = entry.target;

			observer.unobserve(target);

			if (!isLoaded(target)) {
				loadContent(target);

				if (typeof this.options.callback === 'function') {
					this.options.callback(target);
				}
			}
		}
	});
}

class LazyLoad {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [rootEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (rootEl, opts) {
		this.rootEl = rootEl;
		this.options = Object.assign({}, defaults, opts, LazyLoad.getDataAttributes(rootEl));

		// Assume if the rootEl is the document element or body that the user intends to
		// observe the viewport. The spec calls this "the top-level browsing context"
		// <https://www.w3.org/TR/intersection-observer/#intersectionobserver-implicit-root>
		if (rootEl === document.documentElement || rootEl === document.body) {
			this.options.root = null;
		} else {
			this.options.root = rootEl;
		}

		this.observer = new IntersectionObserver(callback.bind(this), this.options);
		this.observe();
	}

	observe () {
		const targets = this.rootEl.querySelectorAll(this.options.selector);

		targets.forEach((target) => {
			if (!isLoaded(target)) {
				this.observer.observe(target);
			}
		});
	}

	/**
	 * Get the data attributes from the ${name.titleCase}Element. If the message is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} rootEl - The component element in the DOM
	 */
	static getDataAttributes (rootEl) {
		if (!(rootEl instanceof HTMLElement)) {
			return {};
		}

		return Object.keys(rootEl.dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oLazyLoad(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = rootEl.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}
			return options;
		}, {});
	}

	/**
	 * Initialise component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}

		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component="o-lazy-load"]')) {
			return new LazyLoad(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-lazy-load"]'), (rootEl) => new LazyLoad(rootEl, opts));
	}
}

export default LazyLoad;
