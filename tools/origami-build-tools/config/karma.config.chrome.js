"use strict";

const { getBaseKarmaConfig } = require('./karma.config');
const constants = require('karma').constants;

module.exports.getChromeKarmaConfig = function (opts = { sassIncludePaths: [] }) {
	return getBaseKarmaConfig(opts).then(karmaBaseConfig => {
		const karmaConfig = Object.assign(
			{},
			karmaBaseConfig,
			{
				browsers: ['ChromeHeadless'],
				logLevel: constants.LOG_ERROR
			}
		);

		return karmaConfig;
	});
};
