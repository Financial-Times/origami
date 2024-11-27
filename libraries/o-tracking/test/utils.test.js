/* eslint-env mocha */

import proclaim from 'proclaim';
import sinon from 'sinon/pkg/sinon-esm.js';
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
	removeCircularReferences,
	safelyStringifyJson,
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

	describe('removeCircularReferences', function () {
		it('should handle circular references in objects', function () {
			const object = {a: 1};
			object.b = object; // Circular reference

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: 1,
					b: 'Circular reference between `$` AND `$.b`',
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$.b`',
			]);
		});

		it('should handle circular references in nested objects', function () {
			const object = {
				a: 1,
				c: {},
			};

			object.c.d = object.c; // Circular reference

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: 1,
					c: {
						d: 'Circular reference between `$.c` AND `$.c.d`',
					},
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$.c` AND `$.c.d`',
			]);
		});

		it('should handle circular references in arrays', function () {
			const array = [1, 2, 3];
			array.push(array); // Circular reference

			const {jsonString, warnings} = removeCircularReferences(array);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify([1, 2, 3, 'Circular reference between `$` AND `$[3]`'])
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$[3]`',
			]);
		});

		it('should handle non-circular references in objects', function () {
			const object = {
				a: {
					b: {
						c: {
							d: 1,
						},
					},
				},
			};
			object.a.b.e = object.a.b.c;

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: {
						b: {
							c: {
								d: 1,
							},
							e: {
								d: 1,
							},
						},
					},
				})
			);
			proclaim.deepEqual(warnings, []);
		});

		it('should handle complex structures with multiple circular references', function () {
			const object = {
				a: 1,
				b: {
					c: 2,
				},
				d: [],
			};

			object.b.e = object; // Circular reference
			object.d.push(object.b); // Circular reference

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: 1,
					b: {
						c: 2,
						e: 'Circular reference between `$` AND `$.b.e`',
					},
					d: [
						{
							c: 2,
							e: 'Circular reference between `$` AND `$.b.e` AND `$.b.e.d[0].e`',
						},
					],
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$.b.e`',
				'Circular reference between `$` AND `$.b.e` AND `$.b.e.d[0].e`',
			]);
		});

		it('should handle circular references with array indices in the path', function () {
			const object = {
				a: [
					{
						b: 1,
						c: 1,
					},
				],
			};

			object.a[0].d = object.a[0]; // Circular reference to the array element at index 1

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: [
						{
							b: 1,
							c: 1,
							d: 'Circular reference between `$.a[0]` AND `$.a[0].d`',
						},
					],
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$.a[0]` AND `$.a[0].d`',
			]);
		});

		it('should handle deep nested circular references', function () {
			const object = {
				level1: {
					level2: {
						level3: {},
					},
				},
			};

			object.level1.level2.level3 = object.level1; // Circular reference to a higher level

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					level1: {
						level2: {
							level3:
								'Circular reference between `$.level1` AND `$.level1.level2.level3`',
						},
					},
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$.level1` AND `$.level1.level2.level3`',
			]);
		});

		it('should handle circular references in objects within arrays', function () {
			const object = {
				a: [],
				b: [],
			};

			object.a[0] = object.b; // Circular reference to another object in the array
			object.b[0] = object.a; // Circular reference to another object in the array

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: [['Circular reference between `$.a` AND `$.a[0][0]`']],
					b: [['Circular reference between `$.b` AND `$.b[0][0]`']],
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$.a` AND `$.a[0][0]`',
				'Circular reference between `$.b` AND `$.b[0][0]`',
			]);
		});

		it('should handle self-referencing arrays', function () {
			const array = [];
			array[0] = array; // Array references itself

			const {jsonString, warnings} = removeCircularReferences(array);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify(['Circular reference between `$` AND `$[0]`'])
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$[0]`',
			]);
		});

		it('should handle circular references in mixed arrays and objects', function () {
			const object = {
				a: 1,
				b: [
					2,
					{
						c: 3,
					},
				],
			};

			object.b[1].ref = object; // Circular reference from an object in an array to the root

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: 1,
					b: [
						2,
						{
							c: 3,
							ref: 'Circular reference between `$` AND `$.b[1].ref`',
						},
					],
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$.b[1].ref`',
			]);
		});

		it('should handle circular references involving arrays and objects', function () {
			const object = {
				a: [
					{
						b: 1,
					},
				],
			};

			object.a.push(object); // Circular reference from array to object

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: [
						{
							b: 1,
						},
						'Circular reference between `$` AND `$.a[1]`',
					],
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$.a[1]`',
			]);
		});

		it('should handle empty objects', function () {
			const object = {};
			object.ref = object; // Circular reference in an empty object

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					ref: 'Circular reference between `$` AND `$.ref`',
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$.ref`',
			]);
		});

		it('should handle empty arrays', function () {
			const array = [];
			array.push(array); // Circular reference in an empty array

			const {jsonString, warnings} = removeCircularReferences(array);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify(['Circular reference between `$` AND `$[0]`'])
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$` AND `$[0]`',
			]);
		});

		it('should handle circular references in large complex objects', function () {
			const object = {
				a: {
					b: {
						c: {
							d: 1,
						},
					},
				},
				e: {
					f: {
						g: 2,
					},
				},
			};

			object.a.b.c.ref = object.e.f; // Circular reference
			object.e.f.ref = object.a.b; // Circular reference

			const {jsonString, warnings} = removeCircularReferences(object);
			proclaim.deepEqual(
				jsonString,
				JSON.stringify({
					a: {
						b: {
							c: {
								d: 1,
								ref: {
									g: 2,
									ref: 'Circular reference between `$.a.b` AND `$.a.b.c.ref.ref`',
								},
							},
						},
					},
					e: {
						f: {
							g: 2,
							ref: {
								c: {
									d: 1,
									ref: 'Circular reference between `$.e.f` AND `$.e.f.ref.c.ref`',
								},
							},
						},
					},
				})
			);
			proclaim.deepEqual(warnings, [
				'Circular reference between `$.a.b` AND `$.a.b.c.ref.ref`',
				'Circular reference between `$.e.f` AND `$.e.f.ref.c.ref`',
			]);
		});
	});

	describe('safelyStringifyJson', function () {
		it('should return a JSON string if object contains no circular references', function () {
			proclaim.strictEqual(safelyStringifyJson({a: 1, b: 2}), '{"a":1,"b":2}');
		});

		it('should return a JSON empty string if given a string literal', function () {
			proclaim.strictEqual(safelyStringifyJson(''), '""');
		});

		it('should return a JSON number if given a number literal', function () {
			proclaim.strictEqual(safelyStringifyJson(137), '137');
		});

		it('should return the string true if given a boolean literal', function () {
			proclaim.strictEqual(safelyStringifyJson(true), 'true');
		});

		it('should return the string null if given null', function () {
			proclaim.strictEqual(safelyStringifyJson(null), 'null');
		});

		it('should throw an informative error listing all the paths which are circular', function (done) {
			const rootObject = {};
			rootObject.a = rootObject;
			rootObject.b = 2;
			rootObject.c = '';
			rootObject.d = null;
			rootObject.e = true;
			rootObject.f = [rootObject.a, 'carrot', rootObject];
			rootObject.f.push(rootObject.f);

			const onerror = window.onerror;
			let errorMessage;
			window.onerror = function errorHandler(message) {
				errorMessage = message;
			};

			safelyStringifyJson(rootObject);

			setTimeout(() => {
				proclaim.include(errorMessage, 'AssertionError');
				proclaim.include(
					errorMessage,
					'Circular reference between `$` AND `$.a`'
				);
				proclaim.include(
					errorMessage,
					'Circular reference between `$` AND `$.a` AND `$.a.f[0]`'
				);
				proclaim.include(
					errorMessage,
					'Circular reference between `$` AND `$.a` AND `$.a.f[0]` AND `$.a.f[2]`'
				);
				proclaim.include(
					errorMessage,
					'Circular reference between `$.a.f` AND `$.a.f[3]`'
				);
				window.onerror = onerror;
				done();
			});
		});
	});
});
