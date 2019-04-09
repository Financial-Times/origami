const oCommentUtilities = require('o-comment-utilities');
const oCommentUi = require('o-comment-ui');
const envConfig = require('./config.js');
const Delegate = require('ftdomdelegate');

/**
 * FT specific UI customizing of the Livefyre widget.
 * @param {DOMElement} widgetContainer Container of the widget instance.
 * @param {Object} config Config object of the Widget instance
 * @returns {undefined}
 */
function WidgetUi (widgetContainer, config) {
	oCommentUi.WidgetUi.apply(this, arguments);

	if (!this.config) {
		this.config = config;
	}

	if (typeof this.config !== 'object') {
		this.config = {};
	}
	if (!this.config.layout) {
		this.config.layout = 'normal';
	}
	if (!this.config.stream_type) {
		this.config.stream_type = 'livecomments';
	}

	const self = this;

	/**
	 * Makes the Livefyre comments widget read-only by hiding the editors and action buttons.
	 * @return {[type]} [description]
	 */
	this.makeReadOnly = function () {
		const head = document.head || document.getElementsByTagName('head')[0];
		const style = document.createElement('style');

		style.type = 'text/css';

		const css = '#' + self.widgetContainer.id + ' .fyre-editor, '+
					'#' + self.widgetContainer.id + ' .fyre-comment-like, '+
					'#' + self.widgetContainer.id + ' .fyre-comment-action-button {'+
						'display: none;'+
					'}';

		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	};

	this.hideFollowButton = function () {
		const head = document.head || document.getElementsByTagName('head')[0];
		const style = document.createElement('style');

		style.type = 'text/css';

		const css = '#' + self.widgetContainer.id + ' .fyre-follow-button {'+
						'display: none;'+
					'}';

		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	};

	/**
	 * Hide the sign in link (used when the user is signed in in FT, but doesn't have a pseudonym yet
	 * so can't be signed in into Livefyre).
	 * @return {undefined}
	 */
	this.hideSignInLink = function () {
		const signInLinkContainer = self.widgetContainer.querySelector('a.fyre-user-loggedout');

		if (signInLinkContainer) {
			signInLinkContainer.style.display = 'none';
		}
	};

	/**
	 * Inserts message when SUDS reports as authentication is not available.
	 * @return {undefined}
	 */
	this.addAuthNotAvailableMessage = function () {
		const authContainer = self.widgetContainer.querySelector('.fyre-auth');

		if (authContainer) {
			authContainer.appendChild(oCommentUi.utils.toDOM(oCommentUi.templates.authUnavailableTemplate.render()));
		}
	};



	/**
	 * Inserts the terms and guidelines text into the widget.
	 * @return {undefined}
	 */
	this.addTermsAndGuidelineMessage = function () {
		const editorContainers = self.widgetContainer.querySelectorAll('.fyre-widget > .fyre-editor');

		if (editorContainers.length) {
			for (let i = 0; i < editorContainers.length; i++) {
				editorContainers[i]
					.parentNode
					.insertBefore(
						oCommentUi.utils.toDOM(oCommentUi.templates.termsAndGuidelinesTemplate.render()),
						editorContainers[i].nextSibling
					);
			}
		}
	};

	/**
	 * Inserts settings link and attaches the necessary click handler.
	 * It also waits until the current pseudonym is loaded after the log in.
	 * @param {Object} options Object which can have the following fields:
	 *                             onClick (callback function, required),
	 *                             onAdded (callback function)
	 * @return {undefined}
	 */
	this.addSettingsLink = function (options) {
		oCommentUtilities.logger.log('Commenting settings link adding triggered.');

		let noOfTrial = 0;

		clearInterval(checkPseudonymInterval);
		checkPseudonymInterval = setInterval(function () {
			const pseudonymContainer = self.widgetContainer.querySelector('.fyre-auth .fyre-login-bar .fyre-box-wrapper .fyre-user-loggedin');
			if (pseudonymContainer || noOfTrial === 120) {
				clearInterval(checkPseudonymInterval);

				if (!self.widgetContainer.querySelector('.o-comment-ui--settings')) {
					if (noOfTrial === 120) {
						// give up
						return;
					}

					const loginBarContainer = self.widgetContainer.querySelector('.fyre-auth .fyre-login-bar');
					if (loginBarContainer) {
						const commentingSettingsLinkConfig = {};
						if (envConfig.get().emailNotifications !== true) {
							commentingSettingsLinkConfig.label = 'Edit pseudonym';
						}

						loginBarContainer.appendChild(oCommentUi.utils.toDOM(oCommentUi.templates.commentingSettingsLink.render(commentingSettingsLinkConfig)));
					}

					const settingsLink = self.widgetContainer.querySelector('.fyre-auth .fyre-login-bar .o-comment-ui--settings-text');
					if (settingsLink) {
						settingsLink.addEventListener('click', function () {
							if (options && typeof options.onClick === 'function') {
								options.onClick();
							}
						});

						if (options && typeof options.onAdded === 'function') {
							options.onAdded();
						}
					}
				}
			} else {
				noOfTrial++;
			}
		}, 500);
	};
	let checkPseudonymInterval;

	/**
	 * Removes the settings link from the widget.
	 * @return {undefined}
	 */
	this.removeSettingsLink = function () {
		const el = self.widgetContainer.querySelector('.o-comment-ui--settings');
		if (el) {
			el.parentNode.removeChild(el);
		}
	};

	/**
	 * Comment counter is part of the Livefyre widget, but on FT.com this
	 * element is moved out into the header.
	 * @return {undefined}
	 */
	this.moveCommentCountOut = function () {
		const fyreEl = self.widgetContainer.querySelector('.fyre');
		const fyreStreamStatsEl = self.widgetContainer.querySelector('.fyre-stream-stats');

		if (fyreEl && fyreStreamStatsEl) {
			const counterEl = fyreStreamStatsEl.querySelector('.fyre-comment-count');

			if (counterEl) {
				fyreEl.style.paddingTop = '30px';
				fyreEl.style.position = 'relative';

				fyreStreamStatsEl.style.position = 'absolute';
				fyreStreamStatsEl.style.top = '0';
				fyreStreamStatsEl.style.float = 'none';
				fyreStreamStatsEl.style.width = '100%';
				fyreStreamStatsEl.className = 'comment-header';

				counterEl.className = '';
			}
		}
	};

	function pollForCommentElement (commentId, visible, i, callback) {
		const commentElement = self.widgetContainer.querySelector('.fyre-comment-article[data-message-id="'+ commentId +'"]');
		if (commentElement && (visible ? commentElement.querySelector('.fyre-comment-date') : true)) {
			callback(commentElement);
		} else {
			if (i < 1000) {
				setTimeout(function () {
					pollForCommentElement(commentId, visible, i * 2, callback);
				}, i);
			} else {
				callback();
			}
		}
	}

	this.showCommentBanned = function (commentId) {
		pollForCommentElement(commentId, true, 50, function (commentElement) {
			if (commentElement && !commentElement.querySelector('.o-comments--blocked')) {
				const blockedElement = document.createElement('div');
				blockedElement.innerHTML = 'blocked';
				blockedElement.className = 'o-comments--blocked';

				if (self.config.layout === 'side') {
					const commentHead = commentElement.querySelector('.fyre-comment-head');
					commentHead.insertBefore(blockedElement, commentHead.firstChild);
				} else {
					commentElement.querySelector('.fyre-comment-date').style.display = 'none';
					commentElement.appendChild(blockedElement);
				}
			}
		});
	};

	this.removeCommentBanned = function (commentId) {
		pollForCommentElement(commentId, false, 50, function (commentElement) {
			if (commentElement && commentElement.querySelector('.o-comments--blocked')) {
				commentElement.removeChild(commentElement.querySelector('.o-comments--blocked'));

				if (commentElement.querySelector('.fyre-comment-date')) {
					commentElement.querySelector('.fyre-comment-date').style.display = '';
				}
			}
		});
	};

	this.hideDeleteButtons = function (interval) {
		const commentContainer = self.widgetContainer.querySelector('.fyre-widget .fyre-comment-stream');
		const commentWrappers = commentContainer.querySelectorAll('.fyre-comment-wrapper');

		for (let i = 0; i < commentWrappers.length; i++) {
			const commentWrapper = commentWrappers[i];
			const dateCreatedEl = commentWrapper.querySelector('meta[itemprop="dateCreated"]');
			const banLink = commentWrapper.querySelector('.fyre-ban-link');
			const deleteLink = commentWrapper.querySelector('.fyre-delete-link');

			if (dateCreatedEl && deleteLink && !banLink) {
				const dateCreated = dateCreatedEl.getAttribute('content');

				if ((new Date()).getTime() - (new Date(dateCreated)).getTime() > interval * 60 * 1000) {
					deleteLink.parentNode.removeChild(deleteLink);
				}
			}
		}
	};

	this.onNewCommentVisible = function (callback) {
		const editorDelegate = new Delegate(document.querySelector('.fyre'));

		editorDelegate.on('click', '.fyre-stream-more', callback);
		editorDelegate.on('click', '.fyre-reply-more-toggle', callback);
	};

	let __superDestroy = this.destroy;
	this.destroy = function () {
		clearInterval(checkPseudonymInterval);
		__superDestroy();
		__superDestroy = null;
	};
}
WidgetUi.__extend = function(child) {
	if (typeof Object.create === 'function') {
		child.prototype = Object.create(WidgetUi.prototype);
	} else {
		const Tmp = function () {};
		Tmp.prototype = WidgetUi.prototype;
		child.prototype = new Tmp();
		child.prototype.constructor = child;
	}
};

oCommentUi.WidgetUi.__extend(WidgetUi);

module.exports = WidgetUi;
