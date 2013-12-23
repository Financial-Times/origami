/*global Track, console*/

Track._Utils = (function (parent, console) {
    "use strict";

    // Shared "internal" scope
    var self = parent._self = parent._self || {};

    function log() {
        if (self.log && console) {
            console.log.apply(null, arguments);
        }
    }

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