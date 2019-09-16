import {coralEventMap, findValidErrors} from './utils/events';

class Stream {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [streamEl] - The component element in the DOM
	 * @param {Object} [opts={}] - An options object for configuring the component
	 */
	constructor (streamEl, opts = {}) {
		this.streamEl = streamEl || document;
		this.options = opts;
		this.eventSeenTimes = {};
		this.useStagingEnvironment = !!opts.useStagingEnvironment;
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
		const url = 'https://comments-api.ft.com/user/auth/' +
			(this.useStagingEnvironment ? '?staging=1' : '');
		return fetch(url, { credentials: 'include' }).then(response => {
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
									this.publishEvent({name, data});
								});
							}
						}
					);
					resolve();
				};
				this.streamEl.parentNode.appendChild(scriptElement);

				document.dispatchEvent(new Event('oCommentsReady'));
			} catch (error) {
				resolve();
			}
		});
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

		const mappedEvent = coralEventMap.get(name);
		const validErrors = errors && Array.isArray(errors) ? findValidErrors(errors) : [];
		const eventsToPublish = mappedEvent ?
			[mappedEvent].concat(validErrors) :
			validErrors;

		if (!eventsToPublish.length) {
			throw new Error('Invalid event name or error type');
		}

		eventsToPublish
			.forEach(eventMapping => {
				const now = +new Date;
				const delayInMilliseconds = 100;
				const eventHasntBeenSeenRecently = !this.eventSeenTimes[eventMapping.oComments] ||
					now > this.eventSeenTimes[eventMapping.oComments] + delayInMilliseconds;

				if (eventHasntBeenSeenRecently) {
					this.eventSeenTimes[eventMapping.oComments] = now;

					const oCommentsEvent = new CustomEvent(eventMapping.oComments);
					this.streamEl.dispatchEvent(oCommentsEvent);

					if (eventMapping.oTracking) {
						const oTrackingEvent = new CustomEvent('oTracking.event', {
							detail: {
								category: 'comment',
								action: eventMapping.oTracking
							},
							bubbles: true
						});
						document.body.dispatchEvent(oTrackingEvent);
					}
				}
			});
	}
}

export default Stream;
