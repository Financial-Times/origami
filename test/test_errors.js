var oErrors = require('../main');
var expect = require('expect.js');

// Create a global 'window' object (allows testing in node and browsers)
if (!global.window) {
	global.window = {};
}

describe("oErrors", function() {
	describe("#init(options)", function() {
		it("should throw an exception when not initialised with options.sentryEndpoint", function() {
			expect(function() {
				oErrors.init({});
			}).to.throwError();
		});

		it("should update the window.onerror method", function() {
			window.onerror = false;
			oErrors.init({
				sentryEndpoint: "https://a@getsentry.com/b"
			});

			expect(window.onerror).to.be.a('function');
		});
	});
});
