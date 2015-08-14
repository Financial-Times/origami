/*global module, require, window */
'use strict';

/**
 * @class  Store
 * Class for storing data
 * Will choose the 'best' storage method available. Can also specify a type of storage.
 *
 * @param {string} name   The name of the store
 * @param {Object} config Optional, config object for extra configuration
 */
var Store = function (name, config) {

	/**
	 * Internal Storage key prefix.
	 */
	var keyPrefix = 'o-tracking';

	/**
	 * Temporary var containing data from a previously saved store.
	 * @property loadStore
	 */
	var loadStore;

	var utils = require('../utils');

	if (utils.isUndefined(name)) {
		throw new Error('You must specify a name for the store.');
	}

	this.config = utils.merge({ storage: 'best', expires: (10 * 365 * 24 * 60 * 60 * 1000) }, config);

	/**
	 * Store data.
	 */
	this.data = null;

	/**
	 * The key/name of this store.
	 */
	this.storageKey = (this.config.hasOwnProperty('nameOverride') ? this.config.nameOverride : [keyPrefix, name].join('_'));

	/**
	 * The storage method to use. Determines best storage method.
	 *
	 * @type {Object}
	 */
	this.storage = (function (config, window) {
		var test_key = keyPrefix + '_InternalTest';

		// If cookie has been manually specified, don't bother with local storage.
		if (config.storage !== 'cookie') {
			try {
				if (window.localStorage) {
					window.localStorage.setItem(test_key, 'TEST');

					if (window.localStorage.getItem(test_key) === 'TEST') {
						window.localStorage.removeItem(test_key);

						return {
							_type: 'localStorage',
							load: function (name) { return window.localStorage.getItem.call(window.localStorage, name); },
							save: function (name, value) { return window.localStorage.setItem.call(window.localStorage, name, value); },
							remove: function (name) { return window.localStorage.removeItem.call(window.localStorage, name); }
						};
					}
				}
			} catch (error) {
			}
		}

		function cookieLoad(name) {
			name = name + '=';

			var cookies = window.document.cookie.split(';'),
				i,
				cookie;

			for (i = 0; i < cookies.length; i = i + 1) {
				cookie = cookies[i].replace(/^\s+|\s+$/g, '');
				if (cookie.indexOf(name) === 0) {
					return cookie.substring(name.length, cookie.length);
				}
			}

			return null;
		}

		function cookieSave(name, value, expiry) {
			var d,
				expires = '',
				cookie;

			if (utils.is(expiry, 'number')) {
				d = new Date();
				d.setTime(d.getTime() + expiry);
				expires = 'expires=' + d.toGMTString() + ';';
			}

			cookie = utils.encode(name) + '=' + utils.encode(value) + ';' + expires + 'path=/;' + (config.domain ? 'domain=.' + config.domain + ';' : '');
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
			load: function () {},
			save: function () {},
			remove: function () {}
		};
	}(this.config, window));

	// Retrieve any previous store with the same name.
	loadStore = this.storage.load(this.storageKey);
	if (loadStore) {
		try {
			this.data = JSON.parse(loadStore);
		} catch (error) {
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
 * @param data {String} The data to write.
 *
 * @return {Store}
 */
Store.prototype.write = function (data) {
	// Set this.data, in-case we're on a file:// domain and can't set cookies.
	this.data = data;
	this.storage.save(this.storageKey, (typeof this.data === 'string' ? this.data : JSON.stringify(this.data)), this.config.expires);

	return this;
};

/**
 * Delete the current data.
 * @return {Store}
 */
Store.prototype.destroy = function () {
	this.data = null;
	this.storage.remove(this.storageKey);
	return this;
};

module.exports = Store;
