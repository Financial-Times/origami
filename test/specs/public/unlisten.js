"use strict";

var methods,
    el,
    $ = require('jquery');

describe('unlisten (./public/unlisten.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        methods = require('src/js/public/unlisten');
        spyOn(methods, 'trigger');
    });

    it('should unhandle clicks on elements with "data-o-dialog__trigger" set', function () {
        var el = document.createElement('span'),
            $el = $(el).appendTo('body');

        el.setAttribute('data-o-dialog__trigger', '{}');
        
        methods.listen();
        $el.trigger('click');
        expect(methods.trigger).toHaveBeenCalled();
        methods.trigger.calls.reset();
        methods.unlisten();
        $el.trigger('click');
        expect(methods.trigger).not.toHaveBeenCalled();
    });
});