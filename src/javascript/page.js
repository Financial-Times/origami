/*global module, require */
"use strict";

var Core = require("./core");
var utils = require("./utils");
var settings = require('./core/settings');

/**
 * Default properties for page tracking requests.
 *
 * @type {Object}
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
 *
 * @param {Object} config - Configuration object. If omitted, will use the defaults.
 * @param {Function} callback - Callback function. Called when request completed.
 */
module.exports = function (config, callback) {
	var pageConfig = settings.get('config') ? settings.get('config').page || {} : {};
	config = utils.merge(defaultPageConfig(), {
			data: utils.merge(pageConfig, config)
		});

	// New PageID for a new Page.
	var r = Core.track(config, callback);
	Core.setPageID(r.id);

	// Alert internally that a new page has been tracked - for single page apps for example.
	utils.triggerPage();
};
