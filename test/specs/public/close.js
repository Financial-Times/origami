"use strict";

var methods,
    globals,
    el,
    $ = require('jquery'),
    dummyDialog,
    removeClass,
    onBeforeClose;

describe('close (./public/close.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        methods = require('src/js/public/close');
        globals = require('src/js/data/globals');
        globals.dialogs = Array(2);
        onBeforeClose = jasmine.createSpy('on before close');
        removeClass = jasmine.createSpy('remove class');
        spyOn(methods, 'detach');
        spyOn(methods, 'doAfterTransition');
        dummyDialog = {
            active: true,
            wrapper: {
                removeClass: removeClass
            },
            opts: {
                onBeforeClose: onBeforeClose
            }
        };
    });

    it('should fail gracefully if there is no open dialog', function () {
        methods.close();
        globals.dialogs[0] = dummyDialog;
        dummyDialog.active = false;
        methods.close();
        expect(onBeforeClose).not.toHaveBeenCalled();
        methods.close(dummyDialog);
        expect(onBeforeClose).not.toHaveBeenCalled();
    });

    it('should default to close the current open dialog', function () {
        globals.dialogs[0] = dummyDialog;
        methods.close();
        expect(methods.detach).toHaveBeenCalledWith(dummyDialog, undefined);
    });

    it('should close a given dialog if one is passed in', function () {
        globals.dialogs[0] = dummyDialog;
        var dummyDialog2 = $.extend({}, dummyDialog);
        methods.close(dummyDialog2);
        expect(methods.detach).toHaveBeenCalledWith(dummyDialog2, undefined);
    });

    it('should destroy the module immediately if asked to', function () {
        globals.isAnimatable = true;
        globals.dialogs[0] = dummyDialog;
        methods.close(null, true);
        expect(methods.detach).toHaveBeenCalledWith(dummyDialog, true);
        expect(methods.doAfterTransition).not.toHaveBeenCalledWith(dummyDialog, true);
        globals.isAnimatable = false;
    });

    it('should remove DOM event listeners', function () {
        spyOn(globals.win, 'off');
        spyOn(globals.body, 'off');
        spyOn(globals.doc, 'off');
        globals.dialogs[0] = dummyDialog;

        methods.close();
        expect(globals.win.off).toHaveBeenCalledWith('resize.o-dialog');
        expect(globals.body.off).not.toHaveBeenCalled();
        expect(globals.doc.off).not.toHaveBeenCalled();

        dummyDialog.opts.isDismissable = true;

        methods.close();
        expect(globals.win.off).toHaveBeenCalledWith('resize.o-dialog');
        expect(globals.body.off).toHaveBeenCalledWith('click.o-dialog');
        expect(globals.doc.off).toHaveBeenCalledWith('keyup.o-dialog');
    });
    
    it('should remove the is-open class', function () {
        globals.dialogs[0] = dummyDialog;
        methods.close();
        expect(dummyDialog.wrapper.removeClass).toHaveBeenCalledWith('is-open');
    });

    it('should animate the dialog (and any associated overlay) away when is animatable', function () {
        globals.isAnimatable = true;
        globals.dialogs[0] = dummyDialog;
        dummyDialog.opts.hasOverlay = true;
        dummyDialog.overlay = {};
        dummyDialog.wrapper.add = jasmine.createSpy('wrapper add').and.callFake(function () {
            return dummyDialog.wrapper;
        });
        methods.close();
        expect(dummyDialog.wrapper.add).toHaveBeenCalledWith(dummyDialog.overlay);
        expect(methods.doAfterTransition).toHaveBeenCalled();
        expect(methods.detach).not.toHaveBeenCalled();
        globals.isAnimatable = false;
    });

    it('should remove immediately from the DOM if not animateable', function () {
        globals.dialogs[0] = dummyDialog;
        methods.close();
        expect(methods.doAfterTransition).not.toHaveBeenCalled();
        expect(methods.detach).toHaveBeenCalled();
    });


    it('should call the onBeforeClose event before anything else', function () {
        globals.dialogs[0] = dummyDialog;

        o.verifyFunctionCalls(function () {
            methods.close();
        }, [
            {
                obj: dummyDialog.opts,
                method: 'onBeforeClose'
            },
            {
                obj: methods,
                method: 'detach',
                params: [dummyDialog, undefined]
            }
        ]);
    });
});