"use strict";

var Dialog,
    methods,
    globals,
    defaults,
    el,
    content,
    $ = require('jquery');

describe('smoke-tests (./dialog.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        Dialog = require('../../src/js/dialog');
        methods = require('../../src/js/methods');
        globals = require('../../src/js/data/globals').reset();
        defaults = require('../../src/js/data/defaults');

        Dialog.addPreset('modal', require('../../src/js/presets/modal'));
        Dialog.listen();
        content = $('<script>').attr({
            type: 'text/template',
            id: 'test-overlay-content'
        }).html('<h1 class="o-dialog__heading test-heading">test title</h1><div class="o-dialog__body test-body">test body</div>').appendTo('body');
        
        el = $('<span>').attr('data-o-dialog__trigger', JSON.stringify({
            src: '#test-overlay-content',
            preset: 'modal',
            outerClasses: 'test-outer-class',
            innerClasses: 'test-inner-class',
            headingSelector: '.test-heading',
            bodySelector: '.test-body'
        })).appendTo('body');
        el.trigger('click');

    });

    afterEach(function () {
        Dialog.close();
        el.remove();
        content.remove();
        Dialog.unlisten();
    });

    it('should inject an overlay with the correct content into the page', function () {
        var overlay = $('.o-dialog__overlay.o-dialog--modal__overlay.is-open'),
            wrapper = $('.o-dialog.o-dialog--modal.o-dialog--closable.test-outer-class.is-open'),
            content = wrapper.find('.o-dialog__content.o-dialog--modal__content.test-inner-class'),
            close = content.find('button.o-dialog__close'),
            heading = content.find('.o-dialog__heading.test-heading'),
            body = content.find('.o-dialog__body.test-body');

        expect(overlay.length).toBe(1);
        expect(wrapper.length).toBe(1);
        expect(content.length).toBe(1);
        expect(close.length).toBe(1);
        expect(heading.length).toBe(1);
        expect(body.length).toBe(1);
        expect(globals.dialogs[0].active).toBeTruthy();
        expect(globals.dialogs[0].body[0]).toBe(body[0]);
        expect(globals.dialogs[0].heading[0]).toBe(heading[0]);
    });

    it('should remove the overlay on close', function () {
        Dialog.close();

        var overlay = $('.o-dialog__overlay.o-dialog--modal__overlay.is-open'),
            wrapper = $('.o-dialog.o-dialog--modal.o-dialog--closable.test-outer-class.is-open');

        expect(overlay.length).toBe(0);
        expect(wrapper.length).toBe(0);
    });
});