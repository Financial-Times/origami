import {validEvents, coralMap, errorMap} from './utils/events';

class Stream {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [streamEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (streamEl, opts = {}) {
		this.streamEl = streamEl;
		this.options = opts;
		this.validEvents = validEvents;
		this.coralEventMapping = coralMap;
		this.errorMapping = errorMap;
		this.useStagingEnvironment = !!opts.useStagingEnvironment;

		this._mapCoralEventsToOComments();
	}

	init () {
		return Promise.all([this.renderComments(), this.getJsonWebToken()])
			.then(() => {
				if (this.token && this.embed) {
					this.login();
				}
			});
	}

	login () {
		if (this.token && this.embed) {
			this.embed.login(this.token);
		} else {
			console.log("Unabled to login into comments as token or embed dont exist");
		}
	}

	getJsonWebToken () {
		return fetch('https://comments-api.ft.com/user/auth/', {
			credentials: 'include'
		}).then(response => {
			// user is signed in but has no display name
			if (response.status === 205) {
				return { token: undefined, userIsSignedIn: true };
			}

			// user is signed in and has a pseudonym
			if (response.ok) {
				return response.json();
			} else {
				// user is not signed in or session token is invalid
				// or error in comments api
				return { token: undefined, userIsSignedIn: false };
			}
		}).then(jsonWebToken => {

			if (jsonWebToken.token) {
				this.token = jsonWebToken.token;
			}

			return jsonWebToken;

		}).catch(() => {
			return false;
		});
	}

	renderComments () {
		return new Promise((resolve) => {
			try {
				/*global Coral*/
				const scriptElement = document.createElement('script');
				scriptElement.src = this.useStagingEnvironment
					? 'https://ft.staging.coral.coralproject.net/assets/js/embed.js'
					: 'https://ft.coral.coralproject.net/assets/js/embed.js';

				const rootUrl = this.useStagingEnvironment
					? 'https://ft.staging.coral.coralproject.net'
					: 'https://ft.coral.coralproject.net';

				scriptElement.onload = () => {
					this.embed = Coral.createStreamEmbed(
						{
							id: this.streamEl.id,
							storyURL: this.options && this.options.storyUrl,
							rootURL: rootUrl,
							autoRender: true,
							events: (events) => {
								events.onAny((name, data) => {
									const message = new CustomEvent('talkEvent', {
										detail: {
											name,
											data
										}
									});
									window.parent.dispatchEvent(message);
								});
							}
						}
					);
				};
				this.streamEl.parentNode.appendChild(scriptElement);

				document.dispatchEvent(new Event('oCommentsReady'));
				resolve();
			} catch (error) {
				resolve();
			}
		});
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

export default Stream;
