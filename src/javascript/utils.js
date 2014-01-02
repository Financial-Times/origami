/*global Track, console*/

/**
 * Common utilities for the tracking module.
 * @module Track
 * @submodule _Utils
 * @class Track._Utils
 * @static
 */
Track._Utils = (function (parent, console) {
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
        if (self.log && console) {
            console.log.apply(null, arguments);
        }
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

        /*jshint forin:false */
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
        /*jshint forin:true */

        return target;
    }

    /**
     * URL encode a string.
     * @method encode
     * @param str {String} The string to be encoded.
     * @return {String} The encoded string.
     */
    function encode(str) {
        return encodeURIComponent(str);
    }

    function serialize(keys, object) {
        var i,
            qs = [];

        for (i = 0; i < keys.length; i++) {
            if (object.hasOwnProperty(keys[i])) {
                qs.push(keys[i] + '=' + encode(object[keys[i]]));
            }
        }

        return qs.join('&');
    }

    return {
        log: log,
        merge: merge,
        encode: encode,
        serialize: serialize
    };
}(Track, console));