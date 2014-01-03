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
        if (parent._Utils.isUndefined(click_id)) {
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
        if (parent._Utils.isUndefined(request_id)) {
            request_id = window.history.length + "." + (Math.random() * 1000) + "." + (new Date()).getTime() + "." + parent._Utils.hash(document.location.href + document.referrer);
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
        if (parent._Utils.isUndefined(callback)) {
            callback = function () {};
        }

        config = parent._Utils.merge(parent._Utils.merge(defaultConfig, self.config), parent._Utils.merge(config, { callback: callback }));

        // Used for the queue
        config.requestID = requestID();
        // Values for the request
        config.values = parent._Utils.merge({
            c: '',
            t: config.clickID,
            u: config.requestID,
            o: internalCounter()
        }, config.values);

        parent._Utils.log(config);
    }

    return {
        clickID: clickID,
        track: track
    };
}(Track, window, document));
