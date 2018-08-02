
/**
 * Represents a linked component heading.
 * @public
 */
class LinkedHeading {

	/**
	 * Class constructor.
	 * @public
	 * @param {HTMLElement} headingElement - The heading element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the linked heading
	 * @param {String} [options.baseClass="o-layout__linked-heading"] - The class attribute to add to the created link
	 * @param {String} [options.content="¶"] - The content to add to the created link
	 * @param {String} [options.title="Link directly to this section of the page"] - The title attribute to add to the created link
	 */
	constructor (headingElement, options = {}) {
		this.headingElement = headingElement;
		this.id = headingElement.getAttribute('id');

		this.options = Object.assign({}, {
			baseClass: 'o-layout__linked-heading',
			content: '¶',
			title: 'Link directly to this section of the page'
		}, options);

		this.linkElement = this.constructLinkElement();
	}

	/**
	 * Construct the heading link element.
	 * @private
	 * @returns {HTMLElement} Returns the new link element
	 */
	constructLinkElement () {
		if (!this.id) {
			return null;
		}
		const headingText = this.headingElement.innerHTML.trim();
		this.headingElement.classList.add(this.options.baseClass);
		this.headingElement.innerHTML = `
			<a href="#${this.id}" title="${this.options.title}" class="${this.options.baseClass}__link">
				${headingText}
				<span class="${this.options.baseClass}__label">${this.options.content}</span>
			</a>
		`;
		return this.headingElement.querySelector(`.${this.options.baseClass}__link`);
	}

	/**
	 * Initialise linked heading components.
	 * @public
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise filter forms in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the linked heading. See {@link LinkedHeading#constructor}
	 * @returns {(LinkedHeading|LinkedHeading[])} Returns the new linked heading component or an array of linked heading components
	 */
	static init (rootElement, options = {}) {
		if (!rootElement) {
			rootElement = document.body;
		}

		// If the rootElement isnt an HTMLElement, treat it as a selector
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}

		// If the rootElement is an HTMLElement (ie it was found in the document anywhere)
		// AND the rootElement has the data-o-component=o-linked-heading then initialise just 1 heading (this one)
		if (rootElement instanceof HTMLElement && /\bo-linked-heading\b/.test(rootElement.getAttribute('data-o-component'))) {
			return new LinkedHeading(rootElement, options);
		}

		// If the rootElement wasn't itself a heading, then find ALL of the child things that have the data-o-component=oLinkedHeading set
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-linked-heading"]'), rootElement => new LinkedHeading(rootElement, options));
	}

}

// Exports
export default LinkedHeading;
