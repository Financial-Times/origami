/**
 * Page functionality. For tracking a page.
 * @module Track
 * @submodule page
 * @class Track.page
 * @static
 */

/*global module, require, window, document */
module.exports = (function (window, document) {
    "use strict";

    /**
     * Format of the page tracking request.
     * @property format
     * @final
     * @type {String}
     * @private
     */
    var format = 'pcrtgyuo',

        /**
         * Shared "internal" scope.
         * @property _self
         * @type {Object}
         * @private
         */
        settings = require("./core/settings"),
        utils = require("./utils"),

        /**
         * Default properties for page tracking requests.
         * @example
         {
         url: document.URL,
         referrer: document.referrer,

         co: window.screen.colorDepth,
         sr: window.screen.width + 'x' + window.screen.height,
         lt: (new Date()).toISOString(),
         jv: (window.navigator.javaEnabled() ? '1' : '0'),

         async: false // Send this tag syncronously
         }
         * @property defaultPageConfig
         * @type {Object}
         * @private
         */
            defaultPageConfig = {
            url: document.URL,
            referrer: document.referrer,

            co: window.screen.colorDepth,
            sr: window.screen.width + 'x' + window.screen.height,
            lt: (new Date()).toISOString(),
            jv: (window.navigator.javaEnabled() ? '1' : '0'),

            async: false // Send this tag syncronously
        };

    /**
     * Constructs a URL in the format required by iJento, allowing different inputs.
     * @method url
     * @param u {String} A URL or path. e.g. http://www.ft.com/markets or /markets
     * @return {String} The full URL in the correct format.
     * @private
     */
    function url(u) {
        if (utils.isUndefined(u)) {
            throw new Error('URL must be specified');
        }

        if (u.indexOf('://') === -1) {
            if (u.substring(0, 1) !== '/') {
                u = '/' + u;
            }

            u = document.location.protocol + "//" + document.location.hostname + u;
        }

        if (u.indexOf('?') === -1) {
            u = u + window.location.search;
        } else {
            // Merge query string params to avoid duplicates.
            u = u.substr(0, u.indexOf('?')) + "?" + utils.serialize(utils.merge(utils.unserialize(window.location.search.substring(1)), utils.unserialize(u.substr(u.indexOf('?') + 1))));
        }

        return u;
    }

    /**
     * Make the page tracking request.
     * @method page
     * @param [config] {Object} Configuration object. If omitted, will use the defaults.
     * @param [callback] {Function} Callback function. Called when request completed.
     * @async
     */
    return function (config, callback) {
        config = utils.merge(defaultPageConfig, config);

        // New ClickID for a new Page.
        module._Core.clickID();
        module._Core.track({
            async: config.async,
            format: format,
            values: {
                p: url(config.url), // Page
                // c: Cookie, set in Core later,
                r: config.referrer, // Referrer
                // t: Click ID, set in Core later.
                g: utils.serialize(config, ['co', 'sr', 'lt', 'jv']),
                y: 'page'
                // u: Unique click ID, set in Core later,
                // o: Internal counter, set in Core later
            }
        }, callback);

        settings.page_sent = true;
    };

}(window, document));

