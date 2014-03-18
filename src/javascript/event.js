/**
 * For tracking multiple events per page.
 * @module Track
 * @submodule event
 * @class Track.event
 * @static
 */

/*global module, require, window */
module.exports = (function (window) {
    "use strict";

    var
        Core = require("./core"),
        utils = require("./utils"),

        /**
         * Default properties for events.
         * @property defaultEventConfig
         * @type {Object}
         * @private
         */
        defaultEventConfig = {
            type: 'event'
        };

    /**
     * Make the page tracking request.
     * @method data
     * @param [config] {Object} Configuration object. If omitted, will use the defaults.
     * @param [callback] {Function} Callback function. Called when request completed.
     * @async
     */
    function event(type, value, callback) {
        var config = utils.merge(defaultEventConfig, {
            eventType: type,
            eventData: value
        });
        Core.track(config, callback);
    }

    window.addEventListener('oTrackingEvent', event, false);

    return event;

}(window));

