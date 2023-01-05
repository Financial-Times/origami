import DomDelegate from 'ftdomdelegate';

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
 * @param {(HTMLElement|string)} rootEl [el=document.body] - Element where to search for an o-share component. You can pass an HTMLElement or a selector string
 */
function Share(rootEl) {
	const oShare = this;
	const openWindows = {};

	/**
	 * Helper function to dispatch namespaced events, namespace defaults to oShare
	 *
	 * @param {string} eventName - event to dispatch
	 * @param {object} data - the payload
	 * @param {string} namespace - the namespace for the event
	 * @returns {void}
	 * @private
	 */
	function dispatchCustomEvent(eventName, data = {}, namespace = 'oShare') {
		oShare.rootEl.dispatchEvent(new CustomEvent(namespace + '.' + eventName, {
			detail: data,
			bubbles: true
		}));
	}

	/**
	 * Click event handler that checks the event target is an o-share action
	 *
	 * @param {Event} ev - The event to handle
	 * @returns {undefined}
	 * @private
	 */
	function handleClick(ev) {
		const actionEl = ev.target.closest('li.o-share__action');

		if (oShare.rootEl.contains(actionEl) && actionEl.querySelector('a[href]')) {
			ev.preventDefault();
			ev.stopPropagation();

			const url = actionEl.querySelector('a[href]').href;
			const shareLocation = oShare.rootEl.dataset.oShareLocation || '';

			dispatchCustomEvent('event', {
				category: 'share',
				action: 'click',
				button: actionEl.textContent.trim().toLowerCase(),
				location: shareLocation
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
	 * Initialises the Share class, rendering the o-share element if it's empty with {@link config} options,
	 * or from corresponding data attributes and sets up dom-delegates.
	 * Dispatches 'oShare.ready' at the end
	 *
	 * @returns {undefined}
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

		dispatchCustomEvent('ready', {
			share: oShare
		});
	}

	init();
}

/**
 * Destroys the Share instance, disables dom-delegates
 *
 * @returns {undefined}
 */
Share.prototype.destroy = function () {
	this.rootDomDelegate.destroy();
	this.rootEl.textContent = '';

	this.rootEl.removeAttribute('data-o-share--js');
	this.rootEl = undefined;
};

/**
 * Initialises all o-share components inside the element passed as the first parameter
 *
 * @param {(HTMLElement|string)} rootEl [el=document.body] - Element where to search for o-share components. You can pass an HTMLElement or a selector string
 * @returns {Share|Share[]} - A Share or an array of Shares
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
