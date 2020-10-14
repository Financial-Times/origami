import {is, isUndefined, broadcast} from '../utils.js';
import {Store} from './store.js';

/**
 * Class for handling a queue backed up by a store.
 *
 * @class Queue
 *
 * @param {string} name - The name of the queue.
 * @returns {Queue} - Returns the instance of the queue.
 */
function Queue (name) {
	if (isUndefined(name)) {
		const undefinedName = new Error('You must specify a name for the queue.');
		broadcast('oErrors', 'log', {
			error: undefinedName.message,
			info: { module: 'o-tracking' }
		});
		throw undefinedName;
	}

	/**
	 * Queue data.
	 *
	 * @type {Array}
	 */
	this.queue = [];

	/**
	 * The storage method to use. Determines best storage method.
	 *
	 * @type {object}
	 */
	this.storage = new Store(name);

	// Retrieve any previous store with the same name.
	if (this.storage.read()) {
		this.queue = this.storage.read();
	}

	return this;
}

/**
 * Gets the contents of the store.
 *
 * @returns {Array} The array of items.
 */
Queue.prototype.all = function () {
	if (this.queue.length === 0) {
		return [];
	}

	const items = [];

	for (let i = 0; i < this.queue.length; i = i + 1) {
		items.push(this.queue[i].item);
	}

	return items;
};

/**
 * Gets the first item in the store.
 *
 * @returns {object} Returns the item.
 */
Queue.prototype.first = function () {
	if (this.queue.length === 0) {
		return null;
	}

	return this.queue[0].item;
};

/**
 * Gets the last item in the store.
 *
 * @returns {object} Returns the item.
 */
Queue.prototype.last = function () {
	if (this.queue.length === 0) {
		return null;
	}

	return this.queue.slice(-1)[0].item;
};

/**
 * Add data to the store.
 *
 * @param {object} item - An item or an array of items.
 *
 * @returns {Queue} - Returns the instance of the queue.
 */
Queue.prototype.add = function (item) {
	// I was trying to turn this whole add function into a little module, to stop doAdd function being created everytime, but couldn't work out how to get to 'this' from within the module.

	const self = this;
	let i;

	function doAdd(item) {
		self.queue.push({
			created_at: new Date().valueOf(),
			item: item
		});
	}

	if (is(item, 'object') && item.constructor.toString().match(/array/i)) {
		for (i = 0; i < item.length; i = i + 1) {
			doAdd(item[i]);
		}
	} else {
		doAdd(item);
	}

	return self;
};

/**
 * Overwrite the store with something completely new.
 *
 * @param {Array} items The new array of data.
 *
 * @returns {Queue} - Returns the instance of the queue.
 */
Queue.prototype.replace = function (items) {
	if (Array.isArray(items)) {
		this.queue = [];
		this.add(items).save();

		return this;
	}

	const invalidArg = new Error('Argument invalid, must be an array.');
	broadcast('oErrors', 'log', {
		error: invalidArg.message,
		info: { module: 'o-tracking' }
	});
	throw invalidArg;
};

/**
 * Pop the first item from the queue.
 *
 * @returns {object} The item.
 */
Queue.prototype.shift = function () {
	if (this.queue.length === 0) {
		return null;
	}

	const item = this.queue.shift().item;

	this.save();

	return item;
};

/**
 * Save the current store to localStorage so that old requests can still be sent after a page refresh.
 *
 * @returns {Queue} - Returns the instance of the queue.
 */
Queue.prototype.save = function () {
	this.storage.write(this.queue);

	return this;
};

export { Queue };
