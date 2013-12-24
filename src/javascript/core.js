/*global Track, window, document*/

/*
 * Core functionality. Queuing and sending tags
 *
 * @class Track._Core
 */
Track._Core = (function (parent, window, document) {
    "use strict";

    // Shared "internal" scope
    var self = parent._self = parent._self || {},

        defaultConfig = {
            environment: 'test',
            clickID: "t" + (new Date()).valueOf(),
            async: true,
            callback: function () {}
        };

    function hash(txt) {
        if (!txt) {
            return "";
        }

        var seed = 0x811c9dc5,
            i;

        for (i = 0; i < txt.length; i++) {
            seed += (seed << 1) + (seed << 4) + (seed << 7) + (seed << 8) + (seed << 24);
            seed ^= txt.charCodeAt(i);
        }

        return Number(seed & 0x00000000ffffffff).toString(16);
    }

    function uniqueIdentifier() {
        return window.history.length + "." + (Math.random() * 1000) + "." + (new Date()).getTime() + "." + hash(document.location.href + document.referrer);
    }

    function internalCounter() {
        return self.internalCounter++;
    }

    /*
        Track
         config: Should be passed an object containing a format and the values for that format
         callback: Fired when the request has been made.
     */
    function track(config, callback) {
        config = parent._Utils.merge(parent._Utils.merge(defaultConfig, self.config), parent._Utils.merge(config, { callback: callback }));

        config.values = parent._Utils.merge({
            c: '',
            t: config.clickID,
            u: uniqueIdentifier(),
            o: internalCounter()
        }, config.values);

        parent._Utils.log(config);
    }

    return {
        track: track
    };
}(Track, window, document));
