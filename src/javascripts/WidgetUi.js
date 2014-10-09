var commentUtilities = require('comment-utilities'),
    commentUi = require('comment-ui'),
    envConfig = require('./config.js'),
    sizzle = require('sizzle');

/**
 * FT specific UI customizing of the Livefyre widget.
 * @param {DOMElement} widgetContainer Container of the widget instance.
 */
function WidgetUi (widgetContainer) {
    "use strict";

    commentUi.WidgetUi.apply(this, arguments);

    /**
     * Makes the Livefyre comments widget read-only by hiding the editors and action buttons.
     * @return {[type]} [description]
     */
    this.makeReadOnly = function () {
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        style.type = 'text/css';

        var css = '<style>'+
                '#' + widgetContainer.id + ' .fyre-editor, '+
                '#' + widgetContainer.id + ' .fyre-comment-like, '+
                '#' + widgetContainer.id + ' .fyre-comment-action-button {'+
                    'display: none;'+
                '}'+
            '</style>';

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

        var css = '<style>'+
                '#' + widgetContainer.id + ' .fyre-follow-button {'+
                    'display: none;'+
                '}'+
            '</style>';

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
        var signInLinkContainer = sizzle('a.fyre-user-loggedout', widgetContainer);

        if (signInLinkContainer.length) {
            signInLinkContainer[0].style.display = 'none';
        }
    };

    /**
     * Inserts message when SUDS reports as authentication is not available.
     */
    this.addAuthNotAvailableMessage = function () {
        var authContainer = sizzle('.fyre-auth', widgetContainer);

        if (authContainer.length) {
            authContainer[0].appendChild(commentUi.utils.toDOM(commentUi.templates.unavailableTemplate.render()));
        }
    };

    

    /**
     * Inserts the terms and guidelines text into the widget.
     */
    this.addTermsAndGuidelineMessage = function () {
        var editorContainers = sizzle('.fyre-widget > .fyre-editor', widgetContainer);

        if (editorContainers.length) {
            for (var i = 0; i < editorContainers.length; i++) {
                editorContainers[i]
                    .parentNode
                    .insertBefore(
                        commentUi.utils.toDOM(commentUi.templates.termsAndGuidelinesTemplate.render()),
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
        commentUtilities.logger.log("Commenting settings link adding triggered.");

        var noOfTrial = 0;

        clearInterval(checkPseudonymInterval);
        checkPseudonymInterval = setInterval(function () {
            var pseudonymContainer = sizzle('.fyre-auth .fyre-login-bar .fyre-box-wrapper .fyre-user-loggedin', widgetContainer);
            if (pseudonymContainer.length || noOfTrial === 120) {
                clearInterval(checkPseudonymInterval);

                if (sizzle('.comment-settings', widgetContainer).length === 0) {
                    if (noOfTrial === 120) {
                        // give up
                        return;
                    }

                    var loginBarContainer = sizzle('.fyre-auth .fyre-login-bar', widgetContainer);
                    if (loginBarContainer.length) {
                        var commentingSettingsLinkConfig = {};
                        if (envConfig.get().emailNotifications !== true) {
                            commentingSettingsLinkConfig.label = "Edit pseudonym";
                        }

                        loginBarContainer[0].appendChild(commentUi.utils.toDOM(commentUi.templates.commentingSettingsLink.render(commentingSettingsLinkConfig)));
                    }

                    var settingsLink = sizzle('.fyre-auth .fyre-login-bar .comment-settings-text', widgetContainer);
                    if (settingsLink.length) {
                        commentUi.utils.addEventListener('click', settingsLink[0], function () {
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
        var el = sizzle('.comment-settings', widgetContainer);
        if (el.length) {
            el[0].parentNode.removeChild(el[0]);
        }
    };

    /**
     * Comment counter is part of the Livefyre widget, but on FT.com this
     * element is moved out into the header.
     */
    this.moveCommentCountOut = function () {
        var fyreEl = sizzle('.fyre', widgetContainer);
        var fyreStreamStatsEl = sizzle('.fyre-stream-stats', widgetContainer);

        if (fyreEl.length && fyreStreamStatsEl.length) {
            var counterEl = sizzle('.fyre-comment-count', fyreStreamStatsEl[0]);
            
            if (counterEl.length) {
                fyreEl = fyreEl[0];
                fyreStreamStatsEl = fyreStreamStatsEl[0];
                counterEl = counterEl[0];

                fyreEl.style.paddingTop = '30px';
                fyreEl.style.position = 'relative';

                fyreStreamStatsEl.style.position = 'absolute';
                fyreStreamStatsEl.style.top = '-10px';
                fyreStreamStatsEl.style.float = 'none';
                fyreStreamStatsEl.style.width = '100%';
                fyreStreamStatsEl.className = 'comment-header';

                counterEl.className = '';
            }
        }
    };
}
WidgetUi.__extend = function(child) {
    "use strict";

    if (typeof Object.create === 'function') {
        child.prototype = Object.create(WidgetUi.prototype);
        child.prototype = Object.create(WidgetUi.prototype);
    } else {
        var Tmp = function () {};
        Tmp.prototype = WidgetUi.prototype;
        child.prototype = new Tmp();
        child.prototype.constructor = child;
    }
};

commentUi.WidgetUi.__extend(WidgetUi);

module.exports = WidgetUi;