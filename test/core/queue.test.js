/*global require, describe, it */

const assert = require('assert');

const Queue = require('../../src/javascript/core/queue');
const queue_name = 'queue_test';

// PhantomJS doesn't always create a "fresh" environment...
(new Queue(queue_name)).replace([]);

describe('Core.Queue', function () {

	describe('init()', function () {
		it('should require a name', function () {
			assert.throws(function () {
				new Queue();
			}, /You must specify a name for the queue/);
		});
	});

	const a_function = function () {};
	const queue = new Queue(queue_name);

	describe('add', function () {
		it('should add a string to the queue', function () {
			assert.doesNotThrow(function () {
				queue.add("hello");
			});
		});

		it('should add an object to the queue', function () {
			assert.doesNotThrow(function () {
				queue.add({ "hello": "world" });
			});
		});

		it('should add many items at once', function () {
			assert.doesNotThrow(function () {
				queue.add(['www.example.com', a_function]);
			});
		});
	});

	describe('retrieve', function () {
		it('should have the correct number of items', function () {
			assert.equal(queue.all().length, 4);
		});

		it('should get the first item', function () {
			assert.equal(queue.first(), "hello");
		});

		it('should get the last item', function () {
			assert.equal(queue.last(), a_function);
		});
	});

	describe('replace', function () {
		it('should replace the queue', function () {
			assert.doesNotThrow(function () {
				queue.replace(["i", 'am', /the/, function () { return 'replacement'; }]);
			});
		});

		it('should have the correct number of items', function () {
			assert.equal(queue.all().length, 4);
		});
	});

	describe('shift', function () {
		it('should shift an item off the front of the queue', function () {
			const pre_shift = queue.all();
			const item = queue.shift();
			assert.deepEqual(pre_shift, [item].concat(queue.all()));
		});

		it('should have the correct number of items', function () {
			assert.equal(queue.all().length, 3);
		});
	});

	describe('saving', function () {
		it('should persist the queue', function () {
			assert.doesNotThrow(function () {
				queue.save();
			});
		});

		let queue2;

		it('should get the saved queue', function () {
			assert.doesNotThrow(function () {
				queue2 = new Queue(queue_name);
			});
		});

		it('should have the correct number of items', function () {
			assert.equal(queue2.all().length, 3);
		});
	});
});
