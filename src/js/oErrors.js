'use strict';
var initialisedOErrors = false;

function Errors(raven) {
	this.ravenClient = raven;
}

Errors.prototype.init = function(options) {
	options = options || {};

	if (!options.sentryEndpoint) {
		throw new Error('Could not initialise o-errors: Sentry endpoint configuration missing. Configure using <link rel="o-errors" content="https://<your-api-key>@app.getsentry.com/<your-app-number>">');
	}

	var sentryEndpoint = options.sentryEndpoint;
	var ravenOptions = {};

	if (options.siteVersion) {
		ravenOptions.release = options.siteVersion;
	}

	this.ravenClient.config(sentryEndpoint, ravenOptions).install();
};

Errors.prototype.destroy = function() {
	this.ravenClient.uninstall();
};

Errors.init = function(options) {

	if (initialisedOErrors) {
		return false;
	}

	// Because Raven is a third party client, we can't be sure what it is doing when
	// we include it.  To control the initialisation of the third party code
	// we only include once 'init' has been called
	var Raven = require('raven-js');

	var oErrors = new Errors(Raven);
	oErrors.init(options);
	initialisedOErrors = oErrors;

	return oErrors;
};

Errors.destroy = function() {
	if (initialisedOErrors) {
		initialisedOErrors.destroy();
		initialisedOErrors = false;
	}
};

module.exports = Errors;
