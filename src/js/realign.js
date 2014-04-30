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
        // for ios7 only win.innerHeight provides the correct value when the browser chrome is present
        // need to use the jQuery method as a fallback as <ie9 don't support the property
        if (size <= this[dimension]) {
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
            }
            if (!this.fills(otherDimension)) {
                this[dimension] = Math.max(
                    this['get' + capitalisedDimension](),
                    this[dimension]
                );
            }

            if (!this.isFlexbox) {
                this.content.style['margin' + edge] = (-this.content['client' + capitalisedDimension]/2) + 'px';
            }
        }
    }
    if (!this.isFlexbox && dimension === W && !this.opts.isCenteredHorizontally) {
        this.content.style['margin' + edge] = 'auto';
    }

};