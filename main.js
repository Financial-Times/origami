/**
 * Origami tracking module.
 * ========================
 * From this specification: https://docs.google.com/a/ft.com/document/d/1F5P3Ip3mIax6kWytYM7Kf6g7LaPS3Njdw7jLXAH1OWI/edit?usp=sharing
 *
 * Features
 * --------
 * * Use AJAX instead of image requests
 * * Bundle requests TODO
 * * Handle offline
 * * Use storage methods other than cookies
 * * Make the API cleaner and easier to use
 * * Origami module
 * * Use a single configuration object
 *
 * Example
 * -------
 * <pre>Track.init({ environment: 'test', server: 'http://ftweb03299-lvpr-uk-d/' });</pre>
 *
 * @module Track
 * @main
 *
 * The Track object.
 * @class Track
 * @static
 * @type {*}
 */

/*global require, module */
module.exports = (function () {
    "use strict";

    /**
     * Shared "internal" scope.
     * @property _self
     * @type {Object}
     * @private
     */
    var settings = require("./src/javascript/core/settings"),
        utils = require("./src/javascript/utils"),

        /**
         * The version of the tracking module.
         * @property version
         * @type {String}
         */
            version = "Track version 0.0.6";

    /**
     * Turn on/off developer mode. (Can also be activated on init.)
     * @method developer
     * @param [level] {Boolean} Turn on or off, defaults to on if omitted.
     */
    function developer(level) {
        if (utils.isUndefined(level)) {
            level = true;
        }

        // Extra brackets on purpose, in case a non-boolean argument is used.
        if ((level)) {
            settings.set('developer', true);
        } else {
            settings.set('developer', null);
            settings.set('noSend', null);
        }
    }

    /**
     * Clean up the tracking module.
     * @method destroy
     */
    function destroy() {
        developer(false);
        settings.set('internalCounter', 0);
        settings.set('page_sent', false);
    }

    /**
     * Initialise the Track module.
     * @method init
     * @param config Configuration object
     */
    function init(config) {
        settings.set('config', config);

        destroy();

        if (config.hasOwnProperty('developer')) {
            delete config.developer;
            developer();

            if (config.hasOwnProperty('noSend')) {
                delete config.noSend;
                settings.set('noSend', true);
            }
        }

        // Initialize the sending queue.
        require("./src/javascript/core/send").init();

        // Track the page.
        require('./src/javascript/page')(config);
    }

    /**
     * Overload toString method to show the version.
     * @method toString
     * @return {String} The module's version.
     */
    function toString() {
        return version;
    }

    return {
        init: init,
        developer: developer,
        destroy: destroy,
        toString: toString,

        page:  require('./src/javascript/page'),
        data:  require('./src/javascript/data'),
        event: require('./src/javascript/event')
    };
}());
