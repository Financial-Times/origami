/* eslint-env mocha */

import Errors from '../src/js/oErrors';

import proclaim from 'proclaim';

describe("oErrors", function() {
	let mockRavenClient = null;
	let errors = null;

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
			proclaim.throws(function() {
				new Errors().init({
				}, mockRavenClient);
			});
		});


		it("should configure the raven client with the release version if the siteVersion option is configured", function() {
			new Errors().init({
				siteVersion: "v1.0.0",
				sentryEndpoint: "//app.getsentry.com/123"
			}, mockRavenClient);

			proclaim.equal(mockRavenClient.configOptions.release, "v1.0.0");
		});

		it("should configure the raven client with the environment if the environment option is configured", function() {
			new Errors().init({
				environment: "test",
				sentryEndpoint: "//app.getsentry.com/123"
			}, mockRavenClient);

			proclaim.equal(mockRavenClient.configOptions.environment, "test");
		});

		it("should configure the raven client with tags if the tags option is configured", function() {
			new Errors().init({
				tags: {
					appName: "o-errors"
				},
				sentryEndpoint: "//app.getsentry.com/123"
			}, mockRavenClient);

			proclaim.isTypeOf(mockRavenClient.configOptions.tags, 'object');
			proclaim.ok(mockRavenClient.configOptions.tags.appName);
		});

		it("should configure the log level according the the logLevel option", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//app.getsentry.com/123",
				logLevel: "contextonly"
			}, mockRavenClient);

			proclaim.equal(errors.logger._logLevel, 1);
		});

		it("should not configure the raven client if the log level is consoleonly", function() {
			mockRavenClient.configuredEndpoint = "";
			mockRavenClient.installed = false;
			new Errors().init({
				sentryEndpoint: "//app.getsentry.com/123",
				logLevel: "consoleonly"
			}, mockRavenClient);

			proclaim.equal(mockRavenClient.configuredEndpoint, "");
			proclaim.equal(mockRavenClient.installed, "");
		});

		it("should not call raven client methods if configured to the consoleonly log level", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//app.getsentry.com/123",
				logLevel: "consoleonly"
			}, mockRavenClient);

			errors.report({ message: "Something failed" });
			proclaim.isUndefined(mockRavenClient.lastCaptureMessageArgs[0]);
		});

		it("should configure itself from the DOM if no options are present", function() {
			const sentryConfiguration = document.createElement("script");
			sentryConfiguration.type = "application/json";
			sentryConfiguration.dataset.oErrorsConfig = "true";
			sentryConfiguration.innerText = JSON.stringify({
				logLevel: "contextonly",
				sentryEndpoint: "http://abc@app.getsentry.com/appid"
			});

			document.head.appendChild(sentryConfiguration);

			const errors = new Errors().init(null, mockRavenClient);

			proclaim.equal(mockRavenClient.configuredEndpoint, "http://abc@app.getsentry.com/appid");
			proclaim.equal(errors.logger._logLevel, 1);

			document.head.removeChild(sentryConfiguration);
		});

		it("should create no-operation methods if options.enabled is `false`", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: false
			}, mockRavenClient);

			// This is a horrible hacky way to check the function is a noop
			proclaim.equal(errors.report(10), 10);
			proclaim.equal(errors.wrapWithContext({}, 10), 10);

		});

		it("should be enabled by default if options.enabled is undefined", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly"
			}, mockRavenClient);


			// This is a horrible hacky way to check the function is a noop
			proclaim.notEqual(errors.report.toString(), "function () {}");
			proclaim.notEqual(errors.wrapWithContext.toString(), "function () {}");
		});

		it("should be enabled if options.enabled is `true`", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true
			}, mockRavenClient);


			// This is a horrible hacky way to check the function is a noop
			proclaim.notEqual(errors.report.toString(), "function () {}");
			proclaim.notEqual(errors.wrapWithContext.toString(), "function () {}");
		});

		it("should accept a function that can be used to return a boolean which is used to decide whether an error should be reported", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true,
				filterError: function(data) {
					return data.error.shouldSend === true;
				}
			}, mockRavenClient);

			errors.report({ shouldSend: false });
			proclaim.isUndefined(mockRavenClient.lastCaptureMessageArgs[0]);
			errors.report({ shouldSend: true });
			proclaim.isTrue(mockRavenClient.lastCaptureMessageArgs[0].shouldSend);
		});

		it("should accept a function that can be used to transform error data and add additional contextual information", function() {
			const errors = new Errors().init({
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
			proclaim.equal(mockRavenClient.lastCaptureMessageArgs[0].test, "hello");
			proclaim.equal(mockRavenClient.lastCaptureMessageArgs[1].test, "world");
		});

		it("should return the orignal error when transform error does not return an error object", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true,
				transformError: function() {
					// Return malformed error object
					return {};
				}
			}, mockRavenClient);

			errors.report({ message: "Something failed" });
			proclaim.equal(mockRavenClient.lastCaptureMessageArgs[0].message, 'Something failed');
		});

		it("should accept an Array of existing error events that will be added to the internal error buffer", function(done) {
			mockRavenClient.captureException = function(error, context) {
				proclaim.isInstanceOf(error, Error);
				proclaim.equal(error.message, "My test error");
				proclaim.isTypeOf(context, 'object');
				done();
			};

			new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true,
				errorBuffer: [{ error: new Error("My test error")}]
			}, mockRavenClient);
		});

		it("should still report the error and context if the tranformError function does not return a value", function() {
			const errors = new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				enabled: true,
				transformError: function(data) {
					data.error.test = "hello";
					data.context.test = "world";
				}
			}, mockRavenClient);

			errors.report({ message: "Something failed" });
			proclaim.equal(mockRavenClient.lastCaptureMessageArgs[0].test, "hello");
			proclaim.equal(mockRavenClient.lastCaptureMessageArgs[1].test, "world");
		});

		it("should accept a function that overrides Sentry's data transport handler", function() {
			new Errors().init({
				sentryEndpoint: "//123@app.getsentry.com/123",
				logLevel: "contextonly",
				transportFunction: function() {}
			}, mockRavenClient);

			proclaim.isTypeOf(mockRavenClient.configOptions.transport, "function");
		});
	});

	describe("#wrapWithContext(context, function)", function() {
		it("should call Raven.captureException with context when given function throws an exception", function(done) {
			const fn = function() {
				throw new Error("Test");
			};

			mockRavenClient.captureException = function(error, context) {
				proclaim.isInstanceOf(error, Error);
				proclaim.equal(error.message, "Test");
				proclaim.isTypeOf(context, 'object');
				proclaim.equal(context.extra.context, 'object');
				done();
			};

			try {
				const wrappedFunction = errors.wrapWithContext({ context: "object" }, fn);
				wrappedFunction();
			} catch(e) {
				// Ignore in this test
			}
		});

		it("should return a function", function() {
			const fn = function() {};
			const wrappedFunction = errors.wrapWithContext({ context: "object" }, fn);
			proclaim.isTypeOf(wrappedFunction, 'function');
		});
	});

	describe("#wrap(function)", function() {
		it("should call Raven.captureException with a context argument containing the error message", function(done) {
			const fn = function() {
				throw new Error("Test");
			};

			const wrappedFunction = errors.wrap(fn);

			mockRavenClient.captureException = function(error, context) {
				proclaim.isInstanceOf(error, Error);
				proclaim.equal(error.message, "Test");
				proclaim.deepEqual(context, { errormessage: "Test", extra: {} });
				done();
			};

			wrappedFunction();

		});

		it("should return a function", function() {
			const fn = function() {};
			const wrappedFunction = errors.wrap(fn);
			proclaim.isTypeOf(wrappedFunction, 'function');
		});
	});

	describe("#report(e, context)", function() {
		it("should return the original error", function() {
			const error = errors.report(new Error("Test"));
			proclaim.equal(error.message, "Test");
		});
	});

	describe("#_getEventPath(ev)", function() {
		it("should return an array containing the elements the event propagated through", function(done) {
			const topLevelDiv = document.createElement("div");
			const firstLevelDiv = document.createElement("div");

			function onClick(ev) {
				const path = errors._getEventPath(ev);
				proclaim.deepEqual(path[0], firstLevelDiv);
				proclaim.deepEqual(path[1], topLevelDiv);
				proclaim.deepEqual(path[2], document.body);
				proclaim.deepEqual(path[3], document.documentElement);
				proclaim.isUndefined(path[4], undefined);

				done();
			}

			topLevelDiv.appendChild(firstLevelDiv);
			topLevelDiv.addEventListener('click', onClick);

			document.body.appendChild(topLevelDiv);

			const ev = document.createEvent("MouseEvents");
			ev.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
			firstLevelDiv.dispatchEvent(ev);
		});
	});

	describe("#_updatePayloadBeforeSend(data)", function() {
		it("should add extra log data to the argument if logging is enabled", function() {
			const errors = new Errors().init({
				sentryEndpoint: "http://app.getsentry.com/123",
				logLevel: "contextonly"
			}, mockRavenClient);

			errors.log("This is a LOG line");
			errors.warn("This is a WARN line");

			const data = { extra: {} };

			const modifiedData = errors._updatePayloadBeforeSend(data);

			proclaim.equal(modifiedData.extra["context:log"], "LOG: This is a LOG line\nWARN: This is a WARN line");
		});

		it("should not add extra log data to the argument if logging is disabled", function() {
			const errors = new Errors().init({
				sentryEndpoint: "http://app.getsentry.com/123",
				logLevel: "off"
			}, mockRavenClient);

			errors.log("This is a LOG line");
			errors.warn("This is a WARN line");

			const data = { extra: {} };
			const modifiedData = errors._updatePayloadBeforeSend(data);
			proclaim.isUndefined(modifiedData.extra["context:log"], undefined);
		});
	});

	describe("#report(error, context)", function() {
		it("should buffer any errors reported before the module has been initialised", function(done) {
			const errors = new Errors();

			mockRavenClient.captureException = function(error, context) {
				proclaim.isInstanceOf(error, Error);
				proclaim.equal(error.message, "My test error");
				proclaim.isTypeOf(context, 'object');
				proclaim.equal(context.extra.additional, 'info');
				done();
			};

			errors.init({
				sentryEndpoint: "http://app.getsentry.com/123",
			}, mockRavenClient);

			errors.report(new Error("My test error"), { additional: "info" });
		});
	});

	it("should report errors on oErrors.log event", function(done) {
		mockRavenClient.captureException = function(error, context) {
			proclaim.isInstanceOf(error, Error);
			proclaim.isTypeOf(context, 'object');
			proclaim.equal(context.extra.info.additional, 'info');
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
			let context = arguments[0];
			let func = arguments[1];

			if (func === undefined) {
				func = context;
				context = {};
			}
			return func;
		},
		captureException: function() {
			let data = { error: arguments[0], context: arguments[1] };

			if (this.configOptions.updatePayloadBeforeSend) {
				const transformedData = this.configOptions.updatePayoadBeforeSend(data);
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
