/**global require,module*/

const DomDelegate = require('ftdomdelegate');
const TextCopyHelper = require('./TextCopyHelper');

const socialUrls = {
	twitter: "https://twitter.com/intent/tweet?url={{url}}&text={{title}}&related={{relatedTwitterAccounts}}&via=FT",
	facebook: "http://www.facebook.com/sharer.php?u={{url}}&t={{title}}+%7C+{{titleExtra}}",
	linkedin: "http://www.linkedin.com/shareArticle?mini=true&url={{url}}&title={{title}}+%7C+{{titleExtra}}&summary={{summary}}&source=Financial+Times",
	googleplus: "https://plus.google.com/share?url={{url}}",
	pinterest: "http://www.pinterest.com/pin/create/button/?url={{url}}&description={{title}}",
	whatsapp: "whatsapp://send?text={{title}}%20({{titleExtra}})%20-%20{{url}}",
	link: "{{url}}"
};

/**
  * @class Share
  *
  * @param {(HTMLElement|string)} [el=document.body] - Element where to search for an o-share component. You can pass an HTMLElement or a selector string
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
	  * Click event handler that checks the event target is an o-share action, and acts depending on if it's a social network or a link
	  *
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

			if (actionEl.classList.contains('o-share__action--link')) {
				copyLink(url, actionEl);
			} else {
				shareSocial(url);
			}
		}
	}

	/**
	  * Event handler for the link element. Sets up a {@link TextCopyHelper} and dispatches the 'oShare.open' event
	  *
	  * @private
	  * @param {string} url - URL to be copied
	  * @param {HTMLElement} parentEl - List element that will contain the {@link TextCopyHelper}
	  */
	function copyLink(url, parentEl) {
		if (!url || !parentEl || parentEl.hasAttribute("aria-selected")) {
			return;
		}
		parentEl.setAttribute('aria-selected', 'true');

		new TextCopyHelper({
			message: "Copy this link for sharing",
			text: url,
			parentEl: parentEl,
			onCopy: function() {
				dispatchCustomEvent('copy', {
					share: oShare,
					action: "url",
					url: url
				});
			},
			onDestroy: function() {
				parentEl.removeAttribute('aria-selected');
			}
		});

		dispatchCustomEvent('open', {
			share: oShare,
			action: "url",
			url: url
		});
	}

	/**
	  * Event handler for social network actions. Opens up a new window for that social network and dispatched the 'oShare.open' event
	  *
	  * @private
	  * @param {string} url - URL to be loaded in the new window
	  */
	function shareSocial(url) {
		if (url) {
			if (openWindows[url] && !openWindows[url].closed) {
				openWindows[url].focus();
			} else {
				openWindows[url] = window.open(url, '', 'width=646,height=436');
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
	  * @param {string} socialNetwork - Name of the social network that we support (twitter, facebook, linkedin, googleplus, reddit, pinterest, url)
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
	  * @private
	  */
	function render() {
		normaliseConfig();

		const ulElement = document.createElement('ul');
		for (let i = 0; i < config.links.length; i++) {
			const liElement = document.createElement('li');
			liElement.classList.add('o-share__action', 'o-share__action--'+config.links[i]);
			const aElement = document.createElement('a');
			aElement.href = generateSocialUrl(config.links[i]);
			aElement.appendChild(document.createElement('i'));
			liElement.appendChild(aElement);
			ulElement.appendChild(liElement);
		}
		oShare.rootEl.appendChild(ulElement);
	}

	/**
	  * Normalises any data in the configuration, converting relative URLs to ready-to-share
	  * absolute versions
	  *
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
  */
Share.prototype.destroy = function() {
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
  * @param {(HTMLElement|string)} [el=document.body] - Element where to search for o-share components. You can pass an HTMLElement or a selector string
  * @returns {Array} - An array of Share instances
  */
Share.init = function(rootEl) {
	if (!rootEl) {
		rootEl = document.body;
	}
	if (!(rootEl instanceof HTMLElement)) {
		rootEl = document.querySelector(rootEl);
	}
	if (rootEl instanceof HTMLElement && rootEl.matches('[data-o-component=o-share]')) {
		return new Share(rootEl);
	}
	return Array.from(rootEl.querySelectorAll('[data-o-component=o-share]'), rootEl => new Share(rootEl) );
};

module.exports = Share;
