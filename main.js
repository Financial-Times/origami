/*global require, module */
'use strict';

var settings = require('./src/javascript/core/settings');

/**
 * The version of the tracking module.
 * @type {string}
 */
var version = '1.0.5';
/**
 * The source of this event.
 * @type {string}
 */
var source = 'o-tracking';
/**
 * The API key.
 * @type {string}
 */
var api_key = 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP';

/**
 * @class Tracking
 */
function Tracking() {
	this.version = version;
	this.source = source;
	this.api_key = api_key;

	/**
	 * The initialised state of the object.
	 * @type {boolean}
	 */
	this.initialised = false;
}

/**
 * Turn on/off developer mode. (Can also be activated on init.)
 *
 * @param {boolean} Turn on or off, defaults to false if omitted.
 *
 * @return undefined
 */
Tracking.prototype.developer = function(level) {
	if (level) {
		settings.set('developer', true);
	} else {
		settings.destroy('developer', null);
		settings.destroy('no_send', null);
	}
};

/**
 * Clean up the tracking module.
 *
 * @return undefined
 */
Tracking.prototype.destroy = function() {
	this.developer(false);
	this.initialised = false;

	settings.destroy('config');
	settings.destroy('page_sent');
};

/**
 * Overload toString method to show the version.
 *
 * @return {string} The module's version.
 */
Tracking.prototype.toString = function() {
	return 'oTracking version ' + version;
};

Tracking.prototype.page = require('./src/javascript/page');

Tracking.prototype.event = require('./src/javascript/event');

Tracking.prototype.link = require('./src/javascript/link');

Tracking.prototype.utils = require('./src/javascript/utils');

/**
 * Initialises the Tracking object.
 *
 * All options are optional, if a configuration option is missing, the module
 * will try to initialise using any configuration found in the DOM using the
 * script config tag.
 *
 * @example
 * <!-- DOM configuration settings -->
 * <script type='application/json' data-o-tracking-config>
 * page: {
 * 	 product: 'desktop'
 * },
 * user: {
 *   user_id: '023ur9jfokwenvcklwnfiwhfoi324'
 * }
 * </script>
 *
 * @param config                 {Object}
 * @param config.developer       {boolean} - Optional, if `true`, logs certain actions.
 * @param config.noSend          {boolean} - Optional, if `true`, won't send events.
 * @param config.configId        {string}  - Optional
 * @param config.session         {string}  - Optional
 *
 * @return {Tracking}
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
		config = this._getDeclarativeConfig(config);
	}

	settings.set('config', config);
	settings.set('version', this.version);
	settings.set('source', this.source);
	settings.set('api_key', this.api_key);

	settings.set('page_sent', false);

	// Developer mode
	if (config.developer) {
		this.developer(config.developer);

		if (config.noSend) {
			settings.set('no_send', true);
		}
	}

	// User identifier
	require('./src/javascript/core/user').init(config.user ? config.user.user_id : null);

	// Session
	require('./src/javascript/core/session').init(config.session);

	// Initialize the sending queue.
	require('./src/javascript/core/send').init();

	this.initialised = true;
	return this;
};

/**
 * Checks if the <script type='application/json' data-o-tracking-config> element is in the DOM
 *
 * @private
 *
 * @return {HTMLElement} - Returns the <script> element if found
 */
Tracking.prototype._getDeclarativeConfigElement = function() {
	return document.querySelector('script[data-o-tracking-config]');
};

/**
 * Initialises additional data using the <script type='application/json' data-o-tracking-config> element in the DOM.
 *
 * @private
 * @param {Object} options - A partially, or fully filled options object.  If
 *                           an option is missing, this method will attempt to
 *                           initialise it from the DOM.
 * @return {Object} - The options modified to include the options gathered from the DOM
 */
Tracking.prototype._getDeclarativeConfig = function(options) {
	var configEl = this._getDeclarativeConfigElement();
	var declarativeConfigString;
	if (configEl) {
		declarativeConfigString = configEl.textContent || configEl.innerText || configEl.innerHTML;
	} else {
		return false;
	}

	var declarativeOptions;

	try {
		declarativeOptions = JSON.parse(declarativeConfigString);
	} catch(e) {
		var configError = new Error('Invalid JSON configuration syntax, check validity for o-tracking configuration: "' + e.message + '"');
		this.utils.broadcast('oErrors', 'log', {
			error: configError,
			info: { module: 'o-tracking' }
		});
		throw configError;
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

/**
 * A constructed object, this module is a Singleton as we only want one
 * instance sending events. See {@link Tracking} for the publicly available
 * interface.
 *
 * @type {Tracking}
 */
module.exports = tracking;
