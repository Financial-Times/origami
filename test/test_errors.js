'use strict';
var oErrors = require('../main');
var expect = require('expect.js');

// Create a global 'window' object (allows testing in node and browsers)
if (!global.window) {
	global.window = {};
}

describe("oErrors", function() {
	before(function() {
		oErrors.init({
			sentryEndpoint: "https://a@getsentry.com/b"
		});

		expect(window.onerror).to.be.a('function');
	});

	it("should report errors on oErrors.log event", function(done) {
		expect(oErrors.initialised).to.equal(true);

		var oldReport = oErrors.report;

		oErrors.report = function(e, info) {
			expect(e).to.be.an(Error);
			expect(info).to.be.an('object');
			expect(info.additional).to.equal('info');
			oErrors.report = oldReport;
			done();
		};

		document.dispatchEvent(new CustomEvent("oErrors.log", {
			"detail": {
				error: new Error("My custom error"),
				info: { "additional": "info" }
			}
		}));
	});
});
