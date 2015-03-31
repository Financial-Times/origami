/**
 * Create a new Logger class. Used internally by {@link Errors}.
 *
 * @param {Number} logSize - The default, fixed size of the log buffer.
 * @param {String} logLevel - The default log level, see the enumeration {@link Logger.level} for valid values, expects a String corresponding to a log level name.
 * @class Logger
 */
function Logger(logSize, logLevel) {
	this._logBuffer = new Array(logSize);
	this._nextLogIndex = 0;

	// const
	this._logLevel = Logger.level[logLevel];

	this.enabled = this._logLevel !== Logger.level.off;
	if (!this.enabled) {
		this._consoleLog = function() {};
	}
}

Logger.prototype.error = function() {
	this._consoleLog("ERROR", console.error, arguments);
};

Logger.prototype.log = function() {
	this._consoleLog("LOG", console.log, arguments);
};

Logger.prototype.warn = function() {
	this._consoleLog("WARN", console.warn, arguments);
};

Logger.prototype._consoleLog = function(name, consoleMethod, args) {
	var debug = this._logLevel === Logger.level.debug;

	// Because 'arguments' is not a true array we call out to argsAsLogString
	// to efficiently concatenate the arguments as string types to create the
	// message.
	var message = argsAsLogString(name, args);
	this.append(message);

	if (debug) {
		consoleMethod.apply(console, args);
	}
};

function argsAsLogString(logName, args) {
	var string = logName + ":";

	// TODO: Improve the logging of objects.  We could 'require('util')' and
	// use util.format (provided by browserify), but it adds 8K to the
	// minified output, it doesn't seem worth it.
	for(var index = 0; index < args.length; index++) {
		string += " " + args[index];
	}

	return string;
}

Logger.prototype.append = function(logLine) {
	this._logBuffer[this._nextLogIndex] = logLine;

	// Really simple Ring buffer implementation (keep track of next insertion
	// location)
	this._nextLogIndex++;
	if (this._nextLogIndex === this._logBuffer.length) {
		this._nextLogIndex = 0;
	}
};

/**
 * Roll the log buffer into a new line delimited string starting.
 * It, creates a chronological log based on the contents of the current
 * buffer. Any log entries that are undefined are dropped.
 *
 * @private
 * @returns {String}
 */
Logger.prototype.rollUp = function() {
	var index = this._nextLogIndex;
	var nextLogIndex = this._nextLogIndex;
	var rolledUpLogs = [];

	var failsafe = 0;

	do {
		var logEntry = this._logBuffer[index];

		if (logEntry !== undefined) {
			rolledUpLogs.push(this._logBuffer[index]);
		}

		index++;

		if (index >= this._logBuffer.length) {
			index = 0;
		}
	} while (index !== nextLogIndex);

	return rolledUpLogs.join("\n");
};

/**
 * Describes the logging levels available
 * @enum {Number}
 * @public
 */
Logger.level = {
	/**
	 * No logging at all occurs, each call to errors.log or errors.log are no-ops
	 */
	off:         0,

	/**
	 * Logs are stored in a buffer, by default the last 10 lines.  When an
	 *  error occurs, these log lines are attached to the error object.
	 */
	contextonly: 1,

	/**
	 * Logs are stored in the buffer as with `contextonly` however, they are
	 * also passed through to the relevant `console.*` API.
	 */
	debug:       2 // contextonly & debug
};

module.exports = Logger;
