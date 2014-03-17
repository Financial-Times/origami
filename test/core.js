/*global require, describe, it */
var assert = require('assert'),
    Send = require("../src/javascript/core.js");

describe('Core', function () {
    "use strict";

    describe('clickID', function () {
        it('should generate a clickID', function () {
            var clickID = Send.clickID(),
                re = /t\d{13}h\d/;
            assert.ok(clickID.match(re), "'" + clickID + "'.match(" + re + ")");
        });

        it('should use the clickID given it', function () {
            assert.equal(Send.clickID("myClickID"), "myClickID");
        });
    });

    // TODO Sending requests.
});

