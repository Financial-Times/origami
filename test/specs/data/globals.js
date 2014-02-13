"use strict";


var jQuery = require('jquery');

describe('global module variables (./data/globals.js)', function () {

    var globals = require('src/js/data/globals');

    it('should define some constants', function () {
        expect(globals.L).toEqual('left');
        expect(globals.R).toEqual('right'); 
        expect(globals.T).toEqual('top');
        expect(globals.B).toEqual('bottom');
        expect(globals.H).toEqual('height');
        expect(globals.W).toEqual('width');
    });

    it('should store references to the DOM', function () {
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


//     isAnimatable = html.hasClass('csstransforms');
//     isAnimatable: isAnimatable,
//     isFlexbox: html.hasClass('flexbox') || html.hasClass('flexboxlegacy'),

//     dialogs: isAnimatable ? (new Array(2)) : []
});