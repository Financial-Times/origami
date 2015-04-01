'use strict';
/**
 * The oErrors error tracking and reporting module.
 *
 * @module oErrors
 * @see Errors
 */
var Errors = require('./src/js/oErrors');
var errors = new Errors();

/**
 * A constructed object, this module is a Singleton due to the architecture of
 * Raven JS. See {@link Errors} for the publicly available interface.
 *
 * @type {Errors}
 */
module.exports = errors;
