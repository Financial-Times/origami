import LinkedHeading from './linked-heading.js';

class Layout {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [layoutEl] - The layout element in the DOM
	 * @param {Object} [options={}] - An options object for configuring aspects of the layout
	 */
	constructor(layoutEl, options) {
		this.layoutEl = layoutEl;
		this.highlightedHeadingIndex = 0;

		const isDocsLayout = this.layoutEl.classList.contains('o-layout--docs');
		const isQueryLayout = this.layoutEl.classList.contains('o-layout--query');

		this.options = Object.assign({}, {
			constructNav: isDocsLayout ? true : false,
			navHeadingSelector: 'h1, h2, h3',
			linkHeadings: true,
			linkedHeadingSelector: 'h1, h2, h3, h4, h5, h6',
		}, options || Layout.getDataAttributes(layoutEl));

		// Get linkable headings.
		const linkableHeadings = Array.from(this.layoutEl.querySelectorAll(this.options.linkedHeadingSelector))
			.filter(heading => heading.getAttribute('id'));

		// Construct linkable headings.
		this.linkedHeadings = [];
		if (this.options.linkHeadings) {
			this.linkedHeadings = linkableHeadings.map(heading => new LinkedHeading(heading, {}));
		}

		// Get nav headings.
		this.navHeadings = Array.from(this.layoutEl.querySelectorAll(this.options.navHeadingSelector))
			.filter(heading => heading.getAttribute('id'));

		// Construct the default navigation.
		if ((isDocsLayout || isQueryLayout) && this.options.constructNav) {
			this.constructNavFromDOM();
		}

		// Or highlight a custom navigation.
		if ((isDocsLayout || isQueryLayout) && !this.options.constructNav) {
			const navigation = this.layoutEl.querySelector(`.o-layout__navigation`);
			if (navigation) {
				this.highlightNavItems();
			}
		}
	}

	/**
	 * Get the heading content.
	 * @param {Element} heading
	 * @access private
	 */
	static _getContentFromHeading(heading) {
		const contentElement = heading.querySelector(`.o-layout__linked-heading__content`);
		const headingText = contentElement ? contentElement.textContent : heading.textContent;
		return headingText;
	}

	/**
	 * Construct the sidebar navigation from headings within the DOM.
	 */
	constructNavFromDOM () {
		// Get an array of headings. If there are h2 headings followed by h3 headings (or lower),
		// add a property `subItems` to the parent h2 which contains an array of the following smaller headings.
		const headingsWithHierarchy = Array.from(this.navHeadings).reduce((headings, heading) => {
			const supportedHeadings = ['H3', 'H4', 'H5', 'H6'];
			const parents = headings.filter(heading => heading.nodeName === 'H2');
			const parent = parents ? parents[parents.length - 1] : null;
			if (!headings.length) {
				return [heading];
			}
			if (parent && supportedHeadings.includes(heading.nodeName)) {
				parent.subItems = parent.subItems ? [...parent.subItems, heading] : [heading];
				return headings;
			}
			headings.push(heading);
			return headings;
		}, []);

		// Create the nav markup.
		const nav = document.createElement('nav');
		nav.classList.add(`o-layout__navigation`);
		const list = document.createElement('ol');
		list.classList.add(`o-layout__unstyled-element`);
		const listInnerHTML = Array.from(headingsWithHierarchy).reduce((html, heading) => {
			const pageTitleClass = heading.nodeName === 'H1' ? 'o-layout__navigation-title' : '';
			return html + `
<li class="o-layout__unstyled-element ${pageTitleClass}">
	<a class="o-layout__unstyled-element" href='#${heading.id}'>${Layout._getContentFromHeading(heading)}</a>
	${heading.subItems ? `
	<ol>
	${heading.subItems.reduce((html, heading) => {
		return html + `<li><a class="o-layout__unstyled-element" href="#${heading.id}">${Layout._getContentFromHeading(heading)}</a></li>`;
	}, '')}
	</ol>
	` : ''}
</li>`;
		}, '');
		list.innerHTML = listInnerHTML;
		nav.appendChild(list);

		// Add the nav to the page.
		const sidebar = this.layoutEl.querySelector(`.o-layout__sidebar`) || this.layoutEl.querySelector(`.o-layout__query-sidebar`);
		if (sidebar) {
			window.requestAnimationFrame(() => {
				sidebar.append(nav);
			});
		}

		/** @type {Array<HTMLAnchorElement>} */
		this.navAnchors = Array.from(nav.querySelectorAll('a'));
		this.highlightNavItems();
	}

	/**
	 * Add aria-current to the navigation link that was clicked
	 * @private
	 * @returns {void}
	 */
	setupClickHandlersForNavigationSidebar() {
		this.navAnchors.forEach((anchor, index) => {
			anchor.addEventListener('click', () => {
				for (const sidebarAnchor of this.navAnchors) {
					if (sidebarAnchor === anchor) {
						sidebarAnchor.setAttribute('aria-current', 'location');
						this.highlightedHeadingIndex = index;
					} else {
						sidebarAnchor.setAttribute('aria-current', 'false');
					}
				}
			});
		});
	}

