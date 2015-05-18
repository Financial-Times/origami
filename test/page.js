/*global require, describe, it, before, after, sinon */

var assert = require("assert"),
    page = require("../src/javascript/page.js");

describe('page', function () {
    "use strict";

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

    it('should track a page', function () {
        server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

        var callback = sinon.spy(),
            sent_data;

        page({
            url: "http://www.ft.com/home/uk",
            'userID': 'userID'
        }, callback);

        server.respond();
        sent_data = callback.getCall(0).thisValue.request;

        assert.deepEqual(Object.keys(sent_data), ["userID", "clickID", "requestID", "session", "counter", "url", "referrer", "queueTime"]);
        assert.ok(/\d+\.\d+\.\d+\.\d+\.[\-\w]+/.test(sent_data.clickID), "ClickID is invalid. " + sent_data.clickID);
        assert.ok(/\d+\.\d+\.\d+\.\d+\.[\-\w]+/.test(sent_data.requestID), "RequestID is invalid. " + sent_data.requestID);
        assert.equal(sent_data.userID, "userID");
        assert.equal(sent_data.counter, 1);
        //assert.equal(sent_data.type, "page");
        assert.equal(sent_data.url, "http://www.ft.com/home/uk");
        assert.ok(!!sent_data.referrer, "referrer is invalid. " + sent_data.referrer);
        assert.ok(/\d+/.test(sent_data.queueTime), "queueTime is invalid. " + sent_data.queueTime);
    });
});

