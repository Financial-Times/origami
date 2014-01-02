/*global window, document, Track*/

/**
 * Page functionality. For tracking a page.
 * @module Track
 * @submodule page
 * @class Track.page
 * @static
 */
Track.page = (function (module, window, document) {
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
            self = module._self = module._self || {},

        /**
         * Default properties for page tracking requests.
         * @example
         {
         url: document.URL,
         referrer: document.referrer,

         co: window.screen.colorDepth,
         sr: window.screen.width + 'x' + window.screen.height,
         lt: (new Date()).toISOString(),
         jv: '', // TODO

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
            jv: '', // TODO

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
        if (typeof u === "undefined") {
            throw new Error('URL must be specified');
        }

        if (u.indexOf('://') === -1) {
            if (u.substring(0, 1) !== '/') {
                u = '/' + u;
            }

            u = document.location.protocol + "//" + document.location.hostname + u;
        }

        return u.indexOf('?') === -1 ? u + window.location.search : u + "&" + window.location.search.substring(1);
    }

    /**
     * Make the page tracking request.
     * @method page
     * @param [config] {Object} Configuration object. If omitted, will use the defaults.
     * @param [callback] {Function} Callback function. Called when request completed.
     */
    return function (config, callback) {
        config = module._Utils.merge(defaultPageConfig, config);

        module._Core.track({
            async: config.async,
            format: format,
            values: {
                p: url(config.url), // Page
                // c: Cookie, set in Core later,
                r: config.referrer, // Referrer
                // t: Click ID, set in Core later.
                g: module._Utils.serialize(['co', 'sr', 'lt', 'jv'], config),
                y: 'page'
                // u: Unique click ID, set in Core later,
                // o: Internal counter, set in Core later
            }
        }, callback);

        self.page_sent = true;
    };

}(Track, window, document));

