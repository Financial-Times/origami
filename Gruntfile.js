/*global module*/
module.exports = function (grunt) {
	"use strict";

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		build_folder: './build',
		examples_build: './examples/build',
		versioned_build_folder: './build/<%=pkg.version %>',

		version : {
			options : {
				current_version: "<%=pkg.version %>"
			},

			files : [
				/*{
				 location: "bower.json",
				 regex: /("version"\s*:\s*["'])(\d+\.\d+\.\d+)(["'])/
				 },*/
				{
					location: "package.json",
					regex: /("version"\s*:\s*["'])(\d+\.\d+\.\d+)(["'])/
				},
				{
					location: "README.md",
					regex: /("tracking-module": "http:\/\/git\.svc\.ft\.com:8080\/scm\/track\/o-tracking\.git#>=)(\d+\.\d+\.\d+)( < 1")/
				},
				{
					location: "o-tracking.mustache",
					regex: /(data-o-version=")(\d+\.\d+\.\d+)(")/
				},
				{
					location: "main.js",
					regex: /(version = ")(\d+\.\d+\.\d+)(";)/
				}
			]
		},

		karma: {
			options: {
				files: ['src/javascript/**/*.js', 'test/**/*.js'],

				//logLevel: "DEBUG",
				frameworks: ['browserify', 'mocha', 'sinon'],
				singleRun: true,
				browsers: ['PhantomJS'],

				preprocessors: {
					'test/**/*.js': ['browserify'],
					'src/javascript/**/*.js': ['browserify', 'coverage']
				},
				browserify: {
					debug: false
				},
				reporters: ['progress', 'html', 'coverage'],
				htmlReporter: {
					outputDir: './build/reports/unit-tests'
				},
				coverageReporter: {
					reporters: [
						{ type: 'text', dir : './build/reports/coverage/' }/*,
						 TODO Add this back in, when they sort out Karma https://github.com/xdissent/karma-browserify/issues/29
						 { type : 'html', dir : './build/reports/coverage/' }*/
					]
				}
			},
			dev: {},
			ci: {},
			full: {
				options: {
					browsers: ['Chrome', 'Firefox']
				}
			}
		}
	});

	grunt.loadTasks("./resources/grunt-tasks");
	grunt.loadNpmTasks('grunt-karma');

	grunt.registerTask('test', "Test", ['karma:dev']);
	grunt.registerTask('default', "Default.", ['test']);
};
