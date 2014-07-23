'use strict';

var prefixer = require('o-useragent').prefixer;
var Delegate = require('dom-delegate');
var transitionEnd = prefixer.style('transition') + 'End';

module.exports = function (wrapper, cssClass, mode, transitioningEls, callback) {
    transitioningEls = transitioningEls || wrapper;

    var maxDuration = 0,
        possibleTransitions = [],
        callbackHasRun = false,
        singletonCallback,
        delegate = new Delegate(wrapper);

    transitioningEls.forEach(function (el) {
        var transitionDetails,
            duration = +prefixer.getStyleValue(el, 'transition-duration').replace(/[^\.\d]/g, ''),
            properties;

        if (duration) {
            properties = prefixer.getStyleValue(el, 'transition-property');
            
            properties = properties === 'all' ? [] : properties.split(' ');
        
            transitionDetails = {
                el: el,
                duration: duration,
                properties: properties,
                initialState: prefixer.getStyleValue(el, properties.join(' '))
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