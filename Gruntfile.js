/* global process */
'use strict';

module.exports = function(grunt) {

	// Project configuration.
	var path = require('path');

	require('load-grunt-config')(grunt, {
		configPath: path.join(process.cwd(), 'grunt-config'),
		config: {
			pkg: grunt.file.readJSON('package.json'),
			bwr: grunt.file.readJSON('bower.json'),
			o: grunt.file.readJSON('origami.json')
		},
		loadGruntTasks: {
			pattern: ['grunt-*', '!grunt-template-jasmine-istanbul']
		}
	});

	grunt.loadTasks('grunt-tasks');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['test']);

	grunt.registerTask('browserTest', [
		'karma:chrome'
	]);

	grunt.registerTask('test', ['karma:ci']);
};
