"use strict";

var methods,
    globals,
    el,
    $ = require('jquery');

describe('trigger (./public/trigger.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        methods = require('src/js/public/trigger');
        globals = require('src/js/data/globals');
    });

    it('should close any previously opened dialogs', function () {
        var onFail = jasmine.createSpy(),
            dummyDialog = globals.dialogs[0] = {
                active: true,
                onFail: onFail
            };
        spyOn(methods, 'close');
        methods.trigger();
        expect(methods.close).toHaveBeenCalledWith(dummyDialog);
        expect(onFail).toHaveBeenCalled();
    });

    it('should close the same dialog and noyt retrigger if same trigger clicked again', function () {
        var onFail = jasmine.createSpy(),
            dummyTrigger = {},
            dummyDialog = globals.dialogs[0] = {
                active: true,
                onFail: onFail,
                trigger: dummyTrigger
            };
            
        spyOn(methods, 'close');
        methods.trigger(null, dummyTrigger);
        expect(methods.close).toHaveBeenCalledWith(dummyDialog);
        expect(onFail).not.toHaveBeenCalled();
    });
});
// "use strict";

// var globals = require('../data/globals'),
//     close = require('../public/close'),
//     handleOptions = require('../private/handle-options'),
//     attach = require('../private/attach'),
//     injectContent = require('../private/inject-content');



// module.exports = function (opts, trigger) {

//     var lastDialog;

//     if (globals.dialogs[0] && globals.dialogs[0].active) {
        
//         lastDialog = globals.dialogs[0];
//         close(lastDialog);

//         if (trigger === lastDialog.trigger) {
//             return;
//         }
//     }

//     var dialog = require('../private/get-dialog')();
//     dialog.trigger = trigger;
//     dialog.opts = handleOptions(opts, trigger);
    
//     if (!dialog.opts) {
//         opts.onFail(dialog);
//         return;
//     }
//     dialog.opts.onTrigger(dialog);
//     injectContent(dialog);
//     dialog.opts.onBeforeRender(dialog);
//     attach(dialog);
//     dialog.opts.onAfterRender(dialog);
// };