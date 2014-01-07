(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory();
    }
    else if(typeof define === 'function' && define.amd) {
        define('track', [], factory);
    }
    else {
        root['track'] = factory();
    }
}(this, function() {
// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

/**
 * Origami tracking module.
 * ========================
 * From this specification: https://docs.google.com/a/ft.com/document/d/1F5P3Ip3mIax6kWytYM7Kf6g7LaPS3Njdw7jLXAH1OWI/edit?usp=sharing
 *
 * Features
 * --------
 * * Use AJAX instead of image requests
 * * Bundle requests
 * * Handle offline
 * * Use storage methods other than cookies
 * * Make the API cleaner and easier to use
 * * Origami module
 * * Use a single configuration object
 *
 * Example
 * -------
 * <pre>Track.init({ environment: 'test' });</pre>
 *
 * @module Track
 * @main
 *
 * The Track object.
 * @class Track
 * @static
 * @type {*}
 */

/*jshint -W098 */
var Track = (function (module) {
    /*jshint +W098 */
    "use strict";

    /**
     * Shared "internal" scope.
     * @property _self
     * @type {Object}
     * @private
     */
    var self = module._self = module._self || {};

    /**
     * The version of the tracking module.
     * @property version
     * @type {String}
     */
    module.version = "Track version 0.0.4";

    /**
     * Turn on/off developer mode. (Can also be activated on init.)
     * @method developer
     * @param [level] {Boolean} Turn on or off, defaults to on if omitted.
     */
    module.developer = function (level) {
        if (module._Utils.isUndefined(level)) {
            level = true;
        }

        // Extra brackets on purpose, in case a non-boolean argument is used.
        if ((level)) {
            self.developer = true;
        } else {
            self.developer = null;
            self.noSend = null;
        }
    };

    /**
     * Initialise the Track module.
     * @method init
     * @param config Configuration object
     */
    module.init = function (config) {
        self.config = config;

        module.destroy();

        if (config.hasOwnProperty('developer')) {
            delete config.developer;
            module.developer();

            if (config.hasOwnProperty('noSend')) {
                delete config.noSend;
                self.noSend = true;
            }
        }

        // Initialize the sending queue.
        module._Core.Send.init();

        // Track the page.
        module.page();
    };

    /**
     * Clean up the tracking module.
     * @method destroy
     */
    module.destroy = function () {
        module.developer(false);
        self.internalCounter = 0;
        self.page_sent = false;
    };

    /**
     * Overload toString method to show the version.
     * @method toString
     * @return {String} The module's version.
     */
    module.toString = function () {
        return module.version;
    };

    return module;
}({}));

/*global Track, console, window*/

/**
 * Common utilities for the tracking module.
 * @module Track
 * @submodule _Utils
 * @class Track._Utils
 * @static
 */
Track._Utils = (function (parent, console, window) {
    "use strict";

    /**
     * Shared "internal" scope.
     * @property _self
     * @type {Object}
     * @private
     */
    var self = parent._self = parent._self || {};

    /**
     * Log messages to the browser console. Requires "log" to be set on init.
     * @method log
     * @param arguments* {Mixed}
     */
    function log() {
        if (self.developer && console) {
            console.log.apply(null, arguments);
        }
    }

    /**
     * Tests if variable is a certain type. Defaults to check for undefined if no type specified.
     * @method is
     * @param variable {Mixed} The variable to check.
     * @param [type] {String} The type to test for. Defaults to undefined.
     * @return {Boolean}
     */
    function is(variable, type) {
        if (!type) {
            type = "undefined";
        }
        return typeof variable === type;
    }

    /**
     * Merge objects together. Will remove "falsy" values.
     * @method merge
     * @param target {Object} The original object to merge in to.
     * @param [options] {Object} The object to merge into the target. If omitted, will merge target into a new empty Object.
     * @return {Object} The merged object.
     */
    function merge(target, options) {
        if (!options) {
            options = target;
            target = {};
        }

        var name, src, copy;

        /* jshint -W089 */
        /* jslint forin:false */
        for (name in options) {
            src = target[name];
            copy = options[name];

            // Prevent never-ending loop
            if (target === copy) {
                continue;
            }

            // Gets rid of missing values too
            if (typeof copy !== "undefined" && copy !== null) {
                target[name] = copy;
            }
        }
        /* jshint +W089 */
        /* jslint forin:true */

        return target;
    }

    /**
     * URL encode a string.
     * @method encode
     * @param str {String} The string to be encoded.
     * @return {String} The encoded string.
     */
    function encode(str) {
        try {
            return window.encodeURIComponent(str);
        } catch (error) {
            return window.escape(str);
        }
    }

    /**
     * URL unencode a string.
     * @method unencode
     * @param str {String} The string to be unencoded.
     * @return {String} The unencoded string.
     */
    function unencode(str) {
        try {
            return window.decodeURIComponent(str);
        } catch (error) {
            return window.unescape(str);
        }
    }

    /**
     * Function to create a unique-ish hash of a string.
     * @method hash
     * @param txt
     * @return {String}
     */
    function hash(txt) {
        if (!txt) {
            return "";
        }

        var seed = 0x811c9dc5,
            i;

        /* jshint -W016 */
        /* jslint bitwise:false */
        for (i = 0; i < txt.length; i++) {
            seed += (seed << 1) + (seed << 4) + (seed << 7) + (seed << 8) + (seed << 24);
            seed ^= txt.charCodeAt(i);
        }

        return Number(seed & 0x00000000ffffffff).toString(16);
        /* jshint +W016 */
        /* jslint bitwise:true */
    }

    /**
     * Polyfill for Object.keys as it doesn't exist in older browsers.
     * @method objectKeys
     * @param o {Object} The object to fond the keys from.
     * @return {Array} The keys.
     */
    function objectKeys(o) {
        if (o !== Object(o)) {
            throw new TypeError('Object.keys called on a non-object');
        }

        var k = [], p;

        for (p in o) {
            if (Object.prototype.hasOwnProperty.call(o, p)) {
                k.push(p);
            }
        }
        return k;
    }

    /**
     * For the chosen keys, turns an object into a query string.
     * @method serialize
     * @param object The object containing the values.
     * @param [keys] The keys you want to use in the query string.
     * @return {String} The query string.
     */
    function serialize(object, keys) {
        var i,
            qs = [];

        if (is(keys)) {
            keys = [];
        }

        if (keys.length === 0) {
            keys = objectKeys(object);
        }

        for (i = 0; i < keys.length; i = i + 1) {
            if (object.hasOwnProperty(keys[i])) {
                qs.push(keys[i] + '=' + encode(object[keys[i]]));
            }
        }

        return qs.join('&');
    }

    /**
     * Unserialize a query string into an object. Opposite of serialize.
     * @method unserialize
     * @param qs {String} The query string to turn into an Object.
     * @return {Object}
     */
    function unserialize(qs) {
        var qs_index,
            kv,
            params = {};

        qs = qs.split('&');

        for (qs_index = 0; qs_index < qs.length; qs_index = qs_index + 1) {
            kv = qs[qs_index].split('=');
            params[kv[0]] = kv.slice(1).join('=');
        }

        return params;
    }

    return {
        log: log,
        is: is,
        isUndefined: is,
        merge: merge,
        encode: encode,
        unencode: unencode,
        hash: hash,
        objectKeys: objectKeys,
        serialize: serialize,
        unserialize: unserialize
    };
}(Track, console, window));
/*global Track, window, document*/

/**
 * Core functionality. Queuing and sending tags
 * @module Track
 * @submodule _Core
 * @class Track._Core
 * @static
 */
Track._Core = (function (parent, window, document) {
    "use strict";

    /**
     * Shared "internal" scope.
     * @property _self
     * @type {Object}
     * @private
     */
    var self = parent._self = parent._self || {},
        utils = parent._Utils,
        /**
         * Default properties for sending a tracking request.
         * @property defaultConfig
         * @type {Object}
         * @example
         {
         environment: 'test',
         async: true,
         callback: function () {}
         }
         @private
         */
            defaultConfig = {
            environment: 'test',
            async: true,
            callback: function () {}
        };

    /**
     * Generate and store a new ClickID.
     * @method clickID
     * @param [click_id] Optional ClickID, if you want to use your own. Otherwise will create one for you.
     * @return {String|Mixed} The ClickID.
     */
    function clickID(click_id) {
        if (utils.isUndefined(click_id)) {
            click_id = "t" + (new Date()).valueOf() + "h" + window.history.length;
        }
        defaultConfig.clickID = click_id;
        return click_id;
    }

    /**
     * Create a requestID (unique identifier) for the page impression.
     * @method requestID
     * @param [request_id] Optional RequestID, if you want to use your own. Otherwise will create one for you.
     * @return {String|Mixed} The RequestID.
     * @private
     */
    function requestID(request_id) {
        if (utils.isUndefined(request_id)) {
            request_id = window.history.length + "." + (Math.random() * 1000) + "." + (new Date()).getTime() + "." + utils.hash(document.location.href + document.referrer);
        }

        return request_id;
    }

    /**
     * Count of the number of tracking requests made.
     * @method internalCounter
     * @return {Number}
     * @private
     */
    function internalCounter() {
        self.internalCounter = self.internalCounter + 1;
        return self.internalCounter;
    }

    /**
     * Make a tracking request.
     * @method track
     * @param config Should be passed an object containing a format and the values for that format
     * @param [callback] Fired when the request has been made.
     * @async
     */
    function track(config, callback) {
        if (utils.isUndefined(callback)) {
            callback = function () {};
        }

        var request = utils.merge(utils.merge(defaultConfig, self.config), utils.merge(config, { callback: callback }));

        // Used for the queue
        request.requestID = requestID();
        // Values for the request
        request.values = utils.merge({
            c: '',
            t: request.clickID,
            u: request.requestID,
            o: internalCounter()
        }, request.values);

        utils.log(request);

        parent._Core.Send.addAndRun(request);
    }

    return {
        clickID: clickID,
        track: track
    };
}(Track, window, document));

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

/*global Track, window*/
/**
 * Queuing and sending tags
 * Keep track of individual requests in case any fail due to network errors / being offline / browser being closed mid-request.
 * @module _Core
 * @submodule Send
 * @class Track._Core.Send
 * @static
 */
Track._Core.Send = (function (parent, window) {
    "use strict";

    /**
     * Shared "internal" scope.
     * @property _self
     * @type {Object}
     * @private
     */
    var self = parent._self = parent._self || {},
        utils = parent._Utils,
        /**
         * iJento production server.
         * @property iJentoProdServer
         * @final
         * @private
         */
            iJentoProdServer = 'http://stats.ft.com',
        /**
         * iJento test server.
         * @property iJentoProdServer
         * @final
         * @private
         */
            iJentoTestServer = 'http://statstest.ft.com',
        /**
         * iJento image path.
         * @property trackerUrl
         * @final
         * @private
         */
            iJentoPath = "/si/track.gif",

        /**
         * Queue queue.
         * @property queue
         * @private
         */
            queue,
        /**
         * Requests being sent right now.
         * @property currentRequests
         * @private
         */
            currentRequests = {};

    /**
     * Marks a request as current.
     * @method started
     * @param id {String} The ID of the request.
     * @private
     */
    function started(id) {
        currentRequests[id] = true;
    }

    /**
     * Marks a request as no longer current.
     * @method finished
     * @param id {String} The ID of the request.
     * @private
     */
    function finished(id) {
        delete currentRequests[id];
    }

    /**
     * Marks a request as no longer current and removes it from the queue.
     * @method success
     * @param id {String} The ID of the request.
     * @private
     */
    function success(id) {
        finished(id);

        var replacement = queue.all(),
            i;

        for (i = 0; i < replacement.length; i = i + 1) {
            if (id === replacement[i].requestID) {
                replacement.splice(i, 1);
                queue.replace(replacement).save();
                break;
            }
        }
    }

    /**
     * Generates an Adler 32 checksum of the input data.
     * @method generateChecksum
     * @param input {String} The input string.
     * @return {String} The checksum.
     * @private
     */
    function generateChecksum(input) {
        var a = 1,
            b = 0,
            i,
            chk;

        for (i = 0; i < input.length; i = i + 1) {
            a += input.charCodeAt(i);
            b += a;
        }

        // A and B must be modulo 65521 (the largest prime number smaller than 2^16)
        a %= 65521;
        b %= 65521;

        chk = (b * 65536) + a;
        return chk.toString(16);
    }

    /**
     * Encodes a given input string in base64.
     * @method encodeString
     * @param input {String} The string to encode.
     * @return {String} The base64-encoded value of the input string.
     * @private
     */
    function encodeString(input) {
        if (!input) {
            return '';
        }

        try {
            return window.btoa(utils.unencode(utils.encode(input)));
        } catch (error) {
            var TRANS_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                output = [],
                i,
                numBytesLeft,
                value;
            /* jshint -W016 */
            /* jslint bitwise:false */
            for (i = 0; i < input.length; i += 3) {
                numBytesLeft = input.length - i;
                value = 0;
                value = (input.charCodeAt(i) << 16) & 0x00ff0000;
                value |= (numBytesLeft > 1) ? (input.charCodeAt(i + 1) << 8) & 0x0000ff00 : 0;
                value |= (numBytesLeft > 2) ? input.charCodeAt(i + 2) & 0x000000ff : 0;

                output.push(TRANS_CHARS.charAt((value & 0x00fC0000) >> 18));
                output.push(TRANS_CHARS.charAt((value & 0x0003f000) >> 12));
                output.push((numBytesLeft > 1) ? TRANS_CHARS.charAt((value & 0x00000fc0) >> 6) : '_');
                output.push((numBytesLeft > 2) ? TRANS_CHARS.charAt((value & 0x0000003f)) : '_');
            }
            /* jshint +W016 */
            /* jslint bitwise:true */
            return output.join('');
        }
    }

    /**
     * Encode the values into an iJento string.
     * @method encodeDetails
     * @param format {String} The format (or ordering) of the values.
     * @param values {Object} The values to encode.
     * @return {String} The encoded string.
     * @private
     */
    function encodeDetails(format, values) {
        format = format.split('');

        var i,
            output = [];

        for (i = 0; i < format.length; i = i + 1) {
            output.push(encodeString(values[format[i]]));
        }

        return output.join('*')  + "*";
    }

    /**
     * Get the tracking pixel url for the chosen environment.
     * @method taggingServer
     * @param [environment] {String} The environment. Either <code>production</code> or <code>test</code>.
     * @return {String} Host and path of the iJento tracking pixel.
     * @private
     */
    function taggingServer(environment) {
        return (environment === 'production' ? iJentoProdServer : iJentoTestServer) + iJentoPath;
    }

    /**
     * Attempts to send a tracking request.
     * @method sendRequest
     * @param request {Object} The request to be sent.
     * @param callback {Function} Callback to fire the next item in the queue.
     * @private
     * @async
     */
    function sendRequest(request, callback) {
        /* Example request:
         *  {
         *      environment: 'test',
         *      clickID: 't1388678300273',
         *      async: false,
         *      callback: [Function],
         *      format: 'pcrtgyuo',
         *      values: {
         *          c: '',
         *          t: 't1388678300273',
         *          u: '8.289.8675019387156.1388678301549.-fdc94dd',
         *          o: 1,
         *          p: 'http://www.ft.com/home/uk',
         *          r: '',
         *          g: 'co=24&sr=1920x1080<=2014-01-02T15%3A58%3A20.273Z&jv=',
         *          y: 'page'
         *      },
         *      requestID: '8.289.8675019387156.1388678301549.-fdc94dd',
         *      queueTime: 1234
         *  }
         */
        var offlineLag = (new Date()).getTime() - request.queueTime,
            query,
            checksum,
            path,
            xmlHttp;

        // Only bothered about offlineLag if it's longer than a second, but less than a month. (Especially as Date can be dodgy)
        if (offlineLag > 1000 && offlineLag < (31 * 24 * 60 * 60 * 1000)) {
            request.offlineLag = offlineLag; // TODO
            request.values.p += (request.values.p.indexOf('?') === -1 ? '?' : '&') + 'offlineLag=' + offlineLag;
        }

        query = "f=" + request.format + "&d=" + encodeDetails(request.format, request.values);
        checksum = "&c=" + generateChecksum(query);

        try {
            // code for IE7+, Firefox, Chrome, Opera, Safari
            xmlHttp = new window.XMLHttpRequest();
        } catch (e) {
            // code for IE6, IE5
            try {
                xmlHttp = new window.ActiveXObject("Microsoft.XMLHttp");
            } catch (ee) {
                // TODO imagetag
            }
        }

        function requestFinished() {
            if (utils.is(request.callback, 'function')) {
                request.callback.call(request, xmlHttp);
            }
            if (xmlHttp.status >= 200 && xmlHttp.status < 300) {
                success(request.requestID);
                callback();
            } else {
                finished(request.requestID);
                // TODO Wait a bit, then try again?
            }
        }

        if (request.async) {
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState === 4) {
                    requestFinished();
                }
            };
            xmlHttp.onerror = requestFinished;
        }

        started(request.requestID);

        path = [query, checksum].join('');

        if (self.developer) {
            utils.log(taggingServer(request.environment) + '?' + path);
        }

        // Both developer and noSend flags have to be set to stop the request sending.
        if (!(self.developer && self.noSend)) {
            xmlHttp.open("POST", taggingServer(request.environment), request.async);
            xmlHttp.send(path);
        }

        if (!request.async) {
            requestFinished();
        }
    }

    /**
     * Adds a new request to the list of pending requests
     * @method add
     * @param request The request to queue
     */
    function add(request) {
        request.queueTime = (new Date()).getTime();

        queue.add(request).save();

        if (self.developer) {
            utils.log('Queue', queue);
        }
    }

    /**
     * If there are any requests queued, attempts to send the next one
     * Otherwise, does nothing
     * @method run
     */
    function run() {
        var nextRequest = queue.first();

        if (!nextRequest) {
            return;
        }

        // Send this request, then try run again.
        sendRequest(nextRequest, run);
    }

    /**
     * Convenience function to add and run a request all in one go.
     * @method addAndRun
     * @param request {Object} The request to queue and run.
     */
    function addAndRun(request) {
        add(request);
        run();
    }

    /**
     * Init the queue and send any leftover tags.
     * @method init
     * @private
     */
    function init() {
        queue = new Track._Core.Queue('requests');

        // If any tracking calls are made whilst offline, try sending them the next time the device comes online
        if (window.addEventListener) {
            window.addEventListener("online", run);
        }

        // On startup, try sending any requests queued from a previous session.
        run();
    }

    return {
        init: init,
        add: add,
        run: run,
        addAndRun: addAndRun
    };
}(Track, window));

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
    this.data = null;

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

    /**
     * The storage method to use. Determines best storage method.
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
        this.data = JSON.parse(loadStore);
    }

    return this;
};

/**
 * Get/Read the current data.
 * @method read
 * @return Returns the data from the store.
 */
