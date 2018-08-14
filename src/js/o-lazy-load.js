// <https://github.com/ApoorvSaxena/lozad.js>
import lozad from 'lozad';

const defaults = {
	selector: '.o-lazy-load'
};

class OLazyLoad {
	/**
	 * Class constructor.
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (opts) {
		this.options = Object.assign({}, defaults, opts);
		// Lozad returns an object with two methods: .observe() and .triggerLoad()
		Object.assign(this, lozad(this.options.selector, this.options));
		this.observe();
	}

	/**
	 * Initialise message component.
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	static init (opts) {
		new OLazyLoad(opts);
	}
}

export default OLazyLoad;
