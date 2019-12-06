import * as events from './utils/events';
import * as displayName from './utils/display-name';
import * as auth from './utils/auth';
import purgeJwtCache from './utils/purge-jwt-cache';

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
				this.login();
			});
	}

	login () {
		if (this.authenticationToken) {
			this.embed.login(this.authenticationToken);

			if (this.displayName) {
				this.renderSignedInMessage();
			}
		}
	}

	authenticateUser (displayName) {
		const fetchOptions = {
			useStagingEnvironment: this.useStagingEnvironment
		};

		if (displayName) {
			fetchOptions.displayName = displayName;
		}

		return auth.fetchJsonWebToken(fetchOptions)
			.then(response => {
				this.displayName = response.displayName;

				if (response.token) {
					this.authenticationToken = response.token;
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
							storyURL: this.options.articleUrl,
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

	displayNamePrompt ({purgeCacheAfterCompletion = false} = {}) {
		const overlay = displayName.prompt();

		const onOverlayReady = (event) => {
			const sourceOverlay = event.srcElement;
			const displayNameForm = sourceOverlay.querySelector('#o-comments-displayname-form');

			if (displayNameForm) {
				displayNameForm.addEventListener('submit', (event) => {
					displayName.validation(event)
						.then(displayName => {
							overlay.close();
							this.authenticateUser(displayName)
								.then(() => {
									this.login();
								});
							if (purgeCacheAfterCompletion) {
								purgeJwtCache();
							}
						});
				});
			}
		};
		document.addEventListener('oOverlay.ready', onOverlayReady);

		const onOverlayClosed = () => {
			overlay.context.removeEventListener('oLayers.close', onOverlayClosed);
			document.removeEventListener('oOverlay.ready', onOverlayReady);
			overlay.destroy();
		};
		overlay.context.addEventListener('oLayers.close', onOverlayClosed);
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
				code
			} = {}
		} = data;

		if (name === 'loginPrompt' && this.userHasValidSession) {
			return this.displayNamePrompt();
		}

		const mappedEvent = events.coralEventMap.get(name);
		const validError = code ? events.findValidError(code) : [];
		const eventsToPublish = mappedEvent ?
			[mappedEvent].concat(validError) :
			validError;

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

	renderSignedInMessage () {
		const signedInMessage = document.createElement('div');
		signedInMessage.classList.add('o-comments__signed-in-container');
		signedInMessage.innerHTML = `
									<p class="o-comments__signed-in-text">Signed in as
										<span class="o-comments__signed-in-inner-text"></span>.
										<a class="o-comments__edit-display-name">Edit</a>
									</p>`;
		signedInMessage.querySelector('.o-comments__signed-in-inner-text').innerText = this.displayName;

		const oldSignedInMessage = this.streamEl.parentNode.querySelector('.o-comments__signed-in-container');
		if (oldSignedInMessage) {
			oldSignedInMessage.remove();
		}

		this.streamEl.parentNode.insertBefore(signedInMessage, this.streamEl);

		document.querySelector('.o-comments__edit-display-name').onclick = () => {
			this.displayNamePrompt({purgeCacheAfterCompletion: true});
		};
	}
}

export default Stream;
