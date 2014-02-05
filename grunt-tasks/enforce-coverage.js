module.exports = function (grunt) {
    var path = require('path');

    grunt.registerTask('enforce-coverage', function () {
        var istanbulUtils = require(path.join(process.cwd(), 'node_modules/istanbul/lib/object-utils')),
            coverage = require(path.join(process.cwd(), 'reports/coverage.json')),
            errors = [];

        Object.keys(coverage).forEach(function (file) {
            var summary = istanbulUtils.summarizeFileCoverage(coverage[file]),
                error = false;

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