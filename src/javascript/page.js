/*global window, document, Track*/
Track.page = (function (module, window, document) {
    "use strict";

    var format = 'pcrtgyuo';

    // Shared "internal" scope
    var self = module._self = module._self || {},

        defaultPageConfig = {
            url: document.URL,
            referrer: document.referrer,

            co: window.screen.colorDepth,
            sr: window.screen.width + 'x' + window.screen.height,
            lt: (new Date()).toISOString(),
            jv: '', // TODO

            async: false // Send this tag syncronously
        };

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

    return function (config, callback) {
        config = module._Utils.merge(defaultPageConfig, config);

        module._Core.track(module._Utils.merge(config, {
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
        }), callback);
    };

}(Track, window, document));

