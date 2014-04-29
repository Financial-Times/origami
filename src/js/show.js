'use strict';


var adjustBodyHeight = function (dialog, fullHeight) {
        if (dialog.opts.hasHeading) {
            if (fullHeight) {
                dialog.body.height(dialog.content.height() - dialog.heading.outerHeight());
            } else {
                dialog.body.css('height', '');
            }
        }
    };



var reAlign = function (dimension, dialog) {

    if ((dimension === globals.H && !dialog.opts.isCenteredVertically) || (dimension === globals.W && !dialog.opts.isCenteredHorizontally)) {
        return;
    }

    var edge = dimension === globals.W ? globals.L : globals.T,
        otherDimension = dimension === globals.W ? globals.H : globals.W,
        capitalisedDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1),
        capitalisedOtherDimension = otherDimension.charAt(0).toUpperCase() + otherDimension.substr(1);

    if (dialog.opts['snapsToFull' + capitalisedDimension]) {
        // for ios7 only win.innerHeight provides the correct value when the browser chrome is present
        // need to use the jQuery method as a fallback as <ie9 don't support the property
        var winDimension = globals.win[0]['inner' + capitalisedDimension] || globals.win['inner' + capitalisedDimension]();
        
        if (winDimension <= dialog[dimension]) {
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
                    methods.dimensionCalculators[dimension](dialog),
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


module.exports = function () {
    var self = this;

    this.opts.onBeforeRender(this);

    this.wrapper.classList.add('is-open');
    this.content.focus();

    this.width = this.getWidth(this);
    this.height = this.getHeight(this);

    this.respondToWindow();

    this.delegate.on('resize', function() {
        this.respondToWindow();
    });

    this.hide = this.hide.bind(this);
    this.delegate.on('oLayers.hideAll', 'body', this.hide);

    if (this.opts.isDismissable) {

        this.closeOnExternalClick = this.closeOnExternalClick.bind(this);

        setTimeout(function () {
            self.delegate.on('click', '*', this.closeOnExternalClick);
        }, 1);


        this.delegate.on('keyup', function (ev) {
            if (ev.keyCode === 27) {
                self.close();
            }
        });
    }

    this.opts.onAfterRender(this);
};