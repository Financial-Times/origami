var Dialog = require('../dialog');

Dialog.addType('dropup', {
    isDismissable: true,
    isAnchoredToTrigger: true,
    verticalAnchorSide: 'top',
    hasOverlay: false,
    isCenteredVertically: false,
    isCenteredHorizontally: false,
    snapsToFullHeight: false,
    snapsToFullWidth: true
});