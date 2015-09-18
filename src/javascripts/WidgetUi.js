"use strict";

var oCommentUtilities = require('o-comment-utilities'),
	oCommentUi = require('o-comment-ui'),
	envConfig = require('./config.js');

/**
 * FT specific UI customizing of the Livefyre widget.
 * @param {DOMElement} widgetContainer Container of the widget instance.
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

	var self = this;

	/**
	 * Makes the Livefyre comments widget read-only by hiding the editors and action buttons.
	 * @return {[type]} [description]
	 */
	this.makeReadOnly = function () {
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');

		style.type = 'text/css';

		var css = '#' + self.widgetContainer.id + ' .fyre-editor, '+
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
		var head = document.head || document.getElementsByTagName('head')[0];
		var style = document.createElement('style');

		style.type = 'text/css';

		var css = '#' + self.widgetContainer.id + ' .fyre-follow-button {'+
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
	 */
	this.hideSignInLink = function () {
		var signInLinkContainer = self.widgetContainer.querySelector('a.fyre-user-loggedout');

		if (signInLinkContainer) {
			signInLinkContainer.style.display = 'none';
		}
	};

	/**
	 * Inserts message when SUDS reports as authentication is not available.
	 */
	this.addAuthNotAvailableMessage = function () {
		var authContainer = self.widgetContainer.querySelector('.fyre-auth');

		if (authContainer) {
			authContainer.appendChild(oCommentUi.utils.toDOM(oCommentUi.templates.unavailableTemplate.render()));
		}
	};



	/**
	 * Inserts the terms and guidelines text into the widget.
	 */
	this.addTermsAndGuidelineMessage = function () {
		var editorContainers = self.widgetContainer.querySelectorAll('.fyre-widget > .fyre-editor');

		if (editorContainers.length) {
			for (var i = 0; i < editorContainers.length; i++) {
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
	 */
	this.addSettingsLink = function (options) {
		oCommentUtilities.logger.log("Commenting settings link adding triggered.");

		var noOfTrial = 0;

		clearInterval(checkPseudonymInterval);
		checkPseudonymInterval = setInterval(function () {
			var pseudonymContainer = self.widgetContainer.querySelector('.fyre-auth .fyre-login-bar .fyre-box-wrapper .fyre-user-loggedin');
			if (pseudonymContainer || noOfTrial === 120) {
				clearInterval(checkPseudonymInterval);

				if (!self.widgetContainer.querySelector('.o-comment-ui--settings')) {
					if (noOfTrial === 120) {
						// give up
						return;
					}

					var loginBarContainer = self.widgetContainer.querySelector('.fyre-auth .fyre-login-bar');
					if (loginBarContainer) {
						var commentingSettingsLinkConfig = {};
						if (envConfig.get().emailNotifications !== true) {
							commentingSettingsLinkConfig.label = "Edit pseudonym";
						}

						loginBarContainer.appendChild(oCommentUi.utils.toDOM(oCommentUi.templates.commentingSettingsLink.render(commentingSettingsLinkConfig)));
					}

					var settingsLink = self.widgetContainer.querySelector('.fyre-auth .fyre-login-bar .o-comment-ui--settings-text');
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
	var checkPseudonymInterval;

	/**
	 * Removes the settings link from the widget.
	 */
	this.removeSettingsLink = function () {
		var el = self.widgetContainer.querySelector('.o-comment-ui--settings');
		if (el) {
			el.parentNode.removeChild(el);
		}
	};

	/**
	 * Comment counter is part of the Livefyre widget, but on FT.com this
	 * element is moved out into the header.
	 */
	this.moveCommentCountOut = function () {
		var fyreEl = self.widgetContainer.querySelector('.fyre');
		var fyreStreamStatsEl = self.widgetContainer.querySelector('.fyre-stream-stats');

		if (fyreEl && fyreStreamStatsEl) {
			var counterEl = fyreStreamStatsEl.querySelector('.fyre-comment-count');

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

	this.showOwnCommentBanned = function (commentId) {
		var commentElement = self.widgetContainer.querySelector('.fyre-comment-article[data-message-id="'+ commentId +'"]');

		if (commentElement && !commentElement.querySelector('.o-comments--blocked')) {
			var blockedElement = document.createElement('div');
			blockedElement.innerHTML = "blocked";
			blockedElement.className = "o-comments--blocked";

			if (self.config.layout === 'side') {
				var commentHead = commentElement.querySelector('.fyre-comment-head');
				commentHead.insertBefore(blockedElement, commentHead.firstChild);
			} else {
				commentElement.querySelector('.fyre-comment-date').style.display = 'none';
				commentElement.appendChild(blockedElement);
			}
		}
	};
}
WidgetUi.__extend = function(child) {
	if (typeof Object.create === 'function') {
		child.prototype = Object.create(WidgetUi.prototype);
	} else {
		var Tmp = function () {};
		Tmp.prototype = WidgetUi.prototype;
		child.prototype = new Tmp();
		child.prototype.constructor = child;
	}
};

oCommentUi.WidgetUi.__extend(WidgetUi);

module.exports = WidgetUi;