Track._Core.Store.prototype.read = function () {
    "use strict";
    return this.data;
};

/**
 * Write the supplied data to the store.
 * @method write
 * @param data {String} The data to write.
 * @return Returns this.
 * @chainable
 */
Track._Core.Store.prototype.write = function (data) {
    "use strict";

    // Set this.data, in-case we're on a file:// domain and can't set cookies.
    this.data = data;
    this.storage.save(this.storageKey, JSON.stringify(this.data));

    return this;
};

/**
 * Delete the current data.
 * @method destroy
 * @return Returns this.
 * @chainable
 */
Track._Core.Store.prototype.destroy = function () {
    "use strict";
    this.data = null;
    this.storage.remove(this.storageKey);
    return this;
};

/*global Track, window, document*/

/**
 * Page functionality. For tracking a page.
 * @module Track
 * @submodule page
 * @class Track.page
 * @static
 */
Track.page = (function (module, window, document) {
    "use strict";

    /**
     * Format of the page tracking request.
     * @property format
     * @final
     * @type {String}
     * @private
     */
    var format = 'pcrtgyuo',

        /**
         * Shared "internal" scope.
         * @property _self
         * @type {Object}
         * @private
         */
            self = module._self = module._self || {},
        utils = module._Utils,

        /**
         * Default properties for page tracking requests.
         * @example
         {
         url: document.URL,
         referrer: document.referrer,

         co: window.screen.colorDepth,
         sr: window.screen.width + 'x' + window.screen.height,
         lt: (new Date()).toISOString(),
         jv: (window.navigator.javaEnabled() ? '1' : '0'),

         async: false // Send this tag syncronously
         }
         * @property defaultPageConfig
         * @type {Object}
         * @private
         */
            defaultPageConfig = {
            url: document.URL,
            referrer: document.referrer,

            co: window.screen.colorDepth,
            sr: window.screen.width + 'x' + window.screen.height,
            lt: (new Date()).toISOString(),
            jv: (window.navigator.javaEnabled() ? '1' : '0'),

            async: false // Send this tag syncronously
        };

    /**
     * Constructs a URL in the format required by iJento, allowing different inputs.
     * @method url
     * @param u {String} A URL or path. e.g. http://www.ft.com/markets or /markets
     * @return {String} The full URL in the correct format.
     * @private
     */
    function url(u) {
        if (utils.isUndefined(u)) {
            throw new Error('URL must be specified');
        }

        if (u.indexOf('://') === -1) {
            if (u.substring(0, 1) !== '/') {
                u = '/' + u;
            }

            u = document.location.protocol + "//" + document.location.hostname + u;
        }

        if (u.indexOf('?') === -1) {
            u = u + window.location.search;
        } else {
            // Merge query string params to avoid duplicates.
            u = u.substr(0, u.indexOf('?')) + "?" + utils.serialize(utils.merge(utils.unserialize(window.location.search.substring(1)), utils.unserialize(u.substr(u.indexOf('?') + 1))));
        }

        return u;
    }

    /**
     * Make the page tracking request.
     * @method page
     * @param [config] {Object} Configuration object. If omitted, will use the defaults.
     * @param [callback] {Function} Callback function. Called when request completed.
     * @async
     */
    return function (config, callback) {
        config = utils.merge(defaultPageConfig, config);

        // New ClickID for a new Page.
        module._Core.clickID();
        module._Core.track({
            async: config.async,
            format: format,
            values: {
                p: url(config.url), // Page
                // c: Cookie, set in Core later,
                r: config.referrer, // Referrer
                // t: Click ID, set in Core later.
                g: utils.serialize(config, ['co', 'sr', 'lt', 'jv']),
                y: 'page'
                // u: Unique click ID, set in Core later,
                // o: Internal counter, set in Core later
            }
        }, callback);

        self.page_sent = true;
    };

}(Track, window, document));


    return Track;
}));
