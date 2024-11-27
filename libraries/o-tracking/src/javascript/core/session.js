import {is, merge, isUndefined, guid, namedLog} from '../utils.js';
import {Store} from './store.js';

/**
 * @typedef {object} Session
 * @property {string} id - The id of the session
 * @property {boolean} isNew - Whether it is a brand new session
 * @property {number} timestamp - The timestamp of the session generation
 */

let store;
const logger = namedLog('Core.Session')
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
function setSession(session, timestamp) {
	const d = new Date();
	d.setTime(d.getTime() + store.config.expires);

	const sessionData = {
		value: session,
		expiry: d.valueOf(),
	}
	if(timestamp) {
		sessionData.timestamp = timestamp;
	}
	logger('Setting session', sessionData)

	store.write(sessionData);
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
	let sessionTimestamp;

	if (s) {
		logger("Found session", s)
		const currentDate = new Date();
		const d = currentDate.valueOf();
		const timestamp = currentDate.getTime();
		const exp = parseInt(s.expiry, 10);
		
		// If current session is active.
		if (exp >= d) {
			session = s.value;
			sessionTimestamp = s.timestamp;

			// session is active but no generated timestamp
			if(!sessionTimestamp) {
				logger("Session is valid but no timestamp, generating timestamp.")
				sessionTimestamp = timestamp;
			}
		} else {
			// session has expired, generate a new one along with a new timestamp
			logger("Session has expired, generating new one")
			sessionTimestamp = timestamp;
			session = guid();
			isNew = true;
		}
	}

	// No active session, gen a new one.
	if (!session) {
		logger("No session found, generating new one")
		session = guid();
		sessionTimestamp = new Date().getTime();
		isNew = true;
	}

	// Refreshes the cookie...
	setSession(session, sessionTimestamp);

	return {
		id: session,
		timestamp: sessionTimestamp,
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
