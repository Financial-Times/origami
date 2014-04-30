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
    this.resizeListener = this.resizeListener.bind(this);
    this.delegate.on('oViewport.resize', 'body', this.resizeListener);

    this.hide = this.hide.bind(this);
    this.delegate.on('oLayers.hideAll', 'body', this.hide);

    if (this.opts.isDismissable) {

        this.closeOnExternalClick = this.closeOnExternalClick.bind(this);

        // wrapped in timeout to make sure it doesn't handle the click that opened the modal
        setTimeout(function () {
            self.delegate.on('click', '*', self.closeOnExternalClick);
        }, 1);

        this.closeOnEscapePress = this.closeOnEscapePress.bind(this);
        this.delegate.on('keyup', this.closeOnEscapePress);
    }

    this.opts.onAfterRender(this);
};