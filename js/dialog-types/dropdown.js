var Dialog = require('../dialog');

Dialog.addType('dropdown', {
    isDismissable: true,
    isAnchoredToTrigger: true,
    verticalAnchorSide: 'bottom',
    hasOverlay: false,
    isCenteredVertically: false,
    isCenteredHorizontally: false,
    snapsToFullHeight: false,
    snapsToFullWidth: true
});

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