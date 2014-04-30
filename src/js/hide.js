'use strict';

var prefixer = require('o-useragent').prefixer;
var Delegate = require('dom-delegate');
var transitionEnd = prefixer.style('transition') + 'End';

var doAfterTransition = function (wrapper, cssClass, mode, transitioningEls, callback) {
    transitioningEls = transitioningEls || wrapper;

    var maxDuration = 0,
        possibleTransitions = [],
        callbackHasRun = false,
        singletonCallback,
        delegate = new Delegate(wrapper);

    transitioningEls.forEach(function () {
        var transitionDetails,
            duration = +prefixer.getStyleValue(this, 'transition-duration').replace(/[^\.\d]/g, ''),
            properties;

        if (duration) {
            properties = prefixer.getStyleValue(this, 'transition-property');
            
            properties = properties === 'all' ? [] : properties.split(' ');
        
            transitionDetails = {
                el: this,
                duration: duration,
                properties: properties,
                initialState: prefixer.getStyleValue(this, properties.join(' '))
            };
            possibleTransitions.push(transitionDetails);

            maxDuration = Math.max(maxDuration, transitionDetails.duration);
        }
        
    });

    wrapper.classList[mode](cssClass);
    
    // if no transition defined just call the callback
    if (maxDuration === 0) {
        callback();
        return;
    }

    // makes sure callback only gets called once
    singletonCallback = function () {
        if (!callbackHasRun) {
            callbackHasRun = true;
            delegate.off();
            callback();
        }
    };

    setTimeout(function () {
        prefixer.getDomProperty(window, 'requestAnimationFrame')(function () {
            var duration = 0;

            possibleTransitions.forEach(function (transitionDetails) {
                var i,
                    changedState = [];
                for (i = transitionDetails.properties.length - 1;i>=0;i--) {
                    changedState.unshift(prefixer.getStyleValue(transitionDetails.el, transitionDetails.properties[i]));
                }

                for (i = transitionDetails.properties.length - 1;i>=0;i--) {
                    if (changedState[i] !== transitionDetails.initialState[i].value) {

                        // todo: move this to listen on the wrapper and only respond to the slowest animation
                        // do something like checking to see if target = this and set a flag after timeout(maxDuration - 50) has run
                        delegate.on(transitionEnd, '*', singletonCallback);
                        if (transitioningEls.indexOf(wrapper) > -1) {
                            delegate.on(transitionEnd, singletonCallback);
                        }
                    
                        // failsafe in case the transitionEnd event doesn't fire
                        setTimeout(singletonCallback, transitionDetails.duration * 1000);
                        duration = Math.max(duration, transitionDetails.duration);
                    }
                }
            });
            if (!duration) {
                singletonCallback();
            }
        });
    }, 20);

    // failsafe in case something really weird happens (transitions tend to be buggy in a lot of browsers
    setTimeout(singletonCallback, maxDuration * 1000);
};

var detach = function (destroy) {
    destroy && this.context.removeChild(this.wrapper);
    this.opts.onAfterClose(this);
};


module.exports = function (destroy, immediate) {
    this.detach = detach;
    this.opts.onBeforeClose(this);

    var self = this;

    if (destroy) {
        this.delegate.off();
    } else {
        if (this.opts.isDismissable) {
            this.delegate.off('click', '*', this.closeOnExternalClick);
            this.delegate.off('keyup', this.closeOnEscapePress);
        }
        this.delegate.off('oViewport.resize', 'body', this.resizeListener);
        this.delegate.off('oLayers.hideAll', 'body', this.hide);
    }

    if (this.isAnimatable && !immediate) {
        doAfterTransition(this.wrapper, 'is-open', 'remove', [this.wrapper, this.content], function () {
            self.detach(destroy);
        });
        
    } else {
        this.wrapper.classList.remove('is-open');
        this.detach(destroy);
    }
    
};