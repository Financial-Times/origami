'use strict';

var prefixer = require('o-useragent').prefixer;

var doAfterTransition = function ($wrapper, cssClass, mode, $transitioningEls, callback) {
    $transitioningEls = $transitioningEls || $wrapper;

    var maxDuration = 0,
        possibleTransitions = [],
        callbackHasRun = false,
        singletonCallback;

    $transitioningEls.each(function () {
        var details,
            duration = +prefixer.getStyleValue(this, 'transition-duration').replace(/[^\.\d]/g, ''),
            properties;

        if (duration) {
            properties = prefixer.getStyleValue(this, 'transition-property');
            
            properties = properties === 'all' ? [] : properties.split(' ');
        
            details = {
                el: this,
                duration: duration,
                properties: properties,
                initialState: prefixer.getStyleValue(this, properties.join(' '))
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
        prefixer.getDomProperty(window, 'requestAnimationFrame')(function () {
            var duration = 0;

            $.each(possibleTransitions, function (index, details) {
                var i,
                    changedState = [];
                for (i = details.properties.length - 1;i>=0;i--) {
                    changedState.unshift(prefixer.getStyleValue(details.el, details.properties[i]));
                }

                for (i = details.properties.length - 1;i>=0;i--) {
                    if (changedState[i] !== details.initialState[i].value) {

                        // todo: move this to listen on the wrapper and only respond to the slowest animation
                        // do something like checking to see if target = this and set a flag after timeout(maxDuration - 50) has run
                        $(details.el).one(prefixer.style('transition') + 'End', singletonCallback);
                    
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

var detach = function (dialog, destroy) {
    dialog.active = false;
    dialog.content.empty();
    dialog.wrapper.detach().attr('style', null);
    if (dialog.opts.hasOverlay) {
        dialog.overlay.detach();
    }
    if (destroy) {
        if (Object.keys) {
            Object.keys(globals).forEach(function (key) {
                delete globals[key];
            });
        }
    }
    dialog.opts.onAfterClose(dialog);
};


module.exports = function (destroy, immediate) {
    dialog.opts.onBeforeClose(dialog);    
    if (dialog.opts.isDismissable) {
        globals.body.off('click.o-dialog');
        globals.doc.off('keyup.o-dialog');
    }
    globals.win.off('resize.o-dialog');

    this.delegate.off('click', '*', this.closeOnExternalClick);
    this.delegate.off('oLayers.hideAll', 'body', this.hide);


    if (globals.isAnimatable && !immediate) {
        var wrapper = dialog.opts.hasOverlay ? dialog.wrapper.add(dialog.overlay) : dialog.wrapper ;
        methods.doAfterTransition(wrapper, 'is-open', 'remove', wrapper.add(dialog.content), function () {
            methods.detach(dialog);
        });
        
    } else {
        dialog.wrapper.removeClass('is-open');
        methods.detach(dialog, immediate);
    }
    
};