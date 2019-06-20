const config = require('./src/javascripts/config');
const oCommentApi = require('o-comment-api');
const defaultConfig = require('./config.js');
const oCommentUtilities = require('o-comment-utilities');
const Widget = require('./src/javascripts/widget');
const domConstruct = require('./src/javascripts/domConstruct');

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
	return domConstruct({
		context: el,
		classNamespace: 'o-comments-count',
		eventNamespace: 'oCommentsCount',
		module: module.exports
	});
};
module.exports.utilities = oCommentUtilities;
module.exports.dataService = oCommentApi;

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


document.addEventListener('o.DOMContentLoaded', function () {
	try {
		const configInDomEl = document.querySelector('script[type="application/json"][data-o-comments-count-config]');
		if (configInDomEl) {
			const configInDom = JSON.parse(configInDomEl.innerHTML);

			module.exports.setConfig(configInDom);
		}
	} catch (e) {
		oCommentUtilities.logger.log('Invalid config in the DOM.', e);
	}

	domConstruct({
		classNamespace: 'o-comments-count',
		eventNamespace: 'oCommentsCount',
		module: module.exports,
		auto: true
	});
});
