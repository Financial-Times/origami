"use strict";

const process = require('process');
const path = require('path');
const fileHelpers = require('../lib/helpers/files');
const karmaSass = require('../lib/plugins/dart-sass-karma');
const karmaJavaScript = require('../lib/plugins/bundle-javascript');
const { camelCase } = require('lodash');

module.exports.getBaseKarmaConfig = function (opts = { sassIncludePaths: []}) {
	return Promise.all([fileHelpers.getComponentName(), fileHelpers.getModuleBrands(), fileHelpers.readIfExists(path.resolve('main.scss'))]).then(values => {
		const moduleName = values[0];
		const brands = values[1];
		const mainScssContent = values[2];
		const primaryMixinName = camelCase(moduleName);
		return {
			// enable / disable watching file and executing tests whenever any file changes
			autoWatch: false,

			// base path that will be used to resolve all patterns (eg. files, exclude)
			basePath: process.cwd(),

			browserDisconnectTimeout: 60 * 1000, // default 2000
			browserDisconnectTolerance: 3, // default 0
			browserNoActivityTimeout: 60 * 1000, // default 10000

			// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
			browsers: ['ChromeHeadless'],

			client: {
				// Capture all console output and pipe it to the terminal.
				captureConsole: false
			},

			captureTimeout: 60 * 2000, // default 60000,

			// enable / disable colors in the output (reporters and logs)
			colors: true,

			concurrency: 1, // default Infinity,

			// list of files to exclude
			exclude: ['test/scss/test-runner.js'],

			// list of files / patterns to load in the browser
			files: [
				require.resolve('regenerator-runtime'),
				'test/**/*.js',
				'main.scss',
				{
					pattern: 'main.js',
					watched: true,
					included: false,
					served: true
				},
				{
					pattern: 'src/**/*.js',
					watched: true,
					included: false,
					served: true
				},
				{
					pattern: 'src/**/*.scss',
					watched: true,
					included: false,
					served: true
				},
			],

			// frameworks to use
			// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
			frameworks: ['mocha', 'sinon', 'proclaim'],

			plugins: [
				'karma-*',
				karmaSass,
				'@financial-times/karma-proclaim',
				karmaJavaScript
			],

			// web server port
			port: 9876,

			preprocessors: {
				'**/*.js': ['javascript'],
				'main.scss': ['scss']
			},
			scssPreprocessor: {
				options: {
					file: '',
					data: `$system-code: "origami-build-tools";${brands.length ? `$o-brand: ${brands[0]};` : ''}${mainScssContent}@if mixin-exists('${primaryMixinName}') {@include ${primaryMixinName}();};`,
					includePaths: fileHelpers.getSassIncludePaths(process.cwd(), opts)
				}
			},

			// Continuous Integration mode
			// if true, Karma captures browsers, runs the tests and exits
			singleRun: true
		};
	});
};

