/**
 * Class for our session.
 * Generate a session for tracking use only - note this is only an approximation of a session for the realtime feed, a 'real' session will be calculated later.
 * @module _Core
 * @submodule Store
 * @class Track._Core.Session
 * @static
 */

/*global module, require */
var store;

module.exports = (function () {
    "use strict";

    var
        defaultSessionConfig = {
            storage: 'best',
            name: 'session',
            expires: (30 * 60 * 1000) // 30 minutes
        },

        utils = require("../utils"),
        Store = require("./store");

    /**
     * Set the session in the store.
     * @method setSession
     * @param str {String} The session to be stored.
     * @return None
     */
    function setSession(session) {
        var d = new Date();
        d.setTime(d.getTime() + store.config.expires);

        store.write({
            value: session,
            expiry: d.valueOf()
        });
    }

    /**
     * Get the session from the store. Expiry and gen of a new session are handled here.
     * @method getSession
     * @return {String} the current session
     */
    function getSession() {
        var s = store.read(),
            session;

        if (s) {
            var d = (new Date()).valueOf(),
                exp = parseInt(s.expiry);

            // If current session is active.
            if (exp >= d) {
                session = s.value;
            }
        }

        // No active session, gen a new one.
        if (!session) {
            session = utils.b64encode(utils.createUniqueID());
        }

        // Refreshes the cookie...
        setSession(session);

        return session;
    }

    /**
     * Init
     * @method init
     * @param config {String|Object} The name used to store the session or configuration object.
     */
    function init(config) {
        if (utils.is(config, 'string')) {
            config = { name: config };
        }

        if (utils.is(config)) {
            config = {};
        }

        var c = utils.merge(defaultSessionConfig, config);

        // config.name is important here, means the user has specifically asked for a cookie name.
        if (c.storage === 'cookie' && config.name) {
            c.nameOverride = c.name;
        }

        store = new Store(c.name, c);

        return getSession();
    }


    return {
        init: init,
        session: getSession
    };
}());
