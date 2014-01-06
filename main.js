// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

/**
 * Origami tracking module.
 * ========================
 * From this specification: https://docs.google.com/a/ft.com/document/d/1F5P3Ip3mIax6kWytYM7Kf6g7LaPS3Njdw7jLXAH1OWI/edit?usp=sharing
 *
 * Features
 * --------
 * * Use AJAX instead of image requests
 * * Bundle requests
 * * Handle offline
 * * Use storage methods other than cookies
 * * Make the API cleaner and easier to use
 * * Origami module
 * * Use a single configuration object
 *
 * Example
 * -------
 * <pre>Track.init({ environment: 'test' });</pre>
 *
 * @module Track
 * @main
 *
 * The Track object.
 * @class Track
 * @static
 * @type {*}
 */

/*jshint -W098 */
var Track = (function (module) {
    /*jshint +W098 */
    "use strict";

    /**
     * Shared "internal" scope.
     * @property _self
     * @type {Object}
     * @private
     */
    var self = module._self = module._self || {};

    /**
     * The version of the tracking module.
     * @property version
     * @type {String}
     */
    module.version = "Track version 0.0.4";

    /**
     * Turn on/off developer mode. (Can also be activated on init.)
     * @method developer
     * @param [level] {Boolean} Turn on or off, defaults to on if omitted.
     */
    module.developer = function (level) {
        if (module._Utils.isUndefined(level)) {
            level = true;
        }

        // Extra brackets on purpose, in case a non-boolean argument is used.
        if ((level)) {
            self.developer = true;
        } else {
            self.developer = null;
            self.noSend = null;
        }
    };

    /**
     * Initialise the Track module.
     * @method init
     * @param config Configuration object
     */
    module.init = function (config) {
        self.config = config;

        module.destroy();

        if (config.hasOwnProperty('developer')) {
            delete config.developer;
            module.developer();

            if (config.hasOwnProperty('noSend')) {
                delete config.noSend;
                self.noSend = true;
            }
        }

        // Initialize the sending queue.
        module._Core.Send.init();

        // Track the page.
        module.page();
    };

    /**
     * Clean up the tracking module.
     * @method destroy
     */
    module.destroy = function () {
        module.developer(false);
        self.internalCounter = 0;
        self.page_sent = false;
    };

    /**
     * Overload toString method to show the version.
     * @method toString
     * @return {String} The module's version.
     */
    module.toString = function () {
        return module.version;
    };

    return module;
}({}));
