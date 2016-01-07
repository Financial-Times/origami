/*global require, module */
/*eslint-disable*/
'use strict';
/*eslint-enable*/

const settings = require('./src/javascript/core/settings');
const user = require('./src/javascript/core/user');
const session = require('./src/javascript/core/session');
const send = require('./src/javascript/core/send');

/**
 * The version of the tracking module.
 * @type {string}
 */
const version = '1.0.18';
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

Tracking.prototype.page = require('./src/javascript/events/page-view');

Tracking.prototype.event = require('./src/javascript/events/custom');

Tracking.prototype.link = require('./src/javascript/events/link-click');

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
	user.init(config.user ? config.user.user_id : null);

	// Session
	session.init(config.session);

	// Initialize the sending queue.
	const queue = send.init();

	// If queue length is very large, could be due to a bug in a previous version
	// This was fixed in 1.0.14 https://github.com/Financial-Times/o-tracking/compare/1.0.13...1.0.14
	// But, still seeing big queues coming through in the data for historical reasons.
	// This tries to catch those big queues and forcibly empty them.
	const queue_length = queue.all().length;

	if (queue_length > 200) {
		queue.replace([]);

		this.event({ detail: {
			category: 'o-tracking',
			action: 'queue-bug',
			context: {
				queue_length: queue_length
			}
		}});
	}

	this.initialised = true;
	return this;
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
			error: configError,
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
