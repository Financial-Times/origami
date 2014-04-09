/*global require, describe, it, before, after, sinon, document */

var assert = require("assert"),

    link = require("../src/javascript/link.js");

describe('link', function () {
    "use strict";

    var server, userID;

    before(function () {
        require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
        (new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
        require("../src/javascript/core/send").init(); // Init the sender.
        require("../src/javascript/core").setClickID('clickID'); // Fix the click ID to stop it generating one.
        userID = require("../src/javascript/core/user").init(); // Init the user identifier.

        server = sinon.fakeServer.create(); // Catch AJAX requests
    });

    after(function () {
        server.restore();
    });

    it('should track an external link', function () {
        server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

        var callback = sinon.spy(),
            sent_data,

            aLink = document.createElement('a'),
            event = document.createEvent('HTMLEvents');

        aLink.href = "http://www.google.com";

        link.init({
            links: [aLink],
            event: 'testClick',
            callback: callback
        });

        event.initEvent('testClick', true, true);
        aLink.dispatchEvent(event, true);

        server.respond();
        sent_data = callback.getCall(0).thisValue;

        assert.deepEqual(Object.keys(sent_data), ["userID", "clickID", "requestID", "counter", "type", "link", "referrerClickID", "queueTime"]);
        assert.equal(sent_data.clickID, "clickID");
        assert.ok(/\d+\.\d+\.\d+\.\d+\.[\-\w]+/.test(sent_data.requestID), "RequestID is invalid. " + sent_data.requestID);
        assert.equal(sent_data.userID, userID);
        assert.equal(sent_data.counter, 1);
        assert.equal(sent_data.type, "link");
        assert.equal(sent_data.link, "a/www.google.com");
        assert.equal(sent_data.referrerClickID, "clickID");
        assert.ok(/\d+/.test(sent_data.queueTime), "queueTime is invalid. " + sent_data.queueTime);
    });
});

