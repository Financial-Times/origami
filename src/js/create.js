'use strict';

var Delegate = require('dom-delegate');

var wrapperSeed = document.createElement('div');
wrapperSeed.className = 'o-modal';
wrapperSeed.innerHTML = '<div class="o-modal__overlay"></div><section class="o-modal __content"></section>';


module.exports = function () {

    this.delegate = new Delegate(window);

    this.wrapper = wrapperSeed.cloneNode(true);

    this.content = this.wrapper.children[1];

    if (this.opts.hasOverlay) {
        this.overlay = this.wrapper.children[0];
    } else {
        this.wrapper.removeChild(this.wrapper.children[0]);
    }
    
    this.broadcast('create', 'oLayers');

    if (typeof this.opts.content === 'string') {
        this.content.innerHTML = this.opts.content;
    } else {
        this.content.appendChild(this.opts.content);
    }

    if (this.opts.hasCloseButton) {
        var button = document.createElement('button');
        button.textContent = 'close';
        button.className = 'o-modal__close';
        this.content.appendChild(button);
    }

    this.body = this.content.is(this.opts.bodySelector) ? this.content : this.content.querySelector(this.opts.bodySelector);
    this.heading = this.content.querySelector(this.opts.headingSelector);

    this.opts.hasHeading = !!this.heading;

    this.wrapper.classList.add(this.opts.outerClasses);
    this.content.classList.add(this.opts.innerClasses);

    if (this.opts.hasCloseButton) {
        this.wrapper.classList.add('o-modal--closable');
    }
    
    if (this.opts.hasHeading) {
        this.content.classList.add('o-modal__body');
    }

    this.wrapper.appendTo(this.context);

    this.destroy = this.destroy.bind(this);
    this.delegate.on('oLayers.removeAll', 'body', this.destroy);

    if (this.opts.openImmediately) {
        // this.wrapper.offsetWidth;
        this.show();
    }
};