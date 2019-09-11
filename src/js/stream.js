import {validEvents, coralEventMap, coralErrorMap} from './utils/events';

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
		this.eventSeenTimes = {};
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
				scriptElement.src = 'https://ft.staging.coral.coralproject.net/assets/js/embed.js';
				scriptElement.onload = () => {
					this.embed = Coral.createStreamEmbed(
						{
							id: this.streamEl.id,
							storyURL: this.options.storyUrl,
							rootURL: 'https://ft.staging.coral.coralproject.net',
							autoRender: true,
							events: (events) => {
								events.onAny((name, data) => {
									this.publishEvent({name, data});
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

		if (!validEvents.includes(event)) {
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
	 * @param {Object} data - The event payload
	 */
	publishEvent ({name, data = {}}) {
		const {
			error: {
				errors
			} = {}
		} = data;

		const mappedEventName = coralEventMap.get(name);
		const eventsToPublish = [];

		if (errors && Array.isArray(errors)) {
			errors
				.filter(error => coralErrorMap.get(error.translation_key))
				.forEach(error => {
					const mapppedErrorName = coralErrorMap.get(error.translation_key);

					if (mapppedErrorName) {
						eventsToPublish.push(mapppedErrorName);
					}
				});
		}

		if (mappedEventName) {
			eventsToPublish.push(mappedEventName);
		}

		eventsToPublish
			.forEach(eventName => {
				const now = +new Date;
				const delayInMilliseconds = 250;
				const eventHasntBeenSeenRecently = !this.eventSeenTimes[eventName] ||
					now > this.eventSeenTimes[eventName] + delayInMilliseconds;

				if (eventHasntBeenSeenRecently) {
					this.eventSeenTimes[eventName] = now;
					const event = new CustomEvent(eventName);
					document.dispatchEvent(event);
				}
			});
	}
}

export default Stream;
