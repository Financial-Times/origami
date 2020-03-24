const className = 'o-banner';
const classNames = {
	closed: `${className}--closed`,
	outer: `${className}__outer`,
	inner: `${className}__inner`,
	content: `${className}__content`,
	longContent: `${className}__content--long`,
	shortContent: `${className}__content--short`,
	actions: `${className}__actions`,
	action: `${className}__action`,
	secondaryAction: `${className}__action--secondary`,
	button: `${className}__button`,
	link: `${className}__link`,
	close: `${className}__close`,
};

/**
 * Represents a banner.
 */
class Banner {

	/**
	 * Class constructor.
	 * @param {HTMLElement} [bannerElement] - The banner element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the banner
	 * @property {HTMLElement} bannerElement
	 */
	constructor (bannerElement, options) {
		this.bannerElement = bannerElement;
		// Default the options
		this.options = Object.assign({}, {
			autoOpen: true,
			suppressCloseButton: false,
			closeExistingBanners: true,
			appendTo: document.body,
			contentLong: '&hellip;',
			contentShort: null,
			buttonLabel: 'OK',
			buttonUrl: '#',
			formAction: null,
			formEncoding: 'application/x-www-form-urlencoded',
			formMethod: 'post',
			linkLabel: null,
			linkUrl: '#',
			closeButtonLabel: 'Close',
			theme: null,
			layout: null
		}, options || Banner.getOptionsFromDom(bannerElement));

		// Validate theme choice.
		if (this.options.theme && typeof this.options.theme !== 'string') {
			throw new Error(`"${this.options.theme}" must be a string.`);
		}

		// Validate layout choice.
		const validLayouts = ['small', 'compact'];
		const layout = this.options.layout;
		if (layout && !validLayouts.includes(layout)) {
			throw new Error(`"${layout}" is not a valid layout. Use one of ${validLayouts}.`);
		}

		// Find the element to append the banner to if configured.
		try {
			// Find by query selector.
			if (typeof this.options.appendTo === 'string') {
				this.options.appendTo = document.querySelector(this.options.appendTo);
			}
			// Confirm a html element has been given or found.
			if (this.options.appendTo instanceof HTMLElement !== true) {
				throw new Error('It is not an Node instance.');
			}
		} catch (error) {
			throw new Error(`Cound not find the element to append the banner to: ${error.message}`, this);
		}

		// Render the banner
		this.render();

		if (this.options.closeExistingBanners) {
			// There can be only one
			Banner._bannerInstances.forEach(banner => banner.close());
			Banner._bannerInstances = [this];
		} else {
			Banner._bannerInstances.push(this);
		}

		if (this.options.autoOpen) {
			this.open();
		} else {
			this.close();
		}
	}

	/**
	 * Render the banner.
	 */
	render () {
		if (!(this.bannerElement instanceof HTMLElement)) {
			// If the banner element is not an HTML Element, build one
			this.bannerElement = this.buildBannerElement();
			this.options.appendTo.appendChild(this.bannerElement);

		} else if (this.bannerElement.innerHTML.trim() === '') {
			// If the banner element is empty, we construct the banner
			this.bannerElement = this.buildBannerElement(this.bannerElement);

		} else if (!this.bannerElement.querySelector(`.${classNames.outer}`)) {
			// If the banner element is not empty and also does not contain an outer element,
			// we assume the element content is the banner content
			this.options.contentLong = this.bannerElement.innerHTML;
			this.options.contentShort = null;
			this.bannerElement = this.buildBannerElement(this.bannerElement);
		}

		// Select all the elements we need
		this.innerElement = this.bannerElement.querySelector('[data-o-banner-inner]');

		// Build the close button
		if (!this.options.suppressCloseButton) {
			this.closeButtonElement = this.buildCloseButtonElement();
			this.innerElement.appendChild(this.closeButtonElement);
		}
	}

	/**
	 * Open the banner.
	 */
	open () {
		this.bannerElement.classList.remove(classNames.closed);
		this.bannerElement.dispatchEvent(new CustomEvent('o.bannerOpened'));
	}

