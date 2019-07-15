const config = require('./envConfig');
const oCommentApi = require('o-comment-api');
const defaultConfig = require('./config');
const Widget = require('./widget');

/**
 * Default config (prod) is set.
 */
config.set(defaultConfig);

/**
 * Enable data caching.
 */
oCommentApi.setConfig('cache', true);

/**
 * Widget.js exposed as main constructor
 * @type {object}
 */
module.exports = Widget;
