(function () {
    
    var win = $(window);

    function getSpacing(el, side) {
        return (parseInt(el.css('padding-' + side), 10) || 0) + (parseInt(el.css('margin-' + side), 10) || 0);
    }

    var Dialog = (function () {

        var initialised = false,
            wrapper,
            content,
            idealDimensions = {},
            dimensionCalculators = {
                width: function () {
                    return content.outerWidth() + getSpacing(wrapper, 'left') + getSpacing(wrapper, 'right');
                },
                height: function () {
                    return content.outerHeight() + getSpacing(wrapper, 'top') + getSpacing(wrapper, 'bottom');
                },
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

        var init = function () {
                wrapper = $('<section class="o-dialog">');
                content = $('<section class="o-dialog__content">');

                wrapper.append(content).appendTo('body');

                $(document).on('keyup.o-dialog', function (ev) {
                    if (ev.keyCode === 27) {
                        close();
                    }
                }).on('close.o-dialog', close);

                content.on('click.o-dialog', function (ev) {
                    ev.stopPropagation();
                });

                wrapper.on('click.o-dialog', function (ev) {
                    close();
                });

            },

            open = function (opts) { //content, srcType, handler) {
                content || init();

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
                    } else {
                        opts.srcType = 'string';
                        opts.content = opts.src;
                    }
                } else if (opts.srcType === 'selector') {
                    opts.content = $(opts.src);
                }

                opts = $.extend({}, defaults, opts);

                isLegacyOverlay = !Modernizr.flexbox && !Modernizr.flexboxlegacy && opts.type === 'overlay';

                assignClasses(opts);
                
                content.html(opts.content);

                wrapper.addClass('is-open');
                content.focus();

                idealDimensions.width = dimensionCalculators.width();
                idealDimensions.height = dimensionCalculators.height();
                respondToWindow();
                win.on('resize.o-dialog', function() {
                    respondToWindow();
                });

            },

            assignClasses = function (options) {
                wrapper[0].className = 'dialog dialog--' + options.type + ' ' + options.classes;
                content[0].className = 'dialog__content dialog__content--' + options.type;
            },

            close = function () {
                wrapper.removeClass('is-open');
                win.off('resize.o-dialog');
            },

            respondToWindow = function () {
                reAlign('width');
                reAlign('height');
            },

            reAlign = function (dimension) {
                var edge = dimension === 'width' ? 'left' : 'top',
                    capitalisedDimension = dimension.charAt(0).toUpperCase() + dimension.substr(1);

                if (win[dimension]() <= idealDimensions[dimension]) {
                    wrapper.addClass('dialog--full-' + dimension);
                    if (isLegacyOverlay) {
                        content.css('margin-' + edge, 0);
                    }
                } else {
                    wrapper.removeClass('dialog--full-' + dimension);
                    idealDimensions[dimension] = Math.max(
                        dimensionCalculators[dimension](),
                        idealDimensions[dimension]
                    );
                    if (isLegacyOverlay) {
                        content.css('margin-' + edge, -content['outer' + capitalisedDimension]()/2);
                    }
                }
            };

        return {
            open: open
        };

    })();
   
    $.fn.oDialogTrigger = function () {
        return this.click(function () {
            Dialog.open($(this).data('o-dialog'));
        });
    };

    $('.o-dialog--trigger').oDialogTrigger();

    return Dialog;
})();
