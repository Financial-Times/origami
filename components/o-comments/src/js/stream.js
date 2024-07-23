import events from './utils/events.js';
import displayName from './utils/display-name.js';
import auth from './utils/auth.js';
import purgeJwtCache from './utils/purge-jwt-cache.js';
import Delegate from 'ftdomdelegate';

// eslint version is too old to support private methods and we do not want to expose this function as part of the Stream class interface
function tidyPath(path) {
	if (!path) {
		return;
	}
	if (!path.startsWith('/')) {
		path = `/${path}`;
	}
	if (!path.endsWith('/')) {
		path = `${path}/`;
	}
	return path;
}

class Stream {
	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [streamEl] - The component element in the DOM
	 * @param {object} [opts={}] - An options object for configuring the component
	 */
	constructor (streamEl, opts = {}) {
		this.streamEl = streamEl || document;
		this.options = opts;
		this.eventSeenTimes = {};
		this.useStagingEnvironment = Boolean(opts.useStagingEnvironment);
		this.isSubscribed = false;
		this.isTrialist = false;
		this.onlySubscribers = opts.onlySubscribers;
	}

	init () {
		this.redirectIllegalCommentReport();

		const renderAndAuthenticate = (displayName) => {
			return Promise.all([this.renderComments(), this.authenticateUser(displayName)])
				.then(() => {
					this.login();
				});
		};

		return displayName.validation(this.options.displayName,this.options)
			.then(displayName => renderAndAuthenticate(displayName))
			.catch(() => renderAndAuthenticate());
	}

	login () {
		if (this.authenticationToken) {
			this.embed.login(this.authenticationToken);

			if (this.displayName) {
				this.renderSignedInMessage();
			}
		}
		else if(this.onlySubscribers && !this.isSubscribed){
			this.renderNotSignedInMessage();
		}
	}

	/*
		coral's default behaviour is to reload the page with the comments section in a different view
		however, this causes issues for first-click free users who get redirected to the barrier page
		this will send the user to a url that isn't behind the paywall instead
	*/

	redirectIllegalCommentReport () {
		const paywalledReportPath = tidyPath(this.options?.paywalledReportPath) || '/content/';
		const redirectReportPath = tidyPath(this.options?.redirectReportPath) || '/article/comment-report/';
		const sendToCommentReport = function (event, elem) {
			event.preventDefault();
			const href = elem.getAttribute('href');
			// the below will actually work for comments on vanity urls, as the underlying article url is used in coral
			const newUrl = href.replace(paywalledReportPath, redirectReportPath);
			window.open(newUrl);
		}

		document.addEventListener('oComments.ready', () => {
			const shadowContainer = this.streamEl.querySelector('#coral-shadow-container');
			const shadowRoot = shadowContainer?.shadowRoot;
			const shadowFirstContainer = shadowRoot?.children?.length && shadowRoot.children[0];
			if (shadowFirstContainer) {
				const commentReportDelegate = new Delegate(shadowFirstContainer);
				commentReportDelegate.on('click', 'a[href*=illegalContentReport]', sendToCommentReport);
			}
		});
	}

