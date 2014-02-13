"use strict";

var domUtils = require('../private').domUtils;

module.exports = {
    width: function (dialog) {
        return dialog.content.outerWidth() + domUtils.getSpacing(dialog.wrapper, 'left') + domUtils.getSpacing(dialog.wrapper, 'right');
    },
    height: function (dialog) {
        return dialog.content.outerHeight() + domUtils.getSpacing(dialog.wrapper, 'top') + domUtils.getSpacing(dialog.wrapper, 'bottom');
    }
};