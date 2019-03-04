import { throttle } from 'o-utils';
import LinkedHeading from './linked-heading';

class Layout {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [layoutElement] - The layout element in the DOM
	 * @param {Object} [options={}] - An options object for configuring aspects of the layout
	 */
	constructor (layoutEl, options) {
		this.layoutEl = layoutEl;

		const isDocsLayout = this.layoutEl.classList.contains('o-layout--docs');
		const isQueryLayout = this.layoutEl.classList.contains('o-layout--query');

		this.options = Object.assign({}, {
			constructNav: (isDocsLayout ? true : false),
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
				this.highlightNavItems(navigation);
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
		const headingText = (contentElement ? contentElement.textContent : heading.textContent);
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
		let nav = document.createElement('nav');
		nav.classList.add(`o-layout__navigation`);
		let list = document.createElement('ol');
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

		this.highlightNavItems(nav);
	}

	/**
	* Enables navigation item highlighting based on scroll position.
	* Relies on heading ids and anchor href being the same.
	* @param {HTMLElement} [navigation] - the sidebar navigation list in the DOM
	*/
	highlightNavItems(navigation) {
		const navAnchors = navigation.querySelectorAll('A');

		//on page load, highlight the nav item that corresponds to the url
		navAnchors.forEach((anchor, index) => {
			if (location.hash === '' && index === 0) {
				anchor.setAttribute('aria-current', 'location');
			} else if (anchor.hash === location.hash) {
				anchor.setAttribute('aria-current', 'location');
			}
		});

		//highlight nav item that has been clicked on
		navAnchors.forEach(anchor => {
			anchor.addEventListener('click', () => {
				navAnchors.forEach(anchor => anchor.setAttribute('aria-current', false));
				anchor.setAttribute('aria-current', 'location');
			});
		});

		//on scroll, update current location in nav if we haven't scrolled to the bottom of the page
		document.addEventListener('scroll', throttle(function () {
			if (window.innerHeight + window.pageYOffset >= document.body.scrollHeight) {
				return;
			}
			window.requestAnimationFrame(() => {
				const currentHeadingBuffer = window.innerHeight * 0.166; // 1/6th of the viewport
				const headingsScrolledPast = this.navHeadings.filter(
					heading => heading.getBoundingClientRect().y <= currentHeadingBuffer
				);
				const currentHeading = (headingsScrolledPast.length ? headingsScrolledPast[headingsScrolledPast.length - 1] : null);
				navAnchors.forEach(anchor => {
					const current = currentHeading && `#${currentHeading.id}` === anchor.hash;
					anchor.setAttribute('aria-current', (current ? 'location' : false));
				});
			});
		}.bind(this), 300));
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
