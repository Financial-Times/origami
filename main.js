(function () {

    var win = $(window),
        isAnimatable = Modernizr.csstransforms,
        isFlexbox = Modernizr.flexbox || Modernizr.flexboxlegacy;

    function getSpacing(el, side) {
        return (parseInt(el.css('padding-' + side), 10) || 0) + (parseInt(el.css('margin-' + side), 10) || 0);
    }

    function toCamelStyleProp (str) {
        return str.replace(/(?:\-)([a-z])/gi, function ($0, $1) {
            return $1.toUpperCase();
        });
    }

    function toHyphenatedStyleProp (str) {
        return str.replace(/([A-Z])/g, function (str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/,'-ms-');
    }

    function getPrefixedStyleProp (prop) {
        prop = toCamelStyleProp(prop);
        prop = Modernizr.prefixed(prop);
        return toHyphenatedStyleProp(prop);
    }

    function getStyleValue (el, prop) {
        return getComputedStyle(el, null).getPropertyValue(getPrefixedStyleProp(prop));
    }

    function getStyleValues (el, props) {
        var vals = [];

        for (var i = props.length - 1;i>=0;i--) {
            vals.unshift(getStyleValue(el, props[i]));
        }
        return vals;
    }

    var Dialog = (function () {

        var dialogs = isAnimatable ? Array(2) : [],
            wrapper,
            content,
            globalListenersApplied = false,
            dimensionCalculators = {
                width: function (dialog) {
                    return dialog.content.outerWidth() + getSpacing(dialog.wrapper, 'left') + getSpacing(dialog.wrapper, 'right');
                },
                height: function (dialog) {
                    return dialog.content.outerHeight() + getSpacing(dialog.wrapper, 'top') + getSpacing(dialog.wrapper, 'bottom');
                }
            },
            isLegacyOverlay,
            defaults = {
                src: '',
                srcType: 'selector',
                handler: $.noop,
                handlerContext: window,
                classes: '',
                type: 'overlay',
                alignTo: 'right'
            };

        var createDialogHtml = function () {
                wrapper = $('<section class="o-dialog"></section>');
                content = $('<div class="o-dialog__content"></div>');

                wrapper.append(content);

                globalListenersApplied || globalListeners();

                dialog = {
                    wrapper: wrapper,
                    content: content
                };

                content.on('click.o-dialog', function (ev) {
                    ev.oDialogContentClick = true;
                });

                wrapper.on('click.o-dialog', function (ev) {
                    if (!ev.oDialogContentClick) {
                        close(dialog);
                    }
                    
                });

                return dialog;
            },

            globalListeners = function () {
                $(document).on('keyup.o-dialog', function (ev) {
                    if (ev.keyCode === 27) {
                        close();
                    }
                }).on('close.o-dialog', close);

                globalListenersApplied = true;
            },

            getEmptyDialog = function () {

                if (isAnimatable) {
                    if (dialogs[0] && dialogs[0].active) {
                        dialogs.reverse();
                    }
                }
                if (!dialogs[0]) {
                    dialogs[0] = createDialogHtml();
                }

                return dialogs[0];
            },

            trigger = function (opts, trigger) { //content, srcType, handler) {
                
                var lastDialog;

                if (dialogs[0] && dialogs[0].active) {
                    
                    lastDialog = dialogs[0];
                    close(lastDialog);
                    //dialogs.active = getEmptyDialog();

                    if (trigger === lastDialog.trigger) {
                        return;
                    }
                }

                var dialog = setupDialog(opts, trigger);
                
                if (!dialog) {
                    return;
                }

                attachDialog(dialog);
            },

            attachDialog = function (dialog) {
                dialog.parent = (dialog.opts.type === 'overlay' || !dialog.trigger) ? 'body' : dialog.trigger.offsetParent;

                dialog.wrapper.appendTo(dialog.parent);

                // forces redraw before .is-open starts the animation
                dialog.wrapper[0].offsetWidth;
                dialog.wrapper.addClass('is-open');
                dialog.content.focus();

                dialog.width = dimensionCalculators.width(dialog);
                dialog.height = dimensionCalculators.height(dialog);
                dialog.active = true;
                respondToWindow(dialog);

                win.on('resize.o-dialog', function() {
                    respondToWindow(dialog);
                });

                $('body').on('click.o-dialog', function (ev) {
                    if (!ev.oDialogContentClick && !/o\-dialog\-\-trigger/.test(ev.target.className)) {
                        close(dialog);
                    }
                });
            },

            setupDialog = function (opts, trigger) {
                var dialog = getEmptyDialog();

                if (typeof opts === 'string') {
                    opts = {
                        src: opts
                    };
                }

                if (!opts.srcType) {
                    if (/^(https?\:\/)?\//.test(opts.src)) {
                        opts.srcType = 'url';
                    } else if ((opts.content = $(opts.src)) && opts.content.length) {
                        opts.srcType = 'selector';
                        opts.content = opts.content.clone();
                    } else {
                        opts.srcType = 'string';
                        opts.content = opts.src;
                    }
                } else if (opts.srcType === 'selector') {
                    opts.content = $(opts.src).clone();
                }

                opts = $.extend({}, defaults, opts);

                if (opts.type === 'dropup' || opts.type === 'dropdown') {
                    if (!trigger) {
                        return;
                    }
                }

                dialog.trigger = trigger;

                dialog.isLegacyOverlay = !isFlexbox && opts.type === 'overlay';

                dialog.opts = opts;

                assignClasses(dialog);
                
                dialog.content.html(opts.content);

                return dialog;
            },

            assignClasses = function (dialog) {
                dialog.wrapper[0].className = 'o-dialog o-dialog--' + dialog.opts.type + ' ' + dialog.opts.classes;
                dialog.content[0].className = 'o-dialog__content o-dialog--' + dialog.opts.type + '__content';
            },

            anchorDropdown = function (dialog) {
                if (dialog.opts.type === 'dropup' || dialog.opts.type === 'dropdown') {

                    var align,
                        offset,
                        trigger = dialog.trigger;
                        triggerRightEdge = trigger.offsetLeft + trigger.offsetWidth;

                    if (dialog.width > win.width() || triggerRightEdge - dialog.width < 0) {
                        align = 'l';
                    } else {
                        align = 'r';
                    }

                    if (dialog.fullWidth) {
                        offset = 0;
                    } else if (align === 'l') {
                        offset = trigger.offsetLeft;
                    } else {
                        offset = trigger.offsetParent.offsetWidth - triggerRightEdge;
                    }

                    if (align === 'l') {
                        dialog.wrapper.css('left', offset).addClass('o-dialog--dropdown--left').removeClass('o-dialog--dropdown--right');
                    } else {
                        dialog.wrapper.css('right', offset).addClass('o-dialog--dropdown--right').removeClass('o-dialog--dropdown--left');
                    }

                    if (dialog.opts.type === 'dropdown') {
                        dialog.wrapper.css('top', trigger.offsetTop + trigger.offsetHeight);
                    } else {
                        dialog.wrapper.css('bottom', trigger.offsetParent.offsetHeight - trigger.offsetTop);
                    }
                }

            },


            close = function (dialog) {
                dialog = dialog || dialogs[0];
                if (!dialog.active) {
                    return;
                }

                win.off('resize.o-dialog');
                $('body').off('click.o-dialog');
                if (isAnimatable) {
                    doAfterTransition(dialog.wrapper, 'is-open', 'remove', dialog.content.add(dialog.wrapper), function () {
                        cleanUpDialog(dialog);
                    });
                    
                } else {
                    dialog.wrapper.removeClass('is-open');
                    cleanUpDialog(dialog);
                }
                
            },

            doAfterTransition = function ($wrapper, cssClass, mode, $transitioningEls, callback) {
                $transitioningEls = $transitioningEls || $wrapper;

                var maxDuration = 0,
                    possibleTransitions = [],
                    callbackHasRun = false,
                    singletonCallback;

                $transitioningEls.each(function (item) {
                    var details,
                        duration = +getStyleValue(this, 'transition-duration').replace(/[^\.\d]/g, ''),
                        properties;

                    if (duration) {
                        properties = getStyleValue(this, 'transition-property');
                        
                        properties = properties === 'all' ? [] : properties.split(' ');
                    
                        details = {
                            el: this,
                            duration: duration,
                            properties: properties,
                            initialState: getStyleValues(this, properties)
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
                    Modernizr.prefixed('requestAnimationFrame', window)(function () {
                        var duration = 0;

                        $.each(possibleTransitions, function (index, details) {
                            var i,
                                changedState = [];
                            for (i = details.properties.length - 1;i>=0;i--) {
                                changedState.unshift(getStyleValue(details.el, details.properties[i]));
                            }

                            for (i = details.properties.length - 1;i>=0;i--) {
                                if (changedState[i] !== details.initialState[i]) {

                                    // todo: move this to listen on the wrapper and only respond to the slowest animation
                                    // do something like checking to see if target = this and set a flag after timeout(maxDuration - 50) has run
                                    $(details.el).one(Modernizr.prefixed('transitionEnd'), singletonCallback);
                                
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
            },

            cleanUpDialog = function (dialog) {
                dialog.active = false;
                dialog.content.empty();
                dialog.wrapper.detach().attr('style', null);
            },

            respondToWindow = function (dialog) {

                reAlign('width', dialog);
                reAlign('height', dialog);
                anchorDropdown(dialog);
            },

            reAlign = function (dimension, dialog) {

                if (dimension === 'height' && dialog.opts.type !== 'overlay') {
                    return;
                }

                var edge = dimension === 'width' ? 'left' : 'top',
                    capitalisedDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1);

                if (win[dimension]() <= dialog[dimension]) {
                    dialog['full' + capitalisedDimension] = true;
                    dialog.wrapper.addClass('o-dialog--full-' + dimension);
                    if (dialog.isLegacyOverlay) {
                        dialog.content.css('margin-' + edge, 0);
                    }
                } else {
                    dialog['full' + capitalisedDimension] = false;
                    dialog.wrapper.removeClass('o-dialog--full-' + dimension).attr('style', null);
                    dialog[dimension] = Math.max(
                        dimensionCalculators[dimension](dialog),
                        dialog[dimension]
                    );
                    if (dialog.isLegacyOverlay) {
                        dialog.content.css('margin-' + edge, -dialog.content['outer' + capitalisedDimension]()/2);
                    }
                }

                if (!isFlexbox && !dialog.isLegacyOverlay) {
                    dialog.content.css('margin-' + edge, 'auto');
                }
            };

        return {
            trigger: trigger
        };

    })();
   
    $.fn.oDialogTrigger = function () {
        return this.click(function () {
            Dialog.trigger($(this).data('o-dialog'), this);
        });
    };


    $('.o-dialog--trigger').oDialogTrigger();

    return Dialog;
})();
