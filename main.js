/**
 * The oErrors error tracking and reporting module.
 *
 * @module oErrors
 * @see Errors
 */
import Errors from './src/js/oErrors.js';

const errors = new Errors();


function initialise() {
	errors.init();
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
export default errors;
export { errors };
