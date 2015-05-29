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
            page: {
                url: "http://www.ft.com/home/uk"
            }
        }, callback);

        server.respond();
        assert.ok(callback.called, 'Callback not called.');

        sent_data = callback.getCall(0).thisValue;

        // Basics
        assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "page"]);

        // Type
        assert.equal(sent_data.tag.type, "page");

        // Page
        assert.equal(sent_data.page.url, "http://www.ft.com/home/uk");
        assert.ok(!!sent_data.page.referrer, "referrer is invalid. " + sent_data.page.referrer);
    });
});

