import {validEvents, coralMap, errorMap} from './utils/events';
import {getJsonWebToken} from './utils/auth';

class Comments {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [oCommentsEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (oCommentsEl, opts) {
		this.oCommentsEl = oCommentsEl;
		this.options = Object.assign({}, {}, opts || Comments.getDataAttributes(oCommentsEl));
		this.validEvents = validEvents;
		this.coralEventMapping = coralMap;
		this.errorMapping = errorMap;
		this._mapCoralEventsToOComments();
		this._renderComments();
	}

	/**
	 * Render a comments instance authenticated with Coral Talk.
	 *
	 * @access private
	 * @returns {HTMLElement}
	 */
	_renderComments () {
		/*global Coral*/
		getJsonWebToken()
			.then(({ token, userIsSignedIn }) => {
				const scriptElement = document.createElement('script');
				scriptElement.src = 'https://ft-next-talk-spike.herokuapp.com/static/embed.js';
				scriptElement.onload = () => Coral.Talk.render(this.oCommentsEl,
					{
						talk: 'https://ft-next-talk-spike.herokuapp.com',
						auth_token: token,
						userSignedInToFT: userIsSignedIn,
						events: (events) => {
							events.onAny((name, data) => {
								const message = new CustomEvent('talkEvent', {
									detail: {
										name,
										data
									}
								});
								parent.dispatchEvent(message);
							});
						}
					}
				);
				this.oCommentsEl.appendChild(scriptElement);
				/**
				 * In order to test the asynchronous function, send an event when getJsonWebToken resolves
				 * the script element is injected into the document.
				 */
				document.dispatchEvent(new Event('oCommentsReady'));
			})
			.catch(error => {
				console.error(`Unable to authenticate user: ${error}`);
				document.dispatchEvent(new Event('oCommentsFailed'));
			});
	}

	/**
	 * Get the data attributes from the CommentsElement. If the component is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 *
	 * @param {HTMLElement} oCommentsEl - The component element in the DOM
	 * @returns {Object} - Data attributes as an object
	 */
	static getDataAttributes (oCommentsEl) {
		if (!(oCommentsEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(oCommentsEl.dataset).reduce((options, key) => {

			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}

			// Build a concise key and get the option value
			const shortKey = key.replace(/^oComments(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = oCommentsEl.dataset[key];

			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/\'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}

			return options;
		}, {});
	}

	/**
	 * Register callback functions to events.
	 *
	 * @param {String} event - The event to be tracked
	 * @param {Function} callback - The callback for when the event is emitted
	 */
	on (event, callback) {
		if (!event || !callback) {
			throw new Error('.on requires both the `event` & `callback` parameters');
		}

		if (!this.validEvents.includes(event)) {
			throw new Error(`${event} is not a valid event`);
		}

		if (typeof callback !== 'function') {
			throw new Error('The callback must be a function');
		}

		document.addEventListener(event, callback);
	}

	/**
	 * Emits events that have a valid o-comment event name.
	 *
	 * @param {String} name - The event name
	 * @param {Object} payload - The event payload
	 */
	_dispatchEvent (name, payload) {
		if (!this.validEvents.includes(name)) {
			throw new Error(`${name} is not a valid event`);
		}

		const event = new CustomEvent(name, payload || {});

		document.dispatchEvent(event);
	}

	/**
	 * Listens for all Coral Talk events and maps them to valid events.
	 */
	_mapCoralEventsToOComments () {
		window.addEventListener('talkEvent', (event = {}) => {
			const {
				detail: {
					name,
					data: {
						error: {
							errors
						} = {}
					} = {}
				} = {}
			} = event;

			if (errors && Array.isArray(errors)) {
				errors
					.filter(error => this.errorMapping.get(error.translation_key))
					.map(error => this._dispatchEvent(this.errorMapping.get(error.translation_key)));
			}

			const mappedEventName = this.coralEventMapping.get(name);

			if (mappedEventName) {
				this._dispatchEvent(mappedEventName);
			}
		});
	}
}

export default Comments;
