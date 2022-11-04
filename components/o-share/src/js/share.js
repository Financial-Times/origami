import DomDelegate from "ftdomdelegate";

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
 * @param {object} config - Optional
 * @param {string} config.url - Optional, url to share
 * @param {string} config.title - Optional, title to be used in social network sharing
 * @param {string} config.titleExtra - Optional, extra bit to add to the title for some social networks
 * @param {string} config.summary - Optional, summary of the page that's being shared
 * @param {string} config.relatedTwitterAccounts - Optional, extra information for sharing on Twitter
 * @param {object[]} config.links - Optional, array of strings of supported social network names that you want rendered
 */
function Share(rootEl, config) {
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
	function dispatchCustomEvent(eventName, data = {}, namespace = "oShare") {
		oShare.rootEl.dispatchEvent(
			new CustomEvent(namespace + "." + eventName, {
				detail: data,
				bubbles: true,
			})
		);
	}

	/**
	 * Click event handler that checks the event target is an o-share action
	 *
	 * @param {Event} ev - The event to handle
	 * @returns {undefined}
	 * @private
	 */
	function handleClick(ev) {
		const actionEl = ev.target.closest("li.o-share__action");

		if (oShare.rootEl.contains(actionEl) && actionEl.querySelector("a[href]")) {
			ev.preventDefault();
			ev.stopPropagation();

			const url = actionEl.querySelector("a[href]").href;
			const shareLocation = oShare.rootEl.dataset.oShareLocation || "";

			dispatchCustomEvent(
				"event",
				{
					category: "share",
					action: "click",
					button: actionEl.textContent.trim().toLowerCase(),
					location: shareLocation,
				},
				"oTracking"
			);

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
				openWindows[url] = window.open(url, "", "width=646,height=436");
				openWindows[url].opener = null;
			}

			dispatchCustomEvent("open", {
				share: oShare,
				action: "social",
				url: url,
			});
		}
	}

	/**
	 * Renders the list of social networks in {@link config.links}
	 *
	 * @returns {void}
	 * @private
	 */
	function render() {
		normaliseConfig();
		const ulElement = document.createElement("ul");
		for (let i = 0; i < config.links.length; i++) {
			const liElement = document.createElement("li");
			const spanElement = document.createElement("span");
			const aElement = document.createElement("a");

			liElement.classList.add(
				"o-share__action",
				`o-share__action--${config.links[i]}`
			);

			spanElement.classList.add("o-share__text");
			spanElement.innerText = generateDescriptiveLinkText(
				config,
				config.links[i]
			);

			aElement.classList.add(
				"o-share__icon",
				`o-share__icon--${config.links[i]}`
			);
			aElement.href = generateSocialUrl(config, config.links[i]);
			aElement.setAttribute("target", "_blank");
			aElement.setAttribute("rel", "noopener");

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
	 * @returns {undefined}
	 * @private
	 */
	function normaliseConfig() {
		const link = document.createElement("a");
		link.href = config.url;
		config.url =
			link.protocol +
			"//" +
			link.host +
			link.pathname +
			link.search +
			link.hash;
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
		rootDelegate.on("click", handleClick);
		rootEl.setAttribute("data-o-share--js", "");

		oShare.rootDomDelegate = rootDelegate;
		oShare.rootEl = rootEl;

		if (rootEl.children.length === 0) {
			if (!config) {
				config = {};
				config.links = rootEl.hasAttribute("data-o-share-links")
					? rootEl.getAttribute("data-o-share-links").split(" ")
					: [];
				config.url = rootEl.getAttribute("data-o-share-url") || "";
				config.title = rootEl.getAttribute("data-o-share-title") || "";
				config.titleExtra =
					rootEl.getAttribute("data-o-share-titleExtra") || "";
				config.summary = rootEl.getAttribute("data-o-share-summary") || "";
				config.relatedTwitterAccounts =
					rootEl.getAttribute("data-o-share-relatedTwitterAccounts") || "";
			}
			render();
		}

		dispatchCustomEvent("ready", {
			share: oShare,
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
	this.rootEl.textContent = "";

	this.rootEl.removeAttribute("data-o-share--js");
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
	if (
		rootEl instanceof HTMLElement &&
		rootEl.matches("[data-o-component=o-share]")
	) {
		return new Share(rootEl);
	}
	return Array.from(
		rootEl.querySelectorAll("[data-o-component=o-share]"),
		rootEl => new Share(rootEl)
	);
};

/**
 * Transforms the default social urls
 *
 * @private
 * @param {object} config - Optional
 * @param {string} config.url - Optional, url to share
 * @param {string} config.title - Optional, title to be used in social network sharing
 * @param {string} config.titleExtra - Optional, extra bit to add to the title for some social networks
 * @param {string} config.summary - Optional, summary of the page that's being shared
 * @param {string} config.relatedTwitterAccounts - Optional, extra information for sharing on Twitter
 * @param {string} socialNetwork - Name of the social network that we support (e.g. twitter, facebook, linkedin, pinterest)
 * @returns {string} - the generated url
 */
export function generateSocialUrl(config, socialNetwork) {
	const url = encodeURIComponent(config.url);
	const title = encodeURIComponent(config.title);
	const titleExtra = encodeURIComponent(config.titleExtra);
	const summary = encodeURIComponent(config.summary);
	const relatedTwitterAccounts = encodeURIComponent(
		config.relatedTwitterAccounts
	);
	const socialUrls = {
		twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}&related=${relatedTwitterAccounts}&via=FT`,
		facebook: `http://www.facebook.com/sharer.php?u=${url}`,
		linkedin: `http://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}+%7C+${titleExtra}&summary=${summary}&source=Financial+Times`,
		pinterest: `http://www.pinterest.com/pin/create/button/?url=${url}&description=${title}`,
		whatsapp: `whatsapp://send?text=${title}%20(${titleExtra})%20-%20${url}`,
		link: url,
		enterpriseSharing: url,
	};
	return socialUrls[socialNetwork];
}

/**
 * Transforms the descriptive text for social links
 *
 * @private
 * @param {object} config - Optional
 * @param {string} config.title - Optional, title to be used in social network sharing
 * @param {string} socialNetwork - Name of the social network that we support (e.g. twitter, facebook, linkedin, pinterest)
 * @returns {string} - A lovely URL
 */
export function generateDescriptiveLinkText(config, socialNetwork) {
	const descriptiveLinkText = {
		twitter: `Share ${config.title} on Twitter (opens a new window)`,
		facebook: `Share ${config.title} on Facebook (opens a new window)`,
		linkedin: `Share ${config.title} on LinkedIn (opens a new window)`,
		pinterest: `Share ${config.title} on Pinterest (opens a new window)`,
		whatsapp: `Share ${config.title} on Whatsapp (opens a new window)`,
		link: `Open link in new window`,
		enterpriseSharing: `Share ${config.title} with your Enterprise Sharing tools (opens a new window)`,
	};
	return descriptiveLinkText[socialNetwork];
}

export default Share;
