/*global Track */
/**
 * Class for handling a queue backed up by a store.
 * @module _Core
 * @submodule Queue
 * @class Track._Core.Queue
 * @param name {String} The name of the queue.
 * @constructor
 */
Track._Core.Queue = function (name) {
    "use strict";

    if (Track._Utils.isUndefined(name)) {
        throw new Error('You must specify a name for the queue.');
    }

    /**
     * Queue data.
     * @property queue
     * @private
     */
    this.queue = [];

    /**
     * The storage method to use. Determines best storage method.
     * @property storage
     * @type {Object}
     */
    this.storage = new Track._Core.Store(name);

    // Retrieve any previous store with the same name.
    if (this.storage.read()) {
        this.queue = this.storage.read();
    }

    return this;
};

/**
 * Gets the contents of the store.
 * @method all
 * @return {Array} The array of items.
 */
Track._Core.Queue.prototype.all = function () {
    "use strict";

    if (this.queue.length === 0) {
        return null;
    }

    var items = [],
        i;

    for (i = 0; i < this.queue.length; i = i + 1) {
        items.push(this.queue[i].item);
    }

    return items;
};

/**
 * Gets the first item in the store.
 * @method first
 * @return {Mixed} Returns the item.
 */
Track._Core.Queue.prototype.first = function () {
    "use strict";

    if (this.queue.length === 0) {
        return null;
    }

    return this.queue[0].item;
};

/**
 * Gets the last item in the store.
 * @method last
 * @return {Mixed} Returns the item.
 */
Track._Core.Queue.prototype.last = function () {
    "use strict";

    if (this.queue.length === 0) {
        return null;
    }

    return this.queue.slice(-1).item;
};

Track._Core.Queue.prototype.id = function () {
    "use strict";

    return (Math.random() * 10000) + "." + (new Date()).getTime();
};

/**
 * Add data to the store.
 * @method add
 * @param item {*} An item or an array of items.
 * @return Returns this.
 * @chainable
 */
Track._Core.Queue.prototype.add = function (item) {
    "use strict";

    var self = this,
        i;

    // I was trying to turn this whole add function into a little module, to stop doAdd function being created everytime, but couldn't work out how to get to "this" from within the module.
    function doAdd(item) {
        self.queue.push({
            created_at: (new Date()).valueOf(),
            id: self.id(),
            item: item
        });
    }

    if (Track._Utils.is(item, 'object') && item.constructor.toString().match(/array/i)) {
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
 * @method replace
 * @param items {Array} The new array of data.
 * @return Returns this.
 * @chainable
 */
Track._Core.Queue.prototype.replace = function (items) {
    "use strict";

    if (Track._Utils.is(items, 'object') && items.constructor.toString().match(/array/i)) {
        this.queue = [];
        this.add(items).save();

        return this;
    }

    throw new Error('Argument invalid, must be an array.');
};

/**
 * Save the current store to localStorage so that old requests can still be sent after a page refresh.
 * @method save
 * @return Returns this.
 * @chainable
 */
Track._Core.Queue.prototype.save = function () {
    "use strict";

    this.storage.write(this.queue);

    return this;
};
