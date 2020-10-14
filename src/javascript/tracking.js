import {set, get, destroy as destroySetting} from './core/settings.js';
import {setUser, init as initUser} from './core/user.js';
import {init as initSession} from './core/session.js';
import {init as initSend} from './core/send.js';
import {event} from './events/custom.js';
import {page} from './events/page-view.js';
import {init as initClick} from './events/click.js';
import core from './core.js';
import { merge, broadcast } from './utils.js';
import {init as initView} from './events/component-view.js';

const initEvent = event.init;
const initPage = page.init;

/**
 * The version of the tracking module.
 *
 * @type {string}
 */
const version = '2.0.10';

/**
 * The source of this event.
 *
 * @type {string}
 */
const source = 'o-tracking';

/**
 * Update the tracking configuration with any state changes. The supplied
 * config is merged with any existing config; to unset a value, set it as
 * null or undefined.
 *
 * @param {object} newConfig The configuration object to merge in - see init()
 * @returns {void}
 */
function updateConfig(newConfig) {
	let config = get('config') || {};

	config = merge(config, newConfig);
	set('config', config);

	if (config.user && config.user.user_id) {
		setUser(config.user.user_id);
	}
}

/**
 * Clean up the tracking module.
 *
 * @returns {void}
 */
function destroy() {
	tracking.initialised = false;

	destroySetting('config');
	destroySetting('page_sent');
}
/**
 * Overload toString method to show the version.
 *
 * @returns {string} The module's version.
 */
function toString() {
	return 'oTracking version ' + version;
}

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
 * @param {object} config 					- See {@link Tracking} for the configuration options.
 * @param {boolean=} config.test             - Optional, if `true`, the data sent to Spoor will be marked as test data.
 * @param {string=} config.configId          - Optional
 * @param {string=} config.session           - Optional
 * @param {string=} config.cookieDomain      - Optional
 * @param {object=} config.context           - Optional
 * @param {object=} config.user              - Optional
 * @param {object=} config.system            - Optional
 * @param {object=} config.device            - Optional
 *
 * @returns {tracking|null} - The initialised tracking object or null if no configuration has been given.
 */
function init(config = {}) {
	if (tracking.initialised) {
		return tracking;
	}

	const hasDeclarativeConfig = Boolean(
		getDeclarativeConfigElement()
	);

	if (hasDeclarativeConfig) {
		config = getDeclarativeConfig(config);
	}

	// If there's no config, there is no point initialising!
	// http://stackoverflow.com/a/32108184
	if (Object.keys(config).length === 0 && config.constructor === Object) {
		return null;
	}

	set('version', version);
	set('source', source);

	set('page_sent', false);

	const cookieDomain = config ? config.cookieDomain : '';

	// Set up the user from stored - may later be updated by config
	initUser('', cookieDomain);
	updateConfig(config);

	// Session
	initSession(config.session);

	// Initialize the sending queue.
	initSend();

	initEvent();
	initPage();
	tracking.initialised = true;
	return tracking;
}

/**
 * Retrieves the <script type='application/json' data-o-tracking-config> element that is in the DOM, otherwise returns null.
 *
 * @private
 * @returns {HTMLElement|null} - Returns the <script> element if found otherwise returns null.
 */
function getDeclarativeConfigElement() {
	return document.querySelector('script[data-o-tracking-config]');
}

/**
 * Initialises additional data using the <script type='application/json' data-o-tracking-config> element in the DOM.
 *
 * @private
 * @param {object} options - A partially, or fully filled options object.  If
 *                           an option is missing, this method will attempt to
 *                           initialise it from the DOM.
 * @returns {object|boolean} - The options modified to include the options gathered from the DOM
 */
function getDeclarativeConfig(options) {
	const configEl = getDeclarativeConfigElement();
	let declarativeConfigString;
	if (configEl) {
		declarativeConfigString = configEl.textContent || configEl.innerText || configEl.innerHTML;
	} else {
		return false;
	}

	try {
		const declarativeOptions = JSON.parse(declarativeConfigString);
		Object.assign(options, declarativeOptions);
	} catch(e) {
		const configError = new Error('Invalid JSON configuration syntax, check validity for o-tracking configuration: "' + e.message + '"');
		broadcast('oErrors', 'log', {
			error: configError.message,
			info: { module: 'o-tracking' }
		});
		throw configError;
	}

	return options;
}

const tracking = {
	/**
	 * The initialised state of the object.
	 *
	 * @type {boolean}
	 */
	initialised: false,
	version,
	updateConfig,
	source,
	destroy,
	toString,
	init,
	click: initClick,
	event,
	page,
	view: initView,
	getRootID: core.getRootID
};

export default tracking;
