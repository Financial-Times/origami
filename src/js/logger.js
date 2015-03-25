function Logger(logsize, logLevel) {
	this._logBuffer = new Array(logsize);
	this._nextLogIndex = 0;

	// const
	this._logLevel = Logger.level[logLevel];

	this.enabled = this._logLevel !== Logger.level.off;
	if (!this.enabled) {
		this._consoleLog = function() {};
	}
}

Logger.level = {
	off:         0,
	contextonly: 1,
	debug:       2 // contextonly & debug
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

module.exports = Logger;
