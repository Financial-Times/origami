'use strict';

var noop = function () {};

module.exports = {
    src: undefined,
    srcType: 'selector',
    outerClasses: '',
    innerClasses: '',
    preset: 'modal',
    isDismissable: true,
    headingSelector: '.o-modal__heading',
    bodySelector: '.o-modal__body',
    hasHeading: false,
    hasOverlay: false,
    hasCloseButton: false,
    closeAction: 'destroy',
    isCenteredVertically: true,
    isCenteredHorizontally: true,
    snapsToFullHeight: true,
    snapsToFullWidth: true,
    openImmediately: true,
    onFail: noop,
    onBeforeRender: noop,
    onAfterRender: noop,
    onBeforeResize: noop,
    onAfterResize: noop,
    onBeforeClose: noop,
    onAfterClose: noop
};