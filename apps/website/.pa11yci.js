'use strict';

module.exports = {
	defaults: {
		concurrency: 5
	}
};

if (process.env.PA11Y_CHROMIUM_PATH) {
	module.exports.defaults.chromeLaunchConfig = {
		executablePath: process.env.PA11Y_CHROMIUM_PATH
	};
}
