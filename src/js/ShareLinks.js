/*global require,module*/
"use strict";

var DomDelegate = require('ftdomdelegate');
var oDom = require('o-dom');
var TextCopyHelper = require('./TextCopyHelper');

var OSharePrototype = Object.create(HTMLElement.prototype);
// OSharePrototype.createdCallback = function() {
// 	var template = document.querySelector('template[data-o-component=o-share]');
// 	var element = document.importNode(template.content, true);
// 	this.createShadowRoot().appendChild(element);
// };

var socialUrls = {
	twitter: "https://twitter.com/intent/tweet?url={{url}}&amp;text={{title}}&amp;related={{relatedTwitterAccounts}}&amp;via=FT",
	facebook: "http://www.facebook.com/sharer.php?u={{url}}&amp;t={{title}}+|+{{titleExtra}}",
	linkedin: "http://www.linkedin.com/shareArticle?mini=true&amp;url={{url}}&amp;title={{title}}+|+{{titleExtra}}&amp;summary={{summary}}&amp;source=Financial+Times",
	googleplus: "https://plus.google.com/share?url={{url}}",
	reddit: "http://reddit.com/submit?url={{url}}&amp;title={{title}}",
	pinterest: "http://www.pinterest.com/pin/create/button/?url={{url}}&amp;description={{title}}",
	url: "{{url}}"
}

function ShareLinks(rootEl, config) {

	var rootDomDelegate;
	var shareObj = this;
	var openWindows = {};

	function dispatchCustomEvent(name, data) {
		if (document.createEvent && rootEl.dispatchEvent) {
			var event = document.createEvent('Event');
			event.initEvent(name, true, true);

			if (data) {
				event.detail = data;
			}

			rootEl.dispatchEvent(event);
		}
	}

	function handleClick(ev) {
		ev.preventDefault();

		var actionEl = oDom.getClosestMatch(ev.target, 'li');
		var url;

		if (rootEl.contains(actionEl) && actionEl.querySelector('a[href]')) {
			url = actionEl.querySelector('a[href]').href;

			if (actionEl.getAttribute('data-o-share-action') === "url") {
				copyLink(url, actionEl);
			} else {
				shareSocial(url);
			}
		}
	}

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
				dispatchCustomEvent('oTabs.copy', {
					share: shareObj,
					action: "url",
					url: url
				});
			},
			onClose: function() {
				parentEl.removeAttribute('aria-selected');
			}
		});

		dispatchCustomEvent('oTabs.open', {
			share: shareObj,
			action: "url",
			url: url
		});
	}

	function shareSocial(url) {
		if (url) {
			if (openWindows[url] && !openWindows[url].closed) {
				openWindows[url].focus();
			} else {
				openWindows[url] = window.open(url, url, 'width=646,height=436');
			}

			dispatchCustomEvent('oTabs.open', {
				share: shareObj,
				action: "social",
				url: url
			});
		}
	}

	function generateSocialUrl(socialNetwork) {
		var templateUrl = socialUrls[socialNetwork];
		window.lol = templateUrl;
		console.log(templateUrl);
		templateUrl = templateUrl.replace('{{url}}', config.url)
			.replace('{{title}}', encodeURIComponent(config.title))
			.replace('{{titleExtra}}', encodeURIComponent(config.titleExtra))
			.replace('{{summary}}', encodeURIComponent(config.summary))
			.replace('{{relatedTwitterAccounts}}', encodeURIComponent(config.relatedTwitterAccounts));
		return templateUrl;
	}

	function render() {
		var ulElement = document.createElement('ul');
		for (var i = 0; i < config.links.length; i++) {
			var liElement = document.createElement('li');
			liElement.classList.add('o-share__action', 'o-share__action--'+config.links[i]);
			var aElement = document.createElement('a');
			aElement.href = generateSocialUrl(config.links[i]);
			aElement.appendChild(document.createElement('i'));
			liElement.appendChild(aElement);
			ulElement.appendChild(liElement);
		}
		rootEl.appendChild(ulElement);
		// var root = rootEl.createShadowRoot();
		// root.innerHTML = '<content></content>';
	}

	function init() {
		if (!rootEl) {
			rootEl = document.body;
		} else if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}

		if (!config) {
			config = {};
			config.links = rootEl.getAttribute('data-o-share-links').split(' ');
			config.url = rootEl.getAttribute('data-o-share-url');
			config.title = rootEl.getAttribute('data-o-share-title');
			config.titleExtra = rootEl.getAttribute('data-o-share-titleExtra');
			config.summary = rootEl.getAttribute('data-o-share-summary');
			config.relatedTwitterAccounts = rootEl.getAttribute('data-o-share-relatedTwitterAccounts');
		}
		render();
		rootDomDelegate = new DomDelegate(rootEl);
		rootDomDelegate.on('click', handleClick);
		rootEl.setAttribute('data-o-share--js', '');
		dispatchCustomEvent('oShare.ready', {
			share: shareObj
		});
	}

	function destroy() {
		rootEl.removeAttribute('data-o-share--js');
		rootDomDelegate.destroy();
		for (var i = 0; i < rootEl.children; i++) {
			rootEl.removeChild(rootEl.children[i]);
		}
	}

	init();

	this.copyLink = destroy;
	this.shareViaSocialMedia = destroy;
	this.destroy = destroy;
}

ShareLinks.init = function(el) {
	var shareLinks = [];
	var sEls;
	var c;
	var l;

	if (!el) {
		el = document.body;
	} else if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}

	if (el.querySelectorAll) {
		sEls = el.querySelectorAll('[data-o-component=o-share]:not([data-o-share--js])');

		for (c = 0, l = sEls.length; c < l; c++) {
			shareLinks.push(new ShareLinks(sEls[c]));
		}
	}

	return shareLinks;
};

ShareLinks.element = document.registerElement('o-share', {
	prototype: OSharePrototype
});

module.exports = ShareLinks;
