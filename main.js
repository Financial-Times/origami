var config = require('./src/javascripts/config.js'),
    oCommentsData = require('o-comments-data'),
    defaultConfig = require('./config.json'),
    logger = require('js-logger');

/**
 * Default config (prod) is set.
 */
config.set(defaultConfig);

/**
 * Enable data caching.
 */
oCommentsData.init('cache', true);

module.exports = {
    /**
     * Adds or overrides configuration options. It also supports overriding or adding configs to dependencies.
     * For this you have to write the following:
     * ```
     * "dependencies": {
     *       "o-comments-data": {
     *           "suds": {
     *               "baseUrl": "http://test.session-user-data.webservices.ft.com"
     *           },
     *           "ccs": {
     *               "baseUrl": "http://test.comment-creation-service.webservices.ft.com"
     *           }
     *       }
     *   }
     * ```
     * 
     * @param  {string|object} keyOrObject Key or actually an object with key-value pairs.
     * @param  {anything} value Optional. Should be specified only if keyOrObject is actually a key (string).
     */
    init: function (keyOrObject, value) {
        "use strict";

        if (typeof keyOrObject === 'string') {
            config.set(keyOrObject, value);

            if (keyOrObject === 'sessionId') {
                oCommentsData.init(keyOrObject, value);
            }
        } else if (typeof keyOrObject === 'object') {
            if (keyOrObject.hasOwnProperty('dependencies') && keyOrObject.dependencies.hasOwnProperty('o-comments-data')) {
                oCommentsData.init(keyOrObject.dependencies['o-comments-data']);

                delete keyOrObject.dependencies;
            }

            config.set(keyOrObject, value);

            if (keyOrObject.hasOwnProperty('sessionId')) {
                oCommentsData.init('sessionId', keyOrObject.sessionId);
            }
        }
    },
    
    /**
     * Widget.js exposed.
     * @type {object}
     */
    Widget: require('./src/javascripts/Widget.js'),

    WidgetUi: require('./src/javascripts/WidgetUi.js'),

    /**
     * utils.js exposed.
     * @type {object}
     */
    utils:  require('./src/javascripts/utils.js'),

    /**
     * Auth.js exposed.
     * @type {object}
     */
    auth:   require('./src/javascripts/auth.js'),

    /**
     * resourceLoader.js exposed.
     * @type {object}
     */
    resourceLoader: require('./src/javascripts/resourceLoader.js'),

    /**
     * i18n.js exposed.
     * @type {object}
     */
    i18n: require('./src/javascripts/i18n.js'),

    /**
     * Enables logging.
     * @type {function}
     */
    enableLogging: function () {
        "use strict";
        logger.enable.apply(this, arguments);
    },

    /**
     * Disables logging.
     * @type {function}
     */
    disableLogging: function () {
        "use strict";
        logger.disable.apply(this, arguments);
    },

    /**
     * Sets logging level.
     * @type {number|string}
     */
    setLoggingLevel: function () {
        "use strict";
        logger.setLevel.apply(this, arguments);
    }
};