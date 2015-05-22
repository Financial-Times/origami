/**
 * Common utilities for the tracking module.
 * @module Track
 * @submodule _Utils
 * @class Track._Utils
 * @static
 */

/*global module, require, window */
var
    /**
     * An array of characters used by the base-64 encoding methods.
     * @property TRANS_CHARS
     * @private
     * @final
     */
    TRANS_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",

    /**
     * Shared "internal" scope.
     * @property settings
     * @private
     */
    settings = require("./core/settings"),

    /**
     * Record of callbacks to call when a page is tracked.
     * @property page_callbacks
     */
    page_callbacks = [];

module.exports = (function (window) {
    "use strict";

    /**
     * Log messages to the browser console. Requires "log" to be set on init.
     * @method log
     * @param arguments* {Mixed}
     */
    function log() {
        if (settings.get('developer') && window.console) {
            window.console.log.apply(null, arguments);
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
            if (typeof copy !== "undefined" && copy !== null && copy !== '') {
                target[name] = (src === Object(src) && !is(src, 'function') ? merge(src, copy) : copy);
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
     * Encodes a given input string in base64.
     * @method b64encode
     * @param {String} input the string to encode
     * @return {String} The base64-encoded value of the input string.
     */
    function b64encode(input) {
        if (!input) {
            return '';
        }

        input = encode(input);

        if (window.btoa) {
            return window.btoa(input);
        }

        var i, numBytesLeft, value, output = '';

        for (i = 0; i < input.length; i += 3) {
            numBytesLeft = input.length - i;
            value = 0;
            /* jshint -W016 */
            /* jslint bitwise:false */
            value = (input.charCodeAt(i) << 16) & 0x00ff0000;
            value |= (numBytesLeft > 1) ? (input.charCodeAt(i + 1) << 8) & 0x0000ff00 : 0;
            value |= (numBytesLeft > 2) ? input.charCodeAt(i + 2) & 0x000000ff : 0;
            output += TRANS_CHARS.charAt((value & 0x00fC0000) >> 18);
            output += TRANS_CHARS.charAt((value & 0x0003f000) >> 12);
            output += ((numBytesLeft > 1) ? TRANS_CHARS.charAt((value & 0x00000fc0) >> 6) : '_');
            output += ((numBytesLeft > 2) ? TRANS_CHARS.charAt((value & 0x0000003f)) : '_');
            /* jshint +W016 */
            /* jslint bitwise:true */
        }
        return output;
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

        if (Object.hasOwnProperty("keys")) {
            return Object.keys(o);
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

    /**
     * Pad a number below 10.
     * @method pad
     * @param number {Number}
     * @return {String}
     */
    function pad(number) {
        var r = String(number);
        if (r.length === 1) {
            r = '0' + r;
        }
        return r;
    }

    /**
     * IE friendly Date toISOString
     * @method toISOString
     * @param date {Date}
     * @return {String}
     */
    function toISOString(date) {
        if (Date.prototype.hasOwnProperty("toISOString")) {
            return date.toISOString();
        }

        return [
            date.getUTCFullYear(), '-', pad(date.getUTCMonth() + 1), '-', pad(date.getUTCDate()),
            'T',
            pad(date.getUTCHours()), ':', pad(date.getUTCMinutes()), ':', pad(date.getUTCSeconds()),
            '.',
            String((date.getUTCMilliseconds() / 1000).toFixed(3)).slice(2, 5),
            'Z'
        ].join('');
    }

    /**
     * Generate a unique ID.
     * @method createUniqueID
     * @return {String}
     */
    function createUniqueID() {
        return window.history.length + "." + (Math.random() * 1000) + "." + (new Date()).getTime() + "." + hash(window.document.location.href + window.document.referrer);
    }

    /**
     * Utility to add event listeners.
     * @method addEvent
     * @param element
     * @param event
     * @param listener
     */
    function addEvent(element, event, listener) {
        try {
            element.addEventListener(event, listener, false);
        } catch (error) {
            try {
                element.attachEvent("on" + event, listener);
            } catch (err) {}
        }
    }

    /**
     * Listen for page tracking requests.
     * @method onPage
     * @param cb
     */
    function onPage(cb) {
        if (is(cb, 'function')) {
            page_callbacks.push(cb);
        }
    }

    /**
     * Trigger the "page" listeners.
     * @method triggerPage
     */
    function triggerPage() {
        var i;

        for (i = 0; i < page_callbacks.length; i = i + 1) {
            page_callbacks[i]();
        }
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
        unserialize: unserialize,
        b64encode: b64encode,
        toISOString: toISOString,
        createUniqueID: createUniqueID,
        addEvent: addEvent,
        onPage: onPage,
        triggerPage: triggerPage
    };
}(window));