	/**
	 * Close the banner.
	 */
	close () {
		this.bannerElement.classList.add(classNames.closed);
		this.bannerElement.dispatchEvent(new CustomEvent('o.bannerClosed'));
	}

	/**
	 * Build a full banner element. This is used when no banner or a partial banner exists in the DOM.
	 * @param {HTMLElement} [bannerElement] - The banner element to build around
	 * @returns {HTMLElement} Returns the new banner element
	 */
	buildBannerElement (bannerElement) {
		bannerElement = bannerElement || document.createElement('div');
		bannerElement.innerHTML = '';
		bannerElement.classList.add(className);
		if (this.options.theme) {
			bannerElement.classList.add(`${className}--${this.options.theme}`);
		}
		if (this.options.layout) {
			bannerElement.classList.add(`${className}--${this.options.layout}`);
		}
		let contentHtml;
		if (this.options.contentShort) {
			contentHtml = `
				<div class="${classNames.content} ${classNames.longContent}">
					${this.options.contentLong}
				</div>
				<div class="${classNames.content} ${classNames.shortContent}">
					${this.options.contentShort}
				</div>
			`;
		} else {
			contentHtml = `
				<div class="${classNames.content}">
					${this.options.contentLong}
				</div>
			`;
		}
		let primaryActionHtml = '';
		if (this.options.formAction !== null && this.options.formAction !== undefined) {
			primaryActionHtml = `
				<form class="${classNames.action}" action="${this.options.formAction}" enctype="${this.options.formEncoding}" method="${this.options.formMethod}">
					<input class="${classNames.button}" type="submit" value="${this.options.buttonLabel}"/>
				</form>
			`;
		} else {
			primaryActionHtml = `
				<div class="${classNames.action}">
					<a href="${this.options.buttonUrl}" class="${classNames.button}">${this.options.buttonLabel}</a>
				</div>
			`;
		}
		let secondaryActionHtml = '';
		if (this.options.linkLabel) {
			secondaryActionHtml = `
				<div class="${classNames.action} ${classNames.secondaryAction}">
					<a href="${this.options.linkUrl}" class="${classNames.link}">${this.options.linkLabel}</a>
				</div>
			`;
		}
		bannerElement.innerHTML = `
			<div class="${classNames.outer}">
				<div class="${classNames.inner}" data-o-banner-inner="">
					${contentHtml}
					<div class="${classNames.actions}">
						${primaryActionHtml}
						${secondaryActionHtml}
					</div>
				</div>
			</div>
		`;
		return bannerElement;
	}

	/**
	 * Build a close button element.
	 * @returns {HTMLElement} Returns the new close button element
	 */
	buildCloseButtonElement () {
		const closeButton = document.createElement('button');
		closeButton.className = classNames.close;
		closeButton.setAttribute('aria-label', this.options.closeButtonLabel);
		closeButton.setAttribute('title', this.options.closeButtonLabel);

		// Add event listeners
		closeButton.addEventListener('click', event => {
			this.close();
			event.preventDefault();
		});

		return closeButton;
	}

	/**
	 * Get the data attributes from the bannerElement. If the banner is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} bannerElement - The banner element in the DOM
	 */
	static getOptionsFromDom (bannerElement) {
		if (!(bannerElement instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(bannerElement.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oBanner(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = bannerElement.dataset[key];

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
	 * Initialise banner components.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise banners in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the banners
	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}

		// If the rootElement isnt an HTMLElement, treat it as a selector
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}

		// If the rootElement is an HTMLElement (ie it was found in the document anywhere)
		// AND the rootElement has the data-o-component=o-banner then initialise just 1 banner (this one)
		if (rootElement instanceof HTMLElement && /\bo-banner\b/.test(rootElement.getAttribute('data-o-component'))) {
			return new Banner(rootElement, options);
		}

		// If the rootElement wasn't itself a banner, then find ALL of the child things that have the data-o-component=oBanner set
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-banner"]'), rootElement => new Banner(rootElement, options));
	}

}

Banner._bannerInstances = [];

// Exports
export default Banner;
