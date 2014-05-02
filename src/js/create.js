'use strict';


var dom = require('o-dom');

var wrapperSeed = document.createElement('div');
wrapperSeed.className = 'o-modal';
wrapperSeed.innerHTML = '<section class="o-modal__content"></section>';
var overlaySeed = document.createElement('div');
overlaySeed.className = 'o-modal__overlay';

module.exports = function () {

    this.wrapper = wrapperSeed.cloneNode(true);

    this.content = this.wrapper.children[0];
    this.overlay = overlaySeed.cloneNode();
    if (!this.opts.hasOverlay) {
        this.overlay.classList.add('is-hidden');
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
        this.opts.closeClass && button.classList.add(this.opts.closeClass);
    }

    this.body = dom.matches(this.content, this.opts.bodySelector) ? this.content : this.content.querySelector(this.opts.bodySelector);
    this.heading = this.content.querySelector(this.opts.headingSelector);

    this.opts.hasHeading = !!this.heading;

    if (this.opts.hasCloseButton) {
        this.wrapper.classList.add('o-modal--closable');
    }

    this.opts.outerClass && this.wrapper.classList.add(this.opts.outerClass);
    this.opts.innerClass && this.content.classList.add(this.opts.innerClass);
    
    if (this.opts.hasHeading) {
        this.body.classList.add('o-modal__body');
    } else {
        this.content.classList.add('o-modal__body');
    }

    this.context.appendChild(this.wrapper);
    this.context.appendChild(this.overlay);

    this.destroy = this.destroy.bind(this);
    this.globalDelegate.on('oLayers.removeAll', 'body', this.destroy);

    if (this.opts.openImmediately) {
        // this.wrapper.offsetWidth;
        this.show();
    }
};