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
            tag: { type: 'event' },
            event: {}
        };

    /**
     * Track an event.
     * @method event
     * @param model The model, for example: comment, video, slideshow
     * @param category The category of event, for example: video
     * @param action The action performed, for example: play
     * @param [key] Optional, a key for naming an arbitrary value. Examples include the video play amount - 50%, or slideshow slide number.
     * @param [value] Optional, the value. Examples include the video play amount - 50%, or slideshow slide number.
     * @param [callback] {Function} Callback function. Called when request completed.
     * @async
     */
    function event(category, action, key, value, callback) {
        var config = utils.merge(utils.merge(defaultEventConfig), {
            event: {
                category: category,
                action: action,
                key: key,
                value: value
            }
        });
        Core.track(config, callback);
    }

    utils.addEvent(window, 'oTracking.event', function (e) { event(e.category, e.action, e.key, e.value); });

    return event;

}(window));

