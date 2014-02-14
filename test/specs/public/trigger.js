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
        globals.dialogs = Array(2);
    });

    it('should close any previously opened dialogs', function () {
        var dummyDialog = globals.dialogs[0] = {
                active: true
            };
        spyOn(methods, 'close');
        spyOn(methods, 'getDialog').and.callThrough();
        methods.trigger({onFail: function () {}});
        expect(methods.close).toHaveBeenCalledWith(dummyDialog);
        expect(methods.getDialog).toHaveBeenCalled();
    });

    it('should close the same dialog and not retrigger if same trigger clicked again', function () {
        var dummyTrigger = {},
            dummyDialog = globals.dialogs[0] = {
                active: true,
                trigger: dummyTrigger
            };
            
        spyOn(methods, 'close');
        spyOn(methods, 'getDialog').and.callThrough();
        methods.trigger({onFail: function () {}}, dummyTrigger);
        expect(methods.close).toHaveBeenCalledWith(dummyDialog);
        expect(methods.getDialog).not.toHaveBeenCalled();
    });

    it('should call the onFail method if options passed in are invalid', function () {
        var onFail = jasmine.createSpy('on fail');
        methods.trigger({onFail:onFail});
        expect(onFail).toHaveBeenCalled();
    });

    it('should attach a reference to the triggering element', function () {
        var dummyTrigger = {},
            dummyDialog = globals.dialogs[0] = {};
        methods.trigger({onFail: function () {}}, dummyTrigger);
        expect(dummyDialog.trigger).toBe(dummyTrigger);
    });

    it('should call internal methods and event listeners in the expected order', function () {
        var opts = {src: 'ya'},
            dummyTrigger = {},
            dummyDialog = globals.dialogs[0] = {};

        o.verifyFunctionCalls(function () {
            methods.trigger(opts, dummyTrigger);
        }, [
            {
                obj: methods,
                method: 'getDialog',
                callThrough: true
            },
            {
                obj: methods,
                method: 'handleOptions',
                callFake: function () {
                    return opts;
                },
                params: [opts, dummyTrigger]
            },
            {
                obj: opts,
                method: 'onTrigger',
                params: [dummyDialog]
            },
            {
                obj: methods,
                method: 'injectContent',
                params: [dummyDialog]
            },
            {
                obj: opts,
                method: 'onBeforeRender',
                params: [dummyDialog]
            },
            {
                obj: methods,
                method: 'attach',
                params: [dummyDialog]
            },
            {
                obj: opts,
                method: 'onAfterRender',
                params: [dummyDialog]
            }
        ]);
    });
});