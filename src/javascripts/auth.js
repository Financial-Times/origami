/* global fyre */

var commentUtilities = require('comment-utilities');

/**
 * Auth creates Livefyre RemoteAuthDelegate, also provides login and logout into Livefyre.
 * @param {fyre} lfObj
 */
function Auth (lfObj) {
    "use strict";

    /**
     * See http://docs.livefyre.com/developers/user-auth/remote-profiles/#BuildingAuthDelegate
     * @type {RemoteAuthDelegate}
     */
    var authDelegate = new lfObj.conv.RemoteAuthDelegate();

    var event = new commentUtilities.Events();

    this.on = event.on;
    this.off = event.off;

    /**
     * Get the RemoteAuthDelegate instance.
     * @return {RemoteAuthDelegate}
     */
    this.getAuthDelegate = function () {
        return authDelegate;
    };

    /**
     * Logs in the user in the Livefyre system.
     * @param  {object} See http://docs.livefyre.com/developers/getting-started/tokens/auth/#flex-step-1-user-auth-json-object
     */
    this.login = function (token) {
        commentUtilities.logger.log('login called with token', token);

        var response = lfObj.conv.login(token);
        event.trigger('login.auth', token);

        return response;
    };

    /**
     * Logs out the user in the Livefyre system, and also clears the token from the local cache.
     */
    this.logout = function () {
        var response = lfObj.conv.logout();
        event.trigger('logout.auth');

        return response;
    };
}


var instance;
module.exports = {
    getInstance: function () {
        "use strict";

        if (typeof fyre === 'undefined') {
            return undefined;
        }

        if (typeof instance !== 'undefined') {
            return instance;
        }

        instance = new Auth(fyre);
        return instance;
    }
};