/* global Livefyre */

const globalEvents = require('./src/javascripts/globalEvents');
const config = require('./src/javascripts/config.js');
const oCommentApi = require('o-comment-api');
const defaultConfig = require('./config.js');
const oCommentUtilities = require('o-comment-utilities');
const Widget = require('./src/javascripts/Widget.js');
const resourceLoader = require('./src/javascripts/resourceLoader.js');
const domConstruct = require('./src/javascripts/domConstruct');
const count = require('./src/count/main');

/**
 * Default config (prod) is set.
 */
config.set(defaultConfig);

/**
 * Enable data caching.
 */
oCommentApi.setConfig('cache', true);


/**
 * Widget.js exposed as main constructor
 * @type {object}
 */
module.exports = Widget;

/**
 * Adds or overrides configuration options.
 *
 * @param  {string|object} keyOrObject Key or actually an object with key-value pairs.
 * @param  {anything} value Optional. Should be specified only if keyOrObject is actually a key (string).
 * @return {undefined}
 */
module.exports.setConfig = function () {
	config.set.apply(this, arguments);
};

module.exports.init = function (el) {
	if (!el) {
		el = document.body;
	} else if (!(el instanceof HTMLElement)) {
		el = document.querySelector(el);
	}

	let instances;
	if (el.dataset.oComponent === 'o-comments') {
		instances = [el];
	} else {
		instances = [].slice.call(el.querySelectorAll('[data-o-component="o-comments"]'));
	}

	const commentInstances = instances.filter(instance => !instance.hasAttribute('data-o-comments-count'));
	const countInstances = instances.filter(instance => instance.hasAttribute('data-o-comments-count'));

	if (commentInstances.length) {
		domConstruct({
			context: commentInstances,
			classNamespace: 'o-comments',
			eventNamespace: 'oComments',
			module: module.exports
		});
	}

	if (countInstances.length) {
		domConstruct({
			context: countInstances,
			classNamespace: 'o-comments',
			eventNamespace: 'oComments',
			module: count
		});
	}
};
module.exports.utilities = oCommentUtilities;
module.exports.dataService = oCommentApi;
module.exports.utils = require('./src/javascripts/utils.js');
module.exports.i18n = require('./src/javascripts/i18n.js');
module.exports.userDialogs = require('./src/javascripts/userDialogs.js');
module.exports.auth = require('./src/javascripts/auth.js');

/**
 * Enables logging.
 * @return {undefined}
 */
module.exports.enableLogging = function () {
	oCommentUtilities.logger.enable.apply(this, arguments);
};

/**
 * Disables logging.
 * @return {undefined}
 */
module.exports.disableLogging = function () {
	oCommentUtilities.logger.disable.apply(this, arguments);
};

/**
 * Sets logging level.
 * @return {undefined}
 */
module.exports.setLoggingLevel = function () {
	oCommentUtilities.logger.setLevel.apply(this, arguments);
};

module.exports.on = globalEvents.on;
module.exports.off = globalEvents.off;


document.addEventListener('o.DOMContentLoaded', function () {
	try {
		const configInDomEl = document.querySelector('script[type="application/json"][data-o-comments-config]');
		if (configInDomEl) {
			const configInDom = JSON.parse(configInDomEl.innerHTML);

			module.exports.setConfig(configInDom);
		}
	} catch (e) {
		oCommentUtilities.logger.log('Invalid config in the DOM.', e);
	}

	module.exports.init();
});


resourceLoader.loadLivefyreCore(function (err) {
	if (err) {
		return;
	}

	Livefyre.on('beforeLoadPermalinks', function (e) {
		// Disable the Permalink Modal
		e.disableModal();
	});
});
