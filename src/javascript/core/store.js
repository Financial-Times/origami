/*global Track, window*/
/**
 * Class for storing data
 * Will choose the "best" storage method available. Can also specify a type of storage.
 * @module _Core
 * @submodule Store
 * @class Track._Core.Store
 * @param name {String} The name of the store.
 * @param [config] {Object} Optional config object for extra configuration.
 * @constructor
 */
Track._Core.Store = function (name, config) {
    "use strict";

    if (Track._Utils.isUndefined(name)) {
        throw new Error('You must specify a name for the store.');
    }

    this.config = Track._Utils.merge({ storage: 'best', expires: '10 years' }, config);

    /**
     * Store data.
     * @property store
     * @private
     */
    this.store = [];
    /**
     * Internal Storage key prefix.
     * @property keyPrefix
     * @final
     * @private
     */
    var keyPrefix = "o-tracking-module",
        /**
         * Temporary var containing data from a previously saved store.
         * @property loadStore
         * @private
         */
            loadStore;

    /**
     * The key/name of this store.
     * @property storageKey
     */
    this.storageKey = [keyPrefix, name].join('_');

    // Determine best storage method.
    /**
     * The storage method to use.
     * @property storage
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
            name = name + "=";

            var cookies = window.document.cookie.split(';'),
                i,
                cookie;

            for (i = 0; i < cookies.length; i = i + 1) {
                cookie = cookies[i].trim();
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

            if (Track._Utils.is(expiry, 'number')) {
                d = new Date();
                d.setTime(d.getTime() + (expiry * 24 * 60 * 60 * 1000));
                expires = "expires=" + d.toGMTString() + ';';
            }

            cookie = Track._Utils.encode(name) + '=' + Track._Utils.encode(value) + ";" + expires + 'path=/;';
            window.document.cookie = cookie;
        }

        function cookieRemove(name) {
            cookieSave(name, '', -1);
        }

        cookieSave(test_key, "TEST");

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
        this.store = JSON.parse(loadStore);
    }

    return this;
};

/**
 * Gets the contents of the store.
 * @method all
 * @return {Array} The array of items.
 */
Track._Core.Store.prototype.all = function () {
    "use strict";

    if (this.store.length === 0) {
        return null;
    }

    var items = [],
        i;

    for (i = 0; i < this.store.length; i = i + 1) {
        items.push(this.store[i].item);
    }

    return items;
};

/**
 * Gets the first item in the store.
 * @method first
 * @return {Mixed} Returns the item.
 */
Track._Core.Store.prototype.first = function () {
    "use strict";

    if (this.store.length === 0) {
        return null;
    }

    return this.store[0].item;
};

/**
 * Gets the last item in the store.
 * @method last
 * @return {Mixed} Returns the item.
 */
Track._Core.Store.prototype.last = function () {
    "use strict";

    if (this.store.length === 0) {
        return null;
    }

    return this.store.slice(-1).item;
};

Track._Core.Store.prototype.id = function () {
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
Track._Core.Store.prototype.add = function (item) {
    "use strict";

    var self = this,
        i;

    // I was trying to turn this whole add function into a little module, to stop doAdd function being created everytime, but couldn't work out how to get to "this" from within the module.
    function doAdd(item) {
        self.store.push({
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
Track._Core.Store.prototype.replace = function (items) {
    "use strict";

    if (Track._Utils.is(items, 'object') && items.constructor.toString().match(/array/i)) {
        this.store = [];
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
Track._Core.Store.prototype.save = function () {
    "use strict";

    this.storage.save(this.storageKey, JSON.stringify(this.store));

    return this;
};