	/**
	 * Add aria-current to the correspoding link in the navigation for the header that was clicked
	 * @private
	 * @returns {void}
	 */
	setupClickHandlersForHeadings() {
		this.navHeadings.forEach((anchor, index) => {
			anchor.addEventListener('click', () => {
				for (const sidebarAnchor of this.navAnchors) {
					if (sidebarAnchor.hash === '#' + anchor.id) {
						sidebarAnchor.setAttribute('aria-current', 'location');
						this.highlightedHeadingIndex = index;
					} else {
						sidebarAnchor.setAttribute('aria-current', 'false');
					}
				}
			});
		});
	}

	/**
	 * Add aria-current to the correspoding link in the navigation for the hash in the url if one exists
	 * @private
	 * @returns {void}
	 */
	highlightNavigationFromLocation() {
		if (location.hash) {
			// on page load, highlight the nav item that corresponds to the url
			this.navAnchors.forEach((anchor, index) => {
				const currentLocation = anchor.hash === location.hash;
				const defaultLocation = location.hash === '' && index === 0;
				if (currentLocation || defaultLocation) {
					anchor.setAttribute('aria-current', 'location');
					this.highlightedHeadingIndex = index;
				} else {
					anchor.setAttribute('aria-current', 'false');
				}
			});
		}
	}

	/**
	 * Add aria-current to the correspoding link in the navigation for the header that we think
	 * should be highlighted based on scroll position
	 * @private
	 * @returns {void}
	 */
	 setupIntersectionObserversForHeadings() {
		function getY(domRect) {
			return Object.prototype.hasOwnProperty.call(domRect, 'y')
				? domRect.y
				: domRect.top;
		}

		const mainSection = document.querySelector('.o-layout__main ');
		let headingFontSize = '16px';
		if (mainSection) {
			headingFontSize = window.getComputedStyle(mainSection).fontSize;
		}

		const observer = new IntersectionObserver(
			entries => {
				let headingIndexToHighlight = this.highlightedHeadingIndex;

				// Record index of which headings are above or below the intersection target
				const above = [];
				const below = [];
				entries.forEach(entry => {
					const intersectingElemIdx = this.navHeadings.findIndex(
						navheading => navheading === entry.target
					);
					const isAbove =
						getY(entry.boundingClientRect) < (getY(entry.rootBounds || {}) || 0);
					if (isAbove) {
						above.push(intersectingElemIdx);
					} else {
						below.push(intersectingElemIdx);
					}
				});

				// If there are headings above the intersection target,
				// set the active heading as the last one which is above the intersection target
				if (above.length > 0) {
					// Find the last heading index which is above the intersection target
					headingIndexToHighlight = Math.max(...above);
				} else if (below.length > 0) {
					// Find the first heading index which is below the intersection target
					const minIndex = Math.min(...below);
					if (minIndex <= this.highlightedHeadingIndex) {
						// If there are no headings above  the intersection target and the current
						// active heading is later down the page then use the first heading which is below
						headingIndexToHighlight = minIndex - 1 >= 0 ? minIndex - 1 : 0;
					}
				}
				this.navAnchors.forEach((anchor, index) => {
					if (headingIndexToHighlight === index) {
						anchor.setAttribute('aria-current', 'location');
					} else {
						anchor.setAttribute('aria-current', 'false');
					}
				});
				this.highlightedHeadingIndex = headingIndexToHighlight;
			}, {
				rootMargin: `-${
					headingFontSize
				} 0px 0px 0px`,
				threshold: 0.1,
			}
		);
		this.navHeadings.forEach(heading => {
			observer.observe(heading);
		});

		// When we reach the bottom we want to set the last heading as the current active heading
		const observerbottom = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting === true) {
				this.highlightedHeadingIndex = this.navAnchors.length - 1;
				this.navAnchors.forEach((anchor, index) => {
					if (this.highlightedHeadingIndex === index) {
						anchor.setAttribute('aria-current', 'location');
					} else {
						anchor.setAttribute('aria-current', 'false');
					}
				});
			}
		}, {
			threshold: 1, // Trigger only when whole element was visible
		});

		const lastElementOnPage = this.layoutEl.querySelector('.o-layout__footer') || this.layoutEl.querySelector('.o-layout__main').lastElementChild;
		observerbottom.observe(lastElementOnPage);
	}

	/**
	 * Enables navigation item highlighting based on scroll position.
	 * Relies on heading ids and anchor href being the same.
	 * @returns {void}
	 */
	highlightNavItems() {
		this.setupClickHandlersForNavigationSidebar();
		this.setupClickHandlersForHeadings();
		this.highlightNavigationFromLocation();
		this.setupIntersectionObserversForHeadings();
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
	 * @param {(HTMLElement|String)} rootEl - The root element to intialise the layout in, or a CSS selector for the root element
	 * @param {Object} [opts={}] - An options object for configuring layout behaviour.
	 * @returns {Layout | Layout[]} Returns either a single Layout instance or an array of Layout instances
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
