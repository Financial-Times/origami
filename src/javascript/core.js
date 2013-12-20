Track._Core = (function (parent) {
    "use strict";

    // Shared "internal" scope
    var self = parent._self = parent._self || {},

        defaultConfig = {
            environment: 'test',
            clickID: "t" + (new Date()).valueOf(),
            async: true,
            callback: function () {}
        };

    function track(type, config, callback) {
        config = parent._Utils.merge(defaultConfig, config);
        parent._Utils.log('Type', type);
        parent._Utils.log('Config', config);
    }

    return {
        track: track
    };
}(Track));
