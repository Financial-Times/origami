"use strict";

var methods = require('../methods');

function getSpacing(el, side) {
    return (parseInt(el.css('padding-' + side), 10) || 0) + (parseInt(el.css('margin-' + side), 10) || 0);
}

methods.dimensionCalculators = {
    width: function (dialog) {
        return dialog.content.outerWidth() + getSpacing(dialog.wrapper, 'left') + getSpacing(dialog.wrapper, 'right');
    },
    height: function (dialog) {
        return dialog.content.outerHeight() + getSpacing(dialog.wrapper, 'top') + getSpacing(dialog.wrapper, 'bottom');
    }
};

module.exports = methods;