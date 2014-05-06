'use strict';

var capitalise = require('./utils').capitalise;

var W = 'width',
    H = 'height',
    T = 'Top',
    L = 'Left';


module.exports = function (dimension, size) {

    if ((dimension === H && !this.opts.isCenteredVertically) || (dimension === W && !this.opts.isCenteredHorizontally)) {
        return;
    }

    var edge = dimension === W ? L : T,
        otherDimension = dimension === W ? H : W,
        capitalisedDimension = capitalise(dimension);

    if (this.opts['snapsToFull' + capitalisedDimension]) {

        if (size <= this[dimension] || (this.isFlexbox && this.body['scroll' + capitalisedDimension] > this.body['offset' + capitalisedDimension])) {
            this.wrapper.classList.add('o-modal--full-' + dimension);
            if (!this.isFlexbox) {
                this.content.style['margin' + edge] = 0;
                this.adjustBodyHeight(true);
            }
        } else {
            this.wrapper.classList.remove('o-modal--full-' + dimension);
            this.wrapper.setAttribute('style', '');
            if (!this.isFlexbox) {
                this.adjustBodyHeight(false);
            } else {

            }
            if (!this.fills(otherDimension)) {
                this[dimension] = Math.max(
                    this['get' + capitalisedDimension](),
                    this[dimension]
                );
            } 

            if (!this.isFlexbox) {
                this.content.style['margin' + edge] = (-this.content['offset' + capitalisedDimension]/2) + 'px';
            }
        }
    }
    if (!this.isFlexbox && dimension === W && !this.opts.isCenteredHorizontally) {
        this.content.style['margin' + edge] = 'auto';
    }

};