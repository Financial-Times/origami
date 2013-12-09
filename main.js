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
            isLegacyOverlay;

        var init = function () {
                var wrapper = $('<section class="o-dialog">'),
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

                content.focus();

                var targetDialog = $('.' + $(this).data('target'));
                $('.dialog').not(targetDialog).removeClass('is-open');
                targetDialog.toggleClass('is-open');
                if (targetDialog.hasClass('is-open')) {
                    targetDialog.responsiveDialog();
                }

                isLegacyOverlay = !Modernizr.flexbox && !Modernizr.flexboxlegacy && this.dialogWrapper.hasClass('dialog--overlay');
                idealDimensions.width = dimensionCalculators.width();
                idealDimensions.height = dimensionCalculators.height();
                respondToWindow();
                win.on('resize.o-dialog', function() {
                    respondToWindow();
                });




            },

            close = function () {
                wrapper.removeClass('is-open');
                win.off('resize.o-dialog');
            },

            respondToWindow = function () {
                reposition('width');
                reposition('height');
            },

            reposition = function (dimension) {
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
        this.each(function () {
            var options = $(this).data('o-dialog');

            if (typeof options === 'string') {
                options = {
                    src: options
                };
            }

            var src = options.src,
                srcType = options.srcType,
                content;

            if (!srcType) {
                if (/^(https?\:\/)?\//.test(src)) {
                    srcType = 'url';
                } else if ((content = $(src)) && content.length) {
                    srcType = 'local';
                } else {
                    srcType = 'string';
                    content = src;
                }
            } else if (srcType === 'local') {
                content = $(src);
            }

            dialog = Dialog.open({
                content: content,
                srcType: srcType,
                handler: options.handler,
                classes: options.classes,
                type: options.type || 'overlay'
            });
        });
    };

    $('.o-dialog--trigger').oDialogTrigger();

      
});
