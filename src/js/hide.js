'use strict';



module.exports = function (destroy, immediate) {
    if (this.isOpen()) {
        this.opts.onBeforeClose(this);

        var self = this;

        if (destroy) {
            this.delegates.win.off();
            this.delegates.wrap.off();
        } else {
            this.delegates.win.root();
            this.delegates.wrap.root();
            this.globalDelegate.off('oLayers.hideAll', 'body', this.hide);
        }

        if (this.isAnimatable && !immediate) {
            require('./do-after-transition')(this.wrapper, 'is-open', 'remove', [this.wrapper, this.content], function () {
                self.detach(destroy);
            });
            
        } else {
            this.wrapper.classList.remove('is-open');
            this.detach(destroy);
        }
    }
    
};