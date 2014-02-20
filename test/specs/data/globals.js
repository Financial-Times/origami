"use strict";

var globals;

describe('global module variables (./data/globals.js)', function () {
    beforeEach(function () {
        jasmine._addCustomMatchers();
        globals = require('../../../src/js/data/globals');
    });


    it('should define some constants', function () {
        expect(globals.L).toEqual('left');
        expect(globals.R).toEqual('right'); 
        expect(globals.T).toEqual('top');
        expect(globals.B).toEqual('bottom');
        expect(globals.H).toEqual('height');
        expect(globals.W).toEqual('width');
    });

    xit('should store references to the DOM', function () {
        var ref = {
            win: window,
            body: document.getElementsByTagName('body')[0],
            doc: document,
            html: document.documentElement
        };

        Object.keys(ref).forEach(function (key) {
            expect(typeof parseFloat(globals[key].jquery)).toBe('number');
            expect(globals[key][0]).toEqual(ref[key]); 
        });
    });

    it('should create containers for additional properties', function () {
        ['presets', 'templates'].forEach(function (container) {
            expect(typeof globals[container]).toBe('object');
            expect(Object.keys(globals[container]).length).toBe(0);
        });
    });

    it('should create containers for dialog objects', function () {
        expect(globals.dialogs).toBeAnArray();
        expect(globals.dialogs.length).toBe(2);
        expect(globals.dialogs[0]).toBeUndefined();
        expect(globals.dialogs[1]).toBeUndefined();

    });

    describe('setting feature flags', function () {
        it('should set to false when classes not present on the html tag', function () {
            expect(globals.isAnimatable).toBeFalsy();
            expect(globals.isAnimatable).toBeFalsy();
            expect(globals.isFlexbox).toBeFalsy();
        });
        xit('should set to true when classes present on the html tag', function () {
            expect(globals.isAnimatable).toBeFalsy();
            expect(globals.isAnimatable).toBeFalsy();
            expect(globals.isFlexbox).toBeFalsy();
        });
    });
});