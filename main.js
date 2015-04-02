'use strict';
/**
 * The oErrors error tracking and reporting module.
 *
 * @module oErrors
 * @see Errors
 */
var Errors = require('./src/js/oErrors');
var errors = new Errors();


function initialise() {
	if (!errors.initialised) {
		try {
			errors.init();
		} catch(e) {
			// Do nothing
		}
	}

	document.removeEventListener('o.DOMContentLoaded', initialise);
}

// Try and initialise on o.DOMContentLoaded. If it fails, defer to the
// consumer of the library.
document.addEventListener('o.DOMContentLoaded', initialise);

/**
 * A constructed object, this module is a Singleton due to the architecture of
 * Raven JS. See {@link Errors} for the publicly available interface.
 *
 * @type {Errors}
 */
module.exports = errors;
