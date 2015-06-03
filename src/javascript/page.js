/**
 * Page functionality. For tracking a page.
 * @module Track
 * @submodule page
 * @class Track.page
 * @static
 */

/*global module, require */
"use strict";

var Core = require("./core");
var utils = require("./utils");
var settings = require('./core/settings');

/**
 * Default properties for page tracking requests.
 * @example
 {
 url: document.URL,
 referrer: document.referrer,
 async: false // Send this tag syncronously
 }
 * @property defaultPageConfig
 * @type {Object}
 * @private
 */
var defaultPageConfig = function () {
	return {

		tag: {
			type: 'page'
		},

		data: {
			url: document.URL,
			referrer: document.referrer
		},

		async: true // Send this tag asyncronously - as sync doesn't work in FF, as it doesn't send cookies. https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#withCredentials
	};
};

/**
 * Make the page tracking request.
 * @method page
 * @param [config] {Object} Configuration object. If omitted, will use the defaults.
 * @param [callback] {Function} Callback function. Called when request completed.
 * @async
 */
module.exports = function (config, callback) {
	var pageConfig = settings.get('config') ? settings.get('config').page || {} : {};
	config = utils.merge(defaultPageConfig(), {
			data: utils.merge(pageConfig, config)
		});

	// New PageID for a new Page.
	Core.setPageID();
	Core.track(config, callback);

	// Alert internally that a new page has been tracked - for single page apps for example.
	utils.triggerPage();
};
