'use strict';
var viewport = require('o-viewport');
viewport.debug();
viewport.listenTo('resize');

var Delegate = require('dom-delegate');

module.exports = function () {
    this.opts.onBeforeRender(this);

    this.wrapper.classList.add('is-open');
    this.content.focus();

    this.width = this.getWidth(this);
    this.height = this.getHeight(this);

    this.respondToWindow(viewport.getSize());
    this.resizeListener = this.resizeListener.bind(this);



    if (this.delegates) {
        this.delegates.win.root(window);
        this.delegates.wrap.root(this.wrapper);
    } else {
        this.close = this.close.bind(this);

        this.delegates = {
            win: new Delegate(window),
            wrap: new Delegate(this.wrapper)
        };

        this.globalDelegate.on('oLayers.closeAll', this.close);
        
        this.delegates.win.on('oViewport.resize', 'body', this.resizeListener);
        this.delegates.win.on('oLayers.open', 'body', this.close);
        if (this.opts.isDismissable) {
            this.delegates.wrap.on('click', '.o-modal__close', this.close);
            this.closeOnExternalClick = this.closeOnExternalClick.bind(this);
            
            this.delegates.win.on('click', '.o-modal__overlay', this.closeOnExternalClick);

            this.closeOnEscapePress = this.closeOnEscapePress.bind(this);
            this.delegates.win.on('keyup', this.closeOnEscapePress);
        }
    }

    this.opts.onAfterRender(this);
};