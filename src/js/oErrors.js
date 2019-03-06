import Logger from './logger';

function isFunction(fn) {
	return typeof fn === 'function';
}

function throwLater(error) {
	// Throw the error on the main event loop rather than in this
	// context so that the error can be surfaced to the developer
	// without halting the current context.
	setTimeout(function oErrorsError() {
		throw error;
	}, 0);
}

/**
 * @class Errors
 */
function Errors() {
	// Initialises raven client with noops for consoleonly logging level
	this.ravenClient = null;

	/**
	 * The initialised state of the object.
	 * @type {bool}
	 */
	this.initialised = false;

	this.logger = null;
	this._logEventHandler = this.handleLogEvent.bind(this);

	// While not initialised, any caught errors are buffered.
	this._errorBuffer = [];

	// Cache the declarative config String to avoid reading the DOM more than
	// once, once initialised, the reference to the string is released for GC.
	this._declarativeConfigString = false;

	// noop operations
	this._filterError = function() { return true; };
	this._transformError = function(data) { return data; };
}

/**
 * Initialises the Error object with a Raven dependency.
 *
 * All options are optional, if a configuration option is missing, the module
 * will try to initialise using any configuration found in the DOM using the
 * script config tag.
 *
 * @example
 * <!-- DOM configuration settings -->
 * <script type="application/json" data-o-errors-config>
 * {
 *   "sentryEndpoint": "https://dsn@app.getsentry.com/123"
 * }
 * </script>
 *
 * @param {Object} options                 - Optional, configuration options object
 * @param {string} options.sentryEndpoint  - Optional if configued via the DOM, Required if not, must be a valid {@link https://app.getsentry.com/docs/platforms/|Sentry DSN}.
 * @param {string} options.siteVersion     - Optional, optionally the version of the code the page is running. This tags each error with the code version
 * @param {string} options.environment     - Optional, track the environment name inside Sentry.
 * @param {string} options.logLevel        - Optional, see {@link Logger.level} for valid names
 * @param {boolean} options.disabled       - Optional, If `true`, disable o-errors reporting.
 * @param {Array} options.buffer           - Optional, pre-existing buffer of error events to flush.
 * @param {Object} raven                   - The Raven JS client object.
 * @returns {Errors}  - The Errors instance
 */
Errors.prototype.init = function(options, raven) {
	if (this.initialised) {
		return this;
	}

	const hasDeclarativeConfig = this._hasDeclarativeConfig();
	const configMissing = !(hasDeclarativeConfig || options);

	// In main.js an event listener is bound to 'o.DOMContentLoaded', this
	// calls 'init' without arguments with the intention of configuring from
	// the declarative config if it exists.  If the declarative markup doesn't
	// exist, we do nothing so that the consumer has the option of
	// configuring imperatively by calling `init` with options themselves.
	if (configMissing) {
		return this;
	}

	options = options || {};

	if (hasDeclarativeConfig) {
		options = this._initialiseDeclaratively(options);

		if (options.filterError) {
			options.filterError = undefined;
			throwLater(new Error("Can not configure 'oErrors' with `filterError` using declarative markup - error filtering will not be enabled"));
		}

		if (options.transformError) {
			options.transformError = undefined;
			throwLater(new Error("Can not configure 'oErrors' with `transformError` using declarative markup - error transforming will not be enabled"));
		}

		if (options.transportFunction) {
			options.transportFunction = undefined;
			throwLater(new Error("Can not configure 'oErrors' with `transportFunction` using declarative markup - overriding Sentry's transport function will not be enabled"));
		}
	}

	if (isFunction(options.transformError)) {
		this._transformError = options.transformError;
	}

	if (isFunction(options.filterError)) {
		this._filterError = options.filterError;
	}

	if (Array.isArray(options.errorBuffer) && options.errorBuffer.length > 0) {
		this._errorBuffer = this._errorBuffer.concat(options.errorBuffer);
	}

	// If errors is configured to be disabled, (options.disabled = true),
	// then stub this.report, turn off logging (which turns them into noops),
	// and return 'initialised' before installing raven.
	const isErrorsDisabled = options.enabled === undefined ? false : options.enabled === false;

	const logLevel = isErrorsDisabled ? Logger.off : options.logLevel;
	const defaultLogLength = 10;
	this.logger = new Logger(defaultLogLength, logLevel);

	if (isErrorsDisabled) {
		this.report = function(error) { return error; };
		this.wrapWithContext = function(context, fn) { return fn; };
		this.initialised = true;
		return this;
	}

	if (!options.sentryEndpoint) {
		throw new Error('Could not initialise o-errors: Sentry endpoint and auth configuration missing.');
	}

	// Only install Raven if not using console only logging level
	if (Logger.level[logLevel] !== Logger.level.consoleonly) {
		this._configureAndInstallRaven(options, raven);
	} else {
		this.ravenClient = {
			captureException: function(){},
			uninstall: function(){}
		};
	}

	document.addEventListener('oErrors.log', this._logEventHandler);

	this.initialised = true;

	this._flushBufferedErrors();
	return this;
};

