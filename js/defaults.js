var noop = function (){};

module.exports = {
    src: '',
    srcType: 'selector',
    classes: '',
    preset: 'modal',
    isDismissable: true, //
    isAnchoredToTrigger: false, //
    verticalAnchorSide: null,
    horizontalAnchorSide: null,
    hasHeading: true,
    hasOverlay: false, //
    hasCloseButton: false, //
    isCenteredVertically: true, //
    isCenteredHorizontally: true, //
    snapsToFullHeight: true, //
    snapsToFullWidth: true, //
    onTrigger: noop,
    onFail: noop,
    onBeforeRender: noop,
    onAfterRender: noop,
    onBeforeResize: noop,
    onAfterResize: noop,
    onBeforeClose: noop,
    onAfterClose: noop
};