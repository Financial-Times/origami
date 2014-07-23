'use strict';

var Modal,
    el,
    tpl,
    currentModal,
    testContent = '<h1 class=\"o-modal__heading test-heading\">test title</h1><div class=\"o-modal__body test-body\">test body</div>',

    $ = require('jquery');

describe('smoke-tests (./modal.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        Modal = require('../../src/js/modal');
        Modal.defaults.onBeforeRender = function (mod) {
            currentModal = mod;
        };
        el = $('<span class="o-modal__trigger">').appendTo('body');
    });

    afterEach(function () {
        el.remove();
        tpl && tpl.remove();
        Array.prototype.forEach.call(document.querySelectorAll('.o-modal, .o-modal__overlay'), function (el) {
            el.parentNode.removeChild(el);
        });
        currentModal.delegates.win.off();
        currentModal.delegates.wrap.off();
        currentModal.globalDelegate.off();
    });

    describe('opening and closing', function () {

        beforeEach(function () {
            el.attr({
                'data-o-modal-src': testContent,
                'data-o-modal-outer-class': 'test-outer-class',
                'data-o-modal-inner-class': 'test-inner-class',
                'data-o-modal-close-class': 'test-close-class',
                'data-o-modal-heading-selector': '.test-heading',
                'data-o-modal-body-selector': '.test-body'
            });
        });

        afterEach(function () {
            Modal.unlisten();
        });

        it('should open with correct content when trigger is clicked', function () {
            
            o.fireEvent(el[0], 'click');
            expect($('.o-modal').length).toBe(0);
            
            Modal.listen();
            
            o.fireEvent(el[0], 'click');

            var wrapper = $('.o-modal.o-modal--closable.test-outer-class.is-open'),
                content = wrapper.find('.o-modal__content.test-inner-class'),
                overlay = $('.o-modal + .o-modal__overlay'),
                close = content.find('button.o-modal__close.test-close-class'),
                heading = content.find('.o-modal__heading.test-heading'),
                body = content.find('.o-modal__body.test-body');

            
            expect(wrapper.length).toBe(1);
            expect(content.length).toBe(1);
            expect(overlay.length).toBe(1);
            expect(close.length).toBe(1);
            expect(heading.length).toBe(1);
            expect(body.length).toBe(1);
        });
        it('should be closable in many different ways', function () {
            spyOn(Modal.prototype, 'close');
            Modal.listen();
            
            o.fireEvent(el[0], 'click');
                
            o.fireEvent($('button.o-modal__close')[0], 'click');
            o.fireEvent($('.o-modal__overlay')[0], 'click');
            o.fireEvent(document, 'keyup', {
                keyCode: 27
            });
            o.fireCustomEvent(document.body, 'oLayers.closeAll');
            o.fireCustomEvent(document.body, 'oLayers.open');

            expect(Modal.prototype.close.calls.count()).toBe(5);
                
        });
        it('should remove all traces on close', function () {
            Modal.listen();
            
            o.fireEvent(el[0], 'click');

            o.fireEvent($('button.o-modal__close')[0], 'click');

            expect($('.o-modal').length).toBe(0);

            Modal.unlisten();

            o.fireEvent(el[0], 'click');
            expect($('.o-modal').length).toBe(0);

            spyOn(Modal.prototype, 'close');
            spyOn(Modal.prototype, 'realign');
            spyOn(Modal.prototype, 'resizeListener');
            spyOn(Modal.prototype, 'closeOnExternalClick');
            spyOn(Modal.prototype, 'closeOnEscapePress');
           
            o.fireCustomEvent(document.body, 'oLayers.closeAll');
            o.fireCustomEvent(document.body, 'oViewport.resize');
            o.fireCustomEvent(document.body, 'oLayers.open');
            o.fireEvent($('.o-modal__overlay')[0], 'click');
            o.fireEvent(document, 'keyup');

            expect(Modal.prototype.close).not.toHaveBeenCalled();
            expect(Modal.prototype.realign).not.toHaveBeenCalled();
            expect(Modal.prototype.resizeListener).not.toHaveBeenCalled();
            expect(Modal.prototype.closeOnExternalClick).not.toHaveBeenCalled();
            expect(Modal.prototype.closeOnEscapePress).not.toHaveBeenCalled();

                
        });



        it('should be possible to open and close imperatively', function () {
            var mod = new Modal({
                src: testContent,
                outerClasses: 'test-outer-class',
                innerClasses: 'test-inner-class',
                headingSelector: '.test-heading',
                bodySelector: '.test-body'
            });
            expect($('.o-modal').length).toBe(1);
            mod.close();
            expect($('.o-modal').length).toBe(0);
        });

    });


    it('should be able to inject content from template', function () {
        var tpl = $('<script>').attr({
            type: 'text/template',
            id: 'test-overlay-content'
        }).html(testContent).appendTo('body');

        var mod = new Modal({
            src: '#test-overlay-content',
            outerClasses: 'test-outer-class',
            innerClasses: 'test-inner-class',
            closeClass: 'test-close-class',
            headingSelector: '.test-heading',
            bodySelector: '.test-body'
        });
        expect($('.o-modal').length).toBe(1);
        mod.close();
        expect($('.o-modal').length).toBe(0);
        tpl.remove();
    });
});