Errors.prototype._configureAndInstallRaven = function(options, raven) {

	// To control the initialisation of the third party code (Raven)
	// we include it only at init time see "http://origami.ft.com/docs/syntax/js/#initialisation"
	//
	// It is optional so that it can be mocked in tests
	if (!(raven || this.ravenClient)) {
		raven = require('raven-js');
	}

	this.ravenClient = raven;

	const sentryEndpoint = options.sentryEndpoint;
	const updatePayloadBeforeSend = this._updatePayloadBeforeSend.bind(this);

	const ravenOptions = {
		dataCallback: updatePayloadBeforeSend
	};

	if (options.siteVersion) {
		ravenOptions.release = options.siteVersion;
	}

	if (options.environment) {
		ravenOptions.environment = options.environment;
	}

	if (options.tags) {
		ravenOptions.tags = options.tags;
	}

	if (isFunction(options.filterError)) {
		ravenOptions.shouldSendCallback = options.filterError;
	}

	if (isFunction(options.transportFunction)) {
		ravenOptions.transport = options.transportFunction;
	}

	this.ravenClient.config(sentryEndpoint, ravenOptions);
	this.ravenClient.install();
};

/**
 * Flush any errors that are buffered in `this._errorBuffer`.
 * @private
 *
 * @returns {undefined} - undefined
 */
Errors.prototype._flushBufferedErrors = function() {
	if (!this.initialised) {
		return;
	}

	const errors = this;
	this._errorBuffer.forEach(function(bufferedError) {
		errors.report(bufferedError.error, bufferedError.context);
	});

	// Clear the buffer, deleting references we hold to any buffered errors
	this._errorBuffer = [];
};

/**
 * Report an Error object to the error aggregator.

 * @example
 * // Reports a caught Error generated by the Promise
 * fetch('example.com').then(doSomething).catch(oErrors.report);
 *
 * @example
 * // Reports and re-throws the caught error
 * try {
 *   doSomething();
 * } catch(e) {
 *   throw oErrors.report(e);
 * }
 *
 * @param {Error}  error    - The error object to report.
 * @param {Object} context  - Optional context to attach to the Error in the
 *                            aggregator
 * @return {Error} - The passed in error
 */
Errors.prototype.report = function(error, context) {
	const _context = context || {};
	let reportObject = {
		error: error,
		context: {
			// The extra key tells Sentry to put this information
			// in the Additional Data section, otherwise, it doesn't
			// understand the context and ignores it
			extra: _context
		}
	};

	if (!this.initialised) {
		this._errorBuffer.push(reportObject);
		return error;
	}

	const transformedError = this._transformError(reportObject);

	// The _transformError may return a bad value, in order to protect against
	// this mistake and still report a valid object we test the return value
	// before continuing to use it
	if (transformedError && transformedError.error) {
		reportObject = transformedError;
	}

	if (!reportObject.context) {
		reportObject.context = {};
	}

	if (!this._filterError(reportObject)) {
		return error;
	}

	// Raven, for some reason completely ignores the contents of
	// error.message... to get around this, we attach the error message to the
	// context object.
	if (reportObject.error.message) {
		reportObject.context.errormessage = reportObject.error.message;
	}

	this.ravenClient.captureException(reportObject.error, reportObject.context);
	return error;
};

/**
 * Log an 'ERROR' level log. Intended to have the same semantics as
 * console.error.
 *
 * This.stores the log in memory and will attach the last `n` log lines to the
 * context of any reported errors.  See {@link Errors#log} to log a log
 * message.
 *
 *
 * @param {String}  message - The message to log
 * @returns {undefined} - undefined
 */
Errors.prototype.error = function() {
	this.logger.error.apply(this.logger, arguments);
};

/**
 * Log a 'WARN' level log.  Intended to have the same semantics as
 * console.warn.
 * This stores the log in memory and will attach the last `n` log lines to the
 * context of the error. See {@link Errors#log} to log a log message.
 *
 * @param {String} warnMessage  - The message to log.
 * @returns {undefined} - undefined
 */
Errors.prototype.warn = function() {
	this.logger.warn.apply(this.logger, arguments);
};

/**
 * Log a 'LOG' level log.  Intended to have the same semantics as console.log.
 * This stores the log in memory and will attach the last `n` log lines to the
 * context of the error.  See {@link Errors#warn} to log a warn message.
 *
 * @param {String} logMessage - The message to log.
 * @returns {undefined} - undefined
 */
Errors.prototype.log = function() {
	this.logger.log.apply(this.logger, arguments);
};


/**
 * Wrap a function so that any uncaught errors are caught and reported to the
 * error aggregator.
 *
 * @example
 * // Wraps function, any errors occurring within the function are caught, logged, and rethrown.
 * let wrappedFunction = oErrors.wrap(function() {
 *   throw new Error("My Error");
 * });
 *
 * If you want to attach additional contextual information to the error, see
 * {@link Errors#wrapWithContext}.
 -
 * @param {Function} fn     - The function to wrap.
 * @return {Function} - Wrapped function
 */
