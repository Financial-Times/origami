// "use strict";

// var $ = require('jquery'),
//     dimensionCalculators = require('./dimension-calculators'),
//     reAlign = require('./re-align'),
//     anchor = require('./anchor'),
//     globals = require('../data/globals'),
//     close = require('../public/close'),

//     respondToWindow = function (dialog) {
//         dialog.opts.onBeforeResize(dialog);
//         reAlign('width', dialog);
//         reAlign('height', dialog);
//         anchor(dialog);
//         dialog.opts.onAfterResize(dialog);
//     };

// module.exports = function (dialog) {

//     dialog.parent = (!dialog.opts.isAnchoredToTrigger || !dialog.trigger) ? 'body' : dialog.trigger.offsetParent;

//     if (dialog.opts.hasOverlay) {
//         globals.body.append(dialog.overlay);
//     }

//     dialog.wrapper.appendTo(dialog.parent);

//     dialog.wrapper[0].offsetWidth; // forces redraw before .is-open starts the animation
//     dialog.wrapper.addClass('is-open');
//     if (dialog.opts.hasOverlay) {
//         dialog.overlay.addClass('is-open');
//     }
//     dialog.content.focus();

//     dialog.width = dimensionCalculators.width(dialog);
//     dialog.height = dimensionCalculators.height(dialog);
//     dialog.active = true;
//     respondToWindow(dialog);

//     globals.win.on('resize.o-dialog', function() {
//         respondToWindow(dialog);
//     });

//     if (dialog.opts.isDismissable) {
//         setTimeout(function () {
//             globals.body.on('click.o-dialog', function (ev) {
//                 if (dialog.active) {
//                     if (!dialog.content[0].contains(ev.target) || (dialog.opts.hasCloseButton && $(ev.target).is('.o-dialog__close'))) {
//                         close(dialog);
//                     }
//                 }
//             });
//         }, 1);


//         globals.doc.on('keyup.o-dialog', function (ev) {
//             if (ev.keyCode === 27) {
//                 close();
//             }
//         });
//     }
// };