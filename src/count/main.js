const config = require('./src/javascripts/config');
const oCommentApi = require('o-comment-api');
const defaultConfig = require('./config.js');
const Widget = require('./src/javascripts/widget');

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
