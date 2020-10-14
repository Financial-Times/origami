import {is, merge, isUndefined, guid} from '../utils.js';
import {Store} from './store.js';

/**
 * @typedef {object} Session
 * @property {string} id - The id of the session
 * @property {boolean} isNew - Whether it is a brand new session
 */

let store;
const defaultSessionConfig = {
	storage: 'best',
	name: 'session',
	expires: 30 * 60 * 1000 // 30 minutes
};

/**
 * Set the session in the store.
 *
 * @param {string} session - The session to be stored.
 * @returns {void}
 */
function setSession(session) {
	const d = new Date();
	d.setTime(d.getTime() + store.config.expires);

	store.write({
		value: session,
		expiry: d.valueOf()
	});
}

/**
 * Get the session from the store. Expiry and gen of a new session are handled here.
 *
 * @returns {Session} the current session
 */
function getSession() {
	const s = store.read();
	let session;
	let isNew = false;

	if (s) {
		const d = new Date().valueOf();
		const exp = parseInt(s.expiry, 10);

		// If current session is active.
		if (exp >= d) {
			session = s.value;
		}
	}

	// No active session, gen a new one.
	if (!session) {
		session = guid();
		isNew = true;
	}

	// Refreshes the cookie...
	setSession(session);

	return {
		id: session,
		isNew: isNew
	};
}

/**
 * Init
 *
 * @param {string|object} [config] The name used to store the session or configuration object.
 * @returns {Session} - The session
 */
function init(config) {
	if (is(config, 'string')) {
		config = { name: config };
	}

	if (isUndefined(config)) {
		config = {};
	}

	const c = merge(defaultSessionConfig, config);

	// config.name is important here, means the user has specifically asked for a cookie name.
	if (c.storage === 'cookie' && config.name) {
		c.nameOverride = c.name;
	}

	store = new Store(c.name, c);

	return getSession();
}

export { getSession as session, init };
