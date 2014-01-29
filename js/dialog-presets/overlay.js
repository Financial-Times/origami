var Dialog = require('../dialog');

Dialog.addType('overlay', {
    isDismissable: true,
    isAnchoredToTrigger: false,
    hasOverlay: true,
    isCenteredVertically: true,
    isCenteredHorizontally: true,
    snapsToFullHeight: true,
    snapsToFullWidth: true
});