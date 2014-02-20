"use strict";

var Dialog,
    methods,
    globals,
    defaults;

describe('dialog (./dialog.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        Dialog = require('../../src/js/dialog');
        methods = require('../../src/js/methods');
        globals = require('../../src/js/data/globals');
        defaults = require('../../src/js/data/defaults');
    });

    it('should have other submodules available as methods', function () {
        expect(Dialog.close).toBe(methods.close);
        expect(Dialog.listen).toBe(methods.listen);
        expect(Dialog.unlisten).toBe(methods.unlisten);
        expect(Dialog.trigger).toBe(methods.trigger);
    });

    it('should have a destroy method which delegates to the close method', function () {
        spyOn(methods, 'close');
        Dialog.destroy();
        expect(methods.close).toHaveBeenCalledWith(null, true);
    });

    it('should be possible to add new dialog preset types', function () {
        var headingSelector = defaults.headingSelector;

        Dialog.addPreset('test', {
            bodySelector: 'test'
        });

        expect(globals.presets.test).toBeAnObject();
        expect(globals.presets.test).not.toBe(defaults);
        expect(globals.presets.test.headingSelector).toEqual(headingSelector);
        expect(globals.presets.test.bodySelector).toEqual('test');
    });

    xit('should be possible to register and unregister remove templates', function () {
//         addTemplate: function (name, tpl) {
//             globals.templates[name] = tpl;
//         },
//         removeTemplate: function (name) {
//             globals.templates[name] = undefined;
//         }
    });
});