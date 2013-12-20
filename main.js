// http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

var Track = (function (module) {
    "use strict";

    // Shared "internal" scope
    var self = module._self = module._self || {};

    module.version = "Track version 0.0.3";



    module.init = function (config) {
        self.config = config;

        if (config.hasOwnProperty('developer')) {
            self.log = true;
        }

        module.page();
    };

    module.destroy = function () {

    };

    module.toString = function () {
        return module.version;
    };

    return module;
}({}));