"use strict";

var unlisten,
    Dialog,
    el,
    $ = require('jquery');

describe('unlisten (./public/unlisten.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        unlisten = require('src/js/public/unlisten');
        Dialog = require('src/js/dialog');
        spyOn(Dialog, 'trigger');
    });

    it('should unhandle clicks on elements with "data-o-dialog__trigger" set', function () {
        var el = document.createElement('span'),
            $el = $(el).appendTo('body');

        el.setAttribute('data-o-dialog__trigger', '{}');
        
        Dialog.listen();
        $el.trigger('click.o-dialog__trigger');
        expect(Dialog.trigger).toHaveBeenCalled();
        Dialog.trigger.calls.reset();
        Dialog.unlisten();
        $el.trigger('click.o-dialog__trigger');
        expect(Dialog.trigger).not.toHaveBeenCalled();
    });
});