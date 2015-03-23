'use strict';

function Errors() {
	// Because Raven is a third party client, we can't be sure what it is doing when
	// we include it.  To control the initialisation of the third party code
	// we inlcude it only at construction time
	this.ravenClient = require('raven-js');
	this.initialised = false;

	// Keep an internal buffer of log messages, this can then be used as
	// additional context when reporting error message
	var logLength = 10;
	this._nextLogIndex = 0;
	this._logList = new Array(logLength);

	this._isLoggingEnabled = false;
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
	this._appendToLogList("WARN: " + warnMessage);
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
	this._appendToLogList("LOG: " + logMessage);
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

/**
 * Initialise oErrors.
 *
 * @param options {Object}
 * @param options.sentryEndpoint        {String}  - The DSN (see the Sentry documentation) for the application configured in Sentry.
 * @param [options.siteVersion]         {String}  - Optional parameter, tag every error with a version representing the version of the application reporting errors.
 * @param [options.enableLogging=false] {Boolean} - Optional parameter, if this is false, the log methods are converted to no-operations and oErrors logging is disabled.
 * @return undefined
 */
Errors.prototype.init = function(options) {
	if (this.initialised) {
		throw new Error('Unable to reconfigure error tracking.  This can only be configured once');
	}

	options = options || this._initialiseDeclaratively();

	if (!options.sentryEndpoint) {
		throw new Error('Could not initialise o-errors: Sentry endpoint configuration missing.');
	}

	if (options.enableLogging === undefined) {
		options.enableLogging = false;
	}

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

	if (!options.enableLogging) {
		this.log = function() {};
		this.warn = function() {};
	}

	this._isLoggingEnabled = options.enableLogging;

	this.ravenClient.config(sentryEndpoint, ravenOptions);
	this.ravenClient.install();

	document.addEventListener('oErrors.log', this.handleLogEvent.bind(this));
	this.initialised = true;
};


Errors.prototype.destroy = function() {
	document.removeEventListener('oErrors.log', this.handleLogEvent.bind(this));
	this.ravenClient.uninstall();
};

Errors.prototype.handleLogEvent = function(ev) {
	this.report(ev.detail.error, ev.detail.info);
};

Errors.prototype._shouldSendError = function(data) {
	return true;
};

Errors.prototype._updatePayloadBeforeSend = function(data) {
	if (this._isLoggingEnabled) {
		data.extra["context:log"] = rollUpLogs(this._logList, this._nextLogIndex);
	}
	return data;
};

Errors.prototype._appendToLogList = function(logMessage) {
	this._logList[this._nextLogIndex] = logMessage;

	// Really simple Ring buffer implementation (keep track of next insertion
	// location)
	this._nextLogIndex++;
	if (this._nextLogIndex === this._logList.length) {
		this._nextLogIndex = 0;
	}
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
		options.enableLogging = siteVersionMeta === "true";
	}

	return options;
};

// Given the simple circular buffer, roll up all of the previously logged
// events into a string, ready to be attached to an error's context
function rollUpLogs(logs, nextInsertionIndex) {
	var index = nextInsertionIndex;
	var rolledUpLogs = [];

	do {
		if (index >= logs.length) {
			index = 0;
		}

		var logEntry = logs[index];
		if (logEntry !== undefined) {
			rolledUpLogs.push(logs[index]);
		}
		index++;

	} while (index != nextInsertionIndex);

	return rolledUpLogs.join("\n");
}

module.exports = new Errors();
