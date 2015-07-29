/* global afterEach, beforeEach, describe, it */
'use strict';
var Errors  = require('../src/js/oErrors');
var expect = require('expect.js');

describe("oErrors", function() {
	var mockRavenClient = null;
	var errors = null;

	beforeEach(function() {
		mockRavenClient = mockRaven();
		errors = new Errors().init({
			sentryEndpoint: "//123@app.getsentry.com/123"
		}, mockRavenClient);
	});

	afterEach(function() {
		errors.destroy();
		errors = null;
	});

	describe("#init(raven, options)", function() {
		it("should throw an exception if the sentryEndpoint option is missing", function() {
			expect(function() {
				new Errors().init({
				}, mockRavenClient);
			}).to.throwException();
		});


		it("should configure the raven client with the release version if the siteVersion option is configured", function() {
			new Errors().init({
				siteVersion: "v1.0.0",
				sentryEndpoint: "//app.getsentry.com/123"
			}, mockRavenClient);

			expect(mockRavenClient.configOptions.release).to.equal("v1.0.0");
		});

		it("should configure the raven client with tags if the tags option is configured", function() {
			new Errors().init({
				tags: {
					appName: "o-errors"
				},
				sentryEndpoint: "//app.getsentry.com/123"
			}, mockRavenClient);

			expect(mockRavenClient.configOptions.tags).to.be.an('object');
			expect(mockRavenClient.configOptions.tags).to.include.keys('appName');
		});

		it("should configure the log level according the the logLevel option", function() {
			var errors = new Errors().init({
				sentryEndpoint: "//app.getsentry.com/123",
				logLevel: "contextonly"
			}, mockRavenClient);

			expect(errors.logger._logLevel).to.be(1);
		});

		it("should configure itself from the DOM if no options are present", function() {
			var sentryConfiguration = document.createElement("script");
			sentryConfiguration.type = "application/json";
			sentryConfiguration.dataset.oErrorsConfig = "true";
			sentryConfiguration.innerText = JSON.stringify({
				logLevel: "contextonly",
				sentryEndpoint: "http://abc@app.getsentry.com/appid"
			});

			document.head.appendChild(sentryConfiguration);

			var errors = new Errors().init(null, mockRavenClient);

			expect(mockRavenClient.configuredEndpoint).to.eql("http://abc@app.getsentry.com/appid");
			expect(errors.logger._logLevel).to.eql(1);

			document.head.removeChild(sentryConfiguration);
		});

		it("should create no-operation methods if options.enabled is `false`", function() {
			var errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: false
			}, mockRavenClient);

			// This is a horrible hacky way to check the function is a noop
			expect(errors.report.toString()).to.be("function (error) { return error; }");
			expect(errors.wrapWithContext.toString()).to.be("function (fn) { return fn; }");

		});

		it("should be enabled by default if options.enabled is undefined", function() {
			var errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly"
			}, mockRavenClient);


			// This is a horrible hacky way to check the function is a noop
			expect(errors.report.toString()).to.not.be("function () {}");
			expect(errors.wrapWithContext.toString()).to.not.be("function () {}");
		});

		it("should be enabled if options.enabled is `true`", function() {
			var errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true
			}, mockRavenClient);


			// This is a horrible hacky way to check the function is a noop
			expect(errors.report.toString()).to.not.be("function () {}");
			expect(errors.wrapWithContext.toString()).to.not.be("function () {}");
		});

		it("should accept a function that can be used to return a boolean which is used to decide whether an error should be reported", function() {
			var errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true,
				filterError: function(data) {
					return data.error.shouldSend === true;
				}
			}, mockRavenClient);

			errors.report({ shouldSend: false });
			expect(mockRavenClient.lastCaptureMessageArgs[0]).to.be(undefined);
			errors.report({ shouldSend: true });
			expect(mockRavenClient.lastCaptureMessageArgs[0].shouldSend).to.be(true);
		});

		it("should accept a function that can be used to transform error data and add additional contextual information", function() {
			var errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true,
				transformError: function(data) {
					data.error.test = "hello";
					data.context.test = "world";
					return data;
				}
			}, mockRavenClient);

			errors.report({ message: "Something failed" });
			expect(mockRavenClient.lastCaptureMessageArgs[0].test).to.be("hello");
			expect(mockRavenClient.lastCaptureMessageArgs[1].test).to.be("world");

		});
	});

	describe("#wrapWithContext(context, function)", function() {
		it("should call Raven.captureException with context when given function throws an exception", function(done) {
			var fn = function() {
				throw new Error("Test");
			};

			mockRavenClient.captureException = function(error, context) {
				expect(error).to.be.an(Error);
				expect(error.message).to.be("Test");
				expect(context).to.be.an('object');
				expect(context.context).to.equal('object');
				done();
			};

			try {
				var wrappedFunction = errors.wrapWithContext({ context: "object" }, fn);
				wrappedFunction();
			} catch(e) {
				// Ignore in this test
			}
		});

		it("should return a function", function() {
			var fn = function() {};
			var wrappedFunction = errors.wrapWithContext({ context: "object" }, fn);
			expect(wrappedFunction).to.be.a('function');
		});
	});

	describe("#wrap(function)", function() {
		it("should call Raven.captureException with a context argument containing the error message", function(done) {
			var fn = function() {
				throw new Error("Test");
			};

			var wrappedFunction = errors.wrap(fn);

			mockRavenClient.captureException = function(error, context) {
				expect(error).to.be.an(Error);
				expect(error.message).to.be("Test");
				expect(context).to.eql({ errormessage: "Test" });
				done();
			};

			wrappedFunction();

		});

		it("should return a function", function() {
			var fn = function() {};
			var wrappedFunction = errors.wrap(fn);
			expect(wrappedFunction).to.be.a('function');
		});
	});

	describe("#report(e, context)", function() {
		it("should return the original error", function() {
			var error = errors.report(new Error("Test"));
			expect(error.message).to.eql("Test");
		});
	});

	describe("#_getEventPath(ev)", function() {
		it("should return an array containing the elements the event propagated through", function(done) {
			var topLevelDiv = document.createElement("div");
			var firstLevelDiv = document.createElement("div");

			function onClick(ev) {
				var path = errors._getEventPath(ev);
				expect(path[0]).to.be(firstLevelDiv);
				expect(path[1]).to.be(topLevelDiv);

				done();
			}

			topLevelDiv.appendChild(firstLevelDiv);
			topLevelDiv.addEventListener('click', onClick);

			document.body.appendChild(topLevelDiv);

			var ev = document.createEvent("MouseEvents");
			ev.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			firstLevelDiv.dispatchEvent(ev);
		});
	});

	describe("#_updatePayloadBeforeSend(data)", function() {
		it("should add extra log data to the argument if logging is enabled", function() {
			var errors = new Errors().init({
				sentryEndpoint: "http://app.getsentry.com/123",
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
				sentryEndpoint: "http://app.getsentry.com/123",
				logLevel: "off"
			}, mockRavenClient);

			errors.log("This is a LOG line");
			errors.warn("This is a WARN line");

			var data = { extra: {} };
			var modifiedData = errors._updatePayloadBeforeSend(data);
			expect(modifiedData.extra["context:log"]).to.equal(undefined);
		});
	});

	describe("#report(error, context)", function() {
		it("should buffer any errors reported before the module has been initialised", function(done) {
			var errors = new Errors();

			errors.report(new Error("My test error"), { additional: "info" });

			mockRavenClient.captureException = function(error, context) {
				expect(error).to.be.an(Error);
				expect(error.message).to.be("My test error");
				expect(context).to.be.an('object');
				expect(context.additional).to.equal('info');
				done();
			};

			errors.init({
				sentryEndpoint: "http://app.getsentry.com/123",
			}, mockRavenClient);
		});
	});

	it("should report errors on oErrors.log event", function(done) {
		mockRavenClient.captureException = function(error, context) {
			expect(error).to.be.an(Error);
			expect(context).to.be.an('object');
			expect(context.info.additional).to.equal('info');
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
		captureException: function() {
			var data = { error: arguments[0], context: arguments[1]  };

			if (this.configOptions.updatePayloadBeforeSend) {
				var transformedData = this.configOptions.updatePayoadBeforeSend(data);
				if (transformedData) {
					data = transformedData;
				}
			}

			if (this.configOptions.shouldSendCallback && !this.configOptions.shouldSendCallback(data)) {
				return;
			}

			this.lastCaptureMessageArgs = arguments;
		}
	};
}
