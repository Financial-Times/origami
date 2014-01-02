// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

/**
 * Origami tracking module.
 *
 * @module Track
 * @main
 *
 * The Track object.
 * @class Track
 * @static
 * @type {*}
 */
var Track = (function (module) {
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
    module.version = "Track version 0.0.3";

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
            self.log = true;
        }

        module.page();
    };

    /**
     * Clean up the tracking module.
     * @method destroy
     */
    module.destroy = function () {
        self.log = null;
        self.internalCounter = 1;
        self.page_sent = false;
    };

    /**
     * Overload toString method to show the version.
     * @method toString
     * @return {String} the module's version.
     */
    module.toString = function () {
        return module.version;
    };

    return module;
}({}));