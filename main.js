/*global require, module */
'use strict';  // eslint-disable-line strict

const settings = require('./src/javascript/core/settings');
const user = require('./src/javascript/core/user');
const session = require('./src/javascript/core/session');
const send = require('./src/javascript/core/send');

/**
 * The version of the tracking module.
 * @type {string}
 */
const version = '1.2.3';
/**
 * The source of this event.
 * @type {string}
 */
const source = 'o-tracking';
/**
 * The API key.
 * @type {string}
 */
const api_key = 'qUb9maKfKbtpRsdp0p2J7uWxRPGJEP';

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
 * @param {boolean} level - Turn on or off, defaults to false if omitted.
 * @return {undefined}
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
 * @return {undefined}
 */
Tracking.prototype.destroy = function() {
	this.developer(false);
	this.initialised = false;

	settings.destroy('config');
	settings.destroy('page_sent');
};

/**
 * Overload toString method to show the version.
 * @return {string} The module's version.
 */
Tracking.prototype.toString = function() {
	return 'oTracking version ' + version;
};

Tracking.prototype.event = require('./src/javascript/events/custom');

Tracking.prototype.page = require('./src/javascript/events/page-view');

Tracking.prototype.click = require('./src/javascript/events/click');

// Previously, the click handler was initialised as "link"
Tracking.prototype.link = { init: _ => Tracking.prototype.click.init('link') }; // eslint-disable-line no-unused-vars

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
 * @param {Object} config 					- See {@link Tracking} for the configuration options.
 * @param {boolean} config.developer        - Optional, if `true`, logs certain actions.
 * @param {boolean} config.noSend           - Optional, if `true`, won't send events.
 * @param {string} config.configId          - Optional
 * @param {string} config.session           - Optional
 *
 * @return {Tracking} - Returns the tracking object
 */
Tracking.prototype.init = function(config) {
	if (this.initialised) {
		return this;
	}

	const hasDeclarativeConfig = !!this._getDeclarativeConfigElement();

	config = config || {};
	if (hasDeclarativeConfig) {
		config = this._getDeclarativeConfig(config);
	}

	// If there's no config, there is no point initialising!
	// http://stackoverflow.com/a/32108184
	if (Object.keys(config).length === 0 && config.constructor === Object) {
		return null;
	}

	settings.set('version', this.version);
	settings.set('source', this.source);
	settings.set('api_key', this.api_key);

	settings.set('page_sent', false);

	// Set up the user from stored - may later be updated by config
	user.init();

	this.updateConfig(config);

	// Session
	session.init(config.session);

	// Initialize the sending queue.
	send.init();

	this.event.init();
	this.page.init();
	this.initialised = true;
	return this;
};

/**
 * Update the tracking configuration with any state changes. The supplied
 * config is merged with any existing config; to unset a value, set it as
 * null or undefined.
 *
 * @param {Object} newConfig The configuration object to merge in - see init()
 * @return {void}
 */
Tracking.prototype.updateConfig = function(newConfig) {
	let config = settings.get('config') || {};

	config = this.utils.merge(config, newConfig);
	settings.set('config', config);

	// Developer mode
	if (config.developer) {
		this.developer(config.developer);

		if (config.noSend) {
			settings.set('no_send', true);
		}
	}

	if (config.user && config.user.user_id) {
		user.setUser(config.user.user_id);
	}

	send.setDomain();
};

/**
 * Checks if the <script type='application/json' data-o-tracking-config> element is in the DOM
 * @private
 * @return {HTMLElement} - Returns the <script> element if found
 */
Tracking.prototype._getDeclarativeConfigElement = function() {
	return document.querySelector('script[data-o-tracking-config]');
};

/**
 * Initialises additional data using the <script type='application/json' data-o-tracking-config> element in the DOM.
 * @private
 * @param {Object} options - A partially, or fully filled options object.  If
 *                           an option is missing, this method will attempt to
 *                           initialise it from the DOM.
 * @return {Object} - The options modified to include the options gathered from the DOM
 */
Tracking.prototype._getDeclarativeConfig = function(options) {
	const configEl = this._getDeclarativeConfigElement();
	let declarativeConfigString;
	if (configEl) {
		declarativeConfigString = configEl.textContent || configEl.innerText || configEl.innerHTML;
	} else {
		return false;
	}

	let declarativeOptions;

	try {
		declarativeOptions = JSON.parse(declarativeConfigString);
	} catch(e) {
		const configError = new Error('Invalid JSON configuration syntax, check validity for o-tracking configuration: "' + e.message + '"');
		this.utils.broadcast('oErrors', 'log', {
			error: configError.message,
			info: { module: 'o-tracking' }
		});
		throw configError;
	}

	for (const property in declarativeOptions) {
		if (declarativeOptions.hasOwnProperty(property)) {
			options[property] = options[property] || declarativeOptions[property];
		}
	}

	return options;
};

const tracking = new Tracking();

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
 * @type {Tracking}
 */
module.exports = tracking;
