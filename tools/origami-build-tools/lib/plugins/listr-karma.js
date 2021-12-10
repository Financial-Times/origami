'use strict';

const colors = require('colors/safe');
const isCI = require('is-ci');

module.exports = function () {

	const errors = [];

	const ListrReporter = function (baseReporterDecorator, formatError) {
		baseReporterDecorator(this);

		this.failedSpecs = Object.create(null);
		this.currentSuite = [];

		this.onRunComplete = (browsers, results) => {
			errors.length = 0;
			let totalTestsFailed = 0;
			let totalBrowsersFailed = 0;

			browsers.forEach((browser) => {
				if (results.failed) {

					if (this.failedSpecs[browser.id]) {

						++totalBrowsersFailed;

						errors.push(colors.white(browser.name + ' failed specs:'));

						this.failedSpecs[browser.id].forEach((value) => {

							++totalTestsFailed;

							const error = value.log.map(log => formatError(log, '\t')).join('\n').split('\n');
							errors.push(colors.white(value.suite.map((value) => value + ' > ').join('') + value.description));
							errors.push(colors.red(error.shift()));
							errors.push(colors.red(error.join('\n')));

							if (isCI) {
								const error = value.log.map(log => formatError(log, '\t')).join('\n').split('\n').filter(log => log.trim().length);
								const message = error.shift().trim();
								// Errors which happen due to timeouts do not contain file information
								// We do not add an annotation if we do not know which file to add it to.
								if (error.length > 0) {
									// eslint-disable-next-line prefer-const
									let [file, line, column] = error.pop().trim().replace('at ', '').split(':');
									column = Number.parseInt(column, 10);
									const fullTestDescription = value.suite.map((suite) => suite + ' > ').join('') + value.description;

									const errorMessage = fullTestDescription + '\n' + browser.name + ' errored with: \n' + message;
									const newLine = "%0A";
									console.log(`::error file=${file},line=${line},col=${column}::${errorMessage.replace(/\n/g, newLine)}`);
								}
							}

						});
					}
				}
			});

			this.failedSpecs = Object.create(null);
			this.currentSuite = [];

			if (errors.length > 0) {
				errors.push(`${totalTestsFailed} tests failed across ${totalBrowsersFailed} browsers.`);
			}
		};

		this.onSpecComplete = function (browser, result) {
			if (result.success === false) {
				if (!this.failedSpecs[browser.id]) {
					this.failedSpecs[browser.id] = [];
				}
				this.failedSpecs[browser.id].push(result);
			}
		};
	};

	ListrReporter.$inject = ['baseReporterDecorator', 'formatError'];

	return {
		reporter: {
			'reporter:listr': ['type', ListrReporter]
		},
		errors
	};

};
