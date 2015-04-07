/* global Livefyre */

"use strict";

var self = module;
var globalEvents = require('./src/javascripts/globalEvents');
var config = require('./src/javascripts/config.js'),
	oCommentApi = require('o-comment-api'),
	defaultConfig = require('./config.json'),
	oCommentUtilities = require('o-comment-utilities');
var Widget = require('./src/javascripts/Widget.js');
var resourceLoader = require('./src/javascripts/resourceLoader.js');

/**
 * Default config (prod) is set.
 */
config.set(defaultConfig);

/**
 * Set user's session data if it's available.
 */
var userSession = oCommentUtilities.ftUser.getSession();
if (userSession) {
	config.set('sessionId', userSession);
	oCommentApi.init('sessionId', userSession);
}

/**
 * Enable data caching.
 */
oCommentApi.init('cache', true);

module.exports = {
	/**
	 * Adds or overrides configuration options. It also supports overriding or adding configs to dependencies.
	 * For this you have to write the following:
	 * ```
	 * "dependencies": {
	 *       "o-comment-api": {
	 *           "suds": {
	 *               "baseUrl": "http://test.session-user-data.webservices.ft.com"
	 *           },
	 *           "ccs": {
	 *               "baseUrl": "http://test.comment-creation-service.webservices.ft.com"
	 *           }
	 *       }
	 *   }
	 * ```
	 *
	 * @param  {string|object} keyOrObject Key or actually an object with key-value pairs.
	 * @param  {anything} value Optional. Should be specified only if keyOrObject is actually a key (string).
	 */
	init: function (keyOrObject, value) {
		if (typeof keyOrObject === 'string') {
			config.set(keyOrObject, value);
		} else if (typeof keyOrObject === 'object') {
			if (keyOrObject.hasOwnProperty('dependencies') && keyOrObject.dependencies.hasOwnProperty('o-comment-api')) {
				oCommentApi.init(keyOrObject.dependencies['o-comment-api']);

				delete keyOrObject.dependencies;
			}

			config.set(keyOrObject, value);
		}
	},

	initDomConstruct: function () {
		oCommentUtilities.initDomConstruct({
			Widget: Widget,
			baseClass: 'o-comments',
			namespace: 'oComments',
			module: self
		});
	},

	/**
	 * Widget.js exposed.
	 * @type {object}
	 */
	Widget: Widget,

	WidgetUi: require('./src/javascripts/WidgetUi.js'),

	userDialogs: require('./src/javascripts/userDialogs.js'),

	/**
	 * utils.js exposed.
	 * @type {object}
	 */
	utils:  require('./src/javascripts/utils.js'),

	utilities: oCommentUtilities,

	dataService: oCommentApi,

	/**
	 * Auth.js exposed.
	 * @type {object}
	 */
	auth:   require('./src/javascripts/auth.js'),

	/**
	 * resourceLoader.js exposed.
	 * @type {object}
	 */
	resourceLoader: require('./src/javascripts/resourceLoader.js'),

	/**
	 * i18n.js exposed.
	 * @type {object}
	 */
	i18n: require('./src/javascripts/i18n.js'),

	/**
	 * Enables logging.
	 * @type {function}
	 */
	enableLogging: function () {
		oCommentUtilities.logger.enable.apply(this, arguments);
	},

	/**
	 * Disables logging.
	 * @type {function}
	 */
	disableLogging: function () {
		oCommentUtilities.logger.disable.apply(this, arguments);
	},

	/**
	 * Sets logging level.
	 * @type {number|string}
	 */
	setLoggingLevel: function () {
		oCommentUtilities.logger.setLevel.apply(this, arguments);
	}
};

module.exports.on = globalEvents.on;
module.exports.off = globalEvents.off;


document.addEventListener('o.DOMContentLoaded', function () {
	oCommentUtilities.initDomConstruct({
		Widget: Widget,
		baseClass: 'o-comments',
		namespace: 'oComments',
		module: self,
		auto: true
	});
});


resourceLoader.loadLivefyreCore(function () {
	Livefyre.on('beforeLoadPermalinks', function (e) {
		// Disable the Permalink Modal
		e.disableModal();
	});
});
