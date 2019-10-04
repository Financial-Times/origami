import DomDelegate from 'ftdomdelegate';

const socialUrls = {
	twitter: "https://twitter.com/intent/tweet?url={{url}}&text={{title}}&related={{relatedTwitterAccounts}}&via=FT",
	facebook: "http://www.facebook.com/sharer.php?u={{url}}",
	linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}+%7C+{{titleExtra}}&summary={{summary}}&source=Financial+Times",
	pinterest: "http://www.pinterest.com/pin/create/button/?url={{url}}&description={{title}}",
	whatsapp: "whatsapp://send?text={{title}}%20({{titleExtra}})%20-%20{{url}}",
	link: "{{url}}"
};

/**
 * The `oShare.open` open event fires when a social network share action is
 * triggered, to open a new window.
 *
 * @event "oShare.open"
 * @type {object}
 * @property {boolean} share - The o-share instance.
 * @property {boolean} action - The kind of share i.e. "social".
 * @property {boolean} url - The social share url opened.
 */

/**
 * The `oShare.ready` fires when a o-share instance has been initialised.
 *
 * @event "oShare.ready"
 * @type {object}
 * @property {boolean} share - The initialised o-share instance.
 */

/**
  * @class Share
  *
  * @param {(HTMLElement|string)} rootEl [el=document.body] - Element where to search for an o-share component. You can pass an HTMLElement or a selector string
  * @param {Object} config - Optional
  * @param {string} config.url - Optional, url to share
  * @param {string} config.title - Optional, title to be used in social network sharing
  * @param {string} config.titleExtra - Optional, extra bit to add to the title for some social networks
  * @param {string} config.summary - Optional, summary of the page that's being shared
  * @param {string} config.relatedTwitterAccounts - Optional, extra information for sharing on Twitter
  * @param {Object[]} config.links - Optional, array of strings of supported social network names that you want rendered
  */
