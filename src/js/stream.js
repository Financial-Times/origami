import * as events from './utils/events';
import * as displayName from './utils/display-name';
import * as auth from './utils/auth';

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
		return Promise.all([this.renderComments(), this.authenticateUser()])
			.then(() => {
				if (this.authenticationToken) {
					this.embed.login(this.authenticationToken);
				}
			});
	}

	authenticateUser (displayName) {
		const fetchOptions = {
			useStagingEnvironment: this.useStagingEnvironment,
			sourceApp: this.options.sourceApp
		};

		if (displayName) {
			fetchOptions.displayName = displayName;
		}

		return auth.fetchJsonWebToken(fetchOptions)
			.then(response => {
				if (response.token) {
					if (this.embed) {
						this.embed.login(response.token);
					} else {
						this.authenticationToken = response.token;
					}
				} else {
					this.userHasValidSession = response.userHasValidSession;
				}
			})
			.catch(() => {
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
							storyURL: this.options.storyUrl,
							storyID: this.options.articleId,
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

				if (this.useStagingEnvironment) {
					const stagingWarning = document.createElement('div');
					stagingWarning.innerHTML = `
											<div class="o-comments__staging-message-container">
												<div class="o-comments__staging-message-content">
													<p class="o-comments__staging-message">You are on the staging environment for Comments</p>
												</div>
											</div>`;
					this.streamEl.parentNode.insertBefore(stagingWarning, this.streamEl);
				}

				document.dispatchEvent(new Event('oCommentsReady'));
			} catch (error) {
				resolve();
			}
		});
	}

	displayNamePrompt () {
		const overlay = displayName.prompt();

		document.addEventListener('oOverlay.ready', (event) => {
			const sourceOverlay = event.srcElement;
			const displayNameForm = sourceOverlay.querySelector('#o-comments-displayname-form');

			if (displayNameForm) {
				displayNameForm.addEventListener('submit', (event) => {
					displayName.validation(event)
						.then(displayName => {
							overlay.close();
							this.authenticateUser(displayName);
						});
				});
			}
		});

		document.addEventListener('oOverlay.close', (event) => {
			const sourceOverlay = event.srcElement;
			const displayNameForm = sourceOverlay.querySelector('#o-comments-displayname-form');

			if (displayNameForm) {
				overlay.destroy();
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

		if (name === 'loginPrompt' && this.userHasValidSession) {
			return this.displayNamePrompt();
		}

		const mappedEvent = events.coralEventMap.get(name);
		const validErrors = errors && Array.isArray(errors) ? events.findValidErrors(errors) : [];
		const eventsToPublish = mappedEvent ?
			[mappedEvent].concat(validErrors) :
			validErrors;

		eventsToPublish
			.forEach(eventMapping => {
				const now = +new Date;
				const delayInMilliseconds = 100;
				const eventHasntBeenSeenRecently = !this.eventSeenTimes[eventMapping.oComments] ||
					now > this.eventSeenTimes[eventMapping.oComments] + delayInMilliseconds;

				if (eventHasntBeenSeenRecently) {
					this.eventSeenTimes[eventMapping.oComments] = now;

					const oCommentsEvent = new CustomEvent(eventMapping.oComments, {
						bubbles: true
					});
					this.streamEl.dispatchEvent(oCommentsEvent);

					if (eventMapping.oTracking && !this.options.disableOTracking) {
						const oTrackingEvent = new CustomEvent('oTracking.event', {
							detail: {
								category: 'comment',
								action: eventMapping.oTracking,
								coral: true
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
