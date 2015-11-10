/*global module, require, window */

const Queue = require('./core/queue');
const Core = require('./core');

const utils = require('./utils');


let internalQueue;

/**
 * Default properties for events.
 *
 * @type {Object}
 * @return {Object} The default link configuration.
 */
const defaultLinkConfig = function () {
	return {
		category: 'link',
		action: 'click',
		context: {}
	};
};

let callback = function () {};

/**
 * Check if a URL is going to the same site (internal)
 *
 * @param {string} url - The url to check.
 *
 * @return {boolean} - Result of internal url.
 * @private
 */
function isInternal(url) {
	return url.indexOf(window.document.location.hostname) > -1;
}

/**
 * Check if a URL is going to an external site.
 *
 * @param {string} url - The url to check.
 *
 * @return {boolean} - The result of external url.
 * @private
 */
function isExternal(url) {
	return !isInternal(url);
}

/**
 * Checks if a URL is pointing at a file.
 * NOTE: Don't want to maintain a list of file extensions, so try best guess.
 *
 * @param {string} url - The url to check.
 *
 * @return {boolean} - The result if a url is a file location.
 * @private
 */
function isFile(url) {
	const path = url.replace(/^\w+:\/\//, '').replace(/(#|\?).+/g, '').replace(/\/$/, '');

	// It must have a slash to have a file path
	if (path.indexOf('/') === -1) {
		return false;
	}

	// No extension
	if (!path.match(/\.(\w{2,4})$/)) {
		return false;
	}

	// Obviously a web page.
	if (['html', 'htm', 'php'].indexOf(RegExp.$1) > -1) {
		return false;
	}

	return true;
}

/**
 * Calculates the parents of a HTML element.
 *
 * @param {Element} element - The starting element.
 *
 * @return {array} The tree of parent elements.
 * @private
 */
function parentTree(element) {
	if (!element) {
		return [];
	}

	const tree = [element];

	if (element.nodeName === 'BODY') {
		return tree;
	}

	return tree.concat(parentTree(element.parentElement));
}

/**
 * Create the identifier of the link. TODO: https://rally1.rallydev.com/#/16966478977d/detail/defect/17919485944
 *
 * @param {Element} link - The link element.
 *
 * @return {string} The ID for the link.
 * @private
 */
function createLinkID(link) {
	const parents = parentTree(link);
	let name = link.href || link.text || link.name || link.id;

	name = name.replace(/^http:\/\/[\w\.]+/, '') // Remove http://[something].
		.replace(/^\//, '') // Remove slash at beginning
		.replace(/(\?|#).*$/, '') // Remove query string and page anchor (#)
		.replace(/\/$/, '') // Remove trailing slash
		.replace(/\.[a-z]{3,4}$/, ''); // Remove final '.com' or similar

	// If it's an external URL
	if (name === '') {
		name = link.href.replace(/^http:\/\//, '').split('?')[0].replace(/\/$/, '');
	}

	// Last 2 items of URL
	name = name.split('/').slice(-2).filter(function (obj) { return (obj); });

	// If uuid then take final value only
	if (name.slice(-1)[0].match(/[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}/)) {
		name = name.slice(-1);
	}

	// Remove slashes as final outcome is slash delimited
	name = (name.length > 1 ? name.slice(0, 2).join('-') : name[0]).toLowerCase();

	return parents.map(function (p) { return p.tagName.toLowerCase(); }).filter(function (e, i, arr) { return arr.lastIndexOf(e) === i; }).reverse().join('/') + '/' + name;
}

/**
 * Track the link.
 *
 * @param {Element} element - The element being tracked.
 *
 * @return {Object|boolean} - If synscronous, returns when the tracking event is sent, if async, returns true immediately.
 */
function track(element) {
	const linkID = createLinkID(element);
	const config = utils.merge(defaultLinkConfig(), {
					context: {
					    link: {
					        link_id: linkID,
                            source_id: Core.getRootID(),
                            href: element.href,
                            title: element.text
					    }
					}
				});

	if (isExternal(element.href) || isFile(element.href)) {
		// Send now
		config.async = false;
		return Core.track(config, callback);
	}

	if (isInternal(element.href)) {
		// Queue and send on next page.
		internalQueue.add(config).save();
	}

	return true;
}

/**
 * Handle a click event.
 *
 * @param {Event} event - The event.
 *
 * @return {boolean} - Returns the result of the tracking request
 * @private
 */
function clickEvent(event) {
	return track(event.target);
}

/**
 * Set the callback called on every link tracking event.
 *
 * @param {Function} cb - The callback.
 * @return {undefined}
 */
function onClick(cb) {
	callback = cb;
}

/**
 * If there are any requests queued, attempts to send the next one
 * Otherwise, does nothing
 * @return {undefined}
 */
function runQueue() {
	const next = function () { runQueue(); callback(); };
	const nextLink = internalQueue.shift();

	if (nextLink) {
		Core.track(nextLink, next);
	}
}

/**
 * Setup and initialise link tracking.
 *
 * @param {Object}  config - Initial configuration
 * @param {Element} config.root - Optional. The root element to search for links. Defaults to window.document - useful if trying to track links from an iframe.
 * @param {string}  config.selector - Optional. The selector to use to search for links. Defaults to 'a'.
 * @param {string}  config.event - Optional. The event to listen on. Defaults to 'click'.
 * @param {array}   config.links - Optional. If you've already worked out the links to track, then this is used to pass them over. Must be an array with elements that accept events.
 *
 * @return {array} The links setup in this init.
 */
function init(config) {
	let links;
	let i;

	internalQueue = new Queue('links');

	runQueue();

	// Listen for page requests. If this is a single page app, we can send link requests now.
	utils.onPage(runQueue);

	if (utils.isUndefined(config)) {
		config = {};
	}
	config = utils.merge({
		root: window.document,
		selector: 'a',
		event: 'click',
		links: null
	}, config);

	if (config.hasOwnProperty('callback')) {
		callback = config.callback;
	}

	if (config.links && utils.is(config.links, 'object') && config.links.constructor.toString().match(/array/i)) {
		links = config.links;

		for (i = 0; i < links.length; i = i + 1) {
			utils.addEvent(links[i], config.event, clickEvent);
		}
	} else {
		if (typeof config.root !== 'object' || typeof config.selector !== 'string') {
			const configException = 'If supplying a config it must have a valid root element and a selector string';
			utils.broadcast('oErrors', 'log', {
				error: configException,
				info: { module: 'o-tracking' }
			});
			throw configException;
		}

		utils.addEvent(config.root, config.event, function (event) {
			if (event.target.tagName === config.selector.toUpperCase()) {
				clickEvent.call(event.target, event);
			}
		});
	}
}

utils.addEvent(window, 'oTracking.link', track);

module.exports = {
	init: init,
	onClick: onClick,
	track: track
};
