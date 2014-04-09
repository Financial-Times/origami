/*global require, describe, it */
var assert = require('assert'),
    Utils = require("../src/javascript/utils");

describe('Utils', function () {
    "use strict";

    it('should provide log functionality', function () {
        assert.ok(Utils.log);
    });

    it('should provide is functionality', function () {
        [
            { value: undefined, answer: 'undefined' },
            { value: null, answer: 'object' },
            { value: false, answer: 'boolean' },
            { value: true, answer: 'boolean' },
            { value: "", answer: 'string' },
            { value: 1, answer: 'number' },
            { value: [], answer: 'object' },
            { value: {}, answer: 'object' },
            { value: function () {}, answer: 'function' }
        ].forEach(function (test) {
            assert.ok(Utils.is(test.value, test.answer), test.value + " is a " + test.answer);
        });
    });

    it('should provide isUndefined functionality', function () {
        assert.ok(Utils.isUndefined(undefined));
    });

    it('should provide merge functionality', function () {
        assert.deepEqual(Utils.merge({ 'one' : 'one'}, { 'two': 'two' }), { 'one' : 'one', 'two': 'two' });
    });

    it('should provide encode functionality', function () {
        assert.equal(Utils.encode('http://www.ft.com?foo=bar&testing=yay!'), "http%3A%2F%2Fwww.ft.com%3Ffoo%3Dbar%26testing%3Dyay!");
    });

    it('should provide unencode functionality', function () {
        assert.equal(Utils.unencode("http%3A%2F%2Fwww.ft.com%3Ffoo%3Dbar%26testing%3Dyay!"), 'http://www.ft.com?foo=bar&testing=yay!');
    });

    it('should provide hash functionality', function () {
        assert.equal(Utils.hash("test string"), '-30ec5bc');
    });

    it('should provide objectKeys functionality', function () {
        assert.deepEqual(Utils.objectKeys({ 'one' : 'one', 'two': 'two' }), ['one', 'two']);
    });

    it('should provide serialize functionality', function () {

        assert.equal(Utils.serialize({ 'one' : 'one', 'two': 'two' }, ['one']), "one=one");
    });

    it('should provide unserialize functionality', function () {
        assert.deepEqual(Utils.unserialize("one=one&two=two"), { 'one' : 'one', 'two': 'two' });
    });

    it('should provide toISOString functionality', function () {
        var date = new Date(1397036781758);
        assert.equal(Utils.toISOString(date), "2014-04-09T09:46:21.758Z");
    });
});