/* eslint-env mocha */
/* global proclaim sinon */

import {
	log,
	is,
	isUndefined,
	merge,
	encode,
	onPage,
	triggerPage,
	getValueFromCookie,
	sanitise,
	assignIfUndefined,
	filterProperties,
	findCircularPathsIn,
	containsCircularPaths,
	guid
} from '../src/javascript/utils.js';

describe('Utils', function () {

	it('should provide log functionality', function () {
		proclaim.ok(log);
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
			// eslint-disable-next-line no-empty-function
			{ value: function () {}, answer: 'function' }
		].forEach(function (test) {
			proclaim.ok(is(test.value, test.answer), test.value + " is a " + test.answer);
		});
	});

	it('should provide isUndefined functionality', function () {
		proclaim.ok(isUndefined(undefined));
	});

	it('should provide merge functionality', function () {
		proclaim.deepEqual(merge({ 'one' : 'one'}, { 'two': 'two' }), { 'one' : 'one', 'two': 'two' });
	});

	it('should provide encode functionality', function () {
		proclaim.equal(encode('http://www.ft.com?foo=bar&testing=yay!'), "http%3A%2F%2Fwww.ft.com%3Ffoo%3Dbar%26testing%3Dyay!");
	});

	it('should provide guid generation', function () {
		const id = guid();
		const re = /^\w{25}$/; // cifnulwv2000030ds4avpbm9f
		proclaim.ok(re.test(id), 'Guid ' + id + 'should match ' + /^\w{25}$/);
	});

	describe('internal page event', function () {
		const callback = sinon.spy();

		it('should provide onPage functionality', function () {
			proclaim.doesNotThrow(function () {
				onPage(callback);
			});
		});

		it('should call the callback when page is triggered', function () {
			triggerPage();
			proclaim.ok(callback.called, 'callback was triggered.');
		});
	});

	it('should provide getValueFromCookie functionality', function () {
		proclaim.ok(getValueFromCookie);
	});

	it('should provide sanitise functionality', function () {
		[
			{ param: '   with space  ', result: 'with space' },
			{ param: 'noSpace', result: 'noSpace' }
		].forEach(function (test) {
			proclaim.equal(sanitise(test.param), test.result);
		});
	});

	it('should provide assignIfUndefined functionality', function () {
		[
			{
				subject: { a: 'aa', b: 'b', c: 'c' },
				target: { a: 'a', b: undefined },
				result: { a: 'a', b: 'b', c: 'c' }
			}
		].forEach(function (test) {
			assignIfUndefined(test.subject, test.target);
			proclaim.deepEqual(test.target, test.result);
		});
	});

	it('should provide filterProperties functionality', function () {
		const allowedPropertyNames = [ 'componentContentId', 'type' ];

		[
			{
				target: { componentContentId: 1234, type: 'audio' },
				result: { componentContentId: 1234, type: 'audio' }
			},
			{
				target: { componentContentId: 1234, name: 'name' },
				result: { componentContentId: 1234 }
			},
			{
				target: { componentContentId: undefined },
				result: {}
			}
		].forEach(function (test) {
			proclaim.deepEqual(filterProperties(test.target, allowedPropertyNames), test.result);
		});
	});

	describe('findCircularPathsIn', function() {
		it('should return an empty array if object contains no circular references', function() {
			proclaim.deepStrictEqual(findCircularPathsIn({ a: 1, b: 2 }), []);
		});

		it('should return an empty array if given a string literal', function() {
			proclaim.deepStrictEqual(findCircularPathsIn(''), []);
		});

		it('should return an empty array if given a number literal', function() {
			proclaim.deepStrictEqual(findCircularPathsIn(137), []);
		});

		it('should return an empty array if given a boolean literal', function() {
			proclaim.deepStrictEqual(findCircularPathsIn(true), []);
		});

		it('should return an empty array if given null', function() {
			proclaim.deepStrictEqual(findCircularPathsIn(null), []);
		});

		it('should return an array containing all the paths which are circular', function() {
			const rootObject = {};
			rootObject.a = rootObject;
			rootObject.b = 2;
			rootObject.c = '';
			rootObject.d = null;
			rootObject.e = true;
			rootObject.f = [rootObject.a, 'carrot', rootObject];
			rootObject.f.push(rootObject.f);
			proclaim.deepStrictEqual(findCircularPathsIn(rootObject), [
				'.a',
				'.f[0]',
				'.f[2]',
				'.f[3]'
			]);
		});
	});

	describe('containsCircularPaths', function() {
		it('should return false if object contains no circular references', function() {
			proclaim.isFalse(containsCircularPaths({ a: 1, b: 2 }));
		});

		it('should return false if given a string literal', function() {
			proclaim.isFalse(containsCircularPaths(''));
		});

		it('should return false if given a number literal', function() {
			proclaim.isFalse(containsCircularPaths(137));
		});

		it('should return false if given a boolean literal', function() {
			proclaim.isFalse(containsCircularPaths(true));
		});

		it('should return false if given null', function() {
			proclaim.isFalse(containsCircularPaths(null));
		});

		it('should return true if given an object which contains circular references', function() {
			const rootObject = {};
			rootObject.a = rootObject;
			rootObject.b = 2;
			rootObject.c = '';
			rootObject.d = null;
			rootObject.e = true;
			rootObject.f = [rootObject.a, 'carrot', rootObject];
			rootObject.f.push(rootObject.f);
			proclaim.isTrue(containsCircularPaths(rootObject));
		});
	});
});
