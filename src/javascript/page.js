/*global window, document*/
Track.page = (function (module, window, document) {
    "use strict";

    // Shared "internal" scope
    var self = module._self = module._self || {},

        defaultPageConfig = {
            url: document.URL,
            referrer: document.referrer,

            co: window.screen.colorDepth,
            sr: window.screen.width + 'x' + window.screen.height,
            lt: (new Date()).toISOString(),

            async: false // Send this tag syncronously
        };


    return function (config, callback) {
        config = module._Utils.merge(module._Utils.merge(defaultPageConfig, self.config), config);
        module._Core.track('page', config, callback);
    };

}(Track, window, document));

