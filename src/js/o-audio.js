import Tracking from './tracking';

const UNLOAD_EVENTS = ['beforeunload', 'unload', 'pagehide'];

function bindToUnloadEvents () {
	UNLOAD_EVENTS.forEach(evtName => {
		window.addEventListener(
			evtName,
			() => {
				if (!this.hasDispatchedListened) {
					this.hasDispatchedListened = true;
					this.tracking.dispatchListenedEvent();
				}
			}
		);
	});
}

class OAudio {
	/**
	 * Class constructor.
	 * @param {HTMLAudioElement} [oAudioEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (oAudioEl, opts) {

		if (!(oAudioEl instanceof HTMLAudioElement)) {
			console.warn('oAudioEl should be an instance of HTMLAudioElement');
		}
		this.oAudioEl = oAudioEl;
		this.options = Object.assign({}, {
		}, opts || OAudio.getDataAttributes(oAudioEl));

		this.tracking = new Tracking(oAudioEl, this.options);
		this.hasDispatchedListened = false;

		if (this.options.dispatchListenedEventOnUnload !== undefined) {
			bindToUnloadEvents.call(this);
		}
	}

	/**
	 * Destroy this component. Unbinds listeners and dispatches any final tracking events
	 */
	destroy() {
		this.tracking.dispatchListenedEvent();
		this.tracking.destroy();
	}

	/**
	 * Get the data attributes from the OAudioElement. If the message is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} oAudioEl - The component element in the DOM
	 * @returns {Object} - Data attributes as an object
	 */
	static getDataAttributes (oAudioEl) {
		if (!(oAudioEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(oAudioEl.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oAudio(w)(w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = oAudioEl.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}

			return options;
		}, {});
	}

	/**
	 * Initialise message component.
	 * @param {(HTMLElement|String)} rootEl - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [opts={}] - An options object for configuring the component
	 * @returns {(OAudio|Array<OAudio>)} - OAudio instance(s)
	 */
	static init (rootEl, opts) {
		if (!rootEl) {
			rootEl = document.body;
		}
		if (!(rootEl instanceof HTMLElement)) {
			rootEl = document.querySelector(rootEl);
		}
		if (rootEl instanceof HTMLAudioElement && rootEl.matches('[data-o-component=o-audio]')) {
			return new OAudio(rootEl, opts);
		}
		return Array.from(rootEl.querySelectorAll('[data-o-component="o-audio"]'), rootEl => new OAudio(rootEl, opts));
	}
}

export default OAudio;

export { Tracking };