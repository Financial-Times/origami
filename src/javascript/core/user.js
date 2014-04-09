/**
 * Class for user.
 * Handling the user identifier.
 * @module _Core
 * @submodule Store
 * @class Track._Core.User
 * @static
 */

/*global module, require */
var userID;

module.exports = (function () {
    "use strict";

    var
        defaultUserConfig = {
            storage: 'best',
            name: 'userID',
            value: null
        },

        utils = require("../utils"),
        Store = require("./store");

    /**
     * Init
     * @method init
     * @param config {String|Object} The value of a userID to use or configuration object.
     */
    function init(config) {
        if (typeof config === 'string') {
            config = { value: config };
        }

        if (typeof config === 'undefined') {
            config = {};
        }

        var c = utils.merge(defaultUserConfig, config),
            store;

        // config.name is important here, means the user has specifically asked for a cookie name.
        if (c.storage === 'cookie' && config.name) {
            c.nameOverride = c.name;
        }

        store = new Store(c.name, c);

        userID = store.read();

        if (!userID) {
            userID = c.value;
        }

        if (!userID) {
            userID = utils.b64encode(utils.createUniqueID());
        }

        store.write(userID); // Refreshes the cookie...

        return userID;
    }


    return {
        init: init,
        userID: function () { return userID; }
    };
}());
