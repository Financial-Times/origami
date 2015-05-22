/*global require, describe, it, before, after, sinon */

var assert = require("assert"),

    track_event = require("../src/javascript/event.js");

describe('event', function () {
    "use strict";

    var server, userID;

    before(function () {
        require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
        (new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
        require("../src/javascript/core/send").init(); // Init the sender.
        //require("../src/javascript/core").setRootID('rootID'); // Fix the click ID to stop it generating one.
        userID = require("../src/javascript/core/user").init(); // Init the user identifier.

        server = sinon.fakeServer.create(); // Catch AJAX requests
    });

    after(function () {
        server.restore();
    });

    it('should track an event', function () {
        server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);

        var callback = sinon.spy(),
            sent_data;

        track_event('slideshow', 'slide_viewed', 'slide_number', '5', callback);

        server.respond();

        assert.ok(callback.called, 'Callback not called.');

        sent_data = callback.getCall(0).thisValue;

        // Basics
        assert.deepEqual(Object.keys(sent_data), ["tag", "id", "user", "device", "event"]);

        // Type
        assert.equal(sent_data.tag.type, "event");

        // Event
        assert.equal(sent_data.event.category, "slideshow");
        assert.equal(sent_data.event.action, "slide_viewed");
        assert.equal(sent_data.event.key, "slide_number");
        assert.equal(sent_data.event.value, "5");
    });


});

