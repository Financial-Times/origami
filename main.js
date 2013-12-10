(function () {

    var win = $(window),
        animated = Modernizr.csstransforms && Modernizr.csstransitions;

    function getSpacing(el, side) {
        return (parseInt(el.css('padding-' + side), 10) || 0) + (parseInt(el.css('margin-' + side), 10) || 0);
    }

    var Dialog = (function () {

        var initialised = false,
            lastTrigger,
            dialogs = [],
            activeDialog,
            lastPickedDialogNumber,
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

                globalListeners();

                content.on('click.o-dialog', function (ev) {
                    ev.stopPropagation();
                });

                wrapper.on('click.o-dialog', function (ev) {
                    close();
                });

                dialogs.push({
                    wrapper: wrapper,
                    content: content
                });
                return dialogs[dialogs.length - 1];
            },

            globalListeners = function () {
                if (globalListenersApplied) {
                    return;
                }
                $(document).on('keyup.o-dialog', function (ev) {
                    if (ev.keyCode === 27) {
                        close();
                    }
                }).on('close.o-dialog', close);

                globalListenersApplied = true;
            },

            getEmptyDialog = function () {
                var nextAvailableEmptyDialog,
                    dialog;
                if (animated) {
                    
                    if (dialogs.length === 2) {
                        if (activeDialog) {
                            nextAvailableEmptyDialog = (activeDialog) % dialogs.length;
                        } else {
                            nextAvailableEmptyDialog = 0;
                        }
                    } else if (dialogs.length === 1) {
                        if (activeDialog) {
                            nextAvailableEmptyDialog = 1;
                        } else {
                            nextAvailableEmptyDialog = 0;
                        }
                    } else {
                        nextAvailableEmptyDialog = 0;
                    }

                    if (dialogs.length <= nextAvailableEmptyDialog) {
                        createDialogHtml();
                    }

                    lastPickedDialogNumber = nextAvailableEmptyDialog;
                    dialog = dialogs[nextAvailableEmptyDialog];
                    
                } else {
                    lastPickedDialogNumber = 0;
                    dialog = dialogs[0] || createDialogHtml();
                }

                dialog.wrapper.appendTo('body');
                return dialog;
            },

            trigger = function (opts, trigger) { //content, srcType, handler) {
                               

                if (activeDialog && dialogs[activeDialog -1].wrapper.hasClass('is-open')) {
                    
                    close(dialogs[activeDialog -1]);
                    //dialogs.active = getEmptyDialog();

                    if (trigger === lastTrigger) {
                        lastPickedDialogNumber = null;
                        lastTrigger = null;
                        return;
                    }
                }

                var dialog = getEmptyDialog();

                lastTrigger = trigger;

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

                isLegacyOverlay = !Modernizr.flexbox && !Modernizr.flexboxlegacy && opts.type === 'overlay';

                assignClasses(dialog, opts);
                
                dialog.content.html(opts.content);

                // forces redraw before .is-open starts the animation
                dialog.wrapper[0].offsetWidth;
                dialog.wrapper.addClass('is-open');
                dialog.content.focus();

                dialog.width = dimensionCalculators.width(dialog);
                dialog.height = dimensionCalculators.height(dialog);
                respondToWindow(dialog);
                win.on('resize.o-dialog', function() {
                    respondToWindow(dialog);
                });
                setTimeout(function () {
                    $('body').on('click.o-dialog', function () {
                        close(dialog);
                    });
                }, 1);
                

                activeDialog = lastPickedDialogNumber + 1;

            },

            assignClasses = function (dialog, options) {
                dialog.wrapper[0].className = 'o-dialog o-dialog--' + options.type + ' ' + options.classes;
                dialog.content[0].className = 'o-dialog__content o-dialog--' + options.type + '__content';
            },

            close = function (dialog) {
                dialog = dialog || dialogs[activeDialog - 1];
                dialog.wrapper.removeClass('is-open');
                win.off('resize.o-dialog');
                $('body').off('click.o-dialog');
                if (animated) {
                    dialog.content.transitionEnd(function () {
                        cleanUpDialog(dialog);
                    });
                } else {
                    cleanUpDialog(dialog);
                }
                
            },

            cleanUpDialog = function (dialog) {
                if (typeof lastPickedDialogNumber !== 'number') {
                    activeDialog = null;
                }
                dialog.content.empty();
                dialog.wrapper.detach();
            },

            respondToWindow = function (dialog) {
                reAlign('width', dialog);
                reAlign('height', dialog);
            },

            reAlign = function (dimension, dialog) {
                var edge = dimension === 'width' ? 'left' : 'top',
                    capitalisedDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1);

                if (win[dimension]() <= dialog[dimension]) {
                    dialog.wrapper.addClass('dialog--full-' + dimension);
                    if (isLegacyOverlay) {
                        dialog.content.css('margin-' + edge, 0);
                    }
                } else {
                    dialog.wrapper.removeClass('dialog--full-' + dimension);
                    dialog[dimension] = Math.max(
                        dimensionCalculators[dimension](dialog),
                        dialog[dimension]
                    );
                    if (isLegacyOverlay) {
                        dialog.content.css('margin-' + edge, -dialog.content['outer' + capitalisedDimension]()/2);
                    }
                }
                if (!isLegacyOverlay) {
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

    $.fn.transitionEnd = function () {
      this.one('webkitTransitionEnd', arguments[1], arguments[2]);
      this.one('mozTransitionEnd', arguments[1], arguments[2]);
      this.one('msTransitionEnd', arguments[1], arguments[2]);
      this.one('oTransitionEnd', arguments[1], arguments[2]);
      this.one('transitionEnd', arguments[1], arguments[2]);
      return this;
    };

    $('.o-dialog--trigger').oDialogTrigger();

    return Dialog;
})();
