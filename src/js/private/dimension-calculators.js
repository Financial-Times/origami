"use strict";

var methods = require('../private/dom-utils');

methods.dimensionCalculators = {
    width: function (dialog) {
        return dialog.content.outerWidth() + methods.domUtils.getSpacing(dialog.wrapper, 'left') + methods.domUtils.getSpacing(dialog.wrapper, 'right');
    },
    height: function (dialog) {
        return dialog.content.outerHeight() + methods.domUtils.getSpacing(dialog.wrapper, 'top') + methods.domUtils.getSpacing(dialog.wrapper, 'bottom');
    }
};

module.exports = methods;