/*global require, describe, it, before, after, sinon */
"use strict";

var assert = require('assert'),
	Core = require("../src/javascript/core.js");

describe('Core', function () {

	describe('pageID', function () {
		it('should generate a pageID', function () {
			var pageID = Core.setPageID(),
				re = /\d+\.\d+\.\d+\.\d+\.[\-\w]+/;
			assert.ok(pageID.match(re), "'" + pageID + "'.match(" + re + ")");
		});

		it('should use the pageID given it', function () {
			assert.equal(Core.setPageID("myPageID"), "myPageID");
		});
	});

	describe('track', function () {
		var server;

		before(function () {
			require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
			//require("../src/javascript/core/settings").set('developer', true);
			(new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
			require("../src/javascript/core/session").init(); // Session
			require("../src/javascript/core/send").init("v1"); // Init the sender.

			server = sinon.fakeServer.create(); // Catch AJAX requests
		});

		after(function () {
			server.restore();
		});

		it('should send a tracking request', function () {
			server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

			var callback = sinon.spy(),
				sent_data;

			Core.setPageID('pageID');
			Core.track({
				tag: { type: 'page'  },
				page: { url: "http://www.ft.com/home/uk" },
				user: { "userID": "userID" }
			}, callback);

			server.respond();

			assert.ok(callback.called, 'Callback not called.');

			sent_data = callback.getCall(0).thisValue;

			assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "page"]);
			// Tag
			assert.deepEqual(Object.keys(sent_data.tag), ["apiKey","version","id","counter","offset","pageID","type"]);
			assert.equal(sent_data.tag.apiKey, "");
			assert.equal(sent_data.tag.version, "v1");
			assert.ok(/\d+\.\d+\.\d+\.\d+\.[\-\w]+/.test(sent_data.tag.id), "Request ID is invalid. " + sent_data.tag.id);
			assert.equal(sent_data.tag.counter, 1);
			assert.ok(/\d+/.test(sent_data.tag.offset), "offset is invalid. " + sent_data.tag.offset);
			assert.equal(sent_data.tag.pageID, "pageID");
			assert.equal(sent_data.tag.type, "page");

			// User
			assert.deepEqual(Object.keys(sent_data.user), ["sessionID","userID"]);
			assert.equal(sent_data.user.userID, "userID");
			assert.equal(sent_data.user.sessionID, require("../src/javascript/core/session").session());

			// Device
			assert.equal(sent_data.device.userAgent, "Mozilla/5.0 (Macintosh; Intel Mac OS X) AppleWebKit/534.34 (KHTML, like Gecko) PhantomJS/1.9.8 Safari/534.34");
		});

		it('should defer a tracking request', function () {
			server.respondWith([404, { "Content-Type": "plain/text", "Content-Length": 6 }, "NOT OK"]);

			var callback = sinon.spy();

			Core.track({
				tag: { type: 'page'  },
				page: { url: "http://www.google.co.uk" },
				user: { "userID": "userID" }
			}, callback);

			server.respond();

			assert.equal(callback.called, 1, 'Callback not called.');

			server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

			// Try again
			require("../src/javascript/core/send").run();

			server.respond();

			assert.ok(callback.calledTwice, 'Callback not called.');
		});
	});


});
