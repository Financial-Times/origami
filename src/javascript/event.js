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

    if (!window.Element.prototype.addEventListener) {
        window.Element.prototype.addEventListener = function (type, listener) {
            this.attachEvent("on" + type, listener);
        };
    }

    /**
     * Track an event.
     * @method event
     * @param model The model, for example: comment, video, slideshow
     * @param type The type of event, for example: play, share
     * @param [value] Optional, the value, defaults to true. Examples include the video play amount - 50%, or slideshow slide number.
     * @param [callback] {Function} Callback function. Called when request completed.
     * @async
     */
    function event(model, type, value, callback) {
        var config = utils.merge(utils.merge(defaultEventConfig), {
            eventModel: model,
            eventType: type,
            eventData: value
        });
        Core.track(config, callback);
    }

    window.addEventListener('oTracking.Event', function (e) { event(e.model, e.type, e.value); }, false);

    return event;

}(window));

