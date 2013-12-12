var domUtils = require('./domUtils'),
    L = 'left',
    R = 'right',
    T = 'top',
    B = 'bottom',
    H = 'height',
    W = 'width',
    win = $(window),
    isAnimatable = Modernizr.csstransforms,
    isFlexbox = Modernizr.flexbox || Modernizr.flexboxlegacy,
    dialogs = isAnimatable ? Array(2) : [],
    types = {},
    wrapper,
    content,
    globalListenersApplied = false,
    dimensionCalculators = {
        width: function (dialog) {
            return dialog.content.outerWidth() + domUtils.getSpacing(dialog.wrapper, 'left') + domUtils.getSpacing(dialog.wrapper, 'right');
        },
        height: function (dialog) {
            return dialog.content.outerHeight() + domUtils.getSpacing(dialog.wrapper, 'top') + domUtils.getSpacing(dialog.wrapper, 'bottom');
        }
    },
    isLegacyOverlay,
    defaults = {
        src: '',
        srcType: 'selector',
        classes: '',
        type: 'overlay',
        isDismissable: true, //
        isAnchoredToTrigger: false, //
        verticalAnchorSide: null,
        horizontalAnchorSide: null,
        hasOverlay: true,
        isCenteredVertically: true, //
        isCenteredHorizontally: true, //
        snapsToFullHeight: true,
        snapsToFullWidth: true,
        onTrigger: $.noop,
        onFail: $.noop,
        onBeforeRender: $.noop,
        onAfterRender: $.noop,
        onBeforeResize: $.noop,
        onAfterResize: $.noop,
        onBeforeClose: $.noop,
        onAfterClose: $.noop
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



        return dialog;
    },

    globalListeners = function () {
        $(document).on('close.o-dialog', close);

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

    trigger = function (opts, trigger) {


        var lastDialog;

        if (dialogs[0] && dialogs[0].active) {
            
            lastDialog = dialogs[0];
            close(lastDialog);

            if (trigger === lastDialog.trigger) {
                return;
            }
        }

        var dialog = configureDialog(opts, trigger);
        
        if (!dialog) {
            dialog.opts.onFail();
            return;
        }
        dialog.opts.onTrigger();
        assignClasses(dialog);
        
        dialog.content.html(dialog.opts.content);

        dialog.opts.onBeforeRender();
        attachDialog(dialog);
        dialog.opts.onAfterRender();

    },
    configureDialog = function (opts, trigger) {
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

        opts = $.extend({}, defaults, types[opts.type] || {}, opts);

        if (opts.isAnchoredToTrigger && !trigger) {
            return;
        }

        dialog.trigger = trigger;

        dialog.isLegacyOverlay = !isFlexbox && opts.type === 'overlay';

        dialog.opts = opts;

        return dialog;
    },
    attachDialog = function (dialog) {

        dialog.parent = (!dialog.opts.isAnchoredToTrigger || !dialog.trigger) ? 'body' : dialog.trigger.offsetParent;

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

        if (dialog.opts.isDismissable) {
            setTimeout(function () {
                $('body').on('click.o-dialog', function (ev) {
                    if (!ev.oDialogContentClick && !ev.oDialogTriggerClick) {
                        close(dialog);
                    }
                });
            }, 1);


            $(document).on('keyup.o-dialog', function (ev) {
                if (ev.keyCode === 27) {
                    close();
                }
            });

            dialog.wrapper.on('click.o-dialog', function (ev) {
                if (!ev.oDialogContentClick) {
                    close(dialog);
                }
                
            });
        }
    },



    assignClasses = function (dialog) {
        dialog.wrapper[0].className = 'o-dialog o-dialog--' + dialog.opts.type + ' ' + dialog.opts.classes;
        dialog.content[0].className = 'o-dialog__content o-dialog--' + dialog.opts.type + '__content';
    },

    anchorDropdown = function (dialog) {
        if (dialog.opts.isAnchoredToTrigger) {

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
        dialog.opts.onBeforeClose();
        dialog = dialog || dialogs[0];
        if (!dialog.active) {
            return;
        }

        win.off('resize.o-dialog');

        if (dialog.opts.isDismissable) {
            $('body').off('click.o-dialog');
            $(document).off('keyup.o-dialog');
            dialog.wrapper.off('click.o-dialog');
        }


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
            Modernizr.prefixed('requestAnimationFrame', window)(function () {
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
        dialog.opts.onAfterClose();
    },

    respondToWindow = function (dialog) {
        dialog.opts.onBeforeResize();
        reAlign('width', dialog);
        reAlign('height', dialog);
        anchorDropdown(dialog);
        dialog.opts.onAfterResize();
    },

    reAlign = function (dimension, dialog) {

        if ((dimension === H && !dialog.opts.isCenteredVertically) || (dimension === W && !dialog.opts.isCenteredHorizontally)) {
            return;
        }

        var edge = dimension === W ? L : T,
            capitalisedDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1);

        if (win[dimension]() <= dialog[dimension]) {
            dialog['full' + capitalisedDimension] = true;
            dialog.wrapper.addClass('o-dialog--full-' + dimension);
            if (!isFlexbox) {
                dialog.content.css('margin-' + edge, 0);
            }
        } else {
            dialog['full' + capitalisedDimension] = false;
            dialog.wrapper.removeClass('o-dialog--full-' + dimension).attr('style', null);
            dialog[dimension] = Math.max(
                dimensionCalculators[dimension](dialog),
                dialog[dimension]
            );
            if (!isFlexbox) {
                dialog.content.css('margin-' + edge, -dialog.content['outer' + capitalisedDimension]()/2);
            }
        }

        if (!isFlexbox && dimension === W && !dialog.opts.isCenteredHorizontally) {
            dialog.content.css('margin-' + edge, 'auto');
        }
    };


module.exports = {
    trigger: trigger,
    addType: function (name, conf) {
        types[name] = $.extend({}, defaults, conf);
    }
};
