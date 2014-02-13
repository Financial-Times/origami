"use strict";

var listen,
    Dialog,
    el,
    $ = require('jquery');

describe('listen (./public/listen.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        listen = require('src/js/public/listen');
        Dialog = require('src/js/dialog');
        spyOn(Dialog, 'trigger');
    });

    it('should handle clicks on elements with "data-o-dialog__trigger" set', function () {
        var el = document.createElement('span'),
            $el = $(el).appendTo('body');
        o.fireEvent(el, 'click');
        expect(Dialog.trigger).not.toHaveBeenCalled();
        $el.trigger('click');
        expect(Dialog.trigger).not.toHaveBeenCalled();
        $el.trigger('click.o-dialog__trigger');
        expect(Dialog.trigger).not.toHaveBeenCalled();
        el.setAttribute('data-o-dialog__trigger', '{}');
        o.fireEvent(el, 'click');
        expect(Dialog.trigger).not.toHaveBeenCalled();
        el.removeAttribute('data-o-dialog__trigger', '{}');
        Dialog.listen();
        o.fireEvent(el, 'click');
        expect(Dialog.trigger).not.toHaveBeenCalled();
        el.setAttribute('data-o-dialog__trigger', '{}');
        o.fireEvent(el, 'click');
        expect(Dialog.trigger).not.toHaveBeenCalled();
        $el.trigger('click.o-dialog__trigger');
        expect(Dialog.trigger).toHaveBeenCalledWith({}, el);
        $el.remove();
    });

    xit('should prevent the default action for clicks by default', function () {
        var el = document.createElement('span'),
            $el = $(el).appendTo('body'),
            ev;

        spyOn($.Event.prototype, 'preventDefault');
        ev = $.Event('click.o-dialog__trigger');

        Dialog.listen();
        el.setAttribute('data-o-dialog__trigger', '{}');
        $el.trigger(ev);
        expect($.Event.prototype.preventDefault).toHaveBeenCalled();
        $el.remove();
    });

    xit('should be possible to enable the default action for clicks', function () {
        var el = document.createElement('span'),
            $el = $(el).appendTo('body'),
            ev = $.Event('click.o-dialog__trigger');

        spyOn(ev, 'preventDefault');
        Dialog.listen();
        el.setAttribute('data-o-dialog__trigger', '{"dontPreventDefault": true}');
        $el.trigger(ev);
        expect(ev.originalEvent.defaultPrevented).toBeFalsy();
        $el.remove();
    });
});