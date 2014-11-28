/* global process */
module.exports = function (grunt) {
	'use strict';
	var path = require('path');

	grunt.registerTask('enforce-coverage', function () {
		var istanbulUtils = require(path.join(process.cwd(), 'node_modules/istanbul/lib/object-utils'));
		var coverage = require(path.join(process.cwd(), 'reports/coverage.json'));
		var errors = [];

		Object.keys(coverage).forEach(function (file) {
			var summary = istanbulUtils.summarizeFileCoverage(coverage[file]);
			var error = false;

			Object.keys(summary).forEach(function (expressionType) {
				if (summary[expressionType].total - summary[expressionType].covered > 0) {
					error = true;
				}
			});
			if (error) {
				errors.push(file);
			}

		});
		if (errors.length) {
			grunt.log.subhead('Insufficient unit test coverage');
			grunt.log.errorlns(grunt.log.wordlist(errors, {separator: '\n'}));
			throw grunt.util.error();
		}

	});
};
