'use strict';
var Errors  = require('../src/js/oErrors');
var expect = require('expect.js');

describe("oErrors", function() {
	var mockRavenClient = null;
	var errors = null;

	before(function() {
		mockRavenClient = mockRaven();
		errors = new Errors().init({ sentryEndpoint: "testendpoint" }, mockRavenClient);
	});

	after(function() {
		errors.destroy();
		errors = null;
	});

	describe("#init(raven, options)", function() {
		it("should throw an exception if the sentryEndpoint option is missing", function() {
			expect(function() {
				new Errors().init({}, mockRavenClient);
			}).to.throwException();
		});

		it("should configure the raven client with the sentryEndpoint configuration option", function() {
			var errors = new Errors().init({
				sentryEndpoint: "sentryendpoint"
			}, mockRavenClient);

			expect(mockRavenClient.configuredEndpoint).to.equal("sentryendpoint");
		});

		it("should configure the raven client with the release version if the siteVersion option is configured", function() {
			var errors = new Errors().init({
				siteVersion: "v1.0.0",
				sentryEndpoint: "test"
			}, mockRavenClient);

			expect(mockRavenClient.configOptions.release).to.equal("v1.0.0");
		});

		it("should configure the log level according the the logLevel option", function() {
			var errors = new Errors().init({
				sentryEndpoint: "test",
				logLevel: "contextonly"
			}, mockRavenClient);

			expect(errors.logger._logLevel).to.be(1);
		});

		it("should configure itself from the DOM if no options are present", function() {
			var sentryEndpointLink = document.createElement("link");
			sentryEndpointLink.rel = 'oErrors:sentryEndpoint';
			sentryEndpointLink.href = 'http://dsn@app.getsentry.com/appid';

			var logLevel = document.createElement("meta");
			logLevel.name = "oErrors:logLevel";
			logLevel.content = "contextonly";

			document.head.appendChild(sentryEndpointLink);
			document.head.appendChild(logLevel);

			var errors = new Errors().init(null, mockRavenClient);

			expect(mockRavenClient.configuredEndpoint).to.eql("http://dsn@app.getsentry.com/appid");
			expect(errors.logger._logLevel).to.eql(1);

			document.head.removeChild(sentryEndpointLink);
			document.head.removeChild(logLevel);
		});
	});

	describe("#wrapWithContext(context, function)", function() {
		it("should call Raven.wrap with context and function arguments", function() {
			var fn = function() {};
			errors.wrapWithContext({ context: "object" }, fn);

			expect(mockRavenClient.lastWrapArgs[0]).to.eql({ context: "object" });
			expect(mockRavenClient.lastWrapArgs[1]).to.eql(fn);
		});

		it("should return a function", function() {
			var fn = function() {};
			var wrappedFunction = errors.wrapWithContext({ context: "object" }, fn);
			expect(wrappedFunction).to.be.a('function');
		});
	});

	describe("#wrap(function)", function() {
		it("should call Raven.wrap with only a function argument", function() {
			var fn = function() {};
			errors.wrap(fn);
			expect(mockRavenClient.lastWrapArgs[0]).to.eql(fn);
		});

		it("should return a function", function() {
			var fn = function() {};
			var wrappedFunction = errors.wrap(fn);
			expect(wrappedFunction).to.be.a('function');
		});
	});

	describe("#_updatePayloadBeforeSend(data)", function() {
		it("should add extra log data to the argument if logging is enabled", function() {
			var errors = new Errors().init({
				sentryEndpoint: "test",
				logLevel: "contextonly"
			}, mockRavenClient);

			errors.log("This is a LOG line");
			errors.warn("This is a WARN line");

			var data = { extra: {} };

			var modifiedData = errors._updatePayloadBeforeSend(data);

			expect(modifiedData.extra["context:log"]).to.eql("LOG: This is a LOG line\nWARN: This is a WARN line");
		});

		it("should not add extra log data to the argument if logging is disabled", function() {
			var errors = new Errors().init({
				sentryEndpoint: "test",
				logLevel: "off"
			}, mockRavenClient);

			errors.log("This is a LOG line");
			errors.warn("This is a WARN line");

			var data = { extra: {} };
			var modifiedData = errors._updatePayloadBeforeSend(data);
			expect(modifiedData.extra["context:log"]).to.equal(undefined);
		});
	});

	it("should report errors on oErrors.log event", function(done) {
		mockRavenClient.captureMessage = function(error, context) {
			expect(error).to.be.an(Error);
			expect(context).to.be.an('object');
			expect(context.additional).to.equal('info');
			done();
		};

		document.dispatchEvent(new CustomEvent("oErrors.log", {
			bubbles: true,
			"detail": {
				error: new Error("My custom error"),
				info: { "additional": "info" }
			}
		}));
	});
});

function mockRaven() {
	return {
		configOptions: {},
		configuredEndpoint: "",
		installed: false,
		lastWrapArgs: [],
		lastCaptureMessageArgs: [],
		config: function(endpoint, options) {
			this.configOptions = options;
			this.configuredEndpoint = endpoint;
			return this;
		},
		install: function() {
			this.installed = true;
		},
		uninstall: function() {},
		wrap: function() {
			this.lastWrapArgs = arguments;
			var context = arguments[0];
			var func = arguments[1];

			if (func === undefined) {
				func = context;
				context = {};
			}
			return func;
		},
		captureMessage: function() {
			this.lastCaptureMessageArgs = arguments;
		}
	};
}
