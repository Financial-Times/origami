'use strict';
var viewport = require('o-viewport');

viewport.listenTo('resize');

module.exports = function () {
    var self = this;

    this.opts.onBeforeRender(this);

    this.wrapper.classList.add('is-open');
    this.content.focus();

    this.width = this.getWidth(this);
    this.height = this.getHeight(this);

    this.respondToWindow(viewport.getSize());

    this.delegate.on('oViewport.resize', 'body', function (ev) {
        this.respondToWindow(ev.detail.viewport);
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