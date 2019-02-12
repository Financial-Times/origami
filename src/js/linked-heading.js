
/**
 * Represents a linked heading.
 * @public
 */
class LinkedHeading {

	/**
	 * Class constructor.
	 * @public
	 * @param {HTMLElement} headingElement - The heading element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the linked heading
	 * @param {String} [options.content="¶"] - The content to add to the created link
	 * @param {String} [options.title="Link directly to this section of the page"] - The title attribute to add to the created link
	 */
	constructor (headingElement, options = {}) {
		this.headingElement = headingElement;
		this.id = headingElement.getAttribute('id');

		this.options = Object.assign({}, {
			content: '#',
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

		// Create heading anchor.
		const headingText = this.headingElement.innerHTML.trim();
		const anchor = document.createElement("a");
		anchor.href = `#${this.id}`;
		anchor.title = this.options.title;
		anchor.classList.add('o-layout__linked-heading__link');
		anchor.innerHTML = `
			<span class="o-layout__linked-heading__content">${headingText}</span>
			<span class="o-layout__linked-heading__label">${this.options.content}</span>
		`;

		window.requestAnimationFrame(function () {
			this.headingElement.innerHTML = '';
			this.headingElement.classList.add('o-layout__linked-heading');
			this.headingElement.appendChild(anchor);
		}.bind(this));

		return anchor;
	}

}

// Exports
export default LinkedHeading;
