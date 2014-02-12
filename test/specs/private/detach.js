// "use strict";

// var globals = require('../data/globals');

// module.exports = function (dialog, destroy) {
//     dialog.active = false;
//     dialog.content.empty();
//     dialog.wrapper.detach().attr('style', null);
//     if (dialog.opts.hasOverlay) {
//         dialog.overlay.detach();
//     }
//     if (destroy) {
//         if (Object.keys) {
//             Object.keys(globals).forEach(function (key) {
//                 delete globals[key];
//             });
//         }
//     }
//     dialog.opts.onAfterClose(dialog);
// };