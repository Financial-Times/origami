"use strict";

var methods,
    el,
    $ = require('jquery');

describe('listen (./public/listen.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        methods = require('src/js/public/listen');
        spyOn(methods, 'trigger');
    });

    it('should handle clicks on elements with "data-o-dialog__trigger" set', function () {
        var el = document.createElement('span'),
            $el = $(el).appendTo('body');
        o.fireEvent(el, 'click');
        expect(methods.trigger).not.toHaveBeenCalled();
        $el.trigger('click');
        expect(methods.trigger).not.toHaveBeenCalled();
        $el.trigger('click.o-dialog__trigger');
        expect(methods.trigger).not.toHaveBeenCalled();
        el.setAttribute('data-o-dialog__trigger', '{}');
        o.fireEvent(el, 'click');
        expect(methods.trigger).not.toHaveBeenCalled();
        el.removeAttribute('data-o-dialog__trigger', '{}');
        methods.listen();
        o.fireEvent(el, 'click');
        expect(methods.trigger).not.toHaveBeenCalled();
        el.setAttribute('data-o-dialog__trigger', '{}');
        o.fireEvent(el, 'click');
        expect(methods.trigger).not.toHaveBeenCalled();
        $el.trigger('click.o-dialog__trigger');
        expect(methods.trigger).toHaveBeenCalledWith({}, el);
        $el.remove();
    });

    xit('should prevent the default action for clicks by default', function () {
        var el = document.createElement('span'),
            $el = $(el).appendTo('body'),
            ev;

        spyOn($.Event.prototype, 'preventDefault');
        ev = $.Event('click.o-dialog__trigger');

        methods.listen();
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
        methods.listen();
        el.setAttribute('data-o-dialog__trigger', '{"dontPreventDefault": true}');
        $el.trigger(ev);
        expect(ev.originalEvent.defaultPrevented).toBeFalsy();
        $el.remove();
    });
});