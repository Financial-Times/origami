/**
 * For tracking additional page-level data.
 * @module Track
 * @submodule data
 * @class Track.data
 * @static
 *
 * Params:
 // Page level
 'uuid',
 'pageSubsLevel',
 'siteMap',
 'title',
 'assetType',
 'edition',
 'brand',
 'theme',
 'hurdle',
 'error',
 'searchQuery'
 */

/*global module, require, window */
module.exports = (function (window) {
    "use strict";

    var
        Core = require("./core"),
        utils = require("./utils"),

        /**
         * Default properties for data tracking requests.
         * @property defaultDataConfig
         * @type {Object}
         * @private
         */
        defaultDataConfig = {
            type: 'data'
        };

    /**
     * Make the page tracking request.
     * @method data
     * @param [config] {Object} Configuration object. If omitted, will use the defaults.
     * @param [callback] {Function} Callback function. Called when request completed.
     * @async
     */
    function data(config, callback) {
        config = utils.merge(utils.merge(defaultDataConfig), config);
        Core.track(config, callback);
    }

    window.addEventListener('oTrackingData', data, false);

    return data;

}(window));

