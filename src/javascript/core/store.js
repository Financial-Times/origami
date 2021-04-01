import {broadcast, containsCircularPaths, decode, encode, findCircularPathsIn, is} from '../utils.js';

/**
 * Class for storing data
 * Will choose the 'best' storage method available. Can also specify a type of storage.
 *
 * @class  Store
 * @param {string} name - The name of the store
 * @param {object} config - Optional, config object for extra configuration
 * @param {string} [config.nameOverride] - The internal name for the store
 * @param {string} [config.domain] - The domain that should be used to store cookies on
 */
const Store = function (name, config = {}) {

	/**
	 * Internal Storage key prefix.
	 */
	const keyPrefix = 'o-tracking';


	if (typeof name !== 'string' || name === '') {
		const undefinedName = new Error('You must specify a name for the store.');
		broadcast('oErrors', 'log', {
			error: undefinedName.message,
			info: { module: 'o-tracking' }
		});
		throw undefinedName;
	}

	this.config = Object.assign({}, config);

	/**
	 * Store data.
	 */
	this.data = null;

	/**
	 * The key/name of this store.
	 */
	this.storageKey = this.config.nameOverride ? this.config.nameOverride : [keyPrefix, name].join('_');

	/**
	 * The storage method to use.
	 *
	 * @type {object}
	 */
	this.storage = {
		_type: 'localStorage',
		load: function (name) {
			return window.localStorage.getItem(name);
		},
		save: function (name, value) {
			return window.localStorage.setItem(name, value);
		},
		remove: function (name) {
			// We attempt to remove the item from the old cookie storage
			// because otherwise the next time o-tracking is initialised for
			// this user, it will import the old value which was meant to
			// have been removed.
			cookieRemove(name);
			return window.localStorage.removeItem(name);
		}
	};

	function cookieLoad(name) {
		name = name + '=';

		const cookies = window.document.cookie.split(';');
		let i;
		let cookie;

		for (i = 0; i < cookies.length; i = i + 1) {
			cookie = cookies[i].replace(/^\s+|\s+$/g, '');
			if (cookie.indexOf(name) === 0) {
				return decode(cookie.substring(name.length, cookie.length));
			}
		}

		return null;
	}

	function cookieSave(name, value, expiry) {
		let d;
		let expires = '';

		if (is(expiry, 'number')) {
			d = new Date();
			d.setTime(d.getTime() + expiry);
			expires = 'expires=' + d.toUTCString() + ';';
		}

		const cookie = encode(name) + '=' + encode(value) + ';' + expires + 'path=/;' + (config.domain ? 'domain=.' + config.domain + ';' : '');
		window.document.cookie = cookie;
	}

	function cookieRemove(name) {
		cookieSave(name, '', -1);
	}

	/**
	 * Temporary var containing data from a previously saved store.
	 *
	 * @property {string|undefined} loadStore - JSON string of the previously saved store or undefined.
	 */
	// Retrieve any previous store with the same name.
	const loadStore = this.storage.load(this.storageKey);
	if (loadStore) {
		try {
			this.data = JSON.parse(loadStore);
		} catch (error) {
			broadcast('oErrors', 'log', {
				error: error.message,
				module: 'o-tracking'
			});
			this.data = loadStore;
		}
	}

	// If the user has previous data stored in the old cookie storage system
	// import the data into the new storage system and remove them from the cookie.
	const oldCookieStoreData = cookieLoad(this.storageKey);
	if (oldCookieStoreData) {
		try {
			if (this.storageKey === 'spoor-id') {
				// spoor-id is stored directly as a string and not as an object
				this.data = oldCookieStoreData;
			} else {
				const data = JSON.parse(oldCookieStoreData);
				if (this.data) {
					Object.assign(this.data, data);
				} else {
					this.data = data;
				}
				for (const name of Object.keys(data)) {
					if (name !== 'spoor-id') {
						cookieRemove(name);
					}
				}
			}
		} catch (error) {
			broadcast('oErrors', 'log', {
				error: error.message,
				module: 'o-tracking'
			});
			this.data = loadStore;
		}
	}

	return this;
};

/**
 * Get/Read the current data.
 *
 * @returns {object} Returns the data from the store.
 */
Store.prototype.read = function () {
	return this.data;
};

/**
 * Write the supplied data to the store.
 *
 * @param {string} data - The data to write.
 * @returns {Store} - The instance of the store
 */
Store.prototype.write = function (data) {
	// Set this.data, in-case we're on a file:// domain and can't set cookies.
	this.data = data;
	let value;

	if (typeof this.data === 'string') {
		value = this.data;
	} else {
		if (containsCircularPaths(this.data)) {
			const errorMessage = "o-tracking does not support circular references in the analytics data.\n" +
			"Please remove the circular references in the data.\n" +
			"Here are the paths in the data which are circular:\n" +
			JSON.stringify(findCircularPathsIn(this.data), undefined, 4);
			throw new Error(errorMessage);
		}
		value = JSON.stringify(this.data);
	}

	this.storage.save(this.storageKey, value);

	return this;
};

/**
 * Delete the current data.
 *
 * @returns {Store} - The instance of the store
 */
Store.prototype.destroy = function () {
	this.data = null;
	this.storage.remove(this.storageKey);
	return this;
};

export { Store };
