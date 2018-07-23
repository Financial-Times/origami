class Layout {
	/**
 * Class constructor.
 * @param {HTMLElement} [layoutElement] - The layout element in the DOM
 * @param {Object} [options={}] - An options object for configuring aspects of the layout
 */
	constructor (layoutEl, options) {
		this.layoutEl = layoutEl;

		//Default options
		this.options = Object.assign({}, {
			baseClass: 'o-layout',
			constructNav: true
		}, options || Layout.getDataAttributes(layoutEl));

		this.headings = [...document.querySelectorAll('h2, h3')]
			.filter(heading => heading.getAttribute('id'));

		if (this.options.constructNav) {
			this.constructNavFromDOM();
		} else {
			let navigation = document.querySelector(`.${this.options.baseClass}__navigation`);
			if (navigation) {
				this.highlightNavItems(navigation);
			}
		}
	}

	/**
	 * Construct the sidebar navigation from headings within the DOM.
	 */
	constructNavFromDOM () {
		let listItems = Array.from(this.headings, (heading) => {
			return `<li><a href='#${heading.id}'>${heading.innerText}</a></li>`;
		});

		let list = document.createElement('ol');
		list.classList.add(`${this.options.baseClass}__navigation`);
		list.innerHTML = listItems.join('');

		document.querySelector(`.${this.options.baseClass}__sidebar`).append(list);

		this.highlightNavItems(list);
	}

	/**
	* Enables navigation item highlighting based on scroll position.
	* Relies on heading ids and anchor href being the same.
	* @param {HTMLElement} [navigation] - the sidebar navigation list in the DOM
	*/
	highlightNavItems(navigation) {
		let currentLocation;
		let navAnchors = navigation.querySelectorAll('A');

		navAnchors.forEach((anchor, index) => {
			if (location.hash === '' && index === 0) {
				anchor.setAttribute('aria-current', 'location');
			} else if (anchor.hash === location.hash) {
				anchor.setAttribute('aria-current', 'location');
			}
		});

		//on scroll, update current location in nav
		document.addEventListener('scroll', () => {
			let bufferedPageTop = window.pageYOffset + window.innerHeight / 6;
			let possibleLocation;

			this.headings.forEach(heading => {
				if (heading.offsetTop <= bufferedPageTop) {
					possibleLocation = `#${heading.id}`;
				} else {
					return false;
				}

				if (possibleLocation && possibleLocation !== currentLocation) {
					navAnchors.forEach(anchor => {
						if (anchor.hash === possibleLocation) {
							anchor.setAttribute('aria-current', 'location');
						} else {
							anchor.setAttribute('aria-current', false);
						}

						currentLocation = possibleLocation;
					});
				} else if (!possibleLocation) {
					navAnchors.forEach(anchor => anchor.setAttribute('aria-current', false));
				}
			});
		});
	}

	/**
	 * Get the data attributes from the layoutEl. If the layout is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} layoutElement - The layout element in the DOM
	 */
	static getDataAttributes (layoutElement) {
		if (!(layoutElement instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(layoutElement.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oLayout(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = layoutElement.dataset[key];

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
	 * Initialise layout component.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the layout in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring layout behaviour.
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-layout]')) {
			return new Layout(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-layout"]'), rootEl => new Layout(rootEl, opts));
	}
}

export default Layout;
