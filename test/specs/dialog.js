"use strict";

var Dialog,
    globals,
    defaults;

describe('dialog (./dialog.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        Dialog = require('src/js/dialog');
        globals = require('src/js/data/globals');
        defaults = require('src/js/data/defaults');
    });

    it('should have other submodules available as methods', function () {
        expect(Dialog.close).toBe(require('src/js/public/close'));
        expect(Dialog.listen).toBe(require('src/js/public/listen'));
        expect(Dialog.unlisten).toBe(require('src/js/public/unlisten'));
        expect(Dialog.trigger).toBe(require('src/js/public/trigger'));
    });

    it('should have a destroy method which delegates to the close method', function () {
        spyOn(Dialog, 'close');
        Dialog.destroy();
        expect(Dialog.close).toHaveBeenCalledWith(null, true);
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