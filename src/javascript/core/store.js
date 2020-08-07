import utils from '../utils';

/**
 * Class for storing data
 * Will choose the 'best' storage method available. Can also specify a type of storage.
 *
 * @class  Store
 * @param {string} name - The name of the store
 * @param {Object} config - Optional, config object for extra configuration
 * @param {String=} config.nameOverride - The internal name for the store
 */
const Store = function (name, config = {}) {

	/**
	 * Internal Storage key prefix.
	 */
	const keyPrefix = 'o-tracking';


	if (typeof name !== 'string' || name === '') {
		const undefinedName = new Error('You must specify a name for the store.');
		utils.broadcast('oErrors', 'log', {
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
	this.storageKey = Object.prototype.hasOwnProperty.call(this.config, 'nameOverride') ? this.config.nameOverride : [keyPrefix, name].join('_');

	/**
	 * The storage method to use.
	 *
	 * @type {Object}
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
			return window.localStorage.removeItem(name);
		}
	};

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

	this.storage.save(this.storageKey, value);

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
