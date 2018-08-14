const defaults = {
	selector: '.o-lazy-load'
};

const flag = 'data-o-lazy-load';

function loadContent (element) {
	if (element.nodeName.toLowerCase() === 'picture') {
		const img = document.createElement('img');
		img.alt = element.getAttribute('data-alt');
		element.appendChild(img);
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
	entries.forEach((entry) => {
		if (entry.intersectionRatio > 0) {
			const target = entry.target;

			observer.unobserve(target);

			if (!isLoaded(target)) {
				loadContent(target);

				if (typeof this.options.callback === 'function') {
					callback(target);
				}
			}
		}
	});
}

class OLazyLoad {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [rootEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (rootEl, opts) {
		this.rootEl = rootEl;
		this.options = Object.assign({}, defaults, opts);

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
			return new OLazyLoad(rootEl, opts);
		}

		return Array.from(rootEl.querySelectorAll('[data-o-component="o-lazy-load"]'), (rootEl) => new OLazyLoad(rootEl, opts));
	}
}

export default OLazyLoad;