function Share(rootEl, config) {
	const oShare = this;
	const openWindows = {};

	/**
	  * Helper function to dispatch namespaced events, namespace defaults to oShare
	  *
	  * @private
	  */
	function dispatchCustomEvent(event, data = {}, namespace = 'oShare') {
		oShare.rootEl.dispatchEvent(new CustomEvent(namespace + '.' + event, {
			detail: data,
			bubbles: true
		}));
	}

	/**
	  * Click event handler that checks the event target is an o-share action
	  *
	  * @param {Event} ev - The event to handle
	  * @return {undefined}
	  * @private
	  */
	function handleClick(ev) {
		const actionEl = ev.target.closest('li.o-share__action');

		if (oShare.rootEl.contains(actionEl) && actionEl.querySelector('a[href]')) {
			ev.preventDefault();
			ev.stopPropagation();

			const url = actionEl.querySelector('a[href]').href;

			dispatchCustomEvent('event', {
				category: 'share',
				action: 'click',
				button: actionEl.textContent.trim().toLowerCase()
			}, 'oTracking');

			shareSocial(url);
		}
	}

	/**
	  * Event handler for social network actions. Opens up a new window for that social network and dispatched the 'oShare.open' event
	  *
	  * @private
	  * @param {string} url - URL to be loaded in the new window
	  * @returns {undefined}
	  * @fires "oShare.open"
	  */
	function shareSocial(url) {
		if (url) {
			if (openWindows[url] && !openWindows[url].closed) {
				openWindows[url].focus();
			} else {
				openWindows[url] = window.open(url, '', 'width=646,height=436');
				openWindows[url].opener = null;
			}

			dispatchCustomEvent('open', {
				share: oShare,
				action: "social",
				url: url
			});
		}
	}

	/**
	  * Transforms the default social urls
	  *
	  * @private
	  * @param {string} socialNetwork - Name of the social network that we support (e.g. twitter, facebook, linkedin, pinterest)
	  * @returns {string}
	  */
	function generateSocialUrl(socialNetwork) {
		let templateUrl = socialUrls[socialNetwork];
		templateUrl = templateUrl.replace('{{url}}', config.url)
			.replace('{{title}}', encodeURIComponent(config.title))
			.replace('{{titleExtra}}', encodeURIComponent(config.titleExtra))
			.replace('{{summary}}', encodeURIComponent(config.summary))
			.replace('{{relatedTwitterAccounts}}', encodeURIComponent(config.relatedTwitterAccounts));
		return templateUrl;
	}

	/**
	  * Renders the list of social networks in {@link config.links}
	  *
	  * @returns {undefined}
	  * @private
	  */
	function render() {
		normaliseConfig();

		const ulElement = document.createElement('ul');
		for (let i = 0; i < config.links.length; i++) {
			const liElement = document.createElement('li');
			const spanElement = document.createElement('span');
			const aElement = document.createElement('a');

			liElement.classList.add('o-share__action', `o-share__action--${config.links[i]}`);
			spanElement.classList.add('o-share__text');
			aElement.classList.add('o-share__icon', `o-share__icon--${config.links[i]}`);
			aElement.href = generateSocialUrl(config.links[i]);

			aElement.appendChild(spanElement);
			liElement.appendChild(aElement);
			ulElement.appendChild(liElement);
		}
		oShare.rootEl.appendChild(ulElement);
	}

	/**
	  * Normalises any data in the configuration, converting relative URLs to ready-to-share
	  * absolute versions
	  *
	  * @return {undefined}
	  * @private
	  */
	function normaliseConfig() {
		const link = document.createElement('a');
		link.href = config.url;
		config.url = link.protocol + '//' + link.host + link.pathname + link.search + link.hash;
	}

	/**
	  * Initialises the Share class, rendering the o-share element if it's empty with {@link config} options,
	  * or from corresponding data attributes and sets up dom-delegates.
	  * Dispatches 'oShare.ready' at the end
	  *
	  * @return {undefined}
	  * @fires "oShare.ready"
	  */
	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		const rootDelegate = new DomDelegate(rootEl);
		rootDelegate.on('click', handleClick);
		rootEl.setAttribute('data-o-share--js', '');

		oShare.rootDomDelegate = rootDelegate;
		oShare.rootEl = rootEl;

		if (rootEl.children.length === 0) {
			if (!config) {
				config = {};
				config.links = rootEl.hasAttribute('data-o-share-links') ?
					rootEl.getAttribute('data-o-share-links').split(' ') : [];
				config.url = rootEl.getAttribute('data-o-share-url') || '';
				config.title = rootEl.getAttribute('data-o-share-title') || '';
				config.titleExtra = rootEl.getAttribute('data-o-share-titleExtra') || '';
				config.summary = rootEl.getAttribute('data-o-share-summary') || '';
				config.relatedTwitterAccounts = rootEl.getAttribute('data-o-share-relatedTwitterAccounts') || '';
			}
			render();
		}

		dispatchCustomEvent('ready', {
			share: oShare
		});
	}

	init();
}

/**
  * Destroys the Share instance, disables dom-delegates
  *
  * @return {undefined}
  */
Share.prototype.destroy = function () {
	this.rootDomDelegate.destroy();
	// Should destroy remove its children? Maybe setting .innerHTML to '' is faster
	for (let i = 0; i < this.rootEl.children; i++) {
		this.rootEl.removeChild(this.rootEl.children[i]);
	}

	this.rootEl.removeAttribute('data-o-share--js');
	this.rootEl = undefined;
};

/**
  * Initialises all o-share components inside the element passed as the first parameter
  *
  * @param {(HTMLElement|string)} rootEl [el=document.body] - Element where to search for o-share components. You can pass an HTMLElement or a selector string
  * @returns {Array} - An array of Share instances
  */
Share.init = function (rootEl = document.body) {
	if (!(rootEl instanceof HTMLElement)) {
		rootEl = document.querySelector(rootEl);
	}
	if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-share]')) {
		return new Share(rootEl);
	}
	return Array.from(rootEl.querySelectorAll('[data-o-component=o-share]'), rootEl => new Share(rootEl));
};

export default Share;
