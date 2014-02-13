"use strict";

var globals = require('../data/globals');

module.exports = function () {

    if (globals.isAnimatable) {
        if (globals.dialogs[0] && globals.dialogs[0].active) {
            globals.dialogs.reverse();
        }
    }
    if (!globals.dialogs[0]) {
        globals.dialogs[0] = require('./create-container')();
    }

    return globals.dialogs[0];
};