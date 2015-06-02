/*global require, module */
"use strict";

var settings = require("./src/javascript/core/settings");

/**
 * The version of the tracking module.
 * @property version
 * @type {String}
 */
var version = '0.0.23';

/**
 * @class Tracking
 */
function Tracking() {
	this.version = version;

	/**
	 * The initialised state of the object.
	 * @type {bool}
	 */
	this.initialised = false;
}

/**
 * Turn on/off developer mode. (Can also be activated on init.)
 * @method developer
 * @param [level] {Boolean} Turn on or off, defaults to false if omitted.
 */
Tracking.prototype.developer = function(level) {
	if (level) {
		settings.set('developer', true);
	} else {
		settings.delete('developer', null);
		settings.delete('noSend', null);
	}
};

/**
 * Clean up the tracking module.
 * @method destroy
 */
Tracking.prototype.destroy = function() {
	this.developer(false);
	settings.delete('internalCounter', 0);
	settings.delete('page_sent', false);
};

/**
 * Overload toString method to show the version.
 * @method toString
 * @return {String} The module's version.
 */
Tracking.prototype.toString = function() {
	return "oTracking version " + version;
};

Tracking.prototype.page = require('./src/javascript/page');

Tracking.prototype.event = require('./src/javascript/event');

Tracking.prototype.link = require('./src/javascript/link');

/**
 * Initialise the Track module.
 * @method init
 * @param config Configuration object
 */
Tracking.prototype.init = function(config) {
	if (this.initialised) {
		return this;
	}

	var hasDeclarativeConfig = !!this._getDeclarativeConfigElement();

	if (!(hasDeclarativeConfig || config)) {
		return this;
	}

	config = config || {};

	if (hasDeclarativeConfig) {
		config = this._initialiseDeclaratively(config);
	}

	settings.set('config', config);
	settings.set('version', this.version);

	settings.set('internalCounter', 0);
	settings.set('page_sent', false);

	// Developer mode
	if (config.developer) {
		this.developer(config.developer);

		if (config.noSend) {
			settings.set('noSend', true);
		}
	}

	// User identifier
	require("./src/javascript/core/user").init(config.userID);

	// Session
	require("./src/javascript/core/session").init(config.session);

	// Initialize the sending queue.
	require("./src/javascript/core/send").init(this.version);

	this.initialised = true;
	return this;
};

/**
 * Checks if the <script type="application/json" data-o-tracking-config> element is in the DOM
 *
 * @returns {HTMLElement} - Returns the <script> element if found
 */
Errors.prototype._getDeclarativeConfigElement = function() {
	return document.querySelector('script[data-o-tracking-config]');
};

/**
 * Initialises additional data using the <script type="application/json" data-o-tracking-config> element in the DOM.
 *
 * @private
 * @param {Object} options - A partially, or fully filled options object.  If
 *                           an option is missing, this method will attempt to
 *                           initialise it from the DOM.
 * @returns {Object} - The options modified to include the options gathered
 *                     from the DOM
 */
Errors.prototype._getDeclarativeConfig = function(options) {
	var configEl = this._getDeclarativeConfigElement();
	if (configEl) {
		declarativeConfigString = configEl.textContent || configEl.innerText || configEl.innerHTML;
	} else {
		return false;
	}

	var declarativeOptions;

	try {
		declarativeOptions = JSON.parse(getDeclarativeConfig);
	} catch(e) {
		throw new Error("Invalid JSON configuration syntax, check validity for o-tracking configuration: '" + e.message + "'");
	}

	for (var property in declarativeOptions) {
		if (declarativeOptions.hasOwnProperty(property)) {
			options[property] = options[property] || declarativeOptions[property];
		}
	}

	return options;
};

var tracking = new Tracking();

function initialise() {
	tracking.init();
	document.removeEventListener('o.DOMContentLoaded', initialise);
}

// Try and initialise on o.DOMContentLoaded. If it fails, defer to the
// consumer of the library.
document.addEventListener('o.DOMContentLoaded', initialise);

module.exports = tracking;
