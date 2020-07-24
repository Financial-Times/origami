import tracking from './src/javascript/tracking';

function initialise() {
	tracking.init();
	document.removeEventListener('o.DOMContentLoaded', initialise);
}

// Try and initialise on o.DOMContentLoaded. If it fails, defer to the
// consumer of the library.
document.addEventListener('o.DOMContentLoaded', initialise);

/**
 * A constructed object, this module is a Singleton as we only want one
 * instance sending events. See {@link Tracking} for the publicly available
 * interface.
 * @type {tracking}
 */
export default tracking;