	authenticateUser (displayName) {
		const fetchOptions = {
			...this.options,
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
				this.isSubscribed = response?.isSubscribed;
				this.isTrialist = response?.isTrialist;
				this.isRegistered = response?.isRegistered;
			})
			.catch(() => {
				return false;
			});
	}

	renderComments () {
		return new Promise((resolve) => {
			try {
				/*global Coral*/
				const cacheBuster = 'cachebust=20210806';
				const rootUrl = this.useStagingEnvironment
					? 'https://ft.staging.coral.coralproject.net'
					: 'https://ft.coral.coralproject.net';
				const scriptElement = document.createElement('script');
				scriptElement.src = `${rootUrl}/assets/js/embed.js?${cacheBuster}`;
				const containerClassName = ['o-comments-coral-talk-container'];
				if(this.options.addClass){
					containerClassName.push(this.options.addClass);
				}
				const customScrollContainer = this.streamEl.closest(this.options.scrollContainer);
				scriptElement.onload = () => {
					this.embed = Coral.createStreamEmbed(
						{
							id: this.streamEl.id,
							storyURL: this.options.articleUrl,
							storyID: this.options.articleId,
							rootURL: rootUrl,
							autoRender: true,
							bodyClassName: 'o-comments-coral-talk-container',
							containerClassName,
							customScrollContainer,
							events: (events) => {
								events.onAny((name, data) => {
									this.publishEvent({ name, data });
								});
							}
						}
					);
					this.embed.on('ready', () => {
						resolve();
					});
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
					displayName.promptValidation(event)
						.then(displayName => {
							overlay.close();
							this.authenticateUser(displayName)
								.then(() => {
									this.login();
								});
							if (purgeCacheAfterCompletion) {
								purgeJwtCache(this.options);
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
	 * @param {object} args - The args object
	 * @param {string} args.name - The event name
	 * @param {object} args.data - The event payload
	 * @returns {void}
	 */
	publishEvent ({name, data = {}}) {
		const {
			success: {
				status
			} = {},
			error
		} = data;

		//TODO: CI-1493 userHasValidSession no longer required after subscriber only is not behind a flag
		if (name === 'loginPrompt' && (this.userHasValidSession || this.isSubscribed)) {
			return this.displayNamePrompt();
		}

		const mappedEvent = events.coralEventMap.get(name);

		if (mappedEvent) {
			const now = Number(new Date);
			const delayInMilliseconds = 100;
			const eventHasntBeenSeenRecently = !this.eventSeenTimes[mappedEvent.oComments] ||
				now > this.eventSeenTimes[mappedEvent.oComments] + delayInMilliseconds;

			if (eventHasntBeenSeenRecently) {
				this.eventSeenTimes[mappedEvent.oComments] = now;

				const oCommentsEventOptions = { bubbles: true };
				if (error) {
					oCommentsEventOptions.detail = { error };
				}

				const oCommentsEvent = new CustomEvent(mappedEvent.oComments, oCommentsEventOptions);
				this.streamEl.dispatchEvent(oCommentsEvent);

				// Refactor defaultDetail to add a 'content' block before dispatching the event
				const defaultDetailWithContentAdded =  { 			
					category: 'comment',
					action: mappedEvent.oTracking,
					coral: true,
					isWithheld: status === 'SYSTEM_WITHHELD',
					content : {
						asset_type: this.options.assetType,
						uuid: this.options.articleId,
					}
				}

				if (mappedEvent.oTracking && !this.options.disableOTracking) {

					if (error) {
						defaultDetailWithContentAdded.error = error;
					}

					dispatchTrackingEvent(defaultDetailWithContentAdded);
				}
			}
		}
	}

	renderSignedInMessage () {
		const editButtonId = `o-comments-edit-button--${this.streamEl.id}`;
		const signedInMessage = document.createElement('div');
		signedInMessage.classList.add('o-comments__signed-in-container');
		signedInMessage.innerHTML = `
									<p class="o-comments__signed-in-text">Signed in as
										<span class="o-comments__signed-in-inner-text"></span>
										<button id="${editButtonId}" class="o-comments__edit-display-name">
											Edit <span class="o-comments__edit-display-name-descriptive">commenting display name</span>
										</button>
									</p>`;
		signedInMessage.querySelector('.o-comments__signed-in-inner-text').innerText = this.displayName;

		const oldSignedInMessage = this.streamEl.parentNode.querySelector('.o-comments__signed-in-container');
		if (oldSignedInMessage) {
			oldSignedInMessage.remove();
		}

		this.streamEl.parentNode.insertBefore(signedInMessage, this.streamEl);

		document.getElementById(editButtonId).onclick = () => {
			this.displayNamePrompt({purgeCacheAfterCompletion: true});
		};
	}

	renderNotSignedInMessage () {
			if(this.isSubscribed){
				return;
			}

			const shadowRoot = this.streamEl.querySelector("#coral-shadow-container").shadowRoot;
			const coralContainer = shadowRoot.querySelector("#coral");
			coralContainer.setAttribute('data-user-not-signed-in' , true);
	
			const customMessageContainer = document.createElement("section");
			customMessageContainer.classList.add('coral__custom-message-content','coral');
			const messageRegistered = `
			<h3>Commenting is only available to readers with an FT subscription</h3>
				<p>
				${this.options.linkSubscribe ? `<a class="linkSubscribe" href='${this.options.linkSubscribe}'>Subscribe</a>` : `Subscribe`} to join the conversation.
				</p>
			`;
			const messageForAnonymous = `
			<h3>Commenting is only available to readers with an FT subscription</h3>
				<p>
					Please ${this.options.linkLogin ? ` <a class="linkLogin" href='${this.options.linkLogin}'>login</a>` : `login`} or ${this.options.linkSubscribe ? `<a href='${this.options.linkSubscribe}' class="linkSubscribe" >subscribe</a>` : `subscribe`} to join the conversation.
				</p>
			`;
			const messageForTrial = `
			<h3>You are still on a trial period</h3>
				<p>
					View our full ${this.options.linkSubscribe ? `<a class="linkSubscribe" href='${this.options.linkSubscribe}'>subscription packages</a>` : `subscription packages` } to join the conversation.
				</p>
			`;
			customMessageContainer.innerHTML = this.isTrialist ? messageForTrial : this.isRegistered ? messageRegistered : messageForAnonymous;
			// this content is attached after oTracking.init is called therefore set data-trackable to the links doesn't work, therefore we raise an event when click on it
			customMessageContainer.querySelector('.linkSubscribe')?.addEventListener('click', (event) => {
				event.preventDefault();
				const trackData = {
					category: 'comment',
					action: 'linkMessage',
					coral: false,
					content : {
						asset_type: this.options.assetType,
						uuid: this.options.articleId,
						linkType: 'subscribe',
						user_type: this.isTrialist ? 'trialist' : this.isRegistered ? 'registered' : 'anonymous'
					}
				}
				dispatchTrackingEvent(trackData);
				window.location.href = event?.target?.href;

			});
			customMessageContainer.querySelector('.linkLogin')?.addEventListener('click', (event) => {
				event.preventDefault();
				const trackData = {
					category: 'comment',
					action: 'linkMessage',
					coral: false,
					content : {
						asset_type: this.options.assetType,
						uuid: this.options.articleId,
						linkType: 'login',
						user_type: this.isTrialist ? 'trialist' : this.isRegistered ? 'registered' : 'anonymous'
					}
				}
				dispatchTrackingEvent(trackData);
				window.location.href = event?.target?.href;
			});
			coralContainer.prepend(customMessageContainer);

			const trackData = {
				category: 'comment',
				action: 'show-not-signed-in-message',
				coral: false,
				content : {
					asset_type: this.options.assetType,
					uuid: this.options.articleId,
					user_type: this.isTrialist ? 'trialist' : this.isRegistered ? 'registered' : 'anonymous'
				}
			}
			dispatchTrackingEvent(trackData);
	}

}

export default Stream;


function dispatchTrackingEvent (trackData = {}) {
	const oTrackingEventOptions = {
		bubbles: true,
		detail: {
			...trackData
		}
	};
	const oTrackingEvent = new CustomEvent('oTracking.event', oTrackingEventOptions);
	document.body.dispatchEvent(oTrackingEvent);
}
