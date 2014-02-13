'use strict';

var $ = require('jquery'),
    prefixer = require('o-useragent').prefixer,
	domUtils = require('../private').domUtils;

module.exports = function ($wrapper, cssClass, mode, $transitioningEls, callback) {
    $transitioningEls = $transitioningEls || $wrapper;

    var maxDuration = 0,
        possibleTransitions = [],
        callbackHasRun = false,
        singletonCallback;

    $transitioningEls.each(function () {
        var details,
            duration = +domUtils.getStyleValue(this, 'transition-duration').replace(/[^\.\d]/g, ''),
            properties;

        if (duration) {
            properties = domUtils.getStyleValue(this, 'transition-property');
            
            properties = properties === 'all' ? [] : properties.split(' ');
        
            details = {
                el: this,
                duration: duration,
                properties: properties,
                initialState: domUtils.getStyleValues(this, properties)
            };
            possibleTransitions.push(details);

            maxDuration = Math.max(maxDuration, details.duration);
        }
        
    });

    $wrapper[mode + 'Class'](cssClass);
    
    // if no transition defined just call the callback
    if (maxDuration === 0) {
        callback();
        return;
    }

    // makes sure callback only gets called once
    singletonCallback = function () {
        if (!callbackHasRun) {
            callbackHasRun = true;
            callback();
        }
    };

    setTimeout(function () {
        prefixer('requestAnimationFrame', window)(function () {
            var duration = 0;

            $.each(possibleTransitions, function (index, details) {
                var i,
                    changedState = [];
                for (i = details.properties.length - 1;i>=0;i--) {
                    changedState.unshift(domUtils.getStyleValue(details.el, details.properties[i]));
                }

                for (i = details.properties.length - 1;i>=0;i--) {
                    if (changedState[i] !== details.initialState[i]) {

                        // todo: move this to listen on the wrapper and only respond to the slowest animation
                        // do something like checking to see if target = this and set a flag after timeout(maxDuration - 50) has run
                        $(details.el).one(prefixer('transitionEnd'), singletonCallback);
                    
                        // failsafe in case the transitionEnd event doesn't fire
                        setTimeout(singletonCallback, details.duration * 1000);
                        duration = Math.max(duration, details.duration);
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