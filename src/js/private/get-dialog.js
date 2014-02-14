"use strict";

var methods = require('../private/create-container'),
	globals = require('../data/globals');

methods.getDialog = function () {

    if (globals.isAnimatable) {
        if (globals.dialogs[0] && globals.dialogs[0].active) {
            globals.dialogs.reverse();
        }
    }
    if (!globals.dialogs[0]) {
        globals.dialogs[0] = methods.createContainer();
    }

    return globals.dialogs[0];
};

module.exports = methods;