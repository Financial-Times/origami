/**
 * Core functionality. Queuing and sending tags
 * @module Track
 * @submodule _Core
 * @class Track._Core
 * @static
 */

/*global module, require */
module.exports = (function () {
    "use strict";

    var
        Send = require("./core/send"),
        User = require("./core/user"),
        Session = require("./core/session"),

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
            callback: function () {},
            tag: {}
        };

    /**
     * Generate and store a new RootID.
     * @method rootID
     * @param [page_id] Optional RootID, if you want to use your own. Otherwise will create one for you.
     * @return {String|*} The RootID.
     */
    function rootID(root_id) {
        root_id = requestID(root_id);
        defaultConfig.tag.rootID = root_id;
        return root_id;
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

        // In-case we're sending events without a page.
        if (!defaultConfig.tag.rootID) {
            rootID();
        }

        var request = utils.merge(utils.merge(defaultConfig), utils.merge(config, { callback: callback }));

        /* Values here are kinda the mandatory ones, so we want to make sure they're possible. */
        request = utils.merge({
            id: requestID(),

            tag: {
                counter: internalCounter()
            },

            user: {
                sessionID: Session.session(),
                userID: User.userID()
            },

            device: {
                userAgent: window.navigator.userAgent
            }
        }, request);

        utils.log('Core.Track', request);

        // Formatting of the request and send it.
        Send.addAndRun(request);
    }

    return {
        setRootID: rootID,
        getRootID: function () { return defaultConfig.tag.rootID; },
        track: track
    };
}());
