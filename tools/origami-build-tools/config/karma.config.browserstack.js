"use strict";

const { getBaseKarmaConfig } = require('./karma.config');
const constants = require('karma').constants;

const customLaunchers = {
	// If browser_version is not set, uses latest stable version

	// Testing on minimum version for enhanced experience based on
	// https://docs.google.com/document/d/1AG4uZEFiWOkXfy0pdE3-3NCUP2No4MkoiZMLlJnO5lI/edit?ts=5d498574
	// Android 5
	bs_android5: {
		base: 'BrowserStack',
		device: 'Google Nexus 6',
		os: 'android',
		os_version: '5.0',
		real_mobile: true
	},

	// iOS 10
	bs_iphone7: {
		base: 'BrowserStack',
		device: 'iPhone 7',
		os: 'ios',
		os_version: '10.0',
		real_mobile: true
	},

	// Firefox latest
	bs_firefox: {
		base: 'BrowserStack',
		browser: 'firefox',
		os: 'OS X',
		os_version: 'Mojave'
	},

	// Chrome latest
	bs_chrome: {
		base: 'BrowserStack',
		browser: 'chrome',
		os: 'OS X',
		os_version: 'Mojave'
	},

	// Safari latest
	bs_safari: {
		base: 'BrowserStack',
		browser: 'safari',
		os: 'OS X',
		os_version: 'High Sierra'
	},

	// IE 11
	bs_ie: {
		base: 'BrowserStack',
		browser: 'ie',
		os: 'Windows',
		os_version: '10'
	},

	// Edge latest
	bs_edge: {
		base: 'BrowserStack',
		browser: 'edge',
		os: 'Windows',
		os_version: '10'
	},
};

const browsers = Object.keys(customLaunchers);

module.exports.getBrowserStackKarmaConfig = function (opts = { sassIncludePaths: [] }) {
	return getBaseKarmaConfig(opts).then(karmaBaseConfig => {
		const karmaConfig = Object.assign(
			{},
			karmaBaseConfig,
			{
				browsers,
				browserStack: {
					startTunnel: true // let BrowserStack connect to our local server
				},
				customLaunchers,
				logLevel: constants.LOG_ERROR
			}
		);

		return karmaConfig;
	});
};
