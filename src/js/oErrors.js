'use strict';

function Errors() {
	// Because Raven is a third party client, we can't be sure what it is doing when
	// we include it.  To control the initialisation of the third party code
	// we inlcude it only at construction time
	this.ravenClient = require('raven-js');
	this.initialised = false;
}

Errors.prototype.report = function(exception, options) {
	this.ravenClient.captureMessage(exception, options);
};

Errors.prototype.init = function(options) {
	if (this.initialised) {
		throw new Error('Unable to reconfigure error tracking.  This can only be configured once');
	}

	options = options || {};

	if (!options.sentryEndpoint) {
		throw new Error('Could not initialise o-errors: Sentry endpoint configuration missing.');
	}

	var sentryEndpoint = options.sentryEndpoint;
	var ravenOptions = {};

	if (options.siteVersion) {
		ravenOptions.release = options.siteVersion;
	}

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

module.exports = new Errors();
