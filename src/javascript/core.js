/**
 * Core functionality. Queuing and sending tags
 * @module Track
 * @submodule _Core
 * @class Track._Core
 * @static
 */

/*global module, require, window*/
module.exports = (function (window) {
    "use strict";

    var
        Send = require("./core/send"),
        User = require("./core/user"),

        /**
         * Shared "internal" scope.
         * @property _self
         * @type {Object}
         * @private
         */
        settings = require("./core/settings"),

        utils = require("./utils"),
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
            async: true,
            callback: function () {}
        };

    /**
     * Generate and store a new ClickID.
     * @method clickID
     * @param [click_id] Optional ClickID, if you want to use your own. Otherwise will create one for you.
     * @return {String|*} The ClickID.
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
     * @return {String|*} The RequestID.
     * @private
     */
    function requestID(request_id) {
        if (utils.isUndefined(request_id)) {
            request_id = utils.createUniqueID();
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
        settings.set('internalCounter', settings.get('internalCounter') + 1);
        return settings.get('internalCounter');
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

        var request = utils.merge(utils.merge(defaultConfig), utils.merge(config, { callback: callback }));

        /* Values here are kinda the mandatory ones, so we want to make sure they're possible. */
        request = utils.merge({
            userID: User.userID(),
            clickID: request.clickID,
            requestID: requestID(), // Used for the queue
            counter: internalCounter()
        }, request);

        utils.log(request);

        Send.addAndRun(request);
    }

    return {
        setClickID: clickID,
        getClickID: function () { return defaultConfig.clickID; },
        track: track
    };
}(window));
