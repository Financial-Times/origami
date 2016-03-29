/*global module, process */

const BowerPlugin = require('bower-webpack-plugin');
const path = require('path');
const cwd = process.cwd();

module.exports = function(config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha'],


		plugins: [
			'karma-mocha',
			'karma-phantomjs-launcher',
			'karma-webpack'
		],


		// list of files / patterns to load in the browser
		files: [
			'http://polyfill.webservices.ft.com/v2/polyfill.js?ua=safari/4',
			'test/specs/*.test.js'
		],


		// list of files to exclude
		exclude: [
		],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: {
			'test/specs/*.test.js': ['webpack']
		},


		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress'],


		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: true,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: ['PhantomJS'],


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: true,

		webpack: {
			quiet: true,
			module: {
				loaders: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						loaders: [
							'babel?optional[]=runtime',
							'imports?define=>false'
						]
					}
				],
  				noParse: [
					/\/sinon\.js/,
				]
			},
			resolve: {
				root: [path.join(cwd, 'bower_components')]
			},
			plugins: [
				new BowerPlugin({
					includes:  /\.js$/
				})
			]
		},

		// Hide webpack output logging
		webpackMiddleware: {
			noInfo: true
		}
	});
};
