"use strict";

var globals = require('../data/globals'),
    dimensionCalculators = require('../private/dimension-calculators'),


    adjustBodyHeight = function (dialog, fullHeight) {
        if (dialog.opts.hasHeading) {
            if (fullHeight) {
                dialog.body.height(dialog.content.height() - dialog.heading.outerHeight());
            } else {
                dialog.body.css('height', '');
            }
        }
    };



module.exports = function (dimension, dialog) {

    if ((dimension === globals.H && !dialog.opts.isCenteredVertically) || (dimension === globals.W && !dialog.opts.isCenteredHorizontally)) {
        return;
    }

    var edge = dimension === globals.W ? globals.L : globals.T,
        otherDimension = dimension === globals.W ? globals.H : globals.W,
        capitalisedDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1),
        capitalisedOtherDimension = otherDimension.charAt(0).toUpperCase() + otherDimension.substr(1);

    if (dialog.opts['snapsToFull' + capitalisedDimension]) {
        if (globals.win[dimension]() <= dialog[dimension]) {
            dialog['isFull' + capitalisedDimension] = true;
            dialog.wrapper.addClass('o-dialog--full-' + dimension);
            if (!globals.isFlexbox) {
                dialog.content.css('margin-' + edge, 0);
                adjustBodyHeight(dialog, true);
            }
        } else {
            dialog['isFull' + capitalisedDimension] = false;
            dialog.wrapper.removeClass('o-dialog--full-' + dimension).attr('style', null);
            if (!globals.isFlexbox) {
                adjustBodyHeight(dialog, false);
            }
            if (!dialog['isFull' + capitalisedOtherDimension]) {
                dialog[dimension] = Math.max(
                    dimensionCalculators[dimension](dialog),
                    dialog[dimension]
                );
            }

            if (!globals.isFlexbox) {
                dialog.content.css('margin-' + edge, -dialog.content['outer' + capitalisedDimension]()/2);
            }
        }
    }
    if (!globals.isFlexbox && dimension === globals.W && !dialog.opts.isCenteredHorizontally) {
        dialog.content.css('margin-' + edge, 'auto');
    }

};