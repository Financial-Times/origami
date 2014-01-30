"use strict";

var $ = require('jquery'),
    domUtils = require('./domUtils'),
    doAfterTransition = require('./doAfterTransition'),
    L = 'left',
    R = 'right',
    T = 'top',
    B = 'bottom',
    H = 'height',
    W = 'width',
    win = $(window),
    presets = {},
    isAnimatable = $('html').hasClass('csstransforms'),
    isFlexbox = $('html').hasClass('flexbox') || $('html').hasClass('flexboxlegacy'),
    dialogs = isAnimatable ? Array(2) : [],
    globalListenersApplied = false,
    dimensionCalculators = {
        width: function (dialog) {
            return dialog.content.outerWidth() + domUtils.getSpacing(dialog.wrapper, 'left') + domUtils.getSpacing(dialog.wrapper, 'right');
        },
        height: function (dialog) {
            return dialog.content.outerHeight() + domUtils.getSpacing(dialog.wrapper, 'top') + domUtils.getSpacing(dialog.wrapper, 'bottom');
        }
    },
    defaults = {
        src: '',
        srcType: 'selector',
        classes: '',
        preset: 'modal',
        isDismissable: true, //
        isAnchoredToTrigger: false, //
        verticalAnchorSide: null,
        horizontalAnchorSide: null,
        hasOverlay: false, //
        isCenteredVertically: true, //
        isCenteredHorizontally: true, //
        snapsToFullHeight: true, //
        snapsToFullWidth: true, //
        onTrigger: $.noop,
        onFail: $.noop,
        onBeforeRender: $.noop,
        onAfterRender: $.noop,
        onBeforeResize: $.noop,
        onAfterResize: $.noop,
        onBeforeClose: $.noop,
        onAfterClose: $.noop
    };

var trigger = function (opts, trigger) {

        var lastDialog;

        if (dialogs[0] && dialogs[0].active) {
            
            lastDialog = dialogs[0];
            close(lastDialog);

            if (trigger === lastDialog.trigger) {
                return;
            }
        }

        var dialog = configureNewDialog(opts, trigger);
        
        if (!dialog) {
            dialog.opts.onFail();
            return;
        }
        dialog.opts.onTrigger();
        assignClasses(dialog);
        
        dialog.content.html(dialog.opts.content);

        dialog.opts.onBeforeRender();
        attach(dialog);
        dialog.opts.onAfterRender();
    },

    createDialogHtml = function () {
        var wrapper = $('<section class="o-dialog"></section>'),
            content = $('<div class="o-dialog__content"></div>'),
            dialog = {
                wrapper: wrapper,
                content: content
            };

        wrapper.append(content);

        globalListenersApplied || globalListeners();

        content.on('click.o-dialog', function (ev) {
            ev.oDialogContentClick = true;
        });

        return dialog;
    },

    isContentClick = function (ev, dialog) {
        return !!$(dialog.content).has(ev.target).length;
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

    configureNewDialog = function (opts, trigger) {
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

        opts = $.extend({}, defaults, presets[opts.preset] || {}, opts);

        if (opts.isAnchoredToTrigger && !trigger) {
            return;
        }

        dialog.trigger = trigger;

        dialog.isLegacyOverlay = !isFlexbox && opts.preset === 'overlay';

        dialog.opts = opts;

        return dialog;
    },
    attach = function (dialog) {

        dialog.parent = (!dialog.opts.isAnchoredToTrigger || !dialog.trigger) ? 'body' : dialog.trigger.offsetParent;

        dialog.wrapper.appendTo(dialog.parent);

        
        dialog.wrapper[0].offsetWidth; // forces redraw before .is-open starts the animation
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
        dialog.wrapper[0].className = 'o-dialog o-dialog--' + dialog.opts.preset + ' ' + dialog.opts.classes + (dialog.opts.hasOverlay ? ' o-dialog--overlay' : '');
        dialog.content[0].className = 'o-dialog__content o-dialog--' + dialog.opts.preset + '__content';
    },

    anchorDropdown = function (dialog) {
        if (dialog.opts.isAnchoredToTrigger) {

            var align,
                offset,
                trigger = dialog.trigger,
                triggerRightEdge = trigger.offsetLeft + trigger.offsetWidth;

            if (dialog.width > win.width() || triggerRightEdge - dialog.width < 0) {
                align = 'l';
            } else {
                align = 'r';
            }

            // Pseudo code of how this needs to work
            // P = preferred edge to align to
            // O = opposite edge of dropdown
            // Pw, Ow = edges of window
            // if (O is too close to Ow) {
            //     swap P and O
            //     if (O is too close to Ow) {
            //         go to full width mode
            //          // need to implement a way that something other than the basic window width test can force full width
            //     }
            // } else {
            //     no problemo
            // }

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

            if (dialog.opts.preset === 'dropdown') {
                dialog.wrapper.css('top', trigger.offsetTop + trigger.offsetHeight);
            } else {
                dialog.wrapper.css('bottom', trigger.offsetParent.offsetHeight - trigger.offsetTop);
            }
        }
    },

    close = function (dialog, destroy) {
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
        if (isAnimatable && !destroy) {
            doAfterTransition(dialog.wrapper, 'is-open', 'remove', dialog.content.add(dialog.wrapper), function () {
                detach(dialog);
            });
            
        } else {
            dialog.wrapper.removeClass('is-open');
            detach(dialog, destroy);
        }
        
    },

    detach = function (dialog, destroy) {
        dialog.active = false;
        dialog.content.empty();
        dialog.wrapper.detach().attr('style', null);
        if (destroy) {
            dialogs = Array(2);
            win = null;
        }
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

        if (dialog.opts['snapsToFull' + capitalisedDimension]) {
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
        }
        if (!isFlexbox && dimension === W && !dialog.opts.isCenteredHorizontally) {
            dialog.content.css('margin-' + edge, 'auto');
        }

    };


module.exports = {
    trigger: trigger,
    destroy: function () {
        close(null, true);
    },
    addPreset: function (name, conf) {
        presets[name] = $.extend({}, defaults, conf);
    }
};
