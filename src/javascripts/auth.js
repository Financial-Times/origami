/* global fyre */
"use strict";

var commentUtilities = require('comment-utilities');
var userDialogs = require('./userDialogs');
var oCommentData = require('o-comment-data');
var utils = require('./utils.js');

/**
 * Auth creates Livefyre RemoteAuthDelegate, also provides login and logout into Livefyre.
 */
function Auth () {
    var self = this;

    /**
     * See http://docs.livefyre.com/developers/user-auth/remote-profiles/#BuildingAuthDelegate
     * @type {RemoteAuthDelegate}
     */
    var authDelegate;

    var event = new commentUtilities.Events();

    this.on = event.on;
    this.off = event.off;

    /**
     * Pseudonym is still missing.
     * @type {Boolean}
     */
    this.pseudonymMissing = false;

    /**
     * Pseudonym was missing since the page was loaded and only 1 comment was posted.
     * @type {Boolean}
     */
    this.pseudonymWasMissing = false;


    this.authPageReload = false;

    function getLfObj () {
        return fyre;
    }

    /**
     * Get the RemoteAuthDelegate instance.
     * @return {RemoteAuthDelegate}
     */
    this.getAuthDelegate = function () {
        var lfObj = getLfObj();

        if (!authDelegate && lfObj) {
            authDelegate = new lfObj.conv.RemoteAuthDelegate();
        }

        return authDelegate;
    };

    /**
     * Logs in the user in the Livefyre system.
     * @param  {object} See http://docs.livefyre.com/developers/getting-started/tokens/auth/#flex-step-1-user-auth-json-object
     */
    this.login = function (token) {
        commentUtilities.logger.log('login called with token', token);

        if (!getLfObj()) {
            return;
        }

        var response = getLfObj().conv.login(token);
        event.trigger('login.auth', token);

        return response;
    };

    /**
     * Logs out the user in the Livefyre system, and also clears the token from the local cache.
     */
    this.logout = function () {
        if (!getLfObj()) {
            return;
        }

        var response = getLfObj().conv.logout();
        event.trigger('logout.auth');

        return response;
    };


    /**
     * Login required and pseudonym is missing
     * @param  {[type]} delegate [description]
     * @return {[type]}          [description]
     */
    this.loginRequiredPseudonymMissing = function (delegate, maintainCommentQueue) {
        commentUtilities.logger.log('pseudonymMissing');

        userDialogs.showSetPseudonymDialog({
            success: function (authData) {
                if (self.authPageReload === true && !maintainCommentQueue) {
                    utils.emptyLivefyreActionQueue();
                }

                if (authData && authData.token) {
                    self.login(authData.token);
                }

                if (delegate && delegate.success) {
                    delegate.success();
                }
            },
            failure: function () {
                utils.emptyLivefyreActionQueue();

                if (delegate && delegate.failure) {
                    delegate.failure();
                }
            }
        });
    };

    /**
     * Login required, first attempt of the login process is successful.
     * If the user is still not logged in, then fail.
     * If the user has no pseudonym, ask for a pseudonym.
     * @param  {[type]} delegate [description]
     * @return {[type]}          [description]
     */
    function loginRequiredAfterASuccess (delegate) {
        oCommentData.api.getAuth({
            force: true
        }, function (err, authData) {
            if (authData && authData.pseudonym === false) {
                self.loginRequiredPseudonymMissing(delegate);
            } else {
                if (delegate && delegate.failure) {
                    delegate.failure();
                }
            }
        });
    }

    /**
     * Login is required.
     * If pseudonym is missing, ask for a pseudonym.
     * If there is no known method to login the user, generate a `loginRequired.authAction` event that can be handled at the integration level.
     * If successful, check if the user is logged in.
     * @param  {[type]} delegate [description]
     * @return {[type]}          [description]
     */
    this.loginRequired = function (delegate) {
        oCommentData.api.getAuth(function (err, authData) {
            if (authData && authData.pseudonym === false) {
                self.loginRequiredPseudonymMissing(delegate);
            } else if (!authData || !authData.token) {
                event.trigger('loginRequired.authAction', {
                    success: function () {
                        loginRequiredAfterASuccess(delegate);
                    },
                    failure: function () {
                        utils.emptyLivefyreActionQueue();
                        
                        if (delegate && delegate.failure) {
                            delegate.failure();
                        }
                    }
                });
            } else {
                self.login(authData.token);
                
                if (delegate && delegate.success) {
                    delegate.success();
                }
            }
        });
    };
}

module.exports = new Auth();