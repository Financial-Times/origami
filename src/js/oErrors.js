'use strict';

var Logger = require('./logger');

function Errors(raven, options) {
	this.ravenClient = raven;
	this.initialised = false;


	options = options || this._initialiseDeclaratively();

	if (!options.sentryEndpoint) {
		throw new Error('Could not initialise o-errors: Sentry endpoint configuration missing.');
	}

	this.logger = new Logger(10, options.logLevel);

	var sentryEndpoint = options.sentryEndpoint;
	var shouldSendError = this._shouldSendError.bind(this);
	var updatePayloadBeforeSend = this._updatePayloadBeforeSend.bind(this);

	var ravenOptions = {
		shouldSendCallback: shouldSendError,
		dataCallback: updatePayloadBeforeSend
	};

	if (options.siteVersion) {
		ravenOptions.release = options.siteVersion;
	}


	this.ravenClient.config(sentryEndpoint, ravenOptions);
	this.ravenClient.install();

	this._logEventHandler = this.handleLogEvent.bind(this);

	document.addEventListener('oErrors.log', this._logEventHandler);
}

/**
 * Report an error to the error aggregator.
 *
 * @example Promises
 *
 * fetch('example.com').then(doSomething).catch(oErrors.error);
 *
 * @example Rethrowing Errors
 *
 * try {
 *   doSomething();
 * } catch(e) {
 *   throw oErrors.error(e);
 * }
 *
 * @param error   {Error}  - The error to report
 * @param context {Object} - Additional contextual information for the error.
 * @return {Error} Return the original 'error' argument
 */
Errors.prototype.error = function(error, context) {
	this.report(error, context);
	return error;
};

/**
 * Log a 'WARN' level log.  Intended to have the same semantics as
 * console.warn.
 * This stores the log in memory and will attach the last `n` log lines to the
 * context of the error.
 *
 * @param warnMessage {String} - The message to log.
 * @return undefined
 */
Errors.prototype.warn = function(warnMessage) {
	this.logger.warn(warnMessage);
};

/**
 * Log a 'LOG' level log.  Intended to have the same semantics as console.log.
 * This stores the log in memory and will attach the last `n` log lines to the
 * context of the error.
 *
 * @param logMessage {String} - The message to log.
 * @return undefined
 */
Errors.prototype.log = function(logMessage) {
	this.logger.log(logMessage);
};


/**
 * Wrap a function so that any uncaught errors are caught and reported to the
 * error aggregator.
 *
 * If you want to attach additional contextual information to the error, see
 * `#wrapWithContext`.
 *
 * @param fn {Function} - The function to wrap.
 * @return {Function}
 */
Errors.prototype.wrap = function(fn) {
	return this.ravenClient.wrap(fn);
};

/**
 * Wrap a function so that any uncaught errors are caught and reported to the error
 * aggregator.
 * This method allows additional context to be attached to the error if it
 * occurs.
 *
 * @example setTimeout
 *
 * setTimeout(oErrors.wrap({ "context:url": "example.com" }, doSomethingCallback), 1000);
 *
 * @param context {Object}    - Additional context to report along with the error
 *                              if the function `fn` throws an Error.
 * @param fn      {Function}  - The function to wrap
 * @return {Function}
 */
Errors.prototype.wrapWithContext = function(context, fn) {
	return this.ravenClient.wrap(context, fn);
};

/**
 * Report an Error object to the error aggregator.
 *
 * @param error  {Error}   - The error object to report.
 * @param context {Object} - Optional context to attach to the Error in the
 *                           aggregator
 * @return undefined
 */
Errors.prototype.report = function(error, options) {
	this.ravenClient.captureMessage(error, options);
};


Errors.prototype.destroy = function() {
	document.removeEventListener('oErrors.log', this._logEventHandler);
	this.ravenClient.uninstall();
};

Errors.prototype.handleLogEvent = function(ev) {
	this.report(ev.detail.error, ev.detail.info);
};

Errors.prototype._shouldSendError = function(data) {
	return true;
};

Errors.prototype._updatePayloadBeforeSend = function(data) {
	if (this.logger.enabled) {
		data.extra["context:log"] = this.logger.rollUp();
	}
	return data;
};

Errors.prototype._initialiseDeclaratively = function() {
	var sentryEndpointLink = document.querySelector('link[rel="oErrors:sentryEndpoint"]');
	var siteVersionMeta    = document.querySelector('meta[name="oErrors:siteVersion"]');
	var enableLogging      = document.querySelector('meta[name="oErrors:enableLogging"]');

	var options = {};
	if (sentryEndpointLink) {
		options.sentryEndpoint = sentryEndpointLink.href;
	}

	if (siteVersionMeta) {
		options.siteVersion = siteVersionMeta.content;
	}

	if (enableLogging) {
		options.enableLogging = siteVersionMeta.content === "true";
	}

	return options;
};

// Given the simple circular buffer, roll up all of the previously logged
// events into a string, ready to be attached to an error's context

module.exports = {
	Errors: Errors,
	init: function(options) {

		// Because Raven is a third party client, we can't be sure what it is doing when
		// we include it.  To control the initialisation of the third party code
		// we inlcude it only at init time
		// NOTE: It is not initialised in the constructor so that we can
		// inject a mock for testing.  Raven JS is very stateful and sets up a
		// Singleton
		var raven = require('raven-js');
		return new Errors(raven, options);
	}
};
