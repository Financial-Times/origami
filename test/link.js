/*TODO global require, describe, it, before, after, sinon */

/*
var assert = require("assert"),
    link = require("../src/javascript/link.js");

describe('data', function () {
    "use strict";

    var server;

    before(function () {
        require("../src/javascript/core/settings").set('internalCounter', 0); // Fix the internal counter incase other tests have just run.
        (new (require("../src/javascript/core/queue"))('requests')).replace([]);  // Empty the queue as PhantomJS doesn't always start fresh.
        require("../src/javascript/core/send").init(); // Init the sender.
        require("../src/javascript/core").clickID('clickID'); // Fix the click ID to stop it generating one.

        server = sinon.fakeServer.create(); // Catch AJAX requests
    });

    after(function () {
        server.restore();
    });

    it('should track data', function () {
        server.respondWith([200, { "Content-Type": "plain/text", "Content-Length": 2 }, "OK"]);


         var callback = sinon.spy(),
         sent_data;

         link({
         hurdle: "h1"
         }, callback);

         server.respond();

         sent_data = callback.getCall(0).thisValue;

         // Can't ever match these in a test..
         delete sent_data.requestID;
         delete sent_data.queueTime;

         assert.deepEqual(sent_data, {"clickID": "clickID", "counter": 1, "environment": "test", "type": "data", "hurdle": "h1" });

    });

});
*/