Errors.prototype.wrap = function(fn) {
	return this.wrapWithContext({}, fn);
};

/**
 * Wrap a function so that any uncaught errors are caught and reported to the error
 * aggregator.
 * This method allows additional context to be attached to the error if it
 * occurs.
 *
 * @example
 * // Wrap a function with some additional context to be reported in the event
 * // `doSomethingCallback` throws an error.
 * setTimeout(oErrors.wrapWithContext({ "context:url": "example.com" }, doSomethingCallback), 1000);
 *
 * @param {Object}   context     - Additional context to report along with the error
 *                                 if the function `fn` throws an Error.
 * @param {Function} fn          - The function to wrap
 * @return {Function} - Wrapped function with context
 */
Errors.prototype.wrapWithContext = function(context, fn) {
	const errors = this;
	return function() {
		try {
			return fn.apply(undefined, arguments);
		} catch(e) {
			errors.report(e, context);
			throw e;
		}
	};
};

/**
 * Remove the `oErrors.log` event listener and clean up as much of the Raven
 * client as possible.
 *
 * Errors is unusable after a call to destroy and calling `init` subsequently
 * will fail.
 *
 * @returns {undefined} - undefined
 */
Errors.prototype.destroy = function() {
	if (!this.initialised) { return; }
	document.removeEventListener('oErrors.log', this._logEventHandler);
	this.ravenClient.uninstall();
};

Errors.prototype.handleLogEvent = function(ev) {
	// If no event is passed here, return early
	if (!ev) {
		return;
	}

	// Tag the context with additional information about the DOM.
	const context = {
		info: ev.detail.info || {},
		extra: {
			"context:dom": this._getEventPath(ev).reduceRight(function(builder, el) {
				const classList = Array.prototype.slice.call(el.classList || []);

				if (!el.nodeName) {
					return builder + " - " + el.constructor.name + "\n";
				}

				const nodeName = el.nodeName.toLowerCase();

				if (nodeName.indexOf('#') === 0) {
					return builder + "<" + nodeName + ">\n";
				}

				return builder + "<" + el.nodeName.toLowerCase() + " class='" + classList.join(' ') + "' id='" + (el.id || '') + "'>\n";
			}, "")
		}
	};
	this.report(ev.detail.error, context);
};

/**
 * Given a DOM event, return an ordered array of Elements that the event will propagate
 * through.
 *
 * @private
 * @param {Event} event - The event to get the path for.
 * @returns {Array} - An array of Elements.
 */
Errors.prototype._getEventPath = function(event) {
	const path = [];

	// IE backwards compatibility (get the actual target). If IE, uses
	// `window.event.srcElement`
	let element = event.target || window.event.srcElement;

	while (element) {
		path.push(element);
		element = element.parentElement;
	}

	return path;
};

/**
 * A hook to add additional data to the payload before sending.
 *
 * @private
 * @param {Object} data - The data object from Raven
 * @returns {Object} - Updated data
 */
Errors.prototype._updatePayloadBeforeSend = function(data) {
	if (this.logger.enabled) {
		data.extra["context:log"] = this.logger.logLines();
	}
	return data;
};

/**
 * Get whether declarative configuration exists in the DOM.
 *
 * @private
 * @returns {boolean} - Boolean value indicating if there's declarative config
 */
Errors.prototype._hasDeclarativeConfig = function() {
	return !!this._getDeclarativeConfig();
};

/**
 * Get the configuration as a String.
 *
 * @private
 * @returns {string} - Stringified configuration
 */
Errors.prototype._getDeclarativeConfig = function() {
	if (!this._declarativeConfigString) {
		const config = document.querySelector('script[data-o-errors-config]');
		if (config) {
			this._declarativeConfigString = config.textContent || config.innerText || config.innerHTML;
		} else {
			return false;
		}
	}

	return this._declarativeConfigString;
};

/**
 * Initialises additional data using the <script type="application/json" data-o-errors-config> element in the DOM.
 *
 * @private
 * @param {Object} options - A partially, or fully filled options object.  If
 *                           an option is missing, this method will attempt to
 *                           initialise it from the DOM.
 * @returns {Object} - The options modified to include the options gathered
 *                     from the DOM
 */
Errors.prototype._initialiseDeclaratively = function(options) {

	if (!this._hasDeclarativeConfig()) {
		return false;
	}

	let declarativeOptions;

	try {
		declarativeOptions = JSON.parse(this._getDeclarativeConfig());
	} catch(e) {
		throw new Error("Invalid JSON configuration syntax, check validity for o-errors configuration: '" + e.message + "'");
	}

	for (const property in declarativeOptions) {
		if (declarativeOptions.hasOwnProperty(property)) {
			options[property] = options[property] || declarativeOptions[property];
		}
	}

	// Release the reference to the config string
	this._declarativeConfigString = false;
	return options;
};

export default Errors;
export { Errors };

