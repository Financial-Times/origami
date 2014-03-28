/*global require, describe, it, before, after, sinon */

var assert = require("assert"),
    data = require("../src/javascript/data.js");

describe('data', function () {
    "use strict";

    var server;

    before(function () {
        require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
        (new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
        require("../src/javascript/core/send").init(); // Init the sender.
        require("../src/javascript/core").setClickID('clickID'); // Fix the click ID to stop it generating one.
        require("../src/javascript/core/settings").set('config', { 'userID': 'userID' }); // Set the userID.

        server = sinon.fakeServer.create(); // Catch AJAX requests
    });

    after(function () {
        server.restore();
    });

    it('should track data', function () {
        server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

        var callback = sinon.spy(),
            sent_data;

        data({
            hurdle: "h1"
        }, callback);

        server.respond();

        sent_data = callback.getCall(0).thisValue;

        assert.deepEqual(Object.keys(sent_data), ["userID", "clickID", "requestID", "counter", "type", "hurdle", "queueTime"]);
        assert.equal(sent_data.clickID, "clickID");
        assert.ok(/\d+\.\d+\.\d+\.\d+\.[\-\w]+/.test(sent_data.requestID), "RequestID is invalid. " + sent_data.requestID);
        assert.equal(sent_data.userID, "userID");
        assert.equal(sent_data.counter, 1);
        assert.equal(sent_data.type, "data");
        assert.equal(sent_data.hurdle, "h1");
        assert.ok(/\d+/.test(sent_data.queueTime), "queueTime is invalid. " + sent_data.queueTime);
    });

});

