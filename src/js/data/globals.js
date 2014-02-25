'use strict';

var $ = require('jquery'),
    globals = {};

function init () {
    var html = $('html'),
        isAnimatable = html.hasClass('csstransforms') && html.hasClass('csstransitions');

    globals.L = 'left';
    globals.R = 'right';
    globals.T = 'top';
    globals.B = 'bottom';
    globals.H = 'height';
    globals.W = 'width';
    globals.win = $(window);
    globals.body = $('body');
    globals.doc = $(document);
    globals.html = html;
    globals.presets = {};
    globals.templates = {};
    globals.isAnimatable = isAnimatable;
    globals.isFlexbox = html.hasClass('flexbox') || html.hasClass('flexboxlegacy');
    globals.dialogs = new Array(2);
    globals.reset = init;
    return globals;
}

init();

module.exports = globals;