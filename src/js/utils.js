'use strict';

module.exports = {
    unCapitalise: function (str) {
        return str.charAt(0).toLowerCase() + str.substr(1);
    },

    capitalise: function (str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
};