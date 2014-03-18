/*global require, describe, it, before, after, sinon */
var assert = require('assert'),

    Core = require("../src/javascript/core.js");

describe('Core', function () {
    "use strict";

    describe('clickID', function () {
        it('should generate a clickID', function () {
            var clickID = Core.clickID(),
                re = /t\d{13}h\d/;
            assert.ok(clickID.match(re), "'" + clickID + "'.match(" + re + ")");
        });

        it('should use the clickID given it', function () {
            assert.equal(Core.clickID("myClickID"), "myClickID");
        });
    });

    describe('track', function () {
        var server;

        before(function () {
            require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
            (new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
            require("../src/javascript/core/send").init(); // Init the sender.

            server = sinon.fakeServer.create(); // Catch AJAX requests
        });

        after(function () {
            server.restore();
        });

        it('should send a tracking request', function () {
            server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

            var callback = sinon.spy(),
                sent_data;

            Core.track({
                type: 'page',
                url: "http://www.ft.com/home/uk",
                "clickID": "clickID"
            }, callback);

            server.respond();

            sent_data = callback.getCall(0).thisValue;

            assert.deepEqual(Object.keys(sent_data), ["clickID", "requestID", "counter", "environment", "type", "url", "queueTime"]);
            assert.equal(sent_data.clickID, "clickID");
            assert.ok(/\d+\.\d+\.\d+\.\d+\.[\-\w]+/.test(sent_data.requestID), "RequestID is invalid. " + sent_data.requestID);
            assert.equal(sent_data.counter, 1);
            assert.equal(sent_data.environment, "test");
            assert.equal(sent_data.type, "page");
            assert.equal(sent_data.url, "http://www.ft.com/home/uk");
            assert.ok(/\d+/.test(sent_data.queueTime), "queueTime is invalid. " + sent_data.queueTime);
        });
    });


});

