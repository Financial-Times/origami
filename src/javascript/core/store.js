import utils from '../utils';

/**
 * Class for storing data
 * Will choose the 'best' storage method available. Can also specify a type of storage.
 *
 * @class  Store
 * @param {string} name - The name of the store
 * @param {Object=} config - Optional, config object for extra configuration
 */
const Store = function (name, config) {

	/**
	 * Internal Storage key prefix.
	 */
	const keyPrefix = 'o-tracking';


	if (utils.isUndefined(name)) {
		const undefinedName = new Error('You must specify a name for the store.');
		utils.broadcast('oErrors', 'log', {
			error: undefinedName.message,
			info: { module: 'o-tracking' }
		});
		throw undefinedName;
	}

	this.config = utils.merge({ storage: 'best', expires: 10 * 365 * 24 * 60 * 60 * 1000 }, config);

	/**
	 * Store data.
	 */
	this.data = null;

	/**
	 * The key/name of this store.
	 */
	this.storageKey = Object.prototype.hasOwnProperty.call(this.config, 'nameOverride') ? this.config.nameOverride : [keyPrefix, name].join('_');

	/**
	 * The storage method to use. Determines best storage method.
	 *
	 * @type {Object}
	 */
	this.storage = (function (config, window) {
		const test_key = keyPrefix + '_InternalTest';

		// If cookie has been manually specified, don't bother with local storage.
		if (config.storage !== 'cookie') {
			try {
				if (window.localStorage) {
					window.localStorage.setItem(test_key, 'TEST');

					if (window.localStorage.getItem(test_key) === 'TEST') {
						window.localStorage.removeItem(test_key);
						return {
							_type: 'localStorage',
							load: function (name) {
								return window.localStorage.getItem(name);
							},
							save: function (name, value) {
								return window.localStorage.setItem(name, value);
							},
							remove: function (name) {
								return window.localStorage.removeItem(name);
							}
						};
					}
				}
			} catch (error) {
				utils.broadcast('oErrors', 'log', {
					error: error.message,
					info: { module: 'o-tracking' }
				});
			}
		}

		function cookieLoad(name) {
			name = name + '=';

			const cookies = window.document.cookie.split(';');
			let i;
			let cookie;

			for (i = 0; i < cookies.length; i = i + 1) {
				cookie = cookies[i].replace(/^\s+|\s+$/g, '');
				if (cookie.indexOf(name) === 0) {
					return utils.decode(cookie.substring(name.length, cookie.length));
				}
			}

			return null;
		}

		function cookieSave(name, value, expiry) {
			let d;
			let expires = '';

			if (utils.is(expiry, 'number')) {
				d = new Date();
				d.setTime(d.getTime() + expiry);
				expires = 'expires=' + d.toUTCString() + ';';
			}

			const cookie = utils.encode(name) + '=' + utils.encode(value) + ';' + expires + 'path=/;' + (config.domain ? 'domain=.' + config.domain + ';' : '');
			window.document.cookie = cookie;
		}

		function cookieRemove(name) {
			cookieSave(name, '', -1);
		}

		cookieSave(test_key, 'TEST');

		if (cookieLoad(test_key) === 'TEST') {
			cookieRemove(test_key);

			return {
				_type: 'cookie',
				load: cookieLoad,
				save: cookieSave,
				remove: cookieRemove
			};
		}

		return {
			_type: 'none',
			// eslint-disable-next-line no-empty-function
			load: function () {},
			// eslint-disable-next-line no-empty-function
			save: function () {},
			// eslint-disable-next-line no-empty-function
			remove: function () {}
		};
	}(this.config, window));

	/**
	 * Temporary var containing data from a previously saved store.
	 * @property loadStore
	 */
	// Retrieve any previous store with the same name.
	const loadStore = this.storage.load(this.storageKey);
	if (loadStore) {
		try {
			this.data = JSON.parse(loadStore);
		} catch (error) {
			utils.broadcast('oErrors', 'log', {
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
 * @return {Object} Returns the data from the store.
 */
Store.prototype.read = function () {
	return this.data;
};

/**
 * Write the supplied data to the store.
 *
 * @param {String} data - The data to write.
 * @return {Store} - The instance of the store
 */
Store.prototype.write = function (data) {
	// Set this.data, in-case we're on a file:// domain and can't set cookies.
	this.data = data;
	let value;

	if (typeof this.data === 'string') {
		value = this.data;
	} else {
		if (utils.containsCircularPaths(this.data)) {
			const errorMessage = "o-tracking does not support circular references in the analytics data.\n" +
			"Please remove the circular references in the data.\n" +
			"Here are the paths in the data which are circular:\n" +
			JSON.stringify(utils.findCircularPathsIn(this.data), undefined, 4);
			throw new Error(errorMessage);
		}
		value = JSON.stringify(this.data);
	}

	this.storage.save(this.storageKey, value, this.config.expires);

	return this;
};

/**
 * Delete the current data.
 * @return {Store} - The instance of the store
 */
Store.prototype.destroy = function () {
	this.data = null;
	this.storage.remove(this.storageKey);
	return this;
};

export default Store;
export { Store